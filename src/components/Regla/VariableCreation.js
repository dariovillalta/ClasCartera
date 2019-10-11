import React from 'react';
import sql from 'mssql';

import Campo from './Campo.js';
import Operacion from './Operacion.js';
import Valor from './Valor.js';
import ErrorMessage from '../ErrorMessage.js';
import MessageModal from '../MessageModal.js';

export default class VariableCreation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipoCampo: {
                esNumero: true,
                esBoolean: false,
                esFecha: false,
                esTexto: false
            },
            errorCreacionRegla: {campo: "", descripcion: "", mostrar: false},
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: ""},
            campos: []
        }
        this.esNumero = this.esNumero.bind(this);
        this.esBoolean = this.esBoolean.bind(this);
        this.esFecha = this.esFecha.bind(this);
        this.esTexto = this.esTexto.bind(this);
        this.loadFields = this.loadFields.bind(this);
        this.saveRule = this.saveRule.bind(this);
        this.dismissReglaNewError = this.dismissReglaNewError.bind(this);
        this.showSuccesMessage = this.showSuccesMessage.bind(this);
        this.dismissMessageModal = this.dismissMessageModal.bind(this);
    }

    componentDidMount() {
        this.loadFields();
    }

    esNumero() {
        this.setState({
            tipoCampo: {
                esNumero: true,
                esBoolean: false,
                esFecha: false,
                esTexto: false
            }
        });
    }

    esBoolean () {
        this.setState({
            tipoCampo: {
                esNumero: false,
                esBoolean: true,
                esFecha: false,
                esTexto: false
            }
        });
    }

    esFecha () {
        this.setState({
            tipoCampo: {
                esNumero: false,
                esBoolean: false,
                esFecha: true,
                esTexto: false
            }
        });
    }

    esTexto () {
        this.setState({
            tipoCampo: {
                esNumero: false,
                esBoolean: false,
                esFecha: false,
                esTexto: true
            }
        });
    }

    loadFields() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Campos", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                        return [];
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            campos: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    saveRule() {
        /*console.log("retorno")
        console.log( $("input[name='operacionRadio']:checked").val() )
        let listaID = $("#selectLista").val();
        console.log("listaID = "+listaID)*/
        let seleccionCampoIDSelect = $("#campo").val();
        if(seleccionCampoIDSelect.length > 0) {
            let campoTablaID;
            let campoID;
            let campoTipo;
            let operacion;
            let operacionTipo;
            let valorLista;   //ID Tabla
            let valorCampos;
            let esListaValor, esCampoValor;
            if(seleccionCampoIDSelect.localeCompare("M0ra") != 0) {
                campoTablaID = this.state.campos[seleccionCampoIDSelect].tablaID;
                campoID = this.state.campos[seleccionCampoIDSelect].ID;
                campoTipo = this.state.campos[seleccionCampoIDSelect].tipo;
                operacion = $("input[name='operacionRadio']:checked").val();
                operacionTipo;
                if(operacion != undefined && (operacion.localeCompare("<") == 0 || operacion.localeCompare("<=") == 0 || operacion.localeCompare(">") == 0 || operacion.localeCompare(">=") == 0 || operacion.localeCompare("==") == 0 || operacion.localeCompare("!=") == 0))
                    operacionTipo = "relacional";
                else if(operacion != undefined && (operacion.localeCompare("+") == 0 || operacion.localeCompare("-") == 0 || operacion.localeCompare("*") == 0 || operacion.localeCompare("/") == 0))
                    operacionTipo = "algebraica";
                else if(operacion != undefined && (operacion.localeCompare("sumIf") == 0 || operacion.localeCompare("sumIfNot") == 0))
                    operacionTipo = "excel";
                valorLista = $("#selectLista").val();   //ID Tabla
                valorCampos = $("#camposDeLista").val();
                esListaValor, esCampoValor;
                if(valorLista != undefined && valorLista.localeCompare("table") == 0) {
                    esListaValor = false;
                    esCampoValor = true;
                    valorLista = this.props.tablaID;
                } else if(valorLista != undefined && valorLista.length > 0) {
                    esListaValor = true;
                    esCampoValor = false;
                }
            } else {
                campoTablaID = -1;
                campoID = -1;
                campoTipo = "int";
                operacion = $("input[name='operacionRadio']:checked").val();
                operacionTipo;
                if(operacion != undefined && (operacion.localeCompare("<") == 0 || operacion.localeCompare("<=") == 0 || operacion.localeCompare(">") == 0 || operacion.localeCompare(">=") == 0 || operacion.localeCompare("==") == 0 || operacion.localeCompare("!=") == 0))
                    operacionTipo = "relacional";
                else if(operacion != undefined && (operacion.localeCompare("+") == 0 || operacion.localeCompare("-") == 0 || operacion.localeCompare("*") == 0 || operacion.localeCompare("/") == 0))
                    operacionTipo = "algebraica";
                else if(operacion != undefined && (operacion.localeCompare("sumIf") == 0 || operacion.localeCompare("sumIfNot") == 0))
                    operacionTipo = "excel";
                valorLista = $("#selectLista").val();   //ID Tabla
                valorCampos = $("#camposDeLista").val();
                esListaValor, esCampoValor;
                if(valorLista != undefined && valorLista.localeCompare("table") == 0) {
                    esListaValor = false;
                    esCampoValor = true;
                    valorLista = this.props.tablaID;
                } else if(valorLista != undefined && valorLista.length > 0) {
                    esListaValor = true;
                    esCampoValor = false;
                }
            }
            console.log("//////////////////////");
            console.log("//////////////////////");
            console.log("campoTablaID = "+campoTablaID);
            console.log("campoID = "+campoID);
            console.log("campoTipo = "+campoTipo);
            console.log("operacion = "+operacion);
            console.log("operacionTipo = "+operacionTipo);
            console.log("valorLista = "+valorLista);
            console.log("valorCampos = "+valorCampos);
            console.log("esListaValor = "+esListaValor);
            console.log("esCampoValor = "+esCampoValor);
            console.log("+++++++++++++++++++++++");
            console.log("+++++++++++++++++++++++");
            if(!isNaN(campoTablaID) && campoTablaID.toString().length > 0 ) {
                if(!isNaN(campoID) && campoID.toString().length > 0 ) {
                    if(isNaN(campoTipo) && campoTipo.length > 0) {
                        if(operacion != undefined && isNaN(operacion) && operacion.length > 0) {
                            if(isNaN(operacionTipo) && operacionTipo.length > 0) {
                                if(valorLista != undefined && (/*!isNaN(valorLista) ||*/ valorLista.toString().length > 0)) {
                                    if(valorCampos.length > 0 && valorCampos.length < 1001) {
                                        if(esListaValor != undefined) {
                                            if(esCampoValor != undefined) {
                                                this.setState({
                                                    errorCreacionRegla: {campo: '', descripcion: '', mostrar: false}
                                                });
                                                const transaction = new sql.Transaction( this.props.pool );
                                                transaction.begin(err => {
                                                    var rolledBack = false;
                                                    transaction.on('rollback', aborted => {
                                                        rolledBack = true;
                                                    });
                                                    const request = new sql.Request(transaction);
                                                    request.query("insert into Reglas (campoTablaID, campoCampoID, campoTipo, operacion, tipoOperacion, valor, valorTipo, esListaValor, esCampoValor, valorTablaID, nombreTablaRes, idTipoTabla) values ("+campoTablaID+", "+campoID+", '"+campoTipo+"', '"+operacion+"', '"+operacionTipo+"','"+valorCampos+"', '', '"+esListaValor+"', '"+esCampoValor+"', "+valorLista+", '"+this.props.tipoTablaRes+"', "+this.props.idTipoTabla+")", (err, result) => {
                                                        if (err) {
                                                            if (!rolledBack) {
                                                                console.log(err);
                                                                transaction.rollback(err => {
                                                                });
                                                            }
                                                        } else {
                                                            transaction.commit(err => {
                                                                this.showSuccesMessage("Exito", "Regla creada con éxito.");
                                                            });
                                                        }
                                                    });
                                                }); // fin transaction
                                            } else {
                                                let campo = "Es Campo en Valor";
                                                let descripcionN;
                                                if(esCampoValor != undefined)
                                                    descripcionN = "El valor debe existir.";
                                                this.setState({
                                                    errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
                                                });
                                            }
                                        } else {
                                            let campo = "Es Lista en Valor";
                                            let descripcionN;
                                            if(esListaValor != undefined)
                                                descripcionN = "El valor debe existir.";
                                            this.setState({
                                                errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
                                            });
                                        }
                                    } else {
                                        let campo = "Valor";
                                        let descripcionN;
                                        if(valorCampos.length == 0)
                                            descripcionN = "El valor debe tener una longitud mayor a 0.";
                                        else if(valorCampos.length < 1001)
                                            descripcionN = "El valor debe tener una longitud menor a 1001.";
                                        this.setState({
                                            errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
                                        });
                                    }
                                } else {
                                    let campo = "ID de Tabla de Valor";
                                    let descripcionN;
                                    if(valorLista == undefined)
                                        descripcionN = "Seleccione un valor para el ID de la tabla del campo de valor.";
                                    else if(valorLista.toString().length == 0)
                                        descripcionN = "El valor debe tener una longitud mayor a 0.";
                                    this.setState({
                                        errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
                                    });
                                }
                            } else {
                                let campo = "Tipo de Operación";
                                let descripcionN;
                                if(isNaN(operacionTipo))
                                    descripcionN = "El tipo de operación no puede ser un número.";
                                else
                                    descripcionN = "El tipo de operación debe tener una longitud mayor a 0.";
                                this.setState({
                                    errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
                                });
                            }
                        } else {
                            let campo = "Operación";
                            let descripcionN;
                            if(operacion == undefined)
                                descripcionN = "Seleccione un valor de operación.";
                            else if(isNaN(operacion))
                                descripcionN = "La operación no puede ser un número.";
                            else
                                descripcionN = "La operación debe tener una longitud mayor a 0.";
                            this.setState({
                                errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
                            });
                        }
                    } else {
                        let campo = "Tipo de Campo";
                        let descripcionN = "El ID del campo debe ser un valor numérico.";
                        this.setState({
                            errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
                        });
                    }
                } else {
                    let campo = "ID de Campo de Campo";
                    let descripcionN;
                    if(campoID.toString().length == 0)
                        descripcionN = "El ID de campo debe tener una longitud mayor a 0.";
                    else if(isNaN(campoID))
                        descripcionN = "El ID de campo debe ser un valor numérico.";
                    this.setState({
                        errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
                    });
                }
            } else {
                let campo = "ID de Tabla de Campo";
                let descripcionN;
                if(campoTablaID.toString().length == 0)
                    descripcionN = "El ID de tabla de campo debe tener una longitud mayor a 0.";
                else if(isNaN(campoTablaID))
                    descripcionN = "El ID de tabla de campo debe ser un valor numérico.";
                this.setState({
                    errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
                });
            }
        } else {
            let campo = "ID de Tabla de Campo";
            let descripcionN = "Seleccione un valor para el ID de la tabla del campo.";
            this.setState({
                errorCreacionRegla: {campo: campo, descripcion: descripcionN, mostrar: true}
            });
        }
    }

    dismissReglaNewError() {
        this.setState({
            errorCreacionRegla: {campo: "", descripcion: "", mostrar: false}
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
                <Campo esNumero={this.esNumero}
                    esBoolean={this.esBoolean}
                    esFecha={this.esFecha}
                    esTexto={this.esTexto}
                    campos={this.state.campos}> </Campo>
                <Operacion esNumero={this.state.tipoCampo.esNumero}
                    esBoolean={this.state.tipoCampo.esBoolean}
                    esFecha={this.state.tipoCampo.esFecha}
                    esTexto={this.state.tipoCampo.esTexto}> </Operacion>
                <Valor esNumero={this.state.tipoCampo.esNumero}
                    esBoolean={this.state.tipoCampo.esBoolean}
                    esFecha={this.state.tipoCampo.esFecha}
                    esTexto={this.state.tipoCampo.esTexto}
                    campos={this.state.campos}
                    pool={this.props.pool}> </Valor>
                { this.state.errorCreacionRegla.mostrar ? (
                    <ErrorMessage campo={this.state.errorCreacionRegla.campo} descripcion={this.state.errorCreacionRegla.descripcion} dismissTableError={this.dismissReglaNewError}> </ErrorMessage>
                ) : (
                    <span></span>
                )}
                { this.state.mensajeModal.mostrarMensaje ? (
                    <MessageModal esError={this.state.mensajeModal.esError} esConfirmar={this.state.mensajeModal.esConfirmar} dismissMessage={this.dismissMessageModal} confirmFunction={this.confirmMessageModal} titulo={this.state.mensajeModal.titulo} mensaje={this.state.mensajeModal.mensaje}> </MessageModal>
                ) : (
                    <span></span>
                )}
                <div className={"text-center"}>
                    <a onClick={this.saveRule} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Guardar</a>
                </div>
                <br/>
            </div>
        );
    }
}
