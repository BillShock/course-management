import React from "react";
import ReactDOM from 'react-dom';
import Table from '../commonsJSX/components/table';
import Loading from '../commonsJSX/components/loading';
import { Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import gql from "graphql-tag";
import 'babel-polyfill';

import {GET_PAGINATION} from './queries';


class Corso extends React.Component{

    constructor(){
        super();
        //this.state = ({ loading: false });
        this.state =({
            corsi:[]
        })
        this.handleInputChange=this.handleInputChange.bind(this);        
    }

    async componentDidMount() {
        
        const GET_CORSO_ALL = gql`
        {
            corsi{
                id
              codice
              nome
              ore
              data_inizio
              data_fine
            }
        }
      `;
        //var {textFilter} = this.state.filterText;
        const result = await this.props.client.query({
             query: GET_CORSO_ALL,
             //variables: { "textFilter" : textFilter },
        });
     
        this.setState({
            corsi: result.data.corsi
        })

        //console.log(this.props.client);
        
    }

    
    handleInputChange(event) {
        this.props.setTextFilter(event.target.value);
    }

    setPage(){
        var p = {initial:5,final:10,perPage:5};
        this.props.setPage(p);
        console.log(this.props);
    }


    render(){
       

        const DELETE_CORSO = gql`
        mutation($id: ID!){
            deletePrivato(id: $id){
                id
                nome
                cognome
            }
        }
        `;
/*
        const corsi = this.state.corsi.map((corso, index) => 
            <li key={index}> {corso.nome}  </li>
        );
        /*
        if(this.props.loading){
            return (
                <div>
                    <h1>Corso View</h1>
                    <Loading />
                </div>
            )
        }
        */
        return(
                <div>
                <h1><strong>Corsi</strong></h1>

<div id="margin-corsi"> 
    <nav className="level">        
        <div className="level-left">
            <div className="level-item">
            <p className="subtitle is-5">
              Numero di Corsi <strong>{this.state.corsi.length}</strong> 
            </p>
            </div>
        </div>

        <div className="level-right">
                <p className="level-item"><strong></strong></p>
                <p className="level-item"><a></a></p>
                <p className="level-item"><a></a></p>
                <p className="level-item"><a></a></p>
                <p className="level-item"><Link className="button is-add-course" to={"/corso/add"}>Aggiungi Corso</Link></p>
            </div> 
    </nav>

        <div className="columns">
            <div className="column w3-container">
                <div className="box w3-animate-left">
                    <p className="title is-6">Ricerca tramite ID corso</p>
                    <div className="field has-addons" id="padding-byTop">
                        <p className="control">      
                            <input className="input" type="text" onChange={this.handleInputChange} placeholder="Ricerca"/>
                        </p>
                        <p className="control">
                            <button className="button"><i className="fas fa-search"></i></button>
                        </p>
                    </div>
                </div>
            </div>

            <div className="column">
                <div className="box">
                    <p className="title is-6">Ricerca tramite Nome corso</p>
                    <div className="field has-addons" id="padding-byTop">
                        <p className="control">      
                            <input className="input" type="text" onChange={this.handleInputChange} placeholder="Ricerca"/>
                        </p>
                        <p className="control">
                            <button className="button"><i className="fas fa-search"></i></button>
                        </p>
                    </div>
                </div>
            </div>
        </div>    
</div>
                
                <Table name="corsi" link="/corso" paginationQuery={GET_PAGINATION} throws={["ID","Codice","Nome Corso","Ore","Data Inizio","Data Fine",""]} showBtn={{lbl:"Show",tags:["id"],link:"/show"}} editBtn={{lbl:"Edit",tag:"id",link:"/edit"}} deleteBtn={{lbl:"Delete",tags:["id"],action:this.deleteCorso,deleteMutation:DELETE_CORSO}}  lblRows={['id','codice','nome','ore','data_inizio','data_fine']} rows={this.state.corsi} />
            </div>
        )
    }
}



export default withApollo(Corso);

