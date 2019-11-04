import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import Logger from '../services/Logger';
import { User } from '../models/UserModel';
import UserService from '../services/UserService';

@Resolver(User)
export default class UserResolver {
  @Inject('Logger')
  public logger: Logger;

  @Inject('UserService')
  public userService: UserService;

  @Query((returns) => User)
  public async getUser(@Arg('id') id: string) {
    try {
      const result = await this.userService.getUser(id);

      this.logger.info(`Successfully fetched user ${result.id}`);

      return result;
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }

  @Query((returns) => [User])
  public async getAllUsers(@Ctx('user') user: User) {
    try {
      const result = await this.userService.getAllUsers();

      this.logger.info(`Successfully fetched all users for user ${user}`);

      return result;
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }
}
