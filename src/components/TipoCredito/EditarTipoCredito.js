import React from 'react';
import sql from 'mssql';

import ErrorMessage from '../ErrorMessage.js';
import MessageModal from '../MessageModal.js';
import InlineEdit from '../InlineEdit.js';

export default class EditarTipoCredito extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorCreacionTipoCredito: {campo: "", descripcion: "", mostrar: false},
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: ""}
        }
        this.guardarTipoCredito = this.guardarTipoCredito.bind(this);
        this.dismissTypeCreditNewError = this.dismissTypeCreditNewError.bind(this);
        this.showSuccesMessage = this.showSuccesMessage.bind(this);
        this.dismissMessageModal = this.dismissMessageModal.bind(this);
        this.eliminarTipoCredito = this.eliminarTipoCredito.bind(this);
    }

    guardarTipoCredito() {
        let nombre = $("#nombreTipoCredito").val();
        if(nombre == undefined)
            nombre = $("#nombreTipoCredito").text();
        let descripcion = $("#descripcionTipoCredito").val();
        let tipoCreditoPadreID = $("#tipoCreditoID").val();
        if(tipoCreditoPadreID == null || tipoCreditoPadreID.toString().length == 0 || tipoCreditoPadreID == "null") {
            tipoCreditoPadreID = -1;
        }
        if(nombre.length > 0 && nombre.length < 41) {
            if(descripcion.length < 701) {
                if(!isNaN(tipoCreditoPadreID)) {
                    const transaction = new sql.Transaction( this.props.pool );
                    transaction.begin(err => {
                        var rolledBack = false;
                        transaction.on('rollback', aborted => {
                            rolledBack = true;
                        });
                        const request = new sql.Request(transaction);
                        request.query("update TipoCredito set nombre = '"+nombre+"', descripcion = '"+descripcion+"', tipoCreditoPadreID = "+tipoCreditoPadreID+" where ID = "+this.props.tipoCredito.ID, (err, result) => {
                            if (err) {
                                if (!rolledBack) {
                                    console.log(err);
                                    transaction.rollback(err => {
                                    });
                                }
                            } else {
                                transaction.commit(err => {
                                    this.showSuccesMessage("Exito", "Tipo de crédito modificado con éxito.");
                                    this.setState({
                                        errorCreacionTipoCredito: {campo: '', descripcion: '', mostrar: false}
                                    });
                                    this.props.loadTypeCredit();
                                });
                            }
                        });
                    }); // fin transaction
                } else {
                    let campo = "Tipo Credito Padre";
                    let descripcionN;
                    if(isNaN(tipoCreditoPadreID))
                        descripcionN = "El campo debe ser un número válido.";
                    this.setState({
                        errorCreacionTipoCredito: {campo: campo, descripcion: descripcionN, mostrar: true}
                    });
                }
            } else {
                let campo = "Descripción";
                let descripcionN;
                if(descripcion.length > 700)
                    descripcionN = "El campo debe tener una longitud menor a 700.";
                this.setState({
                    errorCreacionTipoCredito: {campo: campo, descripcion: descripcionN, mostrar: true}
                });
            }
        } else {
            let campo = "Nombre";
            let descripcion;
            if(nombre.length == 0)
                descripcion = "El campo debe tener una longitud mayor a 0.";
            else if(guardarCampo.length > 700)
                descripcion = "El campo debe tener una longitud menor a 700.";
            this.setState({
                errorCreacionTipoCredito: {campo: campo, descripcion: descripcion, mostrar: true}
            });
        }
    }

    eliminarTipoCredito() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("delete from TipoCredito where ID = "+this.props.tipoCredito.ID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.showSuccesMessage("Exito", "Tipo de crédito eliminado con éxito.");
                        this.setState({
                            errorCreacionTipoCredito: {campo: '', descripcion: '', mostrar: false}
                        }, this.props.retornoSelCreditos);
                        this.props.loadTypeCredit();
                    });
                }
            });
        }); // fin transaction
    }

    dismissTypeCreditNewError() {
        this.setState({
            errorCreacionTipoCredito: {campo: "", descripcion: "", mostrar: false}
        });
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
                                        <li className={"breadcrumb-item"} aria-current="page" onClick={this.props.retornoSelCreditos}><a href="#" className={"breadcrumb-link"}>Seleccionar Tipo de Cr&eacute;dito</a></li>
                                        <li className={"breadcrumb-item active"} aria-current="page">Editar Tipo de Cr&eacute;dito</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-12"}>
                        <div className={"card"} style={{width: "100%"}}>
                            <div className={"card-body"} style={{width: "100%"}}>
                                <div className={"d-inline-block text-center form-group"} style={{width: "100%"}}>
                                    <h2 className="text-muted">Nombre</h2>
                                    <input id="nombreTipoCredito" type="text" defaultValue={this.props.tipoCredito.nombre} className={"form-control"}  style={{width: "100%"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-xl-12 col-12"}>
                        <div className={"card"} style={{width: "100%"}}>
                            <div className={"card-body"} style={{width: "100%"}}>
                                <div className={"d-inline-block text-center form-group"} style={{width: "100%"}}>
                                    <h2 className="text-muted">Descripci&oacute;n</h2>
                                    <textarea id="descripcionTipoCredito" type="text" style={{width: "100%"}} className={"form-control"} defaultValue={this.props.tipoCredito.descripcion}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-xl-12 col-12"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"d-inline-block text-center"} style={{width: "100%"}}>
                                    <h2 className="text-muted">Tipo de Crédito Padre</h2>
                                    <select id="tipoCreditoID" className={"form-control form-control-lg"} defaultValue={this.props.tipoCredito.tipoCreditoPadreID}>
                                        <option value="null">Ninguno</option>
                                        {this.props.tipoCreditos.map((tipoDeCredito, i) => {
                                                return <option value={tipoDeCredito.ID} key={tipoDeCredito.ID}>{tipoDeCredito.nombre}</option>
                                            }
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                { this.state.errorCreacionTipoCredito.mostrar ? (
                    <ErrorMessage campo={this.state.errorCreacionTipoCredito.campo} descripcion={this.state.errorCreacionTipoCredito.descripcion} dismissTableError={this.dismissTypeCreditNewError}> </ErrorMessage>
                ) : (
                    <span></span>
                )}
                <div className={"text-center"}>
                    <a onClick={this.guardarTipoCredito} className={"btn btn-primary col-xs-5 col-5"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold", margin: "0% 0% 0% 1%"}}>Guardar</a>
                    { !this.props.tipoCredito.tipoCreditoPadreID != -1 ? (
                        <a onClick={() => this.props.seleccionarCredito(this.props.tipoCredito.ID, this.props.tipoCredito.nombre)} className={"btn btn-info col-xs-5 col-5"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold", margin: "0% 1% 0% 0%"}}>Configurar Variables</a>
                    ) : (
                        <span></span>
                    )}
                </div>
                <br/>
                <div className={"text-center"}>
                    <a onClick={this.eliminarTipoCredito} className={"btn btn-danger col-xs-5 col-5"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold", margin: "0% 0% 0% 1%"}}>Borrar</a>
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
