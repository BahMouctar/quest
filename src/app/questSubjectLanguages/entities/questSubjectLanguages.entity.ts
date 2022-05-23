import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Languages } from "src/app/languages/entities/languages.entity";
import { QuestSubjects } from "src/app/questSubjects/entities/questSubjects.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
@ObjectType()
export class QuestSubjectLanguages{

    @Field( type => ID)
    @PrimaryGeneratedColumn("uuid")
    _id :string

    @Field()
    @Column({ type: 'varchar', name: 'code_initial', length: 191, nullable: true })
    codeInitial: string;

    @Field()
    @Column({ type: 'varchar', name: 'code_final', length: 191, nullable: true })
    codeFinal: string;

    @ManyToOne( of => QuestSubjects,questSubject => questSubject.questSubjectLanguages,{onDelete:"CASCADE"})
    @Field(of => QuestSubjects,{nullable:true})
    questSubject : QuestSubjects;

    @ManyToOne( of => Languages,language => language.questSubjectLanguages,{onDelete:"CASCADE"})
    @Field(of => Languages,{nullable:true})
    language : Languages;

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