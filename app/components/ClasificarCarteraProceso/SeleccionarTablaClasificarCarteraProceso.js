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

var SeleccionarTablaClasificarCarteraProceso =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SeleccionarTablaClasificarCarteraProceso, _React$Component);

  function SeleccionarTablaClasificarCarteraProceso(props) {
    _classCallCheck(this, SeleccionarTablaClasificarCarteraProceso);

    return _possibleConstructorReturn(this, _getPrototypeOf(SeleccionarTablaClasificarCarteraProceso).call(this, props));
  }

  _createClass(SeleccionarTablaClasificarCarteraProceso, [{
    key: "render",
    value: function render() {
      var _this = this;

      var color = [{
        clases: "btn btn-outline-primary btn-block btnWhiteColorHover"
      }, {
        clases: "btn btn-outline-secondary btn-block btnWhiteColorHover"
      }, {
        clases: "btn btn-outline-info btn-block btnWhiteColorHover"
      }, {
        clases: "btn btn-outline-success btn-block btnWhiteColorHover"
      }, {
        clases: "btn btn-outline-brand btn-block btnWhiteColorHover"
      }, {
        clases: "btn btn-outline-danger btn-block btnWhiteColorHover"
      }, {
        clases: "btn btn-outline-dark btn-block btnWhiteColorHover"
      }];
      return _react["default"].createElement("div", {
        style: {
          height: "100%",
          width: "100%",
          backgroundColor: "transparent",
          overflowX: "scroll",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          border: "solid 3px #cfd8dc",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          padding: "1%"
        }
      }, this.props.tablasOrginales.map(function (tabla, i) {
        return _react["default"].createElement("div", {
          key: tabla.ID,
          style: {
            height: "100%",
            width: "40%",
            display: "inline-block"
          }
        }, _react["default"].createElement("div", {
          style: {
            height: "100%",
            width: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react["default"].createElement("a", {
          onClick: function onClick() {
            return _this.props.selectTable(i);
          },
          className: color[i % color.length].clases
        }, tabla.nombre)));
      }));
    }
  }]);

  return SeleccionarTablaClasificarCarteraProceso;
}(_react["default"].Component);

exports["default"] = SeleccionarTablaClasificarCarteraProceso;
//# sourceMappingURL=SeleccionarTablaClasificarCarteraProceso.js.map
