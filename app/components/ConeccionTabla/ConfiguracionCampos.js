"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _InlineEdit = _interopRequireDefault(require("../InlineEdit.js"));

var _ErrorMessage = _interopRequireDefault(require("../ErrorMessage.js"));

var _MessageModal = _interopRequireDefault(require("../MessageModal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var campos = [{
  nombre: "varchar"
}, {
  nombre: "bit"
}, {
  nombre: "date"
}, {
  nombre: "int"
}, {
  nombre: "decimal"
}];
var tablas = [{
  nombre: "Cliente"
}, {
  nombre: "Préstamo"
}, {
  nombre: "Pagos"
}, {
  nombre: "PlanPagos"
}];
var funciones = [{
  nombre: "Identificador"
}, {
  nombre: "Nombre Cliente"
}, {
  nombre: "Otro"
}]; //let funciones = [ {funcion: "idCliente", texto: "ID de Cliente"}, {funcion: "fecha", texto: "fecha"}, {nombre: "date"}, {nombre: "int"} ];

var ConfiguracionCampos =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ConfiguracionCampos, _React$Component);

  function ConfiguracionCampos(props) {
    var _this;

    _classCallCheck(this, ConfiguracionCampos);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConfiguracionCampos).call(this, props));
    _this.state = {
      camposDeTabla: [],
      errorCreacionCampo: {
        campo: "",
        descripcion: "",
        mostrar: false
      },
      errorModificarCampo: {
        campo: "",
        descripcion: "",
        mostrar: false
      },
      mensajeModal: {
        mostrarMensaje: false,
        mensajeConfirmado: false,
        esError: false,
        esConfirmar: false,
        titulo: "",
        mensaje: "",
        banderaMetodoInit: "",
        idElementoSelec: -1,
        indiceX: -1
      }
    };
    _this.loadFields = _this.loadFields.bind(_assertThisInitialized(_this));
    _this.insertField = _this.insertField.bind(_assertThisInitialized(_this));
    _this.updateFieldsConfirmation = _this.updateFieldsConfirmation.bind(_assertThisInitialized(_this));
    _this.updateField = _this.updateField.bind(_assertThisInitialized(_this));
    _this.deleteFieldsConfirmation = _this.deleteFieldsConfirmation.bind(_assertThisInitialized(_this));
    _this.deleteField = _this.deleteField.bind(_assertThisInitialized(_this));
    _this.dismissFieldNewError = _this.dismissFieldNewError.bind(_assertThisInitialized(_this));
    _this.dismissFieldEditError = _this.dismissFieldEditError.bind(_assertThisInitialized(_this));
    _this.dismissMessageModal = _this.dismissMessageModal.bind(_assertThisInitialized(_this));
    _this.confirmMessageModal = _this.confirmMessageModal.bind(_assertThisInitialized(_this));
    _this.showSuccesMessage = _this.showSuccesMessage.bind(_assertThisInitialized(_this));
    return _this;
  }
  /* mensajeModal <- de state
      //mostrarMensaje:bandera para mostrar modal mensaje en pantalla
      //mensajeConfirmado:retorno del modal mensaje si fue conf
      //esError:bandera para ver que tipo de modal mensaje mostrar
      //esConfirmar:bandera para ver que tipo de modal mensaje mostrar
      //titulo:titulo del modal
      //mensaje:mensaje del modal
      //banderaMetodoInit:variable para ver a que metodo ir cuando regresa de confirmar el modal
      //idElementoSelec:id del elemento que mostro el modal mensaje
      //indiceX:posicion de la tabla en el arreglo que mostro el modal mensaje
      //indiceY:posicion del campo en el arreglo de tablas que mostro el modal mensaje
  */


  _createClass(ConfiguracionCampos, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadFields();
    }
  }, {
    key: "loadFields",
    value: function loadFields() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Campos where tablaID = " + _this2.props.idTablaSeleccionada, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                camposDeTabla: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "insertField",
    value: function insertField() {
      var _this3 = this;

      var idTabla = this.props.idTablaSeleccionada;
      var campoNombre = $("#campoNombre").val();
      var tipoCampo = $("#campoTipo").val();
      var tablaCampo = $("#campoTabla").val();
      var funcionCampo = $("#campoFuncion").val();
      var guardarCampo;
      if ($("#campoGuardar").is(':checked')) guardarCampo = true;else guardarCampo = false;

      if (!isNaN(idTabla) && idTabla.toString().length > 0) {
        if (campoNombre.length > 0 && campoNombre.length < 41) {
          if (tablaCampo.length > 0 && tablaCampo.length < 16) {
            if (funcionCampo.length > 0 && funcionCampo.length < 16) {
              if (tipoCampo.length > 0 && tipoCampo.length < 26) {
                if (guardarCampo != undefined) {
                  this.setState({
                    errorCreacionCampo: {
                      campo: "",
                      descripcion: "",
                      mostrar: false
                    }
                  });
                  var transaction = new _mssql["default"].Transaction(this.props.pool);
                  transaction.begin(function (err) {
                    var rolledBack = false;
                    transaction.on('rollback', function (aborted) {
                      rolledBack = true;
                    });
                    var request = new _mssql["default"].Request(transaction);
                    request.query("insert into Campos (tablaID, nombre, tipo, tabla, funcion, guardar) values (" + idTabla + ",'" + campoNombre + "','" + tipoCampo + "','" + tablaCampo + "','" + funcionCampo + "','" + guardarCampo + "')", function (err, result) {
                      if (err) {
                        if (!rolledBack) {
                          console.log(err);
                          transaction.rollback(function (err) {});
                        }
                      } else {
                        transaction.commit(function (err) {
                          _this3.loadFields();

                          _this3.setState({
                            mensajeModal: {
                              mostrarMensaje: true,
                              mensajeConfirmado: _this3.state.mensajeModal.mostrarMensaje,
                              esError: false,
                              esConfirmar: false,
                              titulo: "Exito",
                              mensaje: "Campo creado con éxito.",
                              banderaMetodoInit: "",
                              idElementoSelec: -1,
                              indiceX: -1
                            }
                          });

                          _this3.showSuccesMessage("Exito", "Campo creado con éxito.");
                          /* mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: -1, indiceX: -1, indiceY: -1} */

                        });
                      }
                    });
                  }); // fin transaction
                } else {
                  var campo = "Guardar Campo";
                  var descripcion;
                  if (guardarCampo.length == 0) descripcion = "El campo debe ser ingresado.";
                  this.setState({
                    errorCreacionCampo: {
                      campo: campo,
                      descripcion: descripcion,
                      mostrar: true
                    }
                  });
                }
              } else {
                var _campo = "Tipo de Campo";

                var _descripcion;

                if (tipoCampo.length == 0) _descripcion = "El campo debe tener una longitud mayor a 0.";else _descripcion = "El campo debe tener una longitud menor a 26.";
                this.setState({
                  errorCreacionCampo: {
                    campo: _campo,
                    descripcion: _descripcion,
                    mostrar: true
                  }
                });
              }
            } else {
              var _campo2 = "Función del Campo";

              var _descripcion2;

              if (funcionCampo.length == 0) _descripcion2 = "El campo debe tener una longitud mayor a 0.";else _descripcion2 = "El campo debe tener una longitud menor a 16.";
              this.setState({
                errorCreacionCampo: {
                  campo: _campo2,
                  descripcion: _descripcion2,
                  mostrar: true
                }
              });
            }
          } else {
            var _campo3 = "Tabla del Campo";

            var _descripcion3;

            if (tablaCampo.length == 0) _descripcion3 = "El campo debe tener una longitud mayor a 0.";else _descripcion3 = "El campo debe tener una longitud menor a 16.";
            this.setState({
              errorCreacionCampo: {
                campo: _campo3,
                descripcion: _descripcion3,
                mostrar: true
              }
            });
          }
        } else {
          var _campo4 = "Nombre de Campo";

          var _descripcion4;

          if (campoNombre.length == 0) _descripcion4 = "El campo debe tener una longitud mayor a 0.";else _descripcion4 = "El campo debe tener una longitud menor a 41.";
          this.setState({
            errorCreacionCampo: {
              campo: _campo4,
              descripcion: _descripcion4,
              mostrar: true
            }
          });
        }
      } else {
        var _campo5 = "ID de tabla/conección";
        var _descripcion5 = "Ingrese un número válido.";
        this.setState({
          errorCreacionCampo: {
            campo: _campo5,
            descripcion: _descripcion5,
            mostrar: true
          }
        });
      }
    }
  }, {
    key: "updateFieldsConfirmation",
    value: function updateFieldsConfirmation(id, x) {
      this.setState({
        mensajeModal: {
          mostrarMensaje: true,
          mensajeConfirmado: false,
          esError: false,
          esConfirmar: true,
          titulo: "Confirmación",
          mensaje: "Esta seguro que desea modificar el campo?",
          banderaMetodoInit: "goUpdField",
          idElementoSelec: id,
          indiceX: x
        }
      });
    }
  }, {
    key: "updateField",
    value: function updateField(id, index) {
      var _this4 = this;

      var idTabla = this.props.idTablaSeleccionada;
      var campoNombre;

      if ($("#campoNombre" + index).length > 0) {
        campoNombre = $("#campoNombre" + index).val();
      } else {
        campoNombre = this.state.camposDeTabla[index].nombre;
      }

      var tablaCampo = $("#campoTabla" + index).val();
      var funcionCampo = $("#campoFuncion" + index).val();
      var tipoCampo = $("#campoTipo" + index).val();
      var guardarCampo;
      if ($("#campoGuardar" + index).is(':checked')) guardarCampo = true;else guardarCampo = false;

      if (!isNaN(idTabla) && idTabla.toString().length > 0) {
        if (campoNombre.length > 0 && campoNombre.length < 41) {
          if (tablaCampo.length > 0 && tablaCampo.length < 16) {
            if (funcionCampo.length > 0 && funcionCampo.length < 16) {
              if (tipoCampo.length > 0 && tipoCampo.length < 26) {
                if (guardarCampo != undefined) {
                  this.setState({
                    errorModificarCampo: {
                      campo: "",
                      descripcion: "",
                      mostrar: false
                    }
                  });
                  var transaction = new _mssql["default"].Transaction(this.props.pool);
                  transaction.begin(function (err) {
                    var rolledBack = false;
                    transaction.on('rollback', function (aborted) {
                      rolledBack = true;
                    });
                    var request = new _mssql["default"].Request(transaction);
                    request.query("update Campos set tablaID = " + idTabla + ", nombre = '" + campoNombre + "', tipo = '" + tipoCampo + "', guardar = '" + guardarCampo + "', tabla = '" + tablaCampo + "', funcion = '" + funcionCampo + "' where ID = " + id, function (err, result) {
                      if (err) {
                        if (!rolledBack) {
                          console.log(err);

                          _this4.setState({
                            mensajeModal: {
                              mostrarMensaje: false,
                              mensajeConfirmado: true,
                              esError: false,
                              esConfirmar: false,
                              titulo: "",
                              mensaje: "",
                              banderaMetodoInit: "",
                              idElementoSelec: _this4.state.mensajeModal.idElementoSelec,
                              indiceX: _this4.state.mensajeModal.indiceX
                            }
                          });

                          transaction.rollback(function (err) {});
                        }
                      } else {
                        transaction.commit(function (err) {
                          // 1. Make a shallow copy of the items
                          //let campos = [...this.state.camposDeTabla];
                          // 2. Make a shallow copy of the item you want to mutate
                          //let campo = [...campos[index]];
                          // 3. Replace the property you're intested in
                          //campo = {ID: campo.ID, idTabla: idTabla, nombre: campoNombre, tipo: tipoCampo, guardar: guardarCampo};
                          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                          //campos[index] = campo;
                          // 5. Set the state to our new copy
                          _this4.loadFields();

                          _this4.setState({
                            mensajeModal: {
                              mostrarMensaje: false,
                              mensajeConfirmado: true,
                              esError: false,
                              esConfirmar: false,
                              titulo: "",
                              mensaje: "",
                              banderaMetodoInit: "",
                              idElementoSelec: _this4.state.mensajeModal.idElementoSelec,
                              indiceX: _this4.state.mensajeModal.indiceX
                            }
                          });

                          _this4.showSuccesMessage("Exito", "Campo modificado con éxito.");
                        });
                      }
                    });
                  }); // fin transaction
                } else {
                  var campo = "Guardar Campo";
                  var descripcion;
                  if (guardarCampo.length == 0) descripcion = "El campo debe ser ingresado.";
                  this.setState({
                    errorModificarCampo: {
                      campo: campo,
                      descripcion: descripcion,
                      mostrar: true
                    },
                    mensajeModal: {
                      mostrarMensaje: false,
                      mensajeConfirmado: true,
                      esError: false,
                      esConfirmar: false,
                      titulo: "",
                      mensaje: "",
                      banderaMetodoInit: "",
                      idElementoSelec: this.state.mensajeModal.idElementoSelec,
                      indiceX: this.state.mensajeModal.indiceX
                    }
                  });
                  /*this.setState({
                      mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
                  });*/
                }
              } else {
                var _campo6 = "Tipo de Campo";

                var _descripcion6;

                if (tipoCampo.length == 0) _descripcion6 = "El campo debe tener una longitud mayor a 0.";else _descripcion6 = "El campo debe tener una longitud menor a 26.";
                this.setState({
                  errorModificarCampo: {
                    campo: _campo6,
                    descripcion: _descripcion6,
                    mostrar: true
                  },
                  mensajeModal: {
                    mostrarMensaje: false,
                    mensajeConfirmado: true,
                    esError: false,
                    esConfirmar: false,
                    titulo: "",
                    mensaje: "",
                    banderaMetodoInit: "",
                    idElementoSelec: this.state.mensajeModal.idElementoSelec,
                    indiceX: this.state.mensajeModal.indiceX
                  }
                });
                /*this.setState({
                    mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
                });*/
              }
            } else {
              var _campo7 = "Función del Campo";

              var _descripcion7;

              if (funcionCampo.length == 0) _descripcion7 = "El campo debe tener una longitud mayor a 0.";else _descripcion7 = "El campo debe tener una longitud menor a 16.";
              this.setState({
                errorModificarCampo: {
                  campo: _campo7,
                  descripcion: _descripcion7,
                  mostrar: true
                },
                mensajeModal: {
                  mostrarMensaje: false,
                  mensajeConfirmado: true,
                  esError: false,
                  esConfirmar: false,
                  titulo: "",
                  mensaje: "",
                  banderaMetodoInit: "",
                  idElementoSelec: this.state.mensajeModal.idElementoSelec,
                  indiceX: this.state.mensajeModal.indiceX
                }
              });
              /*this.setState({
                  mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
              });*/
            }
          } else {
            var _campo8 = "Tabla del Campo";

            var _descripcion8;

            if (tablaCampo.length == 0) _descripcion8 = "El campo debe tener una longitud mayor a 0.";else _descripcion8 = "El campo debe tener una longitud menor a 16.";
            this.setState({
              errorModificarCampo: {
                campo: _campo8,
                descripcion: _descripcion8,
                mostrar: true
              },
              mensajeModal: {
                mostrarMensaje: false,
                mensajeConfirmado: true,
                esError: false,
                esConfirmar: false,
                titulo: "",
                mensaje: "",
                banderaMetodoInit: "",
                idElementoSelec: this.state.mensajeModal.idElementoSelec,
                indiceX: this.state.mensajeModal.indiceX
              }
            });
            /*this.setState({
                mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
            });*/
          }
        } else {
          var _campo9 = "Nombre de Campo";

          var _descripcion9;

          if (campoNombre.length == 0) _descripcion9 = "El campo debe tener una longitud mayor a 0.";else _descripcion9 = "El campo debe tener una longitud menor a 41.";
          this.setState({
            errorModificarCampo: {
              campo: _campo9,
              descripcion: _descripcion9,
              mostrar: true
            },
            mensajeModal: {
              mostrarMensaje: false,
              mensajeConfirmado: true,
              esError: false,
              esConfirmar: false,
              titulo: "",
              mensaje: "",
              banderaMetodoInit: "",
              idElementoSelec: this.state.mensajeModal.idElementoSelec,
              indiceX: this.state.mensajeModal.indiceX
            }
          });
          /*this.setState({
              mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
          });*/
        }
      } else {
        var _campo10 = "ID de nombre de tabla/conección";
        var _descripcion10 = "Ingrese un número válido.";
        this.setState({
          errorModificarCampo: {
            campo: _campo10,
            descripcion: _descripcion10,
            mostrar: true
          },
          mensajeModal: {
            mostrarMensaje: false,
            mensajeConfirmado: true,
            esError: false,
            esConfirmar: false,
            titulo: "",
            mensaje: "",
            banderaMetodoInit: "",
            idElementoSelec: this.state.mensajeModal.idElementoSelec,
            indiceX: this.state.mensajeModal.indiceX
          }
        });
        /*this.setState({
            mensajeModal: {mostrarMensaje: false, mensajeConfirmado: true, esError: false, esConfirmar: false, titulo: "", mensaje: "", banderaMetodoInit: "", idElementoSelec: this.state.mensajeModal.idElementoSelec, indiceX: this.state.mensajeModal.indiceX, indiceY: this.state.mensajeModal.indiceY}
        });*/
      }
    }
  }, {
    key: "deleteFieldsConfirmation",
    value: function deleteFieldsConfirmation(id, x) {
      this.setState({
        mensajeModal: {
          mostrarMensaje: true,
          mensajeConfirmado: false,
          esError: false,
          esConfirmar: true,
          titulo: "Confirmación",
          mensaje: "Esta seguro que desea eliminar el campo?",
          banderaMetodoInit: "goDelField",
          idElementoSelec: id,
          indiceX: x
        }
      });
    }
  }, {
    key: "deleteField",
    value: function deleteField(id) {
      var _this5 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("delete from Campos where ID = " + id, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);

              _this5.setState({
                mensajeModal: {
                  mostrarMensaje: false,
                  mensajeConfirmado: true,
                  esError: false,
                  esConfirmar: false,
                  titulo: "",
                  mensaje: "",
                  banderaMetodoInit: "",
                  idElementoSelec: _this5.state.mensajeModal.idElementoSelec,
                  indiceX: _this5.state.mensajeModal.indiceX
                }
              });

              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var campos = _toConsumableArray(_this5.state.camposDeTabla);

              campos.splice(_this5.state.mensajeModal.indiceX, 1); //this.loadTables();

              _this5.setState({
                camposDeTabla: campos,
                mensajeModal: {
                  mostrarMensaje: false,
                  mensajeConfirmado: true,
                  esError: false,
                  esConfirmar: false,
                  titulo: "",
                  mensaje: "",
                  banderaMetodoInit: "",
                  idElementoSelec: _this5.state.mensajeModal.idElementoSelec,
                  indiceX: _this5.state.mensajeModal.indiceX
                }
              });

              _this5.showSuccesMessage("Exito", "Campo eliminado con éxito.");
              /*this.setState({
                  camposDeTabla: quitando tabla,
                  mensajeModal: limpiando variables del modal
              });*/

            });
          }
        });
      }); // fin transaction
    }
    /*======_______====== ======_______======   MENSAJES ERROR DE CAMPOS    ======_______====== ======_______======*/

    /*======_______======                                                                       ======_______======*/

    /*======_______======                                                                       ======_______======*/

    /*======_______====== ======_______====== ====_____====  ====_____====  ======_______====== ======_______======*/

  }, {
    key: "dismissTableNewError",
    value: function dismissTableNewError() {
      this.setState({
        errorCreacionTabla: {
          campo: "",
          descripcion: "",
          mostrar: false
        }
      });
    }
  }, {
    key: "dismissFieldNewError",
    value: function dismissFieldNewError() {
      this.setState({
        errorCreacionCampo: {
          campo: "",
          descripcion: "",
          mostrar: false
        }
      });
    }
  }, {
    key: "dismissFieldEditError",
    value: function dismissFieldEditError() {
      this.setState({
        errorModificarCampo: {
          campo: "",
          descripcion: "",
          mostrar: false
        }
      });
    }
    /*======_______====== ======_______======   MENSAJES MODAL    ======_______====== ======_______======*/

    /*======_______======                                                             ======_______======*/

    /*======_______======                                                             ======_______======*/

    /*======_______====== ======_______====== ==_____==  ==___==  ======_______====== ======_______======*/

  }, {
    key: "dismissMessageModal",
    value: function dismissMessageModal() {
      this.setState({
        mensajeModal: {
          mostrarMensaje: false,
          mensajeConfirmado: false,
          esError: false,
          esConfirmar: false,
          titulo: "",
          mensaje: "",
          banderaMetodoInit: "",
          idElementoSelec: -1,
          indiceX: -1
        }
      });
    }
  }, {
    key: "confirmMessageModal",
    value: function confirmMessageModal() {
      if (this.state.mensajeModal.banderaMetodoInit.localeCompare("goDelTable") == 0) {
        var copiaID = this.state.mensajeModal.idElementoSelec;
        this.deleteTable(copiaID);
      } else if (this.state.mensajeModal.banderaMetodoInit.localeCompare("goDelField") == 0) {
        var _copiaID = this.state.mensajeModal.idElementoSelec;
        this.deleteField(_copiaID);
      } else if (this.state.mensajeModal.banderaMetodoInit.localeCompare("goUpdField") == 0) {
        var _copiaID2 = this.state.mensajeModal.idElementoSelec;
        this.updateField(_copiaID2, this.state.mensajeModal.indiceX, this.state.mensajeModal.indiceY);
      }
    }
  }, {
    key: "showSuccesMessage",
    value: function showSuccesMessage(titulo, mensaje) {
      this.setState({
        mensajeModal: {
          mostrarMensaje: true,
          mensajeConfirmado: false,
          esError: false,
          esConfirmar: false,
          titulo: titulo,
          mensaje: mensaje,
          banderaMetodoInit: "",
          idElementoSelec: this.state.mensajeModal.idElementoSelec,
          indiceX: this.state.mensajeModal.indiceX
        }
      });
      var self = this;
      setTimeout(function () {
        self.setState({
          mensajeModal: {
            mostrarMensaje: false,
            mensajeConfirmado: false,
            esError: false,
            esConfirmar: false,
            titulo: "",
            mensaje: "",
            banderaMetodoInit: "",
            idElementoSelec: self.state.mensajeModal.idElementoSelec,
            indiceX: self.state.mensajeModal.indiceX
          }
        });
      }, 850);
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Configuraci\xF3n"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item",
        "aria-current": "page",
        onClick: this.props.showConfigurationComponent
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Configuraci\xF3n")), _react["default"].createElement("li", {
        className: "breadcrumb-item",
        "aria-current": "page",
        onClick: this.props.retornoSeleccionTabla
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Tablas")), _react["default"].createElement("li", {
        className: "breadcrumb-item active",
        "aria-current": "page"
      }, "Campos"))))))), _react["default"].createElement("div", {
        className: "border-top alert alert-primary",
        style: {
          margin: "3% 0%"
        }
      }, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("h4", {
        className: "col-form-label text-center"
      }, "Tabla"), _react["default"].createElement("h4", {
        style: {
          fontFamily: 'Circular Std Medium',
          color: "#71748d"
        },
        className: "alert-heading"
      }, this.props.nombreTablaSeleccionada)), _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("h4", {
        className: "col-form-label text-center"
      }, "Nombre de Columna"), _react["default"].createElement("input", {
        id: "campoNombre",
        type: "text",
        className: "form-control"
      }))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("h4", {
        className: "col-form-label text-center"
      }, "Objeto"), _react["default"].createElement("select", {
        id: "campoTabla",
        className: "form-control"
        /*onChange={this.checkFieldType.bind(this)}*/

      }, _react["default"].createElement("option", {
        value: "",
        key: "0"
      }, "Seleccione a que objeto pertenece el campo..."), tablas.map(function (campo, k) {
        return _react["default"].createElement("option", {
          value: campo.nombre,
          key: k
        }, campo.nombre);
      }))), _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("h4", {
        className: "col-form-label text-center"
      }, "Funci\xF3n de Variable"), _react["default"].createElement("select", {
        id: "campoFuncion",
        className: "form-control"
        /*onChange={this.checkFieldType.bind(this)}*/

      }, _react["default"].createElement("option", {
        value: "",
        key: "0"
      }, "Seleccione una funci\xF3n del campo..."), funciones.map(function (campo, k) {
        return _react["default"].createElement("option", {
          value: campo.nombre,
          key: k
        }, campo.nombre);
      })))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("h4", {
        className: "col-form-label text-center"
      }, "Tipo de Variable"), _react["default"].createElement("select", {
        id: "campoTipo",
        className: "form-control"
        /*onChange={this.checkFieldType.bind(this)}*/

      }, _react["default"].createElement("option", {
        value: "",
        key: "0"
      }, "Seleccione un tipo de variable..."), campos.map(function (campo, k) {
        return _react["default"].createElement("option", {
          value: campo.nombre,
          key: k
        }, campo.nombre);
      }))), _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("h4", {
        className: "col-form-label text-center"
      }, "Guardar Campo en Resultados"), _react["default"].createElement("div", {
        className: "switch-button switch-button-yesno",
        style: {
          margin: "0 auto",
          display: "block"
        }
      }, _react["default"].createElement("input", {
        type: "checkbox",
        defaultChecked: true,
        name: "campoGuardar",
        id: "campoGuardar"
      }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
        htmlFor: "campoGuardar"
      }))))), this.state.errorCreacionCampo.mostrar ? _react["default"].createElement(_ErrorMessage["default"], {
        campo: this.state.errorCreacionCampo.campo,
        descripcion: this.state.errorCreacionCampo.descripcion,
        dismissTableError: this.dismissFieldNewError
      }, " ") : _react["default"].createElement("span", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("button", {
        onClick: function onClick() {
          return _this6.insertField();
        },
        className: "btn btn-light btn-block col-xl-10 col-10",
        style: {
          margin: "0 auto",
          display: "block"
        }
      }, "Crear"))), this.state.camposDeTabla.map(function (campo, i) {
        var _ref;

        return _react["default"].createElement("div", {
          key: campo.ID,
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12",
          style: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("div", {
          className: "border-top alert alert-primary",
          style: {
            padding: "1% 3%"
          }
        }, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "form-group col-xl-6 col-6"
        }, _react["default"].createElement("h4", {
          className: "col-form-label text-center"
        }, "Tabla"), _react["default"].createElement("h4", {
          style: {
            fontFamily: 'Circular Std Medium',
            color: "#71748d"
          },
          className: "alert-heading"
        }, _this6.props.nombreTablaSeleccionada)), _react["default"].createElement("div", {
          className: "form-group col-xl-6 col-6"
        }, _react["default"].createElement("h4", {
          className: "col-form-label text-center"
        }, "Nombre de Columna"), _react["default"].createElement(_InlineEdit["default"], {
          id: "campoNombre" + i,
          texto: campo.nombre
        }, " "))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "form-group col-xl-6 col-6"
        }, _react["default"].createElement("h4", {
          className: "col-form-label text-center"
        }, "Objeto"), _react["default"].createElement("select", {
          id: "campoTabla" + i,
          className: "form-control",
          defaultValue: campo.tabla
        }, _react["default"].createElement("option", {
          value: "",
          key: "0"
        }, "Seleccione a que objeto pertenece el campo..."), tablas.map(function (campoSelect, k) {
          return _react["default"].createElement("option", {
            value: campoSelect.nombre,
            key: k
          }, campoSelect.nombre);
        }))), _react["default"].createElement("div", {
          className: "form-group col-xl-6 col-6"
        }, _react["default"].createElement("h4", {
          className: "col-form-label text-center"
        }, "Funci\xF3n de Variable"), _react["default"].createElement("select", {
          id: "campoFuncion" + i,
          className: "form-control",
          defaultValue: campo.funcion
        }, _react["default"].createElement("option", {
          value: "",
          key: "0"
        }, "Seleccione una funci\xF3n del campo..."), funciones.map(function (campoSelect, k) {
          return _react["default"].createElement("option", {
            value: campoSelect.nombre,
            key: k
          }, campoSelect.nombre);
        })))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "form-group col-xl-6 col-6"
        }, _react["default"].createElement("h4", {
          className: "col-form-label text-center"
        }, "Tipo de Variable"), _react["default"].createElement("select", {
          id: "campoTipo" + i,
          className: "form-control",
          defaultValue: campo.tipo
        }, _react["default"].createElement("option", {
          value: "",
          key: "0"
        }, "Seleccione un tipo de variable..."), campos.map(function (campoSelect, k) {
          return _react["default"].createElement("option", {
            value: campoSelect.nombre,
            key: k
          }, campoSelect.nombre);
        }))), _react["default"].createElement("div", {
          className: "form-group col-xl-6 col-6"
        }, _react["default"].createElement("h4", {
          className: "col-form-label text-center"
        }, "Guardar Campo en Resultados"), _react["default"].createElement("div", {
          className: "switch-button switch-button-yesno",
          style: {
            margin: "0 auto",
            display: "block"
          }
        }, campo.guardar ? _react["default"].createElement("input", {
          type: "checkbox",
          defaultChecked: true,
          name: "campoGuardar" + i,
          id: "campoGuardar" + i
        }) : _react["default"].createElement("input", {
          type: "checkbox",
          name: "campoGuardar" + i,
          id: "campoGuardar" + i
        }), _react["default"].createElement("span", null, _react["default"].createElement("label", {
          htmlFor: "campoGuardar" + i
        }))))), _this6.state.errorModificarCampo.mostrar ? _react["default"].createElement(_ErrorMessage["default"], {
          campo: _this6.state.errorModificarCampo.campo,
          descripcion: _this6.state.errorModificarCampo.descripcion,
          dismissTableError: _this6.dismissFieldEditError
        }, " ") : _react["default"].createElement("span", null), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("button", {
          onClick: function onClick() {
            return _this6.updateFieldsConfirmation(campo.ID, i);
          },
          className: "btn btn-light btn-block col-xl-5 col-5",
          style: {
            margin: "0 auto",
            display: "block"
          }
        }, "Guardar"), _react["default"].createElement("button", {
          onClick: function onClick() {
            return _this6.deleteFieldsConfirmation(campo.ID, i);
          },
          className: "btn btn-light btn-block col-xl-1 col-1",
          style: (_ref = {
            margin: "0 auto",
            display: "block"
          }, _defineProperty(_ref, "display", "flex"), _defineProperty(_ref, "alignItems", "center"), _defineProperty(_ref, "justifyContent", "center"), _ref)
        }, _react["default"].createElement("img", {
          onClick: _this6.props.deleteVariable,
          src: "../assets/trash.png",
          style: {
            height: "20px",
            width: "20px"
          }
        }))))));
      }), this.state.mensajeModal.mostrarMensaje ? _react["default"].createElement(_MessageModal["default"], {
        esError: this.state.mensajeModal.esError,
        esConfirmar: this.state.mensajeModal.esConfirmar,
        dismissMessage: this.dismissMessageModal,
        confirmFunction: this.confirmMessageModal,
        titulo: this.state.mensajeModal.titulo,
        mensaje: this.state.mensajeModal.mensaje
      }, " ") : _react["default"].createElement("span", null));
    }
  }]);

  return ConfiguracionCampos;
}(_react["default"].Component);
/*// 1. Make a shallow copy of the items
let campos = [...this.state.camposDeTabla];
// 2. Make a shallow copy of the item you want to mutate
let campo = [...campos[indexTabla]];
// 3. Replace the property you're intested in
campo[indexCampo] = {ID: campo[indexCampo].ID, idTabla: idTabla, campoNombre: campoNombre, tipoCampo: tipoCampo, guardar: guardarCampo};
// 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
campos[indexTabla] = campo;
// 5. Set the state to our new copy*/


exports["default"] = ConfiguracionCampos;
//# sourceMappingURL=ConfiguracionCampos.js.map
