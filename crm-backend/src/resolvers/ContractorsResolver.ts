import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import Logger from '../services/Logger';
import Contractor from '../models/ContractorModel';
import { ContractorsPageResult } from '../types/Paging';

@Resolver(Contractor)
export default class ContractorsResolver {
  @Inject('Logger')
  public logger: Logger;

  @Inject('Logger')
  public contracotsService: ContractorsService;

  @Query(returns => ContractorsPageResult)
  public async searchContractors(@Arg('request') req) {
    try {
      return this.authorizationService.authenticate(authorizationToken);
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }
}
