import React from 'react';

export default class FilterOperacion extends React.Component {
    render() {
        if(this.props.esBoolean) {
            return (
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <h3>Seleccionar Operación</h3>
                        <div className={"card-body"}>
                            <div className={"text-center"}>
                                <label className={"custom-control custom-radio custom-control-inline"}>
                                    <input type="radio" id="igualBoolean" value="!=" name="operacionRadio" className={"custom-control-input"}/>
                                    <span className={"custom-control-label"}>
                                        <img src="./assets/equal-icons/equal.png" alt="" style={{height: "30px", width: "30px"}}/>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if(this.props.esNumero || this.props.esFecha) {
            return (
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <h3>Seleccionar Operación</h3>
                        <div className={"row"}>
                            <div className={"col-xl-3 col-3"}>
                                <label className={"custom-control custom-radio custom-control-inline"}>
                                    <input type="radio" id="menorNumFecha" value=">=" name="operacionRadio" className={"custom-control-input"}/>
                                    <span className={"custom-control-label"}>
                                        <img src="./assets/equal-icons/lessThan.png" alt="" style={{height: "30px", width: "30px"}}/>
                                    </span>
                                </label>
                            </div>
                            <div className={"col-xl-3 col-3"}>
                                <label className={"custom-control custom-radio custom-control-inline"}>
                                    <input type="radio" id="menorIgualNumFecha" value=">" name="operacionRadio" className={"custom-control-input"}/>
                                    <span className={"custom-control-label"}>
                                        <img src="./assets/equal-icons/lessThanEqual.png" alt="" style={{height: "30px", width: "30px"}}/>
                                    </span>
                                </label>
                            </div>
                            <div className={"col-xl-3 col-3"}>
                                <label className={"custom-control custom-radio custom-control-inline"}>
                                    <input type="radio" id="mayorIgualNumFecha" value="<=" name="operacionRadio" className={"custom-control-input"}/>
                                    <span className={"custom-control-label"}>
                                        <img src="./assets/equal-icons/greaterThanEqual.png" alt="" style={{height: "30px", width: "30px"}}/>
                                    </span>
                                </label>
                            </div>
                            <div className={"col-xl-2 col-2"}>
                                <label className={"custom-control custom-radio custom-control-inline"}>
                                    <input type="radio" id="mayorNumFecha" value="<" name="operacionRadio" className={"custom-control-input"}/>
                                    <span className={"custom-control-label"}>
                                        <img src="./assets/equal-icons/greater.png" alt="" style={{height: "30px", width: "30px"}}/>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <br/>
                        <div className={"row"}>
                            <div className={"col-xl-3 offset-xl-3 col-3 offset-3"}>
                                <label className={"custom-control custom-radio custom-control-inline"}>
                                    <input type="radio" id="igualNumFecha" value="!=" name="operacionRadio" className={"custom-control-input"}/>
                                    <span className={"custom-control-label"}>
                                        <img src="./assets/equal-icons/equal.png" alt="" style={{height: "30px", width: "30px"}}/>
                                    </span>
                                </label>
                            </div>
                            <div className={"col-xl-3 col-3"}>
                                <label className={"custom-control custom-radio custom-control-inline"}>
                                    <input type="radio" id="noIgualNumFecha" value="=" name="operacionRadio" className={"custom-control-input"}/>
                                    <span className={"custom-control-label"}>
                                        <img src="./assets/equal-icons/not equal.png" alt="" style={{height: "30px", width: "30px"}}/>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if(this.props.esTexto) {
            return (
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <h3>Seleccionar Operación</h3>
                        <div className={"text-center"}>
                            <label className={"custom-control custom-radio custom-control-inline"}>
                                <input type="radio" id="igualTexto" value="!=" name="operacionRadio" className={"custom-control-input"}/>
                                <span className={"custom-control-label"}>
                                    <img src="./assets/varCreation/SumarSi.png" alt="" style={{height: "25px", width: "auto"}}/>
                                </span>
                            </label>
                            <label className={"custom-control custom-radio custom-control-inline"}>
                                <input type="radio" id="noIgualTexto" value="=" name="operacionRadio" className={"custom-control-input"}/>
                                <span className={"custom-control-label"}>
                                    <img src="./assets/varCreation/SumarSiNo.png" alt="" style={{height: "25px", width: "auto"}}/>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                </div>
            );
        }
    }
}
