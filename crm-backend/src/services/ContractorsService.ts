import { Inject, Service } from 'typedi';
import { EntityManager } from 'typeorm';
import Contractor from '../models/ContractorModel';
import SearchFilterModel from '../models/SearchFilterModel';
import Logger from './Logger';
import CrScoutService from './CrScoutService';
import CrSearchService from './CrSearchService';
import CrClassifierService from './CrClassifierService';
import CategoryService from './CategoryService';
import LocationService from './LocationService';
import SkillsService from './SkillsService';
import ProcessingService from './ProcessingService';
import { ContractorsPageResult, PagingOptions } from '../types/Paging';

@Service('ContractorsService')
export default class ContractorsService {
  @Inject('Logger')
  logger: Logger;

  @Inject('EntityManager')
  entityManager: EntityManager;

  @Inject('CrSearchService')
  crSearchService: CrSearchService;

  @Inject('CrScoutService')
  crScoutService: CrScoutService;

  @Inject('CrClassifierService')
  crClassifierService: CrClassifierService;

  @Inject('CategoryService')
  categoryService: CategoryService;

  @Inject('LocationService')
  locationService: LocationService;

  @Inject('SkillsService')
  skillsService: SkillsService;

  @Inject('ProcessingService')
  processingService: ProcessingService;

  async search(filter: SearchFilterModel, pageOptions: PagingOptions): Promise<ContractorsPageResult> {
    this.logger.info(`[ContractorsService.search]: Try to search contractors with filter: ${JSON.stringify(filter)}`);

    try {
      const data = await this.crClassifierService.searchContractors(filter, pageOptions);

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
      const [data, total] = await this.entityManager.getRepository(Contractor).findAndCount({
        relations: ['location', 'category', 'skills'],
        skip: pageOptions.page * pageOptions.pageSize,
        take: pageOptions.pageSize,
      });

      return {
        data,
        total,
      };
    } catch (error) {
      this.logger.error(`[ContractorsService.getAll]: Error while search contractors: ${error.message}`);

      throw error;
    }
  }

  async getContractor(id: number): Promise<Contractor> {
    return this.entityManager.findOne(Contractor, id, {
      relations: ['location', 'category', 'skills'],
    });
  }

  async createContractor(contractor: Contractor) {
    const createdContractor = this.entityManager.create(Contractor, contractor);

    return this.entityManager.save(createdContractor);
  }

  updateContractor(contractor: Contractor) {
    return this.entityManager.update(Contractor, contractor.id, contractor);
  }

  async importContractor(url: string): Promise<Contractor> {
    this.logger.info('[ContractorsService.importContractor]: Try to import contractor');

    try {
      const rawContractor = await this.crScoutService.importContractor(url);

      return this.saveImportedContractor(rawContractor);
    } catch (error) {
      this.logger.error(`[ContractorsService.importContractor]: Error while import contractor: ${error.message}`);

      throw error;
    }
  }

  async importContractorBatch(url: string): Promise<Contractor[]> {
    this.logger.info('[ContractorsService.importContractorBatch]: Try to import contractors');

    try {
      const rawContractors = await this.crScoutService.importContractorBatch(url);

      return await Promise.all((rawContractors || []).map(async (contractor) => {
        await this.saveImportedContractor(contractor);
      })) as Contractor[];
    } catch (error) {
      this.logger.error(`[ContractorsService.importContractorBatch]: Error while import contractors: ${error.message}`);

      throw error;
    }
  }

  private async saveImportedContractor(rawContractor: Contractor): Promise<Contractor> {
    const alreadyExistContractor = await this.findContractorBySourceId(rawContractor.sourceId);

    const [
      [category],
      [location],
      skills,
    ] = await Promise.all([
      this.categoryService.findOrCreateCategories([rawContractor.category.name]),
      this.locationService.findOrCreateLocations([rawContractor.location.name]),
      this.skillsService.findOrCreateSkills(
        (rawContractor.skills || []).filter(({name}) => name).
          map(({name}) => name)),
    ]);

    const contractorData = {
      ...rawContractor,
      category,
      location,
      skills,
    };

    if (alreadyExistContractor) {
      for (const key in contractorData) {
        alreadyExistContractor[key] = contractorData[key];
      }

      return this.entityManager.save(alreadyExistContractor);
    }

    return this.createContractor(contractorData);
  }

  async findContractorBySourceId(sourceId?: string) {
    if (sourceId) {
      return this.entityManager.findOne(Contractor, { sourceId });
    }

    return null;
  }
}
