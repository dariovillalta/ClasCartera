"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _CrearFiltro = _interopRequireDefault(require("../CrearFiltro.js"));

var _ResultadoReporteria = _interopRequireDefault(require("./ResultadoReporteria.js"));

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

var VerReporteria =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VerReporteria, _React$Component);

  function VerReporteria(props) {
    var _this;

    _classCallCheck(this, VerReporteria);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VerReporteria).call(this, props));
    _this.state = {
      seleccionoFiltro: false
    };
    _this.terminoSeleccionFiltro = _this.terminoSeleccionFiltro.bind(_assertThisInitialized(_this));
    _this.retornoSeleccionFiltro = _this.retornoSeleccionFiltro.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(VerReporteria, [{
    key: "terminoSeleccionFiltro",
    value: function terminoSeleccionFiltro() {
      this.setState({
        seleccionoFiltro: true
      });
    }
  }, {
    key: "retornoSeleccionFiltro",
    value: function retornoSeleccionFiltro() {
      this.setState({
        seleccionoFiltro: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.seleccionoFiltro) {
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
          className: "breadcrumb-item active",
          "aria-current": "page"
        }, "Selecci\xF3n de Filtro"))))))), _react["default"].createElement(_CrearFiltro["default"], {
          pool: this.props.pool,
          callbackComponent: this.terminoSeleccionFiltro
        }, " "));
      } else {
        return _react["default"].createElement("div", null, _react["default"].createElement(_ResultadoReporteria["default"], {
          pool: this.props.pool,
          retornoSeleccionFiltro: this.retornoSeleccionFiltro
        }, " "));
      }
    }
  }]);

  return VerReporteria;
}(_react["default"].Component);

exports["default"] = VerReporteria;
//# sourceMappingURL=VerReporteria.js.map
