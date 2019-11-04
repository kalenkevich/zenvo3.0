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
import DatabaseConnector from './database/DatabaseInterface';
import PostgresDBService from './database/PostgresDBService';
import resolvers from './resolvers';
import Logger from './services/Logger';
import { User, UserRole } from './models/UserModel';

const logger: Logger = Container.get('Logger');

const currentConfiguration = process.env.ENVIRONMENT || 'development';
const port = process.env.PORT || settings.port;

logger.info(`Environment: ${currentConfiguration}`);

export class ApplicationServer {
  public app: Application;
  public server: ApolloServer;

  constructor(private dbConnector: DatabaseConnector) {
    this.app = express();
  }

  get userRepository() {
    return this.dbConnector.connection.getRepository(User);
  }

  public async init() {
    this.registerBodyParsers();
    this.configureHeaders();
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

  public async initServer() {
    this.app.set('port', port);

    const schema = await buildSchema({
      resolvers,
      authChecker: ({root, args, context, info}, roles: UserRole[]) => {
        const {user} = context;

        return roles.indexOf(user.role) !== -1;
      },
      container: Container,
    });

    this.server = new ApolloServer({
      schema,
      context: async ({req, res}) => {
        return { request: req, response: res };
      },
    });

    this.server.applyMiddleware({
      app: this.app,
      cors: false,
    });
  }

  public run() {
    try {
      this.app.listen({port}, () => logger.info(`CRM Backend API running on port :${port}`));
    } catch (e) {
      console.error(e);
    }
  }
}

const dBConnector = new PostgresDBService(settings.databaseUrl);

dBConnector.connect().then(async () => {
  logger.info(`DB connected to ${settings.databaseUrl}`);

  Container.set('EntityManager', dBConnector.entityManager);

  const server = new ApplicationServer(dBConnector);
  await server.init();

  server.run();
});
