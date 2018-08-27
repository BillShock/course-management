const Cliente = `
    interface Cliente{
        id: ID!,
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

module.exports = Cliente;
