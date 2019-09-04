import React from 'react';
import sql from 'mssql';

import InlineEdit from '../InlineEdit.js';
import ErrorMessage from '../ErrorMessage.js';
import MessageModal from '../MessageModal.js';

const campos = [ {nombre: "varchar"}, {nombre: "bit"}, {nombre: "date"}, {nombre: "int"} ];
const tablas = [ {nombre: "Cliente"}, {nombre: "Préstamo"}, {nombre: "Pagos"}, {nombre: "Plan de Pagos"} ];
const funciones = [ {nombre: "Identificador"}, {nombre: "Otro"} ];
//let funciones = [ {funcion: "idCliente", texto: "ID de Cliente"}, {funcion: "fecha", texto: "fecha"}, {nombre: "date"}, {nombre: "int"} ];

export default class ConfiguracionCampos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            camposDeTabla: [],
            errorCreacionCampo: {campo: "", descripcion: "", mostrar: false},
            errorModificarCampo: {campo: "", descripcion: "", mostrar: false},
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: -1, indiceX: -1}
        }
        this.loadFields = this.loadFields.bind(this);
        this.insertField = this.insertField.bind(this);
        this.updateFieldsConfirmation = this.updateFieldsConfirmation.bind(this);
        this.updateField = this.updateField.bind(this);
        this.deleteFieldsConfirmation = this.deleteFieldsConfirmation.bind(this);
        this.deleteField = this.deleteField.bind(this);
        this.dismissFieldNewError = this.dismissFieldNewError.bind(this);
        this.dismissFieldEditError = this.dismissFieldEditError.bind(this);
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
        this.loadFields();
    }

    loadFields() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Campos where tablaID = "+this.props.idTablaSeleccionada, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            camposDeTabla: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    insertField() {
        let idTabla = this.props.idTablaSeleccionada;
        let campoNombre = $("#campoNombre").val();
        let tipoCampo = $("#campoTipo").val();
        let tablaCampo = $("#campoTabla").val();
        let funcionCampo = $("#campoFuncion").val();
        let guardarCampo;
        if ($("#campoGuardar").is(':checked'))
            guardarCampo = true;
        else
            guardarCampo = false;
        if(!isNaN(idTabla) && idTabla.toString().length > 0) {
            if(campoNombre.length > 0 && campoNombre.length < 41) {
                if(tablaCampo.length > 0 && tablaCampo.length < 11) {
                    if(funcionCampo.length > 0 && funcionCampo.length < 16) {
                        if(tipoCampo.length > 0 && tipoCampo.length < 26) {
                            if(guardarCampo != undefined) {
                                this.setState({
                                    errorCreacionCampo: {campo: "", descripcion: "", mostrar: false}
                                });
                                const transaction = new sql.Transaction( this.props.pool );
                                transaction.begin(err => {
                                    var rolledBack = false;
                                    transaction.on('rollback', aborted => {
                                        rolledBack = true;
                                    });
                                    const request = new sql.Request(transaction);
                                    request.query("insert into Campos (tablaID, nombre, tipo, tabla, funcion, guardar) values ("+idTabla+",'"+campoNombre+"','"+tipoCampo+"','"+tablaCampo+"','"+funcionCampo+"','"+guardarCampo+"')", (err, result) => {
                                        if (err) {
                                            if (!rolledBack) {
                                                console.log(err);
                                                transaction.rollback(err => {
                                                });
                                            }
                                        } else {
                                            transaction.commit(err => {
                                                this.loadFields();
                                                this.setState({
                                                    mensajeModal: {mostrarMensaje: true, mensajeConfirmado: this.state.mensajeModal.mostrarMensaje, esError: false, esConfirmar: false, titulo: "Exito", mensaje: "Campo creado con éxito.", banderaMetodoInit: "", idElementoSelec: -1, indiceX: -1}
                                                });
                                                this.showSuccesMessage("Exito", "Campo creado con éxito.");
                                                /* mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: -1, indiceX: -1, indiceY: -1} */
                                            });
                                        }
                                    });
                                }); // fin transaction
                            } else {
                                let campo = "Guardar Campo";
                                let descripcion;
                                if(guardarCampo.length == 0)
                                    descripcion = "El campo debe ser ingresado.";
                                this.setState({
                                    errorCreacionCampo: {campo: campo, descripcion: descripcion, mostrar: true}
                                });
                            }
                        } else {
                            let campo = "Tipo de Campo";
                            let descripcion;
                            if(tipoCampo.length == 0)
                                descripcion = "El campo debe tener una longitud mayor a 0.";
                            else
                                descripcion = "El campo debe tener una longitud menor a 26.";
                            this.setState({
                                errorCreacionCampo: {campo: campo, descripcion: descripcion, mostrar: true}
                            });
                        }
                    } else {
                        let campo = "Función del Campo";
                        let descripcion;
                        if(funcionCampo.length == 0)
                            descripcion = "El campo debe tener una longitud mayor a 0.";
                        else
                            descripcion = "El campo debe tener una longitud menor a 16.";
                        this.setState({
                            errorCreacionCampo: {campo: campo, descripcion: descripcion, mostrar: true}
                        });
                    }
                } else {
                    let campo = "Tabla del Campo";
                    let descripcion;
                    if(tablaCampo.length == 0)
                        descripcion = "El campo debe tener una longitud mayor a 0.";
                    else
                        descripcion = "El campo debe tener una longitud menor a 11.";
                    this.setState({
                        errorCreacionCampo: {campo: campo, descripcion: descripcion, mostrar: true}
                    });
                }
            } else {
                let campo = "Nombre de Campo";
                let descripcion;
                if(campoNombre.length == 0)
                    descripcion = "El campo debe tener una longitud mayor a 0.";
                else
                    descripcion = "El campo debe tener una longitud menor a 41.";
                this.setState({
                    errorCreacionCampo: {campo: campo, descripcion: descripcion, mostrar: true}
                });
            }
        } else {
            let campo = "ID de tabla/conección";
            let descripcion = "Ingrese un número válido.";
            this.setState({
                errorCreacionCampo: {campo: campo, descripcion: descripcion, mostrar: true}
            });
        }
    }

    updateFieldsConfirmation(id, x) {
        this.setState({
            mensajeModal: {mostrarMensaje: true, mensajeConfirmado: false, esError: false, esConfirmar: true, titulo: "Confirmación", mensaje: "Esta seguro que desea modificar el campo?", banderaMetodoInit: "goUpdField", idElementoSelec: id, indiceX: x}
        });
    }

    updateField(id, index) {
        let idTabla = this.props.idTablaSeleccionada;
        let campoNombre;
        if($("#campoNombre"+index).length > 0) {
            campoNombre = $("#campoNombre"+index).val();
        } else {
            campoNombre = this.state.camposDeTabla[index].nombre;
        }
        let tablaCampo = $("#campoTabla"+index).val();
        let funcionCampo = $("#campoFuncion"+index).val();
        let tipoCampo = $("#campoTipo"+index).val();
        let guardarCampo;
        if ($("#campoGuardar"+index).is(':checked'))
            guardarCampo = true;
        else
            guardarCampo = false;
        if(!isNaN(idTabla) && idTabla.toString().length > 0) {
            if(campoNombre.length > 0 && campoNombre.length < 41) {
                if(tablaCampo.length > 0 && tablaCampo.length < 11) {
                    if(funcionCampo.length > 0 && funcionCampo.length < 16) {
                        if(tipoCampo.length > 0 && tipoCampo.length < 26) {
                            if(guardarCampo != undefined) {
                                this.setState({
                                    errorModificarCampo: {campo: "", descripcion: "", mostrar: false}
                                });
                                const transaction = new sql.Transaction( this.props.pool );
                                transaction.begin(err => {
                                    var rolledBack = false;
                                    transaction.on('rollback', aborted => {
                                        rolledBack = true;
                                    });
                                    const request = new sql.Request(transaction);
                                    request.query("update Campos set tablaID = "+idTabla+", nombre = '"+campoNombre+"', tipo = '"+tipoCampo+"', guardar = '"+guardarCampo+"', tabla = '"+tablaCampo+"', funcion = '"+funcionCampo+"' where ID = "+id, (err, result) => {
                                        if (err) {
                                            if (!rolledBack) {
                                                console.log(err);
                                                this.setState({
                                                    mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX}
                                                });
                                                transaction.rollback(err => {
                                                });
                                            }
                                        } else {
                                            transaction.commit(err => {
                                                // 1. Make a shallow copy of the items
                                                let campos = [...this.state.camposDeTabla];
                                                // 2. Make a shallow copy of the item you want to mutate
                                                let campo = [...campos[index]];
                                                // 3. Replace the property you're intested in
                                                campo = {ID: campo.ID, idTabla: idTabla, nombre: campoNombre, tipo: tipoCampo, guardar: guardarCampo};
                                                // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                                                campos[index] = campo;
                                                // 5. Set the state to our new copy
                                                //this.loadTables();
                                                this.setState({
                                                    camposDeTabla: campos,
                                                    mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX}
                                                });
                                                this.showSuccesMessage("Exito", "Campo modificado con éxito.");
                                            });
                                        }
                                    });
                                }); // fin transaction
                            } else {
                                let campo = "Guardar Campo";
                                let descripcion;
                                if(guardarCampo.length == 0)
                                    descripcion = "El campo debe ser ingresado.";
                                this.setState({
                                    errorModificarCampo: {campo: campo, descripcion: descripcion, mostrar: true},
                                    mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX}
                                });
                                /*this.setState({
                                    mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
                                });*/
                            }
                        } else {
                            let campo = "Tipo de Campo";
                            let descripcion;
                            if(tipoCampo.length == 0)
                                descripcion = "El campo debe tener una longitud mayor a 0.";
                            else
                                descripcion = "El campo debe tener una longitud menor a 26.";
                            this.setState({
                                errorModificarCampo: {campo: campo, descripcion: descripcion, mostrar: true},
                                mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX}
                            });
                            /*this.setState({
                                mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
                            });*/
                        }
                    } else {
                        let campo = "Función del Campo";
                        let descripcion;
                        if(funcionCampo.length == 0)
                            descripcion = "El campo debe tener una longitud mayor a 0.";
                        else
                            descripcion = "El campo debe tener una longitud menor a 16.";
                        this.setState({
                            errorModificarCampo: {campo: campo, descripcion: descripcion, mostrar: true},
                            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX}
                        });
                        /*this.setState({
                            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
                        });*/
                    }
                } else {
                    let campo = "Tabla del Campo";
                    let descripcion;
                    if(tablaCampo.length == 0)
                        descripcion = "El campo debe tener una longitud mayor a 0.";
                    else
                        descripcion = "El campo debe tener una longitud menor a 11.";
                    this.setState({
                        errorModificarCampo: {campo: campo, descripcion: descripcion, mostrar: true},
                        mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX}
                    });
                    /*this.setState({
                        mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
                    });*/
                }
            } else {
                let campo = "Nombre de Campo";
                let descripcion;
                if(campoNombre.length == 0)
                    descripcion = "El campo debe tener una longitud mayor a 0.";
                else
                    descripcion = "El campo debe tener una longitud menor a 41.";
                this.setState({
                    errorModificarCampo: {campo: campo, descripcion: descripcion, mostrar: true},
                    mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX}
                });
                /*this.setState({
                    mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
                });*/
            }
        } else {
            let campo = "ID de nombre de tabla/conección";
            let descripcion = "Ingrese un número válido.";
            this.setState({
                errorModificarCampo: {campo: campo, descripcion: descripcion, mostrar: true},
                mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX}
            });
            /*this.setState({
                mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
            });*/
        }
    }

    deleteFieldsConfirmation(id, x) {
        this.setState({
            mensajeModal: {mostrarMensaje: true, mensajeConfirmado: false, esError: false, esConfirmar: true, titulo: "Confirmación", mensaje: "Esta seguro que desea eliminar el campo?", banderaMetodoInit: "goDelField", idElementoSelec: id, indiceX: x}
        });
    }

    deleteField(id) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("delete from Campos where ID = "+id, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        this.setState({
                            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX}
                        });
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        let campos = [...this.state.camposDeTabla];
                        campos.splice(this.state.mensajeModal.indiceX, 1);
                        //this.loadTables();
                        this.setState({
                            camposDeTabla: campos,
                            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX}
                        });
                        this.showSuccesMessage("Exito", "Campo eliminado con éxito.");
                        /*this.setState({
                            camposDeTabla: quitando tabla,
                            mensajeModal: limpiando variables del modal
                        });*/
                    });
                }
            });
        }); // fin transaction
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

    dismissFieldNewError() {
        this.setState({
            errorCreacionCampo: {campo: "", descripcion: "", mostrar: false}
        });
    }

    dismissFieldEditError() {
        this.setState({
            errorModificarCampo: {campo: "", descripcion: "", mostrar: false}
        });
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

    confirmMessageModal() {
        if(this.state.mensajeModal.banderaMetodoInit.localeCompare("goDelTable") == 0) {
            let copiaID = this.state.mensajeModal.idElementoSelec;
            this.deleteTable(copiaID);
        } else if(this.state.mensajeModal.banderaMetodoInit.localeCompare("goDelField") == 0) {
            let copiaID = this.state.mensajeModal.idElementoSelec;
            this.deleteField(copiaID);
        } else if(this.state.mensajeModal.banderaMetodoInit.localeCompare("goUpdField") == 0) {
            let copiaID = this.state.mensajeModal.idElementoSelec;
            this.updateField(copiaID, this.state.mensajeModal.indiceX, this.state.mensajeModal.indiceY);
        }
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
                                        <li className={"breadcrumb-item"} aria-current="page" onClick={this.props.retornoSeleccionTabla}><a href="#" className={"breadcrumb-link"}>Tablas</a></li>
                                        <li className={"breadcrumb-item active"} aria-current="page">Campos</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"border-top alert alert-primary"} style={{margin: "3% 0%"}}>
                    <div className={"row"}>
                        <div className={"form-group col-xl-6 col-6"}>
                            <h4 className={"col-form-label text-center"}>Tabla</h4>
                            <h4 style={{fontFamily: 'Circular Std Medium', color: "#71748d"}} className={"alert-heading"} >{this.props.nombreTablaSeleccionada}</h4>
                        </div>
                        <div className={"form-group col-xl-6 col-6"}>
                            <h4 className={"col-form-label text-center"}>Nombre de Campo</h4>
                            <input id={"campoNombre"} type="text" className={"form-control"}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-xl-6 col-6"}>
                            <h4 className={"col-form-label text-center"}>Tabla</h4>
                            <select id={"campoTabla"} className={"form-control"} /*onChange={this.checkFieldType.bind(this)}*/>
                                <option value="" key="0">Seleccione a que objeto pertenece el campo...</option>
                                {tablas.map((campo, k) =>
                                    <option value={campo.nombre} key={k}>{campo.nombre}</option>
                                )}
                            </select>
                        </div>
                        <div className={"form-group col-xl-6 col-6"}>
                            <h4 className={"col-form-label text-center"}>Función de Variable</h4>
                            <select id={"campoFuncion"} className={"form-control"} /*onChange={this.checkFieldType.bind(this)}*/>
                                <option value="" key="0">Seleccione una función del campo...</option>
                                {funciones.map((campo, k) =>
                                    <option value={campo.nombre} key={k}>{campo.nombre}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-xl-6 col-6"}>
                            <h4 className={"col-form-label text-center"}>Tipo de Variable</h4>
                            <select id={"campoTipo"} className={"form-control"} /*onChange={this.checkFieldType.bind(this)}*/>
                                <option value="" key="0">Seleccione un tipo de variable...</option>
                                {campos.map((campo, k) =>
                                    <option value={campo.nombre} key={k}>{campo.nombre}</option>
                                )}
                            </select>
                        </div>
                        <div className={"form-group col-xl-6 col-6"}>
                            <h4 className={"col-form-label text-center"}>Guardar Campo en Resultados</h4>
                            <div className={"switch-button switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                                <input type="checkbox" defaultChecked name={"campoGuardar"} id={"campoGuardar"}/><span>
                                <label htmlFor={"campoGuardar"}></label></span>
                            </div>
                        </div>
                    </div>
                    { this.state.errorCreacionCampo.mostrar ? (
                        <ErrorMessage campo={this.state.errorCreacionCampo.campo} descripcion={this.state.errorCreacionCampo.descripcion} dismissTableError={this.dismissFieldNewError}> </ErrorMessage>
                    ) : (
                        <span></span>
                    )}
                    <div className={"row"}>
                        <button onClick={() => this.insertField()} className={"btn btn-light btn-block col-xl-10 col-10"} style={{margin: "0 auto", display: "block"}}>Crear</button>
                    </div>
                </div>

                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        {this.state.camposDeTabla.map((campo, i) => (
                            <div key={campo.ID} className={"border-top alert alert-primary"} style={{padding: "1% 3%"}}>
                                <div className={"row"}>
                                    <div className={"form-group col-xl-6 col-6"}>
                                        <h4 className={"col-form-label text-center"}>Tabla</h4>
                                        <h4 style={{fontFamily: 'Circular Std Medium', color: "#71748d"}} className={"alert-heading"} >{this.props.nombreTablaSeleccionada}</h4>
                                    </div>
                                    <div className={"form-group col-xl-6 col-6"}>
                                        <h4 className={"col-form-label text-center"}>Nombre de Campo</h4>
                                        <InlineEdit id={"campoNombre"+i} texto={campo.nombre}> </InlineEdit>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="form-group col-xl-6 col-6">
                                        <h4 className={"col-form-label text-center"}>Tabla</h4>
                                        <select id={"campoTabla"+i} className={"form-control"} defaultValue={campo.tabla}>
                                            <option value="" key="0">Seleccione a que objeto pertenece el campo...</option>
                                            {tablas.map((campoSelect, k) =>
                                                <option value={campoSelect.nombre} key={k}>{campoSelect.nombre}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="form-group col-xl-6 col-6">
                                        <h4 className={"col-form-label text-center"}>Función de Variable</h4>
                                        <select id={"campoFuncion"+i} className={"form-control"} defaultValue={campo.funcion}>
                                            <option value="" key="0">Seleccione una función del campo...</option>
                                            {funciones.map((campoSelect, k) =>
                                                <option value={campoSelect.nombre} key={k}>{campoSelect.nombre}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="form-group col-xl-6 col-6">
                                        <h4 className={"col-form-label text-center"}>Tipo de Variable</h4>
                                        <select id={"campoTipo"+i} className={"form-control"} defaultValue={campo.tipo}>
                                            <option value="" key="0">Seleccione un tipo de variable...</option>
                                            {campos.map((campoSelect, k) =>
                                                <option value={campoSelect.nombre} key={k}>{campoSelect.nombre}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className={"form-group col-xl-6 col-6"}>
                                        <h4 className={"col-form-label text-center"}>Guardar Campo en Resultados</h4>
                                        <div className={"switch-button switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                                            { campo.guardar ? (
                                                <input type="checkbox" defaultChecked name={"campoGuardar"+i} id={"campoGuardar"+i}/>
                                            ) : (
                                                <input type="checkbox" name={"campoGuardar"+i} id={"campoGuardar"+i}/>
                                            )}
                                            <span><label htmlFor={"campoGuardar"+i}></label></span>
                                        </div>
                                    </div>
                                </div>
                                { this.state.errorModificarCampo.mostrar ? (
                                    <ErrorMessage campo={this.state.errorModificarCampo.campo} descripcion={this.state.errorModificarCampo.descripcion} dismissTableError={this.dismissFieldEditError}> </ErrorMessage>
                                ) : (
                                    <span></span>
                                )}
                                <div className={"row"}>
                                    <button onClick={() => this.updateFieldsConfirmation(campo.ID, i)} className={"btn btn-light btn-block col-xl-5 col-5"} style={{margin: "0 auto", display: "block"}}>Guardar</button>
                                    <button onClick={() => this.deleteFieldsConfirmation(campo.ID, i)} className={"btn btn-light btn-block col-xl-1 col-1"} style={{margin: "0 auto", display: "block", display: "flex", alignItems: "center", justifyContent: "center"}}><img onClick={this.props.deleteVariable} src={"../assets/trash.png"} style={{height: "20px", width: "20px"}}></img></button>
                                </div>
                            </div>
                        ))}
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


/*// 1. Make a shallow copy of the items
let campos = [...this.state.camposDeTabla];
// 2. Make a shallow copy of the item you want to mutate
let campo = [...campos[indexTabla]];
// 3. Replace the property you're intested in
campo[indexCampo] = {ID: campo[indexCampo].ID, idTabla: idTabla, campoNombre: campoNombre, tipoCampo: tipoCampo, guardar: guardarCampo};
// 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
campos[indexTabla] = campo;
// 5. Set the state to our new copy*/