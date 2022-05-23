import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Languages } from "src/app/languages/entities/languages.entity";
import { QuestSubjects } from "src/app/questSubjects/entities/questSubjects.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
@ObjectType()
export class Quests{

    @Field( type => ID)
    @PrimaryGeneratedColumn("uuid")
    _id :string

    @Field()
    @Column({ type: 'varchar', name: 'title', length: 191, nullable: true })
    title: string;

    @Field()
    @Column({ type: 'varchar', name: 'description', length: 191, nullable: true })
    description: string;

    @OneToMany( of =>  QuestSubjects, questSubjects => questSubjects.quest,{cascade:true})
    @Field(of => [QuestSubjects],{nullable:true})
    questSubjects  : QuestSubjects[];

    @OneToMany( of =>  Languages, languages => languages.quest,{cascade:true})
    @Field(of => [Languages],{nullable:true})
    languages  : Languages[];

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