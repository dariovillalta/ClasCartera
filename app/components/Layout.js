"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _NavBar = _interopRequireDefault(require("./NavBar.js"));

var _LeftBar = _interopRequireDefault(require("./LeftBar.js"));

var _Body = _interopRequireDefault(require("./Body.js"));

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

var Layout =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Layout, _React$Component);

  function Layout() {
    var _this;

    _classCallCheck(this, Layout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Layout).call(this));
    _this.state = {
      router: {
        showConfiguration: false,
        //lista de configuraciones
        showConfTables: false,
        //configuracion de conexiones a tablas/campos
        showTypeCredit: false,
        //configuracion de opciones de tipo de credito
        showClasificationCriteria: false,
        //configuracion de opciones clasificacion de criterio
        showLists: false,
        //configuracion de opciones de tipo de listas
        showCreditClassificationProcess: false,
        //proceso de iniciar calculo de creditos
        showChooseReports: false,
        //reporteria elegir entre ver datos o descargar excel
        showReportsView: false,
        //reporteria ver datos
        showReportsDownload: false,
        //reporteria descargar datos
        showGraphics: false,
        //componente para mostrar diferentes tipos de graficos
        showHome: true,
        //pantalla de inicio
        showCatClass: false,
        //configuracion de opciones de categorias de clasificacion
        showDeteriorationCriteria: false,
        //configuracion de criterios de deterioro
        showMantenimientoUsuarios: false,
        //mantenimiento de usuarios
        showBitacora: false //visualizacion de bitacora

      }
    };
    _this.showConfigurationComponent = _this.showConfigurationComponent.bind(_assertThisInitialized(_this));
    _this.showTableConfigurationComponent = _this.showTableConfigurationComponent.bind(_assertThisInitialized(_this));
    _this.showTypeCreditComponent = _this.showTypeCreditComponent.bind(_assertThisInitialized(_this));
    _this.showClasificationCriteriaComponent = _this.showClasificationCriteriaComponent.bind(_assertThisInitialized(_this));
    _this.showListsComponent = _this.showListsComponent.bind(_assertThisInitialized(_this));
    _this.showCreditClasificationProcess = _this.showCreditClasificationProcess.bind(_assertThisInitialized(_this));
    _this.showChooseReports = _this.showChooseReports.bind(_assertThisInitialized(_this));
    _this.showReportsView = _this.showReportsView.bind(_assertThisInitialized(_this));
    _this.showReportsDownload = _this.showReportsDownload.bind(_assertThisInitialized(_this));
    _this.showGraphics = _this.showGraphics.bind(_assertThisInitialized(_this));
    _this.showHome = _this.showHome.bind(_assertThisInitialized(_this));
    _this.showCatClass = _this.showCatClass.bind(_assertThisInitialized(_this));
    _this.showDeteriorationCriteria = _this.showDeteriorationCriteria.bind(_assertThisInitialized(_this));
    _this.showMantenimientoUsuarios = _this.showMantenimientoUsuarios.bind(_assertThisInitialized(_this));
    _this.showBitacora = _this.showBitacora.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Layout, [{
    key: "showConfigurationComponent",
    value: function showConfigurationComponent() {
      this.setState({
        router: {
          showConfiguration: true,
          showConfTables: false,
          showTypeCredit: false,
          showClasificationCriteria: false,
          showLists: false,
          showCreditClassificationProcess: false,
          showChooseReports: false,
          showReportsView: false,
          showReportsDownload: false,
          showGraphics: false,
          showHome: false,
          showCatClass: false,
          showDeteriorationCriteria: false,
          showMantenimientoUsuarios: false,
          showBitacora: false
        }
      });
    }
  }, {
    key: "showTableConfigurationComponent",
    value: function showTableConfigurationComponent() {
      this.setState({
        router: {
          showConfiguration: false,
          showConfTables: true,
          showTypeCredit: false,
          showClasificationCriteria: false,
          showLists: false,
          showCreditClassificationProcess: false,
          showChooseReports: false,
          showReportsView: false,
          showReportsDownload: false,
          showGraphics: false,
          showHome: false,
          showCatClass: false,
          showDeteriorationCriteria: false,
          showMantenimientoUsuarios: false,
          showBitacora: false
        }
      });
    }
  }, {
    key: "showTypeCreditComponent",
    value: function showTypeCreditComponent() {
      this.setState({
        router: {
          showConfiguration: false,
          showConfTables: false,
          showTypeCredit: true,
          showClasificationCriteria: false,
          showLists: false,
          showCreditClassificationProcess: false,
          showChooseReports: false,
          showReportsView: false,
          showReportsDownload: false,
          showGraphics: false,
          showHome: false,
          showCatClass: false,
          showDeteriorationCriteria: false,
          showMantenimientoUsuarios: false,
          showBitacora: false
        }
      });
    }
  }, {
    key: "showClasificationCriteriaComponent",
    value: function showClasificationCriteriaComponent() {
      this.setState({
        router: {
          showConfiguration: false,
          showConfTables: false,
          showTypeCredit: false,
          showClasificationCriteria: true,
          showLists: false,
          showCreditClassificationProcess: false,
          showChooseReports: false,
          showReportsView: false,
          showReportsDownload: false,
          showGraphics: false,
          showHome: false,
          showCatClass: false,
          showDeteriorationCriteria: false,
          showMantenimientoUsuarios: false,
          showBitacora: false
        }
      });
    }
  }, {
    key: "showListsComponent",
    value: function showListsComponent() {
      this.setState({
        router: {
          showConfiguration: false,
          showConfTables: false,
          showTypeCredit: false,
          showClasificationCriteria: false,
          showLists: true,
          showCreditClassificationProcess: false,
          showChooseReports: false,
          showReportsView: false,
          showReportsDownload: false,
          showGraphics: false,
          showHome: false,
          showCatClass: false,
          showDeteriorationCriteria: false,
          showMantenimientoUsuarios: false,
          showBitacora: false
        }
      });
    }
  }, {
    key: "showCreditClasificationProcess",
    value: function showCreditClasificationProcess() {
      this.setState({
        router: {
          showConfiguration: false,
          showConfTables: false,
          showTypeCredit: false,
          showClasificationCriteria: false,
          showLists: false,
          showCreditClassificationProcess: true,
          showChooseReports: false,
          showReportsView: false,
          showReportsDownload: false,
          showGraphics: false,
          showHome: false,
          showCatClass: false,
          showDeteriorationCriteria: false,
          showMantenimientoUsuarios: false,
          showBitacora: false
        }
      });
    }
  }, {
    key: "showChooseReports",
    value: function showChooseReports() {
      this.setState({
        router: {
          showConfiguration: false,
          showConfTables: false,
          showTypeCredit: false,
          showClasificationCriteria: false,
          showLists: false,
          showCreditClassificationProcess: false,
          showChooseReports: true,
          showReportsView: false,
          showReportsDownload: false,
          showGraphics: false,
          showHome: false,
          showCatClass: false,
          showDeteriorationCriteria: false,
          showMantenimientoUsuarios: false,
          showBitacora: false
        }
      });
    }
  }, {
    key: "showReportsView",
    value: function showReportsView() {
      this.setState({
        router: {
          showConfiguration: false,
          showConfTables: false,
          showTypeCredit: false,
          showClasificationCriteria: false,
          showLists: false,
          showCreditClassificationProcess: false,
          showChooseReports: false,
          showReportsView: true,
          showReportsDownload: false,
          showGraphics: false,
          showHome: false,
          showCatClass: false,
          showDeteriorationCriteria: false,
          showMantenimientoUsuarios: false,
          showBitacora: false
        }
      });
    }
  }, {
    key: "showReportsDownload",
    value: function showReportsDownload() {
      this.setState({
        router: {
          showConfiguration: false,
          showConfTables: false,
          showTypeCredit: false,
          showClasificationCriteria: false,
          showLists: false,
          showCreditClassificationProcess: false,
          showChooseReports: false,
          showReportsView: false,
          showReportsDownload: true,
          showGraphics: false,
          showHome: false,
          showCatClass: false,
          showDeteriorationCriteria: false,
          showMantenimientoUsuarios: false,
          showBitacora: false
        }
      });
    }
  }, {
    key: "showGraphics",
    value: function showGraphics() {
      this.setState({
        router: {
          showConfiguration: false,
          showConfTables: false,
          showTypeCredit: false,
          showClasificationCriteria: false,
          showLists: false,
          showCreditClassificationProcess: false,
          showChooseReports: false,
          showReportsView: false,
          showReportsDownload: false,
          showGraphics: true,
          showHome: false,
          showCatClass: false,
          showDeteriorationCriteria: false,
          showMantenimientoUsuarios: false,
          showBitacora: false
        }
      });
    }
  }, {
    key: "showHome",
    value: function showHome() {
      this.setState({
        router: {
          showConfiguration: false,
          showConfTables: false,
          showTypeCredit: false,
          showClasificationCriteria: false,
          showLists: false,
          showCreditClassificationProcess: false,
          showChooseReports: false,
          showReportsView: false,
          showReportsDownload: false,
          showGraphics: false,
          showHome: true,
          showCatClass: false,
          showDeteriorationCriteria: false,
          showMantenimientoUsuarios: false,
          showBitacora: false
        }
      });
    }
  }, {
    key: "showCatClass",
    value: function showCatClass() {
      this.setState({
        router: {
          showConfiguration: false,
          showConfTables: false,
          showTypeCredit: false,
          showClasificationCriteria: false,
          showLists: false,
          showCreditClassificationProcess: false,
          showChooseReports: false,
          showReportsView: false,
          showReportsDownload: false,
          showGraphics: false,
          showHome: false,
          showCatClass: true,
          showDeteriorationCriteria: false,
          showMantenimientoUsuarios: false,
          showBitacora: false
        }
      });
    }
  }, {
    key: "showDeteriorationCriteria",
    value: function showDeteriorationCriteria() {
      this.setState({
        router: {
          showConfiguration: false,
          showConfTables: false,
          showTypeCredit: false,
          showClasificationCriteria: false,
          showLists: false,
          showCreditClassificationProcess: false,
          showChooseReports: false,
          showReportsView: false,
          showReportsDownload: false,
          showGraphics: false,
          showHome: false,
          showCatClass: false,
          showDeteriorationCriteria: true,
          showMantenimientoUsuarios: false,
          showBitacora: false
        }
      });
    }
  }, {
    key: "showMantenimientoUsuarios",
    value: function showMantenimientoUsuarios() {
      this.setState({
        router: {
          showConfiguration: false,
          showConfTables: false,
          showTypeCredit: false,
          showClasificationCriteria: false,
          showLists: false,
          showCreditClassificationProcess: false,
          showChooseReports: false,
          showReportsView: false,
          showReportsDownload: false,
          showGraphics: false,
          showHome: false,
          showCatClass: false,
          showDeteriorationCriteria: false,
          showMantenimientoUsuarios: true,
          showBitacora: false
        }
      });
    }
  }, {
    key: "showBitacora",
    value: function showBitacora() {
      this.setState({
        router: {
          showConfiguration: false,
          showConfTables: false,
          showTypeCredit: false,
          showClasificationCriteria: false,
          showLists: false,
          showCreditClassificationProcess: false,
          showChooseReports: false,
          showReportsView: false,
          showReportsDownload: false,
          showGraphics: false,
          showHome: false,
          showCatClass: false,
          showDeteriorationCriteria: false,
          showMantenimientoUsuarios: false,
          showBitacora: true
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "dashboard-main-wrapper"
      }, _react["default"].createElement(_NavBar["default"], {
        logOff: this.props.logOff,
        userName: this.props.userName,
        permision: this.props.permision,
        showConfigurationComponent: this.showConfigurationComponent
      }, " "), _react["default"].createElement(_LeftBar["default"], {
        permision: this.props.permision,
        showCreditClasificationProcess: this.showCreditClasificationProcess,
        showChooseReports: this.showChooseReports,
        showGraphics: this.showGraphics,
        showHome: this.showHome
      }, " "), _react["default"].createElement("div", {
        className: "dashboard-wrapper"
      }, _react["default"].createElement("div", {
        className: "container-fluid dashboard-content"
      }, _react["default"].createElement(_Body["default"], {
        router: this.state.router,
        pool: this.props.pool,
        showConfigurationComponent: this.showConfigurationComponent,
        showTableConfigurationComponent: this.showTableConfigurationComponent,
        showTypeCreditComponent: this.showTypeCreditComponent,
        showClasificationCriteriaComponent: this.showClasificationCriteriaComponent,
        showListsComponent: this.showListsComponent,
        showReportsView: this.showReportsView,
        showReportsDownload: this.showReportsDownload,
        showCatClass: this.showCatClass,
        showDeteriorationCriteria: this.showDeteriorationCriteria,
        showMantenimientoUsuarios: this.showMantenimientoUsuarios,
        showBitacora: this.showBitacora
      }, " "))));
    }
  }]);

  return Layout;
}(_react["default"].Component);

exports["default"] = Layout;
//# sourceMappingURL=Layout.js.map
