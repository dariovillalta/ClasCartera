import React from 'react';
import sql from 'mssql';

import SeleccionarCriterioDeterioro from './SeleccionarCriterioDeterioro.js';
import CrearCriterioDeterioro from './CrearCriterioDeterioro.js';
import EditarCriterioDeterioro from './EditarCriterioDeterioro.js';

export default class CriteriosDeterioro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idCriterioDeterioro: -1,
            nombreCriterioDeterioroSeleccionado: "",
            mostrarComponente: "selCrit",
            tiposDeCredito: [],
            estimacionesDeterioro: [],
            criterioDeterioroSel: {}
        }
        this.goCreateCriteria = this.goCreateCriteria.bind(this);
        this.goSelectCriteria = this.goSelectCriteria.bind(this);
        this.goEditCriteria = this.goEditCriteria.bind(this);
        this.loadTypeCredit = this.loadTypeCredit.bind(this);
        this.createCreditTypeSonsArray = this.createCreditTypeSonsArray.bind(this);
        this.insertCriterioDet = this.insertCriterioDet.bind(this);
    }

    componentDidMount() {
        this.loadTypeCredit();
    }

    loadTypeCredit() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from TipoCredito where tipoCreditoPadreID != -1", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            tiposDeCredito: result.recordset
                        });
                        this.createCreditTypeSonsArray();
                    });
                }
            });
        }); // fin transaction
    }

    createCreditTypeSonsArray() {
        var arregloTemp = [];
        for (var i = 0; i < this.state.tiposDeCredito.length; i++) {
            this.insertCriterioDet(this.state.tiposDeCredito[i].ID, i, arregloTemp);
        };
    }

    insertCriterioDet(creditoID, index, array) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from CriterioDeterioro where tipoDeCredito = "+creditoID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(array[index] == undefined) {
                            array[index] = [];
                        }
                        array[index] = $.merge(array[index], result.recordset);
                        this.setState({
                            estimacionesDeterioro: array
                        });
                    });
                }
            });
        }); // fin transaction
    }

    goCreateCriteria () {
        this.setState({
            mostrarComponente: "crearCrit"
        });
    }

    goSelectCriteria () {
        this.loadTypeCredit();
        this.setState({
            idCriterioDeterioro: -1,
            nombreCriterioDeterioroSeleccionado: "",
            mostrarComponente: "selCrit",
            criterioDeterioroSel: {}
        });
    }

    goEditCriteria (id, nombre, objeto) {
        this.setState({
            idCriterioDeterioro: id,
            nombreCriterioDeterioroSeleccionado: nombre,
            mostrarComponente: "editCrit",
            criterioDeterioroSel: objeto
        });
    }

    render() {
        if(this.state.mostrarComponente.localeCompare("crearCrit") == 0) {
            return (
                <div>
                    <CrearCriterioDeterioro pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent} returnSelCrit={this.goSelectCriteria} tiposDeCredito={this.state.tiposDeCredito}> </CrearCriterioDeterioro>
                </div>
            );
        } else if(this.state.mostrarComponente.localeCompare("selCrit") == 0) {
            return (
                <div>
                    <SeleccionarCriterioDeterioro pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent} seleccionarCriterio={this.goEditCriteria} goCrearCredito={this.goCreateCriteria} tiposDeCredito={this.state.tiposDeCredito} estimacionesDeterioro={this.state.estimacionesDeterioro}> </SeleccionarCriterioDeterioro>
                </div>
            );
        } else if(this.state.mostrarComponente.localeCompare("editCrit") == 0) {
            return (
                <div>
                    <EditarCriterioDeterioro criterioDeterioro={this.state.criterioDeterioroSel} pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent} returnSelCrit={this.goSelectCriteria} tiposDeCredito={this.state.tiposDeCredito}> </EditarCriterioDeterioro>
                </div>
            );
        }
    }
}
