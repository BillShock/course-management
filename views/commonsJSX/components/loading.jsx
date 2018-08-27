import React from "react";

class Loading extends React.Component{
    
    render(){
        return (
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        )
    }
}

export default Loading;