import React from 'react';
import sql from 'mssql';

import SeleccionarCriterioDeterioro from './SeleccionarCriterioDeterioro.js';
import MostrarReglas from '../Regla/MostrarReglas.js';
import GuardarTipoCreditoCampo from './GuardarTipoCreditoCampo.js';

export default class CriteriosDeterioro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idCriterioDeterioro: -1,
            nombreCriterioDeterioroSeleccionado: "",
            mostrarComponente: "selCrit",
            regla: {},
            campoTexto: '',
            operacion: '',
            valorTexto: ''
        }
        this.updateDeterCriteriaID = this.updateDeterCriteriaID.bind(this);
        this.returnSelCredit = this.returnSelCredit.bind(this);
        this.updateVarCreation = this.updateVarCreation.bind(this);
        this.returnVarCreation = this.returnVarCreation.bind(this);
    }

    updateDeterCriteriaID (id, nombre) {
        this.setState({
            idCriterioDeterioro: id,
            mostrarComponente: "selVar",
            nombreCriterioDeterioroSeleccionado: nombre
        });
    }

    returnSelDeterCriteria () {
        this.setState({
            idCriterioDeterioro: -1,
            mostrarTabla: "selCrit",
            nombreCriterioDeterioroSeleccionado: ""
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
        if(this.state.mostrarComponente.localeCompare("selCrit") == 0) {
            return (
                <div>
                    <SeleccionarCriterioDeterioro pool={this.props.pool} seleccionarCriterio={this.updateDeterCriteriaID} showConfigurationComponent={this.props.showConfigurationComponent}> </SeleccionarCriterioDeterioro>
                </div>
            );
        } else if(this.state.mostrarComponente.localeCompare("selVar") == 0) {
            return (
                <div>
                    <MostrarReglas pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent} returnPrevComponent={this.returnSelDeterCriteria} returnPrevComponentName={"Seleccionar Criterio de Deterioro"} campoTexto={this.state.campoTexto} tipoTablaRes={"CriterioDeterioro"} idTipoTabla={this.state.idCriterioDeterioro}> </MostrarReglas>
                </div>
            );
        }
    }
}
