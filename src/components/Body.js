import React from 'react';

import Configuracion from './Configuracion.js';
import ConfiguracionTablas from './ConfiguracionTablas.js';
import TipoCredito from './TipoCredito/TipoCredito.js';
import LoadingScreen from './LoadingScreen.js';
import CriteriosClasificacion from './CriteriosClasificacion/CriteriosClasificacion.js';
import CrearYSeleccionarLista from './Listas/CrearYSeleccionarLista.js';

export default class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /*router: {
                showConfiguration: true,
                showConfTables: false,
                showTypeCredit: false
            },*/
            showLoadingScreen: false,
            mensajeLoadingScreen: ''
        }
        this.showLoadingScreen = this.showLoadingScreen.bind(this);
        this.hideLoadingScreen = this.hideLoadingScreen.bind(this);
    }

    showLoadingScreen () {
        this.setState({
            showLoadingScreen: true
        });
    }

    hideLoadingScreen () {
        this.setState({
            showLoadingScreen: false
        });
    }

    render() {
        if(this.props.router.showConfiguration) {
            return (
                <div>
                    <Configuracion showTableConfigurationComponent={this.props.showTableConfigurationComponent}
                        showTypeCreditComponent={this.props.showTypeCreditComponent}
                        showClasificationCriteriaComponent={this.props.showClasificationCriteriaComponent}
                        showListasComponent={this.props.showListasComponent}> </Configuracion>
                    { this.state.showLoadingScreen ? (
                        <LoadingScreen mensaje={this.state.mensajeLoadingScreen}> </LoadingScreen>
                    ) : (
                        <div></div>
                    )}
                </div>
            );
        } else if(this.props.router.showConfTables) {
            return (
                <div>
                    <ConfiguracionTablas pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent}> </ConfiguracionTablas>
                </div>
            );
        } else if(this.props.router.showTypeCredit) {
            return (
                <div>
                    <TipoCredito pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent}> </TipoCredito>
                </div>
            );
        } else if(this.props.router.showClasificationCriteria) {
            return (
                <div>
                    <CriteriosClasificacion pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent}> </CriteriosClasificacion>
                </div>
            );
        } else if(this.props.router.showListas) {
            return (
                <div>
                    <CrearYSeleccionarLista pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent}> </CrearYSeleccionarLista>
                </div>
            );
        } else {
            return (
                <div>
                </div>
            );
        }
    }
}
