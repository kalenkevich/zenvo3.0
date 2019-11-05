import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import Logger from '../services/Logger';
import Contractor from '../models/ContractorModel';
import { ContractorsPageResult, PagingOptions } from '../types/Paging';
import ContractorsService from '../services/ContractorsService';
import SearchFilterModel from '../models/SearchFilterModel';

@Resolver(Contractor)
export default class ContractorsResolver {
  @Inject('Logger')
  public logger: Logger;

  @Inject('ContractorsService')
  public contractorsService: ContractorsService;

  @Query(returns => ContractorsPageResult)
  public async searchContractors(@Arg('filter') filter: SearchFilterModel, @Arg('pagingOptions') pagingOptions: PagingOptions) {
    try {
      return await this.contractorsService.search(filter, pagingOptions);
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }

  @Query(returns => ContractorsPageResult)
  public async getAllContractors(@Arg('pagingOptions') pagingOptions: PagingOptions) {
    try {
      return await this.contractorsService.getAll(pagingOptions);
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }

  @Mutation(returns => Contractor)
  public async importContractor(@Arg('url') url: string) {
    try {
      return await this.contractorsService.importContractor(url);
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }
}
