import { Field, InputType, registerEnumType } from 'type-graphql';

export enum SearchCriteriaType {
  category = 'category',
  skills = 'skills',
  location = 'location',
  rate = 'rate',
}

registerEnumType(SearchCriteriaType, {name: 'SearchCriteriaType'});

@InputType()
export class SearchCriteria {
  @Field(type => SearchCriteriaType)
  type: SearchCriteriaType;

  @Field(type => [Number])
  values: number[];
}

@InputType()
export default class SearchFilterModel {
  @Field()
  name: string;

  @Field(type => [SearchCriteria])
  items: SearchCriteria[]
}
