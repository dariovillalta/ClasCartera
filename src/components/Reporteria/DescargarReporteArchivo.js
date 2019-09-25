import React from 'react';

export default class DescargarReporteArchivo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultados: []
        }
        //this.cambioClientes = this.cambioClientes.bind(this);
        this.loadDataWithFilters = this.loadDataWithFilters.bind(this);
        this.getFiltersString = this.getFiltersString.bind(this);
        this.getFilterQuery = this.getFilterQuery.bind(this);
        this.getObjects = this.getObjects.bind(this);
    }

    componentDidMount() {
        this.loadDataWithFilters();
    }

    loadDataWithFilters() {
        var cadenaFiltros = this.getFiltersString();
        this.getObjects(cadenaFiltros);
    }

    getFiltersString () {
        var resultado = '';
        for (var i = 0; i < this.props.arregloDeFiltros.length; i++) {
            resultado += this.getFilterQuery(this.props.arregloDeFiltros[i]);
        };
    }

    getFilterQuery(filtro) {
        //if (filtro.)
    }

    getObjects(queryString) {
        //traer resultados de base de datos
    }

    crearArchivoExcel() {
        //
    }

    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Descargar Reporteria</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item"} aria-current="page" onClick={this.props.retornoSeleccionFiltro}><a href="#" className={"breadcrumb-link"}>Selección de Filtro</a></li>
                                        <li className={"breadcrumb-item active"} aria-current="page">Resultado</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{width: "100%", padding: "1% 0%"}} className={"text-center"}>
                    <a onClick={this.props.callbackComponent} className={"btn btn-primary col-xs-6 col-6"} style={{color: "white", fontSize: "1.2em", fontWeight: "bold"}}>Descargar</a>
                </div>
            </div>
        );
    }
}
