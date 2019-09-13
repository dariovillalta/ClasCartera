"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Campo = _interopRequireDefault(require("./Regla/Campo.js"));

var _Operacion = _interopRequireDefault(require("./Regla/Operacion.js"));

var _Valor = _interopRequireDefault(require("./Regla/Valor.js"));

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

var CrearFiltro =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CrearFiltro, _React$Component);

  function CrearFiltro(props) {
    var _this;

    _classCallCheck(this, CrearFiltro);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CrearFiltro).call(this, props));
    _this.state = {
      tablaSeleccionada: "clientes",
      colorDeTablaSeleccionada: "#8c9eff"
    };
    _this.cambioClientes = _this.cambioClientes.bind(_assertThisInitialized(_this));
    _this.cambioPrestamos = _this.cambioPrestamos.bind(_assertThisInitialized(_this));
    _this.cambioPagos = _this.cambioPagos.bind(_assertThisInitialized(_this));
    _this.cambioPlanPagos = _this.cambioPlanPagos.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CrearFiltro, [{
    key: "cambioClientes",
    value: function cambioClientes() {
      this.setState({
        tablaSeleccionada: "clientes",
        colorDeTablaSeleccionada: "#8c9eff"
      });
    }
  }, {
    key: "cambioPrestamos",
    value: function cambioPrestamos() {
      this.setState({
        tablaSeleccionada: "prestamos",
        colorDeTablaSeleccionada: "#f8bbd0"
      });
    }
  }, {
    key: "cambioPagos",
    value: function cambioPagos() {
      this.setState({
        tablaSeleccionada: "pagos",
        colorDeTablaSeleccionada: "#e0f7fa"
      });
    }
  }, {
    key: "cambioPlanPagos",
    value: function cambioPlanPagos() {
      this.setState({
        tablaSeleccionada: "planpagos",
        colorDeTablaSeleccionada: "#ffecb3"
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        style: {
          height: "82vh"
        }
      }, _react["default"].createElement("div", {
        className: "row border-top border-bottom",
        style: {
          height: "94%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-4 col-4",
        style: {
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "25%",
          padding: '5%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#8c9eff",
          border: "2px solid #536dfe",
          cursor: "pointer"
        },
        onClick: this.cambioClientes
      }, _react["default"].createElement("div", {
        style: {
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        style: {
          height: "80%",
          margin: '0% 0% 5% 0%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("img", {
        src: "./assets/filter-icons/client.png",
        alt: "",
        style: {
          height: "100%",
          width: "100%"
        }
      })), _react["default"].createElement("div", {
        style: {
          height: "20%"
        }
      }, _react["default"].createElement("h3", {
        className: "product-title",
        style: {
          textAlign: "center"
        }
      }, "Clientes")))), _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "25%",
          padding: '5%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8bbd0",
          border: "2px solid #f50057",
          cursor: "pointer"
        },
        onClick: this.cambioPrestamos
      }, _react["default"].createElement("div", {
        style: {
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        style: {
          height: "80%",
          margin: '0% 0% 5% 0%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("img", {
        src: "./assets/filter-icons/loan.png",
        alt: "",
        style: {
          height: "100%",
          width: "100%"
        }
      })), _react["default"].createElement("div", {
        style: {
          height: "20%"
        }
      }, _react["default"].createElement("h3", {
        className: "product-title",
        style: {
          textAlign: "center"
        }
      }, "Pr\xE9stamos")))), _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "25%",
          padding: '5%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e0f7fa",
          border: "2px solid #4fc3f7",
          cursor: "pointer"
        },
        onClick: this.cambioPagos
      }, _react["default"].createElement("div", {
        style: {
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        style: {
          height: "80%",
          margin: '0% 0% 5% 0%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("img", {
        src: "./assets/filter-icons/pay.png",
        alt: "",
        style: {
          height: "100%",
          width: "100%"
        }
      })), _react["default"].createElement("div", {
        style: {
          height: "20%"
        }
      }, _react["default"].createElement("h3", {
        className: "product-title",
        style: {
          textAlign: "center"
        }
      }, "Pagos")))), _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "25%",
          padding: '5%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffecb3",
          border: "2px solid #ffd740",
          cursor: "pointer"
        },
        onClick: this.cambioPlanPagos
      }, _react["default"].createElement("div", {
        style: {
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        style: {
          height: "80%",
          margin: '0% 0% 5% 0%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("img", {
        src: "./assets/filter-icons/payplan.png",
        alt: "",
        style: {
          height: "100%",
          width: "100%"
        }
      })), _react["default"].createElement("div", {
        style: {
          height: "20%"
        }
      }, _react["default"].createElement("h3", {
        className: "product-title",
        style: {
          textAlign: "center"
        }
      }, "Plan de Pagos"))))), _react["default"].createElement("div", {
        className: "col-xl-8 col-8",
        style: {
          height: "100%",
          backgroundColor: this.state.colorDeTablaSeleccionada
        }
      }, _react["default"].createElement("br", null), _react["default"].createElement(_Campo["default"], {
        esNumero: true,
        esBoolean: false,
        esFecha: false,
        esTexto: false,
        campos: []
      }, " "), _react["default"].createElement(_Operacion["default"], {
        esNumero: true,
        esBoolean: false,
        esFecha: false,
        esTexto: false
      }, " "), _react["default"].createElement(_Valor["default"], {
        esNumero: true,
        esBoolean: false,
        esFecha: false,
        esTexto: false,
        campos: [],
        pool: this.props.pool
      }, " "))), _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "6%",
          padding: "1% 0%"
        },
        className: "text-center"
      }, _react["default"].createElement("a", {
        onClick: this.props.callbackComponent,
        className: "btn btn-primary col-xs-6 col-6",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold"
        }
      }, "Filtrar")));
    }
  }]);

  return CrearFiltro;
}(_react["default"].Component);

exports["default"] = CrearFiltro;
//# sourceMappingURL=CrearFiltro.js.map
