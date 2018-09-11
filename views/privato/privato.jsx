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
                <h1>Privato</h1>

                <div>
                    <nav className="level">
                    <div className="level-left">
                        <div className="level-item">
                        <p className="subtitle is-5">
                            <strong></strong> posts
                        </p>
                        </div>
                        <div className="level-item">
                        <div className="field has-addons">
                                <p className="control">
                                    <input className="input" type="text" onChange={this.handleInputChange} placeholder="Ricerca"/>
                                </p>
                                <p className="control">
                                    <button className="button">
                                        Search
                                    </button>
                                </p>
                                
                            </div>
                        </div>
                    </div>

                        <div className="level-right">
                            <p className="level-item"><strong>All</strong></p>
                            <p className="level-item"><a>Published</a></p>
                            <p className="level-item"><a>Drafts</a></p>
                            <p className="level-item"><a>Deleted</a></p>
                            <p className="level-item"><Link className="button is-success" to={"/privato/add"}>Aggiungi Privato</Link></p>
                        </div>
                    </nav>
                </div>

                <div>
                    <Table name="privati" paginationQuery={GET_PAGINATION} link="/privato" throws={["ID","CF","Nome","Cognome",""]} showBtn={{lbl:"Show",tags:["id"],link:"/show"}} editBtn={{lbl:"Edit",tag:"id",link:"/edit"}} deleteBtn={{lbl:"Delete",tags:["id"],action:this.deleteCorso,deleteMutation:DELETE_PRIVATO}}  lblRows={['id','cf','nome','cognome']} rows={this.state.privati}  />
                </div>

                   
                  
                
                
            </div>
        );
    }
}


export default withApollo(Privato);