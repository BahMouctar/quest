import { Optional } from "@nestjs/common"
import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"

@InputType()
export class UpdateAuthorsInput{
    @Field({nullable:true})
    @Optional()
    firstname : string

    @Field({nullable:true})
    @Optional()
    lastname : string

    @Field({nullable:true})
    @Optional()
    nickname : string

    @Field({nullable:true})
    @Optional()
    birth : string
}