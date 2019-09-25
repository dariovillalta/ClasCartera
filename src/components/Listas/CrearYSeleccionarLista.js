import React from 'react';
import sql from 'mssql';

import InlineEdit from '../InlineEdit.js';

const campos = [ {nombre: "varchar"}, {nombre: "bit"}, {nombre: "date"}, {nombre: "int"},  {nombre: "decimal"}];

export default class CrearYSeleccionarLista extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listas: [],
            listaSeleccionada: -1,
            listaSeleccionadaNombre: "",
            mostrar: "selLista",
            variablesDeLista: []
        }
        this.loadLists = this.loadLists.bind(this);
        this.seleccionarLista = this.seleccionarLista.bind(this);
        this.createList = this.createList.bind(this);
        this.regresarSeleccionarLista = this.regresarSeleccionarLista.bind(this);
        this.createElementList = this.createElementList.bind(this);
        this.loadElementsOfLists = this.loadElementsOfLists.bind(this);
    }

    componentDidMount() {
        this.loadLists();
    }

    loadLists() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Listas", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            listas: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    seleccionarLista(idLista, nombreLista) {
        this.setState({
            listaSeleccionada: idLista,
            mostrar: "verElemenLista",
            listaSeleccionadaNombre: nombreLista
        });
        this.loadElementsOfLists();
    }

    createList() {
        let nombre = $("#nombreNuevaLista").val();
        if(nombre.length > 0 && nombre.length < 41) {
            const transaction = new sql.Transaction( this.props.pool );
            transaction.begin(err => {
                var rolledBack = false;
                transaction.on('rollback', aborted => {
                    rolledBack = true;
                });
                const request = new sql.Request(transaction);
                request.query("insert into Listas (nombre) values ('"+nombre+"')", (err, result) => {
                    if (err) {
                        if (!rolledBack) {
                            console.log(err);
                            transaction.rollback(err => {
                            });
                        }
                    } else {
                        transaction.commit(err => {
                            this.loadLists();
                        });
                    }
                });
            }); // fin transaction
        } else {
            alert("Error");
        }
    }

    regresarSeleccionarLista() {
        this.setState({
            listaSeleccionada: -1,
            listaSeleccionadaNombre: "",
            mostrar: "selLista",
            variablesDeLista: []
        });
    }

    createElementList() {
        let idLista = this.state.listaSeleccionada;
        let nombre = $("#nombreElementoNuevo").val();
        let valor = $("#valorElementoNuevo").val();
        let tipo = $("#listaTipoNuevo").val();
        if(idLista != undefined && !isNaN(idLista)) {
            if(nombre.length > 0 && nombre.length < 51) {
                if(valor.length > 0 && valor.length < 501) {
                    if(tipo.length > 0 && tipo.length < 26) {
                        const transaction = new sql.Transaction( this.props.pool );
                        transaction.begin(err => {
                            var rolledBack = false;
                            transaction.on('rollback', aborted => {
                                rolledBack = true;
                            });
                            const request = new sql.Request(transaction);
                            request.query("insert into VariablesdeLista (listaID, valor, nombre, tipo) values ("+idLista+", '"+valor+"', '"+nombre+"', '"+tipo+"')", (err, result) => {
                                if (err) {
                                    if (!rolledBack) {
                                        console.log(err);
                                        transaction.rollback(err => {
                                        });
                                    }
                                } else {
                                    transaction.commit(err => {
                                        this.loadElementsOfLists();
                                        $("#nombreElementoNuevo").val("");
                                        $("#valorElementoNuevo").val("");
                                        $("#listaTipoNuevo").val("");
                                    });
                                }
                            });
                        }); // fin transaction
                    } else {
                        alert("Error");
                    }
                } else {
                    alert("Error");
                }
            } else {
                alert("Error");
            }
        } else {
            alert("Error");
        }
    }

    loadElementsOfLists() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from VariablesdeLista where listaID = "+this.state.listaSeleccionada, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            variablesDeLista: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    render() {
        if(this.state.mostrar.localeCompare("selLista") == 0) {
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
                                            <li className={"breadcrumb-item active"} aria-current="page">Seleccionar Lista</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"card influencer-profile-data"}>
                                <div className={"card-body"}>
                                    <div className={"row"}>
                                        <div className="form-group col-xl-12 col-12">
                                            <label className={"col-form-label"}>Nombre de Lista</label>
                                            <input id="nombreNuevaLista" type="text" className={"form-control"}/>
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <button onClick={this.createList} className={"btn btn-success btn-block col-xl-10 col-10"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold", margin: "0 auto", display: "block"}}>Crear</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"card influencer-profile-data"}>
                                <div className={"card-body"}>
                                    <div className={"row border-top border-bottom addPaddingToConfig"}>
                                        {this.state.listas.map((lista, i) =>
                                            <a className={"btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM"} onClick={() => this.seleccionarLista(lista.ID, lista.nombre)} key={lista.ID}>{lista.nombre}</a>
                                        )}
                                        { this.state.listas.length == 0 ? (
                                            <a className={"btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"}>No existen listas creadas</a>
                                        ) : (
                                            <span></span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if(this.state.mostrar.localeCompare("verElemenLista") == 0) {
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
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.regresarSeleccionarLista}><a href="#" className={"breadcrumb-link"}>Seleccionar Lista</a></li>
                                            <li className={"breadcrumb-item active"} aria-current="page">Seleccionar Lista</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"card influencer-profile-data"}>
                                <div className={"card-body"}>
                                    <div className={"row"}>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className="form-group col-xl-6 col-6">
                                                <label className={"col-form-label"}>Lista</label>
                                                <h4 style={{fontFamily: 'Circular Std Medium', color: "#71748d", border: "1px solid #ccc", paddingLeft: "2%"}} className={"alert-heading"} >{this.state.listaSeleccionadaNombre}</h4>
                                            </div>
                                            <div className="form-group col-xl-6 col-6">
                                                <label className={"col-form-label"}>Nombre de Elemento</label>
                                                <input id="nombreElementoNuevo" type="text" className={"form-control"}/>
                                            </div>
                                        </div>
                                        <div className={"row"} style={{width: "100%"}}>
                                            <div className="form-group col-xl-6 col-6">
                                                <label className={"col-form-label"}>Valor de Elemento</label>
                                                <input id="valorElementoNuevo" type="text" className={"form-control"}/>
                                            </div>
                                            <div className="form-group col-xl-6 col-6">
                                                <label className={"col-form-label"}>Tipo de Elemento</label>
                                                <select id="listaTipoNuevo" className={"form-control"}>
                                                    <option value="" key="0">Seleccione un tipo de variable...</option>
                                                    {campos.map((campo, k) =>
                                                        <option value={campo.nombre} key={k}>{campo.nombre}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className={"row"}>
                                        <button onClick={this.createElementList} className={"btn btn-success btn-block col-xl-10 col-10"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold", margin: "0 auto", display: "block"}}>Crear</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"card influencer-profile-data"}>
                                <div className={"card-body"}>
                                    {this.state.variablesDeLista.map((elemento, i) =>
                                        <div key={elemento.ID} className={"row border-top border-bottom"} style={{width: "100%"}}>
                                            <div className={"row"} style={{width: "100%"}}>
                                                <div className="form-group col-xl-6 col-6">
                                                    <label className={"col-form-label"}>Lista</label>
                                                    <h4 style={{fontFamily: 'Circular Std Medium', color: "#71748d", border: "1px solid #ccc", paddingLeft: "2%"}} className={"alert-heading"} >{this.state.listaSeleccionadaNombre}</h4>
                                                </div>
                                                <div className="form-group col-xl-6 col-6">
                                                    <label className={"col-form-label"}>Nombre de Elemento</label>
                                                    <InlineEdit id={"nombreElemento"+i} texto={elemento.nombre}> </InlineEdit>
                                                </div>
                                            </div>
                                            <div className={"row"} style={{width: "100%"}}>
                                                <div className="form-group col-xl-6 col-6">
                                                    <label className={"col-form-label"}>Valor de Elemento</label>
                                                    <InlineEdit id={"valorElemento"+i} texto={elemento.valor}> </InlineEdit>
                                                </div>
                                                <div className="form-group col-xl-6 col-6">
                                                    <label className={"col-form-label"}>Tipo de Elemento</label>
                                                    <select id={"listaTipo"+i} className={"form-control"} defaultValue={elemento.tipo}>
                                                        <option value="" key="0">Seleccione un tipo de variable...</option>
                                                        {campos.map((campo, k) =>
                                                            <option value={campo.nombre} key={k}>{campo.nombre}</option>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={"row"} style={{width: "100%"}}>
                                                <button onClick={this.createElementList} className={"btn btn-success btn-block col-xl-5 col-5"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold", margin: "0 auto", display: "block"}}>Guardar</button>
                                                <button onClick={this.deleteElementList} className={"btn btn-danger btn-block col-xl-5 col-5"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold", margin: "0 auto", display: "block"}}>Eliminar</button>
                                            </div>
                                            <div className={"row"} style={{width: "100%"}}>
                                                <br/>
                                            </div>
                                        </div>
                                    )}
                                    { this.state.variablesDeLista.length == 0 ? (
                                        <a className={"btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"}>No existen variables creadas</a>
                                    ) : (
                                        <span></span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
