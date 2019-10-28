import React from 'react';
import sql from 'mssql';

export default class Valor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listas: [],
            variablesDeLista: []
        }
        this.updateVariableList = this.updateVariableList.bind(this);
        this.getLists = this.getLists.bind(this);
    }

    componentDidMount() {
        this.getLists();
    }

    getLists() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Listas", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            listas: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    updateVariableList() {
        let listaID = $("#selectLista").val();
        if (listaID.length > 0) {
            if (listaID.localeCompare("table") != 0) {
                console.log(listaID)
                const transaction = new sql.Transaction( this.props.pool );
                transaction.begin(err => {
                    var rolledBack = false;
                    transaction.on('rollback', aborted => {
                        rolledBack = true;
                    });
                    const request = new sql.Request(transaction);
                    request.query("select * from VariablesdeLista where listaID = "+listaID, (err, result) => {
                        if (err) {
                            if (!rolledBack) {
                                console.log(err);
                                transaction.rollback(err => {
                                });
                            }
                        } else {
                            transaction.commit(err => {
                                let arrTemp = [];
                                for (var i = 0; i < result.recordset.length; i++) {
                                    arrTemp.push({ID: result.recordset[i].ID, nombre: result.recordset[i].nombre, tipo: result.recordset[i].tipo});
                                };
                                this.setState({
                                    variablesDeLista: arrTemp
                                });
                                console.log(arrTemp)
                            });
                        }
                    });
                }); // fin transaction
            } else {
                let arrTemp = [];
                for (var i = 0; i < this.props.campos.length; i++) {
                    arrTemp.push({ID: this.props.campos[i].ID, nombre: this.props.campos[i].nombre, tipo: this.props.campos[i].tipo});
                };
                this.setState({
                    variablesDeLista: arrTemp
                });
            }
        } else {
            this.setState({
                variablesDeLista: []
            });
        }
    }

    render() {
        if(this.props.esNumero) {
            return (
                <div className={"row"}>
	            	<div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
	                    <div className={"card"}>
	                        <h3 className={"card-header"}>Seleccionar Campo</h3>
	                        <div className={"card-body"}>
	                            <div className={"form-group"}>
	                                <select id="selectLista" className={"form-control form-control-lg"} onChange={this.updateVariableList}>
	                                    <option value="">Seleccione una lista...</option>
	                                    <option value="table">Campos de tabla</option>
                                        {this.state.listas.map((lista, i) =>
                                            <option value={lista.ID} key={lista.ID}>{lista.nombre}</option>
                                        )}
	                                </select>
	                            </div>
	                        </div>

	                        <h5 className={"card-header"} style={{margin: "0px"}}></h5>
	                        <h4 className={"card-header"}>Seleccionar Elementos</h4>
	                        <div className={"card-body"}>
	                            <div className={"form-group"}>
	                                <select id="camposDeLista" className={"form-control form-control-lg"} multiple>
                                        {this.state.variablesDeLista.map((variable, i) => {
                                                if (variable.tipo.indexOf("int") == 0) {
                                                    return <option value={variable.ID} key={variable.ID}>{variable.nombre}</option>
                                                } else {
                                                    return null;
                                                }
                                            }
                                        )}
	                                </select>
	                            </div>
	                        </div>

	                    </div>
	                </div>
	            </div>
            );
        } else if(this.props.esBoolean || this.props.esPequenoDeudor) {
            return (
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card"}>
                            <h3 className={"card-header"}>Seleccionar Operacion</h3>
                            <div className={"card-body"}>
                                <div className={"text-center"}>
                                    <label className={"custom-control custom-radio custom-control-inline"}>
                                        <input type="radio" name="radio-inline" className={"custom-control-input"}/>
                                        <span className={"custom-control-label"}>
                                            <img src="./assets/varCreation/Verdadero.png" alt="" style={{height: "30px", width: "auto"}}/>
                                        </span>
                                    </label>
                                    <label className={"custom-control custom-radio custom-control-inline"}>
                                        <input type="radio" name="radio-inline" className={"custom-control-input"}/>
                                        <span className={"custom-control-label"}>
                                            <img src="./assets/varCreation/Falso.png" alt="" style={{height: "30px", width: "auto"}}/>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if(this.props.esFecha) {
            return (
                <div>
                </div>
            );
        } else if(this.props.esTexto) {
            return (
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card"}>
                            <h3 className={"card-header"}>Seleccionar Campo</h3>
                            <div className={"card-body"}>
                                <div className={"form-group"}>
                                    <select id="selectLista" className={"form-control form-control-lg"} onChange={this.updateVariableList}>
                                        <option value="">Seleccione una lista...</option>
                                        <option value="table">Campos de tabla</option>
                                        {this.state.listas.map((lista, i) =>
                                            <option value={lista.ID} key={lista.ID}>{lista.nombre}</option>
                                        )}
                                    </select>
                                </div>
                            </div>

                            <h5 className={"card-header"} style={{margin: "0px"}}></h5>
                            <h4 className={"card-header"}>Seleccionar Elementos</h4>
                            <div className={"card-body"}>
                                <div className={"form-group"}>
                                    <select id="camposDeLista" className={"form-control form-control-lg"} multiple>
                                        {this.state.variablesDeLista.map((variable, i) => {
                                                if (variable.tipo.indexOf("varchar") == 0) {
                                                    return <option value={variable.ID} key={variable.ID}>{variable.nombre}</option>
                                                } else {
                                                    return null;
                                                }
                                            }
                                        )}
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            );
        } else if(this.props.esGranDeudor) {
            return (
                <div className={"row"}>
                    <div className={"col-sm-4 col-4"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"d-inline-block text-center"} style={{width: "100%"}}>
                                    <h2 className="text-muted">Capital Mínimo</h2>
                                    <input id="capitalMinimo" type="text" className={"form-control"}  style={{width: "100%"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-4 col-4"}>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-inline-block text-center"  style={{width: "100%"}}>
                                    <h2 className="text-muted">Tiempo Mínimo</h2>
                                    <input id="tiempoMinimo" type="text" className={"form-control"}  style={{width: "100%"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-4 col-4"}>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-inline-block text-center"  style={{width: "100%"}}>
                                    <h2 className="text-muted">Porcentaje Mínimo</h2>
                                    <input id="porcentajeMinimo" type="text" className={"form-control"}  style={{width: "100%"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
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
