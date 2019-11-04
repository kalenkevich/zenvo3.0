import { Service } from 'typedi';
import { Connection, createConnection, EntityManager } from 'typeorm';
import DatabaseConnectorInterface from './DatabaseInterface';
import entities from '../models';

@Service('PostgresDBConnector')
export default class PostgresDBConnector implements DatabaseConnectorInterface {
  public databaseUrl: string;
  public connection: Connection;
  public entityManager: EntityManager;

  constructor(databaseUrl) {
    this.databaseUrl = databaseUrl;
  }

  public async connect() {
    this.connection = await createConnection({
      type: 'postgres',
      url: this.databaseUrl,
      entities,
      extra: {
        ssl: process.env.ENVIRONMENT !== 'local',
        timezone: 'utc',
      },
      synchronize: true,
      logging: false,
    });

    this.entityManager = new EntityManager(this.connection);

    return this.connection;
  }
}
