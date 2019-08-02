"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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

var AccordionTile =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AccordionTile, _React$Component);

  function AccordionTile() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AccordionTile);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AccordionTile)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      _this.props.onClick(_this.props.label);
    });

    return _this;
  }

  _createClass(AccordionTile, [{
    key: "render",
    value: function render() {
      var onClick = this.onClick,
          _this$props = this.props,
          isOpen = _this$props.isOpen,
          label = _this$props.label;
      return _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("div", {
        onClick: onClick,
        style: {
          cursor: 'pointer',
          width: '100%'
        },
        className: "card-header"
      }, _react["default"].createElement("span", {
        style: {
          color: 'black',
          fontFamily: 'Circular Std Medium'
        }
      }, label), _react["default"].createElement("div", {
        style: {
          "float": 'right'
        }
      }, !isOpen && _react["default"].createElement("span", null, "\u25B2"), isOpen && _react["default"].createElement("span", null, "\u25BC")), this.props.showTrash ? _react["default"].createElement("img", {
        onClick: this.props.deleteVariable,
        src: "../assets/trash.png",
        style: {
          height: "20px",
          width: "20px",
          display: "block",
          "float": "right",
          marginRight: "10px"
        }
      }) : _react["default"].createElement("span", null)), isOpen && _react["default"].createElement("div", {
        className: "card-body"
      }, this.props.children));
    }
  }]);

  return AccordionTile;
}(_react["default"].Component);

exports["default"] = AccordionTile;

_defineProperty(AccordionTile, "propTypes", {
  children: _propTypes["default"].instanceOf(Object).isRequired,
  isOpen: _propTypes["default"].bool.isRequired,
  label: _propTypes["default"].string.isRequired,
  onClick: _propTypes["default"].func.isRequired
});
//# sourceMappingURL=AccordionTile.js.map
