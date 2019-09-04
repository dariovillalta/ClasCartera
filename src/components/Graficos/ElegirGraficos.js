import React from 'react';

export default class ElegirGraficos extends React.Component {
    render() {
        return (
            <div className={"row"}>
                <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                    <div className={"card influencer-profile-data"}>
                        <div className={"card-body"}>
                            <div className={"row border-top border-bottom"}>
                                <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"} style={{padding: "5% 2%", width: "100%"}}>
                                    <div className={"row"} style={{display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center"}}>
                                        <h2>Seleccionar Tipo de Gráfico</h2>
                                    </div>
                                    <div className={"row"} style={{overflowX: "scroll", width: "100%"}}>
                                        <div style={{width: "33%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <div onClick={() => this.props.terminoSeleccionGrafico("pie")} style={{width: "90%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8bbd0", borderRadius: "5px", cursor: "pointer"}}>
                                                <div style={{padding: "4% 0%", width: "100%"}}>
                                                    <div className={"row"}>
                                                        <img src={"../assets/graphs-icons/pie-chart.png"} style={{display: "block", margin: "auto"}}></img>
                                                    </div>
                                                    <div className={"row"} style={{textAlign: "center"}}>
                                                        <p className="lead" style={{margin: "auto"}}>Pie</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{width: "33%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <div onClick={() => this.props.terminoSeleccionGrafico("bar")} style={{width: "90%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ffecb3", borderRadius: "5px", cursor: "pointer"}}>
                                                <div style={{padding: "4% 0%", width: "100%"}}>
                                                    <div className={"row"}>
                                                        <img src={"../assets/graphs-icons/bar-chart.png"} style={{display: "block", margin: "auto"}}></img>
                                                    </div>
                                                    <div className={"row"} style={{textAlign: "center"}}>
                                                        <p className="lead" style={{margin: "auto"}}>Bar</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{width: "33%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <div onClick={() => this.props.terminoSeleccionGrafico("line")} style={{width: "90%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#c8e6c9", borderRadius: "5px", cursor: "pointer"}}>
                                                <div style={{padding: "4% 0%", width: "100%"}}>
                                                    <div className={"row"}>
                                                        <img src={"../assets/graphs-icons/line-chart.png"} style={{display: "block", margin: "auto"}}></img>
                                                    </div>
                                                    <div className={"row"} style={{textAlign: "center"}}>
                                                        <p className="lead" style={{margin: "auto"}}>Line</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
