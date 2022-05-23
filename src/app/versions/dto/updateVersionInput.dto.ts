import { Optional } from "@nestjs/common"
import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class UpdateVersionInput{

    @Optional()
    @Field()
    index: string;

    @Optional()
    @Field()
    label: string;

    @Optional()
    @Field()
    description: string;
    
    @Optional()
    @Field()
    updatedBy: string;

    @Optional()
    @Field()
    deletedBy: string;

}