import { Optional } from "@nestjs/common";
import { Field, ID, InputType } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"
import { Languages } from "src/app/languages/entities/languages.entity";

@InputType()
export class CreateVersionInput{

    @IsNotEmpty({message:"Ce champ ne devrais pas être vide !"})
    @Field()
    index: string;

    @IsNotEmpty({message:"Ce champ ne devrais pas être vide !"})
    @Field()
    label: string;

    @IsNotEmpty({message:"Ce champ ne devrais pas être vide !"})
    @Field()
    description: string;

    @Field(of => ID,{nullable:true})
    language : Languages;

    @Optional()
    @Field()
    createdBy: string;
}