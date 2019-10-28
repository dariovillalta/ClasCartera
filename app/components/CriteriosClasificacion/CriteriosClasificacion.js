"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _SeleccionarComportamientoPago = _interopRequireDefault(require("./SeleccionarComportamientoPago.js"));

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
          className: "breadcrumb-item",
          "aria-current": "page",
          onClick: this.showConfiguracion
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Criterios de Clasificaci\xF3n")), _react["default"].createElement("li", {
          className: "breadcrumb-item active",
          "aria-current": "page"
        }, "Capacidad de Pago del Deudor"))))))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 m-b-60"
        }, _react["default"].createElement("div", {
          className: "simple-card",
          style: {
            padding: "5%"
          }
        }, _react["default"].createElement("p", null, "Constituir\xE1 el factor principal para evaluar a los Grandes Deudores Comerciales, y se medir\xE1 en funci\xF3n del an\xE1lisis que realice la instituci\xF3n (ver Anexo 1-G) al inicio del cr\xE9dito y de las actualizaciones que efect\xFAe de conformidad al perfil de riesgo del deudor, las cuales como m\xEDnimo deben ser anualmente, de la situaci\xF3n financiera, presente y futura del deudor. Este an\xE1lisis deber\xE1 tener como sustento t\xE9cnico, los estados financieros principales del deudor (balance general, estado de resultados y flujo de caja), los que deber\xE1n haber sido auditados por firmas independientes registradas en la Comisi\xF3n o auditados por firmas extranjeras cuando se trate de un deudor no domiciliado en el territorio nacional, mismos que deber\xE1n ser confiables y comprensibles para la entidad prestamista, de conformidad con el Anexo 1-A, numerales 2.1 y 2.2, Secci\xF3n Financiera. Los flujos de caja y estudios de factibilidad de los nuevos proyectos a financiar, deber\xE1n tener bases de sustentaci\xF3n y supuestos, suficientes y razonables.")))));
      } else if (this.state.router.showComportamientoPago) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_SeleccionarComportamientoPago["default"], {
          pool: this.props.pool,
          showConfigurationComponent: this.props.showConfigurationComponent,
          showCriteriosClasificacion: this.showConfiguracion
        }, " "));
      } else if (this.state.router.showDisponibilidadGarantias) {
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
          className: "breadcrumb-item",
          "aria-current": "page",
          onClick: this.showConfiguracion
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Criterios de Clasificaci\xF3n")), _react["default"].createElement("li", {
          className: "breadcrumb-item active",
          "aria-current": "page"
        }, "Disponibilidad de Garant\xEDas"))))))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 m-b-60"
        }, _react["default"].createElement("div", {
          className: "simple-card",
          style: {
            padding: "5%"
          }
        }, _react["default"].createElement("p", null, "Las garant\xEDas constituyen la fuente alterna de pago de un cr\xE9dito y tienen relevancia para el requerimiento de las estimaciones de deterioro, despu\xE9s de que se hayan establecido claras debilidades en los dos (2) factores anteriores, siempre que para su ejecuci\xF3n y realizaci\xF3n no se prevean dificultades u obst\xE1culos que deterioren el valor de la garant\xEDa. Para ser consideradas como fuente alterna de pago, las garant\xEDas deben poder ser ejecutadas y realizadas en el corto plazo. Las garant\xEDas se considerar\xE1n por el valor que se les haya asignado en aval\xFAo efectuado por profesional debidamente registrado en la Comisi\xF3n, o bien, con el valor de la factura de proveedor reconocido o por su precio de venta de realizaci\xF3n r\xE1pida, dependiendo de su naturaleza, cuando corresponda. Los criterios de valorizaci\xF3n de las garant\xEFas para efectos de clasificaci\xF3n de la cartera de cr\xE9ditos, se detallan en el Anexo 2 que forma parte integral de las presentes Normas.")))));
      } else if (this.state.router.showEntornoEconomico) {
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
          className: "breadcrumb-item",
          "aria-current": "page",
          onClick: this.showConfiguracion
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Criterios de Clasificaci\xF3n")), _react["default"].createElement("li", {
          className: "breadcrumb-item active",
          "aria-current": "page"
        }, "Entorno Econ\xF3mico"))))))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 m-b-60"
        }, _react["default"].createElement("div", {
          className: "simple-card",
          style: {
            padding: "5%"
          }
        }, _react["default"].createElement("p", null, "Las condiciones y perspectivas del mercado o sector en que se llevan a cabo las actividades comerciales o productivas del deudor deben ser tomadas en cuenta en la asignaci\xF3n de categor\xEDas a los Grandes Deudores Comerciales. Se debe analizar la posici\xF3n estrat\xE9gica de un deudor en su mercado o rubro (utilizando criterios tales como dependencia de un solo producto o proveedor, demanda decreciente, productos substitutos, obsolescencia tecnol\xF3gica, entre otros).")))));
      }
    }
  }]);

  return CriteriosClasificacion;
}(_react["default"].Component);

exports["default"] = CriteriosClasificacion;
//# sourceMappingURL=CriteriosClasificacion.js.map
