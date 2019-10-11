import React from 'react';

var c3 = require("c3");
var d3 = require("d3");

export default class BarGraph extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var chart = c3.generate({
            bindto: "#resultado",
            data: {
                columns: [
                    ['data1', 30, 200, 100, 400, 150, 250],
                    ['data2', 130, 100, 140, 200, 150, 50]
                ],
                type: 'bar'
            },
            bar: {
                width: {
                    ratio: 0.5 // this makes bar width 50% of length between ticks
                }
                // or
                //width: 100 // this makes bar width 100px
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
