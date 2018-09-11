import React from "react";
import { withApollo } from "react-apollo";


class ModalRate extends React.Component{

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
                </tr>
                     
        )
        return(
            <div className={"modal " + this.props.isActive}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Iscrizione</p>
                        <button onClick={this.props.closeModal} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">

                        <div className="columns">
                                <div className="column">
                                    <div><strong>Codice: </strong> {this.props.iscrizione.corso.codice}</div>
                                </div>
                                <div className="column">
                                    <div><strong> Nome: </strong> {this.props.iscrizione.corso.nome}</div>
                                </div>
                                <div className="column">
                                    <div><strong>Ore: </strong> {this.props.iscrizione.corso.ore}</div>
                                </div>
                        </div>

                        <div className="columns">
                            <div className="column">
                                <div><strong>Prezzo: </strong> € {this.props.iscrizione.prezzo}</div>
                            </div>
                        </div>


                        <table className="table is-fullwidth is-striped is-hoverable">

                            <thead>
                                <tr><th>Num</th><th>Num Ricevuta</th><th>Importo</th><th>Data</th><th>Metodo</th></tr>
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
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success">Save changes</button>
                        <button onClick={this.props.closeModal} className="button">Cancel</button>
                    </footer>
                </div>
            </div>
        )
    }
}


export default withApollo(ModalRate);