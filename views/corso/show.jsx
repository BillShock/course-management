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
                <div>
                <h1><strong>Corsi</strong></h1>

                <div id="margin-corsi">
                        <div className="title-card-add">
                        <span className="label-card-add">SCHEDA TECNICA - CORSO {data.corso.nome}</span>
                        </div>

                        <div className="box">
                        <nav className="level">
                            <div className="level-left">
                                <p className="subtitle is-5">
                                <i className="far fa-dot-circle"></i><strong className="column-show-title">Dati del Corso</strong>
                                </p>
                            </div>
                        </nav>
                        <div className="columns column-show">
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Codice Corso</p>
                                <p className="subtitle is-6">&#8594;{data.corso.codice}</p>
                            </div>
                            </div>
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Nome Corso</p>
                                <p className="subtitle is-6">&#8594;{data.corso.nome}</p>
                            </div>
                            </div>
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Aula</p>
                                <p className="subtitle is-6">&#8594;{data.corso.aula}</p>
                            </div>
                        </div>
                        </div>

                        <nav className="level">
                                <div className="level-left">         
                                    <p className="subtitle is-5">
                                    <i className="far fa-dot-circle"></i><strong className="column-show-title">Orari ed ore Corso</strong>
                                    </p>
                                </div>
                            </nav>
                        <div className="columns column-show">
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Orario inizio Corso</p>
                                <p className="subtitle is-6">&#8594;{data.corso.ora_inizio}</p>
                            </div>
                            </div>
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Orario fine Corso</p>
                                <p className="subtitle is-6">&#8594;{data.corso.ora_fine}</p>
                            </div>
                            </div>
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Ore totali</p>
                                <p className="subtitle is-6">&#8594;{data.corso.ore}</p>
                            </div>
                        </div>
                        </div>

                        <nav className="level">
                                <div className="level-left">
                                    <p className="subtitle is-5">
                                    <i className="far fa-dot-circle"></i><strong className="column-show-title">Date del Corso</strong>
                                    </p>
                                </div>
                            </nav>
                        <div className="columns column-show">
                            <div className="column">
                                <div className="card-content">
                                    <p className="title is-6 label-column-show"> Data Inizio Corso</p>
                                    <p className="subtitle is-6">&#8594;{data.corso.data_inizio}</p>
                                </div>
                            </div>
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Data Fine Corso</p>
                                <p className="subtitle is-6">&#8594;{data.corso.data_fine}</p>
                            </div>
                            </div>
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Inizio Stage</p>
                                <p className="subtitle is-6">&#8594;{data.corso.inizio_stage}</p>
                            </div>
                            </div>
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Data termine 10%</p>
                                <p className="subtitle is-6">&#8594;{data.corso.data_termine10}</p>
                            </div>
                            </div>
                        </div>

                        <nav className="level">
                                <div className="level-left">
                                    <p className="subtitle is-5">
                                    <i className="far fa-dot-circle"></i><strong className="column-show-title">Altro</strong>
                                    </p>
                                </div>
                            </nav>
                        <div className="columns column-show">
                            <div className="column">
                                <div className="card-content">
                                    <p className="title is-6 label-column-show"> Note</p>
                                    <p className="subtitle is-6">&#8594;{data.corso.note}</p>
                                </div>
                            </div>
                        </div>

                        </div>

                        </div>

                <AvatarList rows={data.corso} deleteBtn={this.deleteSubscriber} />
             
            </div> 
            </div>
            );
            }}

            </Query>
        )
    }
}

export default Show;
