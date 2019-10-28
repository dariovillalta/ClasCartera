import React from 'react';

export default class NavBar extends React.Component {
    render() {
        return (
            <div className={"dashboard-header"}>
            <nav className={"navbar navbar-expand-lg bg-white fixed-top"}>
                <a className={"navbar-brand"} href="../index.html">Inicio</a>
                <button className={"navbar-toggler"} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className={"navbar-toggler-icon"}></span>
                </button>
                <div className={"collapse navbar-collapse"} id="navbarSupportedContent">
                    <ul className={"navbar-nav ml-auto navbar-right-top"}>
                        <li className={"nav-item dropdown nav-user"}>
                            <a className={"nav-link nav-user-img"} href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <img src="./assets/filter-icons/client.png" alt="" style={{height: "50px", width: "auto"}}/> </a>
                            <div className={"dropdown-menu dropdown-menu-right nav-user-dropdown"} aria-labelledby="navbarDropdownMenuLink2">
                                <div className={"nav-user-info"}>
                                    <h5 className={"mb-0 text-white nav-user-name"}>{this.props.userName}</h5>
                                </div>
                                { this.props.permision.localeCompare("admin") == 0 ? (
                                    <a className={"dropdown-item"} href="#" onClick={this.props.showConfigurationComponent}><i className={"fas fa-user mr-2"}></i>Configuración</a>
                                ) : (
                                    <span></span>
                                )}
                                <a className={"dropdown-item"} href="#" onClick={this.props.logOff}><i className={"fas fa-power-off mr-2"}></i>Salir</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        );
    }
}
