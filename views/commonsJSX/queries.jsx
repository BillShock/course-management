    import gql from "graphql-tag";

    export const GET_PAGINATION = gql`
        {
          pagination @client{
            privati{
                initial
                final
                perPage
                current
            }
          }
        }
      `;