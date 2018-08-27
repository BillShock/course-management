const Fattura = `
    type Fattura{
        numero: Int,
        anno: String,
        data: String,
        prestazione: String,
        importo: Float,
        iva: Float,
        con_cassa: Float,
        ritenuta: Float,
        bolli: Float,
        totale: Float,
        id_cliente: Int,
        cliente: Cliente
    }
`;

const FatturaInput = `
    input FatturaInput {
        numero: Int!,
        anno: String!,
        data: String,
        prestazione: String,
        importo: Float,
        iva: Float,
        con_cassa: Float,
        ritenuta: Float,
        bolli: Float,
        totale: Float,
        customerType:String,
        id_cliente: String!
    }
`;

module.exports = {Fattura,FatturaInput};