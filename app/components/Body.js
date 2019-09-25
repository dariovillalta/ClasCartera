"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Configuracion = _interopRequireDefault(require("./Configuracion.js"));

var _ConeccionTablas = _interopRequireDefault(require("./ConeccionTabla/ConeccionTablas.js"));

var _TipoCredito = _interopRequireDefault(require("./TipoCredito/TipoCredito.js"));

var _LoadingScreen = _interopRequireDefault(require("./LoadingScreen.js"));

var _CriteriosClasificacion = _interopRequireDefault(require("./CriteriosClasificacion/CriteriosClasificacion.js"));

var _CrearYSeleccionarLista = _interopRequireDefault(require("./Listas/CrearYSeleccionarLista.js"));

var _ClasificarCarteraProceso = _interopRequireDefault(require("./ClasificarCarteraProceso/ClasificarCarteraProceso.js"));

var _ElegirReporteria = _interopRequireDefault(require("./Reporteria/ElegirReporteria.js"));

var _VerReporteria = _interopRequireDefault(require("./Reporteria/VerReporteria.js"));

var _DescargarReporteria = _interopRequireDefault(require("./Reporteria/DescargarReporteria.js"));

var _Graficos = _interopRequireDefault(require("./Graficos/Graficos.js"));

var _Home = _interopRequireDefault(require("./Home.js"));

var _CategoriaClasificacion = _interopRequireDefault(require("./CategoriaClasificacion/CategoriaClasificacion.js"));

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

//import CriteriosDeterioro from './CriteriosDeterioro/CriteriosDeterioro.js';
//const importacionODBC = new Worker("./components/odbcMSSQL.js");
var Body =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Body, _React$Component);

  function Body(props) {
    var _this;

    _classCallCheck(this, Body);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Body).call(this, props));
    _this.state = {
      /*router: {
          showConfiguration: true,
          showConfTables: false,
          showTypeCredit: false
      },*/
      showLoadingScreen: false,
      mensajeLoadingScreen: ''
    };
    _this.showLoadingScreen = _this.showLoadingScreen.bind(_assertThisInitialized(_this));
    _this.hideLoadingScreen = _this.hideLoadingScreen.bind(_assertThisInitialized(_this));
    /*importacionODBC.postMessage([this.props.pool, this.props.router]);*/

    return _this;
  }

  _createClass(Body, [{
    key: "showLoadingScreen",
    value: function showLoadingScreen() {
      this.setState({
        showLoadingScreen: true
      });
    }
  }, {
    key: "hideLoadingScreen",
    value: function hideLoadingScreen() {
      this.setState({
        showLoadingScreen: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.router.showConfiguration) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_Configuracion["default"], {
          showTableConfigurationComponent: this.props.showTableConfigurationComponent,
          showTypeCreditComponent: this.props.showTypeCreditComponent,
          showClasificationCriteriaComponent: this.props.showClasificationCriteriaComponent,
          showListsComponent: this.props.showListsComponent,
          showCatClass: this.props.showCatClass
        }, " "), this.state.showLoadingScreen ? _react["default"].createElement(_LoadingScreen["default"], {
          mensaje: this.state.mensajeLoadingScreen
        }, " ") : _react["default"].createElement("div", null));
      } else if (this.props.router.showConfTables) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_ConeccionTablas["default"], {
          pool: this.props.pool,
          showConfigurationComponent: this.props.showConfigurationComponent
        }, " "));
      } else if (this.props.router.showTypeCredit) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_TipoCredito["default"], {
          pool: this.props.pool,
          showConfigurationComponent: this.props.showConfigurationComponent
        }, " "));
      } else if (this.props.router.showClasificationCriteria) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CriteriosClasificacion["default"], {
          pool: this.props.pool,
          showConfigurationComponent: this.props.showConfigurationComponent
        }, " "));
      } else if (this.props.router.showLists) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CrearYSeleccionarLista["default"], {
          pool: this.props.pool,
          showConfigurationComponent: this.props.showConfigurationComponent
        }, " "));
      } else if (this.props.router.showCreditClassificationProcess) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_ClasificarCarteraProceso["default"], {
          pool: this.props.pool,
          showConfigurationComponent: this.props.showConfigurationComponent
        }, " "));
      } else if (this.props.router.showChooseReports) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_ElegirReporteria["default"], {
          pool: this.props.pool,
          showReportsView: this.props.showReportsView,
          showReportsDownload: this.props.showReportsDownload
        }, " "));
      } else if (this.props.router.showReportsView) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_VerReporteria["default"], {
          pool: this.props.pool
        }, " "));
      } else if (this.props.router.showReportsDownload) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_DescargarReporteria["default"], {
          pool: this.props.pool
        }, " "));
      } else if (this.props.router.showGraphics) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_Graficos["default"], {
          pool: this.props.pool
        }, " "));
      } else if (this.props.router.showHome) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_Home["default"], {
          pool: this.props.pool
        }, " "));
      } else if (this.props.router.showCatClass) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CategoriaClasificacion["default"], {
          pool: this.props.pool,
          showConfigurationComponent: this.props.showConfigurationComponent
        }, " "));
      } else if (this.props.router.showDeteriorationCriteria) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CategoriaClasificacion["default"], {
          pool: this.props.pool,
          showConfigurationComponent: this.props.showConfigurationComponent
        }, " "));
      } else {
        return _react["default"].createElement("div", null);
      }
    }
  }]);

  return Body;
}(_react["default"].Component);

exports["default"] = Body;
//# sourceMappingURL=Body.js.map
