import React from "react";
import { Link } from 'react-router-dom';
import Table from '../commonsJSX/components/table';
import Loading from '../commonsJSX/components/loading';

import { Query, withApollo } from "react-apollo";
import {GET_FATTURA,DELETE_FATTURA,GET_PAGINATION} from './queries';


import 'babel-polyfill';

class Fattura extends React.Component{
    constructor(props,state){
        super(props,state);
        this.state = ({
            numero:"",
            anno:"",
        })

        this.fatturaFilter = this.fatturaFilter.bind(this);
    }

    fatturaFilter(data){
        if(this.state.numero=="" && this.state.anno=="")
            return data;
        return data.filter((fattura)=>{return fattura.numero==this.state.numero && fattura.anno == this.state.anno})
    }

 

    render(){

      
        return(

            

            <Query query={GET_FATTURA} pollInterval={5000}>

            {({loading,error,data}) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                
                
                return(
                    
                    <div>
                    <div>
                        <nav className="level">
                        <div className="level-left">
                            <div className="level-item">
                            <p className="subtitle is-5">
                                <strong></strong> Cerca Fattura :
                            </p>
                            </div>
                            <div className="level-item">
                            <div className="field has-addons">
                                    <p className="control">
                                        <input className="input" name="numero" type="text" onChange={(e)=>{this.setState({numero:e.target.value})}} value={this.state.numero} placeholder="Numero"/>
                                    </p>

                                    <p className="control">
                                        <input className="input" name="anno" type="text" onChange={(e)=>{this.setState({anno:e.target.value})}} value={this.state.anno} placeholder="Anno"/>
                                    </p>

                                
                                    
                                </div>
                            </div>
                        </div>

                            <div className="level-right">
                               
                                <p className="level-item"><Link className="button is-success" to={"/fattura/add"}>Nuova Fattura</Link></p>
                            </div>
                        </nav>
                    </div>

                    <div>
                        <Table name="fatture" paginationQuery={GET_PAGINATION} link="/fattura" throws={["Numero","Anno","Data","Importo","Totale",""]} showBtn={{lbl:"Show",tags:["anno","numero"],link:"/show"}} editBtn={{lbl:"Edit",tag:"id",link:"/edit"}} deleteBtn={{lbl:"Delete",tags:["numero","anno"],action:this.deleteCorso,deleteMutation:DELETE_FATTURA}}  lblRows={['numero','anno','data','importo','totale']} rows={this.fatturaFilter(data.fattura)}  />
                    </div>
                    </div>
                )
            
            }}
            </Query>
        );
    }
}


export default withApollo(Fattura);
