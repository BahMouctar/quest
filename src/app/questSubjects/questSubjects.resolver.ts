import { Resolver,Query, Args, Mutation } from '@nestjs/graphql';
import { QuestSubjectsService } from './questSubjects.service';
import { CreateQuestSubjectInput } from './dto/createQuestSubjectInput.dto';
import { UpdateQuestSubjectInput } from './dto/updateQuestSubjectInput.dto';
import { QuestSubjects } from './entities/questSubjects.entity';

@Resolver( of => QuestSubjects )
export class QuestSubjectsResolver {

    constructor(private readonly questSubjectsService : QuestSubjectsService){}

    @Query(of => [QuestSubjects],{name:"questSubjects"})
    async questSubjects(){
        return await this.questSubjectsService.allQuestSubjects();
    }

    @Query(of => QuestSubjects,{name:"findQuestSubjectById"})
    async findById(@Args('_id') _id : string){
        return await this.questSubjectsService.findById(_id);
    }

    @Mutation(of  => QuestSubjects,{name:"crateQuestSubject"})
    async create(@Args("createQuestSubjectsInput") createQuestSubjectsInput : CreateQuestSubjectInput){
        return await this.questSubjectsService.create(createQuestSubjectsInput)
    }

    @Mutation(of => QuestSubjects,{name:"updateQuestSubject"})
    async update(
        @Args("_id") _id :string,
        @Args("updateQuestSubjectsInput") updateQuestSubjectsInput:UpdateQuestSubjectInput){
        return await this.questSubjectsService.update(_id,updateQuestSubjectsInput)
    }

    @Mutation( of => QuestSubjects,{name:"remove"} )
    async remove(@Args("_id") _id :string){
        return await this.questSubjectsService.remove(_id);
    }  
}
