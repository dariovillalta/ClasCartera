import React from 'react';
import sql from 'mssql';

export default class DescargarReporteArchivo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultadosClientes: [],
            resultadosPrestamos: []
        }
        //this.cambioClientes = this.cambioClientes.bind(this);
        this.getFiltersString = this.getFiltersString.bind(this);
        this.getFilterQuery = this.getFilterQuery.bind(this);
        this.getObjectsID = this.getObjectsID.bind(this);
        this.getObjectsField = this.getObjectsField.bind(this);
        this.binaryInsertClient = this.binaryInsertClient.bind(this);
        this.binaryInsertCredit = this.binaryInsertCredit.bind(this);
        this.binaryInsertCreditField = this.binaryInsertCreditField.bind(this);
    }

    componentDidMount() {
        this.getFiltersString();
    }

    getFiltersString () {
        var resultadoQueryIDs = '';
        /*for (var i = 0; i < this.props.arregloDeFiltros.length; i++) {
            resultadoQueryIDs += this.getFilterQuery(this.props.arregloDeFiltrosIDs[i]);
        };*/
        var resultadoQueryInt = '';
        /*for (var i = 0; i < this.props.arregloDeFiltros.length; i++) {
            resultadoQueryInt += this.getFilterQuery(this.props.arregloDeFiltrosInt[i]);
        };*/
        var resultadoQueryDecimal = '';
        /*for (var i = 0; i < this.props.arregloDeFiltros.length; i++) {
            resultadoQueryDecimal += this.getFilterQuery(this.props.arregloDeFiltrosDecimal[i]);
        };*/
        var resultadoQueryDate = '';
        /*for (var i = 0; i < this.props.arregloDeFiltros.length; i++) {
            resultadoQueryDate += this.getFilterQuery(this.props.arregloDeFiltrosDate[i]);
        };*/
        var resultadoQueryBool = '';
        /*for (var i = 0; i < this.props.arregloDeFiltros.length; i++) {
            resultadoQueryBool += this.getFilterQuery(this.props.arregloDeFiltrosBool[i]);
        };*/
        var resultadoQueryString = '';
        /*for (var i = 0; i < this.props.arregloDeFiltros.length; i++) {
            resultadoQueryString += this.getFilterQuery(this.props.arregloDeFiltrosString[i]);
        };*/
        this.getObjectsID(" where idPadre = '-1'"+resultadoQueryIDs, resultadoQueryInt, resultadoQueryDecimal, resultadoQueryDate, resultadoQueryBool, resultadoQueryString, true);
        //this.getObjectsID(" where idPadre != '-1'"+resultadoQueryIDs, resultadoQueryInt, resultadoQueryDecimal, resultadoQueryDate, resultadoQueryBool, resultadoQueryString, false);
        var self = this;
        setTimeout(function(){
            self.getObjectsID(" where idPadre != '-1'"+resultadoQueryIDs, resultadoQueryInt, resultadoQueryDecimal, resultadoQueryDate, resultadoQueryBool, resultadoQueryString, false);
        }, 3000);
    }

    getFilterQuery(filtro) {
        //if (filtro.)
    }

    getObjectsID(queryStringID, queryStringInt, queryStringDecimal, queryStringDate, queryStringBool, queryStringString, esCliente) {
        //traer id de resultados de base de datos
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ResultadosID "+queryStringID, (err, result) => {
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
                        for (var i = 0; i < result.recordset.length; i++) {
                            if(esCliente)
                                this.binaryInsertClient(result.recordset[i], this.state.resultadosClientes, "identificador", []);
                            else
                                this.binaryInsertCredit(result.recordset[i], this.state.resultadosPrestamos , "ID", "idPadre", "identificador");
                            this.getObjectsField(result.recordset[i].identificador, queryStringInt, queryStringDecimal, queryStringDate, queryStringBool, queryStringString, esCliente);
                        };
                        console.log("resultados");
                        console.log(this.state.resultadosClientes);
                        console.log(this.state.resultadosPrestamos);
                    });
                }
            });
        }); // fin transaction
    }

    getObjectsField(idObjeto, queryStringInt, queryStringDecimal, queryStringDate, queryStringBool, queryStringString, esCliente) {
        //traer campos de resultados de base de datos
        const transaction1 = new sql.Transaction( this.props.pool );
        transaction1.begin(err => {
            var rolledBack = false;
            transaction1.on('rollback', aborted => {
                rolledBack = true;
            });
            const request1 = new sql.Request(transaction1);
            request1.query("select * from ResultadosInt where idObjeto = '"+idObjeto+"' "+queryStringInt, (err, result) => {
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
                                    this.binaryInsertClient(result.recordset[i], this.state.resultadosClientes, "idObjeto", result.recordset);
                                else
                                    this.binaryInsertCreditField(result.recordset[i]);
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
            request2.query("select * from ResultadosDecimal where idObjeto = '"+idObjeto+"' "+queryStringInt, (err, result) => {
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
                                    this.binaryInsertClient(result.recordset[i], this.state.resultadosClientes, "idObjeto", result.recordset);
                                else
                                    this.binaryInsertCreditField(result.recordset[i]);
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
            request3.query("select * from ResultadosDate where idObjeto = '"+idObjeto+"' "+queryStringInt, (err, result) => {
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
                                    this.binaryInsertClient(result.recordset[i], this.state.resultadosClientes, "idObjeto", result.recordset);
                                else
                                    this.binaryInsertCreditField(result.recordset[i]);
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
            request4.query("select * from ResultadosBool where idObjeto = '"+idObjeto+"' "+queryStringInt, (err, result) => {
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
                                    this.binaryInsertClient(result.recordset[i], this.state.resultadosClientes, "idObjeto", result.recordset);
                                else
                                    this.binaryInsertCreditField(result.recordset[i]);
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
            request5.query("select * from ResultadosString where idObjeto = '"+idObjeto+"' "+queryStringInt, (err, result) => {
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
                                    this.binaryInsertClient(result.recordset[i], this.state.resultadosClientes, "idObjeto", result.recordset);
                                else
                                    this.binaryInsertCreditField(result.recordset[i]);
                            };
                        }
                    });
                }
            });
        }); // fin transaction5
    }

    binaryInsertClient(newValue, array, field, fieldsToSave, startVal, endVal){
        var length = array.length;
        var start = typeof(startVal) != 'undefined' ? startVal : 0;
        var end = typeof(endVal) != 'undefined' ? endVal : length - 1;//!! endVal could be 0 don't use || syntax
        var m = start + Math.floor((end - start)/2);
        if(length == 0) {
            var newObject = {ID: newValue[field]};
            for (var i = 0; i < fieldsToSave.length; i++) {
                newObject[fieldsToSave[i][nombre]] = fieldsToSave[i].valor;
            };
            array.push(newObject);
            return;
        }
        if( newValue[field].localeCompare(array[m].ID) == 0 ) {
            for (var i = 0; i < fieldsToSave.length; i++) {
                array[m][fieldsToSave[i].nombre] = fieldsToSave[i].valor;
            };
            return;
        }
        if( newValue[field].localeCompare(array[end].ID) > 0 ) {
            var newObject = {ID: newValue[field]};
            for (var i = 0; i < fieldsToSave.length; i++) {
                newObject[fieldsToSave[i].nombre] = fieldsToSave[i].valor;
            };
            array.splice(end + 1, 0, newObject);
            return;
        }
        if( newValue[field].localeCompare(array[start].ID) < 0 ) {//!!
            var newObject = {ID: newValue[field]};
            for (var i = 0; i < fieldsToSave.length; i++) {
                newObject[fieldsToSave[i].nombre] = fieldsToSave[i].valor;
            };
            array.splice(start, 0, newObject);
            return;
        }
        if(start >= end){
            return;
        }
        if( newValue[field].localeCompare(array[m].ID) < 0 ){
            this.binaryInsertClient(newValue, array, field, fieldsToSave, start, m - 1);
            return;
        }
        if( newValue[field].localeCompare(array[m].ID) > 0 ){
            this.binaryInsertClient(newValue, array, field, fieldsToSave, m + 1, end);
            return;
        }
    }

    binaryInsertCredit(newValue, array, fieldClient, fieldCreditOwner, fieldCredit, startVal, endVal){
        var length = array.length;
        var start = typeof(startVal) != 'undefined' ? startVal : 0;
        var end = typeof(endVal) != 'undefined' ? endVal : length - 1;//!! endVal could be 0 don't use || syntax
        var m = start + Math.floor((end - start)/2);
        if(length == 0) {
            if(this.state.resultadosClientes.length > 0) {
                if(this.state.resultadosPrestamos[0] == undefined)
                    this.state.resultadosPrestamos[0] = [];
                var newObjectCredito = {ID: newValue[fieldCredit]};
                /*for (var i = 0; i < fieldsToSave.length; i++) {
                    var valorAInsertar = newValue[fieldsToSave[i].nombre];
                    //var validarVariable = checkVariable(valorAInsertar, fieldsToSave[i].tipo);
                    var validarVariable = true;
                    if( validarVariable ) {
                        newObjectCredito[fieldsToSave[i].nombre] = valorAInsertar;
                    } else {
                        //bitacora add error porque no inserto variable
                    }
                };*/
                this.state.resultadosPrestamos[0].push(newObjectCredito);
            }
            return;
        }
        if( newValue[fieldCreditOwner].localeCompare(this.state.resultadosClientes[m][fieldClient]) == 0 ) {
            var newObjectCredito = {ID: newValue[fieldCredit]};
            this.state.resultadosPrestamos[m].push(newObjectCredito);
            /*if(this.state.resultadosPrestamos[m] == undefined)
                this.state.resultadosPrestamos[m] = [];
            var existeCredito = false;
            for (var i = 0; i < this.state.resultadosPrestamos[m].length; i++) {
                if( this.state.resultadosPrestamos[m][i][fieldCredit].localeCompare(newValue[fieldCredit]) == 0) {
                    existeCredito = true;
                    break;
                }
            };
            if(!existeCredito) {
                var newObjectCredito = {fieldCreditOwner: newValue[fieldCreditOwner]};
                for (var i = 0; i < fieldsToSave.length; i++) {
                    var valorAInsertar = newValue[fieldsToSave[i].nombre];
                    //var validarVariable = checkVariable(valorAInsertar, fieldsToSave[i].tipo);
                    var validarVariable = true;
                    if( validarVariable ) {
                        newObject[fieldsToSave[i].nombre] = valorAInsertar;
                    } else {
                        //bitacora add error porque no inserto variable
                    }
                };
                this.state.resultadosPrestamos[m].push(newObjectCredito);
            } else {
                for (var j = 0; j < fieldsToSave.length; j++) {
                    var valorAInsertar = newValue[fieldsToSave[j].nombre];
                    //var validarVariable = checkVariable(valorAInsertar, fieldsToSave[i].tipo);
                    var validarVariable = true;
                    if( validarVariable ) {
                        this.state.resultadosPrestamos[m][i][fieldsToSave[j].nombre] = valorAInsertar;
                    } else {
                        //bitacora add error porque no inserto variable
                    }
                };
            }*/
            return;
        }
        if( newValue[fieldCreditOwner].localeCompare(this.state.resultadosClientes[end][fieldClient]) > 0) {
            var newObjectCredito = {ID: newValue[fieldCredit]};
            /*for (var i = 0; i < fieldsToSave.length; i++) {
                var valorAInsertar = newValue[fieldsToSave[i].nombre];
                //var validarVariable = checkVariable(valorAInsertar, fieldsToSave[i].tipo);
                var validarVariable = true;
                if( validarVariable ) {
                    newObjectCredito[fieldsToSave[i].nombre] = valorAInsertar;
                } else {
                    //bitacora add error porque no inserto variable
                }
            };*/
            var newArray = [newObjectCredito];
            this.state.resultadosPrestamos.splice(end + 1, 0, newArray);
            return;
        }
        if( newValue[fieldCreditOwner].localeCompare(this.state.resultadosClientes[start][fieldClient]) < 0 ) {//!!
            var newObjectCredito = {ID: newValue[fieldCredit]};
            /*for (var i = 0; i < fieldsToSave.length; i++) {
                var valorAInsertar = newValue[fieldsToSave[i].nombre];
                //var validarVariable = checkVariable(valorAInsertar, fieldsToSave[i].tipo);
                var validarVariable = true;
                if( validarVariable ) {
                    newObjectCredito[fieldsToSave[i].nombre] = valorAInsertar;
                } else {
                    //bitacora add error porque no inserto variable
                }
            };*/
            var newArray = [newObjectCredito];
            this.state.resultadosPrestamos.splice(start, 0, newArray);
            return;
        }
        if(start >= end){
            return;
        }
        if( newValue[fieldCreditOwner].localeCompare(this.state.resultadosClientes[m][fieldClient]) < 0 ) {
            this.binaryInsertCredit(newValue, array, fieldClient, fieldCreditOwner, fieldCredit, start, m - 1);
            return;
        }
        if( newValue[fieldCreditOwner].localeCompare(this.state.resultadosClientes[m][fieldClient]) > 0 ) {
            this.binaryInsertCredit(newValue, array, fieldClient, fieldCreditOwner, fieldCredit, m + 1, end);
            return;
        }
    }

    binaryInsertCreditField(newValue){
        /*if(this.state.resultadosPrestamos.length == 0) {
            this.state.resultadosPrestamos[0] = [];
            var newObjectCredito = {};
            for (var k = 0; k < fieldsToSave.length; k++) {
                var valorAInsertar = newValue[fieldsToSave[k].nombre];
                //var validarVariable = checkVariable(valorAInsertar, fieldsToSave[i].tipo);
                var validarVariable = true;
                if( validarVariable ) {
                    newObjectCredito[fieldsToSave[k].nombre] = valorAInsertar;
                } else {
                    //bitacora add error porque no inserto variable
                }
            };
            this.state.resultadosPrestamos[0].push(newObjectCredito);
        } else {*/
            for (var i = 0; i < this.state.resultadosPrestamos.length; i++) {
                for (var j = 0; j < this.state.resultadosPrestamos[i].length; j++) {
                    if(this.state.resultadosPrestamos[i][j].ID.localeCompare(newValue.idObjeto) == 0) {
                        this.state.resultadosPrestamos[i][j][newValue.nombre] = newValue.valor;
                        return;
                    }
                };
            };
        //}
    }

    crearArchivoExcel() {
        //
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
                    <a onClick={this.props.callbackComponent} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Descargar</a>
                </div>
            </div>
        );
    }
}
