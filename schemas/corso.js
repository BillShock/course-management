const { makeExecutableSchema } = require('graphql-tools');
const CorsoModel = require('../models/CorsoModel.js');
const IscrizioneModel = require('../models/IscrizioneModel.js');
const PrivatoModel = require('../models/PrivatoModel.js');

const Cliente = require ('../types/cliente.js');
const {Privato,PrivatoInput} = require ('../types/privato.js');
const Rata = require ('../types/rata.js');
const {Iscrizione,IscrizioneInput} = require ('../types/iscrizione.js');
const Corso = require ('../types/corso.js');
const {Fattura} = require('../types/fattura.js');


const Query = `
    type Query{
        corsi:[Corso],
        corso(id:ID): Corso
    }

    type Mutation{
        iscrizioneCorso(input: IscrizioneInput): Iscrizione
        deleteIscrizione(idcliente:ID,idcorso:ID): Iscrizione
    }
`;

const corsoSchema = makeExecutableSchema({
    typeDefs: [ Query, Corso, Privato,PrivatoInput ,Iscrizione, IscrizioneInput, Rata,Cliente, Fattura ],
    resolvers: {
        Corso:{
            async iscrizione(corso){
                IscrizioneModel.belongsTo(PrivatoModel,{foreignKey:'idcliente'});
                
                var p = await IscrizioneModel.findAll({include:[{model: PrivatoModel}],where:{idcorso:corso.id}}).map(el => el.get({ plain: true }))

                console.log(p);
                return p;
            }
        },
        Query: {
            corsi: async function(){
                return await CorsoModel.findAll({}).map(el => el.get({ plain: true }))
            },
            async corso(obj, args, context, info) {
                var corso = await CorsoModel.findAll({where:{id:args.id}}).map(el => el.get({ plain: true }))
                console.log(corso);
                return corso[0];
            },
        },
        Mutation: {
            iscrizioneCorso : async function(_,{input}){
                let iscrizione = {idcliente:input.idcliente,idcorso:input.idcorso,prezzo:input.prezzo,esito_esame:null}
                await IscrizioneModel.create(iscrizione);
                const data = {codice:null,idcliente:parseInt(input.idcliente),idcorso:input.idcorso,rate:null,corso:null,prezzo:input.prezzo,esito_esame:null,privato:null};
                return data;
            },
            deleteIscrizione : async function(_,{idcliente,idcorso}){
                const a = await IscrizioneModel.destroy({
                    where: {
                      idcliente: idcliente,
                      idcorso: idcorso
                    }, 
                })
            }

        }
    },
});



module.exports = corsoSchema;