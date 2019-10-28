import React from 'react';
import sql from 'mssql';

var c3 = require("c3");
var d3 = require("d3");

var resultados1 = [], resultados2 = [];

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            capitalMinimo1: {},
            capitalMinimo2: {},
            capitalMinimo3: {},
            capitalMinimo4: {}
        }
        this.getMinimoCapital1 = this.getMinimoCapital1.bind(this);
        this.getLabels1 = this.getLabels1.bind(this);
        this.getSumValues1 = this.getSumValues1.bind(this);
        this.insertIntoResults1 = this.insertIntoResults1.bind(this);
        this.renderChart1 = this.renderChart1.bind(this);
        this.getLabels2 = this.getLabels2.bind(this);
        this.getSumValues2 = this.getSumValues2.bind(this);
        this.insertIntoResults2 = this.insertIntoResults2.bind(this);
        this.renderChart2 = this.renderChart2.bind(this);
        this.formatDateCreation = this.formatDateCreation.bind(this);
    }

    componentDidMount() {
        resultados1 = [];
        resultados2 = [];
        this.getMinimoCapital1();
        this.getLabels1();
        this.getLabels2();
    }

    getMinimoCapital1 () {
        console.log(this.state.capitalMinimo1)
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from ResultadosDecimal where objeto = 'CAPITAL_MINIMO' and fecha = '"+this.formatDateCreation(new Date())+"'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            capitalMinimo1: result.recordset[0]
                        }, console.log(this.state.capitalMinimo1));
                        console.log(this.state.capitalMinimo1)
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

    getLabels1 () {
        var nombreIdentificador = "valor, idObjeto";
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select "+nombreIdentificador+" from ResultadosString where nombre = 'categoriaClasificacion'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        for (var i = 0; i < result.recordset.length; i++) {
                            this.getSumValues1(result.recordset[i].idObjeto, result.recordset[i].valor);
                        };
                    });
                }
            });
        }); // fin transaction
    }

    getSumValues1 (idObjeto, nombreEtiqueta) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select valor from ResultadosDecimal where nombre = 'totalCapitalPagado' and idObjeto = '"+idObjeto+"'", (err, result) => {
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
                            this.insertIntoResults1(result.recordset[i].valor, nombreEtiqueta);
                        };
                    });
                }
            });
        }); // fin transaction
    }

    insertIntoResults1 (valor, nombreEtiqueta) {
        var entro = false;
        for (var i = 0; i < resultados1.length; i++) {
            if(resultados1[i][0].localeCompare(nombreEtiqueta) == 0) {
                resultados1[i][1] += valor;
                entro = true;
                break;
            }
        };
        if(resultados1.length == 0 || !entro) {
            resultados1.push([nombreEtiqueta, valor])
        }
        this.renderChart1();
    }

    renderChart1 () {
        var chartClientes = c3.generate({
            bindto: "#saldos",
            data: {
                columns: resultados1,
                type: 'pie',

                colors: {
                    data1: '#5969ff',
                    data2: '#ff407b',
                    data3: '#b39ddb',
                    data4: '#80deea',
                    data5: '#ffcc80'

                }
            },
            pie: {
                label: {
                    format: function(value, ratio, id) {
                        return d3.format('$')(value);
                    }
                }
            }
        });
    }

    getLabels2 () {
        var nombreIdentificador = "valor, idObjeto";
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select "+nombreIdentificador+" from ResultadosString where nombre = 'categoriaClasificacion'", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        for (var i = 0; i < result.recordset.length; i++) {
                            this.getSumValues2(result.recordset[i].idObjeto, result.recordset[i].valor);
                        };
                    });
                }
            });
        }); // fin transaction
    }

    getSumValues2 (idObjeto, nombreEtiqueta) {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select valor from ResultadosDecimal where nombre = 'estimacionDeterioro' and idObjeto = '"+idObjeto+"'", (err, result) => {
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
                            this.insertIntoResults2(result.recordset[i].valor, nombreEtiqueta);
                        };
                    });
                }
            });
        }); // fin transaction
    }

    insertIntoResults2 (valor, nombreEtiqueta) {
        var entro = false;
        for (var i = 0; i < resultados2.length; i++) {
            if(resultados2[i][0].localeCompare(nombreEtiqueta) == 0) {
                resultados2[i][1] += valor;
                entro = true;
                break;
            }
        };
        if(resultados2.length == 0 || !entro) {
            resultados2.push([nombreEtiqueta, valor])
        }
        this.renderChart2();
    }

    renderChart2 () {
        var chartClientes = c3.generate({
            bindto: "#deterioro",
            data: {
                columns: resultados2,
                type: 'pie',

                colors: {
                    data1: '#5969ff',
                    data2: '#ff407b',
                    data3: '#b39ddb',
                    data4: '#80deea',
                    data5: '#ffcc80'

                }
            },
            pie: {
                label: {
                    format: function(value, ratio, id) {
                        return d3.format('$')(value);
                    }
                }
            }
        });
    }

    /*componentDidMount() {
        var chartClientes = c3.generate({
            bindto: "#saldos",
            data: {
                columns: [
                    ['Créditos Buenos', 5620029.11],
                    ['Créditos Especialmente Mencionados', 7981023],
                    ['Créditos Bajo Norma', 13420089.78],
                    ['Créditos de Dudosa Recuperación', 7419023.52],
                    ['Créditos de Pérdida', 2570891.44]
                ],
                type: 'pie',

                colors: {
                    data1: '#5969ff',
                    data2: '#ff407b',
                    data3: '#b39ddb',
                    data4: '#80deea',
                    data5: '#ffcc80'

                }
            },
            pie: {
                label: {
                    format: function(value, ratio, id) {
                        return d3.format('$')(value);
                    }
                }
            }
        });

        var chartDeterioro = c3.generate({
            bindto: "#deterioro",
            data: {
                columns: [
                    ['Créditos Buenos', 28100.14555],
                    ['Créditos Especialmente Mencionados', 319240.92],
                    ['Créditos Bajo Norma', 3355022.445],
                    ['Créditos de Dudosa Recuperación', 4451414.112],
                    ['Créditos de Pérdida', 2570891.44]
                ],
                type: 'pie',

                colors: {
                    data1: '#5969ff',
                    data2: '#ff407b',
                    data3: '#b39ddb',
                    data4: '#80deea',
                    data5: '#ffcc80'

                }
            },
            pie: {
                label: {
                    format: function(value, ratio, id) {
                        return d3.format('$')(value);
                    }
                }
            }
        });
    }*/

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="card">
                            <h5 className="card-header">Distribución de Saldos por Categoria de Clasificación</h5>
                            <div className="card-body">
                                <div id="saldos"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="card">
                            <h5 className="card-header">Estimaciones de Deterioro por Categoria de Clasificación</h5>
                            <div className="card-body">
                                <div id="deterioro"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    { this.state.capitalMinimo1 != undefined ? (
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="card border-3 border-top border-top-primary">
                                <div className="card-body">
                                    <h5 className="text-muted">Capital Mínimo: </h5>
                                    <div className="metric-value d-inline-block">
                                        <h1 className="mb-1">{new Intl.NumberFormat('en-GB', { 
                                            style: 'currency', 
                                            currency: 'HNL' 
                                        }).format(this.state.capitalMinimo1.valor)}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <span></span>
                    )}
                </div>
            </div>
        );
    }
}
