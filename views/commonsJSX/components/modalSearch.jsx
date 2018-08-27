import React from "react";
import { withApollo } from 'react-apollo';
import Cleave from 'cleave.js/react';
import { Query,Mutation } from "react-apollo";
import { GET_CORSO,ADD_ISCRIZIONE } from "../../corso/queries";
import { GET_PRIVATO_ALL } from "../../privato/queries";

class ModalSearch extends React.Component{
    constructor(props,state){
        super(props,state);

        this.state=({
            privati: [],
            privatoInputValue:'',
            autocompleteActive: 'is-hidden',
            privatoSelected:{id:""},
            price:0,
            privatiAdded:[],
            cursor:-1,
            textFilter:"",
            loadingInput:""
           
        });
        this.modalFilter = this.modalFilter.bind(this);
        this.formValidation = this.formValidation.bind(this);
        this.keySelect = this.keySelect.bind(this);
    }


    modalFilter(event){
       
        event.preventDefault();
        if(event.target.value.length==0) {
            this.setState({textFilter:'',privatoInputValue:'', autocompleteActive:'is-hidden'});
        }else{
            this.setState({
                /* privati: this.state.privati.filter((privato) => {
                    if(privato.nome && privato.cognome)
                        return privato.nome.toLowerCase().includes(event.target.value) || privato.cognome.toLowerCase().includes(event.target.value)
                }),*/
                textFilter:event.target.value,
                privatoInputValue:event.target.value,
                autocompleteActive: ''
            })
        }
       
    }
    selectPrivato(privato){
        var text = privato.cf + " " + privato.nome + " " + privato.cognome;
        this.setState({privatoInputValue:text,autocompleteActive:'is-hidden',privatoSelected:privato,privatiAdded:this.state.privatiAdded});
    }

    formValidation(){
        if(this.state.privatoSelected===null){
            return false;
        }
        else return true;
    }
    keySelect(e,privati){
        if (e.keyCode === 38 && this.state.cursor > 0) {
            this.setState( prevState => ({
              cursor: prevState.cursor - 1
            }))
        } else if (e.keyCode === 40 && this.state.cursor < privati.length - 1) {
            this.setState( prevState => ({
              cursor: prevState.cursor + 1
            }))
        } else if(e.key == 'Enter'){
            var privato = privati[this.state.cursor];
            this.selectPrivato(privato);
        }
        else{
              this.setState({cursor:-1})
        }
      
    }
    render(){

        var input = {
            idcliente: this.state.privatoSelected.id,
            idcorso: this.props.id,
            prezzo: parseFloat(this.state.price),
            esito_esame:"",
            privato:null
        }

        return(
          
            <div className={"modal modal-search " + this.props.isActive}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                        <p className="modal-card-title">Aggiungi un Privato</p>
                        <button onClick={this.props.closeAction} className="delete" aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                        
                        


                            <Query query={GET_PRIVATO_ALL} variables={{textFilter:this.state.textFilter}}>

                            {({loading,error,data}) => {
                            
                            if(loading) return (
                                <div className="field field-autocomplete">
                                <p className="control has-icons-left is-loading">
                                    <input className="input" value={this.state.privatoInputValue} type="text" onChange={this.modalFilter} placeholder="Cerca Privato"/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </p>
                                </div>
                            )

                            if (error) return `Error! ${error.message}`;
                                
                            const privati = data.privato_all.map((privato,index) =>{
                                var classSelected = '';
                                if(index == this.state.cursor)
                                    classSelected = 'selected';
                                return <li className={classSelected} key={index}><a onClick={()=>{this.selectPrivato(privato)}}>{privato.cf} {privato.nome} {privato.cognome}</a></li>
                            });
                            
                    
                            return(

                            <div className="field field-autocomplete">
                            <p className="control has-icons-left has-icons-right">
                                <input onKeyDown={(e)=>this.keySelect(e,data.privato_all)} className={"input " + this.state.loadingInput} value={this.state.privatoInputValue} type="text" onChange={this.modalFilter} placeholder="Cerca Privato" readOnly={this.state.privatoSelected.id!=""}/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-user"></i>
                                </span>
                                <span onClick={()=>{this.setState({privatoInputValue:'',privatoSelected:{id:""}})}} className="icon reset-icon is-small is-right">
                                    <i className="fas fa-times"></i>
                                </span>
                            </p>

                            <div className={"autocomplete-menu " + this.state.autocompleteActive}>
                                <ul>
                                    {privati.slice(0,10)}
                                </ul>
                            </div>
                            </div>
                            );

                            }}
                            </Query>
                        

                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                
                                <Cleave className="input" placeholder="Inserisci il Prezzo"
                                value={this.state.price}
                                options={{numeral: true, numeralThousandsGroupStyle: 'thousand'}}
                                onFocus={this.onCreditCardFocus}
                                onChange={(event)=>{this.setState({price:event.target.value})}} />

                                <span className="icon is-small is-left">
                                    <i className="fas fa-euro-sign"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check"></i>
                                </span>

                            </p>

                           
                        </div>


                        
                        </section>
                        <footer className="modal-card-foot">
                         
                        <Mutation mutation={ADD_ISCRIZIONE} 
                        

                        
                        update={(store, { data: { iscrizioneCorso } }) => {
                            
                            const corsi = store.readQuery({query: GET_CORSO,variables:{id:this.props.corso.id.toString()}});
     
                            //iscrizioneCorso.codice = this.state.codice
                            iscrizioneCorso.privato = this.state.privatoSelected
                            iscrizioneCorso.idcliente = parseInt(this.state.privatoSelected.id)
                            //iscrizioneCorso.idcliente = this.state.privatoSelected.id
                            corsi.corso.iscrizione = [...corsi.corso.iscrizione,iscrizioneCorso]

                           
                            store.writeQuery({
                                query:GET_CORSO,
                                data:{corso:corsi.corso}
                            })


                            this.setState({privatoInputValue:'',autocompleteActive:'is-hidden',privatoSelected:{id:""},price:0})
                            this.props.closeAction();
                            }
                            
                        }
                        >

                        {iscrizioneCorso => (
                            <button onClick={ e=> {
                                iscrizioneCorso({variables:{input:input}
                            });
                        }
                        } className="button is-info" disabled={this.state.privatoSelected.id == ""}>Aggiungi al Corso</button>
                        )}

                        </Mutation>

                        <button className="button" onClick={this.closeAction}>Annulla</button>
                        </footer>
                    </div>
            </div>

                        )
        
    }
}


export default ModalSearch;