import { Field, ID, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsOptional } from "class-validator"
import { Quests } from "src/app/quests/entities/quests.entity";
import { Subjects } from "src/app/subjects/entities/subjects.entity";

@InputType()
export class CreateQuestSubjectInput{

    @IsNotEmpty({message:"Ce champ ne devrais pas être vide !"})
    @Field()
    rank: string; 

    @Field(of => ID,{nullable:true})
    quest : Quests;

    @Field(of => ID,{nullable:true})
    subject : Subjects;   
     
    @IsOptional()
    @Field()
    createdBy: string;

}