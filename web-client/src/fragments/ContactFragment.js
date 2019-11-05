import gql from 'graphql-tag';

export default gql`
    fragment ContactFragment on Contact {
        type
        value
    }
`;
