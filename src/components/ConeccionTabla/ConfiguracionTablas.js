import React from 'react';
import sql from 'mssql';

import ErrorMessage from '../ErrorMessage.js';
import MessageModal from '../MessageModal.js';

const campos = [ {nombre: "varchar"}, {nombre: "bit"}, {nombre: "date"}, {nombre: "int"} ];
let funciones = [ {funcion: "idCliente", texto: "ID de Cliente"}, {funcion: "fecha", texto: "fecha"}, {nombre: "date"}, {nombre: "int"} ];
const funcionesTablas = [{nombre: "Otro"}, {nombre: "Pagos de Préstamos"}, {nombre: "Plan de Pagos"}];

export default class ConfiguracionTablas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tablas: [],
            errorCreacionTabla: {campo: "", descripcion: "", mostrar: false},
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: -1, indiceX: -1, indiceY: -1}
        }
        this.loadTables = this.loadTables.bind(this);
        this.insertTable = this.insertTable.bind(this);
        this.deleteTableConfirmation = this.deleteTableConfirmation.bind(this);
        this.deleteTable = this.deleteTable.bind(this);
        this.dismissTableNewError = this.dismissTableNewError.bind(this);
        this.dismissMessageModal = this.dismissMessageModal.bind(this);
        this.confirmMessageModal = this.confirmMessageModal.bind(this);
        this.showSuccesMessage = this.showSuccesMessage.bind(this);
    }
    /* mensajeModal <- de state
        //mostrarMensaje:bandera para mostrar modal mensaje en pantalla
        //mensajeConfirmado:retorno del modal mensaje si fue conf
        //esError:bandera para ver que tipo de modal mensaje mostrar
        //esConfirmar:bandera para ver que tipo de modal mensaje mostrar
        //titulo:titulo del modal
        //mensaje:mensaje del modal
        //banderaMetodoInit:variable para ver a que metodo ir cuando regresa de confirmar el modal
        //idElementoSelec:id del elemento que mostro el modal mensaje
        //indiceX:posicion de la tabla en el arreglo que mostro el modal mensaje
        //indiceY:posicion del campo en el arreglo de tablas que mostro el modal mensaje
    */

    componentDidMount() {
        this.loadTables();
    }

    loadTables() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Tablas", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            tablas: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    insertTable() {
        let nombreTabla = $("#nombreTablaNuevo").val();
        let usuarioTabla = $("#usuarioTablaNuevo").val();
        let contrasenaTabla = $("#contrasenaTablaNuevo").val();
        let servidorTabla = $("#servidorTablaNuevo").val();
        let basedatosTabla = $("#basedatosTablaNuevo").val();
        let tablaTabla = $("#tablaTablaNuevo").val();
        let funcionTabla = $("#funcionTabla").val();
        if(nombreTabla.length > 0 && nombreTabla.length < 71) {
            if(usuarioTabla.length > 0 && usuarioTabla.length < 51) {
                if(contrasenaTabla.length > 0 && contrasenaTabla.length < 201) {
                    if(servidorTabla.length > 0 && servidorTabla.length < 51) {
                        if(basedatosTabla.length > 0 && basedatosTabla.length < 51) {
                            if(tablaTabla.length > 0 && tablaTabla.length < 71) {
                                if(tablaTabla.length > 0 && tablaTabla.length < 71) {
                                    this.setState({
                                        errorCreacionTabla: {campo: "", descripcion: "", mostrar: false}
                                    });
                                    const transaction = new sql.Transaction( this.props.pool );
                                    transaction.begin(err => {
                                        var rolledBack = false;
                                        transaction.on('rollback', aborted => {
                                            rolledBack = true;
                                        });
                                        const request = new sql.Request(transaction);
                                        request.query("insert into Tablas (Nombre, Usuario, Contrasena, Servidor, BaseDatos, Tabla, Funcion) values ('"+nombreTabla+"','"+usuarioTabla+"','"+contrasenaTabla+"','"+servidorTabla+"','"+basedatosTabla+"','"+tablaTabla+"','"+funcionTabla+"')", (err, result) => {
                                            if (err) {
                                                if (!rolledBack) {
                                                    console.log(err);
                                                    transaction.rollback(err => {
                                                    });
                                                }
                                            } else {
                                                transaction.commit(err => {
                                                    this.showSuccesMessage("Exito", "Tabla creada con éxito.");
                                                    this.loadTables();
                                                });
                                            }
                                        });
                                    }); // fin transaction
                                } else {
                                    let campo = "Función de la Tabla";
                                    let descripcion;
                                    if(funcionTabla.length == 0)
                                        descripcion = "El campo debe tener una longitud mayor a 0.";
                                    else
                                        descripcion = "El campo debe tener una longitud menor a 31.";
                                    this.setState({
                                        errorCreacionTabla: {campo: campo, descripcion: descripcion, mostrar: true}
                                    });
                                }
                            } else {
                                let campo = "Nombre de la Tabla";
                                let descripcion;
                                if(tablaTabla.length == 0)
                                    descripcion = "El campo debe tener una longitud mayor a 0.";
                                else
                                    descripcion = "El campo debe tener una longitud menor a 71.";
                                this.setState({
                                    errorCreacionTabla: {campo: campo, descripcion: descripcion, mostrar: true}
                                });
                            }
                        } else {
                            let campo = "Base de Datos de la Tabla";
                            let descripcion;
                            if(basedatosTabla.length == 0)
                                descripcion = "El campo debe tener una longitud mayor a 0.";
                            else
                                descripcion = "El campo debe tener una longitud menor a 51.";
                            this.setState({
                                errorCreacionTabla: {campo: campo, descripcion: descripcion, mostrar: true}
                            });
                        }
                    } else {
                        let campo = "Servidor de la Tabla";
                        let descripcion;
                        if(servidorTabla.length == 0)
                            descripcion = "El campo debe tener una longitud mayor a 0.";
                        else
                            descripcion = "El campo debe tener una longitud menor a 51.";
                        this.setState({
                            errorCreacionTabla: {campo: campo, descripcion: descripcion, mostrar: true}
                        });
                    }
                } else {
                    let campo = "Contraseña de la Tabla";
                    let descripcion;
                    if(contrasenaTabla.length == 0)
                        descripcion = "El campo debe tener una longitud mayor a 0.";
                    else
                        descripcion = "El campo debe tener una longitud menor a 201.";
                    this.setState({
                        errorCreacionTabla: {campo: campo, descripcion: descripcion, mostrar: true}
                    });
                }
            } else {
                let campo = "Usuario de la Tabla";
                let descripcion;
                if(usuarioTabla.length == 0)
                    descripcion = "El campo debe tener una longitud mayor a 0.";
                else
                    descripcion = "El campo debe tener una longitud menor a 51.";
                this.setState({
                    errorCreacionTabla: {campo: campo, descripcion: descripcion, mostrar: true}
                });
            }
        } else {
            let campo = "Nombre de la Conección";
            let descripcion;
            if(nombreTabla.length == 0)
                descripcion = "El campo debe tener una longitud mayor a 0.";
            else
                descripcion = "El campo debe tener una longitud menor a 71.";
            this.setState({
                errorCreacionTabla: {campo: campo, descripcion: descripcion, mostrar: true}
            });
        }
    }

    deleteTableConfirmation(id, x) {
        this.setState({
            mensajeModal: {mostrarMensaje: true, mensajeConfirmado: false, esError: false, esConfirmar: true, titulo: "Confirmación", mensaje: "Esta seguro que desea eliminar la tabla?", banderaMetodoInit: "goDelTable", idElementoSelec: id, indiceX: x, indiceY: -1}
        });
    }

    deleteTable(id) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("delete from Tablas where ID = "+id, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        // 1. Make a shallow copy of the items
                        let tablas = [...this.state.tablas];
                        // 3. Replace the property you're intested in
                        tablas.splice(this.state.mensajeModal.indiceX, 1);
                        // 5. Set the state to our new copy
                        //this.loadTables();
                        this.setState({
                            tablas: tablas,
                            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
                        });
                        this.showSuccesMessage("Exito", "Tabla eliminada con éxito.");
                        /*this.setState({
                            tablas: quitando tabla,
                            mensajeModal: limpiando variables del modal
                        });*/
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
            request2.query("delete from Campos where tablaID = "+id, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction2.rollback(err => {
                        });
                    }
                } else {
                    transaction2.commit(err => {
                    });
                }
            });
        }); // fin transaction2
    }


    /*======_______====== ======_______======   MENSAJES ERROR DE CAMPOS    ======_______====== ======_______======*/
    /*======_______======                                                                       ======_______======*/
    /*======_______======                                                                       ======_______======*/
    /*======_______====== ======_______====== ====_____====  ====_____====  ======_______====== ======_______======*/

    dismissTableNewError() {
        this.setState({
            errorCreacionTabla: {campo: "", descripcion: "", mostrar: false}
        });
    }

    /*======_______====== ======_______======   MENSAJES MODAL    ======_______====== ======_______======*/
    /*======_______======                                                             ======_______======*/
    /*======_______======                                                             ======_______======*/
    /*======_______====== ======_______====== ==_____==  ==___==  ======_______====== ======_______======*/

    dismissMessageModal() {
        this.setState({
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: -1, indiceX: -1, indiceY: -1}
        });
    }

    confirmMessageModal() {
        if(this.state.mensajeModal.banderaMetodoInit.localeCompare("goDelTable") == 0) {
            let copiaID = this.state.mensajeModal.idElementoSelec;
            this.deleteTable(copiaID);
        }
    }

    showSuccesMessage(titulo, mensaje) {
        this.setState({
            mensajeModal: {mostrarMensaje: true, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: titulo, mensaje: mensaje, banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
        });
        let self = this;
        setTimeout(function(){
            self.setState({
                mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: self.state.mensajeModal.idElementoSelec, indiceX: self.state.mensajeModal.indiceX, indiceY: self.state.mensajeModal.indiceY}
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
                                        <li className={"breadcrumb-item active"} aria-current="page">Tablas</li>
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
                                        <label className={"col-form-label"}>Nombre de la Conecci&oacute;n</label>
                                        <input id="nombreTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Usuario de la Tabla</label>
                                        <input id="usuarioTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Contrase&ntilde;a de la Tabla</label>
                                        <input id="contrasenaTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Servidor de la Tabla</label>
                                        <input id="servidorTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Base de Datos de la Tabla</label>
                                        <input id="basedatosTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Nombre de la Tabla</label>
                                        <input id="tablaTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}}>
                                        <form style={{width: "90%"}}>
                                            <label className={"col-form-label"}>Función de la Tabla</label>
                                            <div className="form-group" style={{width: "100%"}}>
                                                <select id="funcionTabla" className="form-control" style={{width: "100%"}}>
                                                    {funcionesTablas.map((funcionTabla, i) =>
                                                        <option key={i} value={funcionTabla.nombre}>{funcionTabla.nombre}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                { this.state.errorCreacionTabla.mostrar ? (
                                    <ErrorMessage campo={this.state.errorCreacionTabla.campo} descripcion={this.state.errorCreacionTabla.descripcion} dismissTableError={this.dismissTableNewError}> </ErrorMessage>
                                ) : (
                                    <span></span>
                                )}
                                <div className={"row"}>
                                    <button onClick={this.insertTable} className={"btn btn-success btn-block col-xl-10 col-10"} style={{margin: "0 auto", display: "block"}}>Crear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.tablas.map((tabla, i) => (
                    <div key={tabla.ID} className={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <div className="card-header bg-primary p-3" style={{width: "100%"}}>
                                <h4 className="mb-0 text-white" style={{display: "inline"}}> {tabla.nombre} </h4>
                                <div style={{float: "right", border: "2px solid #000", cursor: "pointer"}}>
                                    <img onClick={() => this.deleteTableConfirmation(tabla.ID, i)} src={"../assets/trash.png"} style={{height: "20px", width: "20px"}}></img>
                                </div>
                                <div style={{float: "right", border: "2px solid #000", marginRight: "10px", cursor: "pointer"}}>
                                    <img onClick={() => this.props.terminoSeleccionTabla(tabla.ID, tabla.nombre)} src={"../assets/edit.png"} style={{height: "20px", width: "20px"}}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                { this.state.mensajeModal.mostrarMensaje ? (
                    <MessageModal esError={this.state.mensajeModal.esError} esConfirmar={this.state.mensajeModal.esConfirmar} dismissMessage={this.dismissMessageModal} confirmFunction={this.confirmMessageModal} titulo={this.state.mensajeModal.titulo} mensaje={this.state.mensajeModal.mensaje}> </MessageModal>
                ) : (
                    <span></span>
                )}
            </div>
        );
    }
}
