import React from 'react';
import CrearFiltro from '../Filtros/CrearFiltro.js';
import ResultadoReporteria from './ResultadoReporteria.js';

export default class VerReporteria extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seleccionoFiltro: false,
            arregloReglasFiltros: []
        }
        this.terminoSeleccionFiltro = this.terminoSeleccionFiltro.bind(this);
        this.retornoSeleccionFiltro = this.retornoSeleccionFiltro.bind(this);
    }

    terminoSeleccionFiltro () {
        /*for (var i = 0; i < arregloReglasFiltros.length; i++) {
            arregloReglasFiltros[i]
            var condicionRegla = getEvalCodeCondition(reglasEstimacionesDeterioro[n][m], "arregloCreditos[j][k]");
            if( !eval(condicionRegla) ) {
                arregloResultados.splice(i, 1);
            }
        };*/
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
                                <h2 className={"pageheader-title"}>Ver Reporter&iacute;a</h2>
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
                    <CrearFiltro pool={this.props.pool} callbackComponent={this.terminoSeleccionFiltro} arregloReglasFiltros={this.state.arregloReglasFiltros}> </CrearFiltro>
                </div>
            );
        } else {
            return (
                <div>
                    <ResultadoReporteria pool={this.props.pool} retornoSeleccionFiltro={this.retornoSeleccionFiltro}> </ResultadoReporteria>
                </div>
            );
        }
    }
}
