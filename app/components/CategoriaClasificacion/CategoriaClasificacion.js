"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _SeleccionarCategoriaClasificacion = _interopRequireDefault(require("./SeleccionarCategoriaClasificacion.js"));

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

var CategoriaClasificacion =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CategoriaClasificacion, _React$Component);

  function CategoriaClasificacion(props) {
    var _this;

    _classCallCheck(this, CategoriaClasificacion);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CategoriaClasificacion).call(this, props));
    _this.state = {
      idCategoriaClasificacion: -1,
      nombreCategoriaClasificacion: "",
      mostrarTabla: "selCatClas"
    };
    _this.updateClasificationCategoryID = _this.updateClasificationCategoryID.bind(_assertThisInitialized(_this));
    _this.returnSelClasificationCategory = _this.returnSelClasificationCategory.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CategoriaClasificacion, [{
    key: "updateClasificationCategoryID",
    value: function updateClasificationCategoryID(id, nombre) {
      this.setState({
        idCategoriaClasificacion: id,
        mostrarTabla: "selVar",
        nombreCreditoSeleccionado: nombre
      });
    }
  }, {
    key: "returnSelClasificationCategory",
    value: function returnSelClasificationCategory() {
      this.setState({
        idCategoriaClasificacion: -1,
        mostrarTabla: "selCatClas"
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.mostrarTabla.localeCompare("selCatClas") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_SeleccionarCategoriaClasificacion["default"], {
          pool: this.props.pool,
          seleccionarCategoriaClasificacion: this.updateClasificationCategoryID,
          showConfigurationComponent: this.props.showConfigurationComponent
        }, " "));
      } else if (this.state.mostrarTabla.localeCompare("selVar") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_MostrarReglas["default"], {
          pool: this.props.pool,
          showConfigurationComponent: this.props.showConfigurationComponent,
          returnPrevComponent: this.returnSelClasificationCategory,
          returnPrevComponentName: "Seleccionar Categoria de Clasificación",
          campoTexto: this.state.campoTexto,
          tipoTablaRes: "CategoriaClasificacion",
          idTipoTabla: this.state.idCategoriaClasificacion
        }, " "));
      }
    }
  }]);

  return CategoriaClasificacion;
}(_react["default"].Component);

exports["default"] = CategoriaClasificacion;
//# sourceMappingURL=CategoriaClasificacion.js.map
