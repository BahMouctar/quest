import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Inputs } from "src/app/inputs/entities/inputs.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
@ObjectType()
export class Types{

    @Field( type => ID)
    @PrimaryGeneratedColumn("uuid")
    _id :string

    @Field()
    @Column({ type: 'varchar', name: 'label', length: 191, nullable: true })
    label: string;

    @OneToMany( of =>  Inputs, inputs => inputs.type,{cascade:true})
    @Field(of => [Inputs],{nullable:true})
    inputs : Inputs[];

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