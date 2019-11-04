import { Field, ID, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Category from './CategoryModel';

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

  //------ System data ------
  public systemId: string;
}
