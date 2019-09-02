import React from 'react';
import sql from 'mssql';

import SeleccionarTabla from '../SeleccionarTabla.js';
import SeleccionarTipoCredito from './SeleccionarTipoCredito.js';
import SeleccionarRegla from '../Regla/SeleccionarRegla.js';
import GuardarTipoCreditoCampo from './GuardarTipoCreditoCampo.js';

export default class TipoCredito extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idTablaSeleccionada: -1,
            nombreTablaSeleccionada: "",
            idCreditoSeleccionado: -1,
            nombreCreditoSeleccionado: "",
            mostrarTabla: "selTable",
            regla: {},
            campoTexto: '',
            operacion: '',
            valorTexto: ''
        }
        this.updateTableSelectedID = this.updateTableSelectedID.bind(this);
        this.updateCreditSelectedID = this.updateCreditSelectedID.bind(this);
        this.returnChooseTable = this.returnChooseTable.bind(this);
        this.returnSelCredit = this.returnSelCredit.bind(this);
        this.updateVarCreation = this.updateVarCreation.bind(this);
        this.returnVarCreation = this.returnVarCreation.bind(this);
    }

    updateTableSelectedID (id, nombre) {
        this.setState({
            idTablaSeleccionada: id,
            mostrarTabla: "selCredit",
            nombreTablaSeleccionada: nombre
        });
    }

    updateCreditSelectedID (id, nombre) {
        this.setState({
            idCreditoSeleccionado: id,
            mostrarTabla: "selVar",
            nombreCreditoSeleccionado: nombre
        });
    }

    returnChooseTable () {
        this.setState({
            idTablaSeleccionada: this.state.idTablaSeleccionada,
            mostrarTabla: "selTable"
        });
    }

    returnSelCredit () {
        this.setState({
            idCreditoSeleccionado: this.state.idCreditoSeleccionado,
            mostrarTabla: "selCredit"
        });
    }

    updateVarCreation(reglaID, campoTexto, operacion, valorTexto) {
        this.setState({
            regla: {ID: reglaID, campo: campoTexto, operacion: operacion, valor: valorTexto},
            mostrarTabla: "saveTypeCreditField",
            campoTexto: campoTexto,
            operacion: operacion,
            valorTexto: valorTexto
        });
    };

    returnVarCreation() {
        this.setState({
            regla: {},
            mostrarTabla: "selVar"
        });
    };

    render() {
        if(this.state.mostrarTabla.localeCompare("selTable") == 0) {
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
                                            <li className={"breadcrumb-item active"} aria-current="page">Seleccionar Tabla</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SeleccionarTabla pool={this.props.pool} seleccionarTabla={this.updateTableSelectedID}> </SeleccionarTabla>
                </div>
            );
        } else if(this.state.mostrarTabla.localeCompare("selCredit") == 0) {
            return (
                <div>
                    <SeleccionarTipoCredito pool={this.props.pool} seleccionarCredito={this.updateCreditSelectedID} showConfigurationComponent={this.props.showConfigurationComponent} retornoTablas={this.returnChooseTable} tablaID={this.state.idTablaSeleccionada}> </SeleccionarTipoCredito>
                </div>
            );
        } else if(this.state.mostrarTabla.localeCompare("selVar") == 0) {
            return (
                <div>
                    <SeleccionarRegla pool={this.props.pool} tablaID={this.state.idTablaSeleccionada} showConfigurationComponent={this.props.showConfigurationComponent} retornoTablas={this.returnChooseTable} returnSelCredit={this.returnSelCredit} seleccionar={this.updateVarCreation} campoTexto={this.state.campoTexto}> </SeleccionarRegla>
                </div>
            );
        } else {
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
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.props.returnChooseTable}><a href="#" className={"breadcrumb-link"}>Seleccionar Tabla</a></li>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.returnSelCredit}><a href="#" className={"breadcrumb-link"}>Seleccionar Tipo de Cr&eacute;dito</a></li>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.returnSelCredit}><a href="#" className={"breadcrumb-link"}>Seleccionar Variables</a></li>
                                            <li className={"breadcrumb-item active"} aria-current="page">Creaci&oacute;n de Campor de Tipo de Cr&eacute;dito</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <GuardarTipoCreditoCampo pool={this.props.pool} pool={this.props.pool} tabla={this.state.nombreTablaSeleccionada} tipoCredito={this.state.nombreCreditoSeleccionado} campo={this.state.campoTexto} operacion={this.state.operacion} valor={this.state.valorTexto} tablaID={this.state.idTablaSeleccionada} creditoID={this.state.idCreditoSeleccionado} reglaID={this.state.regla.ID}> </GuardarTipoCreditoCampo>
                </div>
            );
        }
    }
}
