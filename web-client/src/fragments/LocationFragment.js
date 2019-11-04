import gql from 'graphql-tag';

export default gql`
    fragment LocationFragment on Location {
        id
        name
        latitude
        longitude
    }
`;
