import { Optional } from "@nestjs/common"
import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class UpdateQuestSubjectInput{

    @Optional()
    @Field()
    rank: string; 

    @Optional()
    @Field()
    updatedBy: string;

    @Optional()
    @Field()
    deletedBy: string;

}