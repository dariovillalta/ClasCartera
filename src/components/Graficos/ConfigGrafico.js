import React from 'react';

export default class ConfigGrafico extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tablaSeleccionada: "clientes"
        }
        //this.cambioClientes = this.cambioClientes.bind(this);
    }

    render() {
        return (
            <div>
                <div className="card">
                    <h3 className="card-header">Seleccione los campos a mostrar en la grafica:</h3>
                    <div className="card-body">
                        <h5 className="card-header">Valor Númerico</h5>
                        <form>
                            <div className="form-group">
                                <select className="form-control">
                                    <option>Default select</option>
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
                <div style={{width: "100%", height: "6%", padding: "1% 0%"}} className={"text-center"}>
                    <a onClick={this.props.terminoConfigGrafico} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Iniciar </a>
                </div>
            </div>
        );
    }
}
