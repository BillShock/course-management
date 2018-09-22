import React from 'react';
import { Link } from 'react-router-dom';


class MainLayout extends React.Component{
    render(){
        return(

<div id="app"> {/* START DIV ROOT*/}

{/* START DIV COLUMNS*/}
    <div className="columns is-gapless">
    {/* START MENU - FIRST COLUMN IS-2*/}
        <aside className="column is-2 is-desktop is-fullheight section menu" id="menu">
            {/* START DIV LOGO*/}
            <div id="containerMyLogo">
                <div id="myLogo">
                    <h1>Course Management</h1>
                </div>
            </div>
            {/* END DIV LOGO*/}

            {/* START DIV DATA USER*/}
            <div id="data_user">
                <div id="welcome">
                    Benvenuto $Utente
                </div>
                <div id="photo">
                <img src="https://bulma.io/images/placeholders/96x96.png" id="img_user"/>
                </div>
                <div id="link_user">
                    <a><i className="fab fa-facebook-square fa-2x"></i></a>
                    <a><i className="fab fa-twitter fa-2x" id="link2"></i></a>
                    <a><i className="fas fa-envelope fa-2x" id="link3"></i></a>
                    <a><i className="fas fa-sign-out-alt fa-2x" id="link4"></i></a>
                </div>
            </div>
            {/* END DIV DATA USER*/}

            {/* START DIV SIDEBAR*/}
            <div id="sidebar">
                <div className="menu-label" id="sidebar-label"><i className="fas fa-chevron-circle-right"></i><span className="labels-category">GENERAL</span><hr className="navbar-divider" id="divider" /></div>
                    <ul className="menu-list">
                        <li><Link to="/"><i className="fas fa-home" title="Home"></i><span className="labels">Home</span></Link></li>
                        <li><Link to="/corso"><i className="fas fa-link"></i><span className="labels">Corso</span></Link></li>
                        <li><Link to="/fattura"><i className="fas fa-link"></i><span className="labels">Fatture</span></Link></li>
                        <li><Link to="/privato"><i className="fas fa-link"></i><span className="labels">Privato</span></Link></li> 
                        <li><Link to="/societa"><i className="fas fa-link"></i><span className="labels">Societa</span></Link></li> 

                    </ul>
                <div className="menu-label" id="sidebar-label"><i className="fas fa-chevron-circle-right"></i><span className="labels-category">ADMINISTRATION</span><hr className="navbar-divider" id="divider" /></div>
                    <ul className="menu-list">
                        <li><Link to="/"><i className="fas fa-table"></i><span className="labels">Visualizza corsi</span></Link></li>
                        <li><Link to="/corso"><i className="fas fa-wrench"></i><span className="labels">Gestisci corsi</span></Link></li>
                        <li><Link to="/event"><i className="far fa-calendar-alt"></i><span className="labels">Calendario</span></Link></li>
                    </ul>
                <div className="menu-label" id="sidebar-label"><i className="fas fa-chevron-circle-right"></i><span className="labels-category">SETTINGS</span><hr className="navbar-divider" id="divider" /></div>
                    <ul className="menu-list">
                        <li><Link to="/"><i className="fas fa-cogs"></i><span className="labels">Impostazioni account</span></Link></li>
                        <li id="last-li"><Link to="/"><i className="fas fa-sign-out-alt"></i><span className="labels">Effettua logout</span></Link></li>
                    </ul>
            </div>
                {/* END DIV SIDEBAR*/}
        </aside> 
        {/* END MENU - FIRST COLUMN IS-2*/}

        {/* START SECOND COLUMN AUTO-RESIZE*/} 
            <div className="column is-desktop" id="main">
                {/* START NAVBAR*/}
                <nav className="navbar has-shadow  is-desktop" id="topbar">
                    <nav className="navbar-menu">
                        {/* START NAVBAR - LEFT*/}     
                        <div className="navbar-start">
                            <nav className="navbar-item" id="topbar-item">
                                <div className="containerSearch">
                                    <input type="search" id="search" placeholder="Cerca..." />
                                    <button className="icon"><i className="fa fa-search"></i></button>
                                </div>
                            </nav>
                        </div>
                        {/* END NAVBAR - LEFT*/}
                    
                        {/* START NAVBAR - RIGHT*/}
                        <nav className="navbar-end">
                          <div className="dropdown">
                            <div className="dropdown is-hoverable">
                              <a className="navbar-item" id="topbar-item"><i className="fas fa-user-circle fa-2x"></i></a>
                                  <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                                    <div className="dropdown-content" id="dropdownUser">
                                      <a href="#" className="dropdown-item" id="item1">
                                        <i className="fas fa-user fa" id="dropdownIcon"></i><span className="dropdownLabel">Profilo</span>
                                      </a>
                                      <a href="#" className="dropdown-item">
                                        <i className="fas fa-envelope" id="dropdownIcon"></i><span className="dropdownLabel">Inbox</span>
                                      </a>
                                      <a href="#" className="dropdown-item">
                                        <i className="fas fa-cogs" id="dropdownIcon"></i><span className="dropdownLabel">Impostazioni</span>
                                      </a>
                                      <hr className="dropdown-divider" />
                                      <a href="#" className="dropdown-item">
                                        <i className="fas fa-lock" id="dropdownIcon"></i><span className="dropdownLabel">Lock</span>
                                      </a>
                                      <a href="#" className="dropdown-item">
                                        <i className="fas fa-sign-out-alt" id="dropdownIcon"></i><span className="dropdownLabel">Logout</span>
                                      </a>
                                  </div>
                                </div>
                            </div>
                        </div>
                            
                            <div className="dropdown is-hoverable">
                                <a className="navbar-item" id="topbar-item"><i className="fas fa-bell"></i></a>
                                    <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                                        <div className="dropdown-content" id="dropdownUser">
                                            <div className="dropdown-item">
                                                <i className="far fa-dot-circle" id="dropdownIcon"></i><span className="dropdownLabel">Notification here</span>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <a className="navbar-item" id="topbar-item">PROVA</a>
                            <a className="navbar-item" id="topbar-item"><i className="fas fa-bars"></i></a>
                        </nav>
                        {/* END NAVBAR - RIGHT*/}
                    </nav>
                </nav>
                {/* END NAVBAR*/}

                {/* START DIV HERO*/}
                <div className="hero">
                    <div className="hero-body">
                        {/* START BREADCRUMB*/}
                        <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs" id="breadcrumb">
                            <ul>
                                <li><Link to="/">
                                <span className="icon is-small" id="breadcrumb-icon"><i className="fas fa-home" aria-hidden="true"></i></span>
                                    <span>Home</span></Link></li>
                                <li className="is-active"><a href="#" aria-current="page">Gestione Corsi</a></li> 
                            </ul>
                        </nav>
                        {/* END BREADCRUMB*/}

                        {/* START DIV MAIN*/}
                        <div className="is-fullheight" id="render"> 
                            <div className="container is-fluid">           
                                <main>
                                    {this.props.children}
                                </main>
                            </div>
                        </div>
                        {/* END DIV MAIN*/}
                    </div>
                </div> 
                {/* END DIV HERO*/}
            </div>
            {/* END SECOND COLUMN AUTO-RESIZE*/}
        </div>
        {/* END DIV COLUMNS*/}

    {/* START FOOTER*/}
    <footer className="footer" id="myFooter">
        <nav className="navbar" id="navFooter">
            <nav className="navbar-menu">
                <div className="navbar-start">
                    <nav className="navbar-item" id="footer-item">
                        <i className="fas fa-copyright"></i>  2018 - WEBAPP. All rights reserved
                    </nav>
                </div>

                <div className="navbar-end">
                    <nav className="navbar-item" id="footer-item">
                    <ol>
                        <Link to="/">Documentation </Link> <span className="separatorFooter"> | </span> <Link to="/"> FAQ </Link> <span className="separatorFooter"> | </span> <Link to="/"> Altro </Link>
                    </ol>
                    </nav>
                </div>
            </nav>
        </nav>
    </footer>
    {/* END FOOTER*/}

{/* END DIV ROOT*/}</div> 
        )
    }
}

export default MainLayout;
