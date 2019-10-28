import React from 'react';
import sql from 'mssql';

import FilterCampo from './FilterCampo.js';
import FilterOperacion from './FilterOperacion.js';
import FilterValor from './FilterValor.js';
import ErrorMessage from '../ErrorMessage.js';
import MessageModal from '../MessageModal.js';

export default class FilterVariableCreation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorCreacionRegla: {campo: "", descripcion: "", mostrar: false},
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: ""},
            campos: []
        }
        this.saveFilter = this.saveFilter.bind(this);
        this.dismissReglaNewError = this.dismissReglaNewError.bind(this);
        this.showSuccesMessage = this.showSuccesMessage.bind(this);
        this.dismissMessageModal = this.dismissMessageModal.bind(this);
    }

    componentDidMount() {
    }

    saveFilter() {
        var campo = this.props.campos[$("#campo").val()].nombre;
        var operacion = $("input[name='operacionRadio']:checked").val();
        var operacionTexto;
        if($("#igualBoolean").is(":checked")){
            operacionTexto = "es igual";
        } else if($("#menorNumFecha").is(":checked")){
            operacionTexto = "es menor";
        } else if($("#menorIgualNumFecha").is(":checked")){
            operacionTexto = "es menor o igual";
        } else if($("#mayorIgualNumFecha").is(":checked")){
            operacionTexto = "es mayor o igual";
        } else if($("#mayorNumFecha").is(":checked")){
            operacionTexto = "es mayor";
        } else if($("#igualNumFecha").is(":checked")){
            operacionTexto = "es igual";
        } else if($("#noIgualNumFecha").is(":checked")){
            operacionTexto = "no es igual";
        } else if($("#igualTexto").is(":checked")){
            operacionTexto = "es igual";
        } else if($("#noIgualTexto").is(":checked")){
            operacionTexto = "no es igual";
        }
        var valor = $("#camposDeLista").val();
        var tipo = this.props.campos[$("#campo").val()].tipo;
        if(campo.length > 0) {
            if(operacion.length > 0) {
                if(valor.length > 0) {
                    var resultados = [];
                    if(this.props.tipoCampo.esNumero) {
                        for (var i = 0; i < valor.length; i++) {
                            resultados.push({texto: campo + " " + operacionTexto + " " + valor[i], filtro: "(nombre = '"+campo+"' and valor "+operacion+" "+valor[i]+")", tipo: tipo});
                        };
                    } else if(this.props.tipoCampo.esBoolean) {
                        for (var i = 0; i < valor.length; i++) {
                            resultados.push({texto: campo + " " + operacionTexto + " " + valor[i], filtro: "(nombre = '"+campo+"' and valor "+operacion+" '"+valor[i]+"')", tipo: tipo});
                        };
                    } else if(this.props.tipoCampo.esFecha) {
                        for (var i = 0; i < valor.length; i++) {
                            resultados.push({texto: campo + " " + operacionTexto + " " + valor[i], filtro: "(nombre = '"+campo+"' and valor "+operacion+" '"+valor[i]+"')", tipo: tipo});
                        };
                    } else if(this.props.tipoCampo.esTexto) {
                        for (var i = 0; i < valor.length; i++) {
                            resultados.push({texto: campo + " " + operacionTexto + " " + valor[i], filtro: "(nombre = '"+campo+"' and valor "+operacion+" '"+valor[i]+"')", tipo: tipo});
                        };
                    }
                    this.props.insertFilter(resultados);
                } else {
                    alert("El tamano del valor debe ser mayor a 0.");
                }
            } else {
                alert("El tamano de la operacion debe ser mayor a 0.");
            }
        } else {
            alert("El tamano del campo debe ser mayor a 0.");
        }
    }

    dismissReglaNewError() {
        this.setState({
            errorCreacionRegla: {campo: "", descripcion: "", mostrar: false}
        });
    }

    showSuccesMessage(titulo, mensaje) {
        this.setState({
            mensajeModal: {mostrarMensaje: true, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: titulo, mensaje: mensaje}
        });
        let self = this;
        setTimeout(function(){
            self.setState({
                mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: ""}
            });
        }, 850);
    }

    dismissMessageModal() {
        this.setState({
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: ""}
        });
    }

    render() {
        return (
            <div>
                <FilterCampo esNumero={this.props.esNumero}
                    esBoolean={this.props.esBoolean}
                    esFecha={this.props.esFecha}
                    esTexto={this.props.esTexto}
                    campos={this.props.campos}
                    bordeDeTablaSeleccionada={this.props.bordeDeTablaSeleccionada}> </FilterCampo>
                <FilterOperacion esNumero={this.props.tipoCampo.esNumero}
                    esBoolean={this.props.tipoCampo.esBoolean}
                    esFecha={this.props.tipoCampo.esFecha}
                    esTexto={this.props.tipoCampo.esTexto}
                    bordeDeTablaSeleccionada={this.props.bordeDeTablaSeleccionada}> </FilterOperacion>
                <FilterValor esNumero={this.props.tipoCampo.esNumero}
                    esBoolean={this.props.tipoCampo.esBoolean}
                    esFecha={this.props.tipoCampo.esFecha}
                    esTexto={this.props.tipoCampo.esTexto}
                    campos={this.props.campos}
                    bordeDeTablaSeleccionada={this.props.bordeDeTablaSeleccionada}
                    pool={this.props.pool}> </FilterValor>
                { this.state.errorCreacionRegla.mostrar ? (
                    <ErrorMessage campo={this.state.errorCreacionRegla.campo} descripcion={this.state.errorCreacionRegla.descripcion} dismissTableError={this.dismissReglaNewError}> </ErrorMessage>
                ) : (
                    <span></span>
                )}
                { this.state.mensajeModal.mostrarMensaje ? (
                    <MessageModal esError={this.state.mensajeModal.esError} esConfirmar={this.state.mensajeModal.esConfirmar} dismissMessage={this.dismissMessageModal} confirmFunction={this.confirmMessageModal} titulo={this.state.mensajeModal.titulo} mensaje={this.state.mensajeModal.mensaje}> </MessageModal>
                ) : (
                    <span></span>
                )}
                <div className={"text-center"}>
                    <a onClick={this.saveFilter} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Guardar</a>
                </div>
                <br/>
            </div>
        );
    }
}
