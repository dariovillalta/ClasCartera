import React from 'react';

export default class OpcionTablasClasificar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div style={{width: "90%", border: "solid 2px #eceff1"}}>

                    <div style={{display: "inline-block", width: "10%", borderRight: "solid 2px #eceff1"}}>
                        <label className="custom-control custom-checkbox" style={{height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <input id={this.props.id} type="checkbox" defaultChecked className="custom-control-input" style={{cursor: "pointer"}} onClick={this.props.callMethod}/>
                            <span className="custom-control-label"></span>
                        </label>
                    </div>
                    <div style={{display: "inline-block", width: "90%", padding: "0%", borderLeft: "solid 2px #eceff1", position: "relative"}}>
                        <h4 style={{fontFamily: 'Circular Std Medium', color: "#71748d", cursor: "pointer", top: "70%", position: "absolute", top: "50%", transform: "translate(0, -50%)"}} className={"alert-heading"} onClick={this.props.callMethod}>{this.props.texto}</h4>
                    </div>
                </div>
            </div>
        );
    }
}
