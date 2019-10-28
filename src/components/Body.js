import React from 'react';

import Configuracion from './Configuracion.js';
import ConeccionTablas from './ConeccionTabla/ConeccionTablas.js';
import TipoCredito from './TipoCredito/TipoCredito.js';
import LoadingScreen from './LoadingScreen.js';
import CriteriosClasificacion from './CriteriosClasificacion/CriteriosClasificacion.js';
import CrearYSeleccionarLista from './Listas/CrearYSeleccionarLista.js';
import ClasificarCarteraProceso from './ClasificarCarteraProceso/ClasificarCarteraProceso.js';
import ElegirReporteria from './Reporteria/ElegirReporteria.js';
import VerReporteria from './Reporteria/VerReporteria.js';
import DescargarReporteria from './Reporteria/DescargarReporteria.js';
import Graficos from './Graficos/Graficos.js';
import Home from './Home.js';
import CategoriaClasificacion from './CategoriaClasificacion/CategoriaClasificacion.js';
import CriteriosDeterioro from './CriteriosDeterioro/CriteriosDeterioro.js';
import MantenimientoUsuarios from './MantenimientoUsuarios.js';
import Bitacora from './Bitacora.js';

//const importacionODBC = new Worker("./components/odbcMSSQL.js");

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
        /*importacionODBC.postMessage([this.props.pool, this.props.router]);*/
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
                        showListsComponent={this.props.showListsComponent}
                        showCatClass={this.props.showCatClass}
                        showDeteriorationCriteria={this.props.showDeteriorationCriteria}
                        showMantenimientoUsuarios={this.props.showMantenimientoUsuarios}
                        showBitacora={this.props.showBitacora}> </Configuracion>
                </div>
            );
        } else if(this.props.router.showConfTables) {
            return (
                <div>
                    <ConeccionTablas pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent}> </ConeccionTablas>
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
        } else if(this.props.router.showLists) {
            return (
                <div>
                    <CrearYSeleccionarLista pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent}> </CrearYSeleccionarLista>
                </div>
            );
        } else if(this.props.router.showCreditClassificationProcess) {
            return (
                <div>
                    <ClasificarCarteraProceso showLoadingScreen={this.showLoadingScreen} hideLoadingScreen={this.hideLoadingScreen} pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent}> </ClasificarCarteraProceso>
                    { this.state.showLoadingScreen ? (
                        <LoadingScreen mensaje={this.state.mensajeLoadingScreen}> </LoadingScreen>
                    ) : (
                        <div></div>
                    )}
                </div>
            );
        } else if(this.props.router.showChooseReports) {
            return (
                <div>
                    <ElegirReporteria pool={this.props.pool} showReportsView={this.props.showReportsView} showReportsDownload={this.props.showReportsDownload}> </ElegirReporteria>
                </div>
            );
        } else if(this.props.router.showReportsView) {
            return (
                <div>
                    <VerReporteria showLoadingScreen={this.showLoadingScreen} hideLoadingScreen={this.hideLoadingScreen} pool={this.props.pool}> </VerReporteria>
                    { this.state.showLoadingScreen ? (
                        <LoadingScreen mensaje={this.state.mensajeLoadingScreen}> </LoadingScreen>
                    ) : (
                        <div></div>
                    )}
                </div>
            );
        } else if(this.props.router.showReportsDownload) {
            return (
                <div>
                    <DescargarReporteria showLoadingScreen={this.showLoadingScreen} hideLoadingScreen={this.hideLoadingScreen} pool={this.props.pool}> </DescargarReporteria>
                    { this.state.showLoadingScreen ? (
                        <LoadingScreen mensaje={this.state.mensajeLoadingScreen}> </LoadingScreen>
                    ) : (
                        <div></div>
                    )}
                </div>
            );
        } else if(this.props.router.showGraphics) {
            return (
                <div>
                    <Graficos showLoadingScreen={this.showLoadingScreen} hideLoadingScreen={this.hideLoadingScreen} pool={this.props.pool}> </Graficos>
                    { this.state.showLoadingScreen ? (
                        <LoadingScreen mensaje={this.state.mensajeLoadingScreen}> </LoadingScreen>
                    ) : (
                        <div></div>
                    )}
                </div>
            );
        } else if(this.props.router.showHome) {
            return (
                <div>
                    <Home pool={this.props.pool}> </Home>
                </div>
            );
        } else if(this.props.router.showCatClass) {
            return (
                <div>
                    <CategoriaClasificacion pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent}> </CategoriaClasificacion>
                </div>
            );
        } else if(this.props.router.showDeteriorationCriteria) {
            return (
                <div>
                    <CriteriosDeterioro pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent}> </CriteriosDeterioro>
                </div>
            );
        } else if(this.props.router.showMantenimientoUsuarios) {
            return (
                <div>
                    <MantenimientoUsuarios pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent}> </MantenimientoUsuarios>
                </div>
            );
        } else if(this.props.router.showBitacora) {
            return (
                <div>
                    <Bitacora pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent}> </Bitacora>
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
