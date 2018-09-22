import React from "react";
import { withApollo, Query } from "react-apollo";
import gql from "graphql-tag";



class Pagination extends React.Component{
    constructor(state,props){
        super(state,props);
        this.setPage = this.setPage.bind(this);
        this.pageClick = this.pageClick.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }
    
    componentDidUpdate(prevProps){
        if(this.props.rowsLen != prevProps.rowsLen){
            var pagination = Object.assign({},this.props.data.pagination);

            //Aggiorno i valori locali di Apollo client
            pagination[this.props.name] = {
               initial:0,
               final:10,
               perPage:pagination[this.props.name].perPage,
               current:1,
               __typename:pagination[this.props.name].__typename
            };

            this.props.client.writeData({
                data:{
                    pagination: pagination
                }
            });
        }

    }

    prevPage(){
        if((this.props.data.pagination[this.props.name].current-1) > 0){
            this.setPage(this.props.data.pagination[this.props.name].current-1)
        }
    }

    nextPage(){
        const numPages = Math.ceil(this.props.rowsLen/(this.props.data.pagination[this.props.name].perPage))
        if((this.props.data.pagination[this.props.name].current+1) <= numPages){
            this.setPage(this.props.data.pagination[this.props.name].current+1)
        }
    }

    
    pageClick(event){
         var num = parseInt(event.target.innerText);
         this.setPage(num);
    }

    setPage(num){
       
        //this.setState({current:num})
         // Ottengo il valore dell'elemento corrente
        var p = Object.assign({},this.props.data.pagination);
        
        //Aggiorno i valori locali di Apollo client
        p[this.props.name] = {
           initial:p[this.props.name].perPage*(num-1),
           final:p[this.props.name].perPage*num,
           perPage:p[this.props.name].perPage,
           current:num,
           __typename:p[this.props.name].__typename
        };

        // Salvo i valori locali
        this.props.client.writeData({
            data:{
                pagination:p
            }
        });
    }

    render(){
        //const pagination = ([...Array(Math.ceil(this.props.rowsLen/(this.props.data.pagination[this.props.name].perPage*30)))]).map((_,i) =>
        var pagesNum = Math.ceil(this.props.rowsLen/(this.props.data.pagination[this.props.name].perPage))
        var pages = (Array.from(Array(pagesNum).keys()))
        var ellipsis = null; var lastBtn = null;

        if(pagesNum > 10){
            pages = Array.from([0,1,2],x => x + parseInt(this.props.data.pagination[this.props.name].current-1))
            ellipsis = <li><span className="pagination-ellipsis">&hellip;</span></li>;
        }

        const pagination = pages.map((i) => {
            if(i>1 && i<pagesNum) return <li key={i}> <a className={ this.props.data.pagination[this.props.name].current==i ? "pagination-link is-current" : "pagination-link"} onClick={this.pageClick}>{i}</a> </li>
        });

        if(pagesNum>1)
            lastBtn = <li><a className={ this.props.data.pagination[this.props.name].current==pagesNum ? "pagination-link is-current" : "pagination-link"} onClick={this.pageClick}>{pagesNum}</a></li>

        

        return(
     
            <div>
                <nav className="pagination is-centered" role="navigation" aria-label="pagination">   
                <a className="pagination-previous" onClick={this.prevPage}>Indietro</a>
                <a className="pagination-next" onClick={this.nextPage}>Avanti</a>
                    <ul className="pagination-list">
                    <li><a className={ this.props.data.pagination[this.props.name].current==1 ? "pagination-link is-current" : "pagination-link"} onClick={this.pageClick}>1</a></li>
                    {ellipsis}
                    {pagination}
                    {ellipsis}
                    {lastBtn}
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Pagination;

