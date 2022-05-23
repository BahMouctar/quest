import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Quests } from "src/app/quests/entities/quests.entity";
import { QuestSubjectLanguages } from "src/app/questSubjectLanguages/entities/questSubjectLanguages.entity";
import { Versions } from "src/app/versions/entities/versions.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
@ObjectType()
export class Languages{

    @Field( type => ID)
    @PrimaryGeneratedColumn("uuid")
    _id :string

    @Field()
    @Column({ type: 'varchar', name: 'label', length: 191, nullable: true })
    label: string;

    @ManyToOne( of => Quests,quests => quests.languages,{onDelete:"CASCADE"})
    @Field(of => Quests,{nullable:true})
    quest : Quests;

    @OneToMany( of =>  Versions, versions => versions.language,{cascade:true})
    @Field(of => [Versions],{nullable:true})
    versions  : Versions[];

    @OneToMany( of =>  QuestSubjectLanguages, questSubjectLanguages => questSubjectLanguages.language,{cascade:true})
    @Field(of => [QuestSubjectLanguages],{nullable:true})
    questSubjectLanguages  :QuestSubjectLanguages[];

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