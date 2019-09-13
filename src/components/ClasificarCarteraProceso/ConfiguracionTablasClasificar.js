import React from 'react';

import OpcionConfiguracionTablasClasificar from './OpcionConfiguracionTablasClasificar.js';

export default class ConfiguracionTablasClasificar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let color = [
                        {
                            colorBorde: "#c5cae9"
                        }, {
                            colorBorde: "#f8bbd0"
                        }, {
                            colorBorde: "#b2ebf2"
                        }, {
                            colorBorde: "#c8e6c9"
                        }, {
                            colorBorde: "#fff9c4"
                        }, {
                            colorBorde: "#ffcdd2"
                        }, {
                            colorBorde: "#eeeeee"
                        }
                    ];
        return (
            <div style={{height: "100%", overflowX: "scroll", overflowY: "hidden", whiteSpace: "nowrap", borderRadius: "5px", padding: "1% 0%"}}>
                {this.props.tablasSeleccionadas.map((tabla, i) => (
                    <div key={i} style={{height: "100%", width: this.props.widthActual, display: "inline-block", backgroundColor: color[i%color.length].colorBorde, position: "relative"}}>
                        <div style={{height: "95%", width: "95%", backgroundColor: "white", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", borderRadius: "5px", overflowY: "scroll"}}>

                            <div className={"text-center"} style={{borderBottom: "solid 4px #cfd8dc"}}>
                                <h3>Criterios de Clasificaci&oacute;n</h3>
                            </div>
                            <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "solid 3px #eceff1"}}>
                                <div style={{width: "90%", height: "60%", textAlign: "center", display: "table"}}>
                                    <h5 style={{display: "table-cell", verticalAlign: "middle"}}>Capacidad de Pago</h5>
                                </div>
                            </div>
                            <div style={{width: "100%", height: "25%"}}>
                                <OpcionConfiguracionTablasClasificar id={"CapacidadPago"+i} campos={[]} nombre={"Analisis Financiero"}> </OpcionConfiguracionTablasClasificar>
                            </div>
                            <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "solid 3px #eceff1"}}>
                                <div style={{width: "90%", height: "60%", textAlign: "center", display: "table"}}>
                                    <h5 style={{display: "table-cell", verticalAlign: "middle"}}>Comportamiento de Pago</h5>
                                </div>
                            </div>
                            <div style={{width: "100%", height: "25%", overflowY: "scroll"}}>
                                { this.props.opcionesTabla[i] != undefined ? (
                                    <OpcionConfiguracionTablasClasificar id={"ComportamientoPago"+i} campos={this.props.opcionesTabla[i].tipoCredito} nombre={this.props.opcionesTabla[i].tipoCreditoNombre}> </OpcionConfiguracionTablasClasificar>
                                ) : (
                                    <span></span>
                                )}
                            </div>

                            <div className={"text-center"} style={{borderBottom: "solid 4px #cfd8dc", borderTop: "solid 4px #cfd8dc"}}>
                                <h3>Tipo de Cr&eacute;dito</h3>
                            </div>
                            <div style={{width: "100%", height: "25%", overflowY: "scroll"}}>
                                { this.props.opcionesTabla[i] != undefined ? (
                                    <OpcionConfiguracionTablasClasificar id={"tipoCredito"+i} campos={this.props.opcionesTabla[i].tipoCredito} nombre={this.props.opcionesTabla[i].tipoCreditoNombre}> </OpcionConfiguracionTablasClasificar>
                                ) : (
                                    <span></span>
                                )}
                            </div>

                            <div className={"text-center"} style={{borderBottom: "solid 4px #cfd8dc", borderTop: "solid 4px #cfd8dc"}}>
                                <h3>Categorias de Clasificaci&oacute;n</h3>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
