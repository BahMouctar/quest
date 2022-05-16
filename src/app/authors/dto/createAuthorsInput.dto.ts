import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"

@InputType()
export class CreateAuthorsInput{
    @Field()
    @IsNotEmpty({message:"Ce champ est requis"})
    firstname : string

    @Field()
    @IsNotEmpty({message:"Ce champ est requis"})
    lastname : string

    @Field({nullable:true})
    nickname : string

    @Field()
    @IsNotEmpty({message:"Ce champ est requis"})
    birth : string
}