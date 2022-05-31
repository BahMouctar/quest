import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateInput } from './dto/createInput.dto';
import { UpdateInput } from './dto/updateInput.dto';
import { Inputs } from './entities/inputs.entity';
import { TypeOrmHttpParamQuery } from '../../core/shared/classes/typeorm-query';

@Injectable()
export class InputsService {
    constructor(@InjectRepository(Inputs) private readonly inputsRepository : Repository<Inputs>){}


    async create(createInput : CreateInput) : Promise<Inputs | undefined>{
        const book = await this.inputsRepository.create(createInput);
        return await this.inputsRepository.save(book);
    }


    async allInputs() : Promise<Inputs[] | undefined>{
        return await this.inputsRepository.find({relations:["type","subject"]});
    }

    async findOne(condt: Partial<Inputs>){
        return await this.inputsRepository.find(condt);
    }

    async findById(_id:string) : Promise<Inputs | undefined>{
        
        const book = await this.inputsRepository.findOne({_id:_id},{relations:["type","subject"]});
        if(!book) throw new NotFoundException("Cet input n'existe pas !");

        return book;
    }

    async update(_id:string, updateInput : UpdateInput):Promise<Inputs | undefined>{

        const found_book = await this.findById(_id);
        if(!found_book){throw new NotFoundException("Cet input n'existe pas")}

        const book = Object.assign(found_book,updateInput)
       
        return await this.inputsRepository.save(book)
    }

    async remove(_id:string) : Promise<Inputs | undefined>{
        const book = await this.findById(_id);
        const deletedbook = await this.inputsRepository.remove(book);
        if(!deletedbook){throw new Error("Une erreur s'est produite")}

        book._id = _id;

        return book;
       
    }

    async save(input: Inputs): Promise<any>{
        try{
            return await this.inputsRepository.save(input);
        }
        catch(err){
            return Promise.reject(null);
        }
    }
    
    async updateInput(input: Inputs, primaryKey: string): Promise<any>{
        try{
            const response: any = await this.findByIdInput(primaryKey);
            return await this.inputsRepository.save({ ...response.data, ...input });
        }catch(err){
            return Promise.resolve(null);
        }
    }
    
    async delete(primaryKey: string): Promise<any>{
        try{
            return await this.inputsRepository.softDelete(primaryKey);
        }catch(err){
            return Promise.resolve(null);
        }
    }

    async findAll(query: Object): Promise<any> {
       return await this.inputsRepository.find(TypeOrmHttpParamQuery(query));
    }

    async findByIdInput(primaryKey: string): Promise<any> {
       return  await this.inputsRepository.findOne(primaryKey,{where:{deleted_at:IsNull()}, relations: ["type","subject"] });
    }
}
