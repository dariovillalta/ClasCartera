import React from 'react';

/*import CampoFiltro from './CampoFiltro.js';
import OperacionFiltro from './OperacionFiltro.js';
import ValorFiltro from './ValorFiltro.js';*/


export default class CrearFiltro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tablaSeleccionada: "clientes",
            colorDeTablaSeleccionada: "#8c9eff"
        }
        this.cambioClientes = this.cambioClientes.bind(this);
        this.cambioPrestamos = this.cambioPrestamos.bind(this);
        this.cambioPagos = this.cambioPagos.bind(this);
        this.cambioPlanPagos = this.cambioPlanPagos.bind(this);
    }

    cambioClientes() {
        this.setState({
            tablaSeleccionada: "clientes",
            colorDeTablaSeleccionada: "#8c9eff"
        });
    }

    cambioPrestamos() {
        this.setState({
            tablaSeleccionada: "prestamos",
            colorDeTablaSeleccionada: "#f8bbd0"
        });
    }

    cambioPagos() {
        this.setState({
            tablaSeleccionada: "pagos",
            colorDeTablaSeleccionada: "#e0f7fa"
        });
    }

    cambioPlanPagos() {
        this.setState({
            tablaSeleccionada: "planpagos",
            colorDeTablaSeleccionada: "#ffecb3"
        });
    }

    render() {
        return (
            <div style={{height: "82vh"}}>
                <div className={"row border-top border-bottom"} style={{height: "94%"}}>
                    <div className={"col-xl-4 col-4"} style={{height: "100%"}}>
                        <div className={"row"} style={{height: "25%", padding: '5%', display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#8c9eff", border: "2px solid #536dfe", cursor: "pointer"}} onClick={this.cambioClientes}>
                            <div style={{height: "100%"}}>
                                <div style={{height: "80%", margin: '0% 0% 5% 0%', display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <img src="./assets/filter-icons/client.png" alt="" style={{height: "100%", width: "100%"}}/>
                                </div>
                                <div style={{height: "20%"}}>
                                    <h3 className="product-title" style={{textAlign: "center"}}>Clientes</h3>
                                </div>
                            </div>
                        </div>
                        <div className={"row"} style={{height: "25%", padding: '5%', display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8bbd0", border: "2px solid #f50057", cursor: "pointer"}} onClick={this.cambioPrestamos}>
                            <div style={{height: "100%"}}>
                                <div style={{height: "80%", margin: '0% 0% 5% 0%', display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <img src="./assets/filter-icons/loan.png" alt="" style={{height: "100%", width: "100%"}}/>
                                </div>
                                <div style={{height: "20%"}}>
                                    <h3 className="product-title" style={{textAlign: "center"}}>Préstamos</h3>
                                </div>
                            </div>
                        </div>
                        <div className={"row"} style={{height: "25%", padding: '5%', display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#e0f7fa", border: "2px solid #4fc3f7", cursor: "pointer"}} onClick={this.cambioPagos}>
                            <div style={{height: "100%"}}>
                                <div style={{height: "80%", margin: '0% 0% 5% 0%', display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <img src="./assets/filter-icons/pay.png" alt="" style={{height: "100%", width: "100%"}}/>
                                </div>
                                <div style={{height: "20%"}}>
                                    <h3 className="product-title" style={{textAlign: "center"}}>Pagos</h3>
                                </div>
                            </div>
                        </div>
                        <div className={"row"} style={{height: "25%", padding: '5%', display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ffecb3", border: "2px solid #ffd740", cursor: "pointer"}} onClick={this.cambioPlanPagos}>
                            <div style={{height: "100%"}}>
                                <div style={{height: "80%", margin: '0% 0% 5% 0%', display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <img src="./assets/filter-icons/payplan.png" alt="" style={{height: "100%", width: "100%"}}/>
                                </div>
                                <div style={{height: "20%"}}>
                                    <h3 className="product-title" style={{textAlign: "center"}}>Plan de Pagos</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"col-xl-8 col-8"} style={{height: "100%", backgroundColor: this.state.colorDeTablaSeleccionada}}>
                        <br/>
                        
                    </div>
                </div>
                <div style={{width: "100%", height: "6%", padding: "1% 0%"}} className={"text-center"}>
                    <a onClick={this.props.callbackComponent} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Filtrar</a>
                </div>
            </div>
        );
    }
}
