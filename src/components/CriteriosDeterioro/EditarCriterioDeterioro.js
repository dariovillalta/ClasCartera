import React from 'react';
import sql from 'mssql';
import Inputmask from "inputmask";
import MessageModal from '../MessageModal.js';

var subcategorias = [{categoria: "A"},{categoria: "B"},{categoria: "C"},{categoria: "D"},{categoria: "E"},{categoria: "F"},
{categoria: "G"},{categoria: "H"},{categoria: "I"},{categoria: "J"},{categoria: "K"},{categoria: "L"},{categoria: "M"},
{categoria: "N"},{categoria: "O"},{categoria: "P"},{categoria: "Q"},{categoria: "R"},{categoria: "S"},{categoria: "T"},
{categoria: "U"},{categoria: "V"},{categoria: "W"},{categoria: "X"},{categoria: "Y"},{categoria: "Z"}];

export default class EditarCriterioDeterioro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoriasClasificacion: [],
            tiposDeCredito: [],
            campos: [],
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: ""}
        }
        this.iniciarCriterioDeterioro = this.iniciarCriterioDeterioro.bind(this);
        this.guardarCriterioDeterioro = this.guardarCriterioDeterioro.bind(this);
        this.traerAggararCategoriasClasificacion = this.traerAggararCategoriasClasificacion.bind(this);
        this.getNombreCategoria = this.getNombreCategoria.bind(this);
        this.loadFields = this.loadFields.bind(this);
        this.verificarExistencia = this.verificarExistencia.bind(this);
        this.eliminarCriterioDeterioro = this.eliminarCriterioDeterioro.bind(this);
        this.showSuccesMessage = this.showSuccesMessage.bind(this);
        this.dismissMessageModal = this.dismissMessageModal.bind(this);
    }

    componentDidMount() {
        this.traerAggararCategoriasClasificacion();
        this.traerAggararTiposCredito();
        this.loadFields();
        //$("#porcentajeEstimacionDeterioro").inputmask({"mask": "999 %"});
        Inputmask({"mask": "9[9][9][.99] %"}).mask($("#porcentajeEstimacionDeterioro"));
        Inputmask({"mask": "9[9][9][9]"}).mask($("#inicioMora"));
        Inputmask({"mask": "9[9][9][9]"}).mask($("#finMora"));
    }

    iniciarCriterioDeterioro() {
        //trayendo los criterios de deterioro relacionados al tipo de credito para auto asignar subcategoria
        var idCategoria = this.state.categoriasClasificacion[$("#categoriaClasificacionID").val()].ID;
        var idTipoCredito = this.state.tiposDeCredito[$("#tipoCreditoID").val()].ID;
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from CriterioDeterioro where categoriaClasPadre = "+idCategoria+" and tipoDeCredito = "+idTipoCredito, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.guardarCriterioDeterioro(result.recordset);
                    });
                }
            });
        }); // fin transaction
    }

    guardarCriterioDeterioro(criterioDeterioroMismaCategoria) {
        let categoriaClasificacion = this.state.categoriasClasificacion[$("#categoriaClasificacionID").val()].ID;
        let nombreClasPadre = this.state.categoriasClasificacion[$("#categoriaClasificacionID").val()].categoria+" "+this.state.categoriasClasificacion[$("#categoriaClasificacionID").val()].tipoCredito;
        let categoria = this.state.categoriasClasificacion[$("#categoriaClasificacionID").val()].categoria+this.getNombreCategoria(criterioDeterioroMismaCategoria);      //es categoriaClasificacion la hijesima (n) vez del arreglo subcategorias ^^^inicio del archivo
        let tipoCredito = this.state.tiposDeCredito[$("#tipoCreditoID").val()].ID;
        let campoTipoGarantia = $("#campo").val();
        let tipoGarantia = $("#nombreTipoGarantia").val();
        let inicioMora = $("#inicioMora").val();
        let finMora = $("#finMora").val();
        let porcentajeEstimacionDeterioro = $("#porcentajeEstimacionDeterioro").val().split(" ")[0];
        if(!isNaN(categoriaClasificacion)) {
            if(categoria != undefined && categoria.length > 0 && categoria.length < 91) {
                if(!isNaN(tipoCredito)) {
                    if(!isNaN(campoTipoGarantia)) {
                        if(tipoGarantia != undefined && tipoGarantia.length > 0 && tipoGarantia.length < 101) {
                            if(!isNaN(inicioMora)) {
                                if(!isNaN(finMora)) {
                                    if(!isNaN(porcentajeEstimacionDeterioro)) {
                                        const transaction = new sql.Transaction( this.props.pool );
                                        transaction.begin(err => {
                                            var rolledBack = false;
                                            transaction.on('rollback', aborted => {
                                                rolledBack = true;
                                            });
                                            const request = new sql.Request(transaction);
                                            request.query("update CriterioDeterioro set categoriaClasPadre = "+categoriaClasificacion+", nombreClasPadre = '"+nombreClasPadre+"', categoria = '"+categoria+"', tipoDeCredito = "+tipoCredito+", campoTipoGarantia = "+campoTipoGarantia+", tipoGarantia = '"+tipoGarantia+"', inicioMora = "+inicioMora+", finMora = "+finMora+", estimacionDeterioro = "+porcentajeEstimacionDeterioro+" where ID = "+this.props.criterioDeterioro.ID, (err, result) => {
                                                if (err) {
                                                    if (!rolledBack) {
                                                        console.log(err);
                                                        transaction.rollback(err => {
                                                        });
                                                    }
                                                } else {
                                                    transaction.commit(err => {
                                                        this.showSuccesMessage("Exito", "Criterio de Deterioro modificado con éxito.");
                                                    });
                                                }
                                            });
                                        }); // fin transaction
                                    } else {
                                        alert("Error porcentajeEstimacionDeterioro");
                                    }
                                } else {
                                    alert("Error finMora");
                                }
                            } else {
                                alert("Error inicioMora");
                            }
                        } else {
                            alert("Error tipoGarantia");
                        }
                    } else {
                        alert("Error campoTipoGarantia");
                    }
                } else {
                    alert("Error tipoCredito");
                }
            } else {
                alert("Error categoria");
            }
        } else {
            alert("Error categoriaClasificacion");
        }
    }

    getNombreCategoria(criterioDeterioroMismaCategoria) {
        if(criterioDeterioroMismaCategoria.length <= 26) {
            return subcategorias[criterioDeterioroMismaCategoria.length].categoria;
        } else {
            return subcategorias[criterioDeterioroMismaCategoria.length%26].categoria;
        }
    }


    traerAggararCategoriasClasificacion() {
        //trayendo las categorias de clasificacion de creditos
        var idCategoria = $("#categoriaClasificacionID").val();
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from CategoriaClasificacion", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            categoriasClasificacion: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    traerAggararTiposCredito() {
        //trayendo las categorias de clasificacion de creditos
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from TipoCredito", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            tiposDeCredito: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    loadFields() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Campos where tabla = 'Préstamo'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var temp = [];
                        for (var i = result.recordset.length - 1; i >= 0; i--) {
                            var existe = this.verificarExistencia(result.recordset[i].nombre, i, result.recordset);
                            if(!existe) {
                                temp.push(result.recordset[i]);
                            }
                        };
                        this.setState({
                            campos: temp
                        });
                    });
                }
            });
        }); // fin transaction
    }

    verificarExistencia(nombre, index, arreglo) {
        if(index > 0) {
            for (var i = index-1; i >= 0; i--) {
                if(arreglo[i].nombre.localeCompare(nombre) == 0) {
                    return true;
                }
            };
        }
        return false;
    }

    eliminarCriterioDeterioro() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("delete CriterioDeterioro where ID = "+this.props.criterioDeterioro.ID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.showSuccesMessage("Exito", "Criterio de Deterioro eliminado con éxito.");
                        this.props.returnSelCrit();
                    });
                }
            });
        }); // fin transaction
    }

    showSuccesMessage(titulo, mensaje) {
        this.setState({
            mensajeModal: {mostrarMensaje: true, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: titulo, mensaje: mensaje}
        });
        let self = this;
        setTimeout(function(){
            self.setState({
                mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: ""}
            });
        }, 850);
    }

    dismissMessageModal() {
        this.setState({
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: ""}
        });
    }

    render() {
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
                                        <li className={"breadcrumb-item"} aria-current="page" onClick={this.props.returnSelCrit}><a href="#" className={"breadcrumb-link"}>Seleccionar Criterio de Deterioro</a></li>
                                        <li className={"breadcrumb-item active"} aria-current="page">Crear Criterio de Deterioro</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-sm-6 col-6"}>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-inline-block text-center"  style={{width: "100%"}}>
                                    <h2 className="text-muted">Categoria de Clasificaci&oacute;n</h2>
                                    <select id="categoriaClasificacionID" className={"form-control form-control-lg"} defaultValue={this.props.criterioDeterioro.categoriaClasPadre}>
                                        {this.state.categoriasClasificacion.map((categoriaClasificacion, i) => {
                                                return <option value={i} key={categoriaClasificacion.ID}>{categoriaClasificacion.categoria} | {categoriaClasificacion.tipoCredito}</option>
                                            }
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-6 col-6"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"d-inline-block text-center"} style={{width: "100%"}}>
                                    <h2 className="text-muted">Tipo de Crédito</h2>
                                    <select id="tipoCreditoID" className={"form-control form-control-lg"} defaultValue={this.props.criterioDeterioro.tipoDeCredito}>
                                        {this.state.tiposDeCredito.map((tipoDeCredito, i) => {
                                                return <option value={i} key={tipoDeCredito.ID}>{tipoDeCredito.nombre}</option>
                                            }
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-sm-6 col-6"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"d-inline-block text-center"} style={{width: "100%"}}>
                                    <h2 className="text-muted">Campo de Tipo de Garant&iacute;a</h2>
                                    <select id={"campo"} className={"form-control"} defaultValue={this.props.criterioDeterioro.campoTipoGarantia}>
                                        <option value="" key="0">Seleccione un campo...</option>
                                        {this.state.campos.map((campoSelect, k) =>
                                            <option value={campoSelect.ID} key={k}>{campoSelect.nombre}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-6 col-6"}>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-inline-block text-center"  style={{width: "100%"}}>
                                    <h2 className="text-muted">Tipo de Garant&iacute;a</h2>
                                    <input id="nombreTipoGarantia" type="text" className={"form-control"} style={{width: "100%"}} defaultValue={this.props.criterioDeterioro.tipoGarantia}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-sm-4 col-4"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"d-inline-block text-center"} style={{width: "100%"}}>
                                    <h2 className="text-muted">Estimacion por Deterioro</h2>
                                    <input id="porcentajeEstimacionDeterioro" type="text" className={"form-control"} style={{width: "100%"}} defaultValue={this.props.criterioDeterioro.estimacionDeterioro}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-4 col-4"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"d-inline-block text-center"} style={{width: "100%"}}>
                                    <h2 className="text-muted">Rango de Mora M&iacute;nimo</h2>
                                    <input id="inicioMora" type="text" className={"form-control"} style={{width: "100%"}} defaultValue={this.props.criterioDeterioro.inicioMora}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-4 col-4"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"d-inline-block text-center"} style={{width: "100%"}}>
                                    <h2 className="text-muted">Rango de Mora M&aacute;ximo</h2>
                                    <input id="finMora" type="text" className={"form-control"} style={{width: "100%"}} defaultValue={this.props.criterioDeterioro.finMora}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"text-center"}>
                    <a onClick={this.iniciarCriterioDeterioro} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Guardar</a>
                    <a onClick={this.eliminarCriterioDeterioro} className={"btn btn-danger col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Borrar</a>
                </div>
                <br/>
                { this.state.mensajeModal.mostrarMensaje ? (
                    <MessageModal esError={this.state.mensajeModal.esError} esConfirmar={this.state.mensajeModal.esConfirmar} dismissMessage={this.dismissMessageModal} confirmFunction={this.confirmMessageModal} titulo={this.state.mensajeModal.titulo} mensaje={this.state.mensajeModal.mensaje}> </MessageModal>
                ) : (
                    <span></span>
                )}
            </div>
        );
    }
}
