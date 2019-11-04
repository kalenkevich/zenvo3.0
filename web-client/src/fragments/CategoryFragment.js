import gql from 'graphql-tag';

export default gql`
    fragment CategoryFragment on Category {
        id
        name
    }
`;
