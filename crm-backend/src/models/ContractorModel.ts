import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import Contact from './ContactModel';
import Location from './LocationModel';
import Category from './CategoryModel';
import Skill from './SkillModel';

@Entity('contractors')
@ObjectType()
export default class Contractor {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({default: 0})
  rate: number;

  @Field()
  @Column({default: ''})
  avatarUrl: string;

  @Field()
  @Column({default: ''})
  description: string;

  @Field(type => [Contact])
  @Column({ type: 'jsonb' })
  contacts: Contact[];

  @Field(type => Location)
  @ManyToOne(type => Location)
  location: Location;

  @Field(type => Category)
  @ManyToOne(type => Category)
  @JoinColumn()
  category: Category;

  @Field(type => [Skill])
  @ManyToMany(type => Skill, { cascade: true })
  @JoinTable()
  skills: Skill[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  sourceId: string;

  @Field(type => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Field(type => Date)
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
