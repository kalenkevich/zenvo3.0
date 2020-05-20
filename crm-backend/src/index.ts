import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
// tslint:disable-next-line
import express from 'express';
import { Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import settings from '../config/settings';
import PostgresDBService from './database/PostgresDBService';
import resolvers from './resolvers';
import Logger from './services/Logger';
import CrScoutService from './services/CrScoutService';
import CrSearchService from './services/CrSearchService';
import CrClassifierService from './services/CrClassifierService';
import ContractorsService from './services/ContractorsService';

Container.set('config', settings);

const logger: Logger = Container.get('Logger');

export class ApplicationServer {
  public app: Application;
  public server: ApolloServer;
  public settings: any;

  constructor(settings: any) {
    this.settings = settings;
    this.app = express();
  }

  public async init() {
    this.registerBodyParsers();
    this.configureHeaders();
    await this.initCrmDatabase();
    await this.initCrScout();
    await this.initCrSearch();
    await this.initClassifier();
    await this.initServer();
  }

  public registerBodyParsers() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(cookieParser(settings.tokenSecret));
  }

  public configureHeaders() {
    this.app.use(cors((req, callback) => {
      const currentClientOrigin = req.header('origin');
      const origin = (settings.allowedClientOrigins || []).find(
        (allowedOrigin) => allowedOrigin === currentClientOrigin);

      callback(null, {origin, credentials: true});
    }));
  }

  public async initCrmDatabase() {
    const dBConnector = new PostgresDBService(settings.CrmDatabaseUrl);

    await dBConnector.connect();

    logger.info(`DB connected to ${this.settings.CrmDatabaseUrl}`);

    Container.set('EntityManager', dBConnector.entityManager);
  }

  public async initCrScout() {
    const crScoutService: CrScoutService = Container.get('CrScoutService');

    try {
      await crScoutService.isAlive();

      logger.info(`CrScout: connected to ${this.settings.CrScoutServiceUrl}`)
    } catch (error) {
      logger.error(`CrScout: error connection to ${this.settings.CrScoutServiceUrl} ${error}`)
    }
  }

  public async initCrSearch() {
    const crSearchService: CrSearchService = Container.get('CrSearchService');

    try {
      await crSearchService.isAlive();

      logger.info(`CrSearch: connected to ${this.settings.CrSearchServiceUrl}`)
    } catch (error) {
      logger.error(`CrSearch: error connection to ${this.settings.CrSearchServiceUrl} ${error}`)
    }
  }

  public async initClassifier() {
    const crClassifierService: CrClassifierService = Container.get('CrClassifierService');

    try {
      await crClassifierService.isAlive();

      logger.info(`CrClassifierService: connected to ${this.settings.CrClassifierServiceUrl}`)
    } catch (error) {
      logger.error(`CrClassifierService: error connection to ${this.settings.CrClassifierServiceUrl} ${error}`)
    }
  }

  public async initServer() {
    this.app.set('port', this.settings.port);

    const schema = await buildSchema({
      resolvers,
      container: Container,
    });

    // @ts-ignore
    this.server = new ApolloServer({
      schema,
      context: async ({req, res}) => ({ request: req, response: res }),
    });

    this.server.applyMiddleware({
      app: this.app,
      cors: false,
    });
  }

  public run() {
    try {
      this.app.listen({
        port: this.settings.port,
      }, () => {
        logger.info(`CRMBackend running on port :${this.settings.port}`);

        const contractorsService: ContractorsService = Container.get('ContractorsService');
      });
    } catch (e) {
      logger.error(e);
    }
  }
}

(async () => {
  const server = new ApplicationServer(settings);

  await server.init();

  server.run();
})();
