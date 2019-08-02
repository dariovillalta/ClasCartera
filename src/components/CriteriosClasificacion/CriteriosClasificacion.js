import React from 'react';

import ComportamientoPago from './ComportamientoPago.js';

export default class CriteriosClasificacion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            router: {
                showConfiguracion: true,
                showCapacidadPago: false,
                showComportamientoPago: false,
                showDisponibilidadGarantias: false,
                showEntornoEconomico: false
            }
        }
        this.showConfiguracion = this.showConfiguracion.bind(this);
        this.showCapacidadPagoComponent = this.showCapacidadPagoComponent.bind(this);
        this.showComportamientoPagoComponent = this.showComportamientoPagoComponent.bind(this);
        this.showDisponibilidadGarantiasComponent = this.showDisponibilidadGarantiasComponent.bind(this);
        this.showEntornoEconomicoComponent = this.showEntornoEconomicoComponent.bind(this);
    }

    showConfiguracion() {
        this.setState({
            router: {
                showConfiguracion: true,
                showCapacidadPago: false,
                showComportamientoPago: false,
                showDisponibilidadGarantias: false,
                showEntornoEconomico: false
            }
        });
    }
    showCapacidadPagoComponent() {
        this.setState({
            router: {
                showConfiguracion: false,
                showCapacidadPago: true,
                showComportamientoPago: false,
                showDisponibilidadGarantias: false,
                showEntornoEconomico: false
            }
        });
    }
    showComportamientoPagoComponent() {
        this.setState({
            router: {
                showConfiguracion: false,
                showCapacidadPago: false,
                showComportamientoPago: true,
                showDisponibilidadGarantias: false,
                showEntornoEconomico: false
            }
        });
    }
    showDisponibilidadGarantiasComponent() {
        this.setState({
            router: {
                showConfiguracion: false,
                showCapacidadPago: false,
                showComportamientoPago: false,
                showDisponibilidadGarantias: true,
                showEntornoEconomico: false
            }
        });
    }
    showEntornoEconomicoComponent() {
        this.setState({
            router: {
                showConfiguracion: false,
                showCapacidadPago: false,
                showComportamientoPago: false,
                showDisponibilidadGarantias: false,
                showEntornoEconomico: true
            }
        });
    }

    render() {
        if (this.state.router.showConfiguracion) {
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
                                            <li className={"breadcrumb-item active"} aria-current="page">Criterios de Clasificaci&oacute;n</li>
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
                                        <a className={"btn btn-outline-secondary btn-block btnWhiteColorHover fontSize1EM"} onClick={this.showCapacidadPagoComponent}>Capacidad de Pago del Deudor</a>
                                        <a className={"btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM"}  onClick={this.showComportamientoPagoComponent}>Comportamiento de Pago del Deudor</a>
                                        <a className={"btn btn-outline-success btn-block btnWhiteColorHover fontSize1EM"}  onClick={this.showDisponibilidadGarantiasComponent}>Disponibilidad de Garant&iacute;as</a>
                                        <a className={"btn btn-outline-brand btn-block btnWhiteColorHover fontSize1EM"}  onClick={this.showEntornoEconomicoComponent}>Entorno Econ&oacute;mico</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.router.showCapacidadPago) {
            return (
                <div>
                </div>
            );
        } else if (this.state.router.showComportamientoPago) {
            return (
                <div>
                    <ComportamientoPago pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent} showCriteriosClasificacion={this.showConfiguracion}> </ComportamientoPago>
                </div>
            );
        } else if (this.state.router.showDisponibilidadGarantias) {
            return (
                <div>
                </div>
            );
        } else if (this.state.router.showEntornoEconomico) {
            return (
                <div>
                </div>
            );
        }
    }
}
