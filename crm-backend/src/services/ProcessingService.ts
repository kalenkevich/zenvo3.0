import Contractor from '../models/ContractorModel';
import { Inject, Service } from 'typedi';
import { EntityManager } from 'typeorm';
import Logger from './Logger';
import Location from '../models/LocationModel';
import GeoLocationService from './GeoLocationService';
import CrClassifierService from './CrClassifierService';
import Category from '../models/CategoryModel';
import Skill from '../models/SkillModel';

@Service('ProcessingService')
export default class ProcessingService {
  @Inject('Logger')
  logger: Logger;

  @Inject('EntityManager')
  entityManager: EntityManager;

  @Inject('GeoLocationService')
  geoLocationService: GeoLocationService;

  @Inject('CrClassifierService')
  crClassifierService: CrClassifierService;

  async setupRandomRate() {
    const allContractors = await this.entityManager.find(Contractor);

    return Promise.all((allContractors || []).map((contractor) => {
      const rate = this.getRandomRate();

      this.logger.info(`Set for ${contractor.id} ${contractor.name} rate: ${rate}`);

      return this.entityManager.update(
        Contractor,
        contractor.id,
        { rate: Number(rate) },
      );
    }));
  }

  getRandomRate(): number {
    const max = 5;
    const min = 2;
    const rate: number = Math.random() * (max - min) + min;

    return Number(rate.toFixed(2));
  }

  async setupAllGeoLocations() {
    const allLocations = await this.entityManager.find(Location);

    return Promise.all(
      (allLocations || []).map(async (locationModel: Location) => {
        const location = await this.geoLocationService.getLocation(locationModel.name);

        return this.entityManager.update(Location, locationModel.id, location);
      }));
  }

  async classifyContractors() {
    const pageOptions = {
      page: 0,
      pageSize: 20,
    };
    const [data, total] = await this.entityManager.getRepository(Contractor).findAndCount({
      relations: ['location', 'category', 'skills'],
      skip: pageOptions.page * pageOptions.pageSize,
      take: pageOptions.pageSize,
    });
    const contractors = data as Contractor[];

    return Promise.all((contractors || [])
      .filter(contractor => contractor.skills.length > 0)
      .map(contractor => this.crClassifierService.getClassifiedCandidateSkills(contractor.id, contractor.skills))
    );
  }

  async removeAllLocationsDuplicates() {
    let index = 0;
    let allLocations = await this.entityManager.getRepository(Location).find();

    while (index < allLocations.length) {
      const originalLocation = allLocations[index];

      const cloneLocationIds = (allLocations || []).reduce((ids, loc) => {
        if (loc.id !== originalLocation.id && loc.name === originalLocation.name) {
          ids.push(loc.id);
        }

        return ids;
      }, []);

      if (cloneLocationIds.length > 0) {
        await this.entityManager.query(`
        UPDATE contractors c SET "locationId" = $1 WHERE c."locationId" = ANY($2::int[])
      `, [originalLocation.id, cloneLocationIds]);

        await this.entityManager.query(`
        DELETE FROM locations WHERE id = ANY($1::int[])
      `, [cloneLocationIds]);

        allLocations = (allLocations || []).filter(loc => !cloneLocationIds.includes(loc.id));
      }

      index++;
    }
  }

  async removeAllCategoriesDuplicates() {
    let index = 0;
    let allCategories = await this.entityManager.getRepository(Category).find();

    while (index < allCategories.length) {
      const originalCategory = allCategories[index];

      const cloneCategoriesIds = (allCategories || []).reduce((ids, cat) => {
        if (cat.id !== originalCategory.id && cat.name === originalCategory.name) {
          ids.push(cat.id);
        }

        return ids;
      }, []);

      if (cloneCategoriesIds.length > 0) {
        await this.entityManager.query(`
        UPDATE contractors c SET "categoryId" = $1 WHERE c."categoryId" = ANY($2::int[])
      `, [originalCategory.id, cloneCategoriesIds]);

        await this.entityManager.query(`
        DELETE FROM categories WHERE id = ANY($1::int[])
      `, [cloneCategoriesIds]);

        allCategories = (allCategories || []).filter(cat => !cloneCategoriesIds.includes(cat.id));
      }

      index++;
    }
  }

  async removeAllSkillsDuplicates() {
    let index = 0;
    let allSkills = await this.entityManager.getRepository(Skill).find();

    while (index < allSkills.length) {
      const originalSkill = allSkills[index];

      const cloneSkillsIds = (allSkills || []).reduce((ids, skl) => {
        if (skl.id !== originalSkill.id && skl.name === originalSkill.name) {
          ids.push(skl.id);
        }

        return ids;
      }, []);

      if (cloneSkillsIds.length > 0) {
        await this.entityManager.query(`
          DELETE FROM contractors_skills_skills css WHERE css."skillsId" = ANY($1::int[]);
        `, [cloneSkillsIds]);

        await this.entityManager.query(`
          DELETE FROM skills s WHERE s."id" = ANY($1::int[]);
        `, [cloneSkillsIds]);

        allSkills = (allSkills || []).filter(cat => !cloneSkillsIds.includes(cat.id));
      }

      index++;
    }
  }
}
