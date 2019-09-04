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

var ElegirGraficos =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ElegirGraficos, _React$Component);

  function ElegirGraficos() {
    _classCallCheck(this, ElegirGraficos);

    return _possibleConstructorReturn(this, _getPrototypeOf(ElegirGraficos).apply(this, arguments));
  }

  _createClass(ElegirGraficos, [{
    key: "render",
    value: function render() {
      var _this = this;

      return _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card influencer-profile-data"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        className: "row border-top border-bottom"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12",
        style: {
          padding: "5% 2%",
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center"
        }
      }, _react["default"].createElement("h2", null, "Seleccionar Tipo de Gr\xE1fico")), _react["default"].createElement("div", {
        className: "row",
        style: {
          overflowX: "scroll",
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        style: {
          width: "33%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("div", {
        onClick: function onClick() {
          return _this.props.terminoSeleccionGrafico("pie");
        },
        style: {
          width: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8bbd0",
          borderRadius: "5px",
          cursor: "pointer"
        }
      }, _react["default"].createElement("div", {
        style: {
          padding: "4% 0%",
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("img", {
        src: "../assets/graphs-icons/pie-chart.png",
        style: {
          display: "block",
          margin: "auto"
        }
      })), _react["default"].createElement("div", {
        className: "row",
        style: {
          textAlign: "center"
        }
      }, _react["default"].createElement("p", {
        className: "lead",
        style: {
          margin: "auto"
        }
      }, "Pie"))))), _react["default"].createElement("div", {
        style: {
          width: "33%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("div", {
        onClick: function onClick() {
          return _this.props.terminoSeleccionGrafico("bar");
        },
        style: {
          width: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffecb3",
          borderRadius: "5px",
          cursor: "pointer"
        }
      }, _react["default"].createElement("div", {
        style: {
          padding: "4% 0%",
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("img", {
        src: "../assets/graphs-icons/bar-chart.png",
        style: {
          display: "block",
          margin: "auto"
        }
      })), _react["default"].createElement("div", {
        className: "row",
        style: {
          textAlign: "center"
        }
      }, _react["default"].createElement("p", {
        className: "lead",
        style: {
          margin: "auto"
        }
      }, "Bar"))))), _react["default"].createElement("div", {
        style: {
          width: "33%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("div", {
        onClick: function onClick() {
          return _this.props.terminoSeleccionGrafico("line");
        },
        style: {
          width: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#c8e6c9",
          borderRadius: "5px",
          cursor: "pointer"
        }
      }, _react["default"].createElement("div", {
        style: {
          padding: "4% 0%",
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("img", {
        src: "../assets/graphs-icons/line-chart.png",
        style: {
          display: "block",
          margin: "auto"
        }
      })), _react["default"].createElement("div", {
        className: "row",
        style: {
          textAlign: "center"
        }
      }, _react["default"].createElement("p", {
        className: "lead",
        style: {
          margin: "auto"
        }
      }, "Line"))))))))))));
    }
  }]);

  return ElegirGraficos;
}(_react["default"].Component);

exports["default"] = ElegirGraficos;
//# sourceMappingURL=ElegirGraficos.js.map
