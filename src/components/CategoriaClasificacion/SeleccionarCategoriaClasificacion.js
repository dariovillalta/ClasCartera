import React from 'react';
import sql from 'mssql';

import CrearCategoriaClasificacion from './CrearCategoriaClasificacion.js';

export default class SeleccionarCategoriaClasificacion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipoCreditos: [],
            mostrarCreacionTipoCredito: false
        }
        this.loadTypeCredit = this.loadTypeCredit.bind(this);
        this.goCreateTypeCredit = this.goCreateTypeCredit.bind(this);
        this.returnChooseTypeCredit = this.returnChooseTypeCredit.bind(this);
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
            request.query("select * from TipoCredito where tablaID = "+this.props.tablaID, (err, result) => {
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
                    <CrearTipoCredito tablaID={this.props.tablaID} pool={this.props.pool} retornoSelCreditos={this.returnChooseTypeCredit} retornoTablas={this.props.retornoTablas} showConfigurationComponent={this.props.showConfigurationComponent}> </CrearTipoCredito>
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
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.props.retornoTablas}><a href="#" className={"breadcrumb-link"}>Seleccionar Tabla</a></li>
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
                            <div className={"card influencer-profile-data"}>
                                <div className={"card-body"}>
                                    <div className={"row border-top border-bottom addPaddingToConfig"}>
                                        {this.state.tipoCreditos.map((tipoCredito, i) =>
                                            <a className={"btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM"} onClick={() => this.props.seleccionarCredito(tipoCredito.ID, tipoCredito.nombre)} key={tipoCredito.ID}>{tipoCredito.nombre}</a>
                                        )}
                                        { this.state.tipoCreditos.length == 0 ? (
                                            <a className={"btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"}>No existen tipos de cr&eacute;ditos creados</a>
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
