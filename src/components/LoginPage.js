import React from 'react';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
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
                        <form>
                            <div className="form-group">
                                <input className="form-control form-control-lg" id="username" type="text" placeholder="Usuario"/>
                            </div>
                            <div className="form-group">
                                <input className="form-control form-control-lg" id="password" type="password" placeholder="Contraseña"/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-block">Iniciar Sesi&oacute;n</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
