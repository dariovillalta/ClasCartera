import React from 'react';
import sql from 'mssql';

import SeleccionarTipoCredito from './SeleccionarTipoCredito.js';
import MostrarReglas from '../Regla/MostrarReglas.js';
import GuardarTipoCreditoCampo from './GuardarTipoCreditoCampo.js';

export default class TipoCredito extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idCreditoSeleccionado: -1,
            nombreCreditoSeleccionado: "",
            mostrarTabla: "selCredit",
            regla: {},
            campoTexto: '',
            operacion: '',
            valorTexto: ''
        }
        this.updateCreditSelectedID = this.updateCreditSelectedID.bind(this);
        this.returnSelCredit = this.returnSelCredit.bind(this);
        this.updateVarCreation = this.updateVarCreation.bind(this);
        this.returnVarCreation = this.returnVarCreation.bind(this);
    }

    updateCreditSelectedID (id, nombre) {
        this.setState({
            idCreditoSeleccionado: id,
            mostrarTabla: "selVar",
            nombreCreditoSeleccionado: nombre
        });
    }

    returnSelCredit () {
        this.setState({
            idCreditoSeleccionado: -1,
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
        if(this.state.mostrarTabla.localeCompare("selCredit") == 0) {
            return (
                <div>
                    <SeleccionarTipoCredito pool={this.props.pool} seleccionarCredito={this.updateCreditSelectedID} showConfigurationComponent={this.props.showConfigurationComponent}> </SeleccionarTipoCredito>
                </div>
            );
        } else if(this.state.mostrarTabla.localeCompare("selVar") == 0) {
            return (
                <div>
                    <MostrarReglas pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent} returnPrevComponent={this.returnSelCredit} returnPrevComponentName={"Seleccionar Tipo de Crédito"} campoTexto={this.state.campoTexto} tipoTablaRes={"TipoCredito"} idTipoTabla={this.state.idCreditoSeleccionado}> </MostrarReglas>
                </div>
            );
        }
    }
}
