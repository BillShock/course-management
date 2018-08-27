import React from "react";
import { Mutation } from "react-apollo";
import { GET_CORSO,DELETE_ISCRIZIONE } from "../../corso/queries";
import { Link } from 'react-router-dom';


class AvatarList extends React.Component{
    constructor(state,props){
        super(state,props);
        this.state={actionsBtn:this.props.actionsBtn,indexElement:0}
        //this.setPage = this.setPage.bind(this);
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

    setPage(event){
       // var num = event.target.innerText; // Ottengo il valore dell'elemento corrente
        //var pagination = {initial:this.props.perPage*(num-1),final:this.props.perPage*num,perPage:this.props.perPage};
        //this.props.setPage(pagination);
    }

    render(){

       const rows = this.props.rows.iscrizione.map((row,index) =>
            <li key={index}>
                <div className="columns is-vcentered">
                    <div className="avatar"><div className="letter">{row.privato.nome[0]}</div></div>
               
                    <div className="column">
                        <div className="name">
                            <div>{row.privato.nome} {row.privato.cognome}</div> 
                            <div>{row.privato.cf}</div>
                        </div>
                    </div>

                    <div className="column"> 
                        <div>Prezzo</div> 
                        <div>{row.prezzo}</div>
                    </div>

                    <div className="column"> 
                        <div>Azione</div> 
                        <div>
                            <Link to={"/privato/show/" + row.privato.id} className="button is-success is-outlined"> <span className="icon is-small"> <i className="fas fa-eye"></i> </span> </Link>
                            <Mutation mutation={DELETE_ISCRIZIONE}
                            
                            update={(store) => {
                                const corsi = store.readQuery({query: GET_CORSO,variables:{id:this.props.rows.id.toString()}});
                                console.log(corsi)
                                corsi.corso.iscrizione.splice(this.state.indexElement,1);
                                console.log(corsi)

                                store.writeQuery({
                                    query:GET_CORSO,
                                    data:{corso:corsi.corso}
                                })
                            }}

                            >
                            {deleteIscrizione => (
                                <a className="button is-danger is-outlined" onClick={(e)=>{this.setState({indexElement:index});deleteIscrizione({variables:{idcliente:this.props.rows.iscrizione[this.state.indexElement].privato.id,idcorso:this.props.rows.id}})}}> <span className="icon is-small"><i className="fas fa-times"></i> </span></a>
                            )}
                            </Mutation>
                        </div>
                    </div>
                </div>

            </li>
       );

        // Itero i numeri della pagination
/*        const pagination = ([...Array(Math.ceil(this.props.rows.length/this.props.perPage))]).map((x,i) =>
           <li key={i}> <a className="pagination-link" onClick={this.setPage}>{i+1}</a> </li>
        );
*/



        return (
            <div className="avatar-list">
                <ul className="list-avatar">
                    {rows}  
                </ul>
            
           

            <div>
                <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                    <ul className="pagination-list">
                        {
                            //pagination
                        }
                    </ul>
                </nav>
            </div>
            </div>
        )
    }
}

export default AvatarList;
