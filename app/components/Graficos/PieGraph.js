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

var PieGraph =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PieGraph, _React$Component);

  function PieGraph(props) {
    _classCallCheck(this, PieGraph);

    return _possibleConstructorReturn(this, _getPrototypeOf(PieGraph).call(this, props));
  }

  _createClass(PieGraph, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var chartClientes = c3.generate({
        bindto: "#resultado",
        data: {
          columns: [['Créditos Buenos', 5620029.11], ['Créditos Especialmente Mencionados', 7981023], ['Créditos Bajo Norma', 13420089.78], ['Créditos de Dudosa Recuperación', 7419023.52], ['Créditos de Pérdida', 2570891.44]],
          type: 'pie',
          colors: {
            data1: '#5969ff',
            data2: '#ff407b',
            data3: '#b39ddb',
            data4: '#80deea',
            data5: '#ffcc80'
          }
        },
        pie: {
          label: {
            format: function format(value, ratio, id) {
              return d3.format('$')(value);
            }
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

  return PieGraph;
}(_react["default"].Component);

exports["default"] = PieGraph;
//# sourceMappingURL=PieGraph.js.map
