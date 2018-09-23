import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import gql from "graphql-tag";
import { Query, withApollo } from "react-apollo";
import 'babel-polyfill';
import numeral from "numeral";


class Show extends React.Component{
    constructor(props,state){
        super(props,state);
        this.state={invoice: {
            numero: 1,
            anno: '',
            data: '',
            prestazione: '',
            importo: '',
            iva: '',
            con_cassa: '',
            ritenuta: '',
            bolli: '',
            totale: '',
            id_cliente: 0,
            cliente:
            { id: 340,
            indirizzo: '',
            civico: '',
            cap: '',
            citta: '',
            p_iva: '',
            telefono: null,
            email: null,
            note: '' },
            privato: {nome:"",cognome:""},
            societum: {rag_sociale:""}
        },customer:{},modalState:''};
    }

    async componentDidMount(){

        console.log("we");

        const GET_FATTURA_ALL = gql`
        query fattura($numero:Int,$anno:String){
            fattura(numero: $numero, anno: $anno) {
              numero
              anno
              data
              prestazione
              importo
              iva
              con_cassa
              ritenuta
              bolli
              totale
              cliente{
                indirizzo
                civico
                cap
                citta
                ...on Privato{
                    nome
                    cognome
                }
              ...on Societa{
                    rag_sociale
                }
              }
             
            }
          }    
        `;


        var result = await this.props.client.query({
            query: GET_FATTURA_ALL,
            variables: { "numero" : this.props.match.params.numero, "anno": this.props.match.params.anno},
        });
        this.setState({
            invoice: result.data.fattura[0]
        });
       
        
        
    }

    getCustomer(id){
        axios.get('/privato/' + id)
        .then(res => {
                this.setState({ customer: res.data });
        })
    }
  
    render(){




        var rowsValue = []
       

        if(this.state.invoice.ritenuta > 0){
            rowsValue = [...rowsValue,{name: "Ritenuta D'Acconto 20%", value: this.state.invoice.ritenuta}]
        }

        if(this.state.invoice.con_cassa > 0){
            rowsValue = [...rowsValue,{name: "Contributo Cassa 4%", value: this.state.invoice.con_cassa}]
            rowsValue = [...rowsValue,{name: "Imponibile", value: this.state.invoice.importo + this.state.invoice.con_cassa}]
        }

        if(this.state.invoice.bolli > 0){
            rowsValue = [...rowsValue,{name: "Bolli in Fattura", value: this.state.invoice.bolli}]
           
        }
        if(this.state.invoice.iva > 0){
            rowsValue = [...rowsValue,{name: "Iva 22%", value: this.state.invoice.iva}]
        }


        const rows = rowsValue.map((row,index) =>
            <tr key={index}>
                <td>{row.name}</td>
                <td>€ {numeral(row.value).format('0,0.00')}</td>
            </tr>
        );
        
        
        //var customertype = this.state.invoice.privato != null ?  "privato" : "societa";
        //var customertype = "privato";

        return(
            <div>
            <nav className="level">
               <div className="level-left">
               <h1><strong>Scheda Fattura</strong></h1>
               </div>
                   <div className="level-right">
                       <p className="level-item buttons">
                            <a className="button print is-rounded" onClick = {()=>printInvoice()}>
                                <span className="icon">
                                <i className="fas fa-print"></i>
                                </span>
                                <span>Stampa</span>
                            </a>
                       </p>
                   </div>
           </nav>

           <div>
               <div>
                    <img src={require('../../assets/images/logo.png')} />
               </div>

               <div className="customer-info">
                   <div><strong>{this.state.invoice.cliente.nome ? this.state.invoice.cliente.nome + " " + this.state.invoice.cliente.cognome : this.state.invoice.cliente.rag_sociale} </strong></div>
                   {(this.state.invoice.cf) ? <div>{this.state.invoice.privato.cf}</div> : null}
                   <div>{this.state.invoice.cliente.indirizzo}, {this.state.invoice.cliente.civico}</div>
                   <div>{this.state.invoice.cliente.cap} - {this.state.invoice.cliente.citta}</div>
               </div>

              <div>
                   Fattura N. {this.state.invoice.numero} del {moment(this.state.invoice.data).format('DD MM YYYY')}
              </div>
               <div className="invoice-middle">
                   <div className="subject-title"> Prestazione </div>
                   <div className="subject-value">
                       {this.state.invoice.prestazione}
                   </div>
               </div>


               <div className="table-area">
                   <table>
                       <thead>
                       <tr>
                           <th>Causale</th>
                           <th>Importo</th>
                       </tr>
                       </thead>
                       <tbody>
                           <tr><td> </td><td> </td></tr>

                           <tr>
                               <td>Onorario</td>
                               
                               <td>€ {numeral(this.state.invoice.importo).format('0,0.00')}</td>
                           </tr>

                           {rows}
                           

                           <tr>
                               <td className="total-td">Totale Fattura</td>
                               <td>€ {numeral(this.state.invoice.totale).format('0,0.00')}</td>
                           </tr>
                       </tbody>
                   </table>
               </div>

           </div>


           <div className="invoice-footer">
               <div>
                   *esente IVA ex art.10 n.20 DPR 633/72
               </div>

               <div>BANCO DI NAPOLI IBAN : 0000000000000000000000000000
               </div>
           </div>
        

       </div>
        )
    }
}

function printInvoice() {
    window.print();
}

function mapStateToProps(state){
    console.log(state.corsoReducer);
    return{
        getInvoice: (anno,numero)=>(state.fatturaReducer.elements.filter((element)=>{return element.anno == anno && element.numero == numero})),
    }
}

//export default connect(mapStateToProps)(Show);
export default withApollo(Show);
