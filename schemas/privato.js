const Sequelize = require('sequelize');
const { makeExecutableSchema } = require('graphql-tools');
const ClienteModel = require('../models/ClienteModel.js');
const PrivatoModel = require('../models/PrivatoModel.js');
const IscrizioneModel = require('../models/IscrizioneModel.js');
const FatturaModel = require('../models/FatturaModel.js');
const RataModel = require('../models/RataModel.js');

//const knex = require('../config/knexDB.js');

const CorsoModel = require('../models/CorsoModel.js');

const {Fattura} = require ('../types/fattura.js');

const Cliente = require ('../types/cliente.js');
const {Privato,PrivatoInput} = require ('../types/privato.js');
const Rata = require ('../types/rata.js');
const {Iscrizione} = require ('../types/iscrizione.js');
const Corso = require ('../types/corso.js');

const { createError } = require('apollo-errors');

const alreadyExists = createError("alreadyExists", {
    message: "The Employee already exists."
});




const Query = `
type Query{
    privato_all( first: Int, offset: Int, textFilter: String ):[Privato],
    privato(id: ID!): Privato
}

type Mutation{
    createPrivato(input: PrivatoInput): Privato
    updatePrivato(id: ID!,input:PrivatoInput): Privato
    deletePrivato(id: ID!): Privato
}

`;

const privatoSchema = makeExecutableSchema({
    typeDefs: [Query,Cliente,Privato,PrivatoInput,Fattura,Rata,Iscrizione,Corso],
    resolvers: {

        Privato:{

            async iscrizioni(privato) {
                
                IscrizioneModel.belongsTo(CorsoModel,{foreignKey:'idcorso'});
                IscrizioneModel.hasMany(RataModel,{as: { singular: 'rata', plural: 'rate' },foreignKey: 'cod_iscrizione', sourceKey: 'codice'});
                //IscrizioneModel.belongsToMany(RataModel, {through: 'rata', foreignKey: 'codice'})

                var iscrizioni =  await IscrizioneModel.findAll({
                    where:{idcliente:privato.id},
                    include: [
                    {
                        model: CorsoModel
                    },
                    {
                        model:RataModel,
                        as:'rate'
                    }
                ],

                }).map(el => el.get({ plain: true }))//.map(iscrizione => {return {...iscrizione,...iscrizione.corso}})
                console.log(iscrizioni)
                return iscrizioni;

            },
            async fatture(privato){
                return await FatturaModel.findAll({where:{id_cliente:privato.id}}).map(el => el.get({ plain: true }))
                //var fatture = await knex.select().from('fattura').where({id_cliente:privato.id});
                //return JSON.parse(JSON.stringify(fatture));
            },
            
           
        },


        Query: {
            privato_all: async function(_,{first,offset,textFilter}){
                
                PrivatoModel.hasOne(ClienteModel,{foreignKey:'id'});

                var results = await PrivatoModel.findAll({include:[{model: ClienteModel}]}).map(el => el.get({ plain: true })).map(
                    (value) => {
                        var cliente = value.cliente;
                        delete value.cliente;
                        return Object.assign(value,cliente);
                    }
                )
                
                if(textFilter != null && textFilter!=""){
                    results = results.filter((privato)=>{
                        if(privato.nome && privato.cognome)
                        return privato.nome.toLowerCase().includes(textFilter.toLowerCase())
                    })
                }


                return results;
                
               /*
                var privati = await knex.from('privato').innerJoin('cliente','privato.id','cliente.id');
                privati = JSON.stringify(privati);
                
             
                console.log(JSON.parse(privati));
                return JSON.parse(privati);
                */

                

            },
            async privato(obj, args, context, info) {
                PrivatoModel.hasOne(ClienteModel,{foreignKey:'id'});
                var cliente = await PrivatoModel.findAll({include:[{model: ClienteModel}],where:{id:args.id}}).map(el => el.get({ plain: true }))
                cliente = {...cliente[0],...cliente[0].cliente};
                delete cliente.cliente;
                return cliente;
            },
            /*
                privato: async function(_,{cf}){
                    var privato = await PrivatoModel.findAll({where:{CF:cf}}).map(el => el.get({ plain: true }));
                    return privato[0];
                }
            */
        },

        Mutation:{
            createPrivato: async function (_,{input}) {
                //var temp = await PrivatoModel.findAll({where:{id:1}}).map(el => el.get({ plain: true }));
                //return temp[0];
                /*
                var data = {
                    id:1048,
                    nome: "Aldo",
                    cognome : "Aldone",
                    data_nascita: "2016-05-14",
                    cf: "12324343534656",
                    citta : "Napoli",
                    p_iva : "0197232155",
                    telefono : "01234567",
                    email : "aldo@aldo.aldo",
                    note : "dsfdsfdsfdsf",
                    indirizzo: "Via. ...",
                    civico : "123"
                }
                */

                var privato ={nome: input['nome'],cognome:input['cognome'],data_nascita:input['data_nascita'],cf:input['cf']};
                var cliente ={citta:input['citta'],p_iva: input['p_iva'],telefono:input['telefono'],email:input['email'],note:input['note'],indirizzo:input['indirizzo'],civico:input['civico']};

                
                var customer = await PrivatoModel.findAll({where:{CF:privato.cf}}).map(el => el.get({ plain: true }));
                if(customer.length > 0)
                    //throw new Error('Privato già esistente!');
                   throw new alreadyExists();
                   

                var c = await ClienteModel.create(cliente);
                var p = await PrivatoModel.create(Object.assign({id:c.id}, privato)).catch(Sequelize.ValidationError, function (error){
                   //c.destroy();
                });

                return Object.assign(c.id,input);

            },
            updatePrivato: async function(_,{id,input}){
                var privato ={nome: input['nome'],cognome:input['cognome'],data_nascita:input['data_nascita'],cf:input['cf']};
                var cliente ={citta:input['citta'],p_iva: input['p_iva'],telefono:input['telefono'],email:input['email'],note:input['note'],indirizzo:input['indirizzo'],civico:input['civico']};


                var c = await ClienteModel.update(cliente,{where: {id:id}});
                var p = await PrivatoModel.update(privato,{where: {id:id}});

                return Object.assign(id,input);
            },

            deletePrivato: async function(_,{id}){
                ClienteModel.destroy({
                    where: {
                      id: id
                    }
                });

                PrivatoModel.destroy({
                    where: {
                      id: id
                    }
                });
            }
        }
    }
});



module.exports = privatoSchema;