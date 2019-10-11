"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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

var Campo =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Campo, _React$Component);

  function Campo(props) {
    var _this;

    _classCallCheck(this, Campo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Campo).call(this, props));
    _this.checkFieldType = _this.checkFieldType.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Campo, [{
    key: "checkFieldType",
    value: function checkFieldType() {
      var valor = $('#campo').val();

      if (valor.length > 0 && valor.localeCompare("M0ra") != 0) {
        var campoSeleccionado = this.props.campos[valor];

        if (campoSeleccionado.tipo.indexOf("int") == 0) {
          this.props.esNumero();
        } else if (campoSeleccionado.tipo.indexOf("bit") == 0) {
          this.props.esBoolean();
        } else if (campoSeleccionado.tipo.indexOf("date") == 0) {
          this.props.esFecha();
        } else if (campoSeleccionado.tipo.indexOf("varchar") == 0) {
          this.props.esTexto();
        }
      } else if (valor.length > 0 && valor.localeCompare("M0ra") == 0) {
        this.props.esNumero();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("h3", {
        className: "card-header"
      }, "Seleccionar Campo"), _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("select", {
        id: "campo",
        className: "form-control form-control-lg",
        onChange: this.checkFieldType
      }, _react["default"].createElement("option", {
        value: ""
      }, "Seleccione un campo..."), _react["default"].createElement("option", {
        value: "M0ra"
      }, "D\xEDas de Mora"), this.props.campos.map(function (campo, i) {
        return _react["default"].createElement("option", {
          value: i,
          key: i
        }, campo.nombre);
      }))))))));
    }
  }]);

  return Campo;
}(_react["default"].Component);

exports["default"] = Campo;
//# sourceMappingURL=Campo.js.map
