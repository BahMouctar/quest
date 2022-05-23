import { Optional } from "@nestjs/common";
import { Field, ID, InputType } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"
import { Languages } from "src/app/languages/entities/languages.entity";
import { QuestSubjects } from "src/app/questSubjects/entities/questSubjects.entity";

@InputType()
export class CreateQuestSubjectLanguageInput{

    @IsNotEmpty({message:"Ce champ ne devrais pas être vide !"})
    @Field()
    codeInitial: string;

    @IsNotEmpty({message:"Ce champ ne devrais pas être vide !"})
    @Field()
    codeFinal: string;

    @Field(of => ID,{nullable:true})
    questSubject : QuestSubjects;

    @Field(of => ID,{nullable:true})
    language : Languages;
    
    @Optional()
    @Field()
    createdBy: string;
}