import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestsInput } from './dto/createQuestInput.dto';
import { UpdateQuestsInput } from './dto/updateQuestInput.dto';
import { Quests } from './entities/quests.entity';

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
}
