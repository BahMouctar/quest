import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestSubjectInput } from './dto/createQuestSubjectInput.dto';
import { UpdateQuestSubjectInput } from './dto/updateQuestSubjectInput.dto';
import { QuestSubjects } from './entities/questSubjects.entity';

@Injectable()
export class QuestSubjectsService {
    constructor(@InjectRepository(QuestSubjects) private readonly questSubjectsRepository : Repository<QuestSubjects>){}


    async create(createQuestSubjectInput : CreateQuestSubjectInput) : Promise<QuestSubjects | undefined>{
        const questSubject = await this.questSubjectsRepository.create(createQuestSubjectInput);
        return await this.questSubjectsRepository.save(questSubject);
    }


    async allQuestSubjects() : Promise<QuestSubjects[] | undefined>{
        return await this.questSubjectsRepository.find({relations:["quest","subject","questSubjectLanguages"]});
    }

    async findOne(condt: Partial<QuestSubjects>){
        return await this.questSubjectsRepository.find(condt);
    }

    async findById(_id:string) : Promise<QuestSubjects | undefined>{
        
        const questSubject = await this.questSubjectsRepository.findOne({_id:_id},{relations:["quest","subject","questSubjectLanguages"]});
        if(!questSubject) throw new NotFoundException("Ce quest subject n'existe pas !");

        return questSubject;
    }

    async update(_id:string, updateQuestSubjectsInput : UpdateQuestSubjectInput):Promise<QuestSubjects | undefined>{

        const found_questSubject = await this.findById(_id);
        if(!found_questSubject){throw new NotFoundException("Ce quest subject n'existe pas")}

        const questSubject = Object.assign(found_questSubject,updateQuestSubjectsInput)
       
        return await this.questSubjectsRepository.save(questSubject)
    }

    async remove(_id:string) : Promise<QuestSubjects | undefined>{
        const questSubject = await this.findById(_id);
        const deletedquestSubject = await this.questSubjectsRepository.remove(questSubject);
        if(!deletedquestSubject){throw new Error("Une erreur s'est produite")}

        questSubject._id = _id;

        return questSubject;
       
    }
}
