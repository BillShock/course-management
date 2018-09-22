import gql from "graphql-tag";

export const GET_PAGINATION = gql`
{
  pagination @client{
    societa{
        initial
        final
        perPage
        current
    }
  }
}
`;

export const GET_SOCIETA_ALL = gql`
query ($first: Int, $offset: Int, $textFilter: String) {
    societaAll(first: $first, offset: $offset, textFilter: $textFilter) {
      id
      rag_sociale
      p_iva
      dvr
    }
  }
`;


export const GET_SOCIETA = gql`
query ($id: ID!) {
    societa(id: $id) {
        rag_sociale
        dvr
        indirizzo
        civico
        cap
        citta
        telefono
        email
        note
        fatture {
          anno
          numero
          importo
          totale
        }
       
    }
  }
`;

export const DELETE_SOCIETA = gql`
mutation($id: ID!){
    deleteSocieta(id: $id){
        id
        rag_sociale
        p_iva
        dvr
    }
}
`;
