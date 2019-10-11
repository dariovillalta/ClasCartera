import React from 'react';
import sql from 'mssql';

import VariableCreation from './VariableCreation.js';
import ReglaTexto from './ReglaTexto.js';

export default class MostrarReglas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reglas: [],
            mostrarCreacionRegla: false
        }
        this.loadRules = this.loadRules.bind(this);
        this.goCreateRule = this.goCreateRule.bind(this);
        this.returnChooseRule = this.returnChooseRule.bind(this);
    }

    componentDidMount() {
        this.loadRules();
    }

    loadRules() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Reglas where nombreTablaRes = '"+this.props.tipoTablaRes+"' and idTipoTabla = "+this.props.idTipoTabla, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            reglas: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    goCreateRule() {
        this.setState({
            mostrarCreacionRegla: true
        });
    }

    returnChooseRule() {
        this.setState({
            mostrarCreacionRegla: false
        });
        this.loadRules();
    }

    render() {
        if(this.state.mostrarCreacionRegla) {
            return (
                <div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"page-header"}>
                                <h2 className={"pageheader-title"}>Configuraci&oacute;n</h2>
                                <div className={"page-breadcrumb"}>
                                    <nav aria-label="breadcrumb">
                                        <ol className={"breadcrumb"}>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.props.showConfigurationComponent}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.props.returnPrevComponent}><a href="#" className={"breadcrumb-link"}>{this.props.returnPrevComponentName}</a></li>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.returnChooseRule}><a href="#" className={"breadcrumb-link"}>Mostrar Variables</a></li>
                                            <li className={"breadcrumb-item active"} aria-current="page">Creaci&oacute;n de Variables</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <VariableCreation pool={this.props.pool}  tipoTablaRes={this.props.tipoTablaRes} idTipoTabla={this.props.idTipoTabla}> </VariableCreation>
                </div>
            );
        } else {
            return (
                <div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"page-header"}>
                                <h2 className={"pageheader-title"}>Configuraci&oacute;n</h2>
                                <div className={"page-breadcrumb"}>
                                    <nav aria-label="breadcrumb">
                                        <ol className={"breadcrumb"}>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.props.showConfigurationComponent}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.props.returnPrevComponent}><a href="#" className={"breadcrumb-link"}>{this.props.returnPrevComponentName}</a></li>
                                            <li className={"breadcrumb-item active"} aria-current="page">Seleccionar Variables</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <button onClick={this.goCreateRule} className={"btn btn-success btn-block col-xl-10 col-10"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold", margin: "0 auto", display: "block"}}>Crear</button>
                    </div>
                    <br/>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"card influencer-profile-data"}>
                                <div className={"card-body"}>
                                    <div className={"row border-top border-bottom addPaddingToConfig"}>
                                        {this.state.reglas.map((regla, i) =>
                                            <a className={"btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM"} onClick={() => this.props.seleccionar(regla.ID, this.ReglaTexto1.state.texto, regla.operacion, this.ReglaTexto2.state.texto)} key={regla.ID} style={{whiteSpace: "nowrap"}}>
                                                <ReglaTexto onRef={ref => (this.ReglaTexto1 = ref)} regla={regla} esCampo={true} pool={this.props.pool}></ReglaTexto> {regla.operacion} <ReglaTexto onRef={ref => (this.ReglaTexto2 = ref)} regla={regla} esCampo={false} pool={this.props.pool}></ReglaTexto>
                                            </a>
                                        )}
                                        { this.state.reglas.length == 0 ? (
                                            <a className={"btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"}>No existen variables creadas</a>
                                        ) : (
                                            <span></span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
