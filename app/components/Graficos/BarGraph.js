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

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var c3 = require("c3");

var d3 = require("d3");

var BarGraph =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BarGraph, _React$Component);

  function BarGraph(props) {
    _classCallCheck(this, BarGraph);

    return _possibleConstructorReturn(this, _getPrototypeOf(BarGraph).call(this, props));
  }

  _createClass(BarGraph, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var chart = c3.generate({
        bindto: "#resultado",
        data: {
          columns: [['data1', 30, 200, 100, 400, 150, 250], ['data2', 130, 100, 140, 200, 150, 50]],
          type: 'bar'
        },
        bar: {
          width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
            // or
            //width: 100 // this makes bar width 100px

          }
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("h5", {
        className: "card-header"
      }, "Gr\xE1fico"), _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        id: "resultado"
      })))));
    }
  }]);

  return BarGraph;
}(_react["default"].Component);

exports["default"] = BarGraph;
//# sourceMappingURL=BarGraph.js.map
