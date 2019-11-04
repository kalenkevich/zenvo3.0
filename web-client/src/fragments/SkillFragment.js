import gql from 'graphql-tag';

export default gql`
    fragment SkillFragment on Skill {
        id
        name
    }
`;
