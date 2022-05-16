import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Authors } from "src/app/authors/entities/authors.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
@ObjectType()
export class Books{

    @Field( type => ID)
    @PrimaryGeneratedColumn("uuid")
    _id :string

    @Field()
    @Column()
    name:string

    @Field()
    @Column()
    price:number

    @Field()
    @Column()
    sold : number

    @ManyToOne( of => Authors,authors => authors.books,{onDelete:"CASCADE"})
    @Field(of => Authors,{nullable:true})
    author : Authors
}