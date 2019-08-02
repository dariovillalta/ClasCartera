"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ComportamientoPago = _interopRequireDefault(require("./ComportamientoPago.js"));

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

var CriteriosClasificacion =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CriteriosClasificacion, _React$Component);

  function CriteriosClasificacion(props) {
    var _this;

    _classCallCheck(this, CriteriosClasificacion);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CriteriosClasificacion).call(this, props));
    _this.state = {
      router: {
        showConfiguracion: true,
        showCapacidadPago: false,
        showComportamientoPago: false,
        showDisponibilidadGarantias: false,
        showEntornoEconomico: false
      }
    };
    _this.showConfiguracion = _this.showConfiguracion.bind(_assertThisInitialized(_this));
    _this.showCapacidadPagoComponent = _this.showCapacidadPagoComponent.bind(_assertThisInitialized(_this));
    _this.showComportamientoPagoComponent = _this.showComportamientoPagoComponent.bind(_assertThisInitialized(_this));
    _this.showDisponibilidadGarantiasComponent = _this.showDisponibilidadGarantiasComponent.bind(_assertThisInitialized(_this));
    _this.showEntornoEconomicoComponent = _this.showEntornoEconomicoComponent.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CriteriosClasificacion, [{
    key: "showConfiguracion",
    value: function showConfiguracion() {
      this.setState({
        router: {
          showConfiguracion: true,
          showCapacidadPago: false,
          showComportamientoPago: false,
          showDisponibilidadGarantias: false,
          showEntornoEconomico: false
        }
      });
    }
  }, {
    key: "showCapacidadPagoComponent",
    value: function showCapacidadPagoComponent() {
      this.setState({
        router: {
          showConfiguracion: false,
          showCapacidadPago: true,
          showComportamientoPago: false,
          showDisponibilidadGarantias: false,
          showEntornoEconomico: false
        }
      });
    }
  }, {
    key: "showComportamientoPagoComponent",
    value: function showComportamientoPagoComponent() {
      this.setState({
        router: {
          showConfiguracion: false,
          showCapacidadPago: false,
          showComportamientoPago: true,
          showDisponibilidadGarantias: false,
          showEntornoEconomico: false
        }
      });
    }
  }, {
    key: "showDisponibilidadGarantiasComponent",
    value: function showDisponibilidadGarantiasComponent() {
      this.setState({
        router: {
          showConfiguracion: false,
          showCapacidadPago: false,
          showComportamientoPago: false,
          showDisponibilidadGarantias: true,
          showEntornoEconomico: false
        }
      });
    }
  }, {
    key: "showEntornoEconomicoComponent",
    value: function showEntornoEconomicoComponent() {
      this.setState({
        router: {
          showConfiguracion: false,
          showCapacidadPago: false,
          showComportamientoPago: false,
          showDisponibilidadGarantias: false,
          showEntornoEconomico: true
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.router.showConfiguracion) {
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
        }, "Criterios de Clasificaci\xF3n"))))))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "card influencer-profile-data"
        }, _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "row border-top border-bottom addPaddingToConfig"
        }, _react["default"].createElement("a", {
          className: "btn btn-outline-secondary btn-block btnWhiteColorHover fontSize1EM",
          onClick: this.showCapacidadPagoComponent
        }, "Capacidad de Pago del Deudor"), _react["default"].createElement("a", {
          className: "btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM",
          onClick: this.showComportamientoPagoComponent
        }, "Comportamiento de Pago del Deudor"), _react["default"].createElement("a", {
          className: "btn btn-outline-success btn-block btnWhiteColorHover fontSize1EM",
          onClick: this.showDisponibilidadGarantiasComponent
        }, "Disponibilidad de Garant\xEDas"), _react["default"].createElement("a", {
          className: "btn btn-outline-brand btn-block btnWhiteColorHover fontSize1EM",
          onClick: this.showEntornoEconomicoComponent
        }, "Entorno Econ\xF3mico")))))));
      } else if (this.state.router.showCapacidadPago) {
        return _react["default"].createElement("div", null);
      } else if (this.state.router.showComportamientoPago) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_ComportamientoPago["default"], {
          pool: this.props.pool,
          showConfigurationComponent: this.props.showConfigurationComponent,
          showCriteriosClasificacion: this.showConfiguracion
        }, " "));
      } else if (this.state.router.showDisponibilidadGarantias) {
        return _react["default"].createElement("div", null);
      } else if (this.state.router.showEntornoEconomico) {
        return _react["default"].createElement("div", null);
      }
    }
  }]);

  return CriteriosClasificacion;
}(_react["default"].Component);

exports["default"] = CriteriosClasificacion;
//# sourceMappingURL=CriteriosClasificacion.js.map
