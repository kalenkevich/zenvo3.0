import { ApolloError } from 'apollo-error';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import Logger from '../services/Logger';
import { User } from '../models/UserModel';
import {
  UserSignInInput,
  InitiateSignUpInput,
  VerificationInput,
  SignUpInput,
} from '../models/AuthorizationModel';
import AuthorizationService from '../services/AuthorizationService';

@Resolver(User)
export default class AuthorizationResolver {
  @Inject('AuthorizationService')
  public authorizationService: AuthorizationService;

  @Inject('Logger')
  public logger: Logger;

  @Mutation(returns => String)
  public async initiateSignUp(@Arg('initiateSignUpData') initiateSignUpData: InitiateSignUpInput, @Ctx('response') res) {
    try {
      return this.authorizationService.initiateSignUp(initiateSignUpData);
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }

  @Mutation(returns => String)
  public async verifyCode(@Arg('verificationData') verificationData: VerificationInput, @Ctx('response') res) {
    try {
      return this.authorizationService.verifyCode(verificationData);
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }

  @Mutation(returns => Boolean)
  public async signUp(@Arg('signUpData') signUpData: SignUpInput, @Ctx('response') res) {
    try {
      const authorizationToken = await this.authorizationService.signUp(signUpData);

      res.cookie('authorizationToken', authorizationToken);

      return true;
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }

  @Mutation(returns => User)
  public async signIn(@Arg('signInData') signInData: UserSignInInput, @Ctx('response') res) {
    try {
      const user = await this.authorizationService.signIn(signInData);

      res.cookie('authorizationToken', user.authorizationToken);

      return user;
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }

  @Query(returns => User)
  public async authorize(@Ctx('request') req) {
    try {
      const { authorizationToken } = req.cookies;

      return this.authorizationService.authenticate(authorizationToken);
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }

  @Query(returns => Boolean)
  public async signOut(@Ctx('authorizationToken') authorizationToken, @Ctx('response') res) {
    try {
      await this.authorizationService.signOut(authorizationToken);

      res.clearCookie('authorizationToken');

      this.logger.info(`User was signed out with token: ${authorizationToken}`);

      return true;
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }
}
