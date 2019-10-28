import React from 'react';
import sql from 'mssql';

import Accordion from '../Accordion/Accordion.js';
import InlineEdit from '../InlineEdit.js';
import ErrorMessage from '../ErrorMessage.js';
import MessageModal from '../MessageModal.js';

const campos = [ {nombre: "varchar"}, {nombre: "bit"}, {nombre: "date"}, {nombre: "int"} ];
let funciones = [ {funcion: "idCliente", texto: "ID de Cliente"}, {funcion: "fecha", texto: "fecha"}, {nombre: "date"}, {nombre: "int"} ];

var tamBanderaActual = 0, tamBanderaFinal = 0;

export default class ResultadosReporteria extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: -1, indiceX: -1, indiceY: -1},
            resultadosClientes: [],
            resultadosPrestamos: [],
            camposClientes: [],
            camposPrestamos: []
        }
        //this.loadTables = this.loadTables.bind(this);
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
                            <h2 className={"pageheader-title"}>Ver Reporteria</h2>
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
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"} style={{width: "100%"}}>
                        {this.state.resultadosClientes.map((cliente, i) => (
                            <div key={cliente.identificador} style={{margin: "3% 0%"}}>
                                <Accordion showTrash={false} showEdit={false} allowMultipleOpen color={"#ffffff"}>
                                    <div label={cliente.identificador + " | " + cliente.nombreCliente}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="offset-lg-1 col-lg-11 col-md-12 col-sm-12 col-12">
                                                    <p className="lead">Cliente</p>
                                                    <div style={{overflowX: "auto"}}>
                                                        <table className="table" style={{border: "1px solid #e6e6f2"}}>
                                                            <thead>
                                                                <tr>
                                                                    {this.state.camposClientes.map((campoCliente, j) => (
                                                                        <th key={i+""+j+""+0} scope="col">{campoCliente.nombre}</th>
                                                                    ))}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    {this.state.camposClientes.map((campoCliente, j) => (
                                                                        <th scope="col" key={i+""+j+""+1}>
                                                                            { cliente[campoCliente.nombre] != undefined ? (
                                                                                <span>{cliente[campoCliente.nombre]}</span>
                                                                            ) : (
                                                                                <span></span>
                                                                            )}
                                                                        </th>
                                                                    ))}
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>

                                            { this.state.resultadosPrestamos[i] != undefined ? (
                                                <div className="row">
                                                    <div className="offset-lg-2 col-lg-10 col-md-12 col-sm-12 col-12">
                                                        {this.state.resultadosPrestamos[i].map((prestamo, j) => (
                                                            <div key={prestamo.identificador} style={{border: "1px solid #e6e6f2"}}>
                                                                <Accordion showTrash={false} showEdit={false} allowMultipleOpen color={"#ffffff"}>
                                                                    <div label={"Número de Préstamo: "+prestamo.identificador}>
                                                                        <div className="card-body">
                                                                            <p className="lead">Préstamo</p>
                                                                            <div style={{overflowX: "auto"}}>
                                                                                <table className="table" style={{border: "1px solid #e6e6f2"}}>
                                                                                    <thead>
                                                                                        <tr>
                                                                                            {this.state.camposPrestamos.map((campoPrestamo, k) => (
                                                                                                <th key={i+""+j+""+k+""+0} scope="col">{campoPrestamo.nombre}</th>
                                                                                            ))}
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            {this.state.camposPrestamos.map((campoPrestamo, k) => (
                                                                                                <th scope="col" key={i+""+j+""+k+""+1}>
                                                                                                    { prestamo[campoPrestamo.nombre] != undefined ? (
                                                                                                        <span>{prestamo[campoPrestamo.nombre]}</span>
                                                                                                    ) : (
                                                                                                        <span></span>
                                                                                                    )}
                                                                                                </th>
                                                                                            ))}
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                            <hr/>
                                                                        </div>
                                                                    </div>
                                                                </Accordion>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span></span>
                                            )}

                                        </div>
                                    </div>
                                </Accordion>
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