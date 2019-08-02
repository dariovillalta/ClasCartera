import React from 'react';
import sql from 'mssql';

export default class ReglaTexto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            texto: ''
        }
        this.formatRuleField = this.formatRuleField.bind(this);
        this.formatRuleValue = this.formatRuleValue.bind(this);
        this.checkIsFieldOrValue = this.checkIsFieldOrValue.bind(this);
    }

    componentDidMount() {
        this.checkIsFieldOrValue();
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    checkIsFieldOrValue() {
        if(this.props.esCampo){
            this.formatRuleField();
        } else {
            this.formatRuleValue();
        }
    }

    formatRuleField() {
        const transaction = new sql.Transaction( this.props.pool );
        transaction.begin(err => {
            var rolledBack = false;
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
            const request = new sql.Request(transaction);
            request.query("select nombre from Campos where ID = "+this.props.regla.campoCampoID, (err, result) => {
                if (err) {
                    if (!rolledBack) {
                        console.log(err);
                        transaction.rollback(err => {
                        });
                        this.setState({
                            texto: ''
                        });
                    }
                } else {
                    transaction.commit(err => {
                        this.setState({
                            texto: result.recordset[0].nombre
                        });
                    });
                }
            });
        }); // fin transaction
    }

    formatRuleValue() {
        let arregloDeCampos = this.props.regla.valor.split(",");
        if(this.props.regla.esListaValor) {
            for (var i = 0; i < arregloDeCampos.length; i++) {
                let id = parseInt(arregloDeCampos[i]);
                const transaction = new sql.Transaction( this.props.pool );
                transaction.begin(err => {
                    var rolledBack = false;
                    transaction.on('rollback', aborted => {
                        rolledBack = true;
                    });
                    const request = new sql.Request(transaction);
                    request.query("select nombre from VariablesdeLista where ID = "+id, (err, result) => {
                        if (err) {
                            if (!rolledBack) {
                                console.log(err);
                                transaction.rollback(err => {
                                });
                                this.setState({
                                    texto: ''
                                });
                            }
                        } else {
                            transaction.commit(err => {
                                console.log(result.recordset[0].nombre);
                                this.setState({
                                    texto: result.recordset[0].nombre
                                });
                            });
                        }
                    });
                }); // fin transaction
            };
        } else {
            for (let i = 0; i < arregloDeCampos.length; i++) {
                let id = parseInt(arregloDeCampos[i]);
                const transaction = new sql.Transaction( this.props.pool );
                transaction.begin(err => {
                    var rolledBack = false;
                    transaction.on('rollback', aborted => {
                        rolledBack = true;
                    });
                    const request = new sql.Request(transaction);
                    request.query("select nombre from Campos where ID = "+id, (err, result) => {
                        if (err) {
                            if (!rolledBack) {
                                console.log(err);
                                transaction.rollback(err => {
                                });
                                this.setState({
                                    texto: ''
                                });
                            }
                        } else {
                            transaction.commit(err => {
                                let texto = this.state.texto;
                                if(i > 0)
                                    texto += ", " + result.recordset[0].nombre;
                                else
                                    texto = result.recordset[0].nombre;
                                this.setState({
                                    texto: texto
                                });
                            });
                        }
                    });
                }); // fin transaction
            }
        }
    }

    render() {
        return (
            <span>
                {this.state.texto}
            </span>
        );
    }
}
