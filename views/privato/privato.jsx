import React from "react";
import { Link } from 'react-router-dom';
import Table from '../commonsJSX/components/table';
import { withApollo } from 'react-apollo';
import 'babel-polyfill';

import {GET_PRIVATO_ALL, DELETE_PRIVATO, GET_PAGINATION} from './queries';


 class Privato extends React.Component{

    constructor(props,state){
        super(props,state);
        this.state = ({
            privati:[],
            showModal:"",
            filterText:""
        });
        this.showModal = this.showModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

       
    }
    
    async componentDidMount(){
/*
        const GET_VISIBILITY_FILTER = gql`
        {
            visibilityFilter @client
        }
        `;
*/

        var {textFilter} = this.state.filterText;
        const result = await this.props.client.query({
             query: GET_PRIVATO_ALL
             //variables: { "textFilter" : textFilter },
        });
     
        this.setState({
            privati: result.data.privato_all
        })

        
    }

    async handleInputChange(event) {
        //this.props.setTextFilter(event.target.value);


        //this.props.client.writeData({ data: { visibilityFilter: "Aldo" } });
    

        this.setState({
            filterText: event.target.value
        });


        var result = await this.props.client.query({
            query: GET_PRIVATO_ALL,
            //variables: { "textFilter" : event.target.value },
        });


        var privati = result.data.privato_all.filter((privato)=>{
            if(privato.nome && privato.cognome)
                return privato.nome.toLowerCase().includes(this.state.filterText.toLowerCase()) || privato.cognome.toLowerCase().includes(this.state.filterText.toLowerCase())

        });

        this.setState({
            privati:privati
        })

       // console.log(result);
        
        
    }

    showModal(){
        this.setState({
            showModal:"is-active"
        })
    }

    render(){

      
        return (
            <div>
                <h1><strong>Privato</strong></h1>

<div id="margin-privato">
    <nav className="level">
        <div className="level-left">
            <div className="level-item">
                <p className="subtitle is-5">
                    Numeri Privati archiviati <strong>{this.state.privati.length}</strong>
                </p>
            </div>
        </div>
            <div className="level-right">
                <div className="level-item">
                    <p className="level-item"><strong></strong></p>
                    <p className="level-item"><a></a></p>
                    <p className="level-item"><a></a></p>
                    <p className="level-item"><a></a></p>
                    <p className="level-item"><Link className="button is-add-privato" to={"/privato/add"}>Aggiungi Privato</Link></p>
                </div>
            </div>  
    </nav>

        <div className="columns">
        <div className="column is-half">
            <div className="box">
                <p className="title is-6">Ricerca Privato digitando il Codice Fiscale, il Nome o il Cognome</p>
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

                <div>
                    <Table name="privati" paginationQuery={GET_PAGINATION} link="/privato" throws={["ID","CF","Nome","Cognome",""]} showBtn={{lbl:"Show",tags:["id"],link:"/show"}} editBtn={{lbl:"Edit",tag:"id",link:"/edit"}} deleteBtn={{lbl:"Delete",tags:["id"],action:this.deleteCorso,deleteMutation:DELETE_PRIVATO}}  lblRows={['id','cf','nome','cognome']} rows={this.state.privati}  />
                </div>

                   
                  
                
                
            </div>
        );
    }
}


export default withApollo(Privato);