import React from 'react';
import sql from 'mssql';

import SeleccionarTablaClasificarCarteraProceso from './SeleccionarTablaClasificarCarteraProceso.js';
import ConfiguracionTablasClasificar from './ConfiguracionTablasClasificar.js';

const myWorker = new Worker("./components/ClasificarCredito.js");

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
        this.verificarSeleccionoTablas = this.verificarSeleccionoTablas.bind(this);
        this.fetchDataComportamientoPago = this.fetchDataComportamientoPago.bind(this);
        this.getPrestamoTablaComportamientoPago = this.getPrestamoTablaComportamientoPago.bind(this);
        this.getPrestamoCamposDeTablaComportamientoPago = this.getPrestamoCamposDeTablaComportamientoPago.bind(this);
        this.getPlanPagoTablaComportamientoPago = this.getPlanPagoTablaComportamientoPago.bind(this);
        this.getPlanPagoCamposDeTablaComportamientoPago = this.getPlanPagoCamposDeTablaComportamientoPago.bind(this);
        this.initWebWorkerComportamientoPago = this.initWebWorkerComportamientoPago.bind(this);
        this.propiedadDeObjetoExisteEnTablaCampos = this.propiedadDeObjetoExisteEnTablaCampos.bind(this);
        this.agregarOpciones = this.agregarOpciones.bind(this);
        this.obtenerTipoCredito = this.obtenerTipoCredito.bind(this);
        this.obtenerTipoCreditoCampos = this.obtenerTipoCreditoCampos.bind(this);
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
            this.agregarOpciones(this.state.tablasOrginales[index].ID);
        }
    }

    //metodo para agregar tipo de credito, tipo de cliente, criterios de clasificacion por tabla
    agregarOpciones(index) {
        //opcionesTablasSeleccionadas
        this.obtenerTipoCredito(index);
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
                        let tablasSelCopiaTemp = [...this.state.opcionesTablasSeleccionadas];
                        if(tablasSelCopiaTemp[this.state.tablasSeleccionadas.length-1] == undefined)
                            tablasSelCopiaTemp[this.state.tablasSeleccionadas.length-1] = {};
                        tablasSelCopiaTemp[this.state.tablasSeleccionadas.length-1].tipoCreditoNombre = result.recordset[0].nombre;
                        this.setState({
                            opcionesTablasSeleccionadas: tablasSelCopiaTemp
                        });
                        this.obtenerTipoCreditoCampos(result.recordset[0].ID);
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
            this.iniciarCalculo();
        } else {
            alert("Seleccione por lo menos una tabla");
        }
    }

    iniciarCalculo() {
        for (var i = 0; i < this.state.tablasSeleccionadas.length; i++) {
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
        };
    }

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
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {

                        /*              CONSIGUIENDO VALORES DE TABLA DE PLAN DE PAGOS         */
                        const pool = new sql.ConnectionPool({
                            user: tabla.nombre,
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
        myWorker.postMessage(["comportamientoPago", camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, ComportamientoPago]);
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
                    <ConfiguracionTablasClasificar tablasSeleccionadas={this.state.tablasSeleccionadas} widthActual={this.state.widthActual} opcionesTabla={this.state.opcionesTablasSeleccionadas}> </ConfiguracionTablasClasificar>
                </div>
                <div style={{width: "100%", height: "6%", padding: "1% 0%"}} className={"text-center"}>
                    <a onClick={this.verificarSeleccionoTablas} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Iniciar </a>
                </div>
            </div>
        );
    }
}
