import React from 'react';

var c3 = require("c3");
var d3 = require("d3");

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
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
    }

    render() {
        return (
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
        );
    }
}
