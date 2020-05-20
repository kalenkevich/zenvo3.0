import { Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import Logger from '../services/Logger';
import CrClassifierService from '../services/CrClassifierService';

@Resolver()
export default class ClassificationResolver {
  @Inject('Logger')
  public logger: Logger;

  @Inject('CrClassifierService')
  public crClassifierService: CrClassifierService;

  @Query(returns => Boolean)
  public async classifyContractors() {
    try {
      this.crClassifierService.classifyContractors();

      return true;
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }

  @Query(returns => Boolean)
  public async indexSkills() {
    try {
      this.crClassifierService.indexSkills();

      return true;
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }

  @Query(returns => Boolean)
  public async indexLocations() {
    try {
      this.crClassifierService.indexLocations();

      return true;
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }

  @Query(returns => Boolean)
  public async indexCategories() {
    try {
      this.crClassifierService.indexCategories();

      return true;
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }
}
