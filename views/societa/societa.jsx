import React from "react";
import { Link } from 'react-router-dom';
import Table from '../commonsJSX/components/table';
import { withApollo } from 'react-apollo';
import 'babel-polyfill';

import {GET_SOCIETA_ALL, DELETE_SOCIETA, GET_PAGINATION} from './queries';


 class Societa extends React.Component{

    constructor(props,state){
        super(props,state);
        this.state = ({
            societa:[],
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
             query: GET_SOCIETA_ALL
             //variables: { "textFilter" : textFilter },
        });
     
        this.setState({
            societa: result.data.societaAll
        })

        
    }

    async handleInputChange(event) {
        //this.props.setTextFilter(event.target.value);


        //this.props.client.writeData({ data: { visibilityFilter: "Aldo" } });
    

        this.setState({
            filterText: event.target.value
        });


        var result = await this.props.client.query({
            query: GET_SOCIETA_ALL,
            //variables: { "textFilter" : event.target.value },
        });


        var societa = result.data.societaAll.filter((s)=>{
            if(s.rag_sociale)
                return s.rag_sociale.toLowerCase().includes(this.state.filterText.toLowerCase())

        });

        this.setState({
            societa:societa
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
                <h1><strong>Società</strong></h1>

            <div id="margin-privato">
                <nav className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <p className="subtitle is-5">
                                Numeri Società archiviate <strong>{this.state.societa.length}</strong>
                            </p>
                        </div>
                    </div>

                <div className="level-right">
                    <div className="level-item">
                        <p className="level-item"><strong></strong></p>
                        <p className="level-item"><a></a></p>
                        <p className="level-item"><a></a></p>
                        <p className="level-item"><a></a></p>
                        <p className="level-item"><Link className="button is-add-societa" to={"/societa/add"}>Aggiungi Società</Link></p>
                    </div>
                </div>  
                </nav>

                <div className="columns">
                    <div className="column is-half">
                        <div className="box">
                            <p className="title is-6">Ricerca Società digitando la Ragione Sociale o la Partita iva</p>
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
                    <Table name="societa" paginationQuery={GET_PAGINATION} link="/societa" throws={["ID","RAGIONE SOCIALE","DVR","P.IVA",""]} showBtn={{lbl:"Show",tags:["id"],link:"/show"}} editBtn={{lbl:"Edit",tag:"id",link:"/edit"}} deleteBtn={{lbl:"Delete",tags:["id"],action:this.deleteCorso,deleteMutation:DELETE_SOCIETA}}  lblRows={['id','rag_sociale','dvr','p_iva']} rows={this.state.societa}  />
                </div>
            </div>
        );
    }
}


export default withApollo(Societa);