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
  @Column({ default: '' })
  public city: string;

  @Field()
  @Column({ default: '' })
  public country: string;

  @Field()
  @Column({ default: '' })
  public latitude: string;

  @Field()
  @Column({ default: '' })
  public longitude: string;

  @Field()
  @Column({ default: '' })
  public point: string;

  @Column({ type: 'float', default: 0.00 })
  public systemId: number;
}
