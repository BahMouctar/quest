import { Optional } from "@nestjs/common";
import { Field, ID, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsOptional } from "class-validator"
import { Quests } from "src/app/quests/entities/quests.entity";

@InputType()
export class CreateLanguageInput{

    @IsNotEmpty({message:"Ce champ ne devrais pas être vide !"})
    @Field()
    label : string

    @Field(of => ID,{nullable:true})
    quest : Quests;
    
    @Optional()
    @Field()
    createdBy: string;

}