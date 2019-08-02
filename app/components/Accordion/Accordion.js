"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _AccordionTile = _interopRequireDefault(require("./AccordionTile.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Accordion =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Accordion, _React$Component);

  function Accordion(props) {
    var _this;

    _classCallCheck(this, Accordion);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Accordion).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onClick", function (label) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          allowMultipleOpen = _assertThisInitialize.props.allowMultipleOpen,
          openSections = _assertThisInitialize.state.openSections;

      var isOpen = !!openSections[label];

      if (allowMultipleOpen) {
        _this.setState({
          openSections: _objectSpread({}, openSections, _defineProperty({}, label, !isOpen))
        });
      } else {
        _this.setState({
          openSections: _defineProperty({}, label, !isOpen)
        });
      }
    });

    var _openSections = {};
    _this.state = {
      openSections: _openSections
    };

    if (_this.props.children.length != undefined && _this.props.children.length > 1) {
      _this.props.children.forEach(function (child) {
        if (child.props.isOpen) {
          _openSections[child.props.label] = true;
        }
      });
    }

    return _this;
  }

  _createClass(Accordion, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var onClick = this.onClick,
          children = this.props.children,
          openSections = this.state.openSections;

      if (children.length != undefined && children.length > 1) {
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            padding: "2% 5% 0% 5%"
          }
        }, children.map(function (child, i) {
          return _react["default"].createElement(_AccordionTile["default"], {
            showTrash: _this2.props.showTrash,
            deleteVariable: _this2.props.deleteVariable,
            key: i,
            isOpen: !!openSections[child.props.label],
            label: child.props.label,
            onClick: onClick
          }, child.props.children);
        }));
      } else {
        return _react["default"].createElement("div", {
          style: {
            width: "100%",
            padding: "2% 5% 0% 5%"
          }
        }, _react["default"].createElement(_AccordionTile["default"], {
          showTrash: this.props.showTrash,
          deleteVariable: this.props.deleteVariable,
          isOpen: !!openSections[children.props.label],
          label: children.props.label,
          onClick: onClick
        }, children));
      }
    }
  }]);

  return Accordion;
}(_react["default"].Component);

exports["default"] = Accordion;

_defineProperty(Accordion, "propTypes", {
  allowMultipleOpen: _propTypes["default"].bool,
  children: _propTypes["default"].instanceOf(Object).isRequired
});
//# sourceMappingURL=Accordion.js.map
