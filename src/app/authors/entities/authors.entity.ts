import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Books } from "src/app/books/entities/books.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
@ObjectType()
export class Authors{

    @Field( type => ID)
    @PrimaryGeneratedColumn("uuid")
    _id:string

    @Field()
    @Column()
    firstname : string

    @Field()
    @Column()
    lastname : string

    @Field({nullable:true})
    @Column({nullable:true})
    nickname : string

    @Field()
    @Column({type:"date"})
    birth : string


    // Relation one to many
    @OneToMany( of =>  Books, books => books.author,{cascade:true})
    @Field(of => [Books],{nullable:true})
    books  : Books[]

}