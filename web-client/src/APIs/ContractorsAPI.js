import gql from 'graphql-tag';
import ContractorFragment from '../fragments/ContractorFragment';
import GraphqlService from '../services/GraphqlService';

export const ContractorsPageResultFragment = gql`
    fragment ContractorsPageResultFragment on ContractorsPageResult {
        total
        data {
            ...ContractorFragment
        }
    }
    ${ContractorFragment}
`;

class AuthorizationAPI {
  constructor(graphqlService) {
    this.graphqlService = graphqlService;
  }

  async search(filter, pagingOptions) {
    const {searchContractors: contractorsPageResult } = await this.graphqlService.query({
      variables: {filter, pagingOptions},
      query: gql`
          query SearchContractors($filter: SearchFilter!, $pagingOptions: PagingOptions!) {
              searchContractors(filter: $filter, pagingOptions :$pagingOptions) {
                  ...ContractorsPageResultFragment
              }
          }
          ${ContractorsPageResultFragment}
      `,
    });

    return contractorsPageResult;
  }

  async getAll(pagingOptions) {
    const {getAllContractors: contractorsPageResult } = await this.graphqlService.query({
      variables: {pagingOptions},
      query: gql`
          query GetAllContractors($pagingOptions: PagingOptions!) {
              getAllContractors(pagingOptions :$pagingOptions) {
                  ...ContractorsPageResultFragment
              }
          }
          ${ContractorsPageResultFragment}
      `,
    });

    return contractorsPageResult;
  }

  async importProfile(url) {
    const { importContractor: result } = await this.graphqlService.mutate({
      variables: { url },
      mutation: gql`
          mutation ImportContractor($url: String!) {
              importContractor(url :$url) {
                  ...ContractorFragment
              }
          }
          ${ContractorFragment}
      `,
    });

    return result;
  }

  async importProfileBatch(url) {
    const { importContractorBatch: result } = await this.graphqlService.mutate({
      variables: { url },
      mutation: gql`
          mutation ImportContractorBatch($url: String!) {
              importContractorBatch(url :$url) {
                  ...ContractorFragment
              }
          }
          ${ContractorFragment}
      `,
    });

    return result;
  }
}

export default new AuthorizationAPI(GraphqlService);
