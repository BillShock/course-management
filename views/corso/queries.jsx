import gql from "graphql-tag";

export const GET_PAGINATION = gql`
{
  pagination @client{
    corsi{
        initial
        final
        perPage
        current
    }
  }
}
`;
export const GET_CORSO = gql`
    query($id:ID){
        corso(id:$id){
        id
        codice
        nome
        ore
        data_inizio
        data_fine
        inizio_stage
        data_termine10
        aula
        ora_inizio
        ora_fine
        data_esame
        note,
        iscrizione{
            idcliente
            prezzo
            privato{
            id
            cf
            nome
            cognome
            }
        }
        }
    }
`;


export const ADD_ISCRIZIONE = gql` mutation ($input: IscrizioneInput) {
    iscrizioneCorso(input: $input) {
      codice
      prezzo
      privato{
        id,
        nome,
        cognome,
        cf
      }
    }
  }`;

  export const DELETE_ISCRIZIONE = gql`
  mutation ($idcliente: ID, $idcorso: ID) {
    deleteIscrizione(idcliente: $idcliente, idcorso: $idcorso) {
      idcliente
      idcorso
      codice
    }
  }`;
  

