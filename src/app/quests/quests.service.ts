import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateQuestsInput } from './dto/createQuestInput.dto';
import { UpdateQuestsInput } from './dto/updateQuestInput.dto';
import { Quests } from './entities/quests.entity';
import { TypeOrmHttpParamQuery } from '../../core/shared/classes/typeorm-query';

@Injectable()
export class QuestsService {
    constructor(@InjectRepository(Quests) private readonly questsRepository : Repository<Quests>){}


    async create(createQuestInput : CreateQuestsInput) : Promise<Quests | undefined>{
        const quest = await this.questsRepository.create(createQuestInput);
        return await this.questsRepository.save(quest);
    }


    async allQuests() : Promise<Quests[] | undefined>{
        return await this.questsRepository.find({relations:["questSubjects","languages"]});
    }

    async findOne(condt: Partial<Quests>){
        return await this.questsRepository.find(condt);
    }

    async findById(_id:string) : Promise<Quests | undefined>{
        
        const quest = await this.questsRepository.findOne({_id:_id},{relations:["questSubjects","languages"]});
        if(!quest) throw new NotFoundException("Ce quest n'existe pas !");

        return quest;
    }

    async update(_id:string, updateQuestsInput : UpdateQuestsInput):Promise<Quests | undefined>{

        const found_quest = await this.findById(_id);
        if(!found_quest){throw new NotFoundException("Ce quest n'existe pas")}

        const quest = Object.assign(found_quest,updateQuestsInput)
       
        return await this.questsRepository.save(quest)
    }

    async remove(_id:string) : Promise<Quests | undefined>{
        const quest = await this.findById(_id);
        const deletedquest = await this.questsRepository.remove(quest);
        if(!deletedquest){throw new Error("Une erreur s'est produite")}

        quest._id = _id;

        return quest;
       
    }

    async save(quest: Quests): Promise<any>{
        try{
            return await this.questsRepository.save(quest);
        }
        catch(err){
            return Promise.reject(null);
        }
    }
    
    async updateQuest(quest: Quests, primaryKey: string): Promise<any>{
        try{
            const response: any = await this.findById(primaryKey);
            return await this.questsRepository.save({ ...response.data, ...quest });
        }catch(err){
            return Promise.resolve(null);
        }
    }
    
    async delete(primaryKey: string): Promise<any>{
        try{
            return await this.questsRepository.softDelete(primaryKey);
        }catch(err){
            return Promise.resolve(null);
        }
    }

    async findAll(query: Object): Promise<any> {
       return await this.questsRepository.find(TypeOrmHttpParamQuery(query));
    }

    async findByIdQuest(primaryKey: string): Promise<any> {
       return  await this.questsRepository.findOne(primaryKey,{where:{deleted_at:IsNull()}, relations: ["questSubjects","languages"] });
    }
}
