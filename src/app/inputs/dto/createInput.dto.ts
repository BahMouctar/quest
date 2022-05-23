import { Field, ID, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsOptional } from "class-validator"
import { Subjects } from "src/app/subjects/entities/subjects.entity"
import { Types } from "src/app/types/entities/types.entity"

@InputType()
export class CreateInput{

    @IsNotEmpty({message:"Ce champ ne devrais pas être vide !"})
    @Field()
    label : string

    @Field(of => ID,{nullable:true})
    type : Types

    @Field(of => ID,{nullable:true})
    subject : Subjects

    @IsOptional()
    @Field()
    createdBy: string;
}