const Privato = `
    type Privato implements Cliente {
        id: ID!,
        nome: String,
        cognome: String,
        data_nascita: String,
        cf: String,
        indirizzo: String,
        civico: String,
        cap: String,
        citta : String,
        p_iva : String,
        telefono : String,
        email: String,
        note : String,
        iscrizioni:[Iscrizione],
        fatture:[Fattura]
    }
`;

const PrivatoInput = `
    input PrivatoInput {
        id:ID,
        nome: String,
        cognome: String,
        data_nascita: String,
        cf: String,
        citta : String,
        p_iva : String,
        telefono : String,
        email : String,
        note : String,
        indirizzo: String,
        civico : String,
        cap: String
}`;


module.exports = {Privato,PrivatoInput};
