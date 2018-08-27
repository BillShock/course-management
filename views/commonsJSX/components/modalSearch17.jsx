import React from "react";
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import {bindActionCreators} from 'redux';
import Cleave from 'cleave.js/react';

class ModalSearch extends React.Component{
    constructor(props,state){
        super(props,state);

        this.state=({
            privati: [],
            privatoInputValue:'',
            autocompleteActive: 'is-hidden',
            privatoSelected:null,
            price:0,
            privatiAdded:[],
            cursor:-1
        });
        this.modalFilter = this.modalFilter.bind(this);
        this.addPrivato = this.addPrivato.bind(this);
        this.formValidation = this.formValidation.bind(this);
        this.keySelect = this.keySelect.bind(this);
    }

    async componentDidMount(){

        const result = await this.props.client.query({
            query: this.props.query
        });
    
        this.setState({
           privati: result.data.privato_all
        })
    }

    modalFilter(event){
       
        event.preventDefault();
        if(event.target.value.length==0) {
            this.setState({privatoInputValue:'', autocompleteActive:'is-hidden'});
        }else{
            this.setState({
              /*  privati: this.state.privati.filter((privato) => {
                    if(privato.nome && privato.cognome)
                        return privato.nome.toLowerCase().includes(event.target.value) || privato.cognome.toLowerCase().includes(event.target.value)
                }),*/
                privatoInputValue:event.target.value,
                autocompleteActive: ''
            })
        }
       
    }
    selectPrivato(privato){
        var text = privato.cf + " " + privato.nome + " " + privato.cognome;
        this.setState({privatoInputValue:text,autocompleteActive:'is-hidden',privatoSelected:privato,privatiAdded:this.state.privatiAdded});
    }
    addPrivato(){
        //this.setState({privatoInputValue:'',autocompleteActive:'is-hidden',privatoSelected:{},privatiAdded:[...this.state.privatiAdded,this.state.privatoSelected]});
        if(this.formValidation()){
            var privato = this.state.privatoSelected;
            /*var privato = {
                id: this.state.privatoSelected.id,
                nome: this.state.privatoSelected.nome,
                cognome: this.state.privatoSelected.cognome,
                prezzo: this.state.price
            }*/
            console.log(privato);
            //privato['prezzo'] = this.state.price;
            this.props.addAction(privato);
            this.setState({privatoInputValue:'',autocompleteActive:'is-hidden',privatoSelected:null,price:0})
            this.props.closeAction();
        }
    }
    formValidation(){
        if(this.state.privatoSelected===null){
            return false;
        }
        else return true;
    }
    keySelect(e){
        if (e.keyCode === 38 && this.state.cursor > 0) {
            this.setState( prevState => ({
              cursor: prevState.cursor - 1
            }))
          } else if (e.keyCode === 40 && this.state.cursor < this.state.privati.length - 1) {
            this.setState( prevState => ({
              cursor: prevState.cursor + 1
            }))
          }
          else if(e.key == 'Enter'){
            var privato = this.state.privati[this.state.cursor];
            this.selectPrivato(privato);
          }
          else{
              this.setState({cursor:-1})
          }
      
    }
    render(){
        const privati = this.state.privati.map((privato,index) =>{ 
                var classSelected = '';
                if(index == this.state.cursor)
                    classSelected = 'selected';

                return <li className={classSelected} key={index}><a onClick={()=>{this.selectPrivato(privato)}}>{privato.cf} {privato.nome} {privato.cognome}</a></li>
            });

      
        return(
            <div className={"modal modal-search " + this.props.isActive}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                        <p className="modal-card-title">Aggiungi un Privato</p>
                        <button onClick={this.props.closeAction} className="delete" aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                        <div className="field field-autocomplete">
                            <p className="control has-icons-left has-icons-right">
                                <input onKeyDown={this.keySelect} className="input" value={this.state.privatoInputValue} type="text" onChange={this.modalFilter} placeholder="Cerca Privato"/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-user"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check"></i>
                                </span>
                            </p>

                             <div className={"autocomplete-menu " + this.state.autocompleteActive}>
                                <ul>
                                    {privati.slice(0,10)}
                                </ul>
                            </div>
                        </div>

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
                        <button onClick={this.addPrivato} className="button is-info">Aggiungi al Corso</button>
                        <button className="button">Annulla</button>
                        </footer>
                    </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state);
    return{
        privati: state.privatoReducer.elements.filter((element)=>{return element.nome.toLowerCase().includes(state.privatoReducer.searchText.toLowerCase())}),
        loading: state.privatoReducer.loading,
        filter: state.filterReducer
    }
}


function mapDispatchToProps(dispatch){
   
    return{
        addNewCorso: (element) => bindActionCreators(addAction,dispatch)(element,"corso"),
        setTextFilter: (text) => bindActionCreators(setTextFilter,dispatch)(text,"privato"),
        setCorsi: (elements) => bindActionCreators(setAction,dispatch)(elements,"corso"),
        deleteCorso: (id) => bindActionCreators(deleteAction,dispatch)(id,"corso")
    }
}


//export default connect(mapStateToProps,mapDispatchToProps)(ModalSearch);
export default withApollo(ModalSearch);