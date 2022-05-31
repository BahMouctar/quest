import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateQuestSubjectLanguageInput } from './dto/createQuestSubjectLanguageInput.dto';
import { UpdateQuestSubjectLanguageInput } from './dto/updateQuestSubjectLanguageInput.dto';
import { QuestSubjectLanguages } from './entities/questSubjectLanguages.entity';
import { TypeOrmHttpParamQuery } from '../../core/shared/classes/typeorm-query';

@Injectable()
export class QuestSubjectLanguagesService {
    constructor(@InjectRepository(QuestSubjectLanguages) private readonly questSubjectLanguagesRepository : Repository<QuestSubjectLanguages>){}


    async create(createQuestSubjectLanguageInput : CreateQuestSubjectLanguageInput) : Promise<QuestSubjectLanguages | undefined>{
        const questSubjectLanguage = await this.questSubjectLanguagesRepository.create(createQuestSubjectLanguageInput);
        return await this.questSubjectLanguagesRepository.save(questSubjectLanguage);
    }


    async allQuestSubjectLanguages() : Promise<QuestSubjectLanguages[] | undefined>{
        return await this.questSubjectLanguagesRepository.find({relations:["questSubject","language"]});
    }

    async findOne(condt: Partial<QuestSubjectLanguages>){
        return await this.questSubjectLanguagesRepository.find(condt);
    }

    async findById(_id:string) : Promise<QuestSubjectLanguages | undefined>{
        
        const questSubjectLanguage = await this.questSubjectLanguagesRepository.findOne({_id:_id},{relations:["questSubject","language"]});
        if(!questSubjectLanguage) throw new NotFoundException("Ce quest subject language n'existe pas !");

        return questSubjectLanguage;
    }

    async update(_id:string, updateQuestSubjectLanguagesInput : UpdateQuestSubjectLanguageInput):Promise<QuestSubjectLanguages | undefined>{

        const found_questSubjectLanguage = await this.findById(_id);
        if(!found_questSubjectLanguage){throw new NotFoundException("Ce quest subject language n'existe pas")}

        const questSubjectLanguage = Object.assign(found_questSubjectLanguage,updateQuestSubjectLanguagesInput)
       
        return await this.questSubjectLanguagesRepository.save(questSubjectLanguage)
    }

    async remove(_id:string) : Promise<QuestSubjectLanguages | undefined>{
        const questSubjectLanguage = await this.findById(_id);
        const deletedquestSubjectLanguage = await this.questSubjectLanguagesRepository.remove(questSubjectLanguage);
        if(!deletedquestSubjectLanguage){throw new Error("Une erreur s'est produite")}

        questSubjectLanguage._id = _id;

        return questSubjectLanguage;
    }

    async save(questSubjectLanguage: QuestSubjectLanguages): Promise<any>{
        try{
            return await this.questSubjectLanguagesRepository.save(questSubjectLanguage);
        }
        catch(err){
            return Promise.reject(null);
        }
    }
    
    async updateQuestSubjectLanguage(questSubjectLanguage: QuestSubjectLanguages, primaryKey: string): Promise<any>{
        try{
            const response: any = await this.findByIdQuestSubjectLanguage(primaryKey);
            return await this.questSubjectLanguagesRepository.save({ ...response.data, ...questSubjectLanguage });
        }catch(err){
            return Promise.resolve(null);
        }
    }
    
    async delete(primaryKey: string): Promise<any>{
        try{
            return await this.questSubjectLanguagesRepository.softDelete(primaryKey);
        }catch(err){
            return Promise.resolve(null);
        }
    }

    async findAll(query: Object): Promise<any> {
       return await this.questSubjectLanguagesRepository.find(TypeOrmHttpParamQuery(query));
    }

    async findByIdQuestSubjectLanguage(primaryKey: string): Promise<any> {
       return  await this.questSubjectLanguagesRepository.findOne(primaryKey,{where:{deleted_at:IsNull()}, relations: ["questSubject","languages"] });
    }
}
