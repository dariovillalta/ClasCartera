import React from 'react';
import sql from 'mssql';

import SeleccionarTabla from '../SeleccionarTabla.js';

export default class ComportamientoPago extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarComponente: "selTablaPrestamo",
            idTablaSeleccionadaPrestamo: -1,
            idTablaSeleccionadaPlanPago: -1,
            camposPrestamos: [],
            camposPlanPago: []
        }
        this.updateTableCreditID = this.updateTableCreditID.bind(this);
        this.updateTablePayPlanID = this.updateTablePayPlanID.bind(this);
        this.returnToTableCreditID = this.returnToTableCreditID.bind(this);
        this.returnToTablePayPlanID = this.returnToTablePayPlanID.bind(this);
        this.loadFieldsFromTables = this.loadFieldsFromTables.bind(this);
        this.saveCriteriaClasification = this.saveCriteriaClasification.bind(this);
    }

    updateTableCreditID(id) {
        this.setState({
            idTablaSeleccionadaPrestamo: id,
            mostrarComponente: "selTablaPlanPago"
        });
    }

    returnToTableCreditID() {
        this.setState({
            idTablaSeleccionadaPlanPago: -1,
            mostrarComponente: "selTablaPrestamo"
        });
    }

    updateTablePayPlanID(id) {
        this.setState({
            idTablaSeleccionadaPlanPago: id,
            mostrarComponente: "crearComportamientoCredito"
        });

        this.loadFieldsFromTables();
    }

    returnToTablePayPlanID() {
        this.setState({
            mostrarComponente: "selTablaPlanPago"
        });
    }

    loadFieldsFromTables() {
        this.setState({
            camposPrestamos: [],
            camposPlanPago: []
        });
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Campos where tablaID = "+this.state.idTablaSeleccionadaPrestamo, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            camposPrestamos: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction camposPrestamos
        const transaction1 = new sql.Transaction( this.props.pool );
        transaction1.begin(err => {
            var rolledBack = false;
            transaction1.on('rollback', aborted => {
                rolledBack = true;
            });
            const request1 = new sql.Request(transaction1);
            request1.query("select * from Campos where tablaID = "+this.state.idTablaSeleccionadaPlanPago, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction1.rollback(err => {
                        });
                    }
                } else {
                    transaction1.commit(err => {
                        this.setState({
                            camposPlanPago: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction1 camposPrestamos
    }
    saveCriteriaClasification() {
        let prestamoTablaID = this.state.idTablaSeleccionadaPrestamo, planPagoTablaID = this.state.idTablaSeleccionadaPlanPago, idClientePrestamoCampoID = $("#idClientePrest").val(), numeroPrestamoCampoID = $("#numPrestamoPrest").val(), pagoCapitalPrestamoCampoID = $("#pagoCapitalPrestamoCampoID").val(), pagoImpuestosPrestamoCampoID = $("#pagoImpuestosPrestamoCampoID").val(), fechaPrestamoCampoID = $("#fechaPrestamoCampoID").val(), idClientePlanPagoCampoID = $("#idClientePlan").val(), numeroPlanPagoCampoID = $("#numPrestamoPlan").val(), pagoCapitalPlanPagoCampoID = $("#pagoCapitalPlanPagoCampoID").val(), pagoImpuestosPlanPagoCampoID = $("#pagoImpuestosPlanPagoCampoID").val(), fechaPlanPagoCampoID = $("#fechaPlanPagoCampoID").val(), comparacionEsPlanPago = "";
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ComportamientoPago (prestamoTablaID, planPagoTablaID, idClientePrestamoCampoID , numeroPrestamoCampoID, pagoCapitalPrestamoCampoID, pagoImpuestosPrestamoCampoID, fechaPrestamoCampoID, idClientePlanPagoCampoID, numeroPlanPagoCampoID, pagoCapitalPlanPagoCampoID, pagoImpuestosPlanPagoCampoID, fechaPlanPagoCampoID, comparacionEsPlanPago) values ("+prestamoTablaID+", "+planPagoTablaID+", "+idClientePrestamoCampoID+", "+numeroPrestamoCampoID+", "+pagoCapitalPrestamoCampoID+", "+pagoImpuestosPrestamoCampoID+", "+fechaPrestamoCampoID+", "+idClientePlanPagoCampoID+", "+numeroPlanPagoCampoID+", "+pagoCapitalPlanPagoCampoID+", "+pagoImpuestosPlanPagoCampoID+", "+fechaPlanPagoCampoID+", '"+comparacionEsPlanPago+"')", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("exito");
                    });
                }
            });
        }); // fin transaction camposPrestamos
    }
    render() {
        if (this.state.mostrarComponente.localeCompare("selTablaPrestamo") == 0) {
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
                                            <li className={"breadcrumb-item active"} aria-current="page">Seleccionar Tabla de Prestamos</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-lg-12"}>
                            <div className={"section-block"}>
                                <h3 className={"section-title"}>Seleccionar Tabla de Prestamos</h3>
                            </div>
                        </div>
                    </div>
                    <SeleccionarTabla pool={this.props.pool} seleccionarTabla={this.updateTableCreditID}> </SeleccionarTabla>
                </div>
            );
        } else if (this.state.mostrarComponente.localeCompare("selTablaPlanPago") == 0) {
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
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.returnToTableCreditID}><a href="#" className={"breadcrumb-link"}>Seleccionar Tabla de Prestamos</a></li>
                                            <li className={"breadcrumb-item active"} aria-current="page">Seleccionar Tabla de Plan de Pagos</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-lg-12"}>
                            <div className={"section-block"}>
                                <h3 className={"section-title"}>Seleccionar Tabla de Plan de Pagos</h3>
                            </div>
                        </div>
                    </div>
                    <SeleccionarTabla pool={this.props.pool} seleccionarTabla={this.updateTablePayPlanID}> </SeleccionarTabla>
                </div>
            );
        } else if (this.state.mostrarComponente.localeCompare("crearComportamientoCredito") == 0) {
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
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.returnToTableCreditID}><a href="#" className={"breadcrumb-link"}>Seleccionar Tabla de Prestamos</a></li>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.returnToTablePayPlanID}><a href="#" className={"breadcrumb-link"}>Seleccionar Tabla de Plan de Pagos</a></li>
                                            <li className={"breadcrumb-item active"} aria-current="page">Relacionar Campos de Comportamiento Pago</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-xl-5 col-5"}>
                            <div className={"card"}>
                                <div className={"card-body"}>

                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"campaign-info text-center"} style={{width: "100%"}}>
                                            <h3 className={"mb-1"}>Tabla de Pr&eacute;stamos</h3>
                                        </div>
                                    </div>

                                    <div className={"row border-top border-bottom"}>
                                        <div className={"campaign-info"} style={{width: "100%"}}>
                                            <h5 className={"mb-1"}>ID de Cliente</h5>
                                            <div className={"form-group"} style={{width: "100%"}}>
                                                <select id="idClientePrest" className={"form-control form-control-lg"} style={{margin: "0 auto", display: "block"}}>
                                                    <option value="">Seleccione un campo...</option>
                                                    {this.state.camposPrestamos.map((campo, i) =>
                                                        <option value={campo.ID} key={i}>{campo.nombre}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={"row border-top border-bottom"}>
                                        <div className={"campaign-info"} style={{width: "100%"}}>
                                            <h5 className={"mb-1"}>N&uacute;mero de Pr&eacute;stamo</h5>
                                            <div className={"form-group"} style={{width: "100%"}}>
                                                <select id="numPrestamoPrest" className={"form-control form-control-lg"} style={{margin: "0 auto", display: "block"}}>
                                                    <option value="">Seleccione un campo...</option>
                                                    {this.state.camposPrestamos.map((campo, i) =>
                                                        <option value={campo.ID} key={i}>{campo.nombre}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={"row border-top border-bottom"}>
                                        <div className={"campaign-info"} style={{width: "100%"}}>
                                            <h5 className={"mb-1"}>Pago de Capital</h5>
                                            <div className={"form-group"} style={{width: "100%"}}>
                                                <select id="pagoCapitalPrestamoCampoID" className={"form-control form-control-lg"} style={{margin: "0 auto", display: "block"}}>
                                                    <option value="">Seleccione un campo...</option>
                                                    {this.state.camposPrestamos.map((campo, i) =>
                                                        <option value={campo.ID} key={i}>{campo.nombre}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={"row border-top border-bottom"}>
                                        <div className={"campaign-info"} style={{width: "100%"}}>
                                            <h5 className={"mb-1"}>Pago de Int&eacute;res</h5>
                                            <div className={"form-group"} style={{width: "100%"}}>
                                                <select id="pagoImpuestosPrestamoCampoID" className={"form-control form-control-lg"} style={{margin: "0 auto", display: "block"}}>
                                                    <option value="">Seleccione un campo...</option>
                                                    {this.state.camposPrestamos.map((campo, i) =>
                                                        <option value={campo.ID} key={i}>{campo.nombre}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={"row border-top border-bottom"}>
                                        <div className={"campaign-info"} style={{width: "100%"}}>
                                            <h5 className={"mb-1"}>Fecha</h5>
                                            <div className={"form-group"} style={{width: "100%"}}>
                                                <select id="fechaPrestamoCampoID" className={"form-control form-control-lg"} style={{margin: "0 auto", display: "block"}}>
                                                    <option value="">Seleccione un campo...</option>
                                                    {this.state.camposPrestamos.map((campo, i) =>
                                                        <option value={campo.ID} key={i}>{campo.nombre}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className={"col-xl-5 col-xl-offset-2 col-5 offset-2"}>
                            <div className={"card"}>
                                <div className={"card-body"}>

                                    <div className={"row"} style={{width: "100%"}}>
                                        <div className={"campaign-info text-center"} style={{width: "100%"}}>
                                            <h3 className={"mb-1"}>Tabla de Plan de Pagos</h3>
                                        </div>
                                    </div>

                                    <div className={"row border-top border-bottom"}>
                                        <div className={"campaign-info"} style={{width: "100%"}}>
                                            <h5 className={"mb-1"}>ID de Cliente</h5>
                                            <div className={"form-group"} style={{width: "100%"}}>
                                                <select id="idClientePlan" className={"form-control form-control-lg"} style={{margin: "0 auto", display: "block"}}>
                                                    <option value="">Seleccione un campo...</option>
                                                    {this.state.camposPlanPago.map((campo, i) =>
                                                        <option value={campo.ID} key={i}>{campo.nombre}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={"row border-top border-bottom"}>
                                        <div className={"campaign-info"} style={{width: "100%"}}>
                                            <h5 className={"mb-1"}>N&uacute;mero de Pr&eacute;stamo</h5>
                                            <div className={"form-group"} style={{width: "100%"}}>
                                                <select id="numPrestamoPlan" className={"form-control form-control-lg"}>
                                                    <option value="">Seleccione un campo...</option>
                                                    {this.state.camposPlanPago.map((campo, i) =>
                                                        <option value={campo.ID} key={i}>{campo.nombre}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={"row border-top border-bottom"}>
                                        <div className={"campaign-info"} style={{width: "100%"}}>
                                            <h5 className={"mb-1"}>Pago de Capital</h5>
                                            <div className={"form-group"} style={{width: "100%"}}>
                                                <select id="pagoCapitalPlanPagoCampoID" className={"form-control form-control-lg"} style={{margin: "0 auto", display: "block"}}>
                                                    <option value="">Seleccione un campo...</option>
                                                    {this.state.camposPlanPago.map((campo, i) =>
                                                        <option value={campo.ID} key={i}>{campo.nombre}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={"row border-top border-bottom"}>
                                        <div className={"campaign-info"} style={{width: "100%"}}>
                                            <h5 className={"mb-1"}>Pago de Int&eacute;res</h5>
                                            <div className={"form-group"} style={{width: "100%"}}>
                                                <select id="pagoImpuestosPlanPagoCampoID" className={"form-control form-control-lg"} style={{margin: "0 auto", display: "block"}}>
                                                    <option value="">Seleccione un campo...</option>
                                                    {this.state.camposPlanPago.map((campo, i) =>
                                                        <option value={campo.ID} key={i}>{campo.nombre}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={"row border-top border-bottom"}>
                                        <div className={"campaign-info"} style={{width: "100%"}}>
                                            <h5 className={"mb-1"}>Fecha</h5>
                                            <div className={"form-group"} style={{width: "100%"}}>
                                                <select id="fechaPlanPagoCampoID" className={"form-control form-control-lg"} style={{margin: "0 auto", display: "block"}}>
                                                    <option value="">Seleccione un campo...</option>
                                                    {this.state.camposPlanPago.map((campo, i) =>
                                                        <option value={campo.ID} key={i}>{campo.nombre}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"text-center"}>
                        <a className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}} onClick={this.saveCriteriaClasification}>Guardar</a>
                    </div>
                    <br/>
                </div>
            );
        }
    }
}
