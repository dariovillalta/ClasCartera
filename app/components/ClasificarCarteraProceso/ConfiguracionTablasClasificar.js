"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _OpcionConfiguracionTablasClasificar = _interopRequireDefault(require("./OpcionConfiguracionTablasClasificar.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ConfiguracionTablasClasificar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ConfiguracionTablasClasificar, _React$Component);

  function ConfiguracionTablasClasificar(props) {
    _classCallCheck(this, ConfiguracionTablasClasificar);

    return _possibleConstructorReturn(this, _getPrototypeOf(ConfiguracionTablasClasificar).call(this, props));
  }

  _createClass(ConfiguracionTablasClasificar, [{
    key: "render",
    value: function render() {
      var _this = this;

      var color = [{
        colorBorde: "#c5cae9"
      }, {
        colorBorde: "#f8bbd0"
      }, {
        colorBorde: "#b2ebf2"
      }, {
        colorBorde: "#c8e6c9"
      }, {
        colorBorde: "#fff9c4"
      }, {
        colorBorde: "#ffcdd2"
      }, {
        colorBorde: "#eeeeee"
      }];
      return _react["default"].createElement("div", {
        style: {
          height: "100%",
          overflowX: "scroll",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          borderRadius: "5px",
          padding: "1% 0%"
        }
      }, this.props.tablasSeleccionadas.map(function (tabla, i) {
        return _react["default"].createElement("div", {
          key: i,
          style: {
            height: "100%",
            width: _this.props.widthActual,
            display: "inline-block",
            backgroundColor: color[i % color.length].colorBorde,
            position: "relative"
          }
        }, _react["default"].createElement("div", {
          style: {
            height: "95%",
            width: "95%",
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "5px",
            overflowY: "scroll"
          }
        }, _react["default"].createElement("div", {
          className: "text-center",
          style: {
            borderBottom: "solid 4px #cfd8dc"
          }
        }, _react["default"].createElement("h3", null, "Criterios de Clasificaci\xF3n")), _react["default"].createElement("div", {
          style: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "solid 3px #eceff1"
          }
        }, _react["default"].createElement("div", {
          style: {
            width: "90%",
            height: "60%",
            textAlign: "center",
            display: "table"
          }
        }, _react["default"].createElement("h5", {
          style: {
            display: "table-cell",
            verticalAlign: "middle"
          }
        }, "Capacidad de Pago"))), _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "25%"
          }
        }, _react["default"].createElement(_OpcionConfiguracionTablasClasificar["default"], {
          id: "CapacidadPago" + i,
          campos: [],
          nombre: "Analisis Financiero"
        }, " ")), _react["default"].createElement("div", {
          style: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 3px #eceff1"
          }
        }, _react["default"].createElement("div", {
          style: {
            width: "90%",
            height: "60%",
            textAlign: "center",
            display: "table"
          }
        }, _react["default"].createElement("h5", {
          style: {
            display: "table-cell",
            verticalAlign: "middle"
          }
        }, "Comportamiento de Pago"))), _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "25%",
            overflowY: "scroll"
          }
        }, _this.props.opcionesTabla[i] != undefined ? _react["default"].createElement(_OpcionConfiguracionTablasClasificar["default"], {
          id: "ComportamientoPago" + i,
          campos: _this.props.opcionesTabla[i].tipoCredito,
          nombre: _this.props.opcionesTabla[i].tipoCreditoNombre
        }, " ") : _react["default"].createElement("span", null)), _react["default"].createElement("div", {
          className: "text-center",
          style: {
            borderBottom: "solid 4px #cfd8dc",
            borderTop: "solid 4px #cfd8dc"
          }
        }, _react["default"].createElement("h3", null, "Tipo de Cr\xE9dito")), _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "25%",
            overflowY: "scroll"
          }
        }, _this.props.opcionesTabla[i] != undefined ? _react["default"].createElement(_OpcionConfiguracionTablasClasificar["default"], {
          id: "tipoCredito" + i,
          campos: _this.props.opcionesTabla[i].tipoCredito,
          nombre: _this.props.opcionesTabla[i].tipoCreditoNombre
        }, " ") : _react["default"].createElement("span", null)), _react["default"].createElement("div", {
          className: "text-center",
          style: {
            borderBottom: "solid 4px #cfd8dc",
            borderTop: "solid 4px #cfd8dc"
          }
        }, _react["default"].createElement("h3", null, "Categorias de Clasificaci\xF3n"))));
      }));
    }
  }]);

  return ConfiguracionTablasClasificar;
}(_react["default"].Component);

exports["default"] = ConfiguracionTablasClasificar;
//# sourceMappingURL=ConfiguracionTablasClasificar.js.map
