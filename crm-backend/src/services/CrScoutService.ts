import { Inject, Service } from 'typedi';
import Contractor from '../models/ContractorModel';
import Logger from './Logger';
import HttpService from './HttpService';

@Service('CrScoutService')
export default class CrScoutService {
  @Inject('Logger')
  logger: Logger;

  @Inject('HttpService')
  httpService: HttpService;

  crScoutServiceUrl: string;

  constructor(@Inject('config') config) {
    this.crScoutServiceUrl = config.CrScoutServiceUrl;
  }

  async importContractor(url): Promise<Contractor> {
    const result: any = await this.httpService.post(`${this.crScoutServiceUrl}/scrape/profile`, { url });

    return result as Contractor;
  }

  async importContractorBatch(url): Promise<Contractor[]> {
    const result: any = await this.httpService.post(`${this.crScoutServiceUrl}/scrape/profile/batch`, { url });

    return result as Contractor[];
  }

  async isAlive(): Promise<boolean> {
    const isAlive: boolean = await this.httpService.get(`${this.crScoutServiceUrl}/noop`);

    return isAlive;
  }
}
