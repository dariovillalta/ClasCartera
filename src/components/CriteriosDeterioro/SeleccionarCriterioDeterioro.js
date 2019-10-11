import React from 'react';
import sql from 'mssql';

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
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <div className={"row border-top border-bottom addPaddingToConfig"}>
                                    {this.props.estimacionesDeterioro.map((estimacionDeterioro, i) =>
                                        <a className={"btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM"} onClick={() => this.props.seleccionarCriterio(estimacionDeterioro.ID, estimacionDeterioro.categoria)} key={estimacionDeterioro.ID}>{estimacionDeterioro.categoria}</a>
                                    )}
                                    { this.props.estimacionesDeterioro.length == 0 ? (
                                        <a className={"btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"}>No existen criterios de deterioro creados</a>
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
