import React from 'react';

export default class Configuracion extends React.Component {
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
                                        <li className={"breadcrumb-item active"} aria-current="page">Configuraci&oacute;n</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <div className={"row border-top border-bottom addPaddingToConfig"}>
                                    <a className={"btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"} onClick={this.props.showTableConfigurationComponent}>Tablas</a>
                                    <a className={"btn btn-outline-primary btn-block btnWhiteColorHover fontSize1EM"} onClick={this.props.showClasificationCriteriaComponent}>Criterios de Clasificaci&oacute;n</a>
                                    <a className={"btn btn-outline-secondary btn-block btnWhiteColorHover fontSize1EM"} onClick={this.props.showTypeCreditComponent}>Tipos de Cr&eacute;ditos</a>
                                    <a className={"btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM"}>Categorias de Clasificaci&oacute;n</a>
                                    <a className={"btn btn-outline-success btn-block btnWhiteColorHover fontSize1EM"}>Categorias de Clientes</a>
                                    <a className={"btn btn-outline-brand btn-block btnWhiteColorHover fontSize1EM"}>Mantenimiento de Usuarios</a>
                                    <a className={"btn btn-outline-danger btn-block btnWhiteColorHover fontSize1EM"} onClick={this.props.showListasComponent}>Listas</a>
                                    <a className={"btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"}>Variables Auxiliares</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
