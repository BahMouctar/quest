import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Inputs } from "src/app/inputs/entities/inputs.entity";
import { QuestSubjects } from "src/app/questSubjects/entities/questSubjects.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
@ObjectType()
export class Subjects{

    @Field( type => ID)
    @PrimaryGeneratedColumn("uuid")
    _id :string

    @Field()
    @Column({ type: 'varchar', name: 'title', length: 191, nullable: true })
    title: string;

    @Field()
    @Column({ type: 'varchar', name: 'enonce', length: 191, nullable: true })
    enonce: string;

    @OneToMany( of =>  Inputs, inputs => inputs.subject,{cascade:true})
    @Field(of => [Inputs],{nullable:true})
    inputs : Inputs[];

    @OneToMany( of =>  QuestSubjects, questSubjects => questSubjects.subject,{cascade:true})
    @Field(of => [QuestSubjects],{nullable:true})
    questSubjects : QuestSubjects[];

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