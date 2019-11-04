import { Field, InputType } from 'type-graphql';

@InputType()
export class UserSignInInput {
  @Field()
  public phone: string;

  @Field()
  public password: string;
}

@InputType()
export class InitiateSignUpInput {
  @Field({ nullable: true })
  public sponsorId: number;

  @Field()
  public phone: string;
}

@InputType()
export class VerificationInput {
  @Field()
  public code: string;

  @Field()
  public verificationToken: string;
}

@InputType()
export class SignUpInput {
  @Field()
  public firstName: string;

  @Field()
  public lastName: string;

  @Field()
  public password: string;

  @Field()
  public pincode: string;

  @Field()
  public signUpToken: string;
}
