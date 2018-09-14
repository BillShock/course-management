const Sequelize = require('sequelize');
const { makeExecutableSchema } = require('graphql-tools');
const FatturaModel = require('../models/FatturaModel.js');
const PrivatoModel = require('../models/PrivatoModel.js');
const SocietaModel = require('../models/SocietaModel.js');
const ClienteModel = require('../models/ClienteModel.js');

const {Iscrizione} = require ('../types/iscrizione.js');
const Cliente = require ('../types/cliente.js');
const {Privato} = require ('../types/privato.js');
const {Societa} = require ('../types/societa.js');
const Rata = require ('../types/rata.js');
const Corso = require ('../types/corso.js');
const {Fattura,FatturaInput} = require ('../types/fattura.js');

const Query = `
type Query{
    fattura(numero:Int,anno:String): [Fattura]
}

type Mutation{
    createFattura(input: FatturaInput): Fattura,
    deleteFattura(numero:Int,anno:String): Fattura
}

`;

const schema = makeExecutableSchema({
    typeDefs: [Query,Iscrizione,Cliente,Privato,Societa,Rata,Corso,Fattura,FatturaInput],
    resolvers: {
        Cliente:{
        __resolveType (obj) {
            if (obj.cf) {
              return 'Privato'
            } else {
              return 'Societa'
            }
            }
          },

        Query: {
            fattura: async function(_,{numero,anno}){
              
               FatturaModel.belongsTo(ClienteModel,{foreignKey:'id_cliente'});
               FatturaModel.belongsTo(PrivatoModel,{foreignKey:'id_cliente'});
               FatturaModel.belongsTo(SocietaModel,{foreignKey:'id_cliente'});

               let where = {};
               if(numero) where = Object.assign(where,{numero:numero})
               if(anno) where = Object.assign(where,{anno:anno})

               var fattura = await FatturaModel.findAll({where: where,
                include: [
                {
                    model: ClienteModel
                },
                {
                    model: PrivatoModel
                },
                {
                    model: SocietaModel
                }
             
                ]}).map(el => el.get({ plain: true }))

                
                fattura.forEach((fattura)=>{
                    console.log(fattura);
                    if(fattura.privato != null){
                        fattura.cliente = {...fattura.cliente,...fattura.privato};
                    }else{
                        fattura.cliente = {...fattura.cliente,...fattura.societum};
                    }
                    delete fattura;
                    delete fattura.societum;
                });
                
                return fattura;
            
             
            }
        },
        Mutation:{
            createFattura: async function (_,{input}) {
                var customer;
                if(input.customerType=="privato"){
                    customer = await PrivatoModel.findAll({where:{CF:input.id_cliente}}).map(el => el.get({ plain: true }));
                }
                else if(input.customerType=="societa"){
                    customer = await ClienteModel.findAll({where:{p_iva:input.id_cliente}}).map(el => el.get({ plain: true }));
                }
                if(customer.length == 0)
                    throw new Error('Cliente non trovato!');
                else{
                    delete input.customerType;
                    input.id_cliente = customer[0].id;
                    const invoice = await FatturaModel.findAll({where:{anno:input.anno,numero:input.numero}}).map(el => el.get({ plain: true }));
                    if(invoice.length >= 1){
                        throw new Error('Fattura già esistente!');
                    }else
                    return await FatturaModel.create(input);
                }
                    

            },
            deleteFattura: async function(_,{numero,anno}){
                return await FatturaModel.destroy({
                    where: {
                      numero: numero,
                      anno: anno
                    }, 
                })
            }
        }
}

});



module.exports = schema;
