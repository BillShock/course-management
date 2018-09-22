const Corso = `
    type Corso{
        id: Int,
        codice: String,
        nome: String,
        ore: Int
        data_inizio: String,
        inizio_stage: String,
        luogo_stage: String,
        data_fine: String,
        data_termine10: String,
        aula: String,
        ora_inizio: String,
        ora_fine: String,
        data_esame: String,
        note: String,
        iscrizione: [Iscrizione]
    }
`;

const CorsoInput = `
    input CorsoInput {
        id: Int,
        codice: String,
        nome: String,
        ore: Int
        data_inizio: String,
        inizio_stage: String,
        luogo_stage: String,
        data_fine: String,
        data_termine10: String,
        aula: String,
        ora_inizio: String,
        ora_fine: String,
        data_esame: String,
        note: String
}`;

module.exports = {Corso,CorsoInput};
