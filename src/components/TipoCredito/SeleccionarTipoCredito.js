import React from 'react';
import sql from 'mssql';

import CrearTipoCredito from './CrearTipoCredito.js';
import Accordion from '../Accordion/Accordion.js';

export default class SeleccionarTipoCredito extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipoCreditos: [],
            tipoCreditosHijos: [],
            mostrarCreacionTipoCredito: false
        }
        this.loadTypeCredit = this.loadTypeCredit.bind(this);
        this.goCreateTypeCredit = this.goCreateTypeCredit.bind(this);
        this.returnChooseTypeCredit = this.returnChooseTypeCredit.bind(this);
        this.createCreditTypeSonsArray = this.createCreditTypeSonsArray.bind(this);
        this.insertCreditTypeSon = this.insertCreditTypeSon.bind(this);
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
            request.query("select * from TipoCredito where tipoCreditoPadreID = -1", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            tipoCreditos: result.recordset
                        });
                        this.createCreditTypeSonsArray();
                    });
                }
            });
        }); // fin transaction
    }

    createCreditTypeSonsArray() {
        var arregloTemp = [];
        for (var i = 0; i < this.state.tipoCreditos.length; i++) {
            this.insertCreditTypeSon(this.state.tipoCreditos[i].ID, i, arregloTemp);
        };
    }

    insertCreditTypeSon(creditoID, index, array) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from TipoCredito where tipoCreditoPadreID = "+creditoID, (err, result) => {
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
                            tipoCreditosHijos: array
                        });
                        console.log('array');
                        console.log(array);
                    });
                }
            });
        }); // fin transaction
    }

    goCreateTypeCredit() {
        this.setState({
            mostrarCreacionTipoCredito: true
        });
    }

    returnChooseTypeCredit() {
        this.setState({
            mostrarCreacionTipoCredito: false
        });
        this.loadTypeCredit();
    }

    render() {
        if(this.state.mostrarCreacionTipoCredito) {
            return (
                <div>
                    <CrearTipoCredito tablaID={this.props.tablaID} pool={this.props.pool} retornoSelCreditos={this.returnChooseTypeCredit} retornoTablas={this.props.retornoTablas} showConfigurationComponent={this.props.showConfigurationComponent} tipoCreditos={this.state.tipoCreditos} loadTypeCredit={this.loadTypeCredit}> </CrearTipoCredito>
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
                                            <li className={"breadcrumb-item active"} aria-current="page">Seleccionar Tipo de Cr&eacute;dito</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <button onClick={this.goCreateTypeCredit} className={"btn btn-success btn-block col-xl-10 col-10"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold", margin: "0 auto", display: "block"}}>Crear</button>
                    </div>
                    <br/>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            {this.state.tipoCreditos.map((tipoCredito, i) => (
                                <Accordion key={tipoCredito.ID} showTrash={false} allowMultipleOpen color={"#ffffff"}>
                                    <div label={tipoCredito.nombre} key={tipoCredito.ID}>
                                        { this.state.tipoCreditosHijos[i] != undefined ? (
                                            <div>
                                                {this.state.tipoCreditosHijos[i].map((tipoCredito, j) =>
                                                    <a className={"btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM"} onClick={() => this.props.seleccionarCredito(tipoCredito.ID, tipoCredito.nombre)} key={tipoCredito.ID}>{tipoCredito.nombre}</a>
                                                )}
                                                { this.state.tipoCreditosHijos[i].length == 0 ? (
                                                    <a className={"btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"}>No existen tipos de cr&eacute;ditos creados</a>
                                                ) : (
                                                    <span></span>
                                                )}
                                            </div>
                                        ) : (
                                            <span></span>
                                        )}
                                    </div>
                                </Accordion>
                            ))}
                            { this.state.tipoCreditos.length == 0 ? (
                                <a className={"btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"}>No existen tipos de cr&eacute;ditos creados</a>
                            ) : (
                                <span></span>
                            )}
                        </div>
                    </div>
                </div>
            );
        }
    }
}
