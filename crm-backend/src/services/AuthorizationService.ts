import { ApolloError } from 'apollo-error';
import * as bcrypt from 'bcrypt-nodejs';
import * as jwt from 'jsonwebtoken';
import { Inject, Service } from 'typedi';
import Config from '../../config/settings';
import { User, UserStatus } from '../models/UserModel';
import {
  InitiateSignUpInput,
  VerificationInput,
  SignUpInput,
} from '../models/AuthorizationModel';
import UserService from './UserService';
import SMSService from './SMSService';
import InvitationService from './InvitationService';
import { BinaryRule } from '../models/BinaryNodeModel';

const {tokenSecret} = Config;

@Service('AuthorizationService')
export default class AuthorizationService {
  @Inject('UserService')
  public userService: UserService;

  @Inject('SMSService')
  public smsService: SMSService;

  @Inject('InvitationService')
  public invitationService: InvitationService;

  public async initiateSignUp(initiateSignUpData: InitiateSignUpInput): Promise<string> {
    const { phone, sponsorId } = initiateSignUpData;
    const existingUser = await this.userService.getUser({ phone });

    if (existingUser) {
      throw new ApolloError('User with such phone already exist', 401);
    }

    const code = await this.generateCode();
    const invitedUser = await this.userService.initiateUser(phone, code);
    const verificationToken = await jwt.sign({ userId: invitedUser.id }, tokenSecret);

    await this.smsService.sendSms(phone, code);
    await this.userService.setVerificationToken(invitedUser.id, verificationToken);

    if (sponsorId) {
      await this.invitationService.createInvitation({
        user: invitedUser,
        sponsor: { id: sponsorId },
        binaryRule: BinaryRule.auto,
      });
    }

    return verificationToken;
  }

  public async verifyCode(verificationData: VerificationInput): Promise<string> {
    const { code, verificationToken } = verificationData;
    const { userId }: any = await jwt.decode(verificationToken);
    const user = await this.userService.getUser(userId);

    if (user.verificationToken !== verificationToken) {
      throw new ApolloError('Verification token is not valid', 401);
    }

    if (user.verificationCode !== code) {
      throw new ApolloError('Code is not valid', 401);
    }

    await this.userService.removeVerificationToken(userId);
    await this.userService.removeCode(userId);

    const signUpToken = await jwt.sign({ userId, code }, tokenSecret);

    await this.userService.setSignUpToken(userId, signUpToken);
    await this.userService.setStatus(userId, UserStatus.phoneConfirmed);

    return signUpToken;
  }

  public async signUp(signUpData: SignUpInput): Promise<string> {
    const { userId }: any = await jwt.decode(signUpData.signUpToken);
    const existingUser = await this.userService.getUser(userId);
    const chippedPassword = bcrypt.hashSync(signUpData.password);

    await this.userService.updateUser({
      ...existingUser,
      ...signUpData,
      password: chippedPassword,
    });

    await this.userService.removeSignUpToken(userId);
    await this.userService.setStatus(userId, UserStatus.active);

    return this.regenerateToken(userId);
  }

  public async signIn({phone, password}): Promise<User> {
    const user = await this.userService.getUser({phone});

    if (user) {
      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!isValidPassword) {
        throw new ApolloError('phone or password is invalid', 401);
      }

      if (user.status === UserStatus.invited) {
        throw new ApolloError('Account is not yet activated', 401);
      }

      if (user.status === UserStatus.phoneConfirmed) {
        throw new ApolloError('Account is not yet activated', 401);
      }

      if (user.status === UserStatus.inactive) {
        throw new ApolloError('Account is inactive', 401);
      }

      const verificationToken = await this.regenerateToken(user.id);

      return this.authenticate(verificationToken);
    }

    throw new ApolloError('phone or password is invalid', 401);
  }

  public async regenerateToken(userId: number): Promise<string> {
    const authorizationToken = await jwt.sign({ id: userId }, tokenSecret);

    await this.userService.setAuthorizationToken(userId, authorizationToken);

    return authorizationToken;
  }

  public async authenticate(authorizationToken: string): Promise<User> {
    const user = await this.userService.getUser({ authorizationToken });

    if (!user) {
      throw new ApolloError('can\'t authorize with provided token', 401);
    }

    return user;
  }

  public async signOut(authorizationToken: string) {
    const user = await this.userService.getUser({ authorizationToken });

    return this.userService.removeAuthorizationToken(user.id);
  }

  private generateCode() {
    return Promise.resolve('1111');
  }
}
