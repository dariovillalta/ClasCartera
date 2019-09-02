import React from 'react';
import CrearFiltro from '../CrearFiltro.js';
import DescargarReporteArchivo from './DescargarReporteArchivo.js';

export default class DescargarReporteria extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seleccionoFiltro: false
        }
        this.terminoSeleccionFiltro = this.terminoSeleccionFiltro.bind(this);
        this.retornoSeleccionFiltro = this.retornoSeleccionFiltro.bind(this);
    }

    terminoSeleccionFiltro () {
        this.setState({
            seleccionoFiltro: true
        });
    }

    retornoSeleccionFiltro () {
        this.setState({
            seleccionoFiltro: false
        });
    }

    render() {
        if(!this.state.seleccionoFiltro) {
            return (
                <div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"page-header"}>
                                <h2 className={"pageheader-title"}>Descargar Reporteria</h2>
                                <div className={"page-breadcrumb"}>
                                    <nav aria-label="breadcrumb">
                                        <ol className={"breadcrumb"}>
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
                    <DescargarReporteArchivo pool={this.props.pool} retornoSeleccionFiltro={this.retornoSeleccionFiltro}> </DescargarReporteArchivo>
                </div>
            );
        }
    }
}
