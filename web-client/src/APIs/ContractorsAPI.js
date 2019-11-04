import gql from 'graphql-tag';
import ContractorsFragment from '../fragments/ContractorsFragment';
import GraphqlService from '../services/GraphqlService';

export const ContractorsPageResult = gql`
    total
    data {
    ...ContractorsFragment
    }
    ${ContractorsFragment}
`;

class AuthorizationAPI {
  constructor(graphqlService) {
    this.graphqlService = graphqlService;
  }

  async search(filter, pagingOptions) {
    const {searchContractors: contractorsPageResult } = await this.graphqlService.query({
      variables: {filter, pagingOptions},
      query: gql`
          query SearchContractors($filter: SearchFilter!, $pagingOptions: PagingOptions) {
              searchContractors(filter: $filter, pagingOptions :$pagingOptions) {
                  ContractorsPageResult
              }
          }
          ${ContractorsPageResult}
      `,
    });

    return contractorsPageResult;
  }
}

export default new AuthorizationAPI(GraphqlService);
