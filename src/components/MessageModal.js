import React from 'react';

export default class MessageModal extends React.Component {
    constructor() {
        super();
    }

    render() {
        if(this.props.esError) {
            return (
                <div style={{display: "flex", justifyContent: "center", height: "100%", width: "100%", position: "fixed", top: "0px", left: "0px", backgroundColor: "rgba(0,0,0,0.6)", zIndex: "9999", overflow: "hidden"}}>
                    <div>
                        <div className={"alert alert-danger alert-dismissible fade show"} style={{top: "0px", width: "100vw"}} role="alert">
                            <h4 className={"alert-heading"}>{this.props.titulo}</h4>
                            <hr/>
                            <p className={"mb-0"}>{this.props.mensaje}</p>
                            <a className={"close"} data-dismiss="alert" onClick={this.props.dismissMessage}>
                                <span>×</span>
                            </a>
                        </div>
                    </div>
                </div>
            );
        } else if(this.props.esConfirmar) {
            return (
                <div style={{display: "flex", justifyContent: "center", height: "100%", width: "100%", position: "fixed", top: "0px", left: "0px", backgroundColor: "rgba(0,0,0,0.6)", zIndex: "9999", overflow: "hidden"}}>
                    <div>
                        <div className={"alert alert-warning alert-dismissible fade show"} style={{top: "0px", width: "100vw"}} role="alert">
                            <h4 className={"alert-heading"}>{this.props.titulo}</h4>
                            <hr/>
                            <p className={"mb-0"}>{this.props.mensaje}</p>
                            <a className={"close"} data-dismiss="alert" onClick={this.props.dismissMessage}>
                                <span>×</span>
                            </a>
                            <br/>
                            <div className={"row"}>
                                <button onClick={this.props.dismissMessage} className={"btn btn-danger btn-block col-xl-3 col-3"} style={{margin: "0 auto", display: "block"}}>Cerrar</button>
                                <button onClick={this.props.confirmFunction} className={"btn btn-success btn-block col-xl-4 col-4"} style={{margin: "0 auto", display: "block"}}>Confirmar</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div style={{display: "flex", justifyContent: "center", height: "100%", width: "100%", position: "fixed", top: "0px", left: "0px", backgroundColor: "rgba(0,0,0,0.6)", zIndex: "9999", overflow: "hidden"}}>
                    <div>
                        <div className={"alert alert-success alert-dismissible fade show"} style={{top: "0px", width: "100vw"}} role="alert">
                            <h4 className={"alert-heading"}>{this.props.titulo}</h4>
                            <hr/>
                            <p className={"mb-0"}>{this.props.mensaje}</p>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
