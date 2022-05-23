import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Subjects } from "src/app/subjects/entities/subjects.entity";
import { Types } from "src/app/types/entities/types.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
@ObjectType()
export class Inputs{

    @Field( type => ID)
    @PrimaryGeneratedColumn("uuid")
    _id :string

    @Field()
    @Column({ type: 'varchar', name: 'created_by', length: 191, nullable: true })
    label: string;

    @ManyToOne( of => Types,types => types.inputs,{onDelete:"CASCADE"})
    @Field(of => Types,{nullable:true})
    type : Types

    @ManyToOne( of => Subjects,subjects => subjects.inputs,{onDelete:"CASCADE"})
    @Field(of => Subjects,{nullable:true})
    subject : Subjects

    @Field({nullable: true})
    @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at', nullable: false })
    readonly createdAt: Date;
    
    @Field({nullable: true})
    @Column({ type: 'varchar', name: 'updated_by', length: 191, nullable: true })
    updatedBy: string;
  
    @Field({nullable: true})
    @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at', nullable: true })
    readonly updatedAt: Date;
    
    @Field({nullable: true})
    @Column({ type: 'varchar', name: 'deleted_by', length: 191, nullable: true })
    deletedBy: string;
  
    @Field({nullable: true})
    @DeleteDateColumn({ type: 'timestamp without time zone', name: 'deleted_at', nullable: true })
    readonly deletedAt: Date;
}