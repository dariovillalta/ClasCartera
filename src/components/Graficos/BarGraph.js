import React from 'react';
import sql from 'mssql';

var c3 = require("c3");
var d3 = require("d3");

var resultados = [];

export default class BarGraph extends React.Component {
    constructor(props) {
        super(props);
        this.getLabels = this.getLabels.bind(this);
        this.getSumValues = this.getSumValues.bind(this);
        this.insertIntoResults = this.insertIntoResults.bind(this);
        this.renderChart = this.renderChart.bind(this);
    }

    componentDidMount() {
        resultados = [];
        this.getLabels();
    }

    getLabels () {
        var nombreIdentificador = "valor, idObjeto";
        if(this.props.tablaEtiqueta.localeCompare("ResultadosID") == 0)
            nombreIdentificador = "identificador";
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select "+nombreIdentificador+" from "+this.props.tablaEtiqueta+" where nombre = '"+this.props.nombreEtiqueta+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        for (var i = 0; i < result.recordset.length; i++) {
                            if(this.props.tablaEtiqueta.localeCompare("ResultadosID") == 0)
                                this.getSumValues(result.recordset[i].identificador, result.recordset[i].identificador);
                            else
                                this.getSumValues(result.recordset[i].idObjeto, result.recordset[i].valor);
                        };
                    });
                }
            });
        }); // fin transaction
    }

    getSumValues (idObjeto, nombreEtiqueta) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select valor from "+this.props.tablaNumerico+" where nombre = '"+this.props.nombreNumerico+"' and idObjeto = '"+idObjeto+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        console.log(result.recordset);
                        for (var i = 0; i < result.recordset.length; i++) {
                            this.insertIntoResults(result.recordset[i].valor, nombreEtiqueta);
                        };
                    });
                }
            });
        }); // fin transaction
    }

    insertIntoResults (valor, nombreEtiqueta) {
        var entro = false;
        for (var i = 0; i < resultados.length; i++) {
            if(this.props.tablaEtiqueta.localeCompare("ResultadosString") == 0) {
                if(resultados[i][0].localeCompare(nombreEtiqueta) == 0) {
                    resultados[i][1] += valor;
                    entro = true;
                    break;
                }
            } else if(this.props.tablaEtiqueta.localeCompare("ResultadosBool") == 0) {
                if(resultados[i][0] == nombreEtiqueta) {
                    resultados[i][1] += valor;
                    entro = true;
                    break;
                }
            } else if(this.props.tablaEtiqueta.localeCompare("ResultadosDate") == 0) {
                if(resultados[i][0].getTime() == nombreEtiqueta.getTime()) {
                    resultados[i][1] += valor;
                    entro = true;
                    break;
                }
            } else if(this.props.tablaEtiqueta.localeCompare("ResultadosID") == 0) {
                if(resultados[i][0] == nombreEtiqueta) {
                    resultados[i][1] += valor;
                    entro = true;
                    break;
                }
            }
        };
        if(resultados.length == 0 || !entro) {
            resultados.push([nombreEtiqueta, valor])
        }
        console.log(resultados);
        this.renderChart();
    }

    renderChart () {
        var chart = c3.generate({
            bindto: "#resultado",
            data: {
                columns: resultados,
                type: 'bar'
            },
            bar: {
                width: {
                    ratio: 1 // this makes bar width 50% of length between ticks
                }
                // or
                //width: 100 // this makes bar width 100px
            }/*,
            axis: {
                x: {
                    type: 'category',
                    categories: [new Date()]
                }
            }*/
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-xl-12 col-12">
                    <div className="card">
                        <h5 className="card-header">Gráfico</h5>
                        <div className="card-body">
                            <div id="resultado"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
