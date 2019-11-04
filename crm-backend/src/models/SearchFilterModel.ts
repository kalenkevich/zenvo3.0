import { Field, InputType, ObjectType, registerEnumType } from 'type-graphql';

export enum SearchCriteriaType {
  category = 'category',
  skill = 'skill',
  location = 'location',
  rate = 'rate',
}

registerEnumType(SearchCriteriaType, {name: 'SearchCriteriaType'});

@InputType()
export class SearchCriteriaValue {
  @Field()
  value: string;

  @Field({ nullable: true })
  label: string;

  systemId: string;
}

@InputType()
export class SearchCriteria {
  @Field(type => SearchCriteriaType)
  type: SearchCriteriaType;

  @Field(type => [SearchCriteriaValue])
  items: SearchCriteriaValue[];
}

@InputType()
export default class SearchFilterModel {
  @Field()
  name: string;

  @Field(type => [SearchCriteria])
  items: SearchCriteria[]
}
