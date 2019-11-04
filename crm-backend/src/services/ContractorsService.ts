import { Inject, Service } from 'typedi';
import Contractor from '../models/ContractorModel';
import SearchFilterModel from '../models/SearchFilterModel';
import Logger from './Logger';
import CrSearchService from './CrSearchService';

@Service('ContractorsService')
export default class ContractorsService {
  @Inject('Logger')
  logger: Logger;

  @Inject('CrSearchService')
  crSearchService: CrSearchService;

  async search(filter: SearchFilterModel): Promise<Contractor[]> {
    this.logger.error(`[ContractorsService.search]: Try to search contractors with filter: ${JSON.stringify(filter)}`);

    try {
      const data = await this.CrSearchService.search(filter);

      this.logger.error(`[ContractorsService.search]: successful response: ${JSON.stringify(filter)}`);

      return data;
    } catch (error) {
      this.logger.error(`[ContractorsService.search]: Error while search contractors: ${error.message}`);

      throw error;
    }
  }
}
