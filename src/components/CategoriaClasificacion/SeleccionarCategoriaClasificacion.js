import React from 'react';
import sql from 'mssql';

import CrearCategoriaClasificacion from './CrearCategoriaClasificacion.js';

export default class SeleccionarCategoriaClasificacion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoriasClasificacion: [],
            mostrarCategoriaClasificacion: false
        }
        this.loadClassificationCategory = this.loadClassificationCategory.bind(this);
        this.goCreateClassificationCategory = this.goCreateClassificationCategory.bind(this);
        this.returnChooseClassificationCategory = this.returnChooseClassificationCategory.bind(this);
    }

    componentDidMount() {
        this.loadClassificationCategory();
    }

    loadClassificationCategory() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from CategoriaClasificacion", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            categoriasClasificacion: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    goCreateClassificationCategory() {
        this.setState({
            mostrarCategoriaClasificacion: true
        });
    }

    returnChooseClassificationCategory() {
        this.setState({
            mostrarCategoriaClasificacion: false
        });
        this.loadClassificationCategory();
    }

    render() {
        if(this.state.mostrarCategoriaClasificacion) {
            return (
                <div>
                    <CrearCategoriaClasificacion pool={this.props.pool} retornoSelCategoriaClasificacion={this.returnChooseClassificationCategory} showConfigurationComponent={this.props.showConfigurationComponent}> </CrearCategoriaClasificacion>
                </div>
            );
        } else {
            return (
                <div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"page-header"}>
                                <h2 className={"pageheader-title"}>Configuraci&oacute;n</h2>
                                <div className={"page-breadcrumb"}>
                                    <nav aria-label="breadcrumb">
                                        <ol className={"breadcrumb"}>
                                            <li className={"breadcrumb-item"} aria-current="page" onClick={this.props.showConfigurationComponent}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                            <li className={"breadcrumb-item active"} aria-current="page">Seleccionar Categoria de Clasificaci&oacute;n</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <button onClick={this.goCreateClassificationCategory} className={"btn btn-success btn-block col-xl-10 col-10"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold", margin: "0 auto", display: "block"}}>Crear</button>
                    </div>
                    <br/>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                            <div className={"card influencer-profile-data"}>
                                <div className={"card-body"}>
                                    <div className={"row border-top border-bottom addPaddingToConfig"}>
                                        {this.state.categoriasClasificacion.map((categoriaClasificacion, i) =>
                                            <a className={"btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM"} onClick={() => this.props.seleccionarCategoriaClasificacion(categoriaClasificacion.ID, categoriaClasificacion.nombre)} key={categoriaClasificacion.ID}>{categoriaClasificacion.categoria} | {categoriaClasificacion.tipoCredito}</a>
                                        )}
                                        { this.state.categoriasClasificacion.length == 0 ? (
                                            <a className={"btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"}>No existen categorias de clasificación creados</a>
                                        ) : (
                                            <span></span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
