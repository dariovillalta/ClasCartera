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
            resultadosPrestamos: []
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
        /*var self = this;
        setTimeout(function(){
            self.getObjectsID(" where idPadre != '-1'"+resultadoQueryIDs, resultadoQueryInt, resultadoQueryDecimal, resultadoQueryDate, resultadoQueryBool, resultadoQueryString, false);
        }, 2000);*/
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
                        tamBanderaActual = 0, tamBanderaFinal = result.recordset.length;
                        for (var i = 0; i < result.recordset.length; i++) {
                            if(esCliente)
                                this.binaryInsertClient(result.recordset[i], this.state.resultadosClientes, "identificador", []);
                            else
                                this.binaryInsertCredit(result.recordset[i], this.state.resultadosPrestamos , "ID", "idPadre", "identificador");
                            this.getObjectsField(result.recordset[i].identificador, queryStringInt, queryStringDecimal, queryStringDate, queryStringBool, queryStringString, esCliente);
                            if(esCliente)
                                this.verificarFinClientes();
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
        tamBanderaActual++;
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
        if( newValue[field].localeCompare(array[start].ID) < 0 ) {//!!
            var newObject = {ID: newValue[field]};
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
        var end = typeof(endVal) != 'undefined' ? endVal : length - 1;
        var m = start + Math.floor((end - start)/2);
        if(length == 0) {
            if(this.state.resultadosClientes.length > 0) {
                if(this.state.resultadosPrestamos[0] == undefined)
                    this.state.resultadosPrestamos[0] = [];
                var newObjectCredito = {ID: newValue[fieldCredit]};
                this.state.resultadosPrestamos[0].push(newObjectCredito);
            }
            return;
        }
        if( newValue[fieldCreditOwner].localeCompare(this.state.resultadosClientes[m][fieldClient]) == 0 ) {
            var newObjectCredito = {ID: newValue[fieldCredit]};
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
            return;
        }
        if( newValue[fieldCreditOwner].localeCompare(this.state.resultadosClientes[end][fieldClient]) > 0) {
            var newObjectCredito = {ID: newValue[fieldCredit]};
            var newArray = [newObjectCredito];
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
        if( newValue[fieldCreditOwner].localeCompare(this.state.resultadosClientes[start][fieldClient]) < 0 ) {
            var newObjectCredito = {ID: newValue[fieldCredit]};
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
        for (var i = 0; i < this.state.resultadosPrestamos.length; i++) {
            for (var j = 0; j < this.state.resultadosPrestamos[i].length; j++) {
                if(this.state.resultadosPrestamos[i][j].ID.localeCompare(newValue.idObjeto) == 0) {
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

    verificarFinClientes() {
        console.log("tamBanderaActual = "+tamBanderaActual);
        console.log("tamBanderaFinal = "+tamBanderaFinal);
        if(tamBanderaActual == tamBanderaFinal) {
            console.log("ENTROOO");
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
                            <div key={cliente.ID} style={{margin: "3% 0%"}}>
                                <Accordion showTrash={false} allowMultipleOpen color={"#ffffff"}>
                                    <div label={cliente.ID + " | " + cliente.nombreCliente}>


                                        { this.state.resultadosPrestamos[i] != undefined ? (
                                            <div>
                                                {this.state.resultadosPrestamos[i].map((prestamo, j) => (
                                                    <div key={prestamo.ID}>
                                                        {
                                                            Object.keys(this.state.resultadosPrestamos[i][j]).map((propiedad, k) => (
                                                                <div key={k} style={{display: "inline-block", padding: "1% 3%"}} className={"border-top border-bottom border-left border-right"}>
                                                                    <h4 className={"col-form-label text-center"}>{this.state.resultadosPrestamos[i][j][propiedad]}</h4>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <span></span>
                                        )}
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

    /*render() {
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
                                                <select id={"campoTipo"+i} className={"form-control"}>
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
    }*/
}