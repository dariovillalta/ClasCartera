import React from 'react';
import sql from 'mssql';

import FilterVariableCreation from './FilterVariableCreation.js';

var filtrosInt = [];
var filtrosDecimal = [];
var filtrosDate = [];
var filtrosBool = [];
var filtrosString = [];

export default class CrearFiltro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipoCampo: {
                esNumero: true,
                esBoolean: false,
                esFecha: false,
                esTexto: false
            },
            tablaSeleccionada: "clientes",
            colorDeTablaSeleccionada: "#8c9eff",
            bordeDeTablaSeleccionada: "2px solid #536dfe",
            campos: []
        }
        this.esNumero = this.esNumero.bind(this);
        this.esBoolean = this.esBoolean.bind(this);
        this.esFecha = this.esFecha.bind(this);
        this.esTexto = this.esTexto.bind(this);
        this.cambioClientes = this.cambioClientes.bind(this);
        this.cambioPrestamos = this.cambioPrestamos.bind(this);
        this.cambioPagos = this.cambioPagos.bind(this);
        this.cambioPlanPagos = this.cambioPlanPagos.bind(this);
        this.loadFields = this.loadFields.bind(this);
        this.insertFilter = this.insertFilter.bind(this);
        this.deleteFromFilter = this.deleteFromFilter.bind(this);
        this.checkFieldType = this.checkFieldType.bind(this);
    }

    componentDidMount() {
        this.loadFields("Cliente");
        filtrosInt = [];
        filtrosDecimal = [];
        filtrosDate = [];
        filtrosBool = [];
        filtrosString = [];
    }

    loadFields(objeto) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select DISTINCT nombre, tipo from Campos where tabla = '"+objeto+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            campos: result.recordset
                        });
                        this.checkFieldType();
                    });
                }
            });
        }); // fin transaction
    }

    esNumero() {
        this.setState({
            tipoCampo: {
                esNumero: true,
                esBoolean: false,
                esFecha: false,
                esTexto: false
            }
        });
    }

    esBoolean () {
        this.setState({
            tipoCampo: {
                esNumero: false,
                esBoolean: true,
                esFecha: false,
                esTexto: false
            }
        });
    }

    esFecha () {
        this.setState({
            tipoCampo: {
                esNumero: false,
                esBoolean: false,
                esFecha: true,
                esTexto: false
            }
        });
    }

    esTexto () {
        this.setState({
            tipoCampo: {
                esNumero: false,
                esBoolean: false,
                esFecha: false,
                esTexto: true
            }
        });
    }

    cambioClientes() {
        this.setState({
            tablaSeleccionada: "clientes",
            colorDeTablaSeleccionada: "#8c9eff",
            bordeDeTablaSeleccionada: "2px solid #536dfe"
        });
        this.loadFields("Cliente");
        this.checkFieldType();
    }

    cambioPrestamos() {
        this.setState({
            tablaSeleccionada: "prestamos",
            colorDeTablaSeleccionada: "#f8bbd0",
            bordeDeTablaSeleccionada: "2px solid #f50057"
        });
        this.loadFields("Préstamo");
        this.checkFieldType();
    }

    cambioPagos() {
        this.setState({
            tablaSeleccionada: "pagos",
            colorDeTablaSeleccionada: "#e0f7fa",
            bordeDeTablaSeleccionada: "2px solid #4fc3f7"
        });
        this.loadFields("Pagos");
        this.checkFieldType();
    }

    cambioPlanPagos() {
        this.setState({
            tablaSeleccionada: "planpagos",
            colorDeTablaSeleccionada: "#ffecb3",
            bordeDeTablaSeleccionada: "2px solid #ffd740"
        });
        this.loadFields("PlanPagos");
        this.checkFieldType();
    }

    
    insertFilter (filtro) {
        console.log(filtro);
        if(filtro[0].tipo.localeCompare("int") == 0){
            for (var i = 0; i < filtro.length; i++) {
                filtrosInt.push(filtro[i]);
            };
            this.props.updatefilter(filtrosInt);
        } else if(filtro[0].tipo.localeCompare("decimal") == 0){
            for (var i = 0; i < filtro.length; i++) {
                filtrosDecimal.push(filtro[i]);
            };
            this.props.updatefilter(filtrosDecimal);
        } else if(filtro[0].tipo.localeCompare("date") == 0){
            for (var i = 0; i < filtro.length; i++) {
                filtrosDate.push(filtro[i]);
            };
            this.props.updatefilter(filtrosDate);
        } else if(filtro[0].tipo.localeCompare("bool") == 0){
            for (var i = 0; i < filtro.length; i++) {
                filtrosBool.push(filtro[i]);
            };
            this.props.updatefilter(filtrosBool);
        } else if(filtro[0].tipo.localeCompare("varchar") == 0){
            for (var i = 0; i < filtro.length; i++) {
                filtrosString.push(filtro[i]);
            };
            this.props.updatefilter(filtrosString);
        }
    }

    deleteFromFilter(index, type) {
        if(type.localeCompare("int") == 0) {
            filtrosInt.splice(index, 1);
            this.props.updatefilter(filtrosInt);
        } else if(type.localeCompare("decimal") == 0) {
            filtrosDecimal.splice(index, 1);
            this.props.updatefilter(filtrosDecimal);
        } else if(type.localeCompare("bool") == 0) {
            filtrosBool.splice(index, 1);
            this.props.updatefilter(filtrosBool);
        } else if(type.localeCompare("date") == 0) {
            filtrosDate.splice(index, 1);
            this.props.updatefilter(filtrosDate);
        } else if(type.localeCompare("varchar") == 0) {
            filtrosString.splice(index, 1);
            this.props.updatefilter(filtrosString);
        }
    }

    checkFieldType() {
        let valor = $('#campo').prop('selectedIndex');
        console.log("valor = "+valor);
        console.log(this.state.campos);
        if(valor.toString().length > 0) {
            let campoSeleccionado = this.state.campos[valor];
            if(campoSeleccionado.tipo.indexOf("int") == 0) {
                this.esNumero();
            } else if(campoSeleccionado.tipo.indexOf("bit") == 0) {
                this.esBoolean();
            } else if(campoSeleccionado.tipo.indexOf("date") == 0) {
                this.esFecha();
            } else if(campoSeleccionado.tipo.indexOf("varchar") == 0) {
                this.esTexto();
            }
        }
    }

    render() {
        return (
            <div style={{height: "82vh"}}>
                <div className={"row border-top border-bottom"} style={{height: "94%"}}>
                    <div className={"col-xl-4 col-4"} style={{height: "100%"}}>
                        <div className={"row"} style={{height: "25%", padding: '5%', display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#8c9eff", border: "2px solid #536dfe", cursor: "pointer"}} onClick={this.cambioClientes}>
                            <div style={{height: "100%"}}>
                                <div style={{height: "80%", margin: '0% 0% 5% 0%', display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <img src="./assets/filter-icons/client.png" alt="" style={{height: "100%", width: "100%"}}/>
                                </div>
                                <div style={{height: "20%"}}>
                                    <h3 className="product-title" style={{textAlign: "center"}}>Clientes</h3>
                                </div>
                            </div>
                        </div>
                        <div className={"row"} style={{height: "25%", padding: '5%', display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8bbd0", border: "2px solid #f50057", cursor: "pointer"}} onClick={this.cambioPrestamos}>
                            <div style={{height: "100%"}}>
                                <div style={{height: "80%", margin: '0% 0% 5% 0%', display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <img src="./assets/filter-icons/loan.png" alt="" style={{height: "100%", width: "100%"}}/>
                                </div>
                                <div style={{height: "20%"}}>
                                    <h3 className="product-title" style={{textAlign: "center"}}>Préstamos</h3>
                                </div>
                            </div>
                        </div>
                        <div className={"row"} style={{height: "25%", padding: '5%', display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#e0f7fa", border: "2px solid #4fc3f7", cursor: "pointer"}} onClick={this.cambioPagos}>
                            <div style={{height: "100%"}}>
                                <div style={{height: "80%", margin: '0% 0% 5% 0%', display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <img src="./assets/filter-icons/pay.png" alt="" style={{height: "100%", width: "100%"}}/>
                                </div>
                                <div style={{height: "20%"}}>
                                    <h3 className="product-title" style={{textAlign: "center"}}>Pagos</h3>
                                </div>
                            </div>
                        </div>
                        <div className={"row"} style={{height: "25%", padding: '5%', display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ffecb3", border: "2px solid #ffd740", cursor: "pointer"}} onClick={this.cambioPlanPagos}>
                            <div style={{height: "100%"}}>
                                <div style={{height: "80%", margin: '0% 0% 5% 0%', display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <img src="./assets/filter-icons/payplan.png" alt="" style={{height: "100%", width: "100%"}}/>
                                </div>
                                <div style={{height: "20%"}}>
                                    <h3 className="product-title" style={{textAlign: "center"}}>Plan de Pagos</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"col-xl-8 col-8"} style={{height: "100%", backgroundColor: this.state.colorDeTablaSeleccionada, display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <div>
                            <FilterVariableCreation  esNumero={this.esNumero} esBoolean={this.esBoolean} esFecha={this.esFecha} esTexto={this.esTexto} tipoCampo={this.state.tipoCampo} insertFilter={this.insertFilter} campos={this.state.campos} bordeDeTablaSeleccionada={this.state.bordeDeTablaSeleccionada} pool={this.props.pool}> </FilterVariableCreation>
                        </div>

                    </div>
                </div>
                <br/>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Filtro</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtrosInt.map((filtro, i) =>
                                            <tr key={i+filtro.texto}>
                                                <th scope="row">{i}</th>
                                                <td>{filtro.texto}</td>
                                                <td><img onClick={() => this.deleteFromFilter(i, "int")} src={"../assets/trash.png"} style={{height: "20px", width: "20px"}}></img></td>
                                            </tr>
                                        )}
                                        {filtrosDecimal.map((filtro, i) =>
                                            <tr key={i+filtro.texto}>
                                                <th scope="row">{i}</th>
                                                <td>{filtro.texto}</td>
                                                <td><img onClick={() => this.deleteFromFilter(i, "decimal")} src={"../assets/trash.png"} style={{height: "20px", width: "20px", cursor: 'pointer'}}></img></td>
                                            </tr>
                                        )}
                                        {filtrosDate.map((filtro, i) =>
                                            <tr key={i+filtro.texto}>
                                                <th scope="row">{i}</th>
                                                <td>{filtro.texto}</td>
                                                <td><img onClick={() => this.deleteFromFilter(i, "date")} src={"../assets/trash.png"} style={{height: "20px", width: "20px", cursor: 'pointer'}}></img></td>
                                            </tr>
                                        )}
                                        {filtrosBool.map((filtro, i) =>
                                            <tr key={i+filtro.texto}>
                                                <th scope="row">{i}</th>
                                                <td>{filtro.texto}</td>
                                                <td><img onClick={() => this.deleteFromFilter(i, "bool")} src={"../assets/trash.png"} style={{height: "20px", width: "20px", cursor: 'pointer'}}></img></td>
                                            </tr>
                                        )}
                                        {filtrosString.map((filtro, i) =>
                                            <tr key={i+filtro.texto}>
                                                <th scope="row">{i}</th>
                                                <td>{filtro.texto}</td>
                                                <td><img onClick={() => this.deleteFromFilter(i, "varchar")} src={"../assets/trash.png"} style={{height: "20px", width: "20px", cursor: 'pointer'}}></img></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{width: "100%", height: "6%", padding: "1% 0%"}} className={"text-center"}>
                    <a onClick={this.props.callbackComponent} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Avanzar</a>
                </div>
                <br/>
            </div>
        );
    }
}
