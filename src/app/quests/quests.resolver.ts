import { Resolver,Query, Args, Mutation } from '@nestjs/graphql';
import { QuestsService } from './quests.service';
import { CreateQuestsInput } from './dto/createQuestInput.dto';
import { UpdateQuestsInput } from './dto/updateQuestInput.dto';
import { Quests } from './entities/quests.entity';

@Resolver( of => Quests )
export class QuestsResolver {

    constructor(private readonly questsService : QuestsService){}

    @Query(of => [Quests],{name:"quests"})
    async quests(){
        return await this.questsService.allQuests();
    }

    @Query(of => Quests,{name:"findQuestById"})
    async findById(@Args('_id') _id : string){
        return await this.questsService.findById(_id);
    }

    @Mutation(of  => Quests,{name:"crateQuest"})
    async create(@Args("createQuestsInput") createQuestsInput : CreateQuestsInput){
        return await this.questsService.create(createQuestsInput)
    }

    @Mutation(of => Quests,{name:"updateQuest"})
    async update(
        @Args("_id") _id :string,
        @Args("updateQuestsInput") updateQuestsInput:UpdateQuestsInput){
        return await this.questsService.update(_id,updateQuestsInput)
    }

    @Mutation( of => Quests,{name:"remove"} )
    async remove(@Args("_id") _id :string){
        return await this.questsService.remove(_id);
    }  
}
