import React from 'react';
import sql from 'mssql';

import SeleccionarCategoriaClasificacion from './SeleccionarCategoriaClasificacion.js';
import MostrarReglas from '../Regla/MostrarReglas.js';

export default class CategoriaClasificacion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idCategoriaClasificacion: -1,
            nombreCategoriaClasificacion: "",
            mostrarTabla: "selCatClas"
        }
        this.updateClasificationCategoryID = this.updateClasificationCategoryID.bind(this);
        this.returnSelClasificationCategory = this.returnSelClasificationCategory.bind(this);
    }

    updateClasificationCategoryID (id, nombre) {
        this.setState({
            idCategoriaClasificacion: id,
            mostrarTabla: "selVar",
            nombreCreditoSeleccionado: nombre
        });
    }

    returnSelClasificationCategory () {
        this.setState({
            idCategoriaClasificacion: -1,
            mostrarTabla: "selCatClas"
        });
    }

    render() {
        if(this.state.mostrarTabla.localeCompare("selCatClas") == 0) {
            return (
                <div>
                    <SeleccionarCategoriaClasificacion pool={this.props.pool} seleccionarCategoriaClasificacion={this.updateClasificationCategoryID} showConfigurationComponent={this.props.showConfigurationComponent}> </SeleccionarCategoriaClasificacion>
                </div>
            );
        } else if(this.state.mostrarTabla.localeCompare("selVar") == 0) {
            return (
                <div>
                    <MostrarReglas pool={this.props.pool} showConfigurationComponent={this.props.showConfigurationComponent} returnPrevComponent={this.returnSelClasificationCategory} returnPrevComponentName={"Seleccionar Categoria de Clasificación"} campoTexto={this.state.campoTexto} tipoTablaRes={"CategoriaClasificacion"} idTipoTabla={this.state.idCategoriaClasificacion}> </MostrarReglas>
                </div>
            );
        }
    }
}
