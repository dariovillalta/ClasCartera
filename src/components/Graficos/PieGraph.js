import React from 'react';

var c3 = require("c3");
var d3 = require("d3");

export default class PieGraph extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var chartClientes = c3.generate({
            bindto: "#resultado",
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
