import React from "react";
import AddRata from "./addRata";
import ShowRate from "./showRate";

class ModalRate extends React.Component{

    constructor(props,state){
        super(props,state);
        this.state = {isActive: this.props.isActive,totale:0,addState:false};
        this.changeAddState = this.changeAddState.bind(this);
    }

    changeAddState(e,val){
        e.preventDefault();
        this.setState({
            addState:val
        })
    }
    render(){
        return(
            <div className={"modal " + this.props.isActive}>
                <div className="modal-background"></div>
               
                        {
                            this.state.addState ? (
                                <AddRata idPrivato={this.props.idPrivato} codIscrizione={this.props.iscrizione.codice} changeAddState={this.changeAddState} closeModal={this.props.closeModal}/>
                            ) : (
                                <ShowRate idPrivato={this.props.idPrivato} isActive={this.state.isActive} changeAddState={this.changeAddState} iscrizione={this.props.iscrizione} closeModal={this.props.closeModal}/>
                            )
                        }
                        
            </div>
            
        )
    }
}

export default ModalRate;