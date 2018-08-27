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

            <Mutation mutation={ADD_PRIVATO}  onError={(error)=>(console.log(error.internalData))}>
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
                        <h1>Inserisci Privato</h1>
                        <div className="field">
                            <input value={this.state.privato.cf} onChange={this.handleChange}  type="text" name="cf" className="input" maxLength="16" placeholder="Codice Fiscale" required/>
                        </div>
        
                        <div className="field is-horizontal">
                            <div className="field-body">
                                <div className="field">
                                    <p className="control is-expanded">
                                        <input type="text" name="nome" onChange={this.handleChange} className="input" placeholder="Nome"/>
                                    </p>
                                </div>
                                <div className="field">
                                    <p className="control s-expanded">
                                        <input type="text" name="cognome" onChange={this.handleChange} className="input" placeholder="Cognome"/>
                                    </p>
                                </div>
                            </div>
                        </div>
        
        
                        <div className="field is-horizontal">
                            <div className="field-body">
                                <div className="field">
                                    <p className="control is-expanded">
                                        <input type="text" name="indirizzo" onChange={this.handleChange} className="input" placeholder="Indirizzo"/>
                                    </p>
                                </div>
                                <div className="field">
                                    <p className="control s-expanded">
                                        <input type="text" name="civico" onChange={this.handleChange} className="input" placeholder="Civico"/>
                                    </p>
                                </div>
                            </div>
                        </div>
        
                        <div className="field is-horizontal">
                            <div className="field-body">
                                <div className="field">
                                    <input type="text" onChange={this.handleChange} name="cap" className="input" placeholder="Cap"/>
                                </div>
                                <div className="field">
                                    <Cleave value={this.state.privato.data_nascita} options={{date: true, datePattern: ['d', 'm', 'Y']}} onChange={this.handleChange} name="data_nascita" className="input" placeholder="Data di Nascita gg/mm/aaaa"/>
                                </div>
                            </div>
                        </div>
        
                        <div className="field is-horizontal">
                            <div className="field-body">
                                <div className="field">
                                    <input type="text" onChange={this.handleChange} name="telefono" className="input" placeholder="Telefono"/>
                                </div>
                                <div className="field">
                                    <input type="text" onChange={this.handleChange} name="email" className="input" placeholder="Email"/>
                                </div>
                            </div>
                        </div>
        
                        <div className="field">
                            <textarea className="textarea" name="note" rows="3" placeholder="Note"></textarea>
                        </div>
                        <button type="submit" className={"button is-success " + this.state.btnState} disabled={this.state.formSent}>{this.state.formActionText}</button>
                    </form>
                    </div>
                )}
            </Mutation>

           
        )
    }
}


export default Add;
