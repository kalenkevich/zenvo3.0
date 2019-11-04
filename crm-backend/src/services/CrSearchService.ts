import { Inject, Service } from 'typedi';
import Contractor from '../models/ContractorModel';
import SearchFilterModel from '../models/SearchFilterModel';
import Logger from './Logger';
import HttpService from './HttpService';

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

  async search(filter: SearchFilterModel): Promise<Contractor[]> {
    const data = await this.httpService.post(`${this.crSearchServiceUrl}/search`, filter);

    return data as Contractor[];
  }
}
