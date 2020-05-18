import _ from 'lodash';
import axios from 'axios';
import { Inject, Service } from 'typedi';
import { EntityManager } from 'typeorm';
import Logger from './Logger';
import Location from '../models/LocationModel';

@Service('GeoLocationService')
export default class GeoLocationService {
  @Inject('Logger')
  logger: Logger;

  @Inject('EntityManager')
  entityManager: EntityManager;

  GeoLocationServiceUrl: string;
  GeoLocationServiceAPIKey: string;

  constructor(@Inject('config') config: any) {
    this.GeoLocationServiceUrl = config.GeoLocationServiceUrl;
    this.GeoLocationServiceAPIKey = config.GeoLocationServiceAPIKey;
  }

  async getLocation(locationName: any) {
    const processedName = encodeURI(locationName);

    let result = {
      name: locationName,
      city: locationName,
      country: 'US',
      latitude: null as string,
      longitude: null as string,
    };

    try {
      const address = `${this.GeoLocationServiceUrl}++${processedName}&key=${this.GeoLocationServiceAPIKey}`;
      const response = await axios.get(address);
      const [locationData] = response.data.results;
      const location = _.get(locationData, 'geometry.location');
      const addressComponents = _.get(locationData, 'address_components');
      const country = (addressComponents || []).find(
        (address: any) => (address.types || []).find(
          (type: string) => type === 'country')) || {};

      result = {
        name: locationName,
        city: locationName,
        country: country.long_name,
        latitude: location.lat.toString(),
        longitude: location.lng.toString(),
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new Error('LOCATION_DETECTION_ERROR');
    }

    return result;
  }
}
