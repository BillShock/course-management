import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import MainLayout from './layouts/layout';
import HomePage from './pages/homepage';
import CorsoRouter from './corso/router.jsx';
import PrivatoRouter from './privato/router';
import SocietaRouter from './societa/router';
import FatturaRouter from './fattura/router';

import { ApolloProvider} from "react-apollo";

import ApolloClient from "apollo-boost";
import { HttpLink } from 'apollo-link-http';

import { InMemoryCache,defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';



 const fragmentMatcher = new IntrospectionFragmentMatcher({
   introspectionQueryResultData
 });



//const cache = new InMemoryCache({fragmentMatcher}
  /*cacheRedirects: {
    Query: {
      privato_search: (_, {id}) => toIdValue(cache.config.dataIdFromObject({ __typename: 'Privato', id: id })),
      fattura: (_, {numero,anno}) => toIdValue(cache.config.dataIdFromObject({ __typename: 'Fattura', numero: numero })),
    },
  },*/
//);



const defaults = {
  privato_all: [],
  visibilityFilter: 'SHOW_ALL',
  pagination:{
    corsi:{
      initial:0,
      final:10,
      perPage:10,
      current:1,
      __typename:"CorsiPagination"
    },
    privati:{
      initial:0,
      final:10,
      perPage:10,
      current:1,
      __typename:"PrivatiPagination"
    },
    societa:{
      initial:0,
      final:10,
      perPage:10,
      current:1,
      __typename:"SocietaPagination"
    },
    fatture:{
      initial:0,
      final:10,
      perPage:10,
      current:1,
      __typename:"FatturePagination"
    },
    __typename:"Pagination"
  }
};

const cache = new InMemoryCache({
    fragmentMatcher ,
    dataIdFromObject: object => {
      switch (object.__typename) {
        //case 'Iscrizione': return object.codice; // use `key` as the primary key
        default: return defaultDataIdFromObject(object); // fall back to default handling
      }
    }
});

const client = new ApolloClient({
  link: new HttpLink(),
  cache,
  uri: "/graphql",
  clientState: {
    defaults
    //resolvers,
    //typeDefs
  }
});

class App extends React.Component{
  render(){
      return(
      
          <ApolloProvider client={client}>
              <BrowserRouter>
                  <MainLayout>
                      <Switch>
                          <Route exact path="/" component={HomePage} />
                      </Switch>
                      <CorsoRouter path="/corso"/>
                      <PrivatoRouter path="/privato"/>
                      <SocietaRouter path="/societa"/>
                      <FatturaRouter path="/fattura"/>
                  </MainLayout>
              </BrowserRouter>
          </ApolloProvider>
              
      )
  }
}
render(<App />, document.getElementById("root"));

