import gql from 'graphql-tag';
import CategoryFragment from './CategoryFragment';
import ContactsFragment from './ContactsFragment';
import LocationFragment from './LocationFragment';
import SkillFragment from './SkillFragment';

export default gql`
    fragment ContractorsFragment on Contractor {
        id
        name
        avatarUrl
        contacts {
            ...ContactsFragment
        }
        location {
            ...LocationFragment
        }
        category {
            ...CategoryFragment
        }
        skills {
            ...SkillFragment
        }
        description
    }
    ${LocationFragment}
    ${CategoryFragment}
    ${ContactsFragment}
    ${SkillFragment}
`;
