import gql from 'graphql-tag';

export default gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    phone
    role
    avatarUrl
  }
`;
