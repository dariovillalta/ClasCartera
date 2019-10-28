import React from 'react';
import CrearFiltro from '../Filtros/CrearFiltro.js';
import DescargarReporteArchivo from './DescargarReporteArchivo.js';

export default class DescargarReporteria extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seleccionoFiltro: false,
            arregloReglasFiltros: [],
            filtrosInt: [],
            filtrosDecimal: [],
            filtrosDate: [],
            filtrosBool: [],
            filtrosString: []
        }
        this.terminoSeleccionFiltro = this.terminoSeleccionFiltro.bind(this);
        this.retornoSeleccionFiltro = this.retornoSeleccionFiltro.bind(this);
        this.updatefilter = this.updatefilter.bind(this);
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
        console.log(this.state.filtrosInt);
        console.log(this.state.filtrosDecimal);
        console.log(this.state.filtrosBool);
        console.log(this.state.filtrosDate);
        console.log(this.state.filtrosString);
    }

    retornoSeleccionFiltro () {
        this.setState({
            seleccionoFiltro: false,
            filtrosInt: [],
            filtrosDecimal: [],
            filtrosBool: [],
            filtrosDate: [],
            filtrosString: []
        });
    }

    updatefilter(filtro) {
        if(filtro[0].tipo.localeCompare("int") == 0){
            this.setState({
                filtrosInt: filtro
            });
        } else if(filtro[0].tipo.localeCompare("decimal") == 0){
            this.setState({
                filtrosDecimal: filtro
            });
        } else if(filtro[0].tipo.localeCompare("bool") == 0){
            this.setState({
                filtrosBool: filtro
            });
        } else if(filtro[0].tipo.localeCompare("date") == 0){
            this.setState({
                filtrosDate: filtro
            });
        } else if(filtro[0].tipo.localeCompare("varchar") == 0){
            this.setState({
                filtrosString: filtro
            });
        }
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
                    <CrearFiltro updatefilter={this.updatefilter} pool={this.props.pool} callbackComponent={this.terminoSeleccionFiltro} arregloReglasFiltros={this.state.arregloReglasFiltros}> </CrearFiltro>
                </div>
            );
        } else {
            return (
                <div>
                    <DescargarReporteArchivo showLoadingScreen={this.props.showLoadingScreen} hideLoadingScreen={this.props.hideLoadingScreen} filtrosInt={this.state.filtrosInt} filtrosDecimal={this.state.filtrosDecimal} filtrosDate={this.state.filtrosDate} filtrosBool={this.state.filtrosBool} filtrosString={this.state.filtrosString} pool={this.props.pool} retornoSeleccionFiltro={this.retornoSeleccionFiltro}> </DescargarReporteArchivo>
                </div>
            );
        }
    }
}
