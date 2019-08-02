import React from 'react';
import sql from 'mssql';

import Accordion from './Accordion/Accordion.js';
import InlineEdit from './InlineEdit.js';
import ErrorMessage from './ErrorMessage.js';
import MessageModal from './MessageModal.js';

const campos = [ {nombre: "varchar"}, {nombre: "bit"}, {nombre: "date"}, {nombre: "int"} ];
let funciones = [ {funcion: "idCliente", texto: "ID de Cliente"}, {funcion: "fecha", texto: "fecha"}, {nombre: "date"}, {nombre: "int"} ];

export default class ConfiguracionTablas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tablas: [],
            errorCreacionTabla: {campo: "", descripcion: "", mostrar: false},
            errorCreacionCampo: {campo: "", descripcion: "", mostrar: false},
            errorModificarCampo: {campo: "", descripcion: "", mostrar: false},
            camposTablas: [],
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: -1, indiceX: -1, indiceY: -1}
        }
        this.loadTables = this.loadTables.bind(this);
        this.loadFields = this.loadFields.bind(this);
        this.insertTable = this.insertTable.bind(this);
        this.deleteTableConfirmation = this.deleteTableConfirmation.bind(this);
        this.deleteTable = this.deleteTable.bind(this);
        this.insertField = this.insertField.bind(this);
        this.updateFieldsConfirmation = this.updateFieldsConfirmation.bind(this);
        this.updateField = this.updateField.bind(this);
        this.deleteFieldsConfirmation = this.deleteFieldsConfirmation.bind(this);
        this.deleteField = this.deleteField.bind(this);
        this.dismissTableNewError = this.dismissTableNewError.bind(this);
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
        this.loadTables();
    }

    loadTables() {
        this.setState({
            tablas: [],
            camposTablas: []
        });
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
                        for (var i = 0; i < result.recordset.length; i++) {
                            if(this.state.camposTablas[i] == undefined || this.state.camposTablas[i] == null) {
                                this.setState({
                                    camposTablas: [...this.state.camposTablas, []]
                                });
                            }
                            //arrTemporalCampos[i].concat(this.loadFields(result.recordset[i].ID));
                            this.loadFields(result.recordset[i].ID, i);
                        };
                        console.log('this.state.camposTablas');
                        console.log(this.state.camposTablas);
                        /*this.setState({
                            campos: arrTemporalCampos
                        });*/
                    });
                }
            });
        }); // fin transaction
    }

    loadFields(id, index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Campos where tablaID = "+id, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                        return [];
                    }
                } else {
                    transaction.commit(err => {
                        let campos = [...this.state.camposTablas];
                        // 2. Make a shallow copy of the item you want to mutate
                        let campo = {...campos[index]};
                        // 3. Replace the property you're intested in
                        if(isNaN(campo.length))
                            campo = result.recordset;
                        else {
                            campo.concat(result.recordset);
                            //campo: [...this.state.campos, []]
                        }
                        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                        campos[index] = campo;
                        // 5. Set the state to our new copy
                        this.setState({
                            camposTablas: campos
                        });
                        return result.recordset;
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
        if(nombreTabla.length > 0 && nombreTabla.length < 71) {
            if(usuarioTabla.length > 0 && usuarioTabla.length < 51) {
                if(contrasenaTabla.length > 0 && contrasenaTabla.length < 201) {
                    if(servidorTabla.length > 0 && servidorTabla.length < 51) {
                        if(basedatosTabla.length > 0 && basedatosTabla.length < 51) {
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
                                    request.query("insert into Tablas (Nombre, Usuario, Contrasena, Servidor, BaseDatos, Tabla) values ('"+nombreTabla+"','"+usuarioTabla+"','"+contrasenaTabla+"','"+servidorTabla+"','"+basedatosTabla+"','"+tablaTabla+"')", (err, result) => {
                                        if (err) {
                                            if (!rolledBack) {
                                                console.log(err);
                                                transaction.rollback(err => {
                                                });
                                            }
                                        } else {
                                            transaction.commit(err => {
                                                /*this.setState({
                                                    tablas: this.state.tablas.concat({nombre: nombreTabla,usuario: usuarioTabla,contrasena: contrasenaTabla,servidor: servidorTabla,basedatos: basedatosTabla,tabla: tablaTabla})
                                                });*/
                                                this.showSuccesMessage("Exito", "Tabla creada con éxito.");
                                                this.loadTables();
                                            });
                                        }
                                    });
                                }); // fin transaction
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
                        console.log(result.rowsAffected);
                        if(result.rowsAffected[0] > 0) {
                            let tablas = [...this.state.camposTablas];
                            tablas.splice(this.state.mensajeModal.indiceX, 1);
                            /*let campos = [...tablas[this.state.mensajeModal.indiceX]];
                            campos.splice(this.state.mensajeModal.indiceY, 1);
                            tablas[this.state.mensajeModal.indiceX] = campos;*/
                            //this.loadTables();
                            this.setState({
                                camposTablas: tablas,
                                mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
                            });
                            /*this.setState({
                                camposTablas: quitando tabla,
                                mensajeModal: limpiando variables del modal
                            });*/
                        }
                    });
                }
            });
        }); // fin transaction2
    }

    insertField(indexTabla) {
        let idTabla = this.state.tablas[indexTabla].ID;
        let campoNombre = $("#campoNombre"+indexTabla).val();
        let tipoCampo = $("#campoTipo"+indexTabla).val();
        let funcionCampo = $("#campoTipo"+indexTabla).val();
        let guardarCampo;
        if ($("#campoGuardar"+indexTabla).is(':checked'))
            guardarCampo = true;
        else
            guardarCampo = false;
        if(!isNaN(idTabla) && idTabla.toString().length > 0) {
            if(campoNombre.length > 0 && campoNombre.length < 41) {
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
                            request.query("insert into Campos (tablaID, nombre, tipo, guardar) values ("+idTabla+",'"+campoNombre+"','"+tipoCampo+"','"+guardarCampo+"')", (err, result) => {
                                if (err) {
                                    if (!rolledBack) {
                                        console.log(err);
                                        transaction.rollback(err => {
                                        });
                                    }
                                } else {
                                    transaction.commit(err => {
                                        this.loadTables();
                                        this.setState({
                                            mensajeModal: {mostrarMensaje: true, mensajeConfirmado: this.state.mensajeModal.mostrarMensaje, esError: false, esConfirmar: false, titulo: "Exito", mensaje: "Campo creado con éxito.", banderaMetodoInit: "", idElementoSelec: -1, indiceX: -1, indiceY: -1}
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

    updateFieldsConfirmation(id, x, y) {
        this.setState({
            mensajeModal: {mostrarMensaje: true, mensajeConfirmado: false, esError: false, esConfirmar: true, titulo: "Confirmación", mensaje: "Esta seguro que desea modificar el campo?", banderaMetodoInit: "goUpdField", idElementoSelec: id, indiceX: x, indiceY: y}
        });
    }

    updateField(id, indexTabla, indexCampo) {
        let idTabla = $("#campoTablaID"+indexTabla+indexCampo).val();
        let campoNombre;
        if($("#campoNombre"+indexTabla+indexCampo).length > 0) {
            campoNombre = $("#campoNombre"+indexTabla+indexCampo).val();
        } else {
            campoNombre = this.state.camposTablas[indexTabla][indexCampo].nombre;
        }
        let tipoCampo = $("#campoTipo"+indexTabla+indexCampo).val();
        let guardarCampo;
        if ($("#campoGuardar"+indexTabla+indexCampo).is(':checked'))
            guardarCampo = true;
        else
            guardarCampo = false;
        if(!isNaN(idTabla) && idTabla.toString().length > 0) {
            if(campoNombre.length > 0 && campoNombre.length < 41) {
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
                            request.query("update Campos set tablaID = "+idTabla+", nombre = '"+campoNombre+"', tipo = '"+tipoCampo+"', guardar = '"+guardarCampo+"' where ID = "+id, (err, result) => {
                                if (err) {
                                    if (!rolledBack) {
                                        console.log(err);
                                        this.setState({
                                            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
                                        });
                                        transaction.rollback(err => {
                                        });
                                    }
                                } else {
                                    transaction.commit(err => {
                                        // 1. Make a shallow copy of the items
                                        let campos = [...this.state.camposTablas];
                                        // 2. Make a shallow copy of the item you want to mutate
                                        let campo = [...campos[indexTabla]];
                                        // 3. Replace the property you're intested in
                                        campo[indexCampo] = {ID: campo[indexCampo].ID, idTabla: idTabla, campoNombre: campoNombre, tipoCampo: tipoCampo, guardar: guardarCampo};
                                        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                                        campos[indexTabla] = campo;
                                        // 5. Set the state to our new copy
                                        //this.loadTables();
                                        this.setState({
                                            camposTablas: campos,
                                            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
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
                            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
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
                        mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
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
                    mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
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
                mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
            });
            /*this.setState({
                mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
            });*/
        }
    }

    deleteFieldsConfirmation(id, x, y) {
        this.setState({
            mensajeModal: {mostrarMensaje: true, mensajeConfirmado: false, esError: false, esConfirmar: true, titulo: "Confirmación", mensaje: "Esta seguro que desea eliminar el campo?", banderaMetodoInit: "goDelField", idElementoSelec: id, indiceX: x, indiceY: y}
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
                            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
                        });
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        let tablas = [...this.state.camposTablas];
                        let campos = [...tablas[this.state.mensajeModal.indiceX]];
                        campos.splice(this.state.mensajeModal.indiceY, 1);
                        tablas[this.state.mensajeModal.indiceX] = campos;
                        //this.loadTables();
                        this.setState({
                            camposTablas: tablas,
                            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
                        });
                        this.showSuccesMessage("Exito", "Campo eliminado con éxito.");
                        /*this.setState({
                            camposTablas: quitando tabla,
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
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: -1, indiceX: -1, indiceY: -1}
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
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"} style={{width: "100%"}}>
                        {this.state.tablas.map((tabla, i) => (
                            <Accordion key={tabla.ID} showTrash={true} deleteVariable={() => this.deleteTableConfirmation(tabla.ID, i)} allowMultipleOpen>
                                <div label={tabla.nombre} className={"border-top"}>

                                    { this.state.camposTablas[i] != undefined ? (
                                        <div>
                                            {this.state.camposTablas[i].map((campo, j) => (
                                                <div key={campo.ID} className={"border-top alert alert-primary"} style={{padding: "1% 3%"}}>
                                                    <div className={"row"}>
                                                        <div className={"form-group col-xl-6 col-6"}>
                                                            <h4 className={"col-form-label text-center"}>Tabla</h4>
                                                            <select id={"campoTablaID"+i+j} className={"form-control"} defaultValue={campo.tablaID}>
                                                                <option value="" key="0">Seleccione una tabla...</option>
                                                                {this.state.tablas.map((tabla, k) =>
                                                                    <option value={tabla.ID} key={tabla.ID}>{tabla.nombre}</option>
                                                                )}
                                                            </select>
                                                        </div>
                                                        <div className={"form-group col-xl-6 col-6"}>
                                                            <h4 className={"col-form-label text-center"}>Nombre de Campo</h4>
                                                            <InlineEdit id={"campoNombre"+i+j} texto={campo.nombre}> </InlineEdit>
                                                        </div>
                                                    </div>
                                                    <div className={"row"}>
                                                        <div className="form-group col-xl-6 col-6">
                                                            <h4 className={"col-form-label text-center"}>Tipo</h4>
                                                            <select id={"campoTipo"+i+j} className={"form-control"} defaultValue={campo.tipo}>
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
                                                                    <input type="checkbox" defaultChecked name={"campoGuardar"+i+j} id={"campoGuardar"+i+j}/>
                                                                ) : (
                                                                    <input type="checkbox" name={"campoGuardar"+i+j} id={"campoGuardar"+i+j}/>
                                                                )}
                                                                <span><label htmlFor={"campoGuardar"+i+j}></label></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    { this.state.errorModificarCampo.mostrar ? (
                                                        <ErrorMessage campo={this.state.errorModificarCampo.campo} descripcion={this.state.errorModificarCampo.descripcion} dismissTableError={this.dismissFieldEditError}> </ErrorMessage>
                                                    ) : (
                                                        <span></span>
                                                    )}
                                                    <div className={"row"}>
                                                        <button onClick={() => this.updateFieldsConfirmation(campo.ID, i, j)} className={"btn btn-light btn-block col-xl-5 col-5"} style={{margin: "0 auto", display: "block"}}>Guardar</button>
                                                        <button onClick={() => this.deleteFieldsConfirmation(campo.ID, i, j)} className={"btn btn-light btn-block col-xl-1 col-1"} style={{margin: "0 auto", display: "block", display: "flex", alignItems: "center", justifyContent: "center"}}><img onClick={this.props.deleteVariable} src={"../assets/trash.png"} style={{height: "20px", width: "20px"}}></img></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <span></span>
                                    )}  

                                    <div className={"border-top alert alert-primary"} style={{margin: "3% 0%"}}>
                                        <div className={"row"}>
                                            <div className={"form-group col-xl-6 col-6"}>
                                                <h4 className={"col-form-label text-center"}>Tabla</h4>
                                                <h4 style={{fontFamily: 'Circular Std Medium', color: "#71748d"}} className={"alert-heading"} >{tabla.nombre}</h4>
                                            </div>
                                            <div className={"form-group col-xl-6 col-6"}>
                                                <h4 className={"col-form-label text-center"}>Nombre de Campo</h4>
                                                <input id={"campoNombre"+i} type="text" className={"form-control"}/>
                                            </div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"form-group col-xl-6 col-6"}>
                                                <h4 className={"col-form-label text-center"}>Tipo</h4>
                                                <select id={"campoTipo"+i} className={"form-control"} /*onChange={this.checkFieldType.bind(this)}*/>
                                                    <option value="" key="0">Seleccione un tipo de variable...</option>
                                                    {campos.map((campo, k) =>
                                                        <option value={campo.nombre} key={k}>{campo.nombre}</option>
                                                    )}
                                                </select>
                                            </div>
                                            <div className={"form-group col-xl-6 col-6"}>
                                                <h4 className={"col-form-label text-center"}>Guardar Campo en Resultados</h4>
                                                <div className={"switch-button switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                                                    <input type="checkbox" defaultChecked name={"campoGuardar"+i} id={"campoGuardar"+i}/><span>
                                                    <label htmlFor={"campoGuardar"+i}></label></span>
                                                </div>
                                            </div>
                                        </div>
                                        { this.state.errorCreacionCampo.mostrar ? (
                                            <ErrorMessage campo={this.state.errorCreacionCampo.campo} descripcion={this.state.errorCreacionCampo.descripcion} dismissTableError={this.dismissFieldNewError}> </ErrorMessage>
                                        ) : (
                                            <span></span>
                                        )}
                                        <div className={"row"}>
                                            <button onClick={() => this.insertField(i)} className={"btn btn-light btn-block col-xl-10 col-10"} style={{margin: "0 auto", display: "block"}}>Crear</button>
                                        </div>
                                    </div>
                                </div>
                            </Accordion>
                        ))}
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
                { this.state.mensajeModal.mostrarMensaje ? (
                    <MessageModal esError={this.state.mensajeModal.esError} esConfirmar={this.state.mensajeModal.esConfirmar} dismissMessage={this.dismissMessageModal} confirmFunction={this.confirmMessageModal} titulo={this.state.mensajeModal.titulo} mensaje={this.state.mensajeModal.mensaje}> </MessageModal>
                ) : (
                    <span></span>
                )}
            </div>
        );
    }
}
