import { Optional } from "@nestjs/common"
import { Field, InputType } from "@nestjs/graphql"
import { IsOptional } from "class-validator";

@InputType()
export class UpdateInput{

    @Optional()
    @Field()
    label : string

    @IsOptional()
    @Field()
    updatedBy: string;

    @IsOptional()
    @Field()
    deletedBy: string;

}