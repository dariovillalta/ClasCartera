import React from 'react';

export default class FilterCampo extends React.Component {
    constructor(props) {
        super(props);
        this.checkFieldType = this.checkFieldType.bind(this);
    }

    checkFieldType() {
        let valor = $('#campo').prop('selectedIndex');
        console.log("valor = "+valor);
        console.log(this.props.campos);
        if(valor.toString().length > 0) {
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
        }
    }
    
    render() {
        return (
            <div>
                <div className={"row"}>
                	<div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <h3>Seleccionar Campo</h3>
                        <div className={"form-group"}>
                            <select id="campo" className={"form-control form-control-lg"} onChange={this.checkFieldType}>
                                {this.props.campos.map((campo, i) =>
                                    <option value={i} key={i}>{campo.nombre}</option>
                                )}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
