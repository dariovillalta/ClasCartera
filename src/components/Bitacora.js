import React from 'react';
import sql from 'mssql';

export default class Bitacora extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bitacoras: []
        }
        this.loadBitacora = this.loadBitacora.bind(this);
    }

    componentDidMount() {
        this.loadBitacora();
    }

    loadBitacora() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Bitacora", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            bitacoras: result.recordset
                        });
                    });
                }
            });
        }); // fin transaction
    }

    render() {
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
                                        <li className={"breadcrumb-item active"} aria-current="page">Bit&aacute;cora</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Usuario</th>
                                            <th scope="col">Hora</th>
                                            <th scope="col">Acción</th>
                                            <th scope="col">Mensaje</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.bitacoras.map((bitacora, i) =>
                                            <tr key={bitacora.ID}>
                                                <th scope="row">{i}</th>
                                                <td>{bitacora.usuario}</td>
                                                <td>{bitacora.hora.toLocaleString()}</td>
                                                <td>{bitacora.operacion}</td>
                                                <td>{bitacora.mensaje}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
