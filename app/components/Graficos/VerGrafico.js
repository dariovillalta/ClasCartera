"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _PieGraph = _interopRequireDefault(require("./PieGraph.js"));

var _BarGraph = _interopRequireDefault(require("./BarGraph.js"));

var _LineGraph = _interopRequireDefault(require("./LineGraph.js"));

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

var VerGrafico =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VerGrafico, _React$Component);

  function VerGrafico(props) {
    _classCallCheck(this, VerGrafico);

    return _possibleConstructorReturn(this, _getPrototypeOf(VerGrafico).call(this, props));
  }

  _createClass(VerGrafico, [{
    key: "render",
    value: function render() {
      if (this.props.tipoGraficoSeleccionado.localeCompare("pie") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_PieGraph["default"], {
          fechaInicio: this.props.fechaInicio,
          fechaFinal: this.props.fechaInicio,
          nombreEtiqueta: this.props.nombreEtiqueta,
          tablaEtiqueta: this.props.tablaEtiqueta,
          nombreNumerico: this.props.nombreNumerico,
          tablaNumerico: this.props.tablaNumerico,
          pool: this.props.pool
        }, " "));
      } else if (this.props.tipoGraficoSeleccionado.localeCompare("bar") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_BarGraph["default"], {
          fechaInicio: this.props.fechaInicio,
          fechaFinal: this.props.fechaInicio,
          nombreEtiqueta: this.props.nombreEtiqueta,
          tablaEtiqueta: this.props.tablaEtiqueta,
          nombreNumerico: this.props.nombreNumerico,
          tablaNumerico: this.props.tablaNumerico,
          pool: this.props.pool
        }, " "));
      } else if (this.props.tipoGraficoSeleccionado.localeCompare("line") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_LineGraph["default"], {
          fechaInicio: this.props.fechaInicio,
          fechaFinal: this.props.fechaInicio,
          nombreEtiqueta: this.props.nombreEtiqueta,
          tablaEtiqueta: this.props.tablaEtiqueta,
          nombreNumerico: this.props.nombreNumerico,
          tablaNumerico: this.props.tablaNumerico,
          pool: this.props.pool
        }, " "));
      }
    }
  }]);

  return VerGrafico;
}(_react["default"].Component);

exports["default"] = VerGrafico;
//# sourceMappingURL=VerGrafico.js.map
