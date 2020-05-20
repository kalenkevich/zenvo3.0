import { Inject, Service } from 'typedi';
import Contractor from '../models/ContractorModel';
import Logger from './Logger';
import HttpService from './HttpService';
import Skill, { SkillInput } from '../models/SkillModel';
import SearchFilterModel from '../models/SearchFilterModel';
import { PagingOptions } from '../types/Paging';

@Service('CrClassifierService')
export default class CrClassifierService {
  @Inject('Logger')
  logger: Logger;

  @Inject('HttpService')
  httpService: HttpService;

  crClassifierServiceUrl: string;

  constructor(@Inject('config') config) {
    this.crClassifierServiceUrl = config.CrClassifierServiceUrl;
  }

  async getClassifiedCandidateSkills(contractorId: number, candidateSkills: Skill[]): Promise<Contractor> {
    const skillsNameMap = {};
    const preparedSkills = (candidateSkills || []).reduce((resultSkills, skill) => {
      const skillName = skill.name;

      if (!skillsNameMap[skillName]) {
        resultSkills.push(skillName);

        skillsNameMap[skillName] = true;
      }

      return resultSkills;
    }, []);

    const result: any = await this.httpService.post(`${this.crClassifierServiceUrl}/classify/skills`, {
      contractorId,
      skills: preparedSkills
    });

    this.logger.info(`
    
      ---------------------------------------------------------------
      id: ${contractorId}
      skills: ${preparedSkills},
      result: ${JSON.stringify(result)}
      ---------------------------------------------------------------
      
    `);

    return result;
  }

  async searchContractors(filter: SearchFilterModel, pageOptions: PagingOptions) {
    const result: any = await this.httpService.post(`${this.crClassifierServiceUrl}/search/contractors`, {
      filter,
      pageOptions,
    });

    return result;
  }

  async suggestContractors(filter: SearchFilterModel, pageOptions: PagingOptions) {
    const result: any = await this.httpService.post(`${this.crClassifierServiceUrl}/suggest/contractors`, {
      filter,
      pageOptions,
    });

    return result;
  }

  async suggestSkills(skill: SkillInput, count: number) {
    const result: any = await this.httpService.post(`${this.crClassifierServiceUrl}/suggest/skills`, {
      skill,
      count,
    });

    return result;
  }

  async classifyContractors() {
    const result: any = await this.httpService.post(`${this.crClassifierServiceUrl}/classify/contractors`);

    return result;
  }

  async indexSkills() {
    const result: any = await this.httpService.post(`${this.crClassifierServiceUrl}/classify/skills`);

    return result;
  }

  async indexLocations() {
    const result: any = await this.httpService.post(`${this.crClassifierServiceUrl}/classify/locations`);

    return result;
  }

  async indexCategories() {
    const result: any = await this.httpService.post(`${this.crClassifierServiceUrl}/classify/categories`);

    return result;
  }

  async isAlive(): Promise<boolean> {
    const isAlive: boolean = await this.httpService.get(`${this.crClassifierServiceUrl}/noop`);

    return isAlive;
  }
}
