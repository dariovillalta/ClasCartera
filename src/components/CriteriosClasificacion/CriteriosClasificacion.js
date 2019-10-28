import React from 'react';

import SeleccionarComportamientoPago from './SeleccionarComportamientoPago.js';

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
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"page-header"}>
                                <h2 className={"pageheader-title"}>Configuraci&oacute;n</h2>
                                <div className={"page-breadcrumb"}>
                                    <nav aria-label="breadcrumb">
                                        <ol className={"breadcrumb"}>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.props.showConfigurationComponent}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.showConfiguracion}><a href="#" className={"breadcrumb-link"}>Criterios de Clasificaci&oacute;n</a></li>
                                            <li className={"breadcrumb-item active"} aria-current="page">Capacidad de Pago del Deudor</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 m-b-60">
                            <div className="simple-card" style={{padding: "5%"}}>
                                <p>
                                    Constituirá el factor principal para evaluar a los Grandes Deudores Comerciales, y se medirá en función del análisis que realice la institución (ver Anexo 1-G) al inicio del crédito y de las actualizaciones que efectúe de conformidad al perfil de riesgo del deudor, las cuales como mínimo deben ser anualmente, de la situación financiera, presente y futura del deudor. Este análisis deberá tener como sustento técnico, los estados financieros principales del deudor (balance general, estado de resultados y flujo de caja), los que deberán haber sido auditados por firmas independientes registradas en la Comisión o auditados por firmas extranjeras cuando se trate de un deudor no domiciliado en el territorio nacional, mismos que deberán ser confiables y comprensibles para la entidad
                                    prestamista, de conformidad con el Anexo 1-A, numerales 2.1 y 2.2, Sección Financiera. Los flujos de caja y estudios de factibilidad de los nuevos proyectos a financiar, deberán tener bases de sustentación y supuestos, suficientes y razonables.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.router.showComportamientoPago) {
            return (
                <div>
                    <SeleccionarComportamientoPago pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent} showCriteriosClasificacion={this.showConfiguracion}> </SeleccionarComportamientoPago>
                </div>
            );
        } else if (this.state.router.showDisponibilidadGarantias) {
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
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.showConfiguracion}><a href="#" className={"breadcrumb-link"}>Criterios de Clasificaci&oacute;n</a></li>
                                            <li className={"breadcrumb-item active"} aria-current="page">Disponibilidad de Garantías</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 m-b-60">
                            <div className="simple-card" style={{padding: "5%"}}>
                                <p>
                                    Las garantías constituyen la fuente alterna de pago de un crédito y tienen relevancia para el requerimiento de las estimaciones de deterioro, después de que se hayan establecido claras debilidades en los dos (2) factores anteriores, siempre que para su ejecución y realización no se prevean dificultades u obstáculos que deterioren el valor de la garantía. Para ser consideradas como fuente alterna de pago, las garantías deben poder ser ejecutadas y realizadas en el corto plazo. Las garantías se considerarán por el valor que se les haya asignado en avalúo efectuado por profesional debidamente registrado en la Comisión, o bien, con el valor de la factura de proveedor reconocido o por su precio de venta de realización rápida, dependiendo de su naturaleza, cuando corresponda.
                                    Los criterios de valorización de las garantïas para efectos de clasificación de la cartera de créditos, se detallan en el Anexo 2 que forma parte integral de las presentes Normas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.router.showEntornoEconomico) {
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
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.showConfiguracion}><a href="#" className={"breadcrumb-link"}>Criterios de Clasificaci&oacute;n</a></li>
                                            <li className={"breadcrumb-item active"} aria-current="page">Entorno Económico</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 m-b-60">
                            <div className="simple-card" style={{padding: "5%"}}>
                                <p>
                                    Las condiciones y perspectivas del mercado o sector en que se llevan a cabo las actividades comerciales o productivas del deudor deben ser tomadas en cuenta en la asignación de categorías a los Grandes Deudores Comerciales. Se debe analizar la posición estratégica de un deudor en su mercado o rubro (utilizando criterios tales como dependencia de un solo producto o proveedor, demanda decreciente, productos substitutos, obsolescencia tecnológica, entre otros).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
