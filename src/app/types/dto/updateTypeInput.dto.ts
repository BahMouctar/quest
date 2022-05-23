import { Optional } from "@nestjs/common"
import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class UpdateTypeInput{

    @Optional()
    @Field()
    label: string;

    @Optional()
    @Field()
    updatedBy: string;

    @Optional()
    @Field()
    deletedBy: string;

}