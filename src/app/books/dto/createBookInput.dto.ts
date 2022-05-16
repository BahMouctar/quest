import { Field, ID, InputType } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"
import { Authors } from "src/app/authors/entities/authors.entity"

@InputType()
export class CreateBookInput{

    @IsNotEmpty({message:"Ce champ ne devrais pas être vide !"})
    @Field()
    name : string

    @IsNotEmpty({message:"Ce champ ne devrais pas être vide !"})
    @Field()
    price : number

    @IsNotEmpty({message:"Ce champ ne devrais pas être vide !"})
    @Field()
    sold : number


    @Field(of => ID,{nullable:true})
    author : Authors

}