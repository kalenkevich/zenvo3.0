import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  user = 'user',
  manager = 'manager',
  admin = 'admin',
}

export enum UserStatus {
  invited = 'invited',
  phoneConfirmed = 'phoneConfirmed',
  active = 'active',
  inactive = 'inactive',
}

export enum UserQualification {
  none = 'none',
  sponsor = 'sponsor',
}

registerEnumType(UserRole, {name: 'UserRole'});
registerEnumType(UserStatus, {name: 'UserStatus'});
registerEnumType(UserQualification, {name: 'UserQualification'});

@InputType()
export class UserInput {
  @Field((type) => ID)
  public id: number;

  @Field()
  public name: string;

  @Field()
  public email: string;

  @Field({nullable: true})
  public phone: string;

  @Field({nullable: true})
  public avatarUrl: string;
}

@Entity('users')
@ObjectType()
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column({ default: '' })
  avatarUrl: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.user })
  @Field((type) => UserRole)
  role: UserRole;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.invited })
  @Field((type) => UserStatus)
  status: UserStatus;

  //system purpose only
  @Column({ type: 'enum', enum: UserQualification, default: UserQualification.none })
  @Field(type => UserQualification)
  qualification: UserQualification;

  //authorization purpose only
  @Column({nullable: true})
  authorizationToken: string;

  @Column({nullable: true})
  refreshToken: string;

  @Column({nullable: true})
  verificationToken: string;

  @Column({nullable: true})
  signUpToken: string;

  @Column({nullable: true})
  verificationCode: string;

  @Column({nullable: true})
  password: string;

  @Column({nullable: true})
  pincode: string;
}
