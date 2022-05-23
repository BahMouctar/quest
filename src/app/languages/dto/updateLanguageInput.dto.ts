import { Optional } from "@nestjs/common"
import { Field, InputType } from "@nestjs/graphql"
import { IsOptional } from "class-validator";

@InputType()
export class UpdateLanguageInput{

    @Optional()
    @Field()
    label : string

    @Optional()
    @Field()
    updatedBy: string;

    @Optional()
    @Field()
    deletedBy: string;

}