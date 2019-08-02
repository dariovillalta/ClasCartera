"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _SeleccionarTabla = _interopRequireDefault(require("./SeleccionarTabla.js"));

var _SeleccionarCredito = _interopRequireDefault(require("./SeleccionarCredito.js"));

var _SeleccionarRegla = _interopRequireDefault(require("./SeleccionarRegla.js"));

var _GuardarTipoCreditoCampo = _interopRequireDefault(require("./GuardarTipoCreditoCampo.js"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TipoCredito =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TipoCredito, _React$Component);

  function TipoCredito(props) {
    var _this;

    _classCallCheck(this, TipoCredito);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TipoCredito).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "returnVarCreation", function (campotablaID, campoCampoID, campoTipo, operacion, tipoOperacion, valor, valortipo, esListaValor, esCampoValor, valortablaID, valorCampoID) {
      _this.setState({
        regla: {
          campotablaID: campotablaID,
          campoCampoID: campoCampoID,
          campoTipo: campoTipo,
          operacion: operacion,
          tipoOperacion: tipoOperacion,
          valor: valor,
          valortipo: valortipo,
          esListaValor: esListaValor,
          esCampoValor: esCampoValor,
          valortablaID: valortablaID,
          valorCampoID: valorCampoID
        },
        mostrarTabla: "saveTypeCreditField"
      });
    });

    _this.state = {
      idTablaSeleccionada: -1,
      idCreditoSeleccionado: -1,
      mostrarTabla: "selTable",
      regla: {}
    };
    _this.updateTableSelectedID = _this.updateTableSelectedID.bind(_assertThisInitialized(_this));
    _this.updateCreditSelectedID = _this.updateCreditSelectedID.bind(_assertThisInitialized(_this));
    _this.updateVarCreation = _this.updateVarCreation.bind(_assertThisInitialized(_this));
    _this.returnChooseTable = _this.returnChooseTable.bind(_assertThisInitialized(_this));
    _this.returnSelCredit = _this.returnSelCredit.bind(_assertThisInitialized(_this));
    _this.returnVarCreation = _this.returnVarCreation.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TipoCredito, [{
    key: "updateTableSelectedID",
    value: function updateTableSelectedID(id) {
      this.setState({
        idTablaSeleccionada: id,
        mostrarTabla: "selCredit"
      });
    }
  }, {
    key: "updateCreditSelectedID",
    value: function updateCreditSelectedID(id) {
      this.setState({
        idCreditoSeleccionado: id,
        mostrarTabla: "selVar"
      });
    }
  }, {
    key: "updateTypeCredit",
    value: function updateTypeCredit(id) {
      this.setState({
        idCreditoSeleccionado: id,
        mostrarTabla: "saveTypeCredit"
      });
    }
  }, {
    key: "updateVarCreation",
    value: function updateVarCreation(id) {
      this.setState({
        idCreditoSeleccionado: id,
        mostrarTabla: "saveTypeCredit"
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
        return _react["default"].createElement("div", null, _react["default"].createElement(_SeleccionarCredito["default"], {
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
          returnSelCredit: this.returnSelCredit
        }, " "));
      } else {
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
          className: "breadcrumb-item active",
          "aria-current": "page"
        }, "Creaci\xF3n de Variables"))))))), _react["default"].createElement(_GuardarTipoCreditoCampo["default"], {
          pool: this.props.pool
        }, " "));
      }
    }
  }]);

  return TipoCredito;
}(_react["default"].Component);

exports["default"] = TipoCredito;
//# sourceMappingURL=TipoCredito.js.map
