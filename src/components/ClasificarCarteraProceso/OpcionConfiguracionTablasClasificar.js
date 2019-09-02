import React from 'react';

import Accordion from '../Accordion/Accordion.js';

export default class OpcionConfiguracionTablasClasificar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "solid 2px #eceff1"}}>
                <div style={{width: "90%"}}>

                    <div style={{display: "inline-block", width: "10%"}}>
                        <label className="custom-control custom-checkbox" style={{height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <input id={this.props.id} type="checkbox" defaultChecked className="custom-control-input"/>
                            <span className="custom-control-label"></span>
                        </label>
                    </div>
                    <div style={{display: "inline-block", width: "90%", padding: "0%", borderLeft: "solid 1px #eceff1"}}>
                        <Accordion showTrash={false} allowMultipleOpen color={this.props.color}>
                            <div label={this.props.nombre}>
                                { this.props.campos != undefined ? (
                                    <span>
                                        {this.props.campos.map((opcion, i) => (
                                            <p key={opcion.ID}>{opcion.nombre}</p>
                                        ))}
                                    </span>
                                ) : (
                                    <span></span>
                                )}
                            </div>
                        </Accordion>

                    </div>
                </div>
            </div>
        );
    }
}
