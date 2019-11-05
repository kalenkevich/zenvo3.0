import gql from 'graphql-tag';
import CategoryFragment from './CategoryFragment';
import ContactFragment from './ContactFragment';
import LocationFragment from './LocationFragment';
import SkillFragment from './SkillFragment';

export default gql`
    fragment ContractorFragment on Contractor {
        id
        name
        avatarUrl
        contacts {
            ...ContactFragment
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
    ${ContactFragment}
    ${SkillFragment}
`;
