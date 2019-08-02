import React from 'react';
import sql from 'mssql';

export default class SeleccionarTabla extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tablas: []
        }
        this.loadTables = this.loadTables.bind(this);
    }

    //componentDidMount() {componentDidUpdate
    componentDidMount() {
        this.loadTables();
    }

    loadTables() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select * from Tablas", (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            tablas: result.recordset
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
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <div className={"row border-top border-bottom addPaddingToConfig"}>
                                    {this.state.tablas.map((tabla, i) =>
                                        <a className={"btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM"} onClick={() => this.props.seleccionarTabla(tabla.ID, tabla.nombre)} key={i}>{tabla.nombre}</a>
                                    )}
                                    { this.state.tablas.length == 0 ? (
                                        <a className={"btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"}>No existen tablas creadas</a>
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
