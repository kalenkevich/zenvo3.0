import { Inject, Service } from 'typedi';
import Logger from './Logger';
import { EntityManager } from 'typeorm';
import SkillModel from '../models/SkillModel';

@Service('SkillsService')
export default class SkillsService {
  @Inject('Logger')
  logger: Logger;

  @Inject('EntityManager')
  entityManager: EntityManager;

  async findOrCreateSkills(names: string[]) {
    const foundedCategories = await this.getSkillsByNames(names);
    const foundedCategoriesMap = (foundedCategories || []).reduce((result, item) => ({ ...result, [item.name]: true }), {});
    const categoriesToCreate = (names || []).filter(name => !foundedCategoriesMap[name]);
    const createdCategories = await this.createSkills(categoriesToCreate);

    return [...foundedCategories, ...createdCategories];
  }

  getSkillsByNames(names: string[]) {
    return this.entityManager
    .createQueryBuilder()
    .select('skill')
    .from(SkillModel, 'skill')
    .where("'skill.name' IN (:names)", { names })
    .getMany();
  }

  async createSkills(names: string[]) {
    const values = (names || []).map(name => ({ name }));

    await this.entityManager
    .createQueryBuilder()
    .insert()
    .into(SkillModel)
    .values(values)
    .execute();

    return this.getSkillsByNames(names);
  }
}
