const Rata = ` 
    type Rata{
        cod_iscrizione: ID,
        num_rata:ID,
        importo: Float,
        data: String,
        metodo:String,
        num_ricevuta:String
    }
`;

const RataInput = ` 
    input RataInput{
        cod_iscrizione: ID,
        num_rata:ID,
        importo: Float,
        data: String,
        metodo:String,
        num_ricevuta:String
    }
`;

module.exports = {Rata,RataInput};