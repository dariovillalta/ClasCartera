import React from 'react';
import sql from 'mssql';

import SeleccionarTablaClasificarCarteraProceso from './SeleccionarTablaClasificarCarteraProceso.js';
import ConfiguracionTablasClasificar from './ConfiguracionTablasClasificar.js';
import OpcionTablasClasificar from './OpcionTablasClasificar.js';
import MessageModal from '../MessageModal.js';

import {constructor, retornarClientes, retornarPrestamos, retornarCapitalMinimo, retornarBitacora} from "../ClasificarCreditoD.js";

const myWorker = new Worker("./components/ClasificarCredito.js");

//import "../../libs/moment/min/moment.min.js";

var tamanoFinalBandera = 0, tamanoActualBandera = 0, camposGuardar, arregloCamposTablasSeleccionadas = [];
var procesosACalcular = {capacidadDeudor: false, diasMora: false, disponibilidadGarantias: false, entornoEconomico: false, tiposCredito: false, categoriasClasificacion: false, criteriosDeterioro: false};
var guardarTipoCredito = false, guardarCategoriaClasificacion = false, guardarMora = false, guardarCriterioDeterioro = false;
var comportamientoPagoSeleccionados = [], tiposCreditosSeleccionados = [], categoriasClasificacionSeleccionados = [];
var comportamientoPagoBanderas = [], tiposCreditosBanderas = [], categoriasClasificacionBanderas = [];
var guardarUnicaVez = false;

var fechaGlobal;

export default class ClasificarCarteraProceso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widthActual: "33%",
            tablasOrginales: [],
            tablasSeleccionadas: [],
            opcionesTablasSeleccionadas: [],
            comportamientoPagoOriginales: [],
            tiposCreditosOriginales: [],
            categoriasClasificacionOriginales: [],
            criteriosDeterioroOriginales: [],
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: -1, indiceX: -1}
        }
        this.loadTables = this.loadTables.bind(this);
        this.selectTable = this.selectTable.bind(this);
        this.iniciarCalculoMora = this.iniciarCalculoMora.bind(this);
        this.iniciarTipoDeCreditos = this.iniciarTipoDeCreditos.bind(this);
        this.iniciarCategoriasClasificacion = this.iniciarCategoriasClasificacion.bind(this);
        this.iniciarCriteriosDeterioro = this.iniciarCriteriosDeterioro.bind(this);
        this.tablasGuardarCampos = this.tablasGuardarCampos.bind(this);
        this.verificarGuardarCampos = this.verificarGuardarCampos.bind(this);
        this.verificarSeleccionoTablas = this.verificarSeleccionoTablas.bind(this);
        this.creandoArreglos = this.creandoArreglos.bind(this);
        this.fetchDataComportamientoPago = this.fetchDataComportamientoPago.bind(this);
        this.getPrestamoTablaComportamientoPago = this.getPrestamoTablaComportamientoPago.bind(this);
        this.getPrestamoCamposDeTablaComportamientoPago = this.getPrestamoCamposDeTablaComportamientoPago.bind(this);
        this.getPlanPagoTablaComportamientoPago = this.getPlanPagoTablaComportamientoPago.bind(this);
        this.getPlanPagoCamposDeTablaComportamientoPago = this.getPlanPagoCamposDeTablaComportamientoPago.bind(this);
        this.initWebWorkerComportamientoPago = this.initWebWorkerComportamientoPago.bind(this);
        this.propiedadDeObjetoExisteEnTablaCampos = this.propiedadDeObjetoExisteEnTablaCampos.bind(this);
        this.verificarProcesosAClasificar = this.verificarProcesosAClasificar.bind(this);
        this.obtenerTipoCreditoReglas = this.obtenerTipoCreditoReglas.bind(this);
        this.obtenerTipoCredito = this.obtenerTipoCredito.bind(this);
        this.fetchDataTipoCredito = this.fetchDataTipoCredito.bind(this);
        this.fetchDataReglasTipoCreditoCampos = this.fetchDataReglasTipoCreditoCampos.bind(this);
        this.fetchDataCamposReglasTipoCreditoCampos = this.fetchDataCamposReglasTipoCreditoCampos.bind(this);
        this.verificarCamposReglasTipoCreditoCampos = this.verificarCamposReglasTipoCreditoCampos.bind(this);
        this.fetchDataValoresReglasTipoCreditoCampos = this.fetchDataValoresReglasTipoCreditoCampos.bind(this);
        this.verificarValoresReglasTipoCreditoCampos = this.verificarValoresReglasTipoCreditoCampos.bind(this);
        this.verifyTypeCreditFinal = this.verifyTypeCreditFinal.bind(this);
        this.checkFinishMethods = this.checkFinishMethods.bind(this);
        this.fetchDataCategoriaClasificacion = this.fetchDataCategoriaClasificacion.bind(this);
        this.verifyClasificationCategoryFinal = this.verifyClasificationCategoryFinal.bind(this);
        this.fetchDataReglasCategoriaClasificacionCampos = this.fetchDataReglasCategoriaClasificacionCampos.bind(this);
        this.verificarCamposReglasCategoriaClasificacionCampos = this.verificarCamposReglasCategoriaClasificacionCampos.bind(this);
        this.fetchDataCamposReglasCategoriaClasificacionCampos = this.fetchDataCamposReglasCategoriaClasificacionCampos.bind(this);
        this.fetchDataValoresReglasCategoriaClasificacionCampos = this.fetchDataValoresReglasCategoriaClasificacionCampos.bind(this);
        this.verifyDeteriorationCriteriaFinal = this.verifyDeteriorationCriteriaFinal.bind(this);
        this.getFieldsToSave = this.getFieldsToSave.bind(this);
        this.startSavingObjects = this.startSavingObjects.bind(this);
        this.saveObjectID = this.saveObjectID.bind(this);
        this.saveObjectIntField = this.saveObjectIntField.bind(this);
        this.saveObjectDecimalField = this.saveObjectDecimalField.bind(this);
        this.saveObjectDateField = this.saveObjectDateField.bind(this);
        this.saveObjecBoolField = this.saveObjecBoolField.bind(this);
        this.saveObjectStringField = this.saveObjectStringField.bind(this);
        this.getCriterioDeterioro = this.getCriterioDeterioro.bind(this);
        this.formatDateCreation = this.formatDateCreation.bind(this);
        this.obtenerCategoriaClasificacionReglas = this.obtenerCategoriaClasificacionReglas.bind(this);
        this.obtenerCategoriaClasificacion = this.obtenerCategoriaClasificacion.bind(this);
        this.actualizarSeleccionarComportamientoPago = this.actualizarSeleccionarComportamientoPago.bind(this);
        this.actualizarSeleccionarTiposCredito = this.actualizarSeleccionarTiposCredito.bind(this);
        this.actualizarSeleccionarCategoriasClasificacion = this.actualizarSeleccionarCategoriasClasificacion.bind(this);
        this.obtenerCriterioDeterioro = this.obtenerCriterioDeterioro.bind(this);
        this.clean = this.clean.bind(this);
        this.dismissMessageModal = this.dismissMessageModal.bind(this);
        this.showSuccesMessage = this.showSuccesMessage.bind(this);
        this.saveBitacora = this.saveBitacora.bind(this);
    }

    componentDidMount() {
        this.loadTables();
        this.obtenerCriterioDeterioro();
        //myWorker.postMessage(["comportamientoPago", sql]);
        /*myWorker.onmessage = function (event) {
            console.log('EN MAIN JS');
            console.log(event.data);
        };*/
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
                        for (var i = 0; i < result.recordset.length; i++) {
                            result.recordset[i].active = true;
                        };
                        this.setState(
                            {
                                tablasOrginales: result.recordset,
                                tablasSeleccionadas: result.recordset
                            },
                            this.verificarProcesosAClasificar
                        );
                    });
                }
            });
        }); // fin transaction
    }

    selectTable(index) {
        let existeTablaEnConf = false;
        this.state.tablasOrginales[index].active = !this.state.tablasOrginales[index].active;
        this.setState({
            tablasOrginales: this.state.tablasOrginales
        });
        var i = 0;
        for (i = 0; i < this.state.tablasSeleccionadas.length; i++) {
            if(this.state.tablasOrginales[index].ID == this.state.tablasSeleccionadas[i].ID) {
                existeTablaEnConf = true;
                break;
            }
        };
        if(!existeTablaEnConf) {
            let tablasSelCopiaTemp = [...this.state.tablasSeleccionadas];
            tablasSelCopiaTemp.push(this.state.tablasOrginales[index]);
            this.setState(
                {
                    tablasSeleccionadas: tablasSelCopiaTemp
                },
                this.verificarProcesosAClasificar
            );
            /*if(tablasSelCopiaTemp.length == 1) {
                this.setState({
                    widthActual: "100%"
                });
            } else if(tablasSelCopiaTemp.length == 2) {
                this.setState({
                    widthActual: "50%"
                });
            } else {
                this.setState({
                    widthActual: "33%"
                });
            }*/
            //this.verificarProcesosAClasificar();
        } else {
            let tablasSelCopiaTemp = [...this.state.tablasSeleccionadas];
            tablasSelCopiaTemp.splice(i, 1);
            this.setState(
                {
                    tablasSeleccionadas: tablasSelCopiaTemp
                },
                this.verificarProcesosAClasificar
            );
            //this.verificarProcesosAClasificar();
        }
    }

    //metodo para agregar tipo de credito, tipo de cliente, criterios de clasificacion por tabla
    verificarProcesosAClasificar(index) {
        comportamientoPagoSeleccionados = [];
        tiposCreditosSeleccionados = [];
        categoriasClasificacionSeleccionados = [];
        for (var i = 0; i < this.state.tablasSeleccionadas.length; i++) {
            this.fetchDataComportamientoPago(this.state.tablasSeleccionadas[i].ID, this.state.tablasSeleccionadas[i].nombre);
            this.obtenerTipoCreditoReglas(this.state.tablasSeleccionadas[i].ID);
            this.obtenerCategoriaClasificacionReglas(this.state.tablasSeleccionadas[i].ID);
        };
        /*console.log('this.state.tablasSeleccionadas');
        console.log(this.state.tablasSeleccionadas);
        console.log('this.state.comportamientoPagoOriginales');
        console.log(this.state.comportamientoPagoOriginales);
        console.log('comportamientoPagoSeleccionados');
        console.log(comportamientoPagoSeleccionados);
        console.log('this.state.tiposCreditosOriginales');
        console.log(this.state.tiposCreditosOriginales);
        console.log('tiposCreditosSeleccionados');
        console.log(tiposCreditosSeleccionados);
        console.log('this.state.categoriasClasificacionOriginales');
        console.log(this.state.categoriasClasificacionOriginales);
        console.log('categoriasClasificacionSeleccionados');
        console.log(categoriasClasificacionSeleccionados);
        console.log('//////////////////////////');
        var self = this;
        setTimeout(function(){
            console.log('comportamientoPagoSeleccionados');
            console.log(comportamientoPagoSeleccionados);
            console.log('this.state.comportamientoPagoOriginales');
            console.log(self.state.comportamientoPagoOriginales);
            console.log('tiposCreditosSeleccionados');
            console.log(tiposCreditosSeleccionados);
            console.log('this.state.tiposCreditosOriginales');
            console.log(self.state.tiposCreditosOriginales);
            console.log('categoriasClasificacionSeleccionados');
            console.log(categoriasClasificacionSeleccionados);
            console.log('this.state.categoriasClasificacionOriginales');
            console.log(self.state.categoriasClasificacionOriginales);
            console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        }, 3000);*/
    }

    fetchDataComportamientoPago (prestamoTablaID, nombreTabla) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ComportamientoPago where prestamoTablaID = "+prestamoTablaID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        banderaGuardarResultadosTamActual++;
                        this.initWebWorkerComportamientoPago(null, null, null, null, null, null, false);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        for (var i = 0; i < result.recordset.length; i++) {
                            result.recordset[i].nombreTabla = nombreTabla;
                        };
                        comportamientoPagoSeleccionados = [ ...comportamientoPagoSeleccionados, ...result.recordset];
                        this.setState({
                            comportamientoPagoOriginales: comportamientoPagoSeleccionados
                        });
                        //arreglo = arreglo.concat(result.recordset);
                        //arreglo = [].concat(result.recordset, arreglo);
                    });
                }
            });
        }); // fin transaction
    }

    obtenerTipoCreditoReglas(tablaID) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select DISTINCT idTipoTabla from Reglas where campoTablaID = "+tablaID+" and nombreTablaRes = 'TipoCredito'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            for (var i = 0; i < result.recordset.length; i++) {
                                this.obtenerTipoCredito(result.recordset[i].idTipoTabla);
                            };
                        } else {
                            this.setState({
                                tiposCreditosOriginales: tiposCreditosSeleccionados
                            });
                        }
                    });
                }
            });
        }); // fin transaction
    }

    obtenerTipoCredito (ID) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from TipoCredito where ID = "+ID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        tiposCreditosSeleccionados = [ ...tiposCreditosSeleccionados, ...result.recordset];
                        this.setState({
                            tiposCreditosOriginales: tiposCreditosSeleccionados
                        });
                        //arreglo = arreglo.concat(result.recordset);
                        //arreglo = [].concat(result.recordset, arreglo);
                    });
                }
            });
        }); // fin transaction
    }

    obtenerCategoriaClasificacionReglas(tablaID) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select DISTINCT idTipoTabla from Reglas where campoTablaID = "+tablaID+" and nombreTablaRes = 'CategoriaClasificacion'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            for (var i = 0; i < result.recordset.length; i++) {
                                this.obtenerCategoriaClasificacion(result.recordset[i].idTipoTabla);
                            };
                        } else {
                            this.setState({
                                categoriasClasificacionOriginales: categoriasClasificacionSeleccionados
                            });
                        }
                    });
                }
            });
        }); // fin transaction
    }

    obtenerCategoriaClasificacion (ID) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from CategoriaClasificacion where ID = "+ID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        categoriasClasificacionSeleccionados = [ ...categoriasClasificacionSeleccionados, ...result.recordset];
                        this.setState({
                            categoriasClasificacionOriginales: categoriasClasificacionSeleccionados
                        });
                        //arreglo = arreglo.concat(result.recordset);
                        //arreglo = [].concat(result.recordset, arreglo);
                    });
                }
            });
        }); // fin transaction
    }

    obtenerCriterioDeterioro () {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from CriterioDeterioro ", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            criteriosDeterioroOriginales: result.recordset
                        });
                        //arreglo = arreglo.concat(result.recordset);
                        //arreglo = [].concat(result.recordset, arreglo);
                    });
                }
            });
        }); // fin transaction
    }

    actualizarSeleccionarComportamientoPago() {
        comportamientoPagoSeleccionados = [];
        for (var i = 0; i < this.state.comportamientoPagoOriginales.length; i++) {
            if($("#comportamientoPago"+this.state.comportamientoPagoOriginales[i].ID).is(':checked')) {
                comportamientoPagoSeleccionados.push(this.state.comportamientoPagoOriginales[i]);
            }
        };
        
        console.log('comportamientoPagoSeleccionados');
        console.log(comportamientoPagoSeleccionados);
    }

    actualizarSeleccionarTiposCredito() {
        tiposCreditosSeleccionados = [];
        for (var i = 0; i < this.state.tiposCreditosOriginales.length; i++) {
            if($("#tiposCredito"+this.state.tiposCreditosOriginales[i].ID).is(':checked')) {
                tiposCreditosSeleccionados.push(this.state.tiposCreditosOriginales[i]);
            }
        };
        
        console.log('tiposCreditosSeleccionados');
        console.log(tiposCreditosSeleccionados);
    }

    actualizarSeleccionarCategoriasClasificacion () {
        categoriasClasificacionSeleccionados = [];
        for (var i = 0; i < this.state.categoriasClasificacionOriginales.length; i++) {
            if($("#categoriasClasificacion"+this.state.categoriasClasificacionOriginales[i].ID).is(':checked')) {
                categoriasClasificacionSeleccionados.push(this.state.categoriasClasificacionOriginales[i]);
            }
        };
        
        console.log('categoriasClasificacionSeleccionados');
        console.log(categoriasClasificacionSeleccionados);
    }

    verificarSeleccionoTablas() {
        if(this.state.tablasSeleccionadas.length > 0) {
            this.clean();
            this.creandoArreglos();
            this.props.showLoadingScreen();
        } else {
            alert("Seleccione por lo menos una tabla");
        }
    }

    creandoArreglos() {
        camposGuardar = [];
        tamanoFinalBandera = this.state.tablasOrginales.length, tamanoActualBandera = 0;
        for (var i = 0; i < this.state.tablasOrginales.length; i++) {
            this.tablasGuardarCampos(this.state.tablasOrginales[i].ID, i);
        };

        /*for (var i = 0; i < this.state.tablasSeleccionadas.length; i++) {
            //this.state.tablasSeleccionadas[i]
            var calcularComportamientoPago = false;
            var primeraVezEntra = true; //agregar valores de tabla a arreglo global de clientes, prestamos y pagos en ClasificarCartera.js
            if($("#ComportamientoPago"+i).prop('checked') == true)
                calcularComportamientoPago = true;

            if(calcularComportamientoPago) {
                this.fetchDataComportamientoPago(this.state.tablasSeleccionadas[i].ID);
                if(primeraVezEntra) {
                    primeraVezEntra = false;
                }
            }
            this.fetchDataTipoCredito(this.state.tablasSeleccionadas[i].ID);
        };*/
    }

    clean() {
        const transaction5 = new sql.Transaction( this.props.pool );
        transaction5.begin(err => {
            var rolledBack = false;
            transaction5.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction5);
            request.query("select MAX(fecha) AS 'fecha' from ResultadosString", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction5.rollback(err => {
                        });
                    }
                } else {
                    transaction5.commit(err => {
                        fechaGlobal = new Date (result.recordset[0].fecha.getFullYear(), result.recordset[0].fecha.getMonth(), result.recordset[0].fecha.getDate());
                        console.log('fechaGlobal antes');
                        console.log(fechaGlobal.getDate());
                        fechaGlobal.setDate(fechaGlobal.getDate() + 1);
                        console.log('fechaGlobal despues');
                        console.log(fechaGlobal.getDate());
                        console.log('fechaGlobal');
                        console.log(fechaGlobal);
                        console.log('result.recordset');
                        console.log(result.recordset);
                    });
                }
            });
        });
        /*const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("delete from ResultadosID", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
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
            const request = new sql.Request(transaction1);
            request.query("delete from ResultadosInt", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction1.rollback(err => {
                        });
                    }
                } else {
                    transaction1.commit(err => {
                    });
                }
            });
        }); // fin transaction

        const transaction2 = new sql.Transaction( this.props.pool );
        transaction2.begin(err => {
            var rolledBack = false;
            transaction2.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction2);
            request.query("delete from ResultadosDecimal", (err, result) => {
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
        }); // fin transaction

        const transaction3 = new sql.Transaction( this.props.pool );
        transaction3.begin(err => {
            var rolledBack = false;
            transaction3.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction3);
            request.query("delete from ResultadosDate", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction3.rollback(err => {
                        });
                    }
                } else {
                    transaction3.commit(err => {
                    });
                }
            });
        }); // fin transaction

        const transaction4 = new sql.Transaction( this.props.pool );
        transaction4.begin(err => {
            var rolledBack = false;
            transaction4.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction4);
            request.query("delete from ResultadosBool", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction4.rollback(err => {
                        });
                    }
                } else {
                    transaction4.commit(err => {
                    });
                }
            });
        }); // fin transaction

        const transaction5 = new sql.Transaction( this.props.pool );
        transaction5.begin(err => {
            var rolledBack = false;
            transaction5.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction5);
            request.query("delete from ResultadosString", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction5.rollback(err => {
                        });
                    }
                } else {
                    transaction5.commit(err => {
                    });
                }
            });
        });*/ // fin transaction
    }



    /*      
        *****   *****   *****       *****   *****   *****   *****
                        INICIAR ARREGLOS
        *****   *****   *****       *****   *****   *****   *****
    */

    tablasGuardarCampos (tablaID, posicionArregloTablasSel) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Tablas where ID = "+tablaID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var usuario = result.recordset[0].usuario;
                        var password = result.recordset[0].contrasena;
                        var servidor = result.recordset[0].servidor;
                        var basedatos = result.recordset[0].baseDatos;
                        var tabla = result.recordset[0].tabla;

                        /*              CONSIGUIENDO VALORES DE TABLA         */
                        const pool = new sql.ConnectionPool({
                            user: usuario,
                            password: password,
                            server: servidor,
                            database: basedatos,
                            stream: true,
                            connectionTimeout: 900000,
                            requestTimeout: 900000,
                            pool: {
                                max: 40,
                                min: 0,
                                idleTimeoutMillis: 30000
                            },
                            options: {
                                useUTC: false
                            }
                        });
                        pool.connect(err => {
                            pool.request() // or: new sql.Request(pool1)
                            .query("select * from "+tabla, (err, result) => {
                                if(result != undefined) {
                                    if(result.recordset.length > 0) {
                                        this.verificarGuardarCampos(tablaID, result.recordset, posicionArregloTablasSel);
                                    } else {
                                        alert('Tabla ID: '+tablaID+' no tiene valores.')
                                    }
                                } else {
                                    alert('Error en conección con Tabla ID: '+tablaID+'.')
                                    //agregar error fallo connecion tabla (no existe o malos campos)
                                }
                            });
                        }); // fin pool connect
                    });
                }
            });
        }); // fin transaction
    }

    verificarGuardarCampos (tablaID, valoresTabla, posicionArregloTablasSel) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Campos where tablaID = "+tablaID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        var identificadorCliente = result.recordset.filter(function( object ) {
                                                        return object.funcion.localeCompare("Identificador") == 0 && object.tabla.localeCompare("Cliente") == 0;
                                                    });
                        var identificadorPrestamo = result.recordset.filter(function( object ) {
                                                        return object.funcion.localeCompare("Identificador") == 0 && object.tabla.localeCompare("Préstamo") == 0;
                                                    });
                        var camposAGuardarCliente = result.recordset.filter(function( object ) {
                                                        return object.tabla.localeCompare("Cliente") == 0;
                                                    });
                        var camposAGuardarPrestamo = result.recordset.filter(function( object ) {
                                                        return object.tabla.localeCompare("Préstamo") == 0;
                                                    });
                        arregloCamposTablasSeleccionadas.splice(posicionArregloTablasSel, 0, result.recordset);
                        if(identificadorCliente.length == 0 && identificadorPrestamo.length == 0) {
                            alert("Tiene que ingresar un campo Identificador para Cliente o para Préstamo");
                        } else {
                            //viendo si se llama metodo crear arreglo para clientes y prestamos o solo uno
                            tamanoActualBandera++;
                            if(identificadorCliente.length > 0 && identificadorPrestamo.length > 0) {
                                //myWorker.postMessage(["iniciarArregloClientes", valoresTabla, identificadorCliente[0].nombre, identificadorCliente[0].tipo, camposAGuardarCliente, false]);
                                //myWorker.postMessage(["iniciarArregloPrestamos", valoresTabla, identificadorCliente[0].nombre, identificadorPrestamo[0].nombre, identificadorCliente[0].tipo, identificadorPrestamo[0].tipo, camposAGuardarPrestamo, true]);
                                constructor(["iniciarArregloClientes", valoresTabla, identificadorCliente[0].nombre, identificadorCliente[0].tipo, camposAGuardarCliente, false]);
                                constructor(["iniciarArregloPrestamos", valoresTabla, identificadorCliente[0].nombre, identificadorPrestamo[0].nombre, identificadorCliente[0].tipo, identificadorPrestamo[0].tipo, camposAGuardarPrestamo, true]);
                                camposGuardar.concat(result.recordset);
                                this.iniciarCalculoMora();
                                let self = this;
                                myWorker.onmessage = function(e) {
                                    if(e.data == 'terminoCrearArreglos') {
                                        //revisando que procedimientos llamar
                                        self.iniciarCalculoMora();
                                    }
                                }
                            } else {
                                if(identificadorCliente.length > 0) {
                                    //myWorker.postMessage(["iniciarArregloClientes", valoresTabla, identificadorCliente[0].nombre, identificadorCliente[0].tipo, camposAGuardarCliente, true]);
                                    constructor(["iniciarArregloClientes", valoresTabla, identificadorCliente[0].nombre, identificadorCliente[0].tipo, camposAGuardarCliente, true]);
                                    let self = this;
                                    camposGuardar.concat(result.recordset);
                                    this.iniciarCalculoMora();
                                    myWorker.onmessage = function(e) {
                                        console.log("llamado de vuelta");
                                        console.log(e);
                                        if(e.data == 'terminoCrearArreglos') {
                                            //revisando que procedimientos llamar
                                            self.iniciarCalculoMora();
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }); // fin transaction
    }

    /*      
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
                        INICIAR ARREGLOS
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
    */






    /*      
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
                        COMPORTAMIENTO PAGO
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
    */

    iniciarCalculoMora () {
        //como no tiene id prestamo o cliente, no se puede calcular comportamiento plan pago, agregar mensaje bitacora  // si verificarComportamientoPago == false
        if( tamanoActualBandera == tamanoFinalBandera ) {
            guardarUnicaVez = false;
            guardarTipoCredito = false, guardarCategoriaClasificacion = false, guardarMora = false, guardarCriterioDeterioro = false;
            /*for (var i = 0; i < this.state.tablasOrginales.length; i++) {
                this.fetchDataComportamientoPago(this.state.tablasOrginales[i].ID);
            };*/
            //comportamientoPagoBanderas = [], tiposCreditosBanderas = [], categoriasClasificacionBanderas
            comportamientoPagoBanderas = [];
            for (var i = 0; i < comportamientoPagoSeleccionados.length; i++) {
                comportamientoPagoBanderas.push(false);
                this.getPrestamoTablaComportamientoPago(comportamientoPagoSeleccionados[i], i);
            }
            if(comportamientoPagoSeleccionados.length == 0) {
                this.initWebWorkerComportamientoPago(null, null, null, null, null, null, false, null);
            }
        }
    }

    /*fetchDataComportamientoPago (prestamoTablaID) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ComportamientoPago where prestamoTablaID = "+prestamoTablaID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        banderaGuardarResultadosTamActual++;
                        this.initWebWorkerComportamientoPago(null, null, null, null, null, null, false);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        //banderaGuardarResultadosTamFinal += result.recordset.length;
                        for (var i = 0; i < result.recordset.length; i++) {
                            this.getPrestamoTablaComportamientoPago(result.recordset[i]);
                        }
                        if(result.recordset.length == 0) {
                            this.initWebWorkerComportamientoPago(null, null, null, null, null, null, false);
                        }
                    });
                }
            });
        }); // fin transaction
    }*/

    getPrestamoTablaComportamientoPago(ComportamientoPago, index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Tablas where ID = "+ComportamientoPago.prestamoTablaID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        this.initWebWorkerComportamientoPago(null, null, null, null, null, null, false, index);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length == 0) {
                            this.initWebWorkerComportamientoPago(null, null, null, null, null, null, false);
                        } else {
                            this.getPrestamoCamposDeTablaComportamientoPago(result.recordset[0], ComportamientoPago, index);
                        }
                    });
                }
            });
        }); // fin transaction
    }

    getPrestamoCamposDeTablaComportamientoPago(tabla, ComportamientoPago, index) {
        let self = this;
        this.getFieldsFromCamposTable(tabla, ComportamientoPago, "prestamos", function(camposDePrestamoTabla, valoresDeTablaPrestamo, ComportamientoPago) {
            self.getPlanPagoTablaComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, ComportamientoPago, index);
        }, index);
    }

    getPlanPagoTablaComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, ComportamientoPago, index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Tablas where ID = "+ComportamientoPago.planPagoTablaID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        this.initWebWorkerComportamientoPago(null, null, null, null, null, null, false, index);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length == 0) {
                            this.initWebWorkerComportamientoPago(null, null, null, null, null, null, false, index);
                        } else {
                            this.getPlanPagosCamposDeTablaComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, result.recordset[0], ComportamientoPago, index);
                        }
                    });
                }
            });
        }); // fin transaction
    }

    getPlanPagosCamposDeTablaComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, tabla, ComportamientoPago, index) {
        guardarMora = true;
        let self = this;
        this.getFieldsFromCamposTable(tabla, ComportamientoPago, "planpagos", function(camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, ComportamientoPago) {
            self.initWebWorkerComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, ComportamientoPago, true, index);
        }, camposDePrestamoTabla, valoresDeTablaPrestamo, index);
    }

    getPlanPagoCamposDeTablaComportamientoPago(prestamoTabla, camposDePrestamoTabla, tabla, ComportamientoPago) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Campos where tablaID = "+tabla.ID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        banderaGuardarResultadosTamActual++;
                        this.initWebWorkerComportamientoPago(null, null, null, null, null, null, false, index);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {

                        /*              CONSIGUIENDO VALORES DE TABLA DE PLAN DE PAGOS         */
                        const pool = new sql.ConnectionPool({
                            user: tabla.usuario,
                            password: tabla.contrasena,
                            server: tabla.servidor,
                            database: tabla.baseDatos,
                            stream: true,
                            connectionTimeout: 900000,
                            requestTimeout: 900000,
                            pool: {
                                max: 40,
                                min: 0,
                                idleTimeoutMillis: 30000
                            },
                            options: {
                                useUTC: false
                            }
                        });
                        pool.connect(err => {
                            pool.request() // or: new sql.Request(pool1)
                            .query("select * from "+tabla.tabla, (err, result) => {
                                this.getFieldsComportamientoPago(prestamoTabla, camposDePrestamoTabla, result.recordset, ComportamientoPago);
                            });
                        }); // fin pool connect
                    });
                }
            });
        }); // fin transaction
    }

    getFieldsComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, ComportamientoPago) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Campos where ID = "+ComportamientoPago.idClientePrestamoCampoID+" or ID = "+ComportamientoPago.idClientePlanPagoCampoID+" or ID = "+ComportamientoPago.numeroPrestamoCampoID+" or ID = "+ComportamientoPago.numeroPlanPagoCampoID+" or ID = "+ComportamientoPago.pagoCapitalPrestamoCampoID+" or ID = "+ComportamientoPago.pagoCapitalPlanPagoCampoID+" or ID = "+ComportamientoPago.pagoImpuestosPrestamoCampoID+" or ID = "+ComportamientoPago.pagoImpuestosPlanPagoCampoID+" or ID = "+ComportamientoPago.fechaPrestamoCampoID+" or ID = "+ComportamientoPago.fechaPlanPagoCampoID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        this.initWebWorkerComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, result.recordset, ComportamientoPago, false, index);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log("44");
                        this.initWebWorkerComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, result.recordset, ComportamientoPago, true);
                    });
                }
            });
        }); // fin transaction
    }

    initWebWorkerComportamientoPago (camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, ComportamientoPago, iniciarProceso, index) {
        //myWorker.postMessage(["comportamientoPago", camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, ComportamientoPago]);
        console.log('comportamientoPagoBanderas');
        console.log(comportamientoPagoBanderas);
        if(index != null && !comportamientoPagoBanderas[index])
            comportamientoPagoBanderas[index] = true;
        console.log('comportamientoPagoBanderas');
        console.log(comportamientoPagoBanderas);
        if(iniciarProceso)
            constructor(["comportamientoPago", camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, ComportamientoPago]);
        //this.checkFinishMethods();
        var finTodasLlamadas = true;
        for (var i = 0; i < comportamientoPagoBanderas.length; i++) {
            if(!comportamientoPagoBanderas[i]) {
                finTodasLlamadas = false;
                break;
            }
        };
        if(finTodasLlamadas) {
            this.iniciarTipoDeCreditos();
        }
    }

    getFieldsFromCamposTable (tabla, ComportamientoPago, banderaMetodoLlamado, callbackParam, camposDePrestamoTabla, valoresDeTablaPrestamo, index) {
        let self = this;
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Campos where tablaID = "+tabla.ID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        //banderaGuardarResultadosTamActual++;
                        this.initWebWorkerComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, result.recordset, ComportamientoPago, false, index);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {

                        /*              UTILIZAR UN "WEBPACK" Y HACER WEB WORKER PARA GUARDAR O TRAER COSAS (sql en web worker)        */

                        /*              CONSIGUIENDO VALORES DE TABLA DE PRESTAMOS         */
                        const pool = new sql.ConnectionPool({
                            user: tabla.usuario,
                            password: tabla.contrasena,
                            server: tabla.servidor,
                            database: tabla.baseDatos,
                            stream: true,
                            connectionTimeout: 900000,
                            requestTimeout: 900000,
                            pool: {
                                max: 40,
                                min: 0,
                                idleTimeoutMillis: 30000
                            },
                            options: {
                                useUTC: false
                            }
                        });
                        let camposTabla = result.recordset;
                        pool.connect(err => {
                            pool.request() // or: new sql.Request(pool1)
                            .query("select * from "+tabla.tabla, (err, result) => {
                                console.log(result);
                                console.log(err);
                                /*var nuevoArregloTrans = [];
                                for (var i = 0; i < result.recordset.length; i++) {
                                    console.log(result.recordset[i]);
                                    console.log(result.recordset[i].length);
                                    for (var k = 0; k < result.recordset[i].length; k++) {
                                        console.log(result.recordset[i][k]);
                                        for (var j = 0; j < camposTabla.length; j++) {
                                            if(j==0) {
                                                nuevoArregloTrans.push({});
                                                console.log(result.recordset[i]);
                                                console.log(result.recordset[i][k]);
                                                nuevoArregloTrans[i].camposTabla[j].nombre = result.recordset[i][k][camposTabla[j].nombre]
                                            } else
                                                nuevoArregloTrans[i].camposTabla[j].nombre = result.recordset[i][k][camposTabla[j].nombre]
                                        };
                                    }
                                };*/
                                /*for (var i = 0; i < result.recordset.length; i++) {
                                    Object.keys(result.recordset[i]).forEach(function(key,index) {
                                        // key: the name of the object key
                                        // index: the ordinal position of the key within the object
                                        if(!self.propiedadDeObjetoExisteEnTablaCampos(camposTabla, key)) {
                                            delete result.recordset[i][key];
                                        }
                                    });
                                }*/
                                console.log("result.recordset");
                                console.log(result.recordset);
                                //result.recordset = nuevoArregloTrans;
                                if(banderaMetodoLlamado == 'prestamos')
                                    callbackParam(camposTabla, result.recordset, ComportamientoPago, index);
                                else
                                    callbackParam(camposDePrestamoTabla, valoresDeTablaPrestamo, camposTabla, result.recordset, ComportamientoPago, index);
                                //callbackParam(result.recordset, ComportamientoPago);
                                //eval("this."+callbackParam+"("+result.recordset+", "+camposTabla+", "+ComportamientoPago+");");
                            });
                        }); // fin pool connect
                    });
                }
            });
        }); // fin transaction
    }

    propiedadDeObjetoExisteEnTablaCampos(camposTabla, key) {
        for (var i = 0; i < camposTabla.length; i++) {
            if (camposTabla[i].nombre.localeCompare(key) == 0) {
                return true;
            }
        };
        return false;
    }


    hacerChekeosDeVariablesAlImportar () {
        /*

            EN RESULT DE CAMPOS DESPUES DE TRAER POR TABLA ID

            if(result.recordset[i].tipo.localeCompare("bit") == 0 || result.recordset[i].tipo.localeCompare("date") == 0 || result.recordset[i].tipo.localeCompare("varchar") == 0) {
                if(result.recordset[i].tipo.localeCompare("bit") == 0 || result.recordset[i].tipo.localeCompare("varchar") == 0) {
                    if(selectFieldsQueryString.length > 0)
                        selectFieldsQueryString+=", ";
                    selectFieldsQueryString+=result.recordset[i].nombre;
                } else if(result.recordset[i].tipo.localeCompare("date") == 0) {
                    if(selectFieldsQueryString.length > 0)
                        selectFieldsQueryString+=", ";
                    selectFieldsQueryString+=result.recordset[i].nombre;
                }
            } else if(result.recordset[i].tipo.localeCompare("int") == 0) {
                if(selectFieldsQueryString.length > 0)
                    selectFieldsQueryString+=", ";
                selectFieldsQueryString+=result.recordset[i].nombre;
            }
        */
    }

    /*  
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****    
        *****   *****   *****       *****   *****   *****   *****
                        COMPORTAMIENTO PAGO
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
    */





















    /*      
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
                        TIPO DE CREDITOS
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
    */

    iniciarTipoDeCreditos () {
        //for (var i = 0; i < this.state.tablasOrginales.length; i++) {
            //this.fetchDataTipoCredito();
        //};
        tiposCreditosBanderas = [];
        for (var i = 0; i < tiposCreditosSeleccionados.length; i++) {
            tiposCreditosBanderas.push(false);
            this.fetchDataTipoCredito(tiposCreditosSeleccionados[i].ID, i);
        }
        if(tiposCreditosSeleccionados.length == 0) {
            this.verifyTypeCreditFinal(null, null, false, null);
        }
    }

    fetchDataTipoCredito (ID, index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from TipoCredito where ID = "+ID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        this.verifyTypeCreditFinal(null, null, false, index);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        //arregloCamposTipoCreditos: Cada posicion del arreglo corresponde a la del tipo de credito
                        var arregloReglasTipoCreditos = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            this.fetchDataReglasTipoCreditoCampos(result.recordset[i], arregloReglasTipoCreditos, i, result.recordset, index);
                        }
                        if(result.recordset.length == 0) {
                            this.verifyTypeCreditFinal(null, null, false, index);
                        }
                    });
                }
            });
        }); // fin transaction
    }

    fetchDataReglasTipoCreditoCampos (tipoCredito, arregloReglasTipoCreditos, i, arregloTipoCreditos, index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Reglas where nombreTablaRes = 'TipoCredito' and idTipoTabla="+tipoCredito.ID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        this.verifyTypeCreditFinal(arregloTipoCreditos, arregloReglasTipoCreditos, false, index);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        arregloReglasTipoCreditos[i] = result.recordset;
                        //verificando si este credito tiene reglas asociadas, si no no sumar a banderaGuardarResultadosTamFinalTIPOCREDITOS
                        this.verificarCamposReglasTipoCreditoCampos(arregloTipoCreditos, arregloReglasTipoCreditos, index);
                    });
                }
            });
        }); // fin transaction
    }

    verificarCamposReglasTipoCreditoCampos (arregloTipoCreditos, arregloReglasTipoCreditos, index) {
        for (var i = 0; i < arregloReglasTipoCreditos.length; i++) {
            if(arregloReglasTipoCreditos[i] != undefined) {
                for (var j = 0; j < arregloReglasTipoCreditos[i].length; j++) {
                    this.fetchDataCamposReglasTipoCreditoCampos(arregloReglasTipoCreditos[i][j], arregloReglasTipoCreditos, i, j, arregloTipoCreditos, index);
                };
                if(arregloReglasTipoCreditos[i].length == 0) {
                    this.verifyTypeCreditFinal(arregloTipoCreditos, arregloReglasTipoCreditos, false, index);
                }
            } else {
                this.verifyTypeCreditFinal(arregloTipoCreditos, arregloReglasTipoCreditos, false, index);
            }
        };
    }

    fetchDataCamposReglasTipoCreditoCampos (regla, arregloReglasTipoCreditos, i, j, arregloTipoCreditos, index) {
        if(regla.campoCampoID != -1 && regla.campoCampoID != -2 && regla.campoCampoID != -3) {
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("select * from Campos where ID = "+regla.campoCampoID, (err, result) => {
                    if (err) {
                        if (!rolledBack) {
                            console.log(err);
                            this.verifyTypeCreditFinal(arregloTipoCreditos, arregloReglasTipoCreditos, false, index);
                            transaction.rollback(err => {
                            });
                        }
                    } else {
                        transaction.commit(err => {
                            arregloReglasTipoCreditos[i][j].campoValor = result.recordset[0];
                            this.verificarValoresReglasTipoCreditoCampos(arregloTipoCreditos, arregloReglasTipoCreditos, index);
                        });
                    }
                });
            }); // fin transaction
        } else if(regla.campoCampoID == -1) {
            arregloReglasTipoCreditos[i][j].campoValor = {nombre: "diasMora", tabla: "Préstamo"};
            this.verificarValoresReglasTipoCreditoCampos(arregloTipoCreditos, arregloReglasTipoCreditos, index);
        } else if(regla.campoCampoID == -2) {
            arregloReglasTipoCreditos[i][j].campoValor = {nombre: "granDeudor", tabla: "Cliente"};
            this.verificarValoresReglasTipoCreditoCampos(arregloTipoCreditos, arregloReglasTipoCreditos, index);
        } else if(regla.campoCampoID == -3) {
            arregloReglasTipoCreditos[i][j].campoValor = {nombre: "pequenoDeudor", tabla: "Cliente"};
            this.verificarValoresReglasTipoCreditoCampos(arregloTipoCreditos, arregloReglasTipoCreditos, index);
        }
    }

    verificarValoresReglasTipoCreditoCampos (arregloTipoCreditos, arregloReglasTipoCreditos, index) {
        for (var i = 0; i < arregloReglasTipoCreditos.length; i++) {
            for (var j = 0; j < arregloReglasTipoCreditos[i].length; j++) {
                var idsValores = arregloReglasTipoCreditos[i][j].valor.split(",");
                for (var k = 0; k < idsValores.length; k++) {
                    this.fetchDataValoresReglasTipoCreditoCampos(idsValores[k], arregloReglasTipoCreditos[i][j].esListaValor, arregloReglasTipoCreditos, i, j, arregloTipoCreditos, index);
                };
            };
        };
    }

    fetchDataValoresReglasTipoCreditoCampos (id, esLista, arregloReglasTipoCreditos, i, j, arregloTipoCreditos, index) {
        var tabla;
        if(esLista)
            tabla = 'VariablesdeLista';
        else
            tabla = 'Campos';
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from "+tabla+" where ID = "+id, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        this.verifyTypeCreditFinal(arregloTipoCreditos, arregloReglasTipoCreditos, false, index);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(arregloReglasTipoCreditos[i][j].valorValores == undefined)
                            arregloReglasTipoCreditos[i][j].valorValores = [];
                        arregloReglasTipoCreditos[i][j].valorValores.push(result.recordset[0]);
                        guardarTipoCredito = true;
                        this.verifyTypeCreditFinal(arregloTipoCreditos, arregloReglasTipoCreditos, true, index);
                    });
                }
            });
        }); // fin transaction
    }

    verifyTypeCreditFinal (arregloTipoCreditos, arregloReglasTipoCreditos, iniciarProceso, index) {
        if(arregloReglasTipoCreditos != null) {
            if(index != null && !tiposCreditosBanderas[index])
                tiposCreditosBanderas[index] = true;
            
            var tieneTodosLosCampos = true, tieneTodosLosValores = true;
            for (var i = 0; i < arregloReglasTipoCreditos.length; i++) {
                if(arregloReglasTipoCreditos[i] != undefined) {
                    for (var j = 0; j < arregloReglasTipoCreditos[i].length; j++) {
                        if(arregloReglasTipoCreditos[i][j].campoValor == undefined) {
                            tieneTodosLosCampos = false;
                            break;
                        }
                        if(arregloReglasTipoCreditos[i][j].valorValores == undefined) {
                            tieneTodosLosValores = false;
                            break;
                        }
                    };
                }
            };

            if(iniciarProceso && tieneTodosLosCampos && tieneTodosLosValores) {
                constructor(["tiposCredito", arregloTipoCreditos, arregloReglasTipoCreditos]);
            }

            var finTodasLlamadas = true;
            for (var i = 0; i < tiposCreditosBanderas.length; i++) {
                if(!tiposCreditosBanderas[i]) {
                    finTodasLlamadas = false;
                    break;
                }
            };

            if(finTodasLlamadas) {
                console.log(arregloTipoCreditos);
                console.log(arregloReglasTipoCreditos);
                //myWorker.postMessage(["tiposCredito", arregloTipoCreditos, arregloReglasTipoCreditos]);
                /*if(iniciarProceso)
                    constructor(["tiposCredito", arregloTipoCreditos, arregloReglasTipoCreditos]);*/

                if(finTodasLlamadas) {
                    this.iniciarCategoriasClasificacion();
                }
            }
        } else {
            this.iniciarCategoriasClasificacion();
        }
    }

    /* 
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****     
        *****   *****   *****       *****   *****   *****   *****
                        TIPO DE CREDITOS
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
    */






















    /*      
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
                        CATEGORIAS CLASIFICACION
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
    */

    iniciarCategoriasClasificacion () {
        //for (var i = 0; i < this.state.tablasOrginales.length; i++) {
            //this.fetchDataCategoriaClasificacion();
        //};
        categoriasClasificacionBanderas = [];
        for (var i = 0; i < categoriasClasificacionSeleccionados.length; i++) {
            categoriasClasificacionBanderas.push(false);
            this.fetchDataCategoriaClasificacion(categoriasClasificacionSeleccionados[i].ID, i);
        }
        if(categoriasClasificacionSeleccionados.length == 0) {
            this.verifyClasificationCategoryFinal(null, null, false, null);
        }
    }

    fetchDataCategoriaClasificacion (ID, index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from CategoriaClasificacion where ID = "+ID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        this.verifyClasificationCategoryFinal(null, null, false, index);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        //arregloCamposTipoCreditos: Cada posicion del arreglo corresponde a la del tipo de credito
                        var arregloReglasTipoCreditos = [];
                        for (var i = 0; i < result.recordset.length; i++) {
                            this.fetchDataReglasCategoriaClasificacionCampos(result.recordset[i], arregloReglasTipoCreditos, i, result.recordset, index);
                        }
                        if(result.recordset.length == 0) {
                            this.verifyClasificationCategoryFinal(null, null, false, index);
                        }
                    });
                }
            });
        }); // fin transaction
    }

    fetchDataReglasCategoriaClasificacionCampos (tipoCredito, arregloReglasTipoCreditos, i, arregloTipoCreditos, index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Reglas where nombreTablaRes = 'CategoriaClasificacion' and idTipoTabla="+tipoCredito.ID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        this.verifyClasificationCategoryFinal(arregloTipoCreditos, arregloReglasTipoCreditos, false, index);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        arregloReglasTipoCreditos[i] = result.recordset;
                        this.verificarCamposReglasCategoriaClasificacionCampos(arregloTipoCreditos, arregloReglasTipoCreditos, index);
                    });
                }
            });
        }); // fin transaction
    }

    verificarCamposReglasCategoriaClasificacionCampos (arregloTipoCreditos, arregloReglasTipoCreditos, index) {
        for (var i = 0; i < arregloReglasTipoCreditos.length; i++) {
            if(arregloReglasTipoCreditos[i] != undefined) {
                for (var j = 0; j < arregloReglasTipoCreditos[i].length; j++) {
                    this.fetchDataCamposReglasCategoriaClasificacionCampos(arregloReglasTipoCreditos[i][j], arregloReglasTipoCreditos, i, j, arregloTipoCreditos, index);
                };
                if(arregloReglasTipoCreditos[i].length == 0) {
                    this.verifyClasificationCategoryFinal(arregloTipoCreditos, arregloReglasTipoCreditos, false, index);
                }
            } else {
                this.verifyClasificationCategoryFinal(arregloTipoCreditos, arregloReglasTipoCreditos, false, index);
            }
        };
    }

    fetchDataCamposReglasCategoriaClasificacionCampos (regla, arregloReglasTipoCreditos, i, j, arregloTipoCreditos, index) {
        if(regla.campoCampoID != -1) {
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("select * from Campos where ID = "+regla.campoCampoID, (err, result) => {
                    if (err) {
                        if (!rolledBack) {
                            console.log(err);
                            this.verifyClasificationCategoryFinal(arregloTipoCreditos, arregloReglasTipoCreditos, false, index);
                            transaction.rollback(err => {
                            });
                        }
                    } else {
                        transaction.commit(err => {
                            arregloReglasTipoCreditos[i][j].campoValor = result.recordset[0];
                            this.verificarValoresReglasCategoriaClasificacionCampos(arregloTipoCreditos, arregloReglasTipoCreditos, index);
                        });
                    }
                });
            }); // fin transaction
        } else if(regla.campoCampoID == -1) {
            arregloReglasTipoCreditos[i][j].campoValor = {nombre: "diasMora", tabla: "Préstamo"};
            this.verificarValoresReglasCategoriaClasificacionCampos(arregloTipoCreditos, arregloReglasTipoCreditos, index);
        }
    }

    verificarValoresReglasCategoriaClasificacionCampos (arregloTipoCreditos, arregloReglasTipoCreditos, index) {
        for (var i = 0; i < arregloReglasTipoCreditos.length; i++) {
            for (var j = 0; j < arregloReglasTipoCreditos[i].length; j++) {
                var idsValores = arregloReglasTipoCreditos[i][j].valor.split(",");
                for (var k = 0; k < idsValores.length; k++) {
                    this.fetchDataValoresReglasCategoriaClasificacionCampos(idsValores[k], arregloReglasTipoCreditos[i][j].esListaValor, arregloReglasTipoCreditos, i, j, arregloTipoCreditos, index);
                };
            };
        };
    }

    fetchDataValoresReglasCategoriaClasificacionCampos (id, esLista, arregloReglasTipoCreditos, i, j, arregloTipoCreditos, index) {
        var tabla;
        if(esLista)
            tabla = 'VariablesdeLista';
        else
            tabla = 'Campos';
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from "+tabla+" where ID = "+id, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        this.verifyClasificationCategoryFinal(arregloTipoCreditos, arregloReglasTipoCreditos, false, index);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(arregloReglasTipoCreditos[i][j].valorValores == undefined)
                            arregloReglasTipoCreditos[i][j].valorValores = [];
                        arregloReglasTipoCreditos[i][j].valorValores.push(result.recordset[0]);
                        guardarCategoriaClasificacion = true;
                        this.verifyClasificationCategoryFinal(arregloTipoCreditos, arregloReglasTipoCreditos, true, index);
                    });
                }
            });
        }); // fin transaction
    }

    verifyClasificationCategoryFinal (arregloTipoCreditos, arregloReglasTipoCreditos, iniciarProceso, index) {
        if(arregloReglasTipoCreditos != null) {
            if(index != null && !categoriasClasificacionBanderas[index])
                categoriasClasificacionBanderas[index] = true;

            var tieneTodosLosCampos = true, tieneTodosLosValores = true;
            for (var i = 0; i < arregloReglasTipoCreditos.length; i++) {
                if(arregloReglasTipoCreditos[i] != undefined) {
                    for (var j = 0; j < arregloReglasTipoCreditos[i].length; j++) {
                        if(arregloReglasTipoCreditos[i][j].campoValor == undefined) {
                            tieneTodosLosCampos = false;
                            break;
                        }
                        if(arregloReglasTipoCreditos[i][j].valorValores == undefined) {
                            tieneTodosLosValores = false;
                            break;
                        }
                    };
                }
            };

            console.log('iniciarProceso');
            console.log(iniciarProceso);
            console.log('tieneTodosLosCampos');
            console.log(tieneTodosLosCampos);
            console.log('tieneTodosLosValores');
            console.log(tieneTodosLosValores);

            if(iniciarProceso && tieneTodosLosCampos && tieneTodosLosValores) {
                constructor(["categoriasClasificacion", arregloTipoCreditos, arregloReglasTipoCreditos]);
            }

            var finTodasLlamadas = true;
            for (var i = 0; i < categoriasClasificacionBanderas.length; i++) {
                if(!categoriasClasificacionBanderas[i]) {
                    finTodasLlamadas = false;
                    break;
                }
            };
            console.log('categoriasClasificacionBanderas');
            console.log(categoriasClasificacionBanderas);
            console.log('categoriasClasificacionSeleccionados');
            console.log(categoriasClasificacionSeleccionados);
            if(finTodasLlamadas) {
                console.log(arregloTipoCreditos);
                console.log(arregloReglasTipoCreditos);
                //myWorker.postMessage(["tiposCredito", arregloTipoCreditos, arregloReglasTipoCreditos]);
                /*if(iniciarProceso)
                    constructor(["categoriasClasificacion", arregloTipoCreditos, arregloReglasTipoCreditos]);*/
                if(finTodasLlamadas) {
                    this.iniciarCriteriosDeterioro();
                }
            }
        } else {
            this.iniciarCriteriosDeterioro();
        }
    }



    /*      
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
                        CATEGORIAS CLASIFICACION
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
    */



























    /*      
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
                        CRITERIOS DE DETERIORO
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
    */

    /*iniciarCriteriosDeterioro () {
        //como no tiene id prestamo o cliente, no se puede calcular comportamiento plan pago, agregar mensaje bitacora  // si verificarComportamientoPago == false
        if( tamanoActualBandera == tamanoFinalBandera ) {
            banderaGuardarResultadosTamActual = 0;
            banderaGuardarResultadosTamFinal = this.state.tablasOrginales.length;
            for (var i = 0; i < this.state.tablasOrginales.length; i++) {
                var calcularComportamientoPago = false;
                var primeraVezEntra = true; //agregar valores de tabla a arreglo global de clientes, prestamos y pagos en ClasificarCartera.js

                //como no tiene id prestamo o cliente, no se puede calcular comportamiento plan pago, agregar mensaje bitacora  // si verificarComportamientoPago == false

                if(verificarComportamientoPago && $("#ComportamientoPago"+i).prop('checked') == true)
                    calcularComportamientoPago = true;

                //if(calcularComportamientoPago) {
                    this.fetchDataComportamientoPago(this.state.tablasOrginales[i].ID);
                    //banderaGuardarResultadosTamFinal++;
                    /*if(primeraVezEntra) {
                        primeraVezEntra = false;
                    }
                }
                if(verificarTipoCredito) {
                    //this.fetchDataTipoCredito(this.state.tablasOrginales[i].ID);
                    //banderaGuardarResultadosTamFinal++;
                //}
            };
        }
    }*/

    iniciarCriteriosDeterioro () {
        guardarCriterioDeterioro = true;
        this.getCriterioDeterioro();
    }

    getCriterioDeterioro() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from CriterioDeterioro", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        //banderaGuardarResultadosTamActual++;
                        this.verifyDeteriorationCriteriaFinal(null, false);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.verifyDeteriorationCriteriaFinal(result.recordset, true);
                    });
                }
            });
        }); // fin transaction
    }

    verifyDeteriorationCriteriaFinal (criteriosDeterioro, calcular) {
        /*banderaGuardarResultadosTamActualCATEGORIACLASIFICACION++;
        if(tamanoActualBanderaValoresReglasCategoriaClasificacionCampos == tamanoFinalBanderaValoresReglasCategoriaClasificacionCampos) {
            console.log(arregloTipoCreditos);
            console.log(arregloReglasTipoCreditos);
            //myWorker.postMessage(["tiposCredito", arregloTipoCreditos, arregloReglasTipoCreditos]);
            if(iniciarProceso)
                constructor(["categoriasClasificacion", arregloTipoCreditos, arregloReglasTipoCreditos]);
            //this.checkFinishMethods();
            if(banderaGuardarResultadosTamFinalCATEGORIACLASIFICACION == banderaGuardarResultadosTamActualCATEGORIACLASIFICACION) {
                this.iniciarCategoriasClasificacion();
            }
        }*/
        if(calcular)
            constructor(["estimacionDeterioro", criteriosDeterioro]);
        this.checkFinishMethods();
    }


    /*      
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
                        CRITERIOS DE DETERIORO
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
    */


















    /*      
        *****   *****   *****       *****   *****   *****   *****
                        GUARDAR RESULTADOS
        *****   *****   *****       *****   *****   *****   *****
    */

    checkFinishMethods() {
        /*console.log("banderaGuardarResultadosTamActual = "+banderaGuardarResultadosTamActual);
        console.log("banderaGuardarResultadosTamFinal = "+banderaGuardarResultadosTamFinal);
        if( banderaGuardarResultadosTamActual == banderaGuardarResultadosTamFinal ) {
            console.log("FIN DE CALCULOS");
            console.log("GUARDANDO CAMPOS");
            for (var i = 0; i < arregloCamposTablasSeleccionadas.length; i++) {
                console.log(arregloCamposTablasSeleccionadas[i]);
            };
        }*/
        if(!guardarUnicaVez) {
            guardarUnicaVez = true;
            var self = this;
            setTimeout(function(){
                //alert("Clasificación realizada con exito");
                self.setState({
                    mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: self.state.mensajeModal.idElementoSelec, indiceX: self.state.mensajeModal.indiceX}
                });
                self.showSuccesMessage("Exito", "Cálculo realizado con éxito.");
                self.getFieldsToSave();
            }, 4000);
        }
        //alert("Clasificacion realizada con exito");
        //this.getFieldsToSave();
    }

    getFieldsToSave() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Campos where guardar = 'true' and (tabla = 'Cliente' or tabla = 'Préstamo')", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.startSavingObjects(result.recordset);
                    });
                }
            });
        }); // fin transaction
    }

    startSavingObjects(arregloDeCamposAGuardar) {
        //arreglos de archivo de calculos
        var camposDeCliente = arregloDeCamposAGuardar.filter(function( object ) {
                                return object.tabla.localeCompare("Cliente") == 0;
                            });
        var camposDePrestamo = arregloDeCamposAGuardar.filter(function( object ) {
                                return object.tabla.localeCompare("Préstamo") == 0;
                            });
        var clientes = retornarClientes();
        var prestamos = retornarPrestamos();
        var bitacora = retornarBitacora();
        for (var i = 0; i < clientes.length; i++) {
            var identificadorCliente;
            for (var j = 0; j < camposDeCliente.length; j++) {
                if(camposDeCliente[j].funcion.localeCompare("Identificador") == 0) {
                    identificadorCliente = clientes[i][camposDeCliente[j].nombre];
                    var objeto = "Cliente";
                    var nombre = camposDeCliente[j].nombre;
                    this.saveObjectID(identificadorCliente, objeto, nombre, "-1");
                    break;
                }
            };
            if(identificadorCliente != undefined) {
                for (var j = 0; j < camposDeCliente.length; j++) {
                    if(camposDeCliente[j].funcion.localeCompare("Identificador") != 0) {
                        var objeto = "Cliente";
                        var nombre = camposDeCliente[j].nombre;
                        var fecha = new Date();
                        var nombreTablaOrigenTipo = "Usuario";
                        //verificar si campo es valores de mora, categoria clas, tipo credito o criterio dete
                        //if()
                        var valor = clientes[i][camposDeCliente[j].nombre];
                        if(camposDeCliente[j].tipo.localeCompare("int") == 0) {
                            this.saveObjectIntField(identificadorCliente, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
                        } else if(camposDeCliente[j].tipo.localeCompare("decimal") == 0) {
                            this.saveObjectDecimalField(identificadorCliente, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
                        } else if(camposDeCliente[j].tipo.localeCompare("date") == 0) {
                            this.saveObjectDateField(identificadorCliente, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
                        } else if(camposDeCliente[j].tipo.localeCompare("bool") == 0) {
                            this.saveObjecBoolField(identificadorCliente, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
                        } else if(camposDeCliente[j].tipo.localeCompare("varchar") == 0) {
                            this.saveObjectStringField(identificadorCliente, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
                        }
                    }
                };

                for (var k = 0; k < prestamos[i].length; k++) {
                    var identificadorPrestamo;
                    for (var j = 0; j < camposDePrestamo.length; j++) {
                        if(camposDePrestamo[j].funcion.localeCompare("Identificador") == 0) {
                            identificadorPrestamo = prestamos[i][k][camposDePrestamo[j].nombre];
                            var objeto = "Préstamo";
                            var nombre = camposDePrestamo[j].nombre;
                            this.saveObjectID(identificadorPrestamo, objeto, nombre, identificadorCliente);
                            break;
                        }
                    };
                    if(identificadorPrestamo != undefined) {
                        for (var j = 0; j < camposDePrestamo.length; j++) {
                            if(camposDePrestamo[j].funcion.localeCompare("Identificador") != 0) {
                                var objeto = "Préstamo";
                                var nombre = camposDePrestamo[j].nombre;
                                var fecha = new Date();
                                var nombreTablaOrigenTipo = "Usuario";
                                //verificar si campo es valores de mora, categoria clas, tipo credito o criterio dete
                                //if()
                                var valor = prestamos[i][k][camposDePrestamo[j].nombre];
                                if(camposDePrestamo[j].tipo.localeCompare("int") == 0) {
                                    this.saveObjectIntField(identificadorPrestamo, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
                                } else if(camposDePrestamo[j].tipo.localeCompare("decimal") == 0) {
                                    this.saveObjectDecimalField(identificadorPrestamo, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
                                } else if(camposDePrestamo[j].tipo.localeCompare("date") == 0) {
                                    this.saveObjectDateField(identificadorPrestamo, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
                                } else if(camposDePrestamo[j].tipo.localeCompare("bool") == 0) {
                                    this.saveObjecBoolField(identificadorPrestamo, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
                                } else if(camposDePrestamo[j].tipo.localeCompare("varchar") == 0) {
                                    this.saveObjectStringField(identificadorPrestamo, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
                                }
                            }
                        };
                        if(guardarTipoCredito) {
                            var objeto = "Préstamo";
                            var nombre = "tipoCredito";
                            var fecha = new Date();
                            var nombreTablaOrigenTipo = "Usuario";
                            var valor = prestamos[i][k].tipoCredito;
                            this.saveObjectStringField(identificadorPrestamo, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
                        }
                        if(guardarCategoriaClasificacion) {
                            var objeto = "Préstamo";
                            var nombre = "categoriaClasificacion";
                            var fecha = new Date();
                            var nombreTablaOrigenTipo = "Usuario";
                            var valor = prestamos[i][k].categoriaClasificacion;
                            this.saveObjectStringField(identificadorPrestamo, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
                        }
                        if(guardarMora) {
                            var objeto = "Préstamo";
                            var nombreMesPlan = "mesDelPlan";
                            var fecha = new Date();
                            var nombreTablaOrigenTipo = "Usuario";
                            var valorMesPlan = this.formatDateCreation(prestamos[i][k].mesDelPlan);
                            this.saveObjectDateField(identificadorPrestamo, objeto, nombreMesPlan, fecha, nombreTablaOrigenTipo, valorMesPlan);

                            var nombreDiasMora = "diasMora";
                            var valorDiasMora = prestamos[i][k].diasMora;
                            this.saveObjectIntField(identificadorPrestamo, objeto, nombreDiasMora, fecha, nombreTablaOrigenTipo, valorDiasMora);

                            var nombreCapitalPagado = "totalCapitalPagado";
                            var valorCapitalPagado = prestamos[i][k].t0talC4pitalPagado;
                            this.saveObjectDecimalField(identificadorPrestamo, objeto, nombreCapitalPagado, fecha, nombreTablaOrigenTipo, valorCapitalPagado);

                            var nombreCapitalDeberiaPagado = "totalCapitalDeberiaPagado";
                            var valorCapitalDeberiaPagado = prestamos[i][k].t0talC4pitalD3beriaPagado;
                            this.saveObjectDecimalField(identificadorPrestamo, objeto, nombreCapitalDeberiaPagado, fecha, nombreTablaOrigenTipo, valorCapitalDeberiaPagado);

                            var nombreImpuestosPagado = "totalImpuestosPagado";
                            var valorImpuestosPagado = prestamos[i][k].t0tal1mpu3stosPagado;
                            this.saveObjectDecimalField(identificadorPrestamo, objeto, nombreImpuestosPagado, fecha, nombreTablaOrigenTipo, valorImpuestosPagado);

                            var nombreImpuestosDeberiaPagado = "totalImpuestosDeberiaPagado";
                            var valorImpuestosDeberiaPagado = prestamos[i][k].t0tal1mpu3stosD3beriaPagado;
                            this.saveObjectDecimalField(identificadorPrestamo, objeto, nombreImpuestosDeberiaPagado, fecha, nombreTablaOrigenTipo, valorImpuestosDeberiaPagado);
                        }
                        if(guardarCriterioDeterioro) {
                            var objeto = "Préstamo";
                            var nombreMesPlan = "mesDelPlan";
                            var fecha = new Date();
                            var nombreTablaOrigenTipo = "Usuario";
                            var nombreEstimacionDeterioro = "estimacionDeterioro";
                            var valorEstimacionDeterioro = prestamos[i][k].estimacionDeterioro;
                            this.saveObjectDecimalField(identificadorPrestamo, objeto, nombreEstimacionDeterioro, fecha, nombreTablaOrigenTipo, valorEstimacionDeterioro);
                        }
                    }
                };
                if(guardarMora) {
                    var objeto = "Préstamo";
                    var fecha = new Date();
                    var nombreTablaOrigenTipo = "Usuario";

                    var nombreCapitalPagado = "totalCapitalPagado";
                    var valorCapitalPagado = clientes[i].t0talC4pitalPagado;
                    this.saveObjectDecimalField(identificadorCliente, objeto, nombreCapitalPagado, fecha, nombreTablaOrigenTipo, valorCapitalPagado);

                    var nombreCapitalDeberiaPagado = "totalCapitalDeberiaPagado";
                    var valorCapitalDeberiaPagado = clientes[i].t0talC4pitalD3beriaPagado;
                    this.saveObjectDecimalField(identificadorCliente, objeto, nombreCapitalDeberiaPagado, fecha, nombreTablaOrigenTipo, valorCapitalDeberiaPagado);

                    var nombreImpuestosPagado = "totalImpuestosPagado";
                    var valorImpuestosPagado = clientes[i].t0tal1mpu3stosPagado;
                    this.saveObjectDecimalField(identificadorCliente, objeto, nombreImpuestosPagado, fecha, nombreTablaOrigenTipo, valorImpuestosPagado);

                    var nombreImpuestosDeberiaPagado = "totalImpuestosDeberiaPagado";
                    var valorImpuestosDeberiaPagado = clientes[i].t0tal1mpu3stosD3beriaPagado;
                    this.saveObjectDecimalField(identificadorCliente, objeto, nombreImpuestosDeberiaPagado, fecha, nombreTablaOrigenTipo, valorImpuestosDeberiaPagado);
                }
            }
        };
        if(guardarCriterioDeterioro) {
            var objeto = "CAPITAL_MINIMO";
            var nombreMesPlan = "mesDelPlan";
            var fecha = new Date();
            var nombreTablaOrigenTipo = "Usuario";
            var nombreCapitalMinimo = "capitalMinimo";
            var valorCapitalMinimo = retornarCapitalMinimo();
            this.saveObjectDecimalField(identificadorPrestamo, objeto, nombreCapitalMinimo, fecha, nombreTablaOrigenTipo, valorCapitalMinimo);
        }
        for (var i = 0; i < bitacora.length; i++) {
            this.saveBitacora(bitacora[i]);
        };
        this.props.hideLoadingScreen();
        console.log("FIIIIIIIN");
        console.log(clientes);
        console.log(prestamos);
        /*var prestamos =  constructor(["traerArrPrestamos"]);
        var pagos =  constructor(["traerArrPagos"]);
        var planpagos =  constructor(["traerArrPlanPagos"]);*/
    }

    saveObjectID(identificador, objeto, nombre, idPadre) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ResultadosID (identificador, objeto, nombre, idPadre) values ('"+identificador+"','"+objeto+"','"+nombre+"','"+idPadre+"')", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                    });
                }
            });
        }); // fin transaction
    }

    saveObjectIntField(idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ResultadosInt (idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) values ('"+idObjeto+"','"+objeto+"','"+nombre+"','"+this.formatDateCreation(fechaGlobal)+"','"+nombreTablaOrigenTipo+"',"+valor+")", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                    });
                }
            });
        }); // fin transaction
    }

    saveObjectDecimalField(idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ResultadosDecimal (idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) values ('"+idObjeto+"','"+objeto+"','"+nombre+"','"+this.formatDateCreation(fechaGlobal)+"','"+nombreTablaOrigenTipo+"',"+valor+")", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                    });
                }
            });
        }); // fin transaction
    }

    saveObjectDateField(idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ResultadosDate (idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) values ('"+idObjeto+"','"+objeto+"','"+nombre+"','"+this.formatDateCreation(fechaGlobal)+"','"+nombreTablaOrigenTipo+"','"+valor+"')", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                    });
                }
            });
        }); // fin transaction
    }

    saveObjecBoolField(idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ResultadosBool (idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) values ('"+idObjeto+"','"+objeto+"','"+nombre+"','"+this.formatDateCreation(fechaGlobal)+"','"+nombreTablaOrigenTipo+"',"+valor+")", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                    });
                }
            });
        }); // fin transaction
    }

    saveObjectStringField(idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ResultadosString (idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) values ('"+idObjeto+"','"+objeto+"','"+nombre+"','"+this.formatDateCreation(fechaGlobal)+"','"+nombreTablaOrigenTipo+"','"+valor+"')", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                    });
                }
            });
        }); // fin transaction
    }

    saveBitacora (bitacora) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into Bitacora (usuario, hora, operacion, mensaje) values ('dariovillalta','"+this.formatDateCreation(new Date())+"','"+bitacora.operacion+"','"+bitacora.mensaje+"')", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                    });
                }
            });
        }); // fin transaction
    }

    iterateProperties (arreglo) {
        for (var i = 0; i < arreglo.length; i++) {
            var identificadorCampoNombre;
            Object.keys(arreglo[i]).forEach(function(key,index) {
                // key: the name of the object key
                // index: the ordinal position of the key within the object
                identificadorCampoNombre = camposGuardar.filter(function( object ) {
                                return object.nombre.localeCompare(key) == 0 && object.funcion.localeCompare("Identificador") == 0;
                            });
            });
            if(identificadorCampoNombre.length > 0) {
                Object.keys(arreglo[i]).forEach(function(key,index) {
                    // key: the name of the object key
                    // index: the ordinal position of the key within the object
                    console.log("key");
                    console.log(key);
                    console.log("arreglo[i]");
                    console.log(arreglo[i]);
                    console.log("arreglo[i][key]");
                    console.log(arreglo[i][key]);
                    if(identificadorCampoNombre[0].funcion.localeCompare("Identificador") == 0) {
                        this.verifyResultID(identificadorCampoNombre[0].nombre, identificadorCampoNombre[0].tabla, key);
                    } else {
                        this.verifyResultField(identificadorCampoNombre[0].nombre, identificadorCampoNombre[0].tabla, key, arreglo[i][key]);
                    }
                });
            } else {
                //bitacora no existe campo id
            }
        };
    }

    formatDateCreation(date) {
        //formato si es STRING
        //aaaa/mm/dd
        //aaaa-mm-dd
        var monthNames = [
            "Ene", "Feb", "Mar",
            "Abr", "May", "Jun", "Jul",
            "Ago", "Sep", "Oct",
            "Nov", "Dec"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        monthIndex++;
        var year = date.getFullYear();
        return year + '-' + monthIndex + '-' + day;
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
            <div style={{height: "85vh", width: "100%"}}>
                <div style={{width: "100%", height: "7%"}}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%"}}>
                        <h2>Seleccione Tablas a Clasificar</h2>
                    </div>
                </div>
                <div style={{width: "100%", height: "11%"}}>
                    <SeleccionarTablaClasificarCarteraProceso tablasOrginales={this.state.tablasOrginales} tablasSeleccionadas={this.state.tablasSeleccionadas} selectTable={this.selectTable}> </SeleccionarTablaClasificarCarteraProceso>
                </div>
                <div style={{width: "100%", height: "76%"}}>
                    <div style={{height: "100%", overflowX: "scroll", overflowY: "hidden", whiteSpace: "nowrap", borderRadius: "5px", padding: "1% 0%", border: "solid 3px #cfd8dc", borderRadius: "5px", marginTop: "2%"}}>
                        <div style={{height: "100%", width: "100%", display: "inline-block", position: "relative"}}>
                            <div style={{height: "95%", width: "95%", backgroundColor: "white", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", borderRadius: "5px", overflowY: "scroll"}}>
                                <div className={"text-center"} style={{borderBottom: "solid 4px #cfd8dc"}}>
                                    <h3>Criterios de Clasificaci&oacute;n</h3>
                                </div>
                                <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "solid 3px #eceff1"}}>
                                    <div style={{width: "90%", height: "60%", textAlign: "center", display: "table"}}>
                                        <h5 style={{display: "table-cell", verticalAlign: "middle"}}>Comportamiento de Pago</h5>
                                    </div>
                                </div>
                                <div style={{width: "100%", height: "auto", overflowY: "scroll"}}>
                                    {this.state.comportamientoPagoOriginales.map((comportamientoPago, i) =>
                                        <div key={comportamientoPago.ID}>
                                            <OpcionTablasClasificar id={"comportamientoPago"+comportamientoPago.ID} texto={"Tabla: "+comportamientoPago.nombreTabla} callMethod={this.actualizarSeleccionarComportamientoPago}> </OpcionTablasClasificar>
                                        </div>
                                    )}
                                </div>

                                <div className={"text-center"} style={{borderBottom: "solid 4px #cfd8dc", borderTop: "solid 4px #cfd8dc"}}>
                                    <h3>Tipo de Cr&eacute;dito</h3>
                                </div>
                                <div style={{width: "100%", height: "auto", overflowY: "scroll"}}>
                                    {this.state.tiposCreditosOriginales.map((tiposCredito, i) =>
                                        <div key={tiposCredito.ID}>
                                            <OpcionTablasClasificar id={"tiposCredito"+tiposCredito.ID} texto={"Nombre: "+tiposCredito.nombre} callMethod={this.actualizarSeleccionarTiposCredito}> </OpcionTablasClasificar>
                                        </div>
                                    )}
                                </div>

                                <div className={"text-center"} style={{borderBottom: "solid 4px #cfd8dc", borderTop: "solid 4px #cfd8dc"}}>
                                    <h3>Categorias de Clasificaci&oacute;n</h3>
                                </div>
                                <div style={{width: "100%", height: "auto", overflowY: "scroll"}}>
                                    {this.state.categoriasClasificacionOriginales.map((categoriasClasificacion, i) =>
                                        <div key={categoriasClasificacion.ID}>
                                            <OpcionTablasClasificar id={"categoriasClasificacion"+categoriasClasificacion.ID} texto={"Nombre: "+categoriasClasificacion.categoria+" "+categoriasClasificacion.tipoCredito} callMethod={this.actualizarSeleccionarCategoriasClasificacion}> </OpcionTablasClasificar>
                                        </div>
                                    )}
                                </div>
                                
                                <div className={"text-center"} style={{borderBottom: "solid 4px #cfd8dc", borderTop: "solid 4px #cfd8dc"}}>
                                    <h3>Criterios de Deterioro</h3>
                                </div>
                                <div style={{width: "100%", height: "auto", overflowY: "scroll"}}>
                                    {this.state.criteriosDeterioroOriginales.map((criterioDeterioro, i) =>
                                        <div key={criterioDeterioro.ID} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <div style={{width: "90%", border: "solid 2px #eceff1"}}>
                                                <div style={{display: "inline-block", width: "100%", padding: "0%", borderLeft: "solid 2px #eceff1", position: "relative"}}>
                                                    <h4 style={{fontFamily: 'Circular Std Medium', color: "#71748d", cursor: "pointer", top: "70%", position: "absolute", top: "50%", transform: "translate(0, -50%)"}} className={"alert-heading"}>{criterioDeterioro.nombreClasPadre}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div style={{width: "100%", height: "6%", padding: "1% 0%"}} className={"text-center"}>
                    <a onClick={this.verificarSeleccionoTablas} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Iniciar </a>
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
