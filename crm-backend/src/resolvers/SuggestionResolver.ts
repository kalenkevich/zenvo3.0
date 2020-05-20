import { Arg, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import Logger from '../services/Logger';
import Skill, { SkillInput } from '../models/SkillModel';
import Contractor from '../models/ContractorModel';
import CrClassifierService from '../services/CrClassifierService';
import SearchFilterModel from '../models/SearchFilterModel';
import { PagingOptions } from '../types/Paging';

@Resolver()
export default class SuggestionResolver {
  @Inject('Logger')
  public logger: Logger;

  @Inject('CrClassifierService')
  public crClassifierService: CrClassifierService;

  @Query(returns => [Skill])
  public async suggestSkills(@Arg('currentSkill') currentSkill: SkillInput, @Arg('count') count: number) {
    try {
      return this.crClassifierService.suggestSkills(currentSkill, count);
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }

  @Query(returns => [Contractor])
  public async suggestContractors(@Arg('filter') filter: SearchFilterModel, @Arg('pagingOptions') pagingOptions: PagingOptions) {
    try {
      return this.crClassifierService.suggestContractors(filter, pagingOptions);
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }
}
