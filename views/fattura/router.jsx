
import React from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Fattura from './fattura';
import Add from './add';
import Show from './show';


export default class FatturaRouter extends React.Component{
    render(){
        return(
                <Switch>
                    <Route path={this.props.path} component={Fattura} exact={true} />
                    <Route path={this.props.path+"/add"} component={Add} />
                    <Route path={this.props.path+"/edit/:id"} component={Add}/>
                    <Route path={this.props.path+"/show/:anno/:numero"} component={Show} />
                </Switch>

        )
    }
}