import React from 'react';
import ConfiguracionTablas from './ConfiguracionTablas.js';
import ConfiguracionCampos from './ConfiguracionCampos.js';

export default class ConeccionTablas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idTablaSeleccionada: -1,
            nombreTablaSeleccionada: ""
        }
        this.terminoSeleccionTabla = this.terminoSeleccionTabla.bind(this);
        this.retornoSeleccionTabla = this.retornoSeleccionTabla.bind(this);
    }

    terminoSeleccionTabla (id, nombre) {
        this.setState({
            idTablaSeleccionada: id,
            nombreTablaSeleccionada: nombre
        });
    }

    retornoSeleccionTabla () {
        this.setState({
            idTablaSeleccionada: -1,
            nombreTablaSeleccionada: ""
        });
    }

    render() {
        if(this.state.idTablaSeleccionada == -1) {
            return (
                <div>
                    <ConfiguracionTablas pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent} terminoSeleccionTabla={this.terminoSeleccionTabla}> </ConfiguracionTablas>
                </div>
            );
        } else {
            return (
                <div>
                    <ConfiguracionCampos pool={this.props.pool} retornoSeleccionTabla={this.retornoSeleccionTabla} showConfigurationComponent={this.props.showConfigurationComponent} idTablaSeleccionada={this.state.idTablaSeleccionada} nombreTablaSeleccionada={this.state.nombreTablaSeleccionada} terminoSeleccionTabla={this.terminoSeleccionTabla}> </ConfiguracionCampos>
                </div>
            );
        }
    }
}
