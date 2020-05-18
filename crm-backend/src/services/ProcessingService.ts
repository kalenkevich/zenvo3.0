import Contractor from '../models/ContractorModel';
import { Inject, Service } from 'typedi';
import { EntityManager } from 'typeorm';
import Logger from './Logger';
import Location from '../models/LocationModel';
import GeoLocationService from './GeoLocationService';
import CrClassifierService from './CrClassifierService';

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
}
