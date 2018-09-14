const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
var { buildSchema } = require('graphql');
const { makeExecutableSchema,mergeSchemas } = require('graphql-tools');
const privatoSchema = require('./privato.js');
const societaSchema = require('./societa.js');
const corsoSchema = require('./corso.js');
const fatturaSchema = require('./fattura.js');

/*
const schema = makeExecutableSchema({
    privatoSchema,
    resolvers,
});
*/


const schema = mergeSchemas({
    schemas: [
      privatoSchema,
      societaSchema,
      corsoSchema,
      fatturaSchema
    ],
  });

module.exports = schema;