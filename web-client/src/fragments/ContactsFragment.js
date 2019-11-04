import gql from 'graphql-tag';

export default gql`
    fragment ContactsFragment on Contacts {
        type
        value
    }
`;
