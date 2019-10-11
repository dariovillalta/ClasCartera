import React from 'react';

var c3 = require("c3");
var d3 = require("d3");

export default class LineGraph extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var chart = c3.generate({
            bindto: "#resultado",
            data: {
                columns: [
                    ['data1', 30, 200, 100, 400, 150, 250],
                    ['data2', 50, 20, 10, 40, 15, 25]
                ]
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
