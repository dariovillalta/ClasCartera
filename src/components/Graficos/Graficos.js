import React from 'react';
import ElegirGraficos from './ElegirGraficos.js';
import ConfigGrafico from './ConfigGrafico.js';
import CrearFiltro from '../Filtros/CrearFiltro.js';
import VerGrafico from './VerGrafico.js';

export default class Graficos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            procesoAtual: "selGrafico",
            tipoGraficoSeleccionado: "",
            nombreEtiqueta: "",
            tablaEtiqueta: "",
            nombreNumerico: "",
            tablaNumerico: "",
            fechaInicio: "",
            fechaFinal: ""

        }
        this.terminoSeleccionGrafico = this.terminoSeleccionGrafico.bind(this);
        this.retornoSeleccionGrafico = this.retornoSeleccionGrafico.bind(this);
        this.terminoConfigGrafico = this.terminoConfigGrafico.bind(this);
        this.retornoConfigGrafico = this.retornoConfigGrafico.bind(this);
        this.terminoSeleccionFiltro = this.terminoSeleccionFiltro.bind(this);
        this.retornoSeleccionFiltro = this.retornoSeleccionFiltro.bind(this);
    }

    terminoSeleccionGrafico (tipo) {
        this.setState({
            procesoAtual: "configGrafico",
            tipoGraficoSeleccionado: tipo
        });
    }

    retornoSeleccionGrafico () {
        this.setState({
            procesoAtual: "selGrafico",
            tipoGraficoSeleccionado: ""
        });
    }

    terminoConfigGrafico (etiquetaNombre, etiquetaTabla, numericoNombre, numericoTabla, fechaInicio, fechaFinal) {
        this.setState({
            procesoAtual: "crearFiltro",
            nombreEtiqueta: etiquetaNombre,
            tablaEtiqueta: etiquetaTabla,
            nombreNumerico: numericoNombre,
            tablaNumerico: numericoTabla,
            fechaInicio: fechaInicio,
            fechaFinal: fechaFinal
        });
    }

    retornoConfigGrafico () {
        this.setState({
            procesoAtual: "configGrafico"
        });
    }

    terminoSeleccionFiltro () {
        this.setState({
            procesoAtual: "verGrafico"
        });
    }

    retornoSeleccionFiltro () {
        this.setState({
            procesoAtual: "crearFiltro"
        });
    }

    render() {
        if(this.state.procesoAtual.localeCompare("selGrafico") == 0) {
            return (
                <div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"page-header"}>
                                <h2 className={"pageheader-title"}>Gráficos</h2>
                                <div className={"page-breadcrumb"}>
                                    <nav aria-label="breadcrumb">
                                        <ol className={"breadcrumb"}>
                                            <li className={"breadcrumb-item active"} aria-current="page">Selección de Gráfico</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ElegirGraficos pool={this.props.pool} terminoSeleccionGrafico={this.terminoSeleccionGrafico}> </ElegirGraficos>
                </div>
            );
        } else if(this.state.procesoAtual.localeCompare("configGrafico") == 0) {
            return (
                <div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"page-header"}>
                                <h2 className={"pageheader-title"}>Gráficos</h2>
                                <div className={"page-breadcrumb"}>
                                    <nav aria-label="breadcrumb">
                                        <ol className={"breadcrumb"}>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.retornoSeleccionGrafico}><a href="#" className={"breadcrumb-link"}>Selección de Gráfico</a></li>
                                            <li className={"breadcrumb-item active"} aria-current="page">Configuración de Gráfico</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ConfigGrafico pool={this.props.pool} terminoConfigGrafico={this.terminoConfigGrafico}> </ConfigGrafico>
                </div>
            );
        } else if(this.state.procesoAtual.localeCompare("crearFiltro") == 0) {
            return (
                <div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"page-header"}>
                                <h2 className={"pageheader-title"}>Gráficos</h2>
                                <div className={"page-breadcrumb"}>
                                    <nav aria-label="breadcrumb">
                                        <ol className={"breadcrumb"}>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.retornoSeleccionGrafico}><a href="#" className={"breadcrumb-link"}>Selección de Gráfico</a></li>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.retornoConfigGrafico}><a href="#" className={"breadcrumb-link"}>Configuración de Gráfico</a></li>
                                            <li className={"breadcrumb-item active"} aria-current="page">Selección de Filtro</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CrearFiltro pool={this.props.pool} callbackComponent={this.terminoSeleccionFiltro}> </CrearFiltro>
                </div>
            );
        } else {
            return (
                <div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"page-header"}>
                                <h2 className={"pageheader-title"}>Gráficos</h2>
                                <div className={"page-breadcrumb"}>
                                    <nav aria-label="breadcrumb">
                                        <ol className={"breadcrumb"}>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.retornoSeleccionGrafico}><a href="#" className={"breadcrumb-link"}>Selección de Gráfico</a></li>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.retornoConfigGrafico}><a href="#" className={"breadcrumb-link"}>Configuración de Gráfico</a></li>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.retornoSeleccionFiltro}><a href="#" className={"breadcrumb-link"}>Selección de Filtro</a></li>
                                            <li className={"breadcrumb-item active"} aria-current="page">Gráfico</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <VerGrafico fechaInicio={this.props.fechaInicio} fechaFinal={this.props.fechaInicio} pool={this.props.pool} nombreEtiqueta={this.state.nombreEtiqueta} tablaEtiqueta={this.state.tablaEtiqueta} nombreNumerico={this.state.nombreNumerico} tablaNumerico={this.state.tablaNumerico} tipoGraficoSeleccionado={this.state.tipoGraficoSeleccionado}> </VerGrafico>
                </div>
            );
        }
    }
}
