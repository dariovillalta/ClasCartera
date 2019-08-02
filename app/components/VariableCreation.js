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

var _MessageModal = _interopRequireDefault(require("./MessageModal.js"));

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

var VariableCreation =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VariableCreation, _React$Component);

  function VariableCreation(props) {
    var _this;

    _classCallCheck(this, VariableCreation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VariableCreation).call(this, props));
    _this.state = {
      tipoCampo: {
        esNumero: true,
        esBoolean: false,
        esFecha: false,
        esTexto: false
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
    return _this;
  }

  _createClass(VariableCreation, [{
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
          esTexto: false
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
          esTexto: false
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
          esTexto: false
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
          esTexto: true
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
        request.query("select * from Campos where tablaID = " + _this2.props.tablaID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
              return [];
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                campos: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "saveRule",
    value: function saveRule() {
      /*console.log("retorno")
      console.log( $("input[name='operacionRadio']:checked").val() )
      let listaID = $("#selectLista").val();
      console.log("listaID = "+listaID)*/
      var campoTablaID = this.props.tablaID;
      var campoID = this.state.campos[$("#campo").val()].ID;
      var campoTipo = this.state.campos[$("#campo").val()].tipo;
      var operacion = $("input[name='operacionRadio']:checked").val();
      var operacionTipo;
      if (operacion.localeCompare("<") == 0 || operacion.localeCompare("<=") == 0 || operacion.localeCompare(">") == 0 || operacion.localeCompare(">=") == 0 || operacion.localeCompare("==") == 0 || operacion.localeCompare("!=") == 0) operacionTipo = "relacional";else if (operacion.localeCompare("+") == 0 || operacion.localeCompare("-") == 0 || operacion.localeCompare("*") == 0 || operacion.localeCompare("/") == 0) operacionTipo = "algebraica";else if (operacion.localeCompare("sumIf") == 0 || operacion.localeCompare("sumIfNot") == 0) operacionTipo = "excel";
      var valorLista = $("#selectLista").val();
      var valorCampos = $("#camposDeLista").val();
      var esListaValor, esCampoValor;

      if (valorLista.localeCompare("table") == 0) {
        esListaValor = false;
        esCampoValor = true;
      } else {
        esListaValor = true;
        esCampoValor = false;
      }

      console.log("campoTablaID = " + campoTablaID);
      console.log("campoID = " + campoID);
      console.log("campoTipo = " + campoTipo);
      console.log("operacion = " + operacion);
      console.log("operacionTipo = " + operacionTipo);
      console.log("valorLista = " + valorLista);
      console.log("valorCampos = " + valorCampos);
      console.log("esListaValor = " + esListaValor);
      console.log("esCampoValor = " + esCampoValor);
      console.log("valorTablaID = " + valorTablaID);

      if (!isNaN(campoTablaID)) {
        if (!isNaN(campoID)) {
          if (isNaN(campoTipo) && campoTipo.length > 0) {
            if (isNaN(operacion) && operacion.length > 0) {
              if (isNaN(operacionTipo) && operacionTipo.length > 0) {
                if (!isNaN(valorLista) || valorLista.length > 0) {
                  if (valorCampos.length > 0) {
                    if (esListaValor != undefined) {
                      if (esCampoValor != undefined) {
                        this.showSuccesMessage("Exito", "Regla creada con éxito.");
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

                    if (valorCampos.length > 0) _descripcionN2 = "El valor debe tener una longitud mayor a 0.";
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

                  if (!isNaN(valorLista)) _descripcionN3 = "El valor no puede ser un número.";
                  if (valorLista.length > 0) _descripcionN3 = "El valor debe tener una longitud mayor a 0.";
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

              if (isNaN(operacion)) _descripcionN5 = "La operación no puede ser un número.";else _descripcionN5 = "La operación debe tener una longitud mayor a 0.";
              this.setState({
                errorCreacionRegla: {
                  campo: _campo5,
                  descripcion: _descripcionN5,
                  mostrar: true
                }
              });
            }
          } else {
            var _campo6 = "ID del Campo";
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
          var _campo7 = "ID de Tabla de Campo";
          var _descripcionN7 = "El ID de tabla de campo debe ser un valor numérico.";
          this.setState({
            errorCreacionRegla: {
              campo: _campo7,
              descripcion: _descripcionN7,
              mostrar: true
            }
          });
        }
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
        campos: this.state.campos
      }, " "), _react["default"].createElement(_Operacion["default"], {
        esNumero: this.state.tipoCampo.esNumero,
        esBoolean: this.state.tipoCampo.esBoolean,
        esFecha: this.state.tipoCampo.esFecha,
        esTexto: this.state.tipoCampo.esTexto
      }, " "), _react["default"].createElement(_Valor["default"], {
        esNumero: this.state.tipoCampo.esNumero,
        esBoolean: this.state.tipoCampo.esBoolean,
        esFecha: this.state.tipoCampo.esFecha,
        esTexto: this.state.tipoCampo.esTexto,
        campos: this.state.campos
      }, " "), this.state.errorCreacionRegla.mostrar ? _react["default"].createElement(ErrorMessage, {
        campo: this.state.errorCreacionTipoCredito.campo,
        descripcion: this.state.errorCreacionTipoCredito.descripcion,
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

  return VariableCreation;
}(_react["default"].Component);

exports["default"] = VariableCreation;
//# sourceMappingURL=VariableCreation.js.map
