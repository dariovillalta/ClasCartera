import React from 'react';
import sql from 'mssql';

import Accordion from '../Accordion/Accordion.js';

export default class SeleccionarCriterioDeterioro extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                                        <li className={"breadcrumb-item active"} aria-current="page">Seleccionar Criterio de Deterioro</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <button onClick={this.props.goCrearCredito} className={"btn btn-success btn-block col-xl-10 col-10"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold", margin: "0 auto", display: "block"}}>Crear</button>
                </div>
                <br/>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"row addPaddingToConfig"}>
                            {this.props.tiposDeCredito.map((tipoCredito, i) => (
                                <Accordion key={tipoCredito.ID} showTrash={false} showEdit={false} allowMultipleOpen color={"#ffffff"}>
                                    <div label={tipoCredito.nombre} key={tipoCredito.ID}>
                                        { this.props.estimacionesDeterioro[i] != undefined ? (
                                            <div>
                                                {this.props.estimacionesDeterioro[i].map((estimacionDeterioro, j) =>
                                                    <a className={"btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM"} onClick={() => this.props.seleccionarCriterio(estimacionDeterioro.ID, estimacionDeterioro.nombreClasPadre, estimacionDeterioro)} key={estimacionDeterioro.ID}>{estimacionDeterioro.categoria +" - "+ estimacionDeterioro.tipoGarantia}</a>
                                                )}
                                                { this.props.estimacionesDeterioro[i].length == 0 ? (
                                                    <a className={"btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"}>No existen criterios de deterioro creados</a>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
