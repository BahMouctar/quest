import { Optional } from "@nestjs/common";
import { Field, ID, InputType } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"

@InputType()
export class CreateTypeInput{

    @IsNotEmpty({message:"Ce champ ne devrais pas être vide !"})
    @Field()
    label: string;
    
    @Optional()
    @Field()
    createdBy: string;

}