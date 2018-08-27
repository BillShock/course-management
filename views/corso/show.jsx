import React from "react";
import AvatarList from '../commonsJSX/components/avatarList';
import ModalSearch from '../commonsJSX/components/modalSearch';

import { Query } from "react-apollo";
import { GET_CORSO } from "./queries";
import { GET_PRIVATO_ALL } from "../privato/queries";


class Show extends React.Component{
    constructor(props,state){
        super(props,state);
        this.state={course: {}, subscribers: [],modalState:''};
    }

    render(){
        

        return(

            <Query query={GET_CORSO} variables={{id:this.props.match.params.id}}>

            {({loading,error,data}) => {

            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return(
                
            <div>
                 <h1>Corso</h1>
                <nav className="level">
                    <div className="level-left">
                       
                    </div>
                        <div className="level-right">
                            <p className="level-item"><button className="button is-info" onClick={()=>{this.setState({modalState:'is-active'})}}>Aggiungi Persona</button></p>
                        </div>
                </nav>

                <ModalSearch corso={data.corso} query={GET_PRIVATO_ALL} id={this.props.match.params.id} isActive={this.state.modalState} addAction={this.addSubscriber} closeAction={()=>{this.setState({modalState:''})}} />
                
                <div>
                     <h2> </h2>

                   <div className="columns">
                            <div className="column">
                                <div><strong>Codice Corso: </strong>{data.corso.codice}</div>
                            </div>
                            <div className="column">
                                <div><strong>Nome Corso : </strong>{data.corso.nome}</div>
                            </div>
                            <div className="column">
                                <div><strong>Ore: </strong> {data.corso.ore}</div>
                            </div>
                    </div>

                    <div className="columns">
                            <div className="column">
                                <div><strong>Data Inizio: </strong>{data.corso.data_inizio}</div>
                            </div>
                            <div className="column">
                                <div><strong>Data Fine: </strong>{data.corso.data_fine}</div>
                            </div>
                            <div className="column">
                                <div><strong>Inizio Stage: </strong> {data.corso.inizio_stage}</div>
                            </div>
                    </div>

                    <div className="columns">
                            <div className="column">
                                <div><strong>Data Termine 10%: </strong>{data.corso.data_termine10}</div>
                            </div>
                            <div className="column">
                                <div><strong>Data Esame: </strong>{data.corso.data_esame}</div>
                            </div>
                            <div className="column">
                                <div><strong>Aula: </strong> {data.corso.aula}</div>
                            </div>
                    </div>

                    <div className="columns">
                            <div className="column">
                                <div><strong>Ora Inizio: </strong>{data.corso.ora_inizio}</div>
                            </div>
                            <div className="column">
                                <div><strong>Ora Fine: </strong>{data.corso.ora_fine}</div>
                            </div>
                            <div className="column">
                                <div><strong>Note: </strong> {data.corso.note}</div>
                            </div>
                    </div>
                </div>


                <AvatarList rows={data.corso} deleteBtn={this.deleteSubscriber} />
             
            </div>
            );
            }}

            </Query>
        )
    }
}

export default Show;
