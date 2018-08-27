
import React from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Corso from './corso.jsx';
import Add from './add.jsx';
import Show from './show.jsx';


class CorsoRouter extends React.Component{
    render(){
        return(
                <Switch>
                    <Route path={this.props.path} component={Corso} exact={true} />
                    <Route path={this.props.path+"/add"} component={Add} />
                    <Route path={this.props.path+"/edit/:id"} component={Add}/>
                    <Route path={this.props.path+"/show/:id"} component={Show} />
                </Switch>

        )
    }
}

export default CorsoRouter;