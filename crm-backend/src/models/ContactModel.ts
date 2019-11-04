import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class Contact {
  @Field()
  public type: number;

  @Field()
  public value: string;
}
