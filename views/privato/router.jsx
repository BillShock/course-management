
import React from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Privato from './privato.jsx';
import Add from './add.jsx';
import Show from './show';
//import Show from './show.jsx';


class PrivatoRouter extends React.Component{
    render(){
        return(
                <Switch>
                    <Route path={this.props.path} component={Privato} exact={true} />
                    <Route path={this.props.path+"/add"} component={Add} exact={true} />
                    <Route path={this.props.path+"/show/:id"} component={Show} exact={true} />
                </Switch>

        )
    }
}

export default PrivatoRouter;