import { Inject, Service } from 'typedi';
import { EntityManager } from 'typeorm';
import Contractor from '../models/ContractorModel';
import SearchFilterModel from '../models/SearchFilterModel';
import Logger from './Logger';
import CrSearchService from './CrSearchService';
import CrScoutService from './CrScoutService';
import { ContractorsPageResult, PagingOptions } from '../types/Paging';

@Service('ContractorsService')
export default class ContractorsService {
  @Inject('Logger')
  logger: Logger;

  @Inject('CrSearchService')
  crSearchService: CrSearchService;

  @Inject('CrScoutService')
  crScoutService: CrScoutService;

  @Inject('EntityManager')
  entityManager: EntityManager;

  async search(filter: SearchFilterModel, pageOptions: PagingOptions): Promise<ContractorsPageResult> {
    this.logger.info(`[ContractorsService.search]: Try to search contractors with filter: ${JSON.stringify(filter)}`);

    try {
      const data = await this.crSearchService.search(filter, pageOptions);

      this.logger.info(`[ContractorsService.search]: successful response: ${JSON.stringify(filter)}`);

      return data;
    } catch (error) {
      this.logger.error(`[ContractorsService.search]: Error while search contractors: ${error.message}`);

      throw error;
    }
  }

  async getAll(pageOptions: PagingOptions): Promise<ContractorsPageResult> {
    this.logger.info('[ContractorsService.getAll]: Try to get all contractors');

    try {
      const [data, total] = await this.entityManager
        .createQueryBuilder()
        .select("profile")
        .from(Contractor, "profile")
        .skip(pageOptions.page * pageOptions.pageSize)
        .take(pageOptions.pageSize)
        .getManyAndCount();

      return {
        data,
        total,
      };
    } catch (error) {
      this.logger.error(`[ContractorsService.getAll]: Error while search contractors: ${error.message}`);

      throw error;
    }
  }

  async importContractor(url: string): Promise<Contractor> {
    this.logger.info('[ContractorsService.importContractor]: Try to import contractor');

    try {
      const contractor = await this.crScoutService.importContractor(url);

      return contractor;
    } catch (error) {
      this.logger.error(`[ContractorsService.importContractor]: Error while import contractors: ${error.message}`);

      throw error;
    }
  }
}
