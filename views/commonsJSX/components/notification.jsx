import React from "react";
import ReactDOM from 'react-dom';

export default class Notification extends React.Component{
    constructor(props,state){
        super(props,state);
    }

    render(){

        if(!this.props.isVisible){
            return null;
        }
        return(
            <div className={"notification "+this.props.type}>
                   <button className="delete"></button>
                   {this.props.message}
            </div>
        );
    }
}