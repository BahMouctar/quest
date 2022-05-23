import { Field, ID, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsOptional } from "class-validator"

@InputType()
export class CreateQuestsInput{

    @IsNotEmpty({message:"Ce champ ne devrais pas être vide !"})
    @Field()
    title: string;

    @IsNotEmpty({message:"Ce champ ne devrais pas être vide !"})
    @Field()
    description: string;
 
    @IsOptional()
    @Field()
    createdBy: string;

}