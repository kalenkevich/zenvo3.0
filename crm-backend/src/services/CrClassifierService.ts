import { Inject, Service } from 'typedi';
import Contractor from '../models/ContractorModel';
import Logger from './Logger';
import HttpService from './HttpService';
import Skill from '../models/SkillModel';

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

    this.logger.info(`Contractor ${contractorId} result: ${JSON.stringify(result)}`);

    return result;
  }

  async isAlive(): Promise<boolean> {
    const isAlive: boolean = await this.httpService.get(`${this.crClassifierServiceUrl}/noop`);

    return isAlive;
  }
}
