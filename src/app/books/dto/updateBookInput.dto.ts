import { Optional } from "@nestjs/common"
import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class UpdateBookInput{

    @Optional()
    @Field()
    name : string

    @Optional()
    @Field()
    price : number

    @Optional()
    @Field()
    sold : number

}