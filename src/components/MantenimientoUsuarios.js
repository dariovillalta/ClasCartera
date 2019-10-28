import React from 'react';
import sql from 'mssql';

import MessageModal from './MessageModal.js';

var tiposUsuarios = [{nombre: "Reportería", valor: "report"}, {nombre: "Cálculo de Clasificación", valor: "calculo"}, {nombre: "Administrador", valor: "admin"}];

export default class MantenimientoUsuarios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: -1, indiceX: -1}
        }
        this.loadUsuarios = this.loadUsuarios.bind(this);
        this.insertarUsuario = this.insertarUsuario.bind(this);
        this.dismissMessageModal = this.dismissMessageModal.bind(this);
        this.showSuccesMessage = this.showSuccesMessage.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        this.loadUsuarios();
    }

    loadUsuarios() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Usuarios", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            usuarios: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    insertarUsuario() {
        var nombreCompleto = $("#nombreCompleto").val();
        var usuario = $("#usuario").val();
        var contrasena = $("#contrasena").val();
        var tipoUsuario = $("#tipoUsuario").val();
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into Usuarios (nombreCompleto, usuario, contrasena, tipoUsuario) values ('"+nombreCompleto+"','"+usuario+"','"+contrasena+"','"+tipoUsuario+"')", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX}
                        });
                        this.showSuccesMessage("Exito", "Usuario creado con éxito.");
                        this.loadUsuarios();
                    });
                }
            });
        }); // fin transaction
    }

    deleteUser (idUsuario) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("delete from Usuarios where ID = "+idUsuario, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX}
                        });
                        this.showSuccesMessage("Exito", "Usuario eliminado con éxito.");
                        this.loadUsuarios();
                    });
                }
            });
        }); // fin transaction
    }

    /*======_______====== ======_______======   MENSAJES MODAL    ======_______====== ======_______======*/
    /*======_______======                                                             ======_______======*/
    /*======_______======                                                             ======_______======*/
    /*======_______====== ======_______====== ==_____==  ==___==  ======_______====== ======_______======*/

    dismissMessageModal() {
        this.setState({
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: -1, indiceX: -1}
        });
    }

    showSuccesMessage(titulo, mensaje) {
        this.setState({
            mensajeModal: {mostrarMensaje: true, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: titulo, mensaje: mensaje, banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX}
        });
        let self = this;
        setTimeout(function(){
            self.setState({
                mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: self.state.mensajeModal.idElementoSelec, indiceX: self.state.mensajeModal.indiceX}
            });
        }, 850);
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
                                        <li className={"breadcrumb-item active"} aria-current="page">Mantenimiento de Usuarios</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <h3>Crear Nueva Tabla</h3>
                                <div className={"row border-top"}>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Nombre Completo</label>
                                        <input id="nombreCompleto" type="text" className={"form-control"}/>
                                    </div>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Nombre de Usuario</label>
                                        <input id="usuario" type="text" className={"form-control"}/>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Contrase&ntilde;a</label>
                                        <input id="contrasena" type="password" className={"form-control"}/>
                                    </div>
                                    <div className="form-group col-xl-6 col-6">
                                        <form>
                                            <label className={"col-form-label"}>Tipo de Usuario</label>
                                            <div className="form-group" style={{width: "100%"}}>
                                                <select id="tipoUsuario" className="form-control" style={{width: "100%"}}>
                                                    {tiposUsuarios.map((tipoUsuario, i) =>
                                                        <option key={i} value={tipoUsuario.valor}>{tipoUsuario.nombre}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <button onClick={this.insertarUsuario} className={"btn btn-success btn-block col-xl-10 col-10"} style={{margin: "0 auto", display: "block"}}>Crear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nombre Completo</th>
                                            <th scope="col">Usuario</th>
                                            <th scope="col">Tipo de Usuario</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.usuarios.map((usuario, i) =>
                                            <tr key={usuario.ID}>
                                                <th scope="row">{i+1}</th>
                                                <td>{usuario.nombreCompleto}</td>
                                                <td>{usuario.usuario}</td>
                                                <td>{usuario.tipoUsuario}</td>
                                                <td><img onClick={() => this.deleteUser(usuario.ID)} src={"../assets/trash.png"} style={{height: "20px", width: "20px", cursor: 'pointer'}}></img></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                { this.state.mensajeModal.mostrarMensaje ? (
                    <MessageModal esError={this.state.mensajeModal.esError} esConfirmar={this.state.mensajeModal.esConfirmar} dismissMessage={this.dismissMessageModal} confirmFunction={this.confirmMessageModal} titulo={this.state.mensajeModal.titulo} mensaje={this.state.mensajeModal.mensaje}> </MessageModal>
                ) : (
                    <span></span>
                )}
            </div>
        );
    }
}
