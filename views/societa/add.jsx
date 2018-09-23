import React from "react";
import axios from 'axios';
import Notification from '../commonsJSX/components/notification';
import Cleave from 'cleave.js/react';




import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";


class Add extends React.Component{
    constructor(props,state){
        super(props,state);
       // this.state.codice="";
       this.state={
            privato:{
               //id:"",
               nome:"",
               cognome:"",
               data_nascita:"",
               cf:"",
               citta:"",
               p_iva:"",
               telefono:"",
               email:"",
               note:"",
               indirizzo:"",
               civico:"",
               cap:"",
            },
           formActionText:"",
           formAction:(event)=> event.preventDefault(),
           formSent:false,
           btnState: ""
       }
       this.addCorso=this.addCorso.bind(this);
       this.updateCorso=this.updateCorso.bind(this);
       this.handleChange=this.handleChange.bind(this);
       this.reloadCourses=this.reloadCourses.bind(this);
    }

    componentDidMount(nextProps){
        if(this.props.match.params.id === undefined){
            this.setState({
                privato:this.state.privato,
                formActionText:"Inserisci",
                formAction:this.addCorso,
                formSent:this.state.formSent
            });
        }
        else{
            var course = this.props.getCorso(this.props.match.params.id)[0];
            this.setState({
                course,
                formActionText:"Aggiorna",
                formAction:this.updateCorso,
                formSent:this.state.formSent
            });
        }
    }

    addCorso(event){
        
        event.preventDefault();
        this.setState({btnState:"is-loading"});
        /*
        //axios.get('/corso/create?codice='+this.state.course.codice+'&nome='+this.state.course.nome+'&data_inizio='+moment(this.state.course.dataInizio,'YYYY-MM-DD').format('YYYY-MM-DD'))
        axios.post('/corso',{
            //params:{
                codice: this.state.course.codice,
                nome: this.state.course.nome,
                ore: this.state.course.ore,
                data_inizio: moment(this.state.course.dataInizio,'YYYY-MM-DD').format('YYYY-MM-DD'),
                data_fine: moment(this.state.course.dataFine,'YYYY-MM-DD').format('YYYY-MM-DD'),
                ora_inizio: this.state.course.oraInizio,
                ora_fine: this.state.course.oraFine,
                inizio_stage: moment(this.state.course.inizioStage,'YYYY-MM-DD').format('YYYY-MM-DD'),
                data_termine10: moment(this.state.course.dataTermine,'YYYY-MM-DD').format('YYYY-MM-DD')
           // }
            //data_inizio: moment(this.state.course.dataInizio,'YYYY-MM-DD').format('YYYY-MM-DD')
        })
        .then(res => {
           console.log(res.data);
           //this.props.addNewCorso(this.state.course);
           this.setState({
                course:this.state.course,
                formActionText:this.state.formActionText,
                formAction:this.state.formAction,
                formSent: true,
                notificationType:"is-success",
                notificationMessage:"Corso inserito con successo.",
                formActionText:"Inserito",
                btnState:""
            });
            this.reloadCourses();
        }).catch(function (error) {
            console.log(error);
        });
        */

        
    }

    updateCorso(event){
        event.preventDefault();
        /*
        this.props.updateCorso({id:10,codice:4000,nome:"OSS"});

        //http://localhost:1337/user/update/123?name=joe


        axios.patch('/corso/100',{
            //params:{
            codice:4000000,
            nome:"OSAS"
            //}
        })
        .then(res => {
           console.log(res.data);
          
        }).catch(function (error) {
            console.log(error);
        });


        */

    }

    reloadCourses(){
        axios.get('/corso/getCorsi')
        .then(res => {
            this.props.setCorsi(res.data);
        });
    }

    handleChange(event) {
        event.preventDefault();
        let privato = this.state.privato;
        let name = event.target.name;
        let value = event.target.value;
        privato[name] = value;
        this.setState({privato,formActionText:this.state.formActionText,formAction:this.state.formAction})
    }

    
    render(){
        const ADD_PRIVATO = gql`
        mutation ($input: PrivatoInput) {
            createPrivato(input: $input) {
              nome
              cognome
            }
        }     
      `;

        return(

            <Mutation mutation={ADD_PRIVATO}  onError={(error)=>(console.log(error.graphQLErrors[0].message))}>
                {(createPrivato, { data,error }) => (
                    
                    <div>
                    <Notification isVisible={this.state.formSent} type={this.state.notificationType} message={this.state.notificationMessage} />
                    <form onSubmit={e => {
                                e.preventDefault();
                                
                                createPrivato({ variables: {
                                    /*
                                    input:{
                                        //id:1049,
                                        nome: "Aldo",
                                        cognome : "Aldone",
                                        data_nascita: "2016-05-14",
                                        cf: "12324343534656",
                                        citta : "Napoli",
                                        p_iva : "0197232155",
                                        telefono : "01234567",
                                        email : "aldo@aldo.aldo",
                                        note : "dsfdsfdsfdsf",
                                        indirizzo: "Via. ...",
                                        civico : "123"
                                    }
                                    */
                                   input:this.state.privato
                                }
                                });
                                
                                
                        }}>
                        <h1><strong>Scheda di Inserimento</strong></h1>


                        <div id="margin-privato">
                        <div className="title-card-add">
                            <span className="label-card-add"> Nuova Società</span>
                        </div>

            <div className="box">
                    <div className="field is-horizontal margin-add">
                        <div className="field-label is-normal">
                            <label className="label">Dati società</label>
                            <p className="help is-danger">Tutti i campi sono obbligatori</p>
                        </div>
                        <div className="field-body">
                            <div className="field">
                            <p className="control is-expanded">
                                <div className="field">
                                    <label className="label label-add">Ragione Sociale</label>
                                    <input type="text" name="ragione_sociale" onChange={this.handleChange} className="input" placeholder="Scrivi qui" required/>
                                </div>
                            </p>
                            </div>

                            <div className="field">
                            <p className="control is-expanded">
                                <div className="field">
                                    <label className="label label-add">Partita Iva</label>
                                    <input type="text" name="p_iva" onChange={this.handleChange} className="input" pattern="[0-9]+" placeholder="Scrivi qui" required/>
                                </div>
                            </p>
                            </div>

                            <div className="field">
                            <p className="control is-expanded">
                                <div className="field">
                                    <label className="label label-add">DVR</label>
                                    <Cleave value={this.state.privato.data_nascita} options={{date: true, datePattern: ['d', 'm', 'Y']}} onChange={this.handleChange} name="data_nascita" className="input" placeholder="Scrivi qui"/>
                                </div>
                            </p>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal margin-add">
                        <div className="field-label is-normal">
                            <label className="label">Indirizzo Sede Legale</label>
                            <p className="help is-danger">Tutti i campi sono obbligatori</p>
                        </div>
                    <div className="field-body">
                        <div className="field">
                        <p className="control is-expanded">
                            <div className="field">
                                <label className="label label-add">Indirizzo</label>
                                <input type="text" name="indirizzo" onChange={this.handleChange} className="input" placeholder="Scrivi qui" required/>
                            </div>
                        </p>
                        </div>

                        <div className="field">
                        <p className="control is-expanded">
                        <div className="field">
                            <label className="label label-add">Civico</label>
                            <input type="text" name="civico" onChange={this.handleChange} className="input" placeholder="Scrivi qui" required/>
                            </div>
                        </p>
                        </div>

                        <div className="field">
                        <p className="control is-expanded">
                        <div className="field">
                            <label className="label label-add">CAP</label>
                            <input type="text" onChange={this.handleChange} name="cap" className="input" pattern="[0-9]+" placeholder="Scrivi qui" required/>
                            </div>
                        </p>
                        </div>
                    </div>
                    </div>

                    <div className="field is-horizontal margin-add">
                        <div className="field-label is-normal">
                            <label className="label">Recapiti</label>
                            <label className="help is-danger">Tutti i campi sono obbligatori</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control is-expanded">
                                    <div className="field">
                                        <label className="label label-add">Telefono</label>
                                        <input type="text" onChange={this.handleChange} name="telefono" className="input" pattern="[0-9]+" placeholder="Scrivi qui" required/>
                                    </div>
                                </p>
                            </div>

                            <div className="field">
                                <p className="control is-expanded">
                                <div className="field">
                                    <label className="label label-add">Email</label>
                                    <input type="text" onChange={this.handleChange} name="email" className="input" placeholder="Scrivi qui" required/>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="field is-horizontal margin-add">
                        <div className="field-label is-normal">
                            <label className="label">Altro</label>
                            <label className="help is-danger">Il campo note è facoltativo</label>
                        </div>
                        <div className="field-body">
                        <div className="field">
                        <p className="control is-expanded">
                        <div className="field ">
                                <p className="title is-6 label-add">Aggiungi Note</p>
                                    <textarea className="textarea" name="note" rows="3" placeholder="Note"></textarea>
                                </div>
                        </p>
                        </div>
                        </div>
                    </div>
                        
            </div>
            </div>
                <footer className="footer-add">
                    <nav className="navbar">
                        <div className="navbar-end">
                            <nav className="navbar-item">
                            <button type="submit" className={"button is-submit-privato " + this.state.btnState} disabled={this.state.formSent}>{this.state.formActionText}</button>
                            </nav>
                        </div>
                    </nav>
                </footer>
                    </form>
                    </div>
                )}
            </Mutation>

           
        )
    }
}


export default Add;
