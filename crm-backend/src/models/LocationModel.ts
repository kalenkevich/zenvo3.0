import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('locations')
export default class Location {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  public id: string;

  @Field()
  @Column()
  public name: string;

  @Field()
  @Column()
  public latitude: string;

  @Field()
  @Column()
  public longitude: string;

  //------ System data ------
  public systemId: string;
}