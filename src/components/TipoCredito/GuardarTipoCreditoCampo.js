import React from 'react';
import sql from 'mssql';

export default class GuardarTipoCreditoCampo extends React.Component {
    constructor(props) {
        super(props);
        this.guardarCampoTipoCredito = this.guardarCampoTipoCredito.bind(this);
    }

    guardarCampoTipoCredito() {
        let nombre = $("#nombreTipoCredCampo").val();
        let descripcion = $("#descripcionTipoCredCampo").val();
        if(nombre.length > 0 && nombre.length < 101) {
            if(descripcion.length < 401) {
                const transaction = new sql.Transaction( this.props.pool );
                transaction.begin(err => {
                    var rolledBack = false;
                    transaction.on('rollback', aborted => {
                        rolledBack = true;
                    });
                    const request = new sql.Request(transaction);
                    request.query("insert into TipoCreditoCampo (tipoCreditoID, reglaID, nombre, descripcion) values ("+this.props.creditoID+","+this.props.reglaID+",'"+nombre+"','"+descripcion+"')", (err, result) => {
                        if (err) {
                            if (!rolledBack) {
                                console.log(err);
                                transaction.rollback(err => {
                                });
                            }
                        } else {
                            transaction.commit(err => {
                                alert("Exito");
                            });
                        }
                    });
                }); // fin transaction
            } else {
                alert("Error");
            }
        } else {
            alert("Error");
        }
    }

    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-sm-6 col-6"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"d-inline-block text-center"}>
                                    <h2 className="text-muted">Tabla</h2>
                                    <h1 className="mb-0">{this.props.tabla}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-6 col-6"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"d-inline-block text-center"}>
                                    <h2 className="text-muted">Tipo de Cr&eacute;dito</h2>
                                    <h1 className="mb-0">{this.props.tipoCredito}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-sm-4 col-4"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"d-inline-block text-center"}>
                                    <h2 className="text-muted">Campo</h2>
                                    <h1 className="mb-0">{this.props.campo}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-4 col-4"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"d-inline-block text-center"}>
                                    <h2 className="text-muted">Operaci&oacute;n</h2>
                                    <h1 className="mb-0">{this.props.operacion}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-4 col-4"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"d-inline-block text-center"}>
                                    <h2 className="text-muted">Valor</h2>
                                    <h1 className="mb-0">{this.props.valor}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col-xl-12 col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-inline-block text-center"  style={{width: "100%"}}>
                                    <h2 className="text-muted">Nombre</h2>
                                    <input id="nombreTipoCredCampo" type="text" className={"form-control"}  style={{width: "100%"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-12"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"d-inline-block text-center"} style={{width: "100%"}}>
                                    <h2 className="text-muted">Descripci&oacute;n</h2>
                                    <input id="descripcionTipoCredCampo" type="text" className={"form-control"}  style={{width: "100%"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"text-center"}>
                    <a onClick={this.guardarCampoTipoCredito} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Guardar</a>
                </div>
                <br/>
            </div>
        );
    }
}
