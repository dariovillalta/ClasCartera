import React from 'react';

export default class LeftBar extends React.Component {
    render() {
        return (
            <div>
                <div className={"nav-left-sidebar sidebar-dark"}>
                    <div className={"menu-list"}>
                        <nav className={"navbar navbar-expand-lg navbar-light"}>
                            <a className={"d-xl-none d-lg-none"} href="#">Dashboard</a>
                            <button className={"navbar-toggler"} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className={"navbar-toggler-icon"}></span>
                            </button>
                            <div className={"collapse navbar-collapse"} id="navbarNav">
                                <ul className={"navbar-nav flex-column"}>
                                    <li className={"nav-divider"}>
                                        <h3 style={{color: "#b0bec5"}}>Menu</h3>
                                    </li>
                                    <li className={"nav-item "}>
                                        <a className={"nav-link"} onClick={this.props.showHome} href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Inicio</h3></a>
                                    </li>
                                    <li className={"nav-item "}>
                                        <a className={"nav-link"} onClick={this.props.showCreditClasificationProcess} href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Clasificar Cart&eacute;ra</h3></a>
                                    </li>
                                    <li className={"nav-item "}>
                                        <a className={"nav-link"} onClick={this.props.showChooseReports} href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Reporter&iacute;a</h3></a>
                                    </li>
                                    <li className={"nav-item "}>
                                        <a className={"nav-link"} onClick={this.props.showGraphics} href="#"><i className={"fa fa-fw fa-user-circle"}></i><h3 style={{color: "white"}}>Gr&aacute;ficos</h3></a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}
