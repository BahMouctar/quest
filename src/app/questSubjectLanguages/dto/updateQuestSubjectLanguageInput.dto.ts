import { Optional } from "@nestjs/common"
import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class UpdateQuestSubjectLanguageInput{

    @Optional()
    @Field()
    codeInitial: string;

    @Optional()
    @Field()
    codeFinal: string;

    @Optional()
    @Field()
    updatedBy: string;

    @Optional()
    @Field()
    deletedBy: string;
}