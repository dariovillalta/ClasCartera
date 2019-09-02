"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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

var OpcionConfiguracionTablasClasificar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(OpcionConfiguracionTablasClasificar, _React$Component);

  function OpcionConfiguracionTablasClasificar(props) {
    _classCallCheck(this, OpcionConfiguracionTablasClasificar);

    return _possibleConstructorReturn(this, _getPrototypeOf(OpcionConfiguracionTablasClasificar).call(this, props));
  }

  _createClass(OpcionConfiguracionTablasClasificar, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "solid 2px #eceff1"
        }
      }, _react["default"].createElement("div", {
        style: {
          width: "90%"
        }
      }, _react["default"].createElement("div", {
        style: {
          display: "inline-block",
          width: "10%"
        }
      }, _react["default"].createElement("label", {
        className: "custom-control custom-checkbox",
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("input", {
        id: this.props.id,
        type: "checkbox",
        defaultChecked: true,
        className: "custom-control-input"
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("div", {
        style: {
          display: "inline-block",
          width: "90%",
          padding: "0%",
          borderLeft: "solid 1px #eceff1"
        }
      }, _react["default"].createElement(_Accordion["default"], {
        showTrash: false,
        allowMultipleOpen: true,
        color: this.props.color
      }, _react["default"].createElement("div", {
        label: this.props.nombre
      }, this.props.campos != undefined ? _react["default"].createElement("span", null, this.props.campos.map(function (opcion, i) {
        return _react["default"].createElement("p", {
          key: opcion.ID
        }, opcion.nombre);
      })) : _react["default"].createElement("span", null))))));
    }
  }]);

  return OpcionConfiguracionTablasClasificar;
}(_react["default"].Component);

exports["default"] = OpcionConfiguracionTablasClasificar;
//# sourceMappingURL=OpcionConfiguracionTablasClasificar.js.map
