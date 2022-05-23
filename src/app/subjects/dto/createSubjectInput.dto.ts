import { Optional } from "@nestjs/common";
import { Field, ID, InputType } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"

@InputType()
export class CreateSubjectInput{

    @IsNotEmpty({message:"Ce champ ne devrais pas être vide !"})
    @Field()
    title: string;

    @IsNotEmpty({message:"Ce champ ne devrais pas être vide !"})
    @Field()
    enonce: string;
    
    @Optional()
    @Field()
    createdBy: string;
}