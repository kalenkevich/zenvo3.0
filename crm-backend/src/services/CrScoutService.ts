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
    const {
      status,
      result,
      error,
    }: any = await this.httpService.post(`${this.crScoutServiceUrl}/scrape/profile`, { url });

    if (status !== 0) {
      throw new Error(error);
    }

    return result as Contractor;
  }

  async importContractorBatch(url): Promise<Contractor[]> {
    const {
      status,
      result,
      error,
    }: any = await this.httpService.post(`${this.crScoutServiceUrl}/scrape/profile/batch`, { url });

    if (status !== 0) {
      throw new Error(error);
    }

    return result as Contractor[];
  }

  async isAlive(): Promise<boolean> {
    const { status, error }: any = await this.httpService.get(`${this.crScoutServiceUrl}/noop`);

    if (status !== 0) {
      throw new Error(error);
    }

    return true;
  }
}
