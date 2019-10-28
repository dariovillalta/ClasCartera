import React from 'react';
import sql from 'mssql';

import Campo from './Campo.js';
import Operacion from './Operacion.js';
import Valor from './Valor.js';
import ErrorMessage from '../ErrorMessage.js';
import MessageModal from '../MessageModal.js';

export default class VariableEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipoCampo: {
                esNumero: true,
                esBoolean: false,
                esFecha: false,
                esTexto: false,
                esGranDeudor: false,
                esPequenoDeudor: false
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
        this.esGranDeudor = this.esGranDeudor.bind(this);
        this.esPequenoDeudor = this.esPequenoDeudor.bind(this);
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
                esTexto: false,
                esGranDeudor: false,
                esPequenoDeudor: false
            }
        });
    }

    esBoolean () {
        this.setState({
            tipoCampo: {
                esNumero: false,
                esBoolean: true,
                esFecha: false,
                esTexto: false,
                esGranDeudor: false,
                esPequenoDeudor: false
            }
        });
    }

    esFecha () {
        this.setState({
            tipoCampo: {
                esNumero: false,
                esBoolean: false,
                esFecha: true,
                esTexto: false,
                esGranDeudor: false,
                esPequenoDeudor: false
            }
        });
    }

    esTexto () {
        this.setState({
            tipoCampo: {
                esNumero: false,
                esBoolean: false,
                esFecha: false,
                esTexto: true,
                esGranDeudor: false,
                esPequenoDeudor: false
            }
        });
    }

    esGranDeudor () {
        this.setState({
            tipoCampo: {
                esNumero: false,
                esBoolean: false,
                esFecha: false,
                esTexto: false,
                esGranDeudor: true,
                esPequenoDeudor: false
            }
        });
    }

    esPequenoDeudor () {
        this.setState({
            tipoCampo: {
                esNumero: false,
                esBoolean: false,
                esFecha: false,
                esTexto: false,
                esGranDeudor: false,
                esPequenoDeudor: true
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
            request.query("select * from Campos where tabla = 'Cliente' or tabla = 'Préstamo'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                        return [];
                    }
                } else {
                    transaction.commit(err => {
                        var temp = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            var existe = false;
                            for (var j = 0; j < temp.length; j++) {
                                if(temp[j].nombre.localeCompare(result.recordset[i].nombre) == 0) {
                                    existe = true;
                                    break;
                                }
                            };
                            if(existe == false) {
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
            let texto;
            if(seleccionCampoIDSelect.localeCompare("M0ra") != 0 && seleccionCampoIDSelect.localeCompare("Gr4nDeud0r") != 0 && seleccionCampoIDSelect.localeCompare("P3quDeud0r") != 0) {
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
                let operacionTexto;
                if(operacion.localeCompare("==") == 0){
                    operacionTexto = "es igual";
                } else if(operacion.localeCompare("<") == 0){
                    operacionTexto = "es menor";
                } else if(operacion.localeCompare("<=") == 0){
                    operacionTexto = "es menor o igual";
                } else if(operacion.localeCompare(">=") == 0){
                    operacionTexto = "es mayor o igual";
                } else if(operacion.localeCompare(">") == 0){
                    operacionTexto = "es mayor";
                } else if(operacion.localeCompare("!=") == 0){
                    operacionTexto = "no es igual";
                }
                texto = this.state.campos[seleccionCampoIDSelect].nombre + " " + operacionTexto + " ";
            } else if(seleccionCampoIDSelect.localeCompare("M0ra") == 0) {
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
                let operacionTexto;
                if(operacion.localeCompare("==") == 0){
                    operacionTexto = "es igual";
                } else if(operacion.localeCompare("<") == 0){
                    operacionTexto = "es menor";
                } else if(operacion.localeCompare("<=") == 0){
                    operacionTexto = "es menor o igual";
                } else if(operacion.localeCompare(">=") == 0){
                    operacionTexto = "es mayor o igual";
                } else if(operacion.localeCompare(">") == 0){
                    operacionTexto = "es mayor";
                } else if(operacion.localeCompare("!=") == 0){
                    operacionTexto = "no es igual";
                }
                texto = "Mora " + operacionTexto + " ";
            } else if(seleccionCampoIDSelect.localeCompare("Gr4nDeud0r") == 0) {
                campoTablaID = -2;
                campoID = -2;
                campoTipo = "varchar";
                operacion = $("input[name='operacionRadio']:checked").val();
                operacionTipo;
                if(operacion != undefined && (operacion.localeCompare("<") == 0 || operacion.localeCompare("<=") == 0 || operacion.localeCompare(">") == 0 || operacion.localeCompare(">=") == 0 || operacion.localeCompare("==") == 0 || operacion.localeCompare("!=") == 0))
                    operacionTipo = "relacional";
                else if(operacion != undefined && (operacion.localeCompare("+") == 0 || operacion.localeCompare("-") == 0 || operacion.localeCompare("*") == 0 || operacion.localeCompare("/") == 0))
                    operacionTipo = "algebraica";
                else if(operacion != undefined && (operacion.localeCompare("sumIf") == 0 || operacion.localeCompare("sumIfNot") == 0))
                    operacionTipo = "excel";
                valorLista = "CAPITALMINIMO="+$("#capitalMinimo").val()+",TIEMPOMINIMO="+$("#tiempoMinimo").val()+",PORCENTAJEMINIMO="+$("#porcentajeMinimo").val();   //ID Tabla
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
                texto = "Es Gran Deudor Comercial";
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
                                                var tablaNombreValor = 'VariablesdeLista';
                                                if(esCampoValor)
                                                    tablaNombreValor = 'Campos';
                                                var textoABuscar = '';
                                                for (var i = 0; i < valorCampos.length; i++) {
                                                    if(textoABuscar.length == 0) {
                                                        textoABuscar += ' where ID = '+valorCampos[i];
                                                    } else {
                                                        textoABuscar += ' or ID = '+valorCampos[i];
                                                    }
                                                };
                                                const transaction = new sql.Transaction( this.props.pool );
                                                transaction.begin(err => {
                                                    var rolledBack = false;
                                                    transaction.on('rollback', aborted => {
                                                        rolledBack = true;
                                                    });
                                                    const request = new sql.Request(transaction);
                                                    request.query("select * from "+tablaNombreValor+textoABuscar, (err, result) => {
                                                        if (err) {
                                                            if (!rolledBack) {
                                                                console.log(err);
                                                                transaction.rollback(err => {
                                                                });
                                                            }
                                                        } else {
                                                            transaction.commit(err => {
                                                                for (var i = 0; i < result.recordset.length; i++) {
                                                                    if(esCampoValor) {
                                                                        if(i == 0)
                                                                            texto+=result.recordset[i].nombre;
                                                                        else
                                                                            texto+=", "+result.recordset[i].nombre;
                                                                    } else {
                                                                        if(i == 0)
                                                                            texto+=result.recordset[i].valor;
                                                                        else
                                                                            texto+=", "+result.recordset[i].valor;
                                                                    }
                                                                };
                                                                const transaction1 = new sql.Transaction( this.props.pool );
                                                                transaction1.begin(err => {
                                                                    var rolledBack = false;
                                                                    transaction1.on('rollback', aborted => {
                                                                        rolledBack = true;
                                                                    });
                                                                    const request1 = new sql.Request(transaction1);
                                                                    request1.query("update Reglas set campoTablaID = "+campoTablaID+", campoCampoID = "+campoID+", campoTipo = '"+campoTipo+"', operacion = '"+operacion+"', tipoOperacion = '"+operacionTipo+"', valor = '"+valorCampos+"', valorTipo = '', esListaValor = '"+esListaValor+"', esCampoValor = '"+esCampoValor+"', valorTablaID = "+valorLista+", texto = '"+texto+"', nombreTablaRes = '"+this.props.tipoTablaRes+"', idTipoTabla = "+this.props.idTipoTabla+" where ID = "+this.props.reglaSeleccionada.ID, (err, result) => {
                                                                        if (err) {
                                                                            if (!rolledBack) {
                                                                                console.log(err);
                                                                                transaction1.rollback(err => {
                                                                                });
                                                                            }
                                                                        } else {
                                                                            transaction1.commit(err => {
                                                                                this.showSuccesMessage("Exito", "Regla creada con éxito.");
                                                                            });
                                                                        }
                                                                    });
                                                                }); // fin transaction1
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
                    campos={this.state.campos}
                    esGranDeudor={this.esGranDeudor}
                    esPequenoDeudor={this.esPequenoDeudor}> </Campo>
                <Operacion esNumero={this.state.tipoCampo.esNumero}
                    esBoolean={this.state.tipoCampo.esBoolean}
                    esFecha={this.state.tipoCampo.esFecha}
                    esTexto={this.state.tipoCampo.esTexto}
                    esGranDeudor={this.state.tipoCampo.esGranDeudor}
                    esPequenoDeudor={this.state.tipoCampo.esPequenoDeudor}> </Operacion>
                <Valor esNumero={this.state.tipoCampo.esNumero}
                    esBoolean={this.state.tipoCampo.esBoolean}
                    esFecha={this.state.tipoCampo.esFecha}
                    esTexto={this.state.tipoCampo.esTexto}
                    campos={this.state.campos}
                    esGranDeudor={this.state.tipoCampo.esGranDeudor}
                    esPequenoDeudor={this.state.tipoCampo.esPequenoDeudor}
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
