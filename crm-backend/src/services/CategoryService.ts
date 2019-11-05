import { Inject, Service } from 'typedi';
import Logger from './Logger';
import { EntityManager } from 'typeorm';
import Category from '../models/CategoryModel';

@Service('CategoryService')
export default class CategoryService {
  @Inject('Logger')
  logger: Logger;

  @Inject('EntityManager')
  entityManager: EntityManager;

  async findOrCreateCategories(names: string[]) {
    const foundedCategories = await this.getCategoriesByNames(names);
    const foundedCategoriesMap = (foundedCategories || []).reduce((result, item) => ({ ...result, [item.name]: true }), {});
    const categoriesToCreate = (names || []).filter(name => !foundedCategoriesMap[name]);
    const createdCategories = await this.createCategories(categoriesToCreate);

    return [...foundedCategories, ...createdCategories];
  }

  getCategoriesByNames(names: string[]) {
    if (names.length === 0) {
      return [];
    }

    return this.entityManager
      .createQueryBuilder()
      .select('category')
      .from(Category, 'category')
      .where("category.name IN (:...names)", { names })
      .getMany();
  }

  async createCategories(names: string[]) {
    const values = (names || []).map(name => ({ name }));

    if (names.length === 0) {
      return [];
    }

    await this.entityManager
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values(values)
      .execute();

    return this.getCategoriesByNames(names);
  }
}
