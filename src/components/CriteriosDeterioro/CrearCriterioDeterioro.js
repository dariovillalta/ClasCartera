import React from 'react';
import sql from 'mssql';
import Inputmask from "inputmask";

var subcategorias = [{categoria: "A"},{categoria: "B"},{categoria: "C"},{categoria: "D"},{categoria: "E"},{categoria: "F"},
{categoria: "G"},{categoria: "H"},{categoria: "I"},{categoria: "J"},{categoria: "K"},{categoria: "L"},{categoria: "M"},
{categoria: "N"},{categoria: "O"},{categoria: "P"},{categoria: "Q"},{categoria: "R"},{categoria: "S"},{categoria: "T"},
{categoria: "U"},{categoria: "V"},{categoria: "W"},{categoria: "X"},{categoria: "Y"},{categoria: "Z"}];

export default class CrearCriterioDeterioro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoriasClasificacion: [],
            tiposDeCredito: []
        }
        this.iniciarCriterioDeterioro = this.iniciarCriterioDeterioro.bind(this);
        this.guardarCriterioDeterioro = this.guardarCriterioDeterioro.bind(this);
        this.traerAggararCategoriasClasificacion = this.traerAggararCategoriasClasificacion.bind(this);
        this.traerAggararTiposCreditos = this.traerAggararTiposCreditos.bind(this);
        this.getNombreCategoria = this.getNombreCategoria.bind(this);
    }

    componentDidMount() {
        this.traerAggararCategoriasClasificacion();
        this.traerAggararTiposCreditos();
        //$("#porcentajeEstimacionDeterioro").inputmask({"mask": "999 %"});
        Inputmask({"mask": "9[9][9][.99] %"}).mask($("#porcentajeEstimacionDeterioro"));
        Inputmask({"mask": "9[9][9][9]"}).mask($("#inicioMora"));
        Inputmask({"mask": "9[9][9][9]"}).mask($("#finMora"));
    }

    iniciarCriterioDeterioro() {
        //trayendo los criterios de deterioro relacionados al tipo de credito para auto asignar subcategoria
        var idCategoria = this.state.categoriasClasificacion[$("#categoriaClasificacionID").val()].ID;
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from CriterioDeterioro where categoriaClasPadre = "+idCategoria, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.guardarCriterioDeterioro(result.recordset);
                    });
                }
            });
        }); // fin transaction
    }

    guardarCriterioDeterioro(criterioDeterioroMismaCategoria) {
        let categoriaClasificacion = this.state.categoriasClasificacion[$("#categoriaClasificacionID").val()].ID;
        let nombreClasPadre = this.state.categoriasClasificacion[$("#categoriaClasificacionID").val()].categoria+" "+this.state.categoriasClasificacion[$("#categoriaClasificacionID").val()].tipoCredito;
        let categoria = this.state.categoriasClasificacion[$("#categoriaClasificacionID").val()].categoria+this.getNombreCategoria(criterioDeterioroMismaCategoria);      //es categoriaClasificacion la hijesima (n) vez del arreglo subcategorias ^^^inicio del archivo
        let tipoCredito = $("#tipoCreditoID").val().toString();
        let tipoGarantia = $("#nombreTipoGarantia").val().toString();
        let inicioMora = $("#inicioMora").val();
        let finMora = $("#finMora").val();
        let porcentajeEstimacionDeterioro = $("#porcentajeEstimacionDeterioro").val();
        if(!isNaN(categoriaClasificacion)) {
            if(categoria != undefined && categoria.length > 0) {
                if(!isNaN(tipoCredito)) {
                    if(!isNaN(inicioMora)) {
                        if(!isNaN(finMora)) {
                            const transaction = new sql.Transaction( this.props.pool );
                            transaction.begin(err => {
                                var rolledBack = false;
                                transaction.on('rollback', aborted => {
                                    rolledBack = true;
                                });
                                const request = new sql.Request(transaction);
                                request.query("insert into CriterioDeterioro (categoriaClasPadre, nombreClasPadre, categoria, tipoDeCredito, tipoGarantia, inicioMora, finMora, estimacionDeterioro) values ("+categoriaClasificacion+",'"+nombreClasPadre+"','"+categoria+"',"+tipoCredito+",'"+tipoGarantia+"',"+inicioMora+","+finMora+","+porcentajeEstimacionDeterioro+")", (err, result) => {
                                    if (err) {
                                        if (!rolledBack) {
                                            console.log(err);
                                            transaction.rollback(err => {
                                            });
                                        }
                                    } else {
                                        transaction.commit(err => {
                                            alert("Exito");
                                        });
                                    }
                                });
                            }); // fin transaction
                        } else {
                            alert("Error finMora");
                        }
                    } else {
                        alert("Error inicioMora");
                    }
                } else {
                    alert("Error tipoCredito");
                }
            } else {
                alert("Error categoria");
            }
        } else {
            alert("Error categoriaClasificacion");
        }
    }

    getNombreCategoria(criterioDeterioroMismaCategoria) {
        if(criterioDeterioroMismaCategoria.length <= 26) {
            return subcategorias[criterioDeterioroMismaCategoria.length].categoria;
        } else {
            return subcategorias[criterioDeterioroMismaCategoria.length%26].categoria;
        }
    }


    traerAggararCategoriasClasificacion() {
        //trayendo las categorias de clasificacion de creditos
        var idCategoria = $("#categoriaClasificacionID").val();
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from CategoriaClasificacion", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            categoriasClasificacion: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }


    traerAggararTiposCreditos() {
        //trayendo los tipos de creditos
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
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            tiposDeCredito: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    render() {
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
                                        <li className={"breadcrumb-item"} aria-current="page" onClick={this.props.returnSelCrit}><a href="#" className={"breadcrumb-link"}>Seleccionar Criterio de Deterioro</a></li>
                                        <li className={"breadcrumb-item active"} aria-current="page">Crear Criterio de Deterioro</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-sm-6 col-6"}>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-inline-block text-center"  style={{width: "100%"}}>
                                    <h2 className="text-muted">Categoria de Clasificaci&oacute;n</h2>
                                    <select id="categoriaClasificacionID" className={"form-control form-control-lg"}>
                                        {this.state.categoriasClasificacion.map((categoriaClasificacion, i) => {
                                                return <option value={i} key={categoriaClasificacion.ID}>{categoriaClasificacion.categoria} | {categoriaClasificacion.tipoCredito}</option>
                                            }
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-6 col-6"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"d-inline-block text-center"} style={{width: "100%"}}>
                                    <h2 className="text-muted">Tipo de Crédito</h2>
                                    <select id="tipoCreditoID" className={"form-control form-control-lg"}>
                                        {this.state.tiposDeCredito.map((tipoDeCredito, i) => {
                                                return <option value={tipoDeCredito.ID} key={tipoDeCredito.ID}>{tipoDeCredito.nombre}</option>
                                            }
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-sm-6 col-6"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"d-inline-block text-center"} style={{width: "100%"}}>
                                    <h2 className="text-muted">Estimacion por Deterioro</h2>
                                    <input id="porcentajeEstimacionDeterioro" type="text" className={"form-control"}  style={{width: "100%"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-6 col-6"}>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-inline-block text-center"  style={{width: "100%"}}>
                                    <h2 className="text-muted">Tipo de Garant&iacute;a</h2>
                                    <input id="nombreTipoGarantia" type="text" className={"form-control"}  style={{width: "100%"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-sm-6 col-6"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"d-inline-block text-center"} style={{width: "100%"}}>
                                    <h2 className="text-muted">Rango de Mora M&iacute;nimo</h2>
                                    <input id="inicioMora" type="text" className={"form-control"}  style={{width: "100%"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-6 col-6"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"d-inline-block text-center"} style={{width: "100%"}}>
                                    <h2 className="text-muted">Rango de Mora M&aacute;ximo</h2>
                                    <input id="finMora" type="text" className={"form-control"}  style={{width: "100%"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"text-center"}>
                    <a onClick={this.iniciarCriterioDeterioro} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Guardar</a>
                </div>
                <br/>
            </div>
        );
    }
}
