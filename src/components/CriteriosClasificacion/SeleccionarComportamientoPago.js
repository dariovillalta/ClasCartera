import React from 'react';
import sql from 'mssql';

import ComportamientoPago from './ComportamientoPago.js';
import EditarComportamientoPago from './EditarComportamientoPago.js';

export default class SeleccionarComportamientoPago extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comportamientoPagos: [],
            comportamientoPagoSel: {},
            mostrarVista: "selComportamientoPago"
        }
        this.loadComportamientoPago = this.loadComportamientoPago.bind(this);
        this.loadNombreTabla = this.loadNombreTabla.bind(this);
        this.goCreateComportamientoPago = this.goCreateComportamientoPago.bind(this);
        this.returnChooseComportamientoPago = this.returnChooseComportamientoPago.bind(this);
        this.entrarEdit = this.entrarEdit.bind(this);
        this.returnEdit = this.returnEdit.bind(this);
    }

    componentDidMount() {
        this.loadComportamientoPago();
    }

    loadComportamientoPago() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ComportamientoPago", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            comportamientoPagos: result.recordset
                        });
                        for (var i = 0; i < result.recordset.length; i++) {
                            this.loadNombreTabla(i, result.recordset[i].prestamoTablaID);
                        };
                    });
                }
            });
        }); // fin transaction
    }

    loadNombreTabla(index, idTabla) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Tablas where ID = "+idTabla, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            var copiaArr = [...this.state.comportamientoPagos];
                            var copiaObj = copiaArr[index];
                            copiaObj.nombreTablaPrestamos = result.recordset[0].nombre;
                            copiaArr.splice(index, 1, copiaObj);
                            this.setState({
                                comportamientoPagos: copiaArr
                            });
                        }
                    });
                }
            });
        }); // fin transaction
    }

    goCreateComportamientoPago() {
        this.setState({
            mostrarVista: "crearComportamientoPago"
        });
    }

    returnChooseComportamientoPago() {
        this.setState({
            mostrarVista: "selComportamientoPago"
        });
        this.loadComportamientoPago();
    }

    entrarEdit(catClasN) {
        this.setState({
            comportamientoPagoSel: catClasN,
            mostrarVista: "editComportamientoPago"
        });
    }

    returnEdit() {
        this.setState({
            mostrarVista: "editComportamientoPago"
        });
    }

    render() {
        if(this.state.mostrarVista.localeCompare("crearComportamientoPago") == 0) {
            return (
                <div>
                    <ComportamientoPago pool={this.props.pool} showCriteriosClasificacion={this.props.showCriteriosClasificacion} returnChooseComportamientoPago={this.returnChooseComportamientoPago} showConfigurationComponent={this.props.showConfigurationComponent}> </ComportamientoPago>
                </div>
            );
        } else if(this.state.mostrarVista.localeCompare("editComportamientoPago") == 0) {
            return (
                <div>
                    <EditarComportamientoPago comportamientoPagoSel={this.state.comportamientoPagoSel} pool={this.props.pool} returnChooseComportamientoPago={this.returnChooseComportamientoPago} showConfigurationComponent={this.props.showConfigurationComponent}> </EditarComportamientoPago>
                </div>
            );
        } else if(this.state.mostrarVista.localeCompare("selComportamientoPago") == 0) {
            return (
                <div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"page-header"}>
                                <h2 className={"pageheader-title"}>Configuraci&oacute;n</h2>
                                <div className={"page-breadcrumb"}>
                                    <nav aria-label="breadcrumb">
                                        <ol className={"breadcrumb"}>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.props.showConfigurationComponent}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.props.showCriteriosClasificacion}><a href="#" className={"breadcrumb-link"}>Criterios de Clasificaci&oacute;n</a></li>
                                            <li className={"breadcrumb-item active"} aria-current="page">Seleccionar Comportamiento de Pago</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <button onClick={this.goCreateComportamientoPago} className={"btn btn-success btn-block col-xl-10 col-10"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold", margin: "0 auto", display: "block"}}>Crear</button>
                    </div>
                    <br/>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"card influencer-profile-data"}>
                                <div className={"card-body"}>
                                    <div className={"row border-top border-bottom addPaddingToConfig"}>
                                        {this.state.comportamientoPagos.map((comportamientoPago, i) =>
                                            <a className={"btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM"} onClick={() => this.entrarEdit(comportamientoPago)} key={comportamientoPago.ID}>{"Tabla de préstamos: "+comportamientoPago.nombreTablaPrestamos}</a>
                                        )}
                                        { this.state.comportamientoPagos.length == 0 ? (
                                            <a className={"btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"}>No existen comportamientos de pagos creados</a>
                                        ) : (
                                            <span></span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
