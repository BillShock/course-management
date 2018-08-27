const Iscrizione = ` 
type Iscrizione{
    codice: Int,
    idcliente: ID,
    idcorso: ID,
    prezzo: Float,
    esito_esame: String,
    rate:[Rata],
    corso:Corso,
    privato:Privato
}`;

const IscrizioneInput = `
    input IscrizioneInput{
        codice: Int,
        idcliente: ID,
        idcorso: ID,
        prezzo: Float,
        esito_esame: String,
        privato: PrivatoInput
    }
`;

module.exports = {Iscrizione,IscrizioneInput};

