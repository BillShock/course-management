import React from "react";
import Notification from '../commonsJSX/components/notification';
import Cleave from 'cleave.js/react';
import { Mutation } from "react-apollo";
import {ADD_FATTURA} from './queries';



class Add extends React.Component{
    constructor(props,state){
        super(props,state);
       // this.state.codice="";
       this.state = {
            invoice:{
               numero:"",
               anno:"",
               data:"",
               prestazione:"",
               importo:0,
               iva:0,
               con_cassa:0,
               ritenuta:0,
               bolli:0,
               totale: 0,
               customerType:"",
               id_cliente: ""
            },
           ivaCheck:{'con_cassa':[false,4],'iva':[false,22],'bolli':[false,0],'ritenuta':[false,20]},
           formActionText:"",
           formAction:(event)=> event.preventDefault(),
           formSent:false,
           btnState:false,
           btnClassState: ""
       }
       this.handleChange=this.handleChange.bind(this);
       this.handleTotal=this.handleTotal.bind(this);
       this.handleCustomerType=this.handleCustomerType.bind(this);
       this.handleError=this.handleError.bind(this);
       this.handleOnComplete=this.handleOnComplete.bind(this);
       this.checkBoxHandle=this.checkBoxHandle.bind(this);
       this.updateTotal = this.updateTotal.bind(this);
    }

    componentDidMount(nextProps){
        if(this.props.match.params.id === undefined){
            
            this.setState({
                //ivaCheck:{'cassa':0,'iva':0},
                formActionText:"Inserisci",
                formAction:this.addFattura,
                formSent:this.state.formSent
            });
            
        }
        else{
            var course = this.props.getCorso(this.props.match.params.id)[0];
            console.log(course);
            /*
            this.setState({
                course,
                formActionText:"Aggiorna",
                formAction:this.updateCorso,
                formSent:this.state.formSent
            });
            */
        }
    }

    addFattura(event){
        
        event.preventDefault();
        this.setState({btnState:"is-loading"});


    }

    updateFattura(event){
        event.preventDefault();
        //this.props.updateCorso({id:10,codice:4000,nome:"OSS"});

        //http://localhost:1337/user/update/123?name=joe

        


    }

    handleChange(event) {
        event.preventDefault();
        let invoice = this.state.invoice;
        let name = event.target.name;
        let value = event.target.value;
        console.log(value);
        invoice[name] = value;
        //invoice['numero'] = parseInt(invoice['numero']);
        //invoice['data'] = moment(invoice['data'],'YYYY-MM-DD').format('YYYY-MM-DD');
        invoice['totale'] = parseFloat(invoice['totale']);
        this.setState({invoice,formActionText:this.state.formActionText,formAction:this.state.formAction})
    }

    handleTotal(event) {
        event.preventDefault();
        //var invoice = this.state.invoice;
        //invoice['importo'] = parseInt(event.target.value);
        var invoice = this.updateTotal(parseFloat(event.target.value));
        invoice['importo'] = parseFloat(event.target.value);
        this.setState({invoice,formActionText:this.state.formActionText,formAction:this.state.formAction})
    }

    handleCustomerType(event){
        var invoice = this.state.invoice;
        invoice.customerType = event.target.value;

        this.setState({
            customerType: invoice
        });
    }


    

    checkBoxHandle(event) {
        let iva = this.state.ivaCheck;
        let name = event.target.name;
        iva[name][0] = !iva[name][0];
        //var invoice = this.state.invoice;
        //invoice['totale'] = this.updateTotal(invoice['importo']);
        var invoice = this.updateTotal(this.state.invoice['importo']);
        this.setState({invoice,iva,formActionText:this.state.formActionText,formAction:this.state.formAction});
    }




    updateTotal(currentTotal){
        let iva = this.state.ivaCheck;
        var invoice = this.state.invoice;
        var totale = parseFloat(currentTotal);
        var keys = Object.keys(iva);
        var perc = 0;
        for(var i=0;i<keys.length;i++){
            if(iva[keys[i]][0]==true){
                perc = (iva[keys[i]][1]/100) * parseFloat(currentTotal);
                if(keys[i] == "ritenuta")
                        totale -= perc;
                else{
                    if(keys[i]=="bolli"){
                        perc = 2;
                    }
                    totale += perc;
                }

                invoice[keys[i]] = perc;
            }
        }

       
        invoice['totale'] = totale;
        
        return invoice;
    }

    handleError(error){
        console.log(error.message);
        this.setState({
            formSent: true,
            notificationType:"is-danger",
            notificationMessage:error.graphQLErrors[0].message,
            formActionText:"Fattura non Creata",
            btnState:false,
            btnClassState:""
        })
    }
    handleOnComplete(){
        this.setState({
            formSent: true,
            notificationType:"is-success",
            notificationMessage:"Fattura creata con successo.",
            formActionText:"Fattura Creata",
            btnState:true,
            btnClassState:""
        })
    }

    
    render(){

        

        return(
            <div>


            <Mutation mutation={ADD_FATTURA} onCompleted={this.handleOnComplete} onError={(error)=>{this.handleError(error)}}>
            {(createFattura, { data }) => (

            <form onSubmit={ e => {
                    e.preventDefault();

                    this.setState({btnState:"is-loading"});

                    
                    var invoice = this.state.invoice;
                    invoice['data'] = moment(invoice['data'],'DD-MM-YYYY').format('YYYY-MM-DD');
                    createFattura({ variables: { input: invoice } });
/*
                    this.setState({
                        formSent: !this.state.formSent,
                        notificationType:"is-success",
                        notificationMessage:"Fattura creata con successo.",
                        formActionText:"Fattura Creata",
                        btnState:""
                    })
                    */

                  }
            }>

                <Notification isVisible={this.state.formSent} type={this.state.notificationType} message={this.state.notificationMessage} />

                <h1><strong>Scheda di Inserimento</strong></h1>
                <div id="margin-fattura">
                <div className="title-card-add">
                    <span className="label-card-add">Nuova Fattura</span>
                </div>
                
                <div className="box">

                <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label">Seleziona il tipo di cliente</label>
                        <p className="help is-danger">Prima di procedere è necessario selezionare la tipologia cliente</p>
                    </div>
                    <div className="field-body">
                        <div className="field is-narrow">
                            <div className="tabs is-toggle" value={this.state.invoice.customerType} onChange={this.handleCustomerType} required>
                                <ul>
                                    <li className="is-active-tab">
                                        <a>
                                            <span class="icon is-small"><i class="fas fa-user" aria-hidden="true"></i></span>
                                            <span>Privati</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <span class="icon is-small"><i class="fas fa-briefcase" aria-hidden="true"></i></span>
                                            <span>Società</span>
                                        </a>                                     
                                    </li>                                  
                                </ul>                               
                            </div>                          
                        </div>
                    </div>
                    </div>

<div className="field is-horizontal margin-add">
  <div className="field-label is-normal">
      <label className="label">Intestazione e numero Fattura</label>
      <p className="help is-danger">Tutti i campi sono obbligatori</p>
  </div>
  <div className="field-body">
      <div className="field">
      <p class="control is-expanded">
          <div className="field">
              <label className="label label-add">Inserisci il Codice Fiscale o Partita iva</label>
              <input value={this.state.invoice.id_cliente} type="text" name="id_cliente" onChange={this.handleChange} className="input" placeholder="Scrivi qui" required/>
          </div>
      </p>
      </div>

      <div className="field">
      <p class="control is-expanded">
          <div className="field">
              <label className="label label-add">Numero fattura</label>
              <input value={this.state.invoice.numero} type="text" name="numero" onChange={this.handleChange} className="input" pattern="[0-9]+" title="Inserire solo numeri" placeholder="Scrivi qui" required/>
          </div>
      </p>
      </div>
  </div>
</div>

<div className="field is-horizontal margin-add">
<div className="field-label is-normal">
  <label className="label">Date di Fatturazione</label>
  <p className="help is-danger">Tutti i campi sono obbligatori</p>
</div>
<div className="field-body">
  <div className="field">
  <p class="control is-expanded">
      <div className="field">
          <label className="label label-add">Anno fattura</label>
          <input value={this.state.invoice.anno} type="text" name="anno" onChange={this.handleChange} className="input" placeholder="Scrivi qui" required/>
      </div>
  </p>
  </div>

  <div className="field">
  <p class="control is-expanded">
  <div className="field">
      <label className="label label-add">Data emissione Fattura</label>
      <Cleave value={this.state.invoice.data.toString()} options={{date: true, datePattern: ['d', 'm', 'Y']}} onChange={this.handleChange} name="data" className="input" placeholder="Scrivi qui" required/>
      </div>
  </p>
  </div>
</div>
</div>

<div className="field is-horizontal margin-add">
<div className="field-label is-normal">
<label className="label">Importi da Fatturare</label>
  <p className="help is-danger">Tutti i campi sono obbligatori</p>
</div>
<div className="field-body">
  <div className="field">
      <p class="control is-expanded">
          <div className="field">
              <label className="label label-add">Inserisci Importo</label>
              <p className="control">
                  {/*<Cleave value={this.state.invoice.data.toString()} options={{date: true, datePattern: ['d', 'm', 'Y']}} onChange={this.handleChange} name="data_inizio" className="input" placeholder="Scrivi"/>*/}
                  <input name="importo" type="text" onChange={this.handleTotal} className="input" pattern="[0-9]+" title="Inserire solo numeri"  placeholder="Scrivi qui"/>
              </p>
          </div>
      </p>
  </div>

        <div className="field">
            <p class="control is-expanded">
            <div className="field">
                <label className="label label-add">Applica se necessario trattenute o importi al totale </label>
                <p className="control">
          {/*<Cleave value={this.state.invoice.data.toString()} options={{date: true, datePattern: ['d', 'm', 'Y']}} onChange={this.handleChange} name="data_fine" className="input" placeholder="Scrivi"/>*/}
                    <div className="field ">
                        <label className="checkbox">
                            <input name="con_cassa" type="checkbox" onChange={ this.checkBoxHandle } /> <span> 4% Cassa</span>
                        </label>
                    </div>
                    <div className="field">
                            <label className="checkbox">
                            <input name="iva" type="checkbox" onChange={ this.checkBoxHandle } /> <span> 22% IVA</span>
                        </label>
                    </div>

                    <div className="field">
                        <label className="checkbox">
                            <span className="checkmark"><input name="ritenuta" onChange={this.checkBoxHandle} type="checkbox"/></span> <span> Ritenuta d'acconto 20%</span>
                        </label>
                    </div>

                    <div className="field">
                        <label className="checkbox">
                            <input name="bolli" onChange={this.checkBoxHandle} type="checkbox"/> <span> Bolli in Fattura 2€</span>
                        </label>
                    </div>
                 </p>
            </div>
            </p>
            </div>
        </div>
    </div>

            <div className="field is-horizontal margin-add">
            <div className="field-label is-normal">
            <label className="label">Riepilogo</label>
                <p className="help is-danger">Il campo seguente non è modificabile</p>
            </div>
            <div className="field-body">
                <div className="field">
                    <p class="control is-expanded">
                        <div className="field">
                            <label className="label label-add">Importo totale aggiornato</label>
                            <p className="control">
                                {/*<Cleave value={this.state.invoice.data.toString()} options={{date: true, datePattern: ['d', 'm', 'Y']}} onChange={this.handleChange} name="data_inizio" className="input" placeholder="Scrivi"/>*/}
                                <Cleave value={this.state.invoice.totale} className="input" placeholder="Totale" options={{numeral: true, numeralThousandsGroupStyle: 'thousand'}} readOnly/>
                            </p>
                        </div>
                    </p>
                </div>
            </div>
            </div>


            <div className="field is-horizontal margin-add">
                <div className="field-label is-normal">
                    <label className="label">Altro</label>
                    <p className="help is-danger">Il campo note è facoltativo</p>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <div className="field">
                                <label className="label label-add">Aggiungi Note</label>
                                <textarea name="prestazione" value={this.state.invoice.prestazione} className="textarea" onChange={this.handleChange} rows="3" placeholder="Note"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
               
</div>
    <footer className="footer-add">
        <nav className="navbar">
            <div className="navbar-end">
                <nav className="navbar-item">
                    <button type="submit" className={"button is-submit-fattura " + this.state.btnClassState}  disabled={this.state.btnState}>{this.state.formActionText}</button>
                </nav>
            </div>
        </nav>
    </footer> 
                
            </form>

            )}
            </Mutation>

            </div>
        )
    }
}

export default Add;
