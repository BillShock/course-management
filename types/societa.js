const Societa = `
    type Societa implements Cliente{
        id: ID!,
        rag_sociale: String,
        rag_sociale2: String,
        dvr: String,
        indirizzo: String,
        civico: String,
        cap: String,
        citta : String,
        p_iva : String,
        telefono : String,
        email: String,
        note : String
    }
`;



module.exports = Societa;
