import React from "react";
import { withApollo } from "react-apollo";
import { Mutation } from "react-apollo";
import {GET_PRIVATO,DELETE_RATA} from '../queries';


class ShowRate extends React.Component{

    constructor(props,state){
        super(props,state);
        this.state = {isActive: this.props.isActive,totale:0};
        this.updateTotale = this.updateTotale.bind(this);
    }

    componentDidMount(){
       this.updateTotale();
    }

    updateTotale(){
        var sum = 0;
        this.props.iscrizione.rate.forEach(rata => {
            sum+=rata.importo;
        });

        this.setState({
            totale:sum
        });
    }

    render(){

        const rate = this.props.iscrizione.rate.map((rata,index) => 

                <tr key={index}>
                    <td>{rata.num_rata}</td>
                    <td>{rata.num_ricevuta}</td>
                    <td>{rata.importo}</td>
                    <td>{rata.data}</td>
                    <td>{rata.metodo}</td>

                    <Mutation mutation={DELETE_RATA}
                    update={(cache) => {
                        var rate = cache.readQuery({query: GET_PRIVATO,variables:{id:this.props.idPrivato.toString()}});
                        rate.privato.iscrizioni[rate.privato.iscrizioni.findIndex((i)=>{return i.codice==this.props.iscrizione.codice })].rate.splice(index,1);
                        cache.writeQuery({ query: GET_PRIVATO , variables:{id:this.props.idPrivato.toString()}, data:{privato:rate.privato} });
                    }}
                    >

                    {(deleteRata, { data }) => (
                    
                        <td><span className="btn-delete" onClick={(e) => {
                            e.preventDefault();
                            if (confirm("Sei sicuro di eliminare la rata?")) {
                                deleteRata({ variables: {
                                    cod_iscrizione:this.props.iscrizione.codice,
                                    num_rata:rata.num_rata
                                }});
                            }
                        }} className="icon is-small"><i className="fas fa-times"></i> </span></td>
                  
                    )}

                    </Mutation>
                </tr>
                     
        )
        return(

            <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title"><strong>Rate Iscrizione</strong></p>
                <button onClick={this.props.closeModal} className="delete" aria-label="close"></button>
            </header>
            <section className="modal-card-body">

            <div>

                <div className="columns column-show">
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Codice Corso</p>
                                <p className="subtitle is-6">&#8594;{this.props.iscrizione.corso.codice}</p>
                            </div>
                            </div>
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Nome</p>
                                <p className="subtitle is-6">&#8594;{this.props.iscrizione.corso.nome}</p>
                            </div>
                            </div>
                            <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Ore</p>
                                <p className="subtitle is-6">&#8594;{this.props.iscrizione.corso.ore}</p>
                            </div>
                        </div>
                        <div className="column">
                            <div className="card-content">
                                <p className="title is-6 label-column-show"> Prezzo</p>
                                <p className="subtitle is-6">&#8594;€ {this.props.iscrizione.prezzo}</p>
                            </div>
                        </div>
                        </div>
                        
                        <table className="table is-fullwidth is-striped is-hoverable">

                            <thead>
                                <tr><th>Num</th><th>Num Ricevuta</th><th>Importo</th><th>Data</th><th>Metodo</th><th></th></tr>
                            </thead>

                            <tbody>
                                {rate}
                            </tbody>

                        </table>

                        <nav className="level">
                            <div className="level-left">
                                <div className="level-item">
                                    <p className="subtitle is-5">
                                        <strong>Totale Versato:</strong> € {this.state.totale}
                                    </p>
                                </div>
                            </div>

                            <div className="level-right">
                                <div className="level-item">
                                    <p className="subtitle is-5">
                                        <strong>Restante</strong> € {this.props.iscrizione.prezzo - this.state.totale}
                                    </p>
                                </div>
                            </div>
                        </nav>
            </div>
            </section>
            <footer className="modal-card-foot">
                <button onClick={(e)=>{this.props.changeAddState(e,true)}} className="button is-rounded show">Nuova Rata</button>
                <button onClick={this.props.closeModal} className="button is-rounded is-delete">Esci</button>
            </footer>
            </div>
        )
    }
}


export default withApollo(ShowRate);