"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _FilterCampo = _interopRequireDefault(require("./FilterCampo.js"));

var _FilterOperacion = _interopRequireDefault(require("./FilterOperacion.js"));

var _FilterValor = _interopRequireDefault(require("./FilterValor.js"));

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

var FilterVariableCreation =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FilterVariableCreation, _React$Component);

  function FilterVariableCreation(props) {
    var _this;

    _classCallCheck(this, FilterVariableCreation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FilterVariableCreation).call(this, props));
    _this.state = {
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
    _this.saveFilter = _this.saveFilter.bind(_assertThisInitialized(_this));
    _this.dismissReglaNewError = _this.dismissReglaNewError.bind(_assertThisInitialized(_this));
    _this.showSuccesMessage = _this.showSuccesMessage.bind(_assertThisInitialized(_this));
    _this.dismissMessageModal = _this.dismissMessageModal.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FilterVariableCreation, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "saveFilter",
    value: function saveFilter() {
      var campo = this.props.campos[$("#campo").val()].nombre;
      var operacion = $("input[name='operacionRadio']:checked").val();
      var operacionTexto;

      if ($("#igualBoolean").is(":checked")) {
        operacionTexto = "es igual";
      } else if ($("#menorNumFecha").is(":checked")) {
        operacionTexto = "es menor";
      } else if ($("#menorIgualNumFecha").is(":checked")) {
        operacionTexto = "es menor o igual";
      } else if ($("#mayorIgualNumFecha").is(":checked")) {
        operacionTexto = "es mayor o igual";
      } else if ($("#mayorNumFecha").is(":checked")) {
        operacionTexto = "es mayor";
      } else if ($("#igualNumFecha").is(":checked")) {
        operacionTexto = "es igual";
      } else if ($("#noIgualNumFecha").is(":checked")) {
        operacionTexto = "no es igual";
      } else if ($("#igualTexto").is(":checked")) {
        operacionTexto = "es igual";
      } else if ($("#noIgualTexto").is(":checked")) {
        operacionTexto = "no es igual";
      }

      var valor = $("#camposDeLista").val();
      var tipo = this.props.campos[$("#campo").val()].tipo;

      if (campo.length > 0) {
        if (operacion.length > 0) {
          if (valor.length > 0) {
            var resultados = [];

            if (this.props.tipoCampo.esNumero) {
              for (var i = 0; i < valor.length; i++) {
                resultados.push({
                  texto: campo + " " + operacionTexto + " " + valor[i],
                  filtro: "(nombre = '" + campo + "' and valor " + operacion + " " + valor[i] + ")",
                  tipo: tipo
                });
              }

              ;
            } else if (this.props.tipoCampo.esBoolean) {
              for (var i = 0; i < valor.length; i++) {
                resultados.push({
                  texto: campo + " " + operacionTexto + " " + valor[i],
                  filtro: "(nombre = '" + campo + "' and valor " + operacion + " '" + valor[i] + "')",
                  tipo: tipo
                });
              }

              ;
            } else if (this.props.tipoCampo.esFecha) {
              for (var i = 0; i < valor.length; i++) {
                resultados.push({
                  texto: campo + " " + operacionTexto + " " + valor[i],
                  filtro: "(nombre = '" + campo + "' and valor " + operacion + " '" + valor[i] + "')",
                  tipo: tipo
                });
              }

              ;
            } else if (this.props.tipoCampo.esTexto) {
              for (var i = 0; i < valor.length; i++) {
                resultados.push({
                  texto: campo + " " + operacionTexto + " " + valor[i],
                  filtro: "(nombre = '" + campo + "' and valor " + operacion + " '" + valor[i] + "')",
                  tipo: tipo
                });
              }

              ;
            }

            this.props.insertFilter(resultados);
          } else {
            alert("El tamano del valor debe ser mayor a 0.");
          }
        } else {
          alert("El tamano de la operacion debe ser mayor a 0.");
        }
      } else {
        alert("El tamano del campo debe ser mayor a 0.");
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
      return _react["default"].createElement("div", null, _react["default"].createElement(_FilterCampo["default"], {
        esNumero: this.props.esNumero,
        esBoolean: this.props.esBoolean,
        esFecha: this.props.esFecha,
        esTexto: this.props.esTexto,
        campos: this.props.campos,
        bordeDeTablaSeleccionada: this.props.bordeDeTablaSeleccionada
      }, " "), _react["default"].createElement(_FilterOperacion["default"], {
        esNumero: this.props.tipoCampo.esNumero,
        esBoolean: this.props.tipoCampo.esBoolean,
        esFecha: this.props.tipoCampo.esFecha,
        esTexto: this.props.tipoCampo.esTexto,
        bordeDeTablaSeleccionada: this.props.bordeDeTablaSeleccionada
      }, " "), _react["default"].createElement(_FilterValor["default"], {
        esNumero: this.props.tipoCampo.esNumero,
        esBoolean: this.props.tipoCampo.esBoolean,
        esFecha: this.props.tipoCampo.esFecha,
        esTexto: this.props.tipoCampo.esTexto,
        campos: this.props.campos,
        bordeDeTablaSeleccionada: this.props.bordeDeTablaSeleccionada,
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
        onClick: this.saveFilter,
        className: "btn btn-primary col-xs-6 col-6",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold"
        }
      }, "Guardar")), _react["default"].createElement("br", null));
    }
  }]);

  return FilterVariableCreation;
}(_react["default"].Component);

exports["default"] = FilterVariableCreation;
//# sourceMappingURL=FilterVariableCreation.js.map
