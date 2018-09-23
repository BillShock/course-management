import React from "react";
import axios from 'axios';
import Notification from '../commonsJSX/components/notification';


class Add extends React.Component{
    constructor(props,state){
        super(props,state);
       // this.state.codice="";
       this.state={
            course:{
               id:"",
               codice:"",
               nome:"",
               ore:0,
               aula:"",
               data_inizio:"",
               data_fine:"",
               ora_inizio:0,
               ora_fine:0,
               inizio_stage:"",
               data_termine10:""
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
                course:this.state.course,
                formActionText:"Inserisci",
                formAction:this.addCorso,
                formSent:this.state.formSent
            });
        }
        else{
            var course = this.props.getCorso(this.props.match.params.id)[0];
            console.log(course);
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
        //axios.get('/corso/create?codice='+this.state.course.codice+'&nome='+this.state.course.nome+'&data_inizio='+moment(this.state.course.dataInizio,'YYYY-MM-DD').format('YYYY-MM-DD'))
        axios.post('/corso',{
            //params:{
                codice: this.state.course.codice,
                nome: this.state.course.nome,
                ore: this.state.course.ore,
                data_inizio: moment(this.state.course.data_inizio,'YYYY-MM-DD').format('YYYY-MM-DD'),
                data_fine: moment(this.state.course.data_fine,'YYYY-MM-DD').format('YYYY-MM-DD'),
                ora_inizio: this.state.course.ora_inizio,
                ora_fine: this.state.course.ora_fine,
                inizio_stage: moment(this.state.course.inizio_stage,'YYYY-MM-DD').format('YYYY-MM-DD'),
                data_termine10: moment(this.state.course.data_termine10,'YYYY-MM-DD').format('YYYY-MM-DD')
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
        

        
    }

    updateCorso(event){
        event.preventDefault();
        //this.props.updateCorso({id:10,codice:4000,nome:"OSS"});

        //http://localhost:1337/user/update/123?name=joe

        var course = this.state.course;
        axios.patch('/corso/' + this.props.match.params.id,{
               codice: course.codice,
               nome:course.nome,
               ore:course.ore,
               aula:course.aula,
               data_inizio:course.data_inizio,
               data_fine:course.data_fine,
               ora_inizio:course.ora_inizio,
               ora_fine:course.ora_fine,
               inizio_stage:course.inizio_stage,
               data_termine10:course.data_termine10
            
        })
        .then(res => {
           console.log(res.data);
          
        }).catch(function (error) {
            console.log(error);
        });




    }

    reloadCourses(){
        axios.get('/corso/getCorsi')
        .then(res => {
                this.props.setCorsi(res.data);
        });
    }

    handleChange(event) {
        event.preventDefault();
        let course = this.state.course;
        let name = event.target.name;
        let value = event.target.value;
        course[name] = value;
        this.setState({course,formActionText:this.state.formActionText,formAction:this.state.formAction})
    }

    
    render(){
      

        return(
            <div>
            <Notification isVisible={this.state.formSent} type={this.state.notificationType} message={this.state.notificationMessage} />
            <form onSubmit={this.state.formAction}>

            <h1><strong>Scheda di Inserimento</strong></h1>
            <div id="margin-corsi">
            <div className="title-card-add">
                <span className="label-card-add">Nuovo Corso</span>
            </div>
            <div className="box">

                <div className="field is-horizontal margin-add">
                    <div className="field-label is-normal">
                        <label className="label">Dati del Corso</label>
                        <label className="help is-danger">Tutti i campi sono obbligatori</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                        <div className="is-expanded">
                            <div className="control field">
                                <label className="label label-add">Codice Corso</label>
                                <input value={this.state.course.codice} onChange={this.handleChange}  type="text" name="codice" className="input"  placeholder="Scrivi qui" required/>
                            </div>
                        </div>
                        </div>

                        <div className="field">
                        <div className="is-expanded">
                            <div className="control field">
                                <label className="label label-add">Nome Corso</label>
                                <input value={this.state.course.nome} onChange={this.handleChange} type="text" name="nome" className="input" placeholder="Scrivi qui" required/>
                            </div>
                        </div>
                        </div>

                        <div className="field">
                        <div className="is-expanded">
                            <div className="control field">
                                <label className="label label-add">Aula</label>
                                <input value={this.state.course.aula} type="text" name="aula" onChange={this.handleChange} className="input" placeholder="Scrivi qui" required/>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal margin-add">
                <div className="field-label is-normal">
                    <label className="label">Orari ed ore del Corso</label>
                    <label className="help is-danger">Tutti i campi sono obbligatori</label>
                </div>
                <div className="field-body">
                    <div className="field">
                    <div className="is-expanded">
                        <div className="control field">
                            <label className="label label-add">Orario Inizio Corso</label>
                            <input value={this.state.course.ora_inizio} type="text" onChange={this.handleChange} name="ora_inizio" className="input" placeholder="Scrivi qui" pattern="[0-9]+" required/>
                        </div>
                    </div>
                    </div>

                    <div className="field">
                    <div className="is-expanded">
                    <div className="control field">
                        <label className="label label-add">Orario Fine Corso</label>
                            <input value={this.state.course.ora_fine} type="text" onChange={this.handleChange} name="ora_fine" className="input" placeholder="Scrivi qui" pattern="[0-9]+" required/>
                        </div>
                    </div>
                    </div>

                    <div className="field">
                    <div className="is-expanded">
                    <div className="field">
                        <div className="control is-expanded">
                            <label className="label label-add">Ore Totali</label>
                            <input value={this.state.course.ore} type="text" name="ore" onChange={this.handleChange} min="1" className="input" placeholder="Scrivi qui" pattern="[0-9]+" required/>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
                </div>

            <div className="field is-horizontal margin-add">
                <div className="field-label is-normal">
                <label className="label">Date del Corso</label>
                    <label className="help is-danger">Tutti i campi sono obbligatori</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="is-expanded">
                            <div className="field">
                                <label className="label label-add">Data Inizio Corso</label>
                                <div className="control">
                                    {/*<Cleave value={this.state.invoice.data.toString()} options={{date: true, datePattern: ['d', 'm', 'Y']}} onChange={this.handleChange} name="data_inizio" className="input" placeholder="Scrivi"/>*/}
                                    <input value={moment(this.state.course.data_inizio,'YYYY-MM-DD').format('YYYY-MM-DD')} type="date" onChange={this.handleChange} name="data_inizio" className="input" placeholder="Scrivi qui" required/>
                                </div>
                            </div>
                        </div>
                    </div>

                <div className="field">
                <div className="is-expanded">
                    <div className="field">
                        <label className="label label-add">Data Fine Corso</label>
                        <div className="control">
                            {/*<Cleave value={this.state.invoice.data.toString()} options={{date: true, datePattern: ['d', 'm', 'Y']}} onChange={this.handleChange} name="data_fine" className="input" placeholder="Scrivi"/>*/}
                            <input value={moment(this.state.course.data_fine,'YYYY-MM-DD').format('YYYY-MM-DD')} type="date" onChange={this.handleChange} name="data_fine" className="input" placeholder="Scrivi qui" required/>
                        </div>
                    </div>
                </div>
                </div>

                <div className="field">
                    <div className="is-expanded">
                        <div className="field-body">
                            <div className="field">
                                <label className="label label-add">Inizio Stage</label>
                                <input value={moment(this.state.course.inizio_stage,'YYYY-MM-DD').format('YYYY-MM-DD')} type="date" onChange={this.handleChange} name="inizio_stage" className="input" placeholder="Scrivi qui" required/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <div className="field">
                        <div className="field-body control is-expanded">
                            <div className="field">
                                <label className="label label-add">Data Termine 10%</label>
                                <input value={moment(this.state.course.data_termine10,'YYYY-MM-DD').format('YYYY-MM-DD')} type="date" onChange={this.handleChange} name="data_termine10" className="input" placeholder="Scrivi qui" required/>
                            </div>
                        </div>
                    </div>
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
            <div className="control">
            <div className="field">
                <label className="label label-add">Aggiungi Note</label>
                    <textarea className="textarea" rows="3" placeholder="Aggiungi qui le note"></textarea>
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
                    <button type="submit" className={"button is-submit-course " + this.state.btnState}  disabled={this.state.formSent}>{this.state.formActionText}</button>
                    </nav>
                </div>
            </nav>
    </footer> 
            </form>
            </div>
        )
    }
}


export default Add;
