import * as bcrypt from 'bcrypt-nodejs';
import { Inject, Service } from 'typedi';
import { EntityManager, UpdateResult } from 'typeorm';
import { User, UserInput, UserRole, UserStatus } from '../models/UserModel';

@Service('UserService')
export default class UserService {
  @Inject('EntityManager')
  public entityManager: EntityManager;

  public async getUser(selectOptions): Promise<User> {
    return this.entityManager.findOne(User, selectOptions);
  }

  public getAllUsers() {
    return this.entityManager.find(User);
  }

  public initiateUser(phone: string, verificationCode: string) {
    return this.createUser({
      phone,
      verificationCode,
    });
  }

  public createUser(userData: any): Promise<User> {
    const createdUser = this.entityManager.create(User, {
      ...userData,
      role: UserRole[userData.role],
    });

    return this.entityManager.save(createdUser);
  }

  public updateUser(user: any): Promise<UpdateResult> {
    return this.entityManager.update(User, user.id, {...user});
  }

  public setVerificationToken(userId: number, verificationToken: string) {
    return this.entityManager.update(User, userId, { verificationToken });
  }

  public removeVerificationToken(userId: number) {
    return this.setVerificationToken(userId, null);
  }

  public removeCode(userId: number) {
    return this.entityManager.update(User, userId, { verificationCode: null });
  }

  public setSignUpToken(userId: number, signUpToken: string) {
    return this.entityManager.update(User, userId, { signUpToken });
  }

  public removeSignUpToken(userId: number) {
    return this.setSignUpToken(userId, null);
  }

  public setAuthorizationToken(userId: number, authorizationToken: string): Promise<UpdateResult> {
    return this.entityManager.update(User, userId, { authorizationToken });
  }

  public removeAuthorizationToken(userId: number): Promise<UpdateResult> {
    return this.setAuthorizationToken(userId, null);
  }

  public setStatus(userId: number, status: UserStatus): Promise<UpdateResult> {
    return this.entityManager.update(User, userId, { status });
  }

  public async changePassword(userId, oldPassword, newPassword): Promise<UpdateResult | boolean> {
    const user = await this.getUser({id: userId});
    const isValidPassword = bcrypt.compareSync(oldPassword, user.password);

    if (isValidPassword) {
      return this.entityManager.update(User, userId, {password: newPassword});
    }

    return false;
  }

  public changePhone(userId, newPhone): Promise<UpdateResult> {
    return this.entityManager.update(User, userId, {phone: newPhone});
  }
}
