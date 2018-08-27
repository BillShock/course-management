import React from "react";
import { Link } from 'react-router-dom';
import Pagination from './pagination';

import { withApollo, Query } from "react-apollo";
import { Mutation } from "react-apollo";



class Table extends React.Component{
    constructor(state,props){
        super(state,props);
        this.state={actionsBtn:this.props.actionsBtn}
        console.log(this.props.showBtn.tags)
    }

    componentWillReceiveProps(nextProps){

        
        /*
        if(this.props.actionsBtn === undefined){
            console.log(nextProps);
            this.setState({
                actionsBtn: []
            });
        }
        */
       if(this.props.editBtn === undefined){
        this.setState({
            editBtn: false
        });
       }

       if(this.props.deleteBtn === undefined){
        this.setState({
            deleteBtn: false
        });
       }
    }




    render(){
       
      return(
        <Query query={this.props.paginationQuery}>

        {({ loading, error, data }) => {

        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        // Itero le intestazioni tabelle
        const throws = this.props.throws.map((item,index)=>
            <th key={index}>{item}</th>
        );
        // Itero le righe della tabella
        const rows = this.props.rows.slice(data.pagination[this.props.name].initial,data.pagination[this.props.name].final).map((row,index) =>{
            const lbl = this.props.lblRows.map((lbl,index)=>(<td key={index}>{row[lbl]}</td>));
            const tags = this.props.showBtn.tags.map((tag)=>(row[tag]));
                    
                // Crezione pulsanti azioni
                var showBtn = <Link className="button is-success" to={this.props.link + this.props.showBtn.link + "/" +  tags.join('/') }>{this.props.showBtn.lbl}</Link>
                var editBtn = this.props.editBtn == false ? false : <Link className="button is-link is-outlined" to={this.props.link + this.props.editBtn.link + "/" + row[this.props.editBtn.tag] }><span> {this.props.editBtn.lbl} </span> <span className="icon is-small"><i className="fas fa-edit"></i> </span></Link>
               // var deleteBtn =  this.props.deleteBtn == false ? false : <a className="button is-danger is-outlined" onClick={()=>this.props.deleteBtn.action(row.id)}><span>{this.props.deleteBtn.lbl}</span> <span className="icon is-small"><i className="fas fa-times"></i> </span></a>


               

                var variables = {};

                this.props.deleteBtn.tags.forEach(function(field){
                    var temp = {};
                    temp[field] = row[field];
                    variables = Object.assign(variables,temp)
                })
                  


               var deleteBtn =  this.props.deleteBtn == false ? false :
                <Mutation mutation={this.props.deleteBtn.deleteMutation}>

                
                    {(deleteFattura, { data }) => (
                    

                       
                        <a className="button is-danger is-outlined" onClick={e => {
                            e.preventDefault();
                            //deleteFattura({ variables: { numero:row.numero,anno: row.anno } });
                            deleteFattura({ variables: variables });
                            console.log(data);
                        }}><span>{this.props.deleteBtn.lbl}</span> <span className="icon is-small"><i className="fas fa-times"></i> </span>
                        </a>

                    )}


                </Mutation>

                return <tr key={index}>{lbl}{(showBtn || editBtn || deleteBtn) && <td>{showBtn} {editBtn} {deleteBtn}</td> }</tr>
        });

      

        return (
            <div>
            <table className="table is-hoverable is-fullwidth">
                 <thead>
                   <tr>{throws}</tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            <Pagination name={this.props.name} client={this.props.client} data={data} rowsLen={this.props.rows.length}/>
            </div>
        )
    }}
        </Query>
      )
    }
}



export default withApollo(Table);
