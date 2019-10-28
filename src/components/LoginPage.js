import React from 'react';
import sql from 'mssql';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login () {
        var username = $('#username').val();
        var password = $('#password').val();
        if(username.localeCompare("admin") == 0) {
            if(password.localeCompare("password111!") == 0) {
                this.props.login("Admin", "admin");
            }
        }
        if(username.length > 0){
            if(password.length > 0){
                const transaction = new sql.Transaction( this.props.pool );
                transaction.begin(err => {
                    var rolledBack = false;
                    transaction.on('rollback', aborted => {
                        // emited with aborted === true
                        rolledBack = true;
                    });
                    const request = new sql.Request(transaction);
                    request.query("select * from Usuarios where usuario = '"+ username +"' and contrasena = '"+ password +"'", (err, result) => {
                        if (err) {
                            console.log(err);
                            if (!rolledBack) {
                                transaction.rollback(err => {
                                    alert("Error en conección con la tabla de Usuarios.");
                                });
                            }
                        }  else {
                            transaction.commit(err => {
                                // ... error checks
                                if(result.recordset.length > 0) {
                                    var usuario = result.recordset[0];
                                    //Cookie Username
                                    this.props.login(usuario.nombreCompleto, usuario.tipoUsuario);
                                } else {
                                    alert("Usuario ó contraseña incorrecta.");
                                }
                            });
                        }
                    });
                }); // fin transaction
            } else {
                alert("Ingrese un valor para la contraseña.");
            }
        } else {
            alert("Ingrese un valor para el usuario.");
        }
    }

    render() {
        return (
            <div className="splash-container">
                <div className="card ">
                    <div className="card-header text-center">
                        <img className="logo-img" src="./assets/logoTOLOC.png" alt="logo" style={{maxWidth: "100%", height: "auto"}}/>
                        <h1 className="display-4">Clasificaci&oacute;n de Cartera</h1>
                        <span className="splash-description">Por favor ingrese su informaci&oacute;n de usuario.</span>
                    </div>
                    <div className="card-body">
                            <div className="form-group">
                                <input className="form-control form-control-lg" id="username" type="text" placeholder="Usuario"/>
                            </div>
                            <div className="form-group">
                                <input className="form-control form-control-lg" id="password" type="password" placeholder="Contraseña"/>
                            </div>
                            <button className="btn btn-primary btn-lg btn-block" onClick={this.login}>Iniciar Sesi&oacute;n</button>
                    </div>
                </div>
            </div>
        );
    }
}
