const { makeExecutableSchema } = require('graphql-tools');
const RataModel = require('../models/RataModel.js');
const Cliente = require ('../types/cliente.js');

const {Rata,RataInput} = require ('../types/rata.js');


const Query = `
type Query{
    rate:[Rata],
}

type Mutation{
    createRata(input: RataInput): Rata
    updateRata(cod_iscrizione: ID!,num_rata:ID!,input:RataInput): Rata
    deleteRata(cod_iscrizione: ID!,num_rata:ID!): Rata
}
`;


const rataSchema = makeExecutableSchema({
    typeDefs: [Query,Rata,RataInput],
    resolvers: {

        Query:{
            rate: function(){
                return [];
            }
        },

        Mutation:{
            createRata: async function (_,{input}){
                return await RataModel.create(input);
            },
            updateRata: async function(_,{cod_iscrizione,num_rata,input}){
                await RataModel.update(input,{where: {cod_iscrizione:cod_iscrizione,num_rata:num_rata}});
                return Object.assign({cod_iscrizione,num_rata},input);
            },

            deleteRata: async function(_,{cod_iscrizione,num_rata}){
                RataModel.destroy({
                    where: {
                      cod_iscrizione: cod_iscrizione,
                      num_rata: num_rata
                    }
                });  
            }
        }
    }
});



module.exports = rataSchema;