import { Inject, Service } from 'typedi';
import Contractor from '../models/ContractorModel';
import SearchFilterModel from '../models/SearchFilterModel';
import Logger from './Logger';
import HttpService from './HttpService';
import { ContractorsPageResult, PagingOptions } from '../types/Paging';

@Service('CrSearchService')
export default class CrSearchService {
  @Inject('Logger')
  logger: Logger;

  @Inject('HttpService')
  httpService: HttpService;

  crSearchServiceUrl: string;

  constructor(@Inject('config') config) {
    this.crSearchServiceUrl = config.CrSearchServiceUrl;
  }

  //TODO Implement paging
  async search(filter: SearchFilterModel, pageOptions: PagingOptions): Promise<ContractorsPageResult> {
    const { result }: any = await this.httpService.post(`${this.crSearchServiceUrl}/search`, filter);
    const contractors = result as Contractor[];

    return {
      data: contractors,
      total: result.length,
    };
  }

  async isAlive(): Promise<boolean> {
    const { status, error }: any = await this.httpService.get(`${this.crSearchServiceUrl}/noop`);

    console.log(status);

    if (status !== 0) {
      throw new Error(error);
    }

    return true;
  }
}
