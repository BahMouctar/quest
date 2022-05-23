import { Optional } from "@nestjs/common"
import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class UpdateSubjectInput{

    @Optional()
    @Field()
    title: string;

    @Optional()
    @Field()
    enonce: string;

    @Optional()
    @Field()
    updatedBy: string;

    @Optional()
    @Field()
    deletedBy: string;

}