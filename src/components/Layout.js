import React from 'react';

import NavBar from './NavBar.js';
import LeftBar from './LeftBar.js';
import Body from './Body.js';

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            router: {
                showConfiguration: true,                //lista de configuraciones
                showConfTables: false,                  //configuracion de conexiones a tablas/campos
                showTypeCredit: false,                  //configuracion de opciones de tipo de credito
                showClasificationCriteria: false,       //configuracion de opciones clasificacion de criterio
                showLists: false,                      //configuracion de opciones de tipo de listas
                showCreditClassificationProcess: false,  //proceso de iniciar calculo de creditos
                showChooseReports: false,  //reporteria elegir entre ver datos o descargar excel
                showReportsView: false,  //reporteria ver datos
                showReportsDownload: false,  //reporteria descargar datos
                showGraphics: false     //componente para mostrar diferentes tipos de graficos
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
                showGraphics: false
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
                showGraphics: false
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
                showGraphics: false
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
                showGraphics: false
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
                showGraphics: false
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
                showGraphics: false
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
                showGraphics: false
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
                showGraphics: false
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
                showGraphics: false
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
                showGraphics: true
            }
        });
    }

    render() {
        return (
            <div className={"dashboard-main-wrapper"}>
                <NavBar showConfigurationComponent={this.showConfigurationComponent}> </NavBar>
                <LeftBar showCreditClasificationProcess={this.showCreditClasificationProcess}
                        showChooseReports={this.showChooseReports}
                        showGraphics={this.showGraphics}> </LeftBar>
                <div className={"dashboard-wrapper"}>
                    <div className={"container-fluid dashboard-content"}>
                        <Body router={this.state.router} pool={this.props.pool} showConfigurationComponent={this.showConfigurationComponent}
                            showTableConfigurationComponent={this.showTableConfigurationComponent}
                            showTypeCreditComponent={this.showTypeCreditComponent}
                            showClasificationCriteriaComponent={this.showClasificationCriteriaComponent}
                            showListsComponent={this.showListsComponent}
                            showReportsView={this.showReportsView}
                            showReportsDownload={this.showReportsDownload}> </Body>
                    </div>
                </div>
            </div>
        );
    }
}
