import React from "react";
import Cleave from 'cleave.js/react';
import { Mutation } from "react-apollo";
import {GET_PRIVATO,ADD_RATA} from '../queries';

class AddRata extends React.Component{

    constructor(props,state){
        super(props,state);
        this.state = {
            rata:{
                cod_iscrizione:this.props.codIscrizione,
                num_rata:"",
                data:"",
                importo:"",
                metodo:"",
                num_ricevuta:""
            }
        }

        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        event.preventDefault();
        let rata = this.state.rata;
        let name = event.target.name;
        let value = event.target.value;
        rata[name] = value;
        this.setState({rata});
    }

    render(){
        return(
            <Mutation mutation={ADD_RATA}
            
            update={(cache, { data: { createRata } }) => {
                var rate = cache.readQuery({query: GET_PRIVATO,variables:{id:this.props.idPrivato.toString()}});
                createRata.data = this.state.rata.data;
                rate.privato.iscrizioni[rate.privato.iscrizioni.findIndex((i)=>{return i.codice==this.props.codIscrizione })].rate.push(createRata);
                cache.writeQuery({ query: GET_PRIVATO , variables:{id:this.props.idPrivato.toString()}, data:{privato:rate.privato} });
            }}
            >

            {(createRata, { data }) => (
            
            
            <div className="modal-card">
            <form onSubmit={e=>{
                e.preventDefault();
                let rata = this.state.rata;
                rata['data'] = moment(rata['data'],'DD/MM/YYYY').format('YYYY-MM-DD');
                createRata({variables:{
                    input:rata
                }})
            }}>
            <header className="modal-card-head">
                <p className="modal-card-title">Nuova Rata</p>
                <button onClick={this.props.closeModal} className="delete" aria-label="close"></button>
            </header>
            <section className="modal-card-body">
            
            <div>
                <div className="field">
                    <label className="label">Numero Rata</label>
                    <div className="control">
                        <input name="num_rata" className="input" type="text" placeholder="" onChange={this.handleChange}/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Data</label>
                    <div className="control">
                        <Cleave value={this.state.rata.data.toString()} options={{date: true, datePattern: ['d', 'm', 'Y']}} onChange={this.handleChange} name="data" className="input" placeholder="Data"/>
                    </div>
                </div>


                <div className="field">
                    <label className="label">Importo</label>
                    <div className="control">
                        <input name="importo" onChange={this.handleChange} className="input" type="text" placeholder=""/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Metodo di Pagamento</label>
                    <div className="control">
                    <div className="select is-fullwidth">
                        <select name="country">
                            <option value="contanti">Contanti</option>
                            <option value="bonifico">Bonifico Bancario</option>
                            <option value="carta">Carta di Credito</option>
                        </select>
                    </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Numero Ricevuta</label>
                    <div className="control">
                        <input name="num_ricevuta" onChange={this.handleChange} className="input" type="text" placeholder=""/>
                    </div>
                </div>
            </div>
            
            </section>
            
            
                <footer className="modal-card-foot">
                    <button type="submit" className="button is-success">Aggiungi Rata</button>
                    <button onClick={(e)=>{this.props.changeAddState(e,false)}} className="button">Indietro</button>
                </footer>
                </form>
            </div>
            )}
            </Mutation>

        )
    }
}

export default AddRata;