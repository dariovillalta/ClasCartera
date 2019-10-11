import React from 'react';
import sql from 'mssql';

import SeleccionarCriterioDeterioro from './SeleccionarCriterioDeterioro.js';
import CrearCriterioDeterioro from './CrearCriterioDeterioro.js';
//import EditarCriterioDeterioro from './EditarCriterioDeterioro.js';

export default class CriteriosDeterioro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idCriterioDeterioro: -1,
            nombreCriterioDeterioroSeleccionado: "",
            mostrarComponente: "selCrit",
            estimacionesDeterioro: []
        }
        this.goCreateCriteria = this.goCreateCriteria.bind(this);
        this.goSelectCriteria = this.goSelectCriteria.bind(this);
        this.goEditCriteria = this.goEditCriteria.bind(this);
        this.loadCriterioDet = this.loadCriterioDet.bind(this);
    }

    componentDidMount() {
        this.loadCriterioDet();
    }

    loadCriterioDet() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from CriterioDeterioro", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            estimacionesDeterioro: result.recordset
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
        this.loadCriterioDet();
        this.setState({
            idCriterioDeterioro: -1,
            nombreCriterioDeterioroSeleccionado: "",
            mostrarComponente: "selCrit"
        });
    }

    goEditCriteria (id, nombre) {
        this.setState({
            idCriterioDeterioro: id,
            nombreCriterioDeterioroSeleccionado: nombre,
            mostrarComponente: "editCrit"
        });
    }

    render() {
        if(this.state.mostrarComponente.localeCompare("crearCrit") == 0) {
            return (
                <div>
                    <CrearCriterioDeterioro pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent} returnSelCrit={this.goSelectCriteria}> </CrearCriterioDeterioro>
                </div>
            );
        } else if(this.state.mostrarComponente.localeCompare("selCrit") == 0) {
            return (
                <div>
                    <SeleccionarCriterioDeterioro pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent} seleccionarCriterio={this.goEditCriteria} goCrearCredito={this.goCreateCriteria} estimacionesDeterioro={this.state.estimacionesDeterioro}> </SeleccionarCriterioDeterioro>
                </div>
            );
        } else if(this.state.mostrarComponente.localeCompare("editCrit") == 0) {
            return (
                <div>
                    <CrearCriterioDeterioro pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent} returnSelCrit={this.goSelectCriteria}> </CrearCriterioDeterioro>
                </div>
            );
        }
    }
}
