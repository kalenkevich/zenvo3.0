import { Inject, Service } from 'typedi';
import Logger from './Logger';
import { EntityManager } from 'typeorm';
import Location from '../models/LocationModel';

@Service('LocationService')
export default class LocationService {
  @Inject('Logger')
  logger: Logger;

  @Inject('EntityManager')
  entityManager: EntityManager;

  async findOrCreateLocations(names: string[]) {
    const foundedCategories = await this.getLocationsByNames(names);
    const foundedCategoriesMap = (foundedCategories || []).reduce((result, item) => ({ ...result, [item.name]: true }), {});
    const categoriesToCreate = (names || []).filter(name => !foundedCategoriesMap[name]);
    const createdCategories = await this.createLocations(categoriesToCreate);

    return [...foundedCategories, ...createdCategories];
  }

  getLocationsByNames(names: string[]) {
    if (names.length === 0) {
      return [];
    }

    return this.entityManager
    .createQueryBuilder()
    .select('location')
    .from(Location, 'location')
    .where("location.name IN (:...names)", { names })
    .getMany();
  }

  async createLocations(names: string[]) {
    const values = (names || []).map(name => ({ name }));

    if (names.length === 0) {
      return [];
    }

    await this.entityManager
    .createQueryBuilder()
    .insert()
    .into(Location)
    .values(values)
    .execute();

    return this.getLocationsByNames(names);
  }
}
