const Sequelize = require('sequelize');
const { makeExecutableSchema } = require('graphql-tools');
const ClienteModel = require('../models/ClienteModel.js');
const SocietaModel = require('../models/SocietaModel.js');
const FatturaModel = require('../models/FatturaModel.js');
const {Fattura} = require ('../types/fattura.js');
const Cliente = require ('../types/cliente.js');
const {Societa,SocietaInput} = require ('../types/societa.js');

const Query = `
type Query{
    societaAll( first: Int, offset: Int, textFilter: String ):[Societa],
    societa(id: ID!): Societa
}

type Mutation{
    createSocieta(input: SocietaInput): Societa
    updateSocieta(id: ID!,input:SocietaInput): Societa
    deleteSocieta(id: ID!): Societa
}
`;

const societaSchema = makeExecutableSchema({
    typeDefs: [Query,Cliente,Societa,SocietaInput,Fattura],
    resolvers: {

        Societa:{
            async fatture(societa){
                return await FatturaModel.findAll({where:{id_cliente:societa.id}}).map(el => el.get({ plain: true }))
                //var fatture = await knex.select().from('fattura').where({id_cliente:privato.id});
                //return JSON.parse(JSON.stringify(fatture));
            },
        },


        Query: {
            societaAll: async function(_,{first,offset,textFilter}){
                
                SocietaModel.hasOne(ClienteModel,{foreignKey:'id'});

                var results = await SocietaModel.findAll({include:[{model: ClienteModel}]}).map(el => el.get({ plain: true })).map(
                    (value) => {
                        var cliente = value.cliente;
                        delete value.cliente;
                        return Object.assign(value,cliente);
                    }
                )
                /*
                if(textFilter != null && textFilter!=""){
                    results = results.filter((societa)=>{
                        if(societa.nome && societa.cognome)
                            return privato.nome.toLowerCase().includes(textFilter.toLowerCase())
                    })
                }
                */

                return results;
                

            },
            async societa(obj, args, context, info) {
                SocietaModel.hasOne(ClienteModel,{foreignKey:'id'});
                var cliente = await SocietaModel.findAll({include:[{model: ClienteModel}],where:{id:args.id}}).map(el => el.get({ plain: true }))
                if(cliente.length > 0){
                    cliente = {...cliente[0],...cliente[0].cliente};
                    delete cliente.cliente;
                    return cliente;
                }
                return null;
            },
            
            /*
                privato: async function(_,{cf}){
                    var privato = await PrivatoModel.findAll({where:{CF:cf}}).map(el => el.get({ plain: true }));
                    return privato[0];
                }
            */
        },

        Mutation:{
            createSocieta: async function (_,{input}) {

                var societa ={rag_sociale: input['rag_sociale'],dvr:input['dvr']};
                var cliente ={citta:input['citta'],p_iva: input['p_iva'],telefono:input['telefono'],email:input['email'],note:input['note'],indirizzo:input['indirizzo'],civico:input['civico']};

                
                const customer = await SocietaModel.findAll({where:{rag_sociale:societa.rag_sociale}}).map(el => el.get({ plain: true }));
                if(customer.length > 0)
                    throw new Error('Società già esistente!');
                   

                var c = await ClienteModel.create(cliente);
                var p = await SocietaModel.create(Object.assign({id:c.id}, societa));

                return Object.assign({id:c.id},input);

            },
            updateSocieta: async function(_,{id,input}){
                var societa ={rag_sociale: input['rag_sociale'],dvr:input['dvr']};
                var cliente ={citta:input['citta'],p_iva: input['p_iva'],telefono:input['telefono'],email:input['email'],note:input['note'],indirizzo:input['indirizzo'],civico:input['civico']};


                var c = await ClienteModel.update(cliente,{where: {id:id}});
                var p = await SocietaModel.update(societa,{where: {id:id}});

                return Object.assign({id:id},input);
            },

            deleteSocieta: async function(_,{id}){
                ClienteModel.destroy({
                    where: {
                      id: id
                    }
                });

                SocietaModel.destroy({
                    where: {
                      id: id
                    }
                });
            }
        }
    }
});



module.exports = societaSchema;