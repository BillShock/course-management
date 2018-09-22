const { makeExecutableSchema } = require('graphql-tools');
const CorsoModel = require('../models/CorsoModel.js');
const IscrizioneModel = require('../models/IscrizioneModel.js');
const PrivatoModel = require('../models/PrivatoModel.js');
const Cliente = require ('../types/cliente.js');
const {Privato,PrivatoInput} = require('../types/privato.js');
const {Rata} = require ('../types/rata.js');
const {Iscrizione,IscrizioneInput} = require ('../types/iscrizione.js');
const {Corso,CorsoInput} = require ('../types/corso.js');
const {Fattura} = require('../types/fattura.js');


const Query = `
    type Query{
        corsi:[Corso],
        corso(id:ID): Corso
    }

    type Mutation{
        iscrizioneCorso(input: IscrizioneInput): Iscrizione,
        updateIscrizione(codice:ID,input:IscrizioneInput): Iscrizione,
        deleteIscrizione(idcliente:ID,idcorso:ID): Iscrizione,
        createCorso(input:CorsoInput): Corso,
        updateCorso(id:ID,input:CorsoInput): Corso,
        deleteCorso(id:ID): Corso
    }
`;

const corsoSchema = makeExecutableSchema({
    typeDefs: [ Query, Corso,CorsoInput, Privato,PrivatoInput ,Iscrizione, IscrizioneInput, Rata,Cliente, Fattura ],
    resolvers: {
        Corso:{
            async iscrizione(corso){
                IscrizioneModel.belongsTo(PrivatoModel,{foreignKey:'idcliente'});
                var p = await IscrizioneModel.findAll({include:[{model: PrivatoModel}],where:{idcorso:corso.id}}).map(el => el.get({ plain: true }))
                return p;
            }
        },
        Query: {
            corsi: async function(){
                return await CorsoModel.findAll({}).map(el => el.get({ plain: true }))
            },
            async corso(obj, args, context, info) {
                var corso = await CorsoModel.findAll({where:{id:args.id}}).map(el => el.get({ plain: true }))
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
            updateIscrizione: async function(_,{codice,input}){
                const iscrizione = Object.assign({codice:codice},{prezzo:input.prezzo},{esito_esame:input.esito_esame});
                await IscrizioneModel.update(iscrizione,{where:{codice:codice}});
                return iscrizione;
            },

            deleteIscrizione : async function(_,{idcliente,idcorso}){
                await IscrizioneModel.destroy({
                    where: {
                      idcliente: idcliente,
                      idcorso: idcorso
                    }, 
                })
            },
            createCorso:async function(_,{input}){
                const corso = await CorsoModel.findAll({where:{codice:input.codice,nome:input.nome}}).map(el => el.get({ plain: true }));
                if(corso.length > 0)
                    throw new Error('Corso già esistente!');
                return await CorsoModel.create(input);
            },
            updateCorso:async function(_,{id,input}){

                const corso = await CorsoModel.findAll({where:{codice:input.codice,nome:input.nome}}).map(el => el.get({ plain: true }));
                if(corso.length > 0)
                    throw new Error('Corso già esistente!');

                let c = input;
                delete c.id;
                await CorsoModel.update(c,{where: {id:id}});
                return Object.assign({id:id},input);
            },
            deleteCorso : async function(_,{id}){
                CorsoModel.destroy({
                    where: {
                      id: id
                    }
                });
            }

        }
    },
});



module.exports = corsoSchema;