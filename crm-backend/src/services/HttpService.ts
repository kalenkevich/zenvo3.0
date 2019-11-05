import axios, { AxiosRequestConfig } from 'axios';
import { Inject, Service } from 'typedi';
import Logger from './Logger';

@Service('HttpService')
export default class HttpService {
  @Inject('Logger')
  logger: Logger;

  async get(url: string, config?: any) {
    try {
      const result: any = await axios.get(url, config);

      return result.data;
    } catch (error) {
      this.logger.error(`[HttpService.get]: Error while getting ${url}`);

      throw error;
    }
  }

  async post(url: string, data?: any, config?: any) {
    try {
      const result: any = await axios.post(url, data, config);

      return result.data;
    } catch (error) {
      this.logger.error(`[HttpService.post]: Error while post to ${url} with data: ${JSON.stringify(data)}`);

      throw error;
    }
  }

  async put(url: string, data?: any, config?: any) {
    try {
      const result: any = await axios.post(url, data, config);

      return result.data;
    } catch (error) {
      this.logger.error(`[HttpService.put]: Error while put to ${url} with data: ${JSON.stringify(data)}`);

      throw error;
    }
  }

  async delete(url: string, config?: any) {
    try {
      const result: any = await axios.delete(url, config);

      return result.data;
    } catch (error) {
      this.logger.error(`[HttpService.delete]: Error while delete to ${url} with`);

      throw error;
    }
  }
}
