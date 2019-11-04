import { Connection, EntityManager } from 'typeorm';

export default interface IDatabaseConnector {
  databaseUrl: string;
  connection: Connection;
  entityManager: EntityManager;

  connect(): Promise<any>;
}
