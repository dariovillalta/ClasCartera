import React from 'react';
import sql from 'mssql';

import Layout from './components/Layout.js';
import LoginPage from './components/LoginPage.js';
//import odbc from 'odbc';

const config = {
    user: 'SA',
    password: 'password111!',
    server: 'localhost',
    database: 'INTEGEVAL_Dev',
    stream: true,
    pool: {
        max: 40,
        min: 0,
        idleTimeoutMillis: 60000
    },
    options: {
        useUTC: false
    }
}

const pool = new sql.ConnectionPool(config, err => {
    if(err) {
        console.log(err);
        console.log("Error en conección con la base de datos");
        /*$("body").overhang({
            type: "error",
            primary: "#f84a1d",
            accent: "#d94e2a",
            message: "Error en conección con la base de datos.",
            overlay: true,
            closeConfirm: true
        });*/
    } else {
        console.log('pool loaded');
    }
});

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            userName: null,
            permision: ""
        }
        // or using a configuration object
        /*const connectionString = {
            connectionString: 'DSN=ClasificacionCartera',
            connectionTimeout: 360,
            loginTimeout: 360
        }
        odbc.connect(connectionString, (error, connection) => {
            console.log(connection);
            connection.columns(null, null, null, null, (error, result) => {
                if (error) { return; } // handle
                console.log(result);
            });
        });*/
        // connection2 is now an open Connection
        this.login = this.login.bind(this);
        this.logOff = this.logOff.bind(this);
    }

    login(userName, permision) {
        this.setState({
            isLoggedIn: true,
            userName: null,
            permision: permision
        });
    }

    logOff () {
        this.setState({
            isLoggedIn: false
        });
    }

    select(){
        const config = {
            user: 'SA',
            password: 'password111!',
            server: 'localhost',
            database: 'RCL_Dev',
            stream: true,
            pool: {
                max: 40,
                min: 0,
                idleTimeoutMillis: 60000
            }
        }
        const pool = new sql.ConnectionPool(config, err => {
            console.log("11");
            if(err) {
                console.log(err);
            } else {
                console.log("222");
                return pool.query('select * from Activos_Bancos', (err, result) => {
                    console.log("333");
                    console.log(result);
                });
            }
        });
    }
    render() {
        return (
            <div>
                { this.state.isLoggedIn ? (
                    <Layout userName={this.state.userName} permision={this.state.permision} logOff={this.logOff} pool={pool}> </Layout>
                ) : (
                    <LoginPage login={this.login} pool={pool}> </LoginPage>
                )}
            </div>
        );
    }
}
