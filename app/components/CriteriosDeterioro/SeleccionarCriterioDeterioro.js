"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _Accordion = _interopRequireDefault(require("../Accordion/Accordion.js"));

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

var SeleccionarCriterioDeterioro =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SeleccionarCriterioDeterioro, _React$Component);

  function SeleccionarCriterioDeterioro(props) {
    _classCallCheck(this, SeleccionarCriterioDeterioro);

    return _possibleConstructorReturn(this, _getPrototypeOf(SeleccionarCriterioDeterioro).call(this, props));
  }

  _createClass(SeleccionarCriterioDeterioro, [{
    key: "render",
    value: function render() {
      var _this = this;

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
        className: "breadcrumb-item active",
        "aria-current": "page"
      }, "Seleccionar Criterio de Deterioro"))))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("button", {
        onClick: this.props.goCrearCredito,
        className: "btn btn-success btn-block col-xl-10 col-10",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold",
          margin: "0 auto",
          display: "block"
        }
      }, "Crear")), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "row addPaddingToConfig"
      }, this.props.tiposDeCredito.map(function (tipoCredito, i) {
        return _react["default"].createElement(_Accordion["default"], {
          key: tipoCredito.ID,
          showTrash: false,
          showEdit: false,
          allowMultipleOpen: true,
          color: "#ffffff"
        }, _react["default"].createElement("div", {
          label: tipoCredito.nombre,
          key: tipoCredito.ID
        }, _this.props.estimacionesDeterioro[i] != undefined ? _react["default"].createElement("div", null, _this.props.estimacionesDeterioro[i].map(function (estimacionDeterioro, j) {
          return _react["default"].createElement("a", {
            className: "btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM",
            onClick: function onClick() {
              return _this.props.seleccionarCriterio(estimacionDeterioro.ID, estimacionDeterioro.nombreClasPadre, estimacionDeterioro);
            },
            key: estimacionDeterioro.ID
          }, estimacionDeterioro.categoria + " - " + estimacionDeterioro.tipoGarantia);
        }), _this.props.estimacionesDeterioro[i].length == 0 ? _react["default"].createElement("a", {
          className: "btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"
        }, "No existen criterios de deterioro creados") : _react["default"].createElement("span", null)) : _react["default"].createElement("span", null)));
      })))));
    }
  }]);

  return SeleccionarCriterioDeterioro;
}(_react["default"].Component);

exports["default"] = SeleccionarCriterioDeterioro;
//# sourceMappingURL=SeleccionarCriterioDeterioro.js.map
