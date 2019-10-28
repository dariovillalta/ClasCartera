import React from 'react';

import PieGraph from './PieGraph.js';
import BarGraph from './BarGraph.js';
import LineGraph from './LineGraph.js';

export default class VerGrafico extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.tipoGraficoSeleccionado.localeCompare("pie") == 0) {
            return (
                <div>
                    <PieGraph fechaInicio={this.props.fechaInicio} fechaFinal={this.props.fechaInicio} nombreEtiqueta={this.props.nombreEtiqueta} tablaEtiqueta={this.props.tablaEtiqueta} nombreNumerico={this.props.nombreNumerico} tablaNumerico={this.props.tablaNumerico} pool={this.props.pool}> </PieGraph>
                </div>
            );
        } else if(this.props.tipoGraficoSeleccionado.localeCompare("bar") == 0) {
            return (
                <div>
                    <BarGraph fechaInicio={this.props.fechaInicio} fechaFinal={this.props.fechaInicio} nombreEtiqueta={this.props.nombreEtiqueta} tablaEtiqueta={this.props.tablaEtiqueta} nombreNumerico={this.props.nombreNumerico} tablaNumerico={this.props.tablaNumerico} pool={this.props.pool}> </BarGraph>
                </div>
            );
        } else if(this.props.tipoGraficoSeleccionado.localeCompare("line") == 0) {
            return (
                <div>
                    <LineGraph fechaInicio={this.props.fechaInicio} fechaFinal={this.props.fechaInicio} nombreEtiqueta={this.props.nombreEtiqueta} tablaEtiqueta={this.props.tablaEtiqueta} nombreNumerico={this.props.nombreNumerico} tablaNumerico={this.props.tablaNumerico} pool={this.props.pool}> </LineGraph>
                </div>
            );
        }
    }
}
