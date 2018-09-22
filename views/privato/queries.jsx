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

export const GET_PRIVATO_ALL = gql`
query ($first: Int, $offset: Int, $textFilter: String) {
    privato_all(first: $first, offset: $offset, textFilter: $textFilter) {
      id
      nome
      cognome
      cf
    }
  }
`;


export const GET_PRIVATO = gql`
query ($id: ID!) {
    privato(id: $id) {
        nome
        cognome
        indirizzo
        civico
        cap
        cf
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
        iscrizioni{
          codice
          prezzo
          esito_esame
          corso{
            codice
            nome
            ore
          }
          rate{
            num_rata
            num_ricevuta
            metodo
            importo
            data
          }
        }
    }
  }
`;

export const DELETE_PRIVATO = gql`
mutation($id: ID!){
    deletePrivato(id: $id){
        id
        nome
        cognome
    }
}
`;

export const ADD_RATA = gql`
mutation($input: RataInput){
  createRata(input: $input){
        cod_iscrizione
        num_rata
        importo
        data
        metodo
        num_ricevuta
    }
}
`;

export const DELETE_RATA = gql`
mutation($cod_iscrizione: ID!,$num_rata:ID!){
    deleteRata(cod_iscrizione: $cod_iscrizione,num_rata: $num_rata){
        cod_iscrizione
        num_rata
    }
}
`;
