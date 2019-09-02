import React from 'react';
import sql from 'mssql';

import Accordion from '../Accordion/Accordion.js';
import InlineEdit from '../InlineEdit.js';
import ErrorMessage from '../ErrorMessage.js';
import MessageModal from '../MessageModal.js';

const campos = [ {nombre: "varchar"}, {nombre: "bit"}, {nombre: "date"}, {nombre: "int"} ];
let funciones = [ {funcion: "idCliente", texto: "ID de Cliente"}, {funcion: "fecha", texto: "fecha"}, {nombre: "date"}, {nombre: "int"} ];

export default class ConfiguracionTablas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: -1, indiceX: -1, indiceY: -1}
        }
        //this.loadTables = this.loadTables.bind(this);
    }

    componentDidMount() {
        //this.loadTables();
    }

    /*======_______====== ======_______======   MENSAJES MODAL    ======_______====== ======_______======*/
    /*======_______======                                                             ======_______======*/
    /*======_______======                                                             ======_______======*/
    /*======_______====== ======_______====== ==_____==  ==___==  ======_______====== ======_______======*/

    dismissMessageModal() {
        this.setState({
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: -1, indiceX: -1, indiceY: -1}
        });
    }

    confirmMessageModal() {
        if(this.state.mensajeModal.banderaMetodoInit.localeCompare("goDelTable") == 0) {
            let copiaID = this.state.mensajeModal.idElementoSelec;
            this.deleteTable(copiaID);
        } else if(this.state.mensajeModal.banderaMetodoInit.localeCompare("goDelField") == 0) {
            let copiaID = this.state.mensajeModal.idElementoSelec;
            this.deleteField(copiaID);
        } else if(this.state.mensajeModal.banderaMetodoInit.localeCompare("goUpdField") == 0) {
            let copiaID = this.state.mensajeModal.idElementoSelec;
            this.updateField(copiaID, this.state.mensajeModal.indiceX, this.state.mensajeModal.indiceY);
        }
    }

    showSuccesMessage(titulo, mensaje) {
        this.setState({
            mensajeModal: {mostrarMensaje: true, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: titulo, mensaje: mensaje, banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
        });
        let self = this;
        setTimeout(function(){
            self.setState({
                mensajeModal: {mostrarMensaje: false, mensajeConfirmado: false, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: self.state.mensajeModal.idElementoSelec, indiceX: self.state.mensajeModal.indiceX, indiceY: self.state.mensajeModal.indiceY}
            });
        }, 850);
    }

    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Ver Reporteria</h2>
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
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"} style={{width: "100%"}}>
                            <Accordion key={"0"} showTrash={true} allowMultipleOpen>
                                <div className={"border-top"}>

                                    <div className={"border-top alert alert-primary"} style={{margin: "3% 0%"}}>
                                        <div className={"row"}>
                                            <div className={"form-group col-xl-6 col-6"}>
                                                <h4 className={"col-form-label text-center"}>Tabla</h4>
                                                <h4 style={{fontFamily: 'Circular Std Medium', color: "#71748d"}} className={"alert-heading"} >TEST</h4>
                                            </div>
                                            <div className={"form-group col-xl-6 col-6"}>
                                                <h4 className={"col-form-label text-center"}>Nombre de Campo</h4>
                                                <input id={"campoNombre"} type="text" className={"form-control"}/>
                                            </div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"form-group col-xl-6 col-6"}>
                                                <h4 className={"col-form-label text-center"}>Tipo</h4>
                                                <select id={"campoTipo"} className={"form-control"}>
                                                    <option value="" key="0">Seleccione un tipo de variable...</option>
                                                </select>
                                            </div>
                                            <div className={"form-group col-xl-6 col-6"}>
                                                <h4 className={"col-form-label text-center"}>Guardar Campo en Resultados</h4>
                                                <div className={"switch-button switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                                                    <input type="checkbox" defaultChecked name={"campoGuardar"} id={"campoGuardar"}/><span>
                                                    <label htmlFor={"campoGuardar"}></label></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"row"}>
                                            <button className={"btn btn-light btn-block col-xl-10 col-10"} style={{margin: "0 auto", display: "block"}}>Crear</button>
                                        </div>
                                    </div>
                                </div>
                            </Accordion>
                    </div>
                </div>
                { this.state.mensajeModal.mostrarMensaje ? (
                    <MessageModal esError={this.state.mensajeModal.esError} esConfirmar={this.state.mensajeModal.esConfirmar} dismissMessage={this.dismissMessageModal} confirmFunction={this.confirmMessageModal} titulo={this.state.mensajeModal.titulo} mensaje={this.state.mensajeModal.mensaje}> </MessageModal>
                ) : (
                    <span></span>
                )}
            </div>
        );
    }

    /*render() {
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
                                        <li className={"breadcrumb-item active"} aria-current="page">Tablas</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"} style={{width: "100%"}}>
                        {this.state.tablas.map((tabla, i) => (
                            <Accordion key={tabla.ID} showTrash={true} deleteVariable={() => this.deleteTableConfirmation(tabla.ID, i)} allowMultipleOpen>
                                <div label={tabla.nombre} className={"border-top"}>

                                    { this.state.camposTablas[i] != undefined ? (
                                        <div>
                                            {this.state.camposTablas[i].map((campo, j) => (
                                                <div key={campo.ID} className={"border-top alert alert-primary"} style={{padding: "1% 3%"}}>
                                                    <div className={"row"}>
                                                        <div className={"form-group col-xl-6 col-6"}>
                                                            <h4 className={"col-form-label text-center"}>Tabla</h4>
                                                            <select id={"campoTablaID"+i+j} className={"form-control"} defaultValue={campo.tablaID}>
                                                                <option value="" key="0">Seleccione una tabla...</option>
                                                                {this.state.tablas.map((tabla, k) =>
                                                                    <option value={tabla.ID} key={tabla.ID}>{tabla.nombre}</option>
                                                                )}
                                                            </select>
                                                        </div>
                                                        <div className={"form-group col-xl-6 col-6"}>
                                                            <h4 className={"col-form-label text-center"}>Nombre de Campo</h4>
                                                            <InlineEdit id={"campoNombre"+i+j} texto={campo.nombre}> </InlineEdit>
                                                        </div>
                                                    </div>
                                                    <div className={"row"}>
                                                        <div className="form-group col-xl-6 col-6">
                                                            <h4 className={"col-form-label text-center"}>Tipo</h4>
                                                            <select id={"campoTipo"+i+j} className={"form-control"} defaultValue={campo.tipo}>
                                                                <option value="" key="0">Seleccione un tipo de variable...</option>
                                                                {campos.map((campoSelect, k) =>
                                                                    <option value={campoSelect.nombre} key={k}>{campoSelect.nombre}</option>
                                                                )}
                                                            </select>
                                                        </div>
                                                        <div className={"form-group col-xl-6 col-6"}>
                                                            <h4 className={"col-form-label text-center"}>Guardar Campo en Resultados</h4>
                                                            <div className={"switch-button switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                                                                { campo.guardar ? (
                                                                    <input type="checkbox" defaultChecked name={"campoGuardar"+i+j} id={"campoGuardar"+i+j}/>
                                                                ) : (
                                                                    <input type="checkbox" name={"campoGuardar"+i+j} id={"campoGuardar"+i+j}/>
                                                                )}
                                                                <span><label htmlFor={"campoGuardar"+i+j}></label></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    { this.state.errorModificarCampo.mostrar ? (
                                                        <ErrorMessage campo={this.state.errorModificarCampo.campo} descripcion={this.state.errorModificarCampo.descripcion} dismissTableError={this.dismissFieldEditError}> </ErrorMessage>
                                                    ) : (
                                                        <span></span>
                                                    )}
                                                    <div className={"row"}>
                                                        <button onClick={() => this.updateFieldsConfirmation(campo.ID, i, j)} className={"btn btn-light btn-block col-xl-5 col-5"} style={{margin: "0 auto", display: "block"}}>Guardar</button>
                                                        <button onClick={() => this.deleteFieldsConfirmation(campo.ID, i, j)} className={"btn btn-light btn-block col-xl-1 col-1"} style={{margin: "0 auto", display: "block", display: "flex", alignItems: "center", justifyContent: "center"}}><img onClick={this.props.deleteVariable} src={"../assets/trash.png"} style={{height: "20px", width: "20px"}}></img></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <span></span>
                                    )}  

                                    <div className={"border-top alert alert-primary"} style={{margin: "3% 0%"}}>
                                        <div className={"row"}>
                                            <div className={"form-group col-xl-6 col-6"}>
                                                <h4 className={"col-form-label text-center"}>Tabla</h4>
                                                <h4 style={{fontFamily: 'Circular Std Medium', color: "#71748d"}} className={"alert-heading"} >{tabla.nombre}</h4>
                                            </div>
                                            <div className={"form-group col-xl-6 col-6"}>
                                                <h4 className={"col-form-label text-center"}>Nombre de Campo</h4>
                                                <input id={"campoNombre"+i} type="text" className={"form-control"}/>
                                            </div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"form-group col-xl-6 col-6"}>
                                                <h4 className={"col-form-label text-center"}>Tipo</h4>
                                                <select id={"campoTipo"+i} className={"form-control"}>
                                                    <option value="" key="0">Seleccione un tipo de variable...</option>
                                                    {campos.map((campo, k) =>
                                                        <option value={campo.nombre} key={k}>{campo.nombre}</option>
                                                    )}
                                                </select>
                                            </div>
                                            <div className={"form-group col-xl-6 col-6"}>
                                                <h4 className={"col-form-label text-center"}>Guardar Campo en Resultados</h4>
                                                <div className={"switch-button switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                                                    <input type="checkbox" defaultChecked name={"campoGuardar"+i} id={"campoGuardar"+i}/><span>
                                                    <label htmlFor={"campoGuardar"+i}></label></span>
                                                </div>
                                            </div>
                                        </div>
                                        { this.state.errorCreacionCampo.mostrar ? (
                                            <ErrorMessage campo={this.state.errorCreacionCampo.campo} descripcion={this.state.errorCreacionCampo.descripcion} dismissTableError={this.dismissFieldNewError}> </ErrorMessage>
                                        ) : (
                                            <span></span>
                                        )}
                                        <div className={"row"}>
                                            <button onClick={() => this.insertField(i)} className={"btn btn-light btn-block col-xl-10 col-10"} style={{margin: "0 auto", display: "block"}}>Crear</button>
                                        </div>
                                    </div>
                                </div>
                            </Accordion>
                        ))}
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <h3>Crear Nueva Tabla</h3>
                                <div className={"row border-top"}>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Nombre de la Conecci&oacute;n</label>
                                        <input id="nombreTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Usuario de la Tabla</label>
                                        <input id="usuarioTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Contrase&ntilde;a de la Tabla</label>
                                        <input id="contrasenaTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Servidor de la Tabla</label>
                                        <input id="servidorTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Base de Datos de la Tabla</label>
                                        <input id="basedatosTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Nombre de la Tabla</label>
                                        <input id="tablaTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                </div>
                                { this.state.errorCreacionTabla.mostrar ? (
                                    <ErrorMessage campo={this.state.errorCreacionTabla.campo} descripcion={this.state.errorCreacionTabla.descripcion} dismissTableError={this.dismissTableNewError}> </ErrorMessage>
                                ) : (
                                    <span></span>
                                )}
                                <div className={"row"}>
                                    <button onClick={this.insertTable} className={"btn btn-success btn-block col-xl-10 col-10"} style={{margin: "0 auto", display: "block"}}>Crear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                { this.state.mensajeModal.mostrarMensaje ? (
                    <MessageModal esError={this.state.mensajeModal.esError} esConfirmar={this.state.mensajeModal.esConfirmar} dismissMessage={this.dismissMessageModal} confirmFunction={this.confirmMessageModal} titulo={this.state.mensajeModal.titulo} mensaje={this.state.mensajeModal.mensaje}> </MessageModal>
                ) : (
                    <span></span>
                )}
            </div>
        );
    }*/
}