import React from "react";
import ReactDOM from 'react-dom';
import Table from '../commonsJSX/components/table';
import ModalSearch from '../commonsJSX/components/modalSearch';
import { Link } from 'react-router-dom';
import ModalRate from './modalRate/modalRate';
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
                   console.log(privato.iscrizioni)
                    const iscrizioni = privato.iscrizioni.map((iscrizione,index) => 
                            <tr key={index}>
                                <td>{iscrizione.corso.codice}</td>
                                <td>{iscrizione.corso.nome}</td>
                                <td>€ {iscrizione.prezzo}</td>
                                <td><a onClick={()=>this.setState({modalRate:'is-active',currentIscrizione:index})} className="button rate is-rounded"><span className="icon"><i className="fas fa-euro-sign"></i></span></a></td>
                            </tr>
                    )

                    const fatture = privato.fatture.map((fattura,index) => 
                            <tr key={index}>
                                <td>{fattura.numero}</td>
                                <td>{fattura.anno}</td>
                                <td>€ {fattura.importo}</td>
                                <td>€ {fattura.totale}</td>
                                <td><Link className="button is-rounded show" to={"/fattura/show/" + fattura.anno + "/" + fattura.numero} replace={true}><span className="icon is-small"><i className="fas fa-eye"></i> </span></Link></td>
                            </tr>
                    )

                    return(
                       <div>

                        <ModalRate iscrizione={privato.iscrizioni[this.state.currentIscrizione]} closeModal={()=>this.setState({modalRate:''})} isActive={this.state.modalRate} />

                        <h1><strong>Dettaglio Cliente</strong></h1>
                        <div id="margin-privato">
                        <div className="title-card-add">
                        <span className="label-card-add">SCHEDA ANAGRAFICA - {privato.nome} {privato.cognome}</span>
                        </div>

                        <div className="box">
                        <nav className="level">
                            <div className="level-left">
                                <p className="subtitle is-5">
                                <i className="far fa-dot-circle"></i><strong className="column-show-title">Dati Anagrafici</strong>
                                </p>
                            </div>
                        </nav>
                        <div className="columns column-show">
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Nome</p>
                                <p className="subtitle is-6">&#8594;{privato.nome}</p>
                            </div>
                            </div>
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Cognome</p>
                                <p className="subtitle is-6">&#8594;{privato.cognome}</p>
                            </div>
                            </div>
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Codice Fiscale</p>
                                <p className="subtitle is-6">&#8594;{privato.cf}</p>
                            </div>
                        </div>
                        </div>

                        <nav className="level">
                                <div className="level-left">         
                                    <p className="subtitle is-5">
                                    <i className="far fa-dot-circle"></i><strong className="column-show-title">Domicilio</strong>
                                    </p>
                                </div>
                            </nav>
                        <div className="columns column-show">
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Indirizzo</p>
                                <p className="subtitle is-6">&#8594;{privato.indirizzo}, {privato.civico}</p>
                            </div>
                            </div>
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> CAP</p>
                                <p className="subtitle is-6">&#8594;{privato.cap}</p>
                            </div>
                            </div>
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Città</p>
                                <p className="subtitle is-6">&#8594;{privato.citta}</p>
                            </div>
                        </div>
                        </div>

                        <nav className="level">
                                <div className="level-left">
                                    <p className="subtitle is-5">
                                    <i className="far fa-dot-circle"></i><strong className="column-show-title">Recapiti</strong>
                                    </p>
                                </div>
                            </nav>
                        <div className="columns column-show">
                            <div className="column">
                                <div className="card-content">
                                    <p className="title is-6 label-column-show"> Telefono</p>
                                    <p className="subtitle is-6">&#8594;{privato.telefono}</p>
                                </div>
                            </div>
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Email</p>
                                <p className="subtitle is-6">&#8594;{privato.email}</p>
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
                                    <p className="subtitle is-6">&#8594;{privato.note}</p>
                                </div>
                            </div>
                        </div>

                        <div className="iscrizioni-privato">
                            <nav className="level">
                                <div className="level-left">
                                    
                                    <p className="subtitle is-5">
                                    <i className="far fa-dot-circle"></i><strong className="column-show-title">Iscrizioni</strong>
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
                                    <i className="far fa-dot-circle"></i><strong className="column-show-title">Fatture</strong>
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
                        </div>
                    )
                
            }}
            
            </Query>
        )
    }
}


export default Show;
