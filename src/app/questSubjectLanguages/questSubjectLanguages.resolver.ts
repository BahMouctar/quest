import { Resolver,Query, Args, Mutation } from '@nestjs/graphql';
import { QuestSubjectLanguagesService } from './questSubjectLanguages.service';
import { CreateQuestSubjectLanguageInput } from './dto/createQuestSubjectLanguageInput.dto';
import { UpdateQuestSubjectLanguageInput } from './dto/updateQuestSubjectLanguageInput.dto';
import { QuestSubjectLanguages } from './entities/questSubjectLanguages.entity';

@Resolver( of => QuestSubjectLanguages )
export class QuestSubjectLanguagesResolver {

    constructor(private readonly questSubjectLanguagesService : QuestSubjectLanguagesService){}

    @Query(of => [QuestSubjectLanguages],{name:"questSubjectLanguages"})
    async questSubjectLanguages(){
        return await this.questSubjectLanguagesService.allQuestSubjectLanguages();
    }

    @Query(of => QuestSubjectLanguages,{name:"findQuestSubjectLanguageById"})
    async findById(@Args('_id') _id : string){
        return await this.questSubjectLanguagesService.findById(_id);
    }

    @Mutation(of  => QuestSubjectLanguages,{name:"crateQuestSubjectLanguage"})
    async create(@Args("createQuestSubjectLanguagesInput") createQuestSubjectLanguagesInput : CreateQuestSubjectLanguageInput){
        return await this.questSubjectLanguagesService.create(createQuestSubjectLanguagesInput)
    }

    @Mutation(of => QuestSubjectLanguages,{name:"updateQuestSubjectLanguage"})
    async update(
        @Args("_id") _id :string,
        @Args("updateQuestSubjectLanguagesInput") updateQuestSubjectLanguagesInput:UpdateQuestSubjectLanguageInput){
        return await this.questSubjectLanguagesService.update(_id,updateQuestSubjectLanguagesInput)
    }

    @Mutation( of => QuestSubjectLanguages,{name:"remove"} )
    async remove(@Args("_id") _id :string){
        return await this.questSubjectLanguagesService.remove(_id);
    }  
}
