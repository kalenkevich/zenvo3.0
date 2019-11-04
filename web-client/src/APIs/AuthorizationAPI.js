import gql from 'graphql-tag';
import UserFragment from '../fragments/UserFragment';
import GraphqlService from '../services/GraphqlService';

class AuthorizationAPI {
  constructor(graphqlService) {
    this.graphqlService = graphqlService;
  }

  async initiateSignUp(phone, sponsorId) {
    const { initiateSignUp: verificationToken } = await this.graphqlService.mutate({
      variables: {
        initiateSignUpData: {
          phone,
          sponsorId: parseFloat(sponsorId) || null,
        },
      },
      mutation: gql`
        mutation InitiateSignUp($initiateSignUpData: InitiateSignUpInput!) {
          initiateSignUp(initiateSignUpData: $initiateSignUpData)
        }
      `,
    });

    return verificationToken;
  }

  async verifyCode(code, verificationToken) {
    const { verifyCode: signUpToken } = await this.graphqlService.mutate({
      variables: {
        verificationData: {
          code,
          verificationToken,
        },
      },
      mutation: gql`
        mutation VerifyCode($verificationData: VerificationInput!) {
          verifyCode(verificationData: $verificationData)
        }
      `,
    });

    return signUpToken;
  }

  async signUp(signUpData, signUpToken) {
    const { signUp: result } = await this.graphqlService.mutate({
      variables: {
        signUpData: {
          ...signUpData,
          signUpToken,
        },
      },
      mutation: gql`
        mutation SignUp($signUpData: SignUpInput!) {
          signUp(signUpData: $signUpData)
        }
      `,
    });

    return result;
  }

  async authorize() {
    const { authorize: user } = await this.graphqlService.query({
      query: gql`
        query Authorize {
          authorize {
            ...UserFragment
          }
        }
        ${UserFragment}
      `,
    });

    return user;
  }

  async signIn(phone, password) {
    const { signIn: user } = await this.graphqlService.mutate({
      variables: {
        signInData: {
          phone,
          password,
        },
      },
      mutation: gql`
        mutation SignIn($signInData: UserSignInInput!) {
          signIn(signInData: $signInData) {
            ...UserFragment
          }
        }
        ${UserFragment}
      `,
    });

    return user;
  }

  async signOut() {
    const { signOut: result } = await this.graphqlService.query({
      query: gql`
        query SignOut {
          signOut
        }
      `,
    });

    return result;
  }
}

export default new AuthorizationAPI(GraphqlService);
