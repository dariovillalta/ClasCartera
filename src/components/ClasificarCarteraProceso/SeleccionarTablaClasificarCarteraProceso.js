import React from 'react';

export default class SeleccionarTablaClasificarCarteraProceso extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let color = [
                        {clases: "btn btn-outline-primary btn-block btnWhiteColorHover"},
                        {clases: "btn btn-outline-secondary btn-block btnWhiteColorHover"},
                        {clases: "btn btn-outline-info btn-block btnWhiteColorHover"},
                        {clases: "btn btn-outline-success btn-block btnWhiteColorHover"},
                        {clases: "btn btn-outline-danger btn-block btnWhiteColorHover"},
                        {clases: "btn btn-outline-dark btn-block btnWhiteColorHover"}
                    ];
        let colorSeleccionado = [
                        {clases: "btn btn-outline-primary-active btn-block btnWhiteColorHover"},
                        {clases: "btn btn-outline-secondary-active btn-block btnWhiteColorHover"},
                        {clases: "btn btn-outline-info-active btn-block btnWhiteColorHover"},
                        {clases: "btn btn-outline-success-active btn-block btnWhiteColorHover"},
                        {clases: "btn btn-outline-danger-active btn-block btnWhiteColorHover"},
                        {clases: "btn btn-outline-dark-active btn-block btnWhiteColorHover"}
                    ];
        return (
            <div style={{height: "100%", width: "100%", backgroundColor: "transparent", overflowX: "scroll", overflowY: "hidden", whiteSpace: "nowrap", border: "solid 3px #cfd8dc", borderTopLeftRadius: "5px", borderTopRightRadius: "5px", padding: "1%"}}>
                {this.props.tablasOrginales.map((tabla, i) => (
                    <div key={tabla.ID} style={{height: "100%", width: "40%", display: "inline-block"}}>
                        <div style={{height: "100%", width: "90%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <a onClick={() => this.props.selectTable(i)} className={tabla.active ? colorSeleccionado[i%colorSeleccionado.length].clases : color[i%color.length].clases}>{tabla.nombre}</a>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
