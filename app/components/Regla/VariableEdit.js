"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _Campo = _interopRequireDefault(require("./Campo.js"));

var _Operacion = _interopRequireDefault(require("./Operacion.js"));

var _Valor = _interopRequireDefault(require("./Valor.js"));

var _ErrorMessage = _interopRequireDefault(require("../ErrorMessage.js"));

var _MessageModal = _interopRequireDefault(require("../MessageModal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var VariableEdit =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VariableEdit, _React$Component);

  function VariableEdit(props) {
    var _this;

    _classCallCheck(this, VariableEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VariableEdit).call(this, props));
    _this.state = {
      tipoCampo: {
        esNumero: true,
        esBoolean: false,
        esFecha: false,
        esTexto: false,
        esGranDeudor: false,
        esPequenoDeudor: false
      },
      errorCreacionRegla: {
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
        mensaje: ""
      },
      campos: []
    };
    _this.esNumero = _this.esNumero.bind(_assertThisInitialized(_this));
    _this.esBoolean = _this.esBoolean.bind(_assertThisInitialized(_this));
    _this.esFecha = _this.esFecha.bind(_assertThisInitialized(_this));
    _this.esTexto = _this.esTexto.bind(_assertThisInitialized(_this));
    _this.loadFields = _this.loadFields.bind(_assertThisInitialized(_this));
    _this.saveRule = _this.saveRule.bind(_assertThisInitialized(_this));
    _this.dismissReglaNewError = _this.dismissReglaNewError.bind(_assertThisInitialized(_this));
    _this.showSuccesMessage = _this.showSuccesMessage.bind(_assertThisInitialized(_this));
    _this.dismissMessageModal = _this.dismissMessageModal.bind(_assertThisInitialized(_this));
    _this.esGranDeudor = _this.esGranDeudor.bind(_assertThisInitialized(_this));
    _this.esPequenoDeudor = _this.esPequenoDeudor.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(VariableEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadFields();
    }
  }, {
    key: "esNumero",
    value: function esNumero() {
      this.setState({
        tipoCampo: {
          esNumero: true,
          esBoolean: false,
          esFecha: false,
          esTexto: false,
          esGranDeudor: false,
          esPequenoDeudor: false
        }
      });
    }
  }, {
    key: "esBoolean",
    value: function esBoolean() {
      this.setState({
        tipoCampo: {
          esNumero: false,
          esBoolean: true,
          esFecha: false,
          esTexto: false,
          esGranDeudor: false,
          esPequenoDeudor: false
        }
      });
    }
  }, {
    key: "esFecha",
    value: function esFecha() {
      this.setState({
        tipoCampo: {
          esNumero: false,
          esBoolean: false,
          esFecha: true,
          esTexto: false,
          esGranDeudor: false,
          esPequenoDeudor: false
        }
      });
    }
  }, {
    key: "esTexto",
    value: function esTexto() {
      this.setState({
        tipoCampo: {
          esNumero: false,
          esBoolean: false,
          esFecha: false,
          esTexto: true,
          esGranDeudor: false,
          esPequenoDeudor: false
        }
      });
    }
  }, {
    key: "esGranDeudor",
    value: function esGranDeudor() {
      this.setState({
        tipoCampo: {
          esNumero: false,
          esBoolean: false,
          esFecha: false,
          esTexto: false,
          esGranDeudor: true,
          esPequenoDeudor: false
        }
      });
    }
  }, {
    key: "esPequenoDeudor",
    value: function esPequenoDeudor() {
      this.setState({
        tipoCampo: {
          esNumero: false,
          esBoolean: false,
          esFecha: false,
          esTexto: false,
          esGranDeudor: false,
          esPequenoDeudor: true
        }
      });
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
        request.query("select * from Campos where tabla = 'Cliente' or tabla = 'Préstamo'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              var temp = [];

              for (var i = 0; i < result.recordset.length; i++) {
                var existe = false;

                for (var j = 0; j < temp.length; j++) {
                  if (temp[j].nombre.localeCompare(result.recordset[i].nombre) == 0) {
                    existe = true;
                    break;
                  }
                }

                ;

                if (existe == false) {
                  temp.push(result.recordset[i]);
                }
              }

              ;

              _this2.setState({
                campos: temp
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "saveRule",
    value: function saveRule() {
      var _this3 = this;

      /*console.log("retorno")
      console.log( $("input[name='operacionRadio']:checked").val() )
      let listaID = $("#selectLista").val();
      console.log("listaID = "+listaID)*/
      var seleccionCampoIDSelect = $("#campo").val();

      if (seleccionCampoIDSelect.length > 0) {
        var campoTablaID;
        var campoID;
        var campoTipo;
        var operacion;
        var operacionTipo;
        var valorLista; //ID Tabla

        var valorCampos;
        var esListaValor, esCampoValor;
        var texto;

        if (seleccionCampoIDSelect.localeCompare("M0ra") != 0 && seleccionCampoIDSelect.localeCompare("Gr4nDeud0r") != 0 && seleccionCampoIDSelect.localeCompare("P3quDeud0r") != 0) {
          campoTablaID = this.state.campos[seleccionCampoIDSelect].tablaID;
          campoID = this.state.campos[seleccionCampoIDSelect].ID;
          campoTipo = this.state.campos[seleccionCampoIDSelect].tipo;
          operacion = $("input[name='operacionRadio']:checked").val();
          operacionTipo;
          if (operacion != undefined && (operacion.localeCompare("<") == 0 || operacion.localeCompare("<=") == 0 || operacion.localeCompare(">") == 0 || operacion.localeCompare(">=") == 0 || operacion.localeCompare("==") == 0 || operacion.localeCompare("!=") == 0)) operacionTipo = "relacional";else if (operacion != undefined && (operacion.localeCompare("+") == 0 || operacion.localeCompare("-") == 0 || operacion.localeCompare("*") == 0 || operacion.localeCompare("/") == 0)) operacionTipo = "algebraica";else if (operacion != undefined && (operacion.localeCompare("sumIf") == 0 || operacion.localeCompare("sumIfNot") == 0)) operacionTipo = "excel";
          valorLista = $("#selectLista").val(); //ID Tabla

          valorCampos = $("#camposDeLista").val();
          esListaValor, esCampoValor;

          if (valorLista != undefined && valorLista.localeCompare("table") == 0) {
            esListaValor = false;
            esCampoValor = true;
            valorLista = this.props.tablaID;
          } else if (valorLista != undefined && valorLista.length > 0) {
            esListaValor = true;
            esCampoValor = false;
          }

          var operacionTexto;

          if (operacion.localeCompare("==") == 0) {
            operacionTexto = "es igual";
          } else if (operacion.localeCompare("<") == 0) {
            operacionTexto = "es menor";
          } else if (operacion.localeCompare("<=") == 0) {
            operacionTexto = "es menor o igual";
          } else if (operacion.localeCompare(">=") == 0) {
            operacionTexto = "es mayor o igual";
          } else if (operacion.localeCompare(">") == 0) {
            operacionTexto = "es mayor";
          } else if (operacion.localeCompare("!=") == 0) {
            operacionTexto = "no es igual";
          }

          texto = this.state.campos[seleccionCampoIDSelect].nombre + " " + operacionTexto + " ";
        } else if (seleccionCampoIDSelect.localeCompare("M0ra") == 0) {
          campoTablaID = -1;
          campoID = -1;
          campoTipo = "int";
          operacion = $("input[name='operacionRadio']:checked").val();
          operacionTipo;
          if (operacion != undefined && (operacion.localeCompare("<") == 0 || operacion.localeCompare("<=") == 0 || operacion.localeCompare(">") == 0 || operacion.localeCompare(">=") == 0 || operacion.localeCompare("==") == 0 || operacion.localeCompare("!=") == 0)) operacionTipo = "relacional";else if (operacion != undefined && (operacion.localeCompare("+") == 0 || operacion.localeCompare("-") == 0 || operacion.localeCompare("*") == 0 || operacion.localeCompare("/") == 0)) operacionTipo = "algebraica";else if (operacion != undefined && (operacion.localeCompare("sumIf") == 0 || operacion.localeCompare("sumIfNot") == 0)) operacionTipo = "excel";
          valorLista = $("#selectLista").val(); //ID Tabla

          valorCampos = $("#camposDeLista").val();
          esListaValor, esCampoValor;

          if (valorLista != undefined && valorLista.localeCompare("table") == 0) {
            esListaValor = false;
            esCampoValor = true;
            valorLista = this.props.tablaID;
          } else if (valorLista != undefined && valorLista.length > 0) {
            esListaValor = true;
            esCampoValor = false;
          }

          var _operacionTexto;

          if (operacion.localeCompare("==") == 0) {
            _operacionTexto = "es igual";
          } else if (operacion.localeCompare("<") == 0) {
            _operacionTexto = "es menor";
          } else if (operacion.localeCompare("<=") == 0) {
            _operacionTexto = "es menor o igual";
          } else if (operacion.localeCompare(">=") == 0) {
            _operacionTexto = "es mayor o igual";
          } else if (operacion.localeCompare(">") == 0) {
            _operacionTexto = "es mayor";
          } else if (operacion.localeCompare("!=") == 0) {
            _operacionTexto = "no es igual";
          }

          texto = "Mora " + _operacionTexto + " ";
        } else if (seleccionCampoIDSelect.localeCompare("Gr4nDeud0r") == 0) {
          campoTablaID = -2;
          campoID = -2;
          campoTipo = "varchar";
          operacion = $("input[name='operacionRadio']:checked").val();
          operacionTipo;
          if (operacion != undefined && (operacion.localeCompare("<") == 0 || operacion.localeCompare("<=") == 0 || operacion.localeCompare(">") == 0 || operacion.localeCompare(">=") == 0 || operacion.localeCompare("==") == 0 || operacion.localeCompare("!=") == 0)) operacionTipo = "relacional";else if (operacion != undefined && (operacion.localeCompare("+") == 0 || operacion.localeCompare("-") == 0 || operacion.localeCompare("*") == 0 || operacion.localeCompare("/") == 0)) operacionTipo = "algebraica";else if (operacion != undefined && (operacion.localeCompare("sumIf") == 0 || operacion.localeCompare("sumIfNot") == 0)) operacionTipo = "excel";
          valorLista = "CAPITALMINIMO=" + $("#capitalMinimo").val() + ",TIEMPOMINIMO=" + $("#tiempoMinimo").val() + ",PORCENTAJEMINIMO=" + $("#porcentajeMinimo").val(); //ID Tabla

          valorCampos = $("#camposDeLista").val();
          esListaValor, esCampoValor;

          if (valorLista != undefined && valorLista.localeCompare("table") == 0) {
            esListaValor = false;
            esCampoValor = true;
            valorLista = this.props.tablaID;
          } else if (valorLista != undefined && valorLista.length > 0) {
            esListaValor = true;
            esCampoValor = false;
          }

          texto = "Es Gran Deudor Comercial";
        }

        console.log("//////////////////////");
        console.log("//////////////////////");
        console.log("campoTablaID = " + campoTablaID);
        console.log("campoID = " + campoID);
        console.log("campoTipo = " + campoTipo);
        console.log("operacion = " + operacion);
        console.log("operacionTipo = " + operacionTipo);
        console.log("valorLista = " + valorLista);
        console.log("valorCampos = " + valorCampos);
        console.log("esListaValor = " + esListaValor);
        console.log("esCampoValor = " + esCampoValor);
        console.log("+++++++++++++++++++++++");
        console.log("+++++++++++++++++++++++");

        if (!isNaN(campoTablaID) && campoTablaID.toString().length > 0) {
          if (!isNaN(campoID) && campoID.toString().length > 0) {
            if (isNaN(campoTipo) && campoTipo.length > 0) {
              if (operacion != undefined && isNaN(operacion) && operacion.length > 0) {
                if (isNaN(operacionTipo) && operacionTipo.length > 0) {
                  if (valorLista != undefined &&
                  /*!isNaN(valorLista) ||*/
                  valorLista.toString().length > 0) {
                    if (valorCampos.length > 0 && valorCampos.length < 1001) {
                      if (esListaValor != undefined) {
                        if (esCampoValor != undefined) {
                          this.setState({
                            errorCreacionRegla: {
                              campo: '',
                              descripcion: '',
                              mostrar: false
                            }
                          });
                          var tablaNombreValor = 'VariablesdeLista';
                          if (esCampoValor) tablaNombreValor = 'Campos';
                          var textoABuscar = '';

                          for (var i = 0; i < valorCampos.length; i++) {
                            if (textoABuscar.length == 0) {
                              textoABuscar += ' where ID = ' + valorCampos[i];
                            } else {
                              textoABuscar += ' or ID = ' + valorCampos[i];
                            }
                          }

                          ;
                          var transaction = new _mssql["default"].Transaction(this.props.pool);
                          transaction.begin(function (err) {
                            var rolledBack = false;
                            transaction.on('rollback', function (aborted) {
                              rolledBack = true;
                            });
                            var request = new _mssql["default"].Request(transaction);
                            request.query("select * from " + tablaNombreValor + textoABuscar, function (err, result) {
                              if (err) {
                                if (!rolledBack) {
                                  console.log(err);
                                  transaction.rollback(function (err) {});
                                }
                              } else {
                                transaction.commit(function (err) {
                                  for (var i = 0; i < result.recordset.length; i++) {
                                    if (esCampoValor) {
                                      if (i == 0) texto += result.recordset[i].nombre;else texto += ", " + result.recordset[i].nombre;
                                    } else {
                                      if (i == 0) texto += result.recordset[i].valor;else texto += ", " + result.recordset[i].valor;
                                    }
                                  }

                                  ;
                                  var transaction1 = new _mssql["default"].Transaction(_this3.props.pool);
                                  transaction1.begin(function (err) {
                                    var rolledBack = false;
                                    transaction1.on('rollback', function (aborted) {
                                      rolledBack = true;
                                    });
                                    var request1 = new _mssql["default"].Request(transaction1);
                                    request1.query("update Reglas set campoTablaID = " + campoTablaID + ", campoCampoID = " + campoID + ", campoTipo = '" + campoTipo + "', operacion = '" + operacion + "', tipoOperacion = '" + operacionTipo + "', valor = '" + valorCampos + "', valorTipo = '', esListaValor = '" + esListaValor + "', esCampoValor = '" + esCampoValor + "', valorTablaID = " + valorLista + ", texto = '" + texto + "', nombreTablaRes = '" + _this3.props.tipoTablaRes + "', idTipoTabla = " + _this3.props.idTipoTabla + " where ID = " + _this3.props.reglaSeleccionada.ID, function (err, result) {
                                      if (err) {
                                        if (!rolledBack) {
                                          console.log(err);
                                          transaction1.rollback(function (err) {});
                                        }
                                      } else {
                                        transaction1.commit(function (err) {
                                          _this3.showSuccesMessage("Exito", "Regla creada con éxito.");
                                        });
                                      }
                                    });
                                  }); // fin transaction1
                                });
                              }
                            });
                          }); // fin transaction
                        } else {
                          var campo = "Es Campo en Valor";
                          var descripcionN;
                          if (esCampoValor != undefined) descripcionN = "El valor debe existir.";
                          this.setState({
                            errorCreacionRegla: {
                              campo: campo,
                              descripcion: descripcionN,
                              mostrar: true
                            }
                          });
                        }
                      } else {
                        var _campo = "Es Lista en Valor";

                        var _descripcionN;

                        if (esListaValor != undefined) _descripcionN = "El valor debe existir.";
                        this.setState({
                          errorCreacionRegla: {
                            campo: _campo,
                            descripcion: _descripcionN,
                            mostrar: true
                          }
                        });
                      }
                    } else {
                      var _campo2 = "Valor";

                      var _descripcionN2;

                      if (valorCampos.length == 0) _descripcionN2 = "El valor debe tener una longitud mayor a 0.";else if (valorCampos.length < 1001) _descripcionN2 = "El valor debe tener una longitud menor a 1001.";
                      this.setState({
                        errorCreacionRegla: {
                          campo: _campo2,
                          descripcion: _descripcionN2,
                          mostrar: true
                        }
                      });
                    }
                  } else {
                    var _campo3 = "ID de Tabla de Valor";

                    var _descripcionN3;

                    if (valorLista == undefined) _descripcionN3 = "Seleccione un valor para el ID de la tabla del campo de valor.";else if (valorLista.toString().length == 0) _descripcionN3 = "El valor debe tener una longitud mayor a 0.";
                    this.setState({
                      errorCreacionRegla: {
                        campo: _campo3,
                        descripcion: _descripcionN3,
                        mostrar: true
                      }
                    });
                  }
                } else {
                  var _campo4 = "Tipo de Operación";

                  var _descripcionN4;

                  if (isNaN(operacionTipo)) _descripcionN4 = "El tipo de operación no puede ser un número.";else _descripcionN4 = "El tipo de operación debe tener una longitud mayor a 0.";
                  this.setState({
                    errorCreacionRegla: {
                      campo: _campo4,
                      descripcion: _descripcionN4,
                      mostrar: true
                    }
                  });
                }
              } else {
                var _campo5 = "Operación";

                var _descripcionN5;

                if (operacion == undefined) _descripcionN5 = "Seleccione un valor de operación.";else if (isNaN(operacion)) _descripcionN5 = "La operación no puede ser un número.";else _descripcionN5 = "La operación debe tener una longitud mayor a 0.";
                this.setState({
                  errorCreacionRegla: {
                    campo: _campo5,
                    descripcion: _descripcionN5,
                    mostrar: true
                  }
                });
              }
            } else {
              var _campo6 = "Tipo de Campo";
              var _descripcionN6 = "El ID del campo debe ser un valor numérico.";
              this.setState({
                errorCreacionRegla: {
                  campo: _campo6,
                  descripcion: _descripcionN6,
                  mostrar: true
                }
              });
            }
          } else {
            var _campo7 = "ID de Campo de Campo";

            var _descripcionN7;

            if (campoID.toString().length == 0) _descripcionN7 = "El ID de campo debe tener una longitud mayor a 0.";else if (isNaN(campoID)) _descripcionN7 = "El ID de campo debe ser un valor numérico.";
            this.setState({
              errorCreacionRegla: {
                campo: _campo7,
                descripcion: _descripcionN7,
                mostrar: true
              }
            });
          }
        } else {
          var _campo8 = "ID de Tabla de Campo";

          var _descripcionN8;

          if (campoTablaID.toString().length == 0) _descripcionN8 = "El ID de tabla de campo debe tener una longitud mayor a 0.";else if (isNaN(campoTablaID)) _descripcionN8 = "El ID de tabla de campo debe ser un valor numérico.";
          this.setState({
            errorCreacionRegla: {
              campo: _campo8,
              descripcion: _descripcionN8,
              mostrar: true
            }
          });
        }
      } else {
        var _campo9 = "ID de Tabla de Campo";
        var _descripcionN9 = "Seleccione un valor para el ID de la tabla del campo.";
        this.setState({
          errorCreacionRegla: {
            campo: _campo9,
            descripcion: _descripcionN9,
            mostrar: true
          }
        });
      }
    }
  }, {
    key: "dismissReglaNewError",
    value: function dismissReglaNewError() {
      this.setState({
        errorCreacionRegla: {
          campo: "",
          descripcion: "",
          mostrar: false
        }
      });
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
          mensaje: mensaje
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
            mensaje: ""
          }
        });
      }, 850);
    }
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
          mensaje: ""
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement(_Campo["default"], {
        esNumero: this.esNumero,
        esBoolean: this.esBoolean,
        esFecha: this.esFecha,
        esTexto: this.esTexto,
        campos: this.state.campos,
        esGranDeudor: this.esGranDeudor,
        esPequenoDeudor: this.esPequenoDeudor
      }, " "), _react["default"].createElement(_Operacion["default"], {
        esNumero: this.state.tipoCampo.esNumero,
        esBoolean: this.state.tipoCampo.esBoolean,
        esFecha: this.state.tipoCampo.esFecha,
        esTexto: this.state.tipoCampo.esTexto,
        esGranDeudor: this.state.tipoCampo.esGranDeudor,
        esPequenoDeudor: this.state.tipoCampo.esPequenoDeudor
      }, " "), _react["default"].createElement(_Valor["default"], {
        esNumero: this.state.tipoCampo.esNumero,
        esBoolean: this.state.tipoCampo.esBoolean,
        esFecha: this.state.tipoCampo.esFecha,
        esTexto: this.state.tipoCampo.esTexto,
        campos: this.state.campos,
        esGranDeudor: this.state.tipoCampo.esGranDeudor,
        esPequenoDeudor: this.state.tipoCampo.esPequenoDeudor,
        pool: this.props.pool
      }, " "), this.state.errorCreacionRegla.mostrar ? _react["default"].createElement(_ErrorMessage["default"], {
        campo: this.state.errorCreacionRegla.campo,
        descripcion: this.state.errorCreacionRegla.descripcion,
        dismissTableError: this.dismissReglaNewError
      }, " ") : _react["default"].createElement("span", null), this.state.mensajeModal.mostrarMensaje ? _react["default"].createElement(_MessageModal["default"], {
        esError: this.state.mensajeModal.esError,
        esConfirmar: this.state.mensajeModal.esConfirmar,
        dismissMessage: this.dismissMessageModal,
        confirmFunction: this.confirmMessageModal,
        titulo: this.state.mensajeModal.titulo,
        mensaje: this.state.mensajeModal.mensaje
      }, " ") : _react["default"].createElement("span", null), _react["default"].createElement("div", {
        className: "text-center"
      }, _react["default"].createElement("a", {
        onClick: this.saveRule,
        className: "btn btn-primary col-xs-6 col-6",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold"
        }
      }, "Guardar")), _react["default"].createElement("br", null));
    }
  }]);

  return VariableEdit;
}(_react["default"].Component);

exports["default"] = VariableEdit;
//# sourceMappingURL=VariableEdit.js.map
