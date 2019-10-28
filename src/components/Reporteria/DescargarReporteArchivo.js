import React from 'react';
import sql from 'mssql';
import XLSX from 'xlsx-style';

import Accordion from '../Accordion/Accordion.js';
import InlineEdit from '../InlineEdit.js';
import ErrorMessage from '../ErrorMessage.js';
import MessageModal from '../MessageModal.js';

const campos = [ {nombre: "varchar"}, {nombre: "bit"}, {nombre: "date"}, {nombre: "int"} ];
let funciones = [ {funcion: "idCliente", texto: "ID de Cliente"}, {funcion: "fecha", texto: "fecha"}, {nombre: "date"}, {nombre: "int"} ];

var tamBanderaActual = 0, tamBanderaFinal = 0;

export default class DescargarReporteArchivo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultadosClientes: [],
            resultadosPrestamos: [],
            camposClientes: [],
            camposPrestamos: []
        }
        //this.cambioClientes = this.cambioClientes.bind(this);
        this.getFiltersString = this.getFiltersString.bind(this);
        this.getFilterQuery = this.getFilterQuery.bind(this);
        this.getObjectsID = this.getObjectsID.bind(this);
        this.getObjectsField = this.getObjectsField.bind(this);
        this.binaryInsertClient = this.binaryInsertClient.bind(this);
        this.binaryInsertCredit = this.binaryInsertCredit.bind(this);
        this.binaryInsertCreditField = this.binaryInsertCreditField.bind(this);
        this.verificarFinClientes = this.verificarFinClientes.bind(this);
        this.insertIntoFieldArray = this.insertIntoFieldArray.bind(this);
        this.getValidIDsInt = this.getValidIDsInt.bind(this);
        this.getValidIDsDecimal = this.getValidIDsDecimal.bind(this);
        this.getValidIDsDate = this.getValidIDsDate.bind(this);
        this.getValidIDsBool = this.getValidIDsBool.bind(this);
        this.getValidIDsString = this.getValidIDsString.bind(this);
        this.initiateBringObjects = this.initiateBringObjects.bind(this);
        this.getExcelCellInt = this.getExcelCellInt.bind(this);
        this.getExcelCellDecimal = this.getExcelCellDecimal.bind(this);
        this.getExcelCellDate = this.getExcelCellDate.bind(this);
        this.getExcelCellBool = this.getExcelCellBool.bind(this);
        this.getExcelCellVarchar = this.getExcelCellVarchar.bind(this);
        this.colName = this.colName.bind(this);
        this.crearArchivoExcel = this.crearArchivoExcel.bind(this);
    }

    componentDidMount() {
        this.getFiltersString();
        this.props.showLoadingScreen();
        var self = this;
        setTimeout(function(){
            self.props.hideLoadingScreen();
        }, 60000);
    }

    getFiltersString () {
        var resultadoQueryIDs = '';
        /*for (var i = 0; i < this.props.arregloDeFiltros.length; i++) {
            resultadoQueryIDs += this.getFilterQuery(this.props.arregloDeFiltrosIDs[i]);
        };*/
        var resultadoQueryInt = '';
        for (var i = 0; i < this.props.filtrosInt.length; i++) {
            //resultadoQueryInt += this.getFilterQuery(this.props.filtrosInt[i]);
            if(resultadoQueryInt.length == 0)
                resultadoQueryInt += " where " + this.props.filtrosInt[i].filtro;
            else
                resultadoQueryInt += " and " + this.props.filtrosInt[i].filtro;
        };
        var resultadoQueryDecimal = '';
        for (var i = 0; i < this.props.filtrosDecimal.length; i++) {
            //resultadoQueryDecimal += this.getFilterQuery(this.props.filtrosDecimal[i]);
            if(resultadoQueryDecimal.length == 0)
                resultadoQueryDecimal += " where " + this.props.filtrosDecimal[i].filtro;
            else
                resultadoQueryDecimal += " and " + this.props.filtrosDecimal[i].filtro;
        };
        var resultadoQueryDate = '';
        for (var i = 0; i < this.props.filtrosDate.length; i++) {
            //resultadoQueryDate += this.getFilterQuery(this.props.filtrosDate[i]);
            if(resultadoQueryDate.length == 0)
                resultadoQueryDate += " where " + this.props.filtrosDate[i].filtro;
            else
                resultadoQueryDate += " and " + this.props.filtrosDate[i].filtro;
        };
        var resultadoQueryBool = '';
        for (var i = 0; i < this.props.filtrosBool.length; i++) {
            //resultadoQueryBool += this.getFilterQuery(this.props.filtrosBool[i]);
            if(resultadoQueryBool.length == 0)
                resultadoQueryBool += " where " + this.props.filtrosBool[i].filtro;
            else
                resultadoQueryBool += " and " + this.props.filtrosBool[i].filtro;
        };
        var resultadoQueryString = '';
        for (var i = 0; i < this.props.filtrosString.length; i++) {
            //resultadoQueryString += this.getFilterQuery(this.props.filtrosString[i]);
            if(resultadoQueryString.length == 0)
                resultadoQueryString += " where " + this.props.filtrosString[i].filtro;
            else
                resultadoQueryString += " and " + this.props.filtrosString[i].filtro;
        };
        if(resultadoQueryInt.length > 0) {
            this.getValidIDsInt(resultadoQueryInt, resultadoQueryDecimal, resultadoQueryDate, resultadoQueryBool, resultadoQueryString);
        } else if(resultadoQueryDecimal.length > 0) {
            this.getValidIDsDecimal(resultadoQueryDecimal, resultadoQueryDate, resultadoQueryBool, resultadoQueryString, '');
        } else if(resultadoQueryDate.length > 0) {
            this.getValidIDsDate(resultadoQueryDate, resultadoQueryBool, resultadoQueryString, '');
        } else if(resultadoQueryBool.length > 0) {
            this.getValidIDsBool(resultadoQueryBool, resultadoQueryString, '');
        } else if(resultadoQueryString.length > 0) {
            this.getValidIDsString(resultadoQueryString, '');
        } else {
            console.log("YEEET")
            this.initiateBringObjects('');
        }
    }

    getValidIDsInt (queryStringInt, resultadoQueryDecimal, resultadoQueryDate, resultadoQueryBool, resultadoQueryString) {
        const transaction1 = new sql.Transaction( this.props.pool );
        transaction1.begin(err => {
            var rolledBack = false;
            transaction1.on('rollback', aborted => {
                rolledBack = true;
            });
            const request1 = new sql.Request(transaction1);
            request1.query("select DISTINCT idObjeto from ResultadosInt "+queryStringInt, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        alert('no se pudo traer datos');
                        transaction1.rollback(err => {
                        });
                    }
                } else {
                    transaction1.commit(err => {
                        var IDsNoTraer = '';
                        for (var i = 0; i < result.recordset.length; i++) {
                            IDsNoTraer += " and identificador != '"+ result.recordset[i].idObjeto + "'";
                        };
                        if(resultadoQueryDecimal.length > 0) {
                            this.getValidIDsDecimal(resultadoQueryDecimal, resultadoQueryDate, resultadoQueryBool, resultadoQueryString, IDsNoTraer);
                        } else if(resultadoQueryDate.length > 0) {
                            this.getValidIDsDate(resultadoQueryDate, resultadoQueryBool, resultadoQueryString, IDsNoTraer);
                        } else if(resultadoQueryBool.length > 0) {
                            this.getValidIDsBool(resultadoQueryBool, resultadoQueryString, IDsNoTraer);
                        } else if(resultadoQueryString.length > 0) {
                            this.getValidIDsString(resultadoQueryString, IDsNoTraer);
                        } else {
                            this.initiateBringObjects(IDsNoTraer);
                        }
                    });
                }
            });
        }); // fin transaction1
    }

    getValidIDsDecimal (queryStringDecimal, resultadoQueryDate, resultadoQueryBool, resultadoQueryString, IDsNoTraer) {
        const transaction2 = new sql.Transaction( this.props.pool );
        transaction2.begin(err => {
            var rolledBack = false;
            transaction2.on('rollback', aborted => {
                rolledBack = true;
            });
            const request2 = new sql.Request(transaction2);
            request2.query("select DISTINCT idObjeto from ResultadosDecimal "+queryStringDecimal, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        alert('no se pudo traer datos');
                        transaction2.rollback(err => {
                        });
                    }
                } else {
                    transaction2.commit(err => {
                        for (var i = 0; i < result.recordset.length; i++) {
                            IDsNoTraer += " and identificador != '"+ result.recordset[i].idObjeto + "'";
                        };
                        if(resultadoQueryDate.length > 0) {
                            this.getValidIDsDate(resultadoQueryDate, resultadoQueryBool, resultadoQueryString, IDsNoTraer);
                        } else if(resultadoQueryBool.length > 0) {
                            this.getValidIDsBool(resultadoQueryBool, resultadoQueryString, IDsNoTraer);
                        } else if(resultadoQueryString.length > 0) {
                            this.getValidIDsString(resultadoQueryString, IDsNoTraer);
                        } else {
                            this.initiateBringObjects(IDsNoTraer);
                        }
                    });
                }
            });
        }); // fin transaction2
    }

    getValidIDsDate (queryStringDate, resultadoQueryBool, resultadoQueryString, IDsNoTraer) {
        const transaction3 = new sql.Transaction( this.props.pool );
        transaction3.begin(err => {
            var rolledBack = false;
            transaction3.on('rollback', aborted => {
                rolledBack = true;
            });
            const request3 = new sql.Request(transaction3);
            request3.query("select DISTINCT idObjeto from ResultadosDate "+queryStringDate, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        alert('no se pudo traer datos');
                        transaction3.rollback(err => {
                        });
                    }
                } else {
                    transaction3.commit(err => {
                        for (var i = 0; i < result.recordset.length; i++) {
                            IDsNoTraer += " and identificador != '"+ result.recordset[i].idObjeto + "'";
                        };
                        if(resultadoQueryBool.length > 0) {
                            this.getValidIDsBool(resultadoQueryBool, resultadoQueryString, IDsNoTraer);
                        } else if(resultadoQueryString.length > 0) {
                            this.getValidIDsString(resultadoQueryString, IDsNoTraer);
                        } else {
                            this.initiateBringObjects(IDsNoTraer);
                        }
                    });
                }
            });
        });
    }

    getValidIDsBool (queryStringBool, resultadoQueryString, IDsNoTraer) {
        const transaction4 = new sql.Transaction( this.props.pool );
        transaction4.begin(err => {
            var rolledBack = false;
            transaction4.on('rollback', aborted => {
                rolledBack = true;
            });
            const request4 = new sql.Request(transaction4);
            request4.query("select DISTINCT idObjeto from ResultadosBool "+queryStringBool, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        alert('no se pudo traer datos');
                        transaction4.rollback(err => {
                        });
                    }
                } else {
                    transaction4.commit(err => {
                        for (var i = 0; i < result.recordset.length; i++) {
                            IDsNoTraer += " and identificador != '"+ result.recordset[i].idObjeto + "'";
                        };
                        if(resultadoQueryString.length > 0) {
                            this.getValidIDsString(resultadoQueryString, IDsNoTraer);
                        } else {
                            this.initiateBringObjects(IDsNoTraer);
                        }
                    });
                }
            });
        }); // fin transaction4
    }

    getValidIDsString (queryStringString, IDsNoTraer) {
        const transaction5 = new sql.Transaction( this.props.pool );
        transaction5.begin(err => {
            var rolledBack = false;
            transaction5.on('rollback', aborted => {
                rolledBack = true;
            });
            const request5 = new sql.Request(transaction5);
            request5.query("select DISTINCT idObjeto from ResultadosString "+queryStringString, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        alert('no se pudo traer datos');
                        transaction5.rollback(err => {
                        });
                    }
                } else {
                    transaction5.commit(err => {
                        for (var i = 0; i < result.recordset.length; i++) {
                            IDsNoTraer += " and identificador != '"+ result.recordset[i].idObjeto + "'";
                        };
                        this.initiateBringObjects(IDsNoTraer);
                    });
                }
            });
        }); // fin transaction5
    }

    initiateBringObjects (IDsNoTraer) {
        this.getObjectsID(" where objeto = 'Cliente' ", IDsNoTraer, true);
    }

    getFilterQuery(filtro) {
        //if (filtro.)
    }

    getObjectsID(whereCondition, IDsNoTraer, esCliente) {
        console.log('esCliente');
        console.log(esCliente);
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ResultadosID "+whereCondition+IDsNoTraer, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        alert('no se pudo traer datos');
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        //binary insert ID
                        tamBanderaActual = 0, tamBanderaFinal = result.recordset.length;
                        for (var i = 0; i < result.recordset.length; i++) {
                            if(esCliente)
                                this.binaryInsertClient(result.recordset[i], this.state.resultadosClientes, "identificador", "identificador",  []);
                            else
                                this.binaryInsertCredit(result.recordset[i], this.state.resultadosPrestamos , "identificador", "idPadre", "identificador");
                            this.getObjectsField(result.recordset[i].identificador, IDsNoTraer, esCliente);
                            this.insertIntoFieldArray(result.recordset[i], "int");
                            if(esCliente)
                                this.verificarFinClientes(IDsNoTraer, esCliente);
                        };
                        console.log("resultados");
                        console.log(this.state.resultadosClientes);
                        console.log(this.state.resultadosPrestamos);
                    });
                }
            });
        }); // fin transaction
    }

    getObjectsField(idObjeto, IDsNoTraer, esCliente) {
        tamBanderaActual++;
        //traer campos de resultados de base de datos
        const transaction1 = new sql.Transaction( this.props.pool );
        transaction1.begin(err => {
            var rolledBack = false;
            transaction1.on('rollback', aborted => {
                rolledBack = true;
            });
            const request1 = new sql.Request(transaction1);
            request1.query("select * from ResultadosInt where idObjeto = '"+idObjeto+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        alert('no se pudo traer datos');
                        transaction1.rollback(err => {
                        });
                    }
                } else {
                    transaction1.commit(err => {
                        //binary insert ID
                        if(result.recordset.length > 0) {
                            for (var i = 0; i < result.recordset.length; i++) {
                                if(esCliente)
                                    this.binaryInsertClient(result.recordset[i], this.state.resultadosClientes, "idObjeto", "identificador", result.recordset);
                                else
                                    this.binaryInsertCreditField(result.recordset[i]);
                                this.insertIntoFieldArray(result.recordset[i], "int");
                            };
                        }
                    });
                }
            });
        }); // fin transaction1

        const transaction2 = new sql.Transaction( this.props.pool );
        transaction2.begin(err => {
            var rolledBack = false;
            transaction2.on('rollback', aborted => {
                rolledBack = true;
            });
            const request2 = new sql.Request(transaction2);
            request2.query("select * from ResultadosDecimal where idObjeto = '"+idObjeto+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        alert('no se pudo traer datos');
                        transaction2.rollback(err => {
                        });
                    }
                } else {
                    transaction2.commit(err => {
                        //binary insert ID
                        if(result.recordset.length > 0) {
                            for (var i = 0; i < result.recordset.length; i++) {
                                if(esCliente)
                                    this.binaryInsertClient(result.recordset[i], this.state.resultadosClientes, "idObjeto", "identificador", result.recordset);
                                else
                                    this.binaryInsertCreditField(result.recordset[i]);
                                this.insertIntoFieldArray(result.recordset[i], "decimal");
                            };
                        }
                    });
                }
            });
        }); // fin transaction2

        /*const transaction3 = new sql.Transaction( this.props.pool );
        transaction3.begin(err => {
            var rolledBack = false;
            transaction3.on('rollback', aborted => {
                rolledBack = true;
            });
            const request3 = new sql.Request(transaction3);
            request3.query("select * from ResultadosDate where idObjeto = '"+idObjeto+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        alert('no se pudo traer datos');
                        transaction3.rollback(err => {
                        });
                    }
                } else {
                    transaction3.commit(err => {
                        //binary insert ID
                        if(result.recordset.length > 0) {
                            for (var i = 0; i < result.recordset.length; i++) {
                                if(esCliente)
                                    this.binaryInsertClient(result.recordset[i], this.state.resultadosClientes, "idObjeto", "identificador", result.recordset);
                                else
                                    this.binaryInsertCreditField(result.recordset[i]);
                                this.insertIntoFieldArray(result.recordset[i], "date");
                            };
                        }
                    });
                }
            });
        });*/ // fin transaction3

        const transaction4 = new sql.Transaction( this.props.pool );
        transaction4.begin(err => {
            var rolledBack = false;
            transaction4.on('rollback', aborted => {
                rolledBack = true;
            });
            const request4 = new sql.Request(transaction4);
            request4.query("select * from ResultadosBool where idObjeto = '"+idObjeto+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        alert('no se pudo traer datos');
                        transaction4.rollback(err => {
                        });
                    }
                } else {
                    transaction4.commit(err => {
                        //binary insert ID
                        if(result.recordset.length > 0) {
                            for (var i = 0; i < result.recordset.length; i++) {
                                if(esCliente)
                                    this.binaryInsertClient(result.recordset[i], this.state.resultadosClientes, "idObjeto", "identificador", result.recordset);
                                else
                                    this.binaryInsertCreditField(result.recordset[i]);
                                this.insertIntoFieldArray(result.recordset[i], "bool");
                            };
                        }
                    });
                }
            });
        }); // fin transaction4

        const transaction5 = new sql.Transaction( this.props.pool );
        transaction5.begin(err => {
            var rolledBack = false;
            transaction5.on('rollback', aborted => {
                rolledBack = true;
            });
            const request5 = new sql.Request(transaction5);
            request5.query("select * from ResultadosString where idObjeto = '"+idObjeto+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        alert('no se pudo traer datos');
                        transaction5.rollback(err => {
                        });
                    }
                } else {
                    transaction5.commit(err => {
                        //binary insert ID
                        if(result.recordset.length > 0) {
                            for (var i = 0; i < result.recordset.length; i++) {
                                if(esCliente)
                                    this.binaryInsertClient(result.recordset[i], this.state.resultadosClientes, "idObjeto", "identificador", result.recordset);
                                else
                                    this.binaryInsertCreditField(result.recordset[i]);
                                this.insertIntoFieldArray(result.recordset[i], "varchar");
                            };
                        }
                    });
                }
            });
        }); // fin transaction5
    }

    binaryInsertClient(newValue, array, objectField, arrayField, fieldsToSave, startVal, endVal){
        var length = array.length;
        var start = typeof(startVal) != 'undefined' ? startVal : 0;
        var end = typeof(endVal) != 'undefined' ? endVal : length - 1;//!! endVal could be 0 don't use || syntax
        var m = start + Math.floor((end - start)/2);
        if(length == 0) {
            var newObject = {};
            newObject[arrayField] = parseInt(newValue[objectField]);
            for (var i = 0; i < fieldsToSave.length; i++) {
                newObject[fieldsToSave[i].nombre] = fieldsToSave[i].valor;
            };
            // 1. Make a shallow copy of the items
            let prestamos = [...this.state.resultadosClientes];
            // 3. Replace the property you're intested in
            prestamos.push(newObject);
            // 5. Set the state to our new copy
            this.setState({
                resultadosClientes: prestamos
            });
            //array.push(newObject);
            return;
        }
        if( parseInt(newValue[objectField]) == parseInt(array[m][arrayField])) {
            for (var i = 0; i < fieldsToSave.length; i++) {
                array[m][fieldsToSave[i].nombre] = fieldsToSave[i].valor;
            };
            return;
        }
        if( parseInt(newValue[objectField]) > parseInt(array[end][arrayField])) {
            var newObject = {};
            newObject[arrayField] = parseInt(newValue[objectField]);
            for (var i = 0; i < fieldsToSave.length; i++) {
                newObject[fieldsToSave[i].nombre] = fieldsToSave[i].valor;
            };
            // 1. Make a shallow copy of the items
            let prestamos = [...this.state.resultadosClientes];
            // 3. Replace the property you're intested in
            prestamos.splice(end + 1, 0, newObject);
            // 5. Set the state to our new copy
            this.setState({
                resultadosClientes: prestamos
            });
            //array.splice(end + 1, 0, newObject);
            return;
        }
        if( parseInt(newValue[objectField]) < parseInt(array[start][arrayField])) {//!!
            var newObject = {};
            newObject[arrayField] = parseInt(newValue[objectField]);
            for (var i = 0; i < fieldsToSave.length; i++) {
                newObject[fieldsToSave[i].nombre] = fieldsToSave[i].valor;
            };
            // 1. Make a shallow copy of the items
            let prestamos = [...this.state.resultadosClientes];
            // 3. Replace the property you're intested in
            prestamos.splice(start, 0, newObject);
            // 5. Set the state to our new copy
            this.setState({
                resultadosClientes: prestamos
            });
            //array.splice(start, 0, newObject);
            return;
        }
        if(start >= end){
            return;
        }
        if( parseInt(newValue[objectField]) < parseInt(array[m][arrayField])){
            this.binaryInsertClient(newValue, array, objectField, arrayField, fieldsToSave, start, m - 1);
            return;
        }
        if( parseInt(newValue[objectField]) > parseInt(array[m][arrayField])){
            this.binaryInsertClient(newValue, array, objectField, arrayField, fieldsToSave, m + 1, end);
            return;
        }
    }

    binaryInsertCredit(newValue, array, fieldClient, fieldCreditOwner, fieldCreditID, startVal, endVal){
        var length = array.length;
        var start = typeof(startVal) != 'undefined' ? startVal : 0;
        var end = typeof(endVal) != 'undefined' ? endVal : length - 1;
        var m = start + Math.floor((end - start)/2);
        if(length == 0) {
            if(this.state.resultadosClientes.length > 0) {
                if(this.state.resultadosPrestamos[0] == undefined)
                    this.state.resultadosPrestamos[0] = [];
                var newObjectCredito = {};
                newObjectCredito[fieldCreditID] = parseInt(newValue[fieldCreditID]);
                this.state.resultadosPrestamos[0].push(newObjectCredito);
            }
            return;
        }
        if( parseInt(newValue[fieldCreditOwner]) == this.state.resultadosClientes[m][fieldClient]) {
            var existeCredito = false;
            for (var i = 0; i < this.state.resultadosPrestamos[m].length; i++) {
                if(this.state.resultadosPrestamos[m][i][fieldCreditID] == newValue[fieldCreditID]) {
                    existeCredito = true;
                    break;
                }
            };
            if(!existeCredito) {
                var newObjectCredito = {};
                newObjectCredito[fieldCreditID] = parseInt(newValue[fieldCreditID]);
                // 1. Make a shallow copy of the items
                let prestamos = [...this.state.resultadosPrestamos];
                // 2. Make a shallow copy of the item you want to mutate
                let prestamo = [...prestamos[m]];
                // 3. Replace the property you're intested in
                prestamo.push(newObjectCredito);
                // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                prestamos[m] = prestamo;
                // 5. Set the state to our new copy
                this.setState({
                    resultadosPrestamos: prestamos
                });
                //this.state.resultadosPrestamos[m].push(newObjectCredito);
            }
            return;
        }
        if( parseInt(newValue[fieldCreditOwner]) > this.state.resultadosClientes[end][fieldClient]) {
            var newObjectCredito = {};
            newObjectCredito[fieldCreditID] = parseInt(newValue[fieldCreditID]);
            newArray = [newObjectCredito];
            // 1. Make a shallow copy of the items
            let prestamos = [...this.state.resultadosPrestamos];
            // 3. Replace the property you're intested in
            prestamos.splice(end + 1, 0, newArray);
            // 5. Set the state to our new copy
            this.setState({
                resultadosPrestamos: prestamos
            });
            //this.state.resultadosPrestamos.splice(end + 1, 0, newArray);
            return;
        }
        if( parseInt(newValue[fieldCreditOwner]) < this.state.resultadosClientes[start][fieldClient]) {
            var newObjectCredito = {};
            newObjectCredito[fieldCreditID] = parseInt(newValue[fieldCreditID]);
            var newArray = [newObjectCredito];
            // 1. Make a shallow copy of the items
            let prestamos = [...this.state.resultadosPrestamos];
            // 3. Replace the property you're intested in
            prestamos.splice(start, 0, newArray);
            // 5. Set the state to our new copy
            this.setState({
                resultadosPrestamos: prestamos
            });
            //this.state.resultadosPrestamos.splice(start, 0, newArray);
            return;
        }
        if(start >= end){
            return;
        }
        if( parseInt(newValue[fieldCreditOwner]) < this.state.resultadosClientes[m][fieldClient]) {
            this.binaryInsertCredit(newValue, array, fieldClient, fieldCreditOwner, fieldCreditID, start, m - 1);
            return;
        }
        if( parseInt(newValue[fieldCreditOwner]) > this.state.resultadosClientes[m][fieldClient]) {
            this.binaryInsertCredit(newValue, array, fieldClient, fieldCreditOwner, fieldCreditID, m + 1, end);
            return;
        }
    }

    binaryInsertCreditField(newValue){
        for (var i = 0; i < this.state.resultadosPrestamos.length; i++) {
            for (var j = 0; j < this.state.resultadosPrestamos[i].length; j++) {
                if(this.state.resultadosPrestamos[i][j].identificador == newValue.idObjeto) {
                    //this.state.resultadosPrestamos[i][j][newValue.nombre] = newValue.valor;
                    // 1. Make a shallow copy of the items
                    let prestamos = [...this.state.resultadosPrestamos];
                    // 2. Make a shallow copy of the item you want to mutate
                    let prestamo = {...prestamos[i][j]};
                    // 3. Replace the property you're intested in
                    prestamo[newValue.nombre] = newValue.valor;
                    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                    prestamos[i][j] = prestamo;
                    // 5. Set the state to our new copy
                    this.setState({
                        resultadosPrestamos: prestamos
                    });
                    return;
                }
            };
        };
    }

    verificarFinClientes(IDsNoTraer, esCliente) {
        if(tamBanderaActual == tamBanderaFinal && esCliente) {
            this.getObjectsID(" where objeto = 'Préstamo' ", IDsNoTraer, false);
        }
    }

    insertIntoFieldArray(field, type) {
        if(field.nombre.localeCompare("numPrestamo") != 0 && field.nombre.localeCompare("idCliente") != 0)  {
            if(field.objeto.localeCompare("Cliente") == 0) {
                var copiaTemp = [...this.state.camposClientes];
                var entro = false;
                for (var i = 0; i < copiaTemp.length; i++) {
                    if(copiaTemp[i].nombre.localeCompare(field.nombre) == 0) {
                        entro = true;
                        break;
                    }
                };
                if(copiaTemp.length == 0 || !entro) {
                    field.tipo = type;
                    copiaTemp.push(field);
                }
                this.setState({
                    camposClientes: copiaTemp
                });
            } else if(field.objeto.localeCompare("Préstamo") == 0) {
                var copiaTemp = [...this.state.camposPrestamos];
                var entro = false;
                for (var i = 0; i < copiaTemp.length; i++) {
                    if(copiaTemp[i].nombre.localeCompare(field.nombre) == 0) {
                        entro = true;
                        break;
                    }
                };
                if(copiaTemp.length == 0 || !entro) {
                    field.tipo = type;
                    copiaTemp.push(field);
                }
                this.setState({
                    camposPrestamos: copiaTemp
                });
            }
        }
    }

    crearArchivoExcel() {
        console.log(this.state.resultadosClientes);
        console.log(this.state.resultadosPrestamos);
        console.log(this.state.camposClientes);
        console.log(this.state.camposPrestamos);
        var workbook = {
            SheetNames : ["Libro1"],
            Sheets: {
                "Libro1": {
                    "!merges":[]/*,
                    "!ref":"A1:"+"O"+(120+arregloTotales.length)*/
                }
            }
        };
        var k = 0;
        for (k = 0; k < this.state.camposClientes.length; k++) {
            var letraColumna = this.colName(k);
            workbook.Sheets.Libro1[letraColumna+"1"] = {
                v: this.state.camposClientes[k].nombre,
                s: {
                    font: {
                      color: {
                        rgb: 'ffffff'
                      },
                      bold: true,
                      sz : 15
                    },
                    fill: {
                        patternType: "solid",
                        bgColor: {
                            rgb: "01579b"
                        },
                        fgColor: {
                            rgb: "01579b"
                        }
                    },
                    alignment: {
                        horizontal: "center"
                    }
                }
            };
        };
        for (var p = 0; p < this.state.camposPrestamos.length; p++) {
            var letraColumna = this.colName(k+p);
            workbook.Sheets.Libro1[letraColumna+"1"] = {
                v: this.state.camposPrestamos[p].nombre,
                s: {
                    font: {
                      color: {
                        rgb: 'ffffff'
                      },
                      bold: true,
                      sz : 15
                    },
                    fill: {
                        patternType: "solid",
                        bgColor: {
                            rgb: "01579b"
                        },
                        fgColor: {
                            rgb: "01579b"
                        }
                    },
                    alignment: {
                        horizontal: "center"
                    }
                }
            };
        };
        var posicionNumericaFila = 2;
        var posicionNumericaColumna = 0;
        for (var i = 0; i < this.state.resultadosClientes.length; i++) {
            var m = 0;
            for (m = 0; m < this.state.camposClientes.length; m++) {
                if(i == 0) {
                    posicionNumericaColumna++;
                }
                if(this.state.camposClientes[m].tipo.localeCompare("int") == 0) {
                    var celda = this.getExcelCellInt(this.state.resultadosClientes[i][this.state.camposClientes[m].nombre]);
                    var letraColumna = this.colName(m);
                    var fila = posicionNumericaFila+i;
                    workbook.Sheets.Libro1[letraColumna+fila] = celda;
                } else if(this.state.camposClientes[m].tipo.localeCompare("decimal") == 0) {
                    var celda = this.getExcelCellDecimal(this.state.resultadosClientes[i][this.state.camposClientes[m].nombre]);
                    var letraColumna = this.colName(m);
                    var fila = posicionNumericaFila+i;
                    workbook.Sheets.Libro1[letraColumna+fila] = celda;
                } else if(this.state.camposClientes[m].tipo.localeCompare("date") == 0) {
                    var celda = this.getExcelCellDate(this.state.resultadosClientes[i][this.state.camposClientes[m].nombre]);
                    var letraColumna = this.colName(m);
                    var fila = posicionNumericaFila+i;
                    workbook.Sheets.Libro1[letraColumna+fila] = celda;
                } else if(this.state.camposClientes[m].tipo.localeCompare("bool") == 0) {
                    var celda = this.getExcelCellBool(this.state.resultadosClientes[i][this.state.camposClientes[m].nombre]);
                    var letraColumna = this.colName(m);
                    var fila = posicionNumericaFila+i;
                    workbook.Sheets.Libro1[letraColumna+fila] = celda;
                } else if(this.state.camposClientes[m].tipo.localeCompare("varchar") == 0) {
                    var celda = this.getExcelCellVarchar(this.state.resultadosClientes[i][this.state.camposClientes[m].nombre]);
                    var letraColumna = this.colName(m);
                    var fila = posicionNumericaFila+i;
                    workbook.Sheets.Libro1[letraColumna+fila] = celda;
                }
            };
            for (var j = 0; j < this.state.resultadosPrestamos[i].length; j++) {
                posicionNumericaFila++;
                for (var n = 0; n < this.state.camposPrestamos.length; n++) {
                    if(i == 0) {
                        posicionNumericaColumna++;
                    }
                    if(this.state.camposPrestamos[m].tipo.localeCompare("int") == 0) {
                        var celda = this.getExcelCellInt(this.state.resultadosPrestamos[i][j][this.state.camposPrestamos[n].nombre]);
                        var letraColumna = this.colName(m+n);
                        var fila = posicionNumericaFila+i;
                        workbook.Sheets.Libro1[letraColumna+fila] = celda;
                    } else if(this.state.camposPrestamos[m].tipo.localeCompare("decimal") == 0) {
                        var celda = this.getExcelCellDecimal(this.state.resultadosPrestamos[i][j][this.state.camposPrestamos[n].nombre]);
                        var letraColumna = this.colName(m+n);
                        var fila = posicionNumericaFila+i;
                        workbook.Sheets.Libro1[letraColumna+fila] = celda;
                    } else if(this.state.camposPrestamos[m].tipo.localeCompare("date") == 0) {
                        var celda = this.getExcelCellDate(this.state.resultadosPrestamos[i][j][this.state.camposPrestamos[n].nombre]);
                        var letraColumna = this.colName(m+n);
                        var fila = posicionNumericaFila+i;
                        workbook.Sheets.Libro1[letraColumna+fila] = celda;
                    } else if(this.state.camposPrestamos[m].tipo.localeCompare("bool") == 0) {
                        var celda = this.getExcelCellBool(this.state.resultadosPrestamos[i][j][this.state.camposPrestamos[n].nombre]);
                        var letraColumna = this.colName(m+n);
                        var fila = posicionNumericaFila+i;
                        workbook.Sheets.Libro1[letraColumna+fila] = celda;
                    } else if(this.state.camposPrestamos[m].tipo.localeCompare("varchar") == 0) {
                        var celda = this.getExcelCellVarchar(this.state.resultadosPrestamos[i][j][this.state.camposPrestamos[n].nombre]);
                        var letraColumna = this.colName(m+n);
                        var fila = posicionNumericaFila+i;
                        workbook.Sheets.Libro1[letraColumna+fila] = celda;
                    }
                };
            };
            //posicionNumericaFila++;
        };
        workbook.Sheets.Libro1["!ref"] = "A1:"+this.colName(posicionNumericaColumna)+posicionNumericaFila;
        console.log(workbook)

        //DESCARGAR
        var wbout = XLSX.write(workbook, {bookType:'xlsx', bookSST:false, type: 'binary'});
        XLSX.writeFile(workbook, "./Reporte.xlsx");
        alert("Archivo Descargado.");
    }

    getExcelCellInt(valor) {
        var celda = {
                v: valor,
                t:'n',
                s: {
                    font: {
                      color: {
                        rgb: '000'
                      },
                      bold: false,
                      sz : 13
                    },
                    alignment: {
                        horizontal: "center"
                    }
                }
            };
        return celda;
    }

    getExcelCellDecimal(valor) {
        var celda = {
                v: valor,
                t:'n',
                s: {
                    font: {
                      color: {
                        rgb: '000'
                      },
                      bold: false,
                      sz : 13
                    },
                    alignment: {
                        horizontal: "center"
                    }
                }
            };
        return celda;
    }

    getExcelCellDate(valor) {
        var celda = {
                v: valor,
                t:'d',
                s: {
                    font: {
                      color: {
                        rgb: '000'
                      },
                      bold: false,
                      sz : 13
                    },
                    alignment: {
                        horizontal: "center"
                    }
                }
            };
        return celda;
    }

    getExcelCellBool(valor) {
        var celda = {
                v: valor,
                s: {
                    font: {
                      color: {
                        rgb: '000'
                      },
                      bold: false,
                      sz : 13
                    },
                    alignment: {
                        horizontal: "center"
                    }
                }
            };
        return celda;
    }

    getExcelCellVarchar(valor) {
        var celda = {
                v: valor,
                s: {
                    font: {
                      color: {
                        rgb: '000'
                      },
                      bold: false,
                      sz : 13
                    },
                    alignment: {
                        horizontal: "center"
                    }
                }
            };
        return celda;
    }

    colName(n) {
        var ordA = 'a'.charCodeAt(0);
        var ordZ = 'z'.charCodeAt(0);
        var len = ordZ - ordA + 1;
      
        var s = "";
        while(n >= 0) {
            s = String.fromCharCode(n % len + ordA) + s;
            n = Math.floor(n / len) - 1;
        }
        return s.toUpperCase();
    }

    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Descargar Reporteria</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item"} aria-current="page" onClick={this.props.retornoSeleccionFiltro}><a href="#" className={"breadcrumb-link"}>Selección de Filtro</a></li>
                                        <li className={"breadcrumb-item active"} aria-current="page">Resultado</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{width: "100%", padding: "1% 0%"}} className={"text-center"}>
                    <a onClick={this.crearArchivoExcel} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Descargar</a>
                </div>
            </div>
        );
    }
}
