import React from 'react';

export default class Campo extends React.Component {
    constructor(props) {
        super(props);
        this.checkFieldType = this.checkFieldType.bind(this);
    }

    checkFieldType() {
        let valor = $('#campo').val();
        if(valor.length > 0 && valor.localeCompare("M0ra") != 0) {
            let campoSeleccionado = this.props.campos[valor];
            if(campoSeleccionado.tipo.indexOf("int") == 0) {
                this.props.esNumero();
            } else if(campoSeleccionado.tipo.indexOf("bit") == 0) {
                this.props.esBoolean();
            } else if(campoSeleccionado.tipo.indexOf("date") == 0) {
                this.props.esFecha();
            } else if(campoSeleccionado.tipo.indexOf("varchar") == 0) {
                this.props.esTexto();
            }
        } else if(valor.length > 0 && valor.localeCompare("M0ra") == 0) {
            this.props.esNumero();
        }
    }
    
    render() {
        return (
            <div>
                <div className={"row"}>
                	<div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card"}>
                            <h3 className={"card-header"}>Seleccionar Campo</h3>
                            <div className={"card-body"}>
                                <div className={"form-group"}>
                                    <select id="campo" className={"form-control form-control-lg"} onChange={this.checkFieldType}>
                                        <option value="">Seleccione un campo...</option>
                                        <option value="M0ra">Días de Mora</option>
                                        {this.props.campos.map((campo, i) =>
                                            <option value={i} key={i}>{campo.nombre}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
