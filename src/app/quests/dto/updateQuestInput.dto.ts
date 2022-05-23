import { Optional } from "@nestjs/common"
import { Field, InputType } from "@nestjs/graphql"
import { IsOptional } from "class-validator";

@InputType()
export class UpdateQuestsInput{

    @Optional()
    @Field()
    title : string

    @Optional()
    @Field()
    description: string;

    @IsOptional()
    @Field()
    updatedBy: string;

    @IsOptional()
    @Field()
    deletedBy: string;

}