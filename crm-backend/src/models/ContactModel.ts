import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class Contact {
  @Field()
  public type: string;

  @Field()
  public value: string;
}
