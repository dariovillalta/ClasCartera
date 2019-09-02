"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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

var DescargarReporteArchivo =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DescargarReporteArchivo, _React$Component);

  function DescargarReporteArchivo(props) {
    var _this;

    _classCallCheck(this, DescargarReporteArchivo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DescargarReporteArchivo).call(this, props));
    _this.state = {
      tablaSeleccionada: "clientes" //this.cambioClientes = this.cambioClientes.bind(this);

    };
    return _this;
  }

  _createClass(DescargarReporteArchivo, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Ver Reporteria"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item",
        "aria-current": "page",
        onClick: this.props.retornoSeleccionFiltro
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Selecci\xF3n de Filtro")), _react["default"].createElement("li", {
        className: "breadcrumb-item active",
        "aria-current": "page"
      }, "Resultado"))))))), _react["default"].createElement("div", {
        style: {
          width: "100%",
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

  return DescargarReporteArchivo;
}(_react["default"].Component);

exports["default"] = DescargarReporteArchivo;
//# sourceMappingURL=DescargarReporteArchivo.js.map
