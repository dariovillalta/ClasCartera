"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _SeleccionarTipoCredito = _interopRequireDefault(require("./SeleccionarTipoCredito.js"));

var _MostrarReglas = _interopRequireDefault(require("../Regla/MostrarReglas.js"));

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

var TipoCredito =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TipoCredito, _React$Component);

  function TipoCredito(props) {
    var _this;

    _classCallCheck(this, TipoCredito);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TipoCredito).call(this, props));
    _this.state = {
      idCreditoSeleccionado: -1,
      nombreCreditoSeleccionado: "",
      mostrarTabla: "selCredit"
    };
    _this.updateCreditSelectedID = _this.updateCreditSelectedID.bind(_assertThisInitialized(_this));
    _this.returnSelCredit = _this.returnSelCredit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TipoCredito, [{
    key: "updateCreditSelectedID",
    value: function updateCreditSelectedID(id, nombre) {
      this.setState({
        idCreditoSeleccionado: id,
        mostrarTabla: "selVar",
        nombreCreditoSeleccionado: nombre
      });
    }
  }, {
    key: "returnSelCredit",
    value: function returnSelCredit() {
      this.setState({
        idCreditoSeleccionado: -1,
        mostrarTabla: "selCredit"
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.mostrarTabla.localeCompare("selCredit") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_SeleccionarTipoCredito["default"], {
          pool: this.props.pool,
          seleccionarCredito: this.updateCreditSelectedID,
          showConfigurationComponent: this.props.showConfigurationComponent
        }, " "));
      } else if (this.state.mostrarTabla.localeCompare("selVar") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_MostrarReglas["default"], {
          pool: this.props.pool,
          showConfigurationComponent: this.props.showConfigurationComponent,
          returnPrevComponent: this.returnSelCredit,
          returnPrevComponentName: "Seleccionar Tipo de Crédito",
          campoTexto: this.state.campoTexto,
          tipoTablaRes: "TipoCredito",
          idTipoTabla: this.state.idCreditoSeleccionado
        }, " "));
      }
    }
  }]);

  return TipoCredito;
}(_react["default"].Component);

exports["default"] = TipoCredito;
//# sourceMappingURL=TipoCredito.js.map
