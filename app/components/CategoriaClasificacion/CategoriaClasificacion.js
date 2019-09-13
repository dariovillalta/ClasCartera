"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _SeleccionarTabla = _interopRequireDefault(require("../SeleccionarTabla.js"));

var _SeleccionarCategoriaClasificacion = _interopRequireDefault(require("./SeleccionarCategoriaClasificacion.js"));

var _SeleccionarRegla = _interopRequireDefault(require("../Regla/SeleccionarRegla.js"));

var _GuardarCategoriaClasificacionCampo = _interopRequireDefault(require("./GuardarCategoriaClasificacionCampo.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CategoriaClasificacion =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CategoriaClasificacion, _React$Component);

  function CategoriaClasificacion(props) {
    var _this;

    _classCallCheck(this, CategoriaClasificacion);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CategoriaClasificacion).call(this, props));
    _this.state = {
      idTablaSeleccionada: -1,
      nombreTablaSeleccionada: "",
      idCreditoSeleccionado: -1,
      nombreCreditoSeleccionado: "",
      mostrarTabla: "selTable",
      regla: {},
      campoTexto: '',
      operacion: '',
      valorTexto: ''
    };
    _this.updateTableSelectedID = _this.updateTableSelectedID.bind(_assertThisInitialized(_this));
    _this.updateCreditSelectedID = _this.updateCreditSelectedID.bind(_assertThisInitialized(_this));
    _this.returnChooseTable = _this.returnChooseTable.bind(_assertThisInitialized(_this));
    _this.returnSelCredit = _this.returnSelCredit.bind(_assertThisInitialized(_this));
    _this.updateVarCreation = _this.updateVarCreation.bind(_assertThisInitialized(_this));
    _this.returnVarCreation = _this.returnVarCreation.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CategoriaClasificacion, [{
    key: "updateTableSelectedID",
    value: function updateTableSelectedID(id, nombre) {
      this.setState({
        idTablaSeleccionada: id,
        mostrarTabla: "selCredit",
        nombreTablaSeleccionada: nombre
      });
    }
  }, {
    key: "updateCreditSelectedID",
    value: function updateCreditSelectedID(id, nombre) {
      this.setState({
        idCreditoSeleccionado: id,
        mostrarTabla: "selVar",
        nombreCreditoSeleccionado: nombre
      });
    }
  }, {
    key: "returnChooseTable",
    value: function returnChooseTable() {
      this.setState({
        idTablaSeleccionada: this.state.idTablaSeleccionada,
        mostrarTabla: "selTable"
      });
    }
  }, {
    key: "returnSelCredit",
    value: function returnSelCredit() {
      this.setState({
        idCreditoSeleccionado: this.state.idCreditoSeleccionado,
        mostrarTabla: "selCredit"
      });
    }
  }, {
    key: "updateVarCreation",
    value: function updateVarCreation(reglaID, campoTexto, operacion, valorTexto) {
      this.setState({
        regla: {
          ID: reglaID,
          campo: campoTexto,
          operacion: operacion,
          valor: valorTexto
        },
        mostrarTabla: "saveTypeCreditField",
        campoTexto: campoTexto,
        operacion: operacion,
        valorTexto: valorTexto
      });
    }
  }, {
    key: "returnVarCreation",
    value: function returnVarCreation() {
      this.setState({
        regla: {},
        mostrarTabla: "selVar"
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.mostrarTabla.localeCompare("selTable") == 0) {
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
        }, "Seleccionar Tabla"))))))), _react["default"].createElement(_SeleccionarTabla["default"], {
          pool: this.props.pool,
          seleccionarTabla: this.updateTableSelectedID
        }, " "));
      } else if (this.state.mostrarTabla.localeCompare("selCredit") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(SeleccionarTipoCredito, {
          pool: this.props.pool,
          seleccionarCredito: this.updateCreditSelectedID,
          showConfigurationComponent: this.props.showConfigurationComponent,
          retornoTablas: this.returnChooseTable,
          tablaID: this.state.idTablaSeleccionada
        }, " "));
      } else if (this.state.mostrarTabla.localeCompare("selVar") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_SeleccionarRegla["default"], {
          pool: this.props.pool,
          tablaID: this.state.idTablaSeleccionada,
          showConfigurationComponent: this.props.showConfigurationComponent,
          retornoTablas: this.returnChooseTable,
          returnSelCredit: this.returnSelCredit,
          seleccionar: this.updateVarCreation,
          campoTexto: this.state.campoTexto
        }, " "));
      } else {
        var _React$createElement;

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
          onClick: this.props.returnChooseTable
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Seleccionar Tabla")), _react["default"].createElement("li", {
          className: "breadcrumb-item",
          "aria-current": "page",
          onClick: this.returnSelCredit
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Seleccionar Tipo de Cr\xE9dito")), _react["default"].createElement("li", {
          className: "breadcrumb-item",
          "aria-current": "page",
          onClick: this.returnSelCredit
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Seleccionar Variables")), _react["default"].createElement("li", {
          className: "breadcrumb-item active",
          "aria-current": "page"
        }, "Creaci\xF3n de Campor de Tipo de Cr\xE9dito"))))))), _react["default"].createElement(GuardarTipoCreditoCampo, (_React$createElement = {
          pool: this.props.pool
        }, _defineProperty(_React$createElement, "pool", this.props.pool), _defineProperty(_React$createElement, "tabla", this.state.nombreTablaSeleccionada), _defineProperty(_React$createElement, "tipoCredito", this.state.nombreCreditoSeleccionado), _defineProperty(_React$createElement, "campo", this.state.campoTexto), _defineProperty(_React$createElement, "operacion", this.state.operacion), _defineProperty(_React$createElement, "valor", this.state.valorTexto), _defineProperty(_React$createElement, "tablaID", this.state.idTablaSeleccionada), _defineProperty(_React$createElement, "creditoID", this.state.idCreditoSeleccionado), _defineProperty(_React$createElement, "reglaID", this.state.regla.ID), _React$createElement), " "));
      }
    }
  }]);

  return CategoriaClasificacion;
}(_react["default"].Component);

exports["default"] = CategoriaClasificacion;
//# sourceMappingURL=CategoriaClasificacion.js.map
