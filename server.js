var express = require('express');
var graphqlHTTP = require('express-graphql');

var { formatError } = require('apollo-errors');

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const bodyParser = require('body-parser');
const schema = require('./schemas/schema.js');



var app = express();



app.use('/graphql', 
bodyParser.json(),
  graphqlExpress({
  formatError,
  schema,

}));


app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));




app.use(express.static('public'));
app.use(express.static('assets'));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));



  

  