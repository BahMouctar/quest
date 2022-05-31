import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateSubjectInput } from './dto/createSubjectInput.dto';
import { UpdateSubjectInput } from './dto/updateSubjectInput.dto';
import { Subjects } from './entities/subjects.entity';
import { TypeOrmHttpParamQuery } from '../../core/shared/classes/typeorm-query';


@Injectable()
export class SubjectsService {
    constructor(@InjectRepository(Subjects) private readonly subjectsRepository : Repository<Subjects>){}


    async create(createSubjectInput : CreateSubjectInput) : Promise<Subjects | undefined>{
        const subject = await this.subjectsRepository.create(createSubjectInput);
        return await this.subjectsRepository.save(subject);
    }


    async allSubjects() : Promise<Subjects[] | undefined>{
        return await this.subjectsRepository.find({relations:["inputs","questSubjects"]});
    }

    async findOne(condt: Partial<Subjects>){
        return await this.subjectsRepository.find(condt);
    }

    async findById(_id:string) : Promise<Subjects | undefined>{
        
        const subject = await this.subjectsRepository.findOne({_id:_id},{relations:["inputs","questSubjects"]});
        if(!subject) throw new NotFoundException("Ce sujet n'existe pas !");

        return subject;
    }

    async update(_id:string, updateSubjectsInput : UpdateSubjectInput):Promise<Subjects | undefined>{

        const found_subject = await this.findById(_id);
        if(!found_subject){throw new NotFoundException("Ce sujet n'existe pas")}

        const subject = Object.assign(found_subject,updateSubjectsInput)
       
        return await this.subjectsRepository.save(subject)
    }

    async remove(_id:string) : Promise<Subjects | undefined>{
        const subject = await this.findById(_id);
        const deletedsubject = await this.subjectsRepository.remove(subject);
        if(!deletedsubject){throw new Error("Une erreur s'est produite")}

        subject._id = _id;

        return subject;
    }

    async save(subject: Subjects): Promise<any>{
        try{
            return await this.subjectsRepository.save(subject);
        }
        catch(err){
            return Promise.reject(null);
        }
    }
    
    async updateSubject(subject: Subjects, primaryKey: string): Promise<any>{
        try{
            const response: any = await this.findById(primaryKey);
            return await this.subjectsRepository.save({ ...response.data, ...subject });
        }catch(err){
            return Promise.resolve(null);
        }
    }
    
    async delete(primaryKey: string): Promise<any>{
        try{
            return await this.subjectsRepository.softDelete(primaryKey);
        }catch(err){
            return Promise.resolve(null);
        }
    }

    async findAll(query: Object): Promise<any> {
       return await this.subjectsRepository.find(TypeOrmHttpParamQuery(query));
    }

    async findByIdSubject(primaryKey: string): Promise<any> {
       return  await this.subjectsRepository.findOne(primaryKey,{where:{deleted_at:IsNull()}, relations: ["inputs","questSubjects"] });
    }
}
