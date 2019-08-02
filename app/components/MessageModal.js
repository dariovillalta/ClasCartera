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

var MessageModal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MessageModal, _React$Component);

  function MessageModal() {
    _classCallCheck(this, MessageModal);

    return _possibleConstructorReturn(this, _getPrototypeOf(MessageModal).call(this));
  }

  _createClass(MessageModal, [{
    key: "render",
    value: function render() {
      if (this.props.esError) {
        return _react["default"].createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            position: "fixed",
            top: "0px",
            left: "0px",
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: "9999",
            overflow: "hidden"
          }
        }, _react["default"].createElement("div", null, _react["default"].createElement("div", {
          className: "alert alert-danger alert-dismissible fade show",
          style: {
            top: "0px",
            width: "100vw"
          },
          role: "alert"
        }, _react["default"].createElement("h4", {
          className: "alert-heading"
        }, this.props.titulo), _react["default"].createElement("hr", null), _react["default"].createElement("p", {
          className: "mb-0"
        }, this.props.mensaje), _react["default"].createElement("a", {
          className: "close",
          "data-dismiss": "alert",
          onClick: this.props.dismissMessage
        }, _react["default"].createElement("span", null, "\xD7")))));
      } else if (this.props.esConfirmar) {
        return _react["default"].createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            position: "fixed",
            top: "0px",
            left: "0px",
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: "9999",
            overflow: "hidden"
          }
        }, _react["default"].createElement("div", null, _react["default"].createElement("div", {
          className: "alert alert-warning alert-dismissible fade show",
          style: {
            top: "0px",
            width: "100vw"
          },
          role: "alert"
        }, _react["default"].createElement("h4", {
          className: "alert-heading"
        }, this.props.titulo), _react["default"].createElement("hr", null), _react["default"].createElement("p", {
          className: "mb-0"
        }, this.props.mensaje), _react["default"].createElement("a", {
          className: "close",
          "data-dismiss": "alert",
          onClick: this.props.dismissMessage
        }, _react["default"].createElement("span", null, "\xD7")), _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("button", {
          onClick: this.props.dismissMessage,
          className: "btn btn-danger btn-block col-xl-3 col-3",
          style: {
            margin: "0 auto",
            display: "block"
          }
        }, "Cerrar"), _react["default"].createElement("button", {
          onClick: this.props.confirmFunction,
          className: "btn btn-success btn-block col-xl-4 col-4",
          style: {
            margin: "0 auto",
            display: "block"
          }
        }, "Confirmar")))));
      } else {
        return _react["default"].createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            position: "fixed",
            top: "0px",
            left: "0px",
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: "9999",
            overflow: "hidden"
          }
        }, _react["default"].createElement("div", null, _react["default"].createElement("div", {
          className: "alert alert-success alert-dismissible fade show",
          style: {
            top: "0px",
            width: "100vw"
          },
          role: "alert"
        }, _react["default"].createElement("h4", {
          className: "alert-heading"
        }, this.props.titulo), _react["default"].createElement("hr", null), _react["default"].createElement("p", {
          className: "mb-0"
        }, this.props.mensaje))));
      }
    }
  }]);

  return MessageModal;
}(_react["default"].Component);

exports["default"] = MessageModal;
//# sourceMappingURL=MessageModal.js.map
