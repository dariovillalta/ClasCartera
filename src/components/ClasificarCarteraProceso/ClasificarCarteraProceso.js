import React from 'react';
import sql from 'mssql';

import SeleccionarTablaClasificarCarteraProceso from './SeleccionarTablaClasificarCarteraProceso.js';
import ConfiguracionTablasClasificar from './ConfiguracionTablasClasificar.js';

import {constructor} from "../ClasificarCreditoD.js";

const myWorker = new Worker("./components/ClasificarCredito.js");

//import "../../libs/moment/min/moment.min.js";

var tamanoFinalBandera = 0, tamanoActualBandera = 0, camposGuardar, arregloCamposTablasSeleccionadas = [];
var procesosACalcular = {capacidadDeudor: false, diasMora: false, disponibilidadGarantias: false, entornoEconomico: false, tiposCredito: false, categoriasClasificacion: false, criteriosDeterioro: false};
var banderaGuardarResultadosTamActual, banderaGuardarResultadosTamFinal;

export default class ClasificarCarteraProceso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widthActual: "33%",
            tablasOrginales: [],
            tablasSeleccionadas: [],
            opcionesTablasSeleccionadas: []
        }
        this.loadTables = this.loadTables.bind(this);
        this.selectTable = this.selectTable.bind(this);
        this.iniciarCalculo = this.iniciarCalculo.bind(this);
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
        this.obtenerTipoCredito = this.obtenerTipoCredito.bind(this);
        this.obtenerTipoCreditoCampos = this.obtenerTipoCreditoCampos.bind(this);
        this.fetchDataTipoCredito = this.fetchDataTipoCredito.bind(this);
        this.fetchDataReglasTipoCreditoCampos = this.fetchDataReglasTipoCreditoCampos.bind(this);
        this.fetchDataCamposReglasTipoCreditoCampos = this.fetchDataCamposReglasTipoCreditoCampos.bind(this);
        this.verificarCamposReglasTipoCreditoCampos = this.verificarCamposReglasTipoCreditoCampos.bind(this);
        this.fetchDataValoresReglasTipoCreditoCampos = this.fetchDataValoresReglasTipoCreditoCampos.bind(this);
        this.verificarValoresReglasTipoCreditoCampos = this.verificarValoresReglasTipoCreditoCampos.bind(this);
        this.verifyTypeCreditFinal = this.verifyTypeCreditFinal.bind(this);
        this.checkFinishMethods = this.checkFinishMethods.bind(this);
    }

    componentDidMount() {
        this.loadTables();
        //myWorker.postMessage(["comportamientoPago", sql]);
        myWorker.onmessage = function (event) {
            console.log('EN MAIN JS');
            console.log(event.data);
        };
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
                            result.recordset[i].active = false;
                        };
                        this.setState({
                            tablasOrginales: result.recordset
                        });
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
        for (var i = 0; i < this.state.tablasSeleccionadas.length; i++) {
            if(this.state.tablasOrginales[index].ID == this.state.tablasSeleccionadas[i].ID) {
                existeTablaEnConf = true;
                break;
            }
        };
        if(!existeTablaEnConf) {
            let tablasSelCopiaTemp = [...this.state.tablasSeleccionadas];
            tablasSelCopiaTemp.push(this.state.tablasOrginales[index]);
            this.setState({
                tablasSeleccionadas: tablasSelCopiaTemp
            });
            if(tablasSelCopiaTemp.length == 1) {
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
            }
            this.verificarProcesosAClasificar(this.state.tablasOrginales[index].ID);
        }
    }

    //metodo para agregar tipo de credito, tipo de cliente, criterios de clasificacion por tabla
    verificarProcesosAClasificar(index) {
        //opcionesTablasSeleccionadas
        //this.obtenerTipoCredito(index);
    }

    obtenerTipoCredito(index) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from TipoCredito where tablaID = "+index, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        if(result.recordset.length > 0) {
                            let tablasSelCopiaTemp = [...this.state.opcionesTablasSeleccionadas];
                            if(tablasSelCopiaTemp[this.state.tablasSeleccionadas.length-1] == undefined)
                                tablasSelCopiaTemp[this.state.tablasSeleccionadas.length-1] = {};
                            tablasSelCopiaTemp[this.state.tablasSeleccionadas.length-1].tipoCreditoNombre = result.recordset[0].nombre;
                            this.setState({
                                opcionesTablasSeleccionadas: tablasSelCopiaTemp
                            });
                            this.obtenerTipoCreditoCampos(result.recordset[0].ID);
                        }
                    });
                }
            });
        }); // fin transaction
    }

    obtenerTipoCreditoCampos (ID) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from TipoCreditoCampo where tipoCreditoID = "+ID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        let tablasSelCopiaTemp = [...this.state.opcionesTablasSeleccionadas];
                        if(tablasSelCopiaTemp[this.state.tablasSeleccionadas.length-1] == undefined)
                            tablasSelCopiaTemp[this.state.tablasSeleccionadas.length-1] = {};
                        tablasSelCopiaTemp[this.state.tablasSeleccionadas.length-1].tipoCredito = result.recordset;
                        this.setState({
                            opcionesTablasSeleccionadas: tablasSelCopiaTemp
                        });
                    });
                }
            });
        }); // fin transaction
    }

    verificarSeleccionoTablas() {
        if(this.state.tablasSeleccionadas.length > 0) {
            this.creandoArreglos();
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
                                    this.verificarGuardarCampos(tablaID, result.recordset, posicionArregloTablasSel);
                                } else {
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
                                this.iniciarCalculo(true, true, true, true);
                                let self = this;
                                myWorker.onmessage = function(e) {
                                    if(e.data == 'terminoCrearArreglos') {
                                        //revisando que procedimientos llamar
                                        self.iniciarCalculo(true, true, true, true);
                                    }
                                }
                            } else {
                                if(identificadorCliente.length > 0) {
                                    //myWorker.postMessage(["iniciarArregloClientes", valoresTabla, identificadorCliente[0].nombre, identificadorCliente[0].tipo, camposAGuardarCliente, true]);
                                    constructor(["iniciarArregloClientes", valoresTabla, identificadorCliente[0].nombre, identificadorCliente[0].tipo, camposAGuardarCliente, true]);
                                    let self = this;
                                    camposGuardar.concat(result.recordset);
                                    this.iniciarCalculo(false, false, true, false);
                                    myWorker.onmessage = function(e) {
                                        console.log("llamado de vuelta");
                                        console.log(e);
                                        if(e.data == 'terminoCrearArreglos') {
                                            //revisando que procedimientos llamar
                                            self.iniciarCalculo(false, false, true, false);
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

    iniciarCalculo (verificarComportamientoPago, verificarTipoCredito, verificarTipoCliente, verificarClasCategoria) {
        //como no tiene id prestamo o cliente, no se puede calcular comportamiento plan pago, agregar mensaje bitacora  // si verificarComportamientoPago == false
        if( tamanoActualBandera == tamanoFinalBandera ) {
            banderaGuardarResultadosTamActual = 0;
            banderaGuardarResultadosTamFinal = 0;
            for (var i = 0; i < this.state.tablasOrginales.length; i++) {
                var calcularComportamientoPago = false;
                var primeraVezEntra = true; //agregar valores de tabla a arreglo global de clientes, prestamos y pagos en ClasificarCartera.js

                //como no tiene id prestamo o cliente, no se puede calcular comportamiento plan pago, agregar mensaje bitacora  // si verificarComportamientoPago == false

                /*if(verificarComportamientoPago && $("#ComportamientoPago"+i).prop('checked') == true)
                    calcularComportamientoPago = true;*/

                //if(calcularComportamientoPago) {
                    this.fetchDataComportamientoPago(this.state.tablasOrginales[i].ID);
                    //banderaGuardarResultadosTamFinal++;
                    /*if(primeraVezEntra) {
                        primeraVezEntra = false;
                    }
                }
                if(verificarTipoCredito) {*/
                    //this.fetchDataTipoCredito(this.state.tablasOrginales[i].ID);
                    banderaGuardarResultadosTamFinal++;
                //}
            };
        }
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

    fetchDataComportamientoPago (prestamoTablaID) {
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
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        for (var i = 0; i < result.recordset.length; i++) {
                            this.getPrestamoTablaComportamientoPago(result.recordset[i]);
                        }
                    });
                }
            });
        }); // fin transaction
    }

    getPrestamoTablaComportamientoPago(ComportamientoPago) {
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
                        banderaGuardarResultadosTamActual++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.getPrestamoCamposDeTablaComportamientoPago(result.recordset[0], ComportamientoPago);
                    });
                }
            });
        }); // fin transaction
    }

    getPrestamoCamposDeTablaComportamientoPago(tabla, ComportamientoPago) {
        let self = this;
        this.getFieldsFromCamposTable(tabla, ComportamientoPago, "prestamos", function(camposDePrestamoTabla, valoresDeTablaPrestamo, ComportamientoPago) {
            self.getPlanPagoTablaComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, ComportamientoPago);
        });
    }

    getPlanPagoTablaComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, ComportamientoPago) {
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
                        banderaGuardarResultadosTamActual++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.getPlanPagosCamposDeTablaComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, result.recordset[0], ComportamientoPago);
                    });
                }
            });
        }); // fin transaction
    }

    getPlanPagosCamposDeTablaComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, tabla, ComportamientoPago) {
        let self = this;
        this.getFieldsFromCamposTable(tabla, ComportamientoPago, "planpagos", function(camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, ComportamientoPago) {
            self.initWebWorkerComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, ComportamientoPago);
        }, camposDePrestamoTabla, valoresDeTablaPrestamo);
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
                        banderaGuardarResultadosTamActual++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.initWebWorkerComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, result.recordset, ComportamientoPago);
                    });
                }
            });
        }); // fin transaction
    }

    initWebWorkerComportamientoPago (camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, ComportamientoPago) {
        //myWorker.postMessage(["comportamientoPago", camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, ComportamientoPago]);
        console.log('AHHHHHH')
        constructor(["comportamientoPago", camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, ComportamientoPago]);
        banderaGuardarResultadosTamActual++;
        this.checkFinishMethods();
    }

    getFieldsFromCamposTable (tabla, ComportamientoPago, banderaMetodoLlamado, callbackParam, camposDePrestamoTabla, valoresDeTablaPrestamo) {
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
                        banderaGuardarResultadosTamActual++;
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
                        console.log('pool');
                        console.log(pool);
                        console.log('tabla');
                        console.log(tabla);
                        let camposTabla = result.recordset;
                        console.log('camposTabla');
                        console.log(camposTabla);
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
                                for (var i = 0; i < result.recordset.length; i++) {
                                    Object.keys(result.recordset[i]).forEach(function(key,index) {
                                        // key: the name of the object key
                                        // index: the ordinal position of the key within the object
                                        if(!self.propiedadDeObjetoExisteEnTablaCampos(camposTabla, key)) {
                                            delete result.recordset[i][key];
                                        }
                                    });
                                }
                                console.log("result.recordset");
                                console.log(result.recordset);
                                //result.recordset = nuevoArregloTrans;
                                if(banderaMetodoLlamado == 'prestamos')
                                    callbackParam(camposTabla, result.recordset, ComportamientoPago);
                                else
                                    callbackParam(camposDePrestamoTabla, valoresDeTablaPrestamo, camposTabla, result.recordset, ComportamientoPago);
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

    fetchDataTipoCredito () {
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
                        banderaGuardarResultadosTamActual++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        //arregloCamposTipoCreditos: Cada posicion del arreglo corresponde a la del tipo de credito
                        var arregloReglasTipoCreditos = [];
                        tamanoFinalBandera = result.recordset.length, tamanoActualBandera = 0;
                        for (var i = 0; i < result.recordset.length; i++) {
                            this.fetchDataReglasTipoCreditoCampos(result.recordset[i], arregloReglasTipoCreditos, i, result.recordset);
                        }
                    });
                }
            });
        }); // fin transaction
    }

    fetchDataReglasTipoCreditoCampos (tipoCredito, arregloReglasTipoCreditos, i, arregloTipoCreditos) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Reglas where tipoTablaRes = 'TipoCredito' and idTipoTabla="+tipoCredito.ID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        banderaGuardarResultadosTamActual++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        tamanoActualBandera++;
                        arregloReglasTipoCreditos[i] = result.recordset;
                        this.verificarCamposReglasTipoCreditoCampos(arregloTipoCreditos, arregloReglasTipoCreditos);
                    });
                }
            });
        }); // fin transaction
    }

    verificarCamposReglasTipoCreditoCampos (arregloTipoCreditos, arregloReglasTipoCreditos) {
        if(tamanoActualBandera == tamanoFinalBandera) {
            tamanoActualBandera = 0, tamanoFinalBandera = 0;
            for (var i = 0; i < arregloReglasTipoCreditos.length; i++) {
                for (var j = 0; j < arregloReglasTipoCreditos[i].length; j++) {
                    tamanoFinalBandera++;
                };
            };
            for (var i = 0; i < arregloReglasTipoCreditos.length; i++) {
                for (var j = 0; j < arregloReglasTipoCreditos[i].length; j++) {
                    this.fetchDataCamposReglasTipoCreditoCampos(arregloReglasTipoCreditos[i][j], arregloReglasTipoCreditos, i, j, arregloTipoCreditos);
                };
            };
        }
    }

    fetchDataCamposReglasTipoCreditoCampos (regla, arregloReglasTipoCreditos, i, j, arregloTipoCreditos) {
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
                        banderaGuardarResultadosTamActual++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        tamanoActualBandera++;
                        arregloReglasTipoCreditos[i][j].campoValor = result.recordset[0];
                        this.verificarValoresReglasTipoCreditoCampos(arregloTipoCreditos, arregloReglasTipoCreditos);
                    });
                }
            });
        }); // fin transaction
    }

    verificarValoresReglasTipoCreditoCampos (arregloTipoCreditos, arregloReglasTipoCreditos) {
        if(tamanoActualBandera == tamanoFinalBandera) {
            tamanoActualBandera = 0, tamanoFinalBandera = 0;
            for (var i = 0; i < arregloReglasTipoCreditos.length; i++) {
                for (var j = 0; j < arregloReglasTipoCreditos[i].length; j++) {
                    var idsValores = arregloReglasTipoCreditos[i][j].valor.split(",");
                    for (var k = 0; k < idsValores.length; k++) {
                        tamanoFinalBandera++;
                    };
                };
            };
            for (var i = 0; i < arregloReglasTipoCreditos.length; i++) {
                for (var j = 0; j < arregloReglasTipoCreditos[i].length; j++) {
                    var idsValores = arregloReglasTipoCreditos[i][j].valor.split(",");
                    for (var k = 0; k < idsValores.length; k++) {
                        this.fetchDataValoresReglasTipoCreditoCampos(idsValores[k], arregloReglasTipoCreditos[i][j].esListaValor, arregloReglasTipoCreditos, i, j, arregloTipoCreditos);
                    };
                };
            };
        }
    }

    fetchDataValoresReglasTipoCreditoCampos (id, esLista, arregloReglasTipoCreditos, i, j, arregloTipoCreditos) {
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
                        banderaGuardarResultadosTamActual++;
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        tamanoActualBandera++;
                        if(arregloReglasTipoCreditos[i][j].valorValores == undefined)
                            arregloReglasTipoCreditos[i][j].valorValores = [];
                        arregloReglasTipoCreditos[i][j].valorValores.push(result.recordset[0]);
                        this.verifyTypeCreditFinal(arregloTipoCreditos, arregloReglasTipoCreditos)
                    });
                }
            });
        }); // fin transaction
    }

    verifyTypeCreditFinal (arregloTipoCreditos, arregloReglasTipoCreditos) {
        if(tamanoActualBandera == tamanoFinalBandera) {
            console.log(arregloTipoCreditos);
            console.log(arregloReglasTipoCreditos);
            //myWorker.postMessage(["tiposCredito", arregloTipoCreditos, arregloReglasTipoCreditos]);
            constructor(["tiposCredito", arregloTipoCreditos, arregloReglasTipoCreditos]);
            banderaGuardarResultadosTamActual++;
            this.checkFinishMethods();
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
                        GUARDAR RESULTADOS
        *****   *****   *****       *****   *****   *****   *****
    */

    checkFinishMethods() {
        console.log("banderaGuardarResultadosTamActual = "+banderaGuardarResultadosTamActual);
        console.log("banderaGuardarResultadosTamFinal = "+banderaGuardarResultadosTamFinal);
        if( banderaGuardarResultadosTamActual == banderaGuardarResultadosTamFinal ) {
            console.log("FIN DE CALCULOS");
            console.log("GUARDANDO CAMPOS");
            for (var i = 0; i < arregloCamposTablasSeleccionadas.length; i++) {
                console.log(arregloCamposTablasSeleccionadas[i]);
            };
        }
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

    verifyResultID(valor, objeto, nombre) {
        console.log(prop);
        this.saveResultID(valor, objeto, nombre);
    }

    verifyResultField(idObjeto, objeto, nombre, valor) {
        if(!isNaN(valor)) {
            saveResultFieldInt(idObjeto, objeto, nombre, valor);
        } else {
            saveResultFieldString(idObjeto, objeto, nombre, valor);
        }
    }

    saveResultID (valor, objetoV, nombreV) {
        var identificador = valor;
        var objeto = objetoV;
        var nombre = nombreV;
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ResultadosID values (identificador, objeto, nombre)", (err, result) => {
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

    saveResultFieldInt (idObjetoV, objetoV, nombreV, valorV) {
        var identificador = idObjetoV;
        var objeto = objetoV;
        var nombre = nombreV;
        var fecha = new Date();
        var valor = valorV;
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ResultadosInt values ('"+idObjeto+"', '"+objeto+"', '"+nombre+"', '"+this.formatDateCreation(fecha)+"', "+valor+")", (err, result) => {
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

    saveResultFieldString (idObjetoV, objetoV, nombreV, valorV) {
        var identificador = idObjetoV;
        var objeto = objetoV;
        var nombre = nombreV;
        var fecha = new Date();
        var valor = valorV;
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("insert into ResultadosString values ('"+idObjeto+"', '"+objeto+"', '"+nombre+"', '"+this.formatDateCreation(fecha)+"', '"+valor+"')", (err, result) => {
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
                                <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "solid 3px #eceff1"}}>
                                    <div style={{width: "90%", height: "60%", textAlign: "center", display: "table"}}>
                                        <h5 style={{display: "table-cell", verticalAlign: "middle"}}>Capacidad de Pago</h5>
                                    </div>
                                </div>
                                <div style={{width: "100%", height: "25%"}}>
                                </div>
                                <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "solid 3px #eceff1"}}>
                                    <div style={{width: "90%", height: "60%", textAlign: "center", display: "table"}}>
                                        <h5 style={{display: "table-cell", verticalAlign: "middle"}}>Comportamiento de Pago</h5>
                                    </div>
                                </div>
                                <div style={{width: "100%", height: "25%", overflowY: "scroll"}}>
                                </div>

                                <div className={"text-center"} style={{borderBottom: "solid 4px #cfd8dc", borderTop: "solid 4px #cfd8dc"}}>
                                    <h3>Tipo de Cr&eacute;dito</h3>
                                </div>
                                <div style={{width: "100%", height: "25%", overflowY: "scroll"}}>
                                </div>

                                <div className={"text-center"} style={{borderBottom: "solid 4px #cfd8dc", borderTop: "solid 4px #cfd8dc"}}>
                                    <h3>Categorias de Clasificaci&oacute;n</h3>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div style={{width: "100%", height: "6%", padding: "1% 0%"}} className={"text-center"}>
                    <a onClick={this.verificarSeleccionoTablas} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Iniciar </a>
                </div>
            </div>
        );
    }
}
