import { Field, InputType, ObjectType } from 'type-graphql';
import Contractor from '../models/ContractorModel';

@InputType()
export class PagingOptions {
  @Field()
  public page: number;

  @Field()
  public pageSize: number;
}

@ObjectType()
export class ContractorsPageResult {
  @Field()
  total: number;

  @Field(type => [Contractor])
  public data: Contractor[];
}
