"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var OpcionTablasClasificar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(OpcionTablasClasificar, _React$Component);

  function OpcionTablasClasificar(props) {
    _classCallCheck(this, OpcionTablasClasificar);

    return _possibleConstructorReturn(this, _getPrototypeOf(OpcionTablasClasificar).call(this, props));
  }

  _createClass(OpcionTablasClasificar, [{
    key: "render",
    value: function render() {
      var _ref;

      return _react["default"].createElement("div", {
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("div", {
        style: {
          width: "90%",
          border: "solid 2px #eceff1"
        }
      }, _react["default"].createElement("div", {
        style: {
          display: "inline-block",
          width: "10%",
          borderRight: "solid 2px #eceff1"
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
        className: "custom-control-input",
        style: {
          cursor: "pointer"
        },
        onClick: this.props.callMethod
      }), _react["default"].createElement("span", {
        className: "custom-control-label"
      }))), _react["default"].createElement("div", {
        style: {
          display: "inline-block",
          width: "90%",
          padding: "0%",
          borderLeft: "solid 2px #eceff1",
          position: "relative"
        }
      }, _react["default"].createElement("h4", {
        style: (_ref = {
          fontFamily: 'Circular Std Medium',
          color: "#71748d",
          cursor: "pointer",
          top: "70%",
          position: "absolute"
        }, _defineProperty(_ref, "top", "50%"), _defineProperty(_ref, "transform", "translate(0, -50%)"), _ref),
        className: "alert-heading",
        onClick: this.props.callMethod
      }, this.props.texto))));
    }
  }]);

  return OpcionTablasClasificar;
}(_react["default"].Component);

exports["default"] = OpcionTablasClasificar;
//# sourceMappingURL=OpcionTablasClasificar.js.map
