import React from 'react';

import NavBar from './NavBar.js';
import LeftBar from './LeftBar.js';
import Body from './Body.js';

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            router: {
                showConfiguration: false,                //lista de configuraciones
                showConfTables: false,                  //configuracion de conexiones a tablas/campos
                showTypeCredit: false,                  //configuracion de opciones de tipo de credito
                showClasificationCriteria: false,       //configuracion de opciones clasificacion de criterio
                showLists: false,                      //configuracion de opciones de tipo de listas
                showCreditClassificationProcess: false,  //proceso de iniciar calculo de creditos
                showChooseReports: false,  //reporteria elegir entre ver datos o descargar excel
                showReportsView: false,  //reporteria ver datos
                showReportsDownload: false,  //reporteria descargar datos
                showGraphics: false,     //componente para mostrar diferentes tipos de graficos
                showHome: true,     //pantalla de inicio
                showCatClass: false,     //configuracion de opciones de categorias de clasificacion
                showDeteriorationCriteria: false,    //configuracion de criterios de deterioro
                showMantenimientoUsuarios: false,   //mantenimiento de usuarios
                showBitacora: false                 //visualizacion de bitacora
            }
        }
        this.showConfigurationComponent = this.showConfigurationComponent.bind(this);
        this.showTableConfigurationComponent = this.showTableConfigurationComponent.bind(this);
        this.showTypeCreditComponent = this.showTypeCreditComponent.bind(this);
        this.showClasificationCriteriaComponent = this.showClasificationCriteriaComponent.bind(this);
        this.showListsComponent = this.showListsComponent.bind(this);
        this.showCreditClasificationProcess = this.showCreditClasificationProcess.bind(this);
        this.showChooseReports = this.showChooseReports.bind(this);
        this.showReportsView = this.showReportsView.bind(this);
        this.showReportsDownload = this.showReportsDownload.bind(this);
        this.showGraphics = this.showGraphics.bind(this);
        this.showHome = this.showHome.bind(this);
        this.showCatClass = this.showCatClass.bind(this);
        this.showDeteriorationCriteria = this.showDeteriorationCriteria.bind(this);
        this.showMantenimientoUsuarios = this.showMantenimientoUsuarios.bind(this);
        this.showBitacora = this.showBitacora.bind(this);
    }

    showConfigurationComponent() {
        this.setState({
            router: {
                showConfiguration: true,
                showConfTables: false,
                showTypeCredit: false,
                showClasificationCriteria: false,
                showLists: false,
                showCreditClassificationProcess: false,
                showChooseReports: false,
                showReportsView: false,
                showReportsDownload: false,
                showGraphics: false,
                showHome: false,
                showCatClass: false,
                showDeteriorationCriteria: false,
                showMantenimientoUsuarios: false,
                showBitacora: false
            }
        });
    }

    showTableConfigurationComponent() {
        this.setState({
            router: {
                showConfiguration: false,
                showConfTables: true,
                showTypeCredit: false,
                showClasificationCriteria: false,
                showLists: false,
                showCreditClassificationProcess: false,
                showChooseReports: false,
                showReportsView: false,
                showReportsDownload: false,
                showGraphics: false,
                showHome: false,
                showCatClass: false,
                showDeteriorationCriteria: false,
                showMantenimientoUsuarios: false,
                showBitacora: false
            }
        });
    }

    showTypeCreditComponent() {
        this.setState({
            router: {
                showConfiguration: false,
                showConfTables: false,
                showTypeCredit: true,
                showClasificationCriteria: false,
                showLists: false,
                showCreditClassificationProcess: false,
                showChooseReports: false,
                showReportsView: false,
                showReportsDownload: false,
                showGraphics: false,
                showHome: false,
                showCatClass: false,
                showDeteriorationCriteria: false,
                showMantenimientoUsuarios: false,
                showBitacora: false
            }
        });
    }

    showClasificationCriteriaComponent() {
        this.setState({
            router: {
                showConfiguration: false,
                showConfTables: false,
                showTypeCredit: false,
                showClasificationCriteria: true,
                showLists: false,
                showCreditClassificationProcess: false,
                showChooseReports: false,
                showReportsView: false,
                showReportsDownload: false,
                showGraphics: false,
                showHome: false,
                showCatClass: false,
                showDeteriorationCriteria: false,
                showMantenimientoUsuarios: false,
                showBitacora: false
            }
        });
    }

    showListsComponent() {
        this.setState({
            router: {
                showConfiguration: false,
                showConfTables: false,
                showTypeCredit: false,
                showClasificationCriteria: false,
                showLists: true,
                showCreditClassificationProcess: false,
                showChooseReports: false,
                showReportsView: false,
                showReportsDownload: false,
                showGraphics: false,
                showHome: false,
                showCatClass: false,
                showDeteriorationCriteria: false,
                showMantenimientoUsuarios: false,
                showBitacora: false
            }
        });
    }

    showCreditClasificationProcess() {
        this.setState({
            router: {
                showConfiguration: false,
                showConfTables: false,
                showTypeCredit: false,
                showClasificationCriteria: false,
                showLists: false,
                showCreditClassificationProcess: true,
                showChooseReports: false,
                showReportsView: false,
                showReportsDownload: false,
                showGraphics: false,
                showHome: false,
                showCatClass: false,
                showDeteriorationCriteria: false,
                showMantenimientoUsuarios: false,
                showBitacora: false
            }
        });
    }

    showChooseReports() {
        this.setState({
            router: {
                showConfiguration: false,
                showConfTables: false,
                showTypeCredit: false,
                showClasificationCriteria: false,
                showLists: false,
                showCreditClassificationProcess: false,
                showChooseReports: true,
                showReportsView: false,
                showReportsDownload: false,
                showGraphics: false,
                showHome: false,
                showCatClass: false,
                showDeteriorationCriteria: false,
                showMantenimientoUsuarios: false,
                showBitacora: false
            }
        });
    }

    showReportsView() {
        this.setState({
            router: {
                showConfiguration: false,
                showConfTables: false,
                showTypeCredit: false,
                showClasificationCriteria: false,
                showLists: false,
                showCreditClassificationProcess: false,
                showChooseReports: false,
                showReportsView: true,
                showReportsDownload: false,
                showGraphics: false,
                showHome: false,
                showCatClass: false,
                showDeteriorationCriteria: false,
                showMantenimientoUsuarios: false,
                showBitacora: false
            }
        });
    }

    showReportsDownload() {
        this.setState({
            router: {
                showConfiguration: false,
                showConfTables: false,
                showTypeCredit: false,
                showClasificationCriteria: false,
                showLists: false,
                showCreditClassificationProcess: false,
                showChooseReports: false,
                showReportsView: false,
                showReportsDownload: true,
                showGraphics: false,
                showHome: false,
                showCatClass: false,
                showDeteriorationCriteria: false,
                showMantenimientoUsuarios: false,
                showBitacora: false
            }
        });
    }

    showGraphics() {
        this.setState({
            router: {
                showConfiguration: false,
                showConfTables: false,
                showTypeCredit: false,
                showClasificationCriteria: false,
                showLists: false,
                showCreditClassificationProcess: false,
                showChooseReports: false,
                showReportsView: false,
                showReportsDownload: false,
                showGraphics: true,
                showHome: false,
                showCatClass: false,
                showDeteriorationCriteria: false,
                showMantenimientoUsuarios: false,
                showBitacora: false
            }
        });
    }

    showHome() {
        this.setState({
            router: {
                showConfiguration: false,
                showConfTables: false,
                showTypeCredit: false,
                showClasificationCriteria: false,
                showLists: false,
                showCreditClassificationProcess: false,
                showChooseReports: false,
                showReportsView: false,
                showReportsDownload: false,
                showGraphics: false,
                showHome: true,
                showCatClass: false,
                showDeteriorationCriteria: false,
                showMantenimientoUsuarios: false,
                showBitacora: false
            }
        });
    }

    showCatClass() {
        this.setState({
            router: {
                showConfiguration: false,
                showConfTables: false,
                showTypeCredit: false,
                showClasificationCriteria: false,
                showLists: false,
                showCreditClassificationProcess: false,
                showChooseReports: false,
                showReportsView: false,
                showReportsDownload: false,
                showGraphics: false,
                showHome: false,
                showCatClass: true,
                showDeteriorationCriteria: false,
                showMantenimientoUsuarios: false,
                showBitacora: false
            }
        });
    }

    showDeteriorationCriteria() {
        this.setState({
            router: {
                showConfiguration: false,
                showConfTables: false,
                showTypeCredit: false,
                showClasificationCriteria: false,
                showLists: false,
                showCreditClassificationProcess: false,
                showChooseReports: false,
                showReportsView: false,
                showReportsDownload: false,
                showGraphics: false,
                showHome: false,
                showCatClass: false,
                showDeteriorationCriteria: true,
                showMantenimientoUsuarios: false,
                showBitacora: false
            }
        });
    }

    showMantenimientoUsuarios() {
        this.setState({
            router: {
                showConfiguration: false,
                showConfTables: false,
                showTypeCredit: false,
                showClasificationCriteria: false,
                showLists: false,
                showCreditClassificationProcess: false,
                showChooseReports: false,
                showReportsView: false,
                showReportsDownload: false,
                showGraphics: false,
                showHome: false,
                showCatClass: false,
                showDeteriorationCriteria: false,
                showMantenimientoUsuarios: true,
                showBitacora: false
            }
        });
    }

    showBitacora() {
        this.setState({
            router: {
                showConfiguration: false,
                showConfTables: false,
                showTypeCredit: false,
                showClasificationCriteria: false,
                showLists: false,
                showCreditClassificationProcess: false,
                showChooseReports: false,
                showReportsView: false,
                showReportsDownload: false,
                showGraphics: false,
                showHome: false,
                showCatClass: false,
                showDeteriorationCriteria: false,
                showMantenimientoUsuarios: false,
                showBitacora: true
            }
        });
    }

    render() {
        return (
            <div className={"dashboard-main-wrapper"}>
                <NavBar logOff={this.props.logOff} userName={this.props.userName} permision={this.props.permision} showConfigurationComponent={this.showConfigurationComponent}> </NavBar>
                <LeftBar permision={this.props.permision} showCreditClasificationProcess={this.showCreditClasificationProcess}
                        showChooseReports={this.showChooseReports}
                        showGraphics={this.showGraphics}
                        showHome={this.showHome}> </LeftBar>
                <div className={"dashboard-wrapper"}>
                    <div className={"container-fluid dashboard-content"}>
                        <Body router={this.state.router} pool={this.props.pool} showConfigurationComponent={this.showConfigurationComponent}
                            showTableConfigurationComponent={this.showTableConfigurationComponent}
                            showTypeCreditComponent={this.showTypeCreditComponent}
                            showClasificationCriteriaComponent={this.showClasificationCriteriaComponent}
                            showListsComponent={this.showListsComponent}
                            showReportsView={this.showReportsView}
                            showReportsDownload={this.showReportsDownload}
                            showCatClass={this.showCatClass}
                            showDeteriorationCriteria={this.showDeteriorationCriteria}
                            showMantenimientoUsuarios={this.showMantenimientoUsuarios}
                            showBitacora={this.showBitacora}> </Body>
                    </div>
                </div>
            </div>
        );
    }
}
