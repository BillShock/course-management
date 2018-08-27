import gql from "graphql-tag";

export const GET_PAGINATION = gql`
{
  pagination @client{
    fatture{
        initial
        final
        perPage
        current
    }
  }
}`;

export const GET_FATTURA = gql`
query ($anno: String, $numero: Int) {
    fattura(anno: $anno, numero: $numero) {
        numero
        anno
        data
        importo
        totale
    }
}`;

export const ADD_FATTURA = gql`
mutation createFattura($input: FatturaInput!) {
    createFattura(input: $input) {
        numero
        anno
    }
}`;


export const DELETE_FATTURA = gql`
mutation($numero: Int,$anno: String){
    deleteFattura(numero:$numero,anno:$anno){
        anno
        numero
    }
}`;