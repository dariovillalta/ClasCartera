import React from 'react';

import NavBar from './NavBar.js';
import LeftBar from './LeftBar.js';
import Body from './Body.js';

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            router: {
                showConfiguration: true,
                showConfTables: false,
                showTypeCredit: false,
                showClasificationCriteria: false,
                showListas: false
            }
        }
        this.showConfigurationComponent = this.showConfigurationComponent.bind(this);
        this.showTableConfigurationComponent = this.showTableConfigurationComponent.bind(this);
        this.showTypeCreditComponent = this.showTypeCreditComponent.bind(this);
        this.showClasificationCriteriaComponent = this.showClasificationCriteriaComponent.bind(this);
        this.showListasComponent = this.showListasComponent.bind(this);
    }

    showConfigurationComponent() {
        this.setState({
            router: {
                showConfiguration: true,
                showConfTables: false,
                showTypeCredit: false,
                showClasificationCriteria: false,
                showListas: false
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
                showListas: false
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
                showListas: false
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
                showListas: false
            }
        });
    }

    showListasComponent() {
        this.setState({
            router: {
                showConfiguration: false,
                showConfTables: false,
                showTypeCredit: false,
                showClasificationCriteria: false,
                showListas: true
            }
        });
    }

    render() {
        return (
            <div className={"dashboard-main-wrapper"}>
                <NavBar> </NavBar>
                <LeftBar> </LeftBar>
                <div className={"dashboard-wrapper"}>
                    <div className={"container-fluid dashboard-content"}>
                        <Body router={this.state.router} pool={this.props.pool} showConfigurationComponent={this.showConfigurationComponent}
                            showTableConfigurationComponent={this.showTableConfigurationComponent}
                            showTypeCreditComponent={this.showTypeCreditComponent}
                            showClasificationCriteriaComponent={this.showClasificationCriteriaComponent}
                            showListasComponent={this.showListasComponent}> </Body>
                    </div>
                </div>
            </div>
        );
    }
}
