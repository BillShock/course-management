import React from "react";
import ReactDOM from 'react-dom';
import AvatarList from '../commonsJSX/components/avatarList';
import ModalSearch from '../commonsJSX/components/modalSearch';
import axios from 'axios';
import { connect } from 'react-redux';

import { Query, withApollo } from "react-apollo";

import { GET_CORSO } from "./queries";
import { GET_PRIVATO_ALL } from "../privato/queries";


class Show extends React.Component{
    constructor(props,state){
        super(props,state);
        this.state={course: {}, subscribers: [],modalState:'',corsi:{
            corso:{
                codice:"",
                nome:"",
                ore:"",
                data_inizio:"",
                data_fine:"",
                data_stage:"",
                data_termine10:"",
                aula:"",
                ora_inizio:"",
                ora_fine:"",
                note:"",
                iscrizione:[]

            }
        }};
        this.addSubscriber = this.addSubscriber.bind(this);
        this.deleteSubscriber = this.deleteSubscriber.bind(this);
        this.saveSubscribers = this.saveSubscribers.bind(this);
    }

   async componentDidMount(){

        //var course = this.props.getCorso(this.props.match.params.id);
/*
        this.setState({
            course: course[0],
            subscriber: this.state.subscribers
        });
       
        axios.get('/corso/show/'+ this.props.match.params.id)
        .then(res => {
                this.setState({ course: this.state.course,subscribers: res.data.rows });
        })
*/

        //const corsi = this.props.client.readQuery({query: GET_CORSO,variables:{id:"2"}});
        let corsi = await this.props.client.query({
            query: GET_CORSO,
            variables: { "id" : this.props.match.params.id},
        });
        console.log(corsi)
        this.setState({corsi:corsi.data})

        

    }

    deleteSubscriber(id){
        this.setState({ course: this.state.course,subscribers: this.state.subscribers.filter((subscriber)=>{return subscriber.id != id }) });
    }

    addSubscriber(subscriber){
        this.setState((prevState, props) => ({
            subscribers: [...prevState.subscribers,subscriber]
        }));
    }
    saveSubscribers(){
        axios.post('/corso/prova',{id:this.props.match.params.id,subscribers:this.state.subscribers})
        .then(res => {
                //this.setState({ course: this.state.course,subscribers: res.data.rows });
                console.log(res);
        })
    }
  
    render(){
        
        
            let data = this.state.corsi;
           
            return(
                
            <div>
                 <h1>Corso</h1>
                <nav className="level">
                    <div className="level-left">
                       
                    </div>
                        <div className="level-right">
                            <p className="level-item"><strong>All</strong></p>
                            <p className="level-item"><button className="button is-info" onClick={()=>{this.setState({modalState:'is-active'})}}>Aggiungi Persona</button></p>
                        </div>
                </nav>

                <ModalSearch query={GET_PRIVATO_ALL} id={this.props.match.params.id} isActive={this.state.modalState} addAction={this.addSubscriber} closeAction={()=>{this.setState({modalState:''})}} />
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
             

                <button onClick={this.saveSubscribers} className="button is-success">Salva</button>
            </div>
            );
            

        
    }
}

function mapStateToProps(state){
    console.log(state.corsoReducer);
    return{
        getCorso: (id)=>(state.corsoReducer.elements.filter((element)=>{return element.id == id})),
    }
}

//export default connect(mapStateToProps)(Show);
export default withApollo(Show);
