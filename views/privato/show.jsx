import React from "react";
import ReactDOM from 'react-dom';
import Table from '../commonsJSX/components/table';
import ModalSearch from '../commonsJSX/components/modalSearch';
import { Link } from 'react-router-dom';
import ModalRate from './modalRate';
import { Redirect } from 'react-router-dom';

import { Query } from "react-apollo";
import {GET_PRIVATO} from './queries';


class Show extends React.Component{
    constructor(props,state){
        super(props,state);
        this.state={privato: {},modalRate:'',currentIscrizione:0};
    }

    componentDidMount(){
       
    }

   
    render(){

        
        return(

            <Query query={GET_PRIVATO} variables={{id:this.props.match.params.id}}>

            {({loading,error,data}) => {

                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                    var privato = data.privato;
                   
                    const iscrizioni = privato.iscrizioni.map((iscrizione,index) => 
                            <tr key={index}>
                                <td>{iscrizione.corso.codice}</td>
                                <td>{iscrizione.corso.nome}</td>
                                <td>€ {iscrizione.prezzo}</td>
                                <td><a onClick={()=>this.setState({modalRate:'is-active',currentIscrizione:index})} className="button is-primary">Rate</a></td>
                            </tr>
                    )

                    const fatture = privato.fatture.map((fattura,index) => 
                            <tr key={index}>
                                <td>{fattura.numero}</td>
                                <td>{fattura.anno}</td>
                                <td>€ {fattura.importo}</td>
                                <td>€ {fattura.totale}</td>
                                <td><Link className="button is-success" to={"/fattura/show/" + fattura.anno + "/" + fattura.numero} replace={true}><span className="icon is-small"><i className="fas fa-eye"></i> </span></Link></td>
                            </tr>
                    )

                    return(
                       <div>

                           <ModalRate iscrizione={iscrizioni[this.state.currentIscrizione] === "undefined" ? iscrizioni[this.state.currentIscrizione] : {corso:{codice:"",nome:"",ore:""},rate:[],prezzo:""}} closeModal={()=>this.setState({modalRate:''})} isActive={this.state.modalRate} />

                            <h1>Privato</h1>
                            <div className="columns">
                                <div className="column">
                                    <div><strong>CF: </strong> {privato.cf}</div>
                                </div>
                                <div className="column">
                                   <div><strong>Nome: </strong> {privato.nome}</div>
                                </div>
                                <div className="column">
                                    <div><strong>Cognome: </strong> {privato.cognome}</div>
                                </div>
                            </div>

                            <div className="columns">
                                <div className="column">
                                    <div><strong>Indirizzo: </strong> {privato.indirizzo}, {privato.civico}</div>
                                </div>
                                <div className="column">
                                    <div><strong> CAP: </strong> {privato.cap}</div>
                                </div>
                                <div className="column">
                                    <div><strong>Città: </strong> {privato.citta}</div>
                                </div>
                            </div>

                            <div className="columns">
                                <div className="column">
                                    <div><strong>Telefono: </strong> {privato.telefono}</div>
                                </div>
                                <div className="column">
                                    <div><strong> Email: </strong> {privato.email}</div>
                                </div>
                            </div>

                            <div>
                                <strong>Note:</strong>
                                <div>{privato.note}</div>
                            </div>


                            <div>



                            <div className="iscrizioni-privato">
                                <nav className="level">
                                    <div className="level-left">
                                        
                                        <p className="subtitle is-5">
                                            <strong>Iscrizioni :</strong>
                                        </p>
                                    </div>
                                </nav>
                                <table className="table is-fullwidth">

                                <thead>
                                    <tr><th>Codice</th><th>Nome</th><th>Prezzo</th><th>Azioni</th></tr>
                                </thead>

                                <tbody>
                                    {iscrizioni}
                                </tbody>

                                </table>
                            </div>


                            <div className="fatture-privato">
                                <nav className="level">
                                    <div className="level-left">
                                        
                                        <p className="subtitle is-5">
                                            <strong>Fatture :</strong>
                                        </p>
                                    </div>
                                </nav>
                                <table className="table is-fullwidth">

                                <thead>
                                    <tr><th>Numero</th><th>Anno</th><th>Importo</th><th>Totale</th><th>Azioni</th></tr>
                                </thead>

                                <tbody>
                                    {fatture}
                                </tbody>

                                </table>
                            </div>
                    
                            </div>
                        </div>
                    )
                
            }}
            
            </Query>
        )
    }
}


export default Show;
