import React from 'react';
import sql from 'mssql';

export default class ConfigGrafico extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campos: [],
            campoNumero: []
        }
        //this.cambioClientes = this.cambioClientes.bind(this);
        this.loadFields = this.loadFields.bind(this);
        this.loadSumField = this.loadSumField.bind(this);
        this.enviarCampos = this.enviarCampos.bind(this);
    }

    componentDidMount() {
        this.loadFields();
        this.loadSumField();
    }

    loadFields() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select DISTINCT nombre from ResultadosID", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        for (var i = 0; i < result.recordset.length; i++) {
                            result.recordset[i].origenTabla = "ResultadosID";
                        };
                        var temp = [...this.state.campos];
                        temp = [ ...temp, ...result.recordset];
                        this.setState({
                            campos: temp
                        });
                    });
                }
            });
        }); // fin transaction

        const transaction1 = new sql.Transaction( this.props.pool );
        transaction1.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request1 = new sql.Request(transaction1);
            request1.query("select DISTINCT nombre from ResultadosDate", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction1.rollback(err => {
                        });
                    }
                } else {
                    transaction1.commit(err => {
                        for (var i = 0; i < result.recordset.length; i++) {
                            result.recordset[i].origenTabla = "ResultadosDate";
                        };
                        var temp = [...this.state.campos];
                        temp = [ ...temp, ...result.recordset];
                        this.setState({
                            campos: temp
                        });
                    });
                }
            });
        }); // fin transaction

        const transaction2 = new sql.Transaction( this.props.pool );
        transaction2.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request2 = new sql.Request(transaction2);
            request2.query("select DISTINCT nombre from ResultadosBool", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction2.rollback(err => {
                        });
                    }
                } else {
                    transaction2.commit(err => {
                        for (var i = 0; i < result.recordset.length; i++) {
                            result.recordset[i].origenTabla = "ResultadosBool";
                        };
                        var temp = [...this.state.campos];
                        temp = [ ...temp, ...result.recordset];
                        this.setState({
                            campos: temp
                        });
                    });
                }
            });
        }); // fin transaction

        const transaction3 = new sql.Transaction( this.props.pool );
        transaction3.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request3 = new sql.Request(transaction3);
            request3.query("select DISTINCT nombre from ResultadosString", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction3.rollback(err => {
                        });
                    }
                } else {
                    transaction3.commit(err => {
                        for (var i = 0; i < result.recordset.length; i++) {
                            result.recordset[i].origenTabla = "ResultadosString";
                        };
                        var temp = [...this.state.campos];
                        temp = [ ...temp, ...result.recordset];
                        this.setState({
                            campos: temp
                        });
                    });
                }
            });
        }); // fin transaction
    }

    loadSumField () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select DISTINCT nombre from ResultadosInt", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        for (var i = 0; i < result.recordset.length; i++) {
                            result.recordset[i].origenTabla = "ResultadosInt";
                        };
                        var temp = [...this.state.campoNumero];
                        temp = [ ...temp, ...result.recordset];
                        this.setState({
                            campoNumero: temp
                        });
                    });
                }
            });
        }); // fin transaction

        const transaction1 = new sql.Transaction( this.props.pool );
        transaction1.begin(err => {
            var rolledBack = false;
            transaction1.on('rollback', aborted => {
                rolledBack = true;
            });
            const request1 = new sql.Request(transaction1);
            request1.query("select DISTINCT nombre from ResultadosDecimal", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction1.rollback(err => {
                        });
                    }
                } else {
                    transaction1.commit(err => {
                        for (var i = 0; i < result.recordset.length; i++) {
                            result.recordset[i].origenTabla = "ResultadosDecimal";
                        };
                        var temp = [...this.state.campoNumero];
                        temp = [ ...temp, ...result.recordset];
                        this.setState({
                            campoNumero: temp
                        });
                    });
                }
            });
        }); // fin transaction1
    }

    enviarCampos () {
        var indexEtiqueta = $("#indexEtiqueta").val();
        var indexNumerico = $("#indexNumerico").val();
        var fechaInicio = $("#inicio").val();
        var fechaFinal = $("#fin").val();
        console.log($("#inicio").val());
        if(indexEtiqueta != undefined && indexNumerico != undefined) {
            this.props.terminoConfigGrafico(this.state.campos[indexEtiqueta].nombre, this.state.campos[indexEtiqueta].origenTabla, this.state.campoNumero[indexNumerico].nombre, this.state.campoNumero[indexNumerico].origenTabla, fechaInicio, fechaFinal);
        } else {
            alert('Campos no validos.');
        }
    }

    render() {
        return (
            <div>
                <div className="card">
                    <h3 className="card-header">Seleccione los campos a mostrar en la grafica:</h3>
                    <div className="card-body">
                        <div className="row">
                            <h5 >Agrupar valores por:</h5>
                        </div>
                        <div className="row">
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}}>
                                <form style={{width: "100%"}}>
                                    <div className="form-group" style={{width: "100%"}}>
                                        <select id="indexEtiqueta" className="form-control" style={{width: "100%"}}>
                                            {this.state.campos.map((campo, i) =>
                                                <option key={i} value={i}>{campo.nombre}</option>
                                            )}
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <h5 >Valor númerico a sumar:</h5>
                        </div>
                        <div className="row">
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}}>
                                <form style={{width: "100%"}}>
                                    <div className="form-group" style={{width: "100%"}}>
                                        <select id="indexNumerico" className="form-control" style={{width: "100%"}}>
                                            {this.state.campoNumero.map((campoNumero, i) =>
                                                <option key={i} value={i}>{campoNumero.nombre}</option>
                                            )}
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <h5 >Rango de fechas a tomar:</h5>
                        </div>
                        <div className="row">
                            <div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"}>
                                <h6 >Inicio:</h6>
                                <input id="inicio" type="date"/>
                            </div>
                            <div className={"col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"}>
                                <h6 >Fin:</h6>
                                <input id="fin" type="date"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{width: "100%", height: "6%", padding: "1% 0%"}} className={"text-center"}>
                    <a onClick={this.enviarCampos} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Iniciar </a>
                </div>
                <br/>
            </div>
        );
    }
}
