import { Field, ID, InputType, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Category from './CategoryModel';

@InputType()
export class SkillInput {
  @Field(type => ID, { nullable: true })
  public id: string;

  @Field()
  public name: string;
}

@ObjectType()
@Entity('skills')
export default class Skill {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  public id: string;

  @Field()
  @Column()
  public name: string;

  @Field()
  @ManyToOne(type => Category)
  @JoinColumn()
  public category: Category;

  @Column({ type: 'float', default: 0.00 })
  public systemId: number;
}
