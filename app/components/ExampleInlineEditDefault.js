"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _InlineEdit = _interopRequireDefault(require("react-ions/lib/components/InlineEdit"));

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ExampleInlineEditDefault =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ExampleInlineEditDefault, _React$Component);

  function ExampleInlineEditDefault(props) {
    var _this;

    _classCallCheck(this, ExampleInlineEditDefault);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExampleInlineEditDefault).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      inlineValue: 'Example value'
    });

    _defineProperty(_assertThisInitialized(_this), "handleSave", function (event) {
      if (event.target.name === 'test') {
        _this.setState({
          inlineValue: event.target.value
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      return _react["default"].createElement("div", null, _react["default"].createElement(_InlineEdit["default"], {
        name: "test",
        value: _this.state.inlineValue,
        changeCallback: _this.handleSave
      }), _react["default"].createElement("code", null, "The Inline Edit value is '", _this.state.inlineValue, "'."));
    });

    return _this;
  }

  return ExampleInlineEditDefault;
}(_react["default"].Component);

var _default = ExampleInlineEditDefault;
exports["default"] = _default;
//# sourceMappingURL=ExampleInlineEditDefault.js.map
