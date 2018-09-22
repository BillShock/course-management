import React from "react";
import ReactDOM from 'react-dom';
import Table from '../commonsJSX/components/table';
import ModalSearch from '../commonsJSX/components/modalSearch';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import { Query } from "react-apollo";
import {GET_SOCIETA} from './queries';


class Show extends React.Component{
    constructor(props,state){
        super(props,state);
        this.state={privato: {},modalRate:'',currentIscrizione:0};
    }

    componentDidMount(){
       
    }

   
    render(){

        
        return(

            <Query query={GET_SOCIETA} variables={{id:this.props.match.params.id}}>

            {({loading,error,data}) => {

                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                    var societa = data.societa;
                   
             

                    const fatture = societa.fatture.map((fattura,index) => 
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

                            <h1>Società</h1>
                            <div className="columns">
                                <div className="column">
                                    <div><strong>Ragione Sociale: </strong> {societa.rag_sociale}</div>
                                </div>
                                <div className="column">
                                   <div><strong>Partita IVA: </strong> {societa.p_iva}</div>
                                </div>
                                <div className="column">
                                    <div><strong>DVR: </strong> {societa.dvr}</div>
                                </div>
                            </div>

                            <div className="columns">
                                <div className="column">
                                    <div><strong>Indirizzo: </strong> {societa.indirizzo}, {societa.civico}</div>
                                </div>
                                <div className="column">
                                    <div><strong> CAP: </strong> {societa.cap}</div>
                                </div>
                                <div className="column">
                                    <div><strong>Città: </strong> {societa.citta}</div>
                                </div>
                            </div>

                            <div className="columns">
                                <div className="column">
                                    <div><strong>Telefono: </strong> {societa.telefono}</div>
                                </div>
                                <div className="column">
                                    <div><strong> Email: </strong> {societa.email}</div>
                                </div>
                            </div>

                            <div>
                                <strong>Note:</strong>
                                <div>{societa.note}</div>
                            </div>


                            <div>



                          

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
