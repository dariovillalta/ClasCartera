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

var InlineEdit =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InlineEdit, _React$Component);

  function InlineEdit(props) {
    var _this;

    _classCallCheck(this, InlineEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InlineEdit).call(this, props));
    _this.state = {
      editMode: false,
      texto: _this.props.texto
    };
    return _this;
  }

  _createClass(InlineEdit, [{
    key: "showEditMode",
    value: function showEditMode() {
      this.setState({
        editMode: true
      });
    }
  }, {
    key: "hideEditMode",
    value: function hideEditMode() {
      this.setState({
        editMode: false
      });
    }
  }, {
    key: "updateTexto",
    value: function updateTexto() {
      this.setState({
        texto: $("#" + this.props.id).val(),
        editMode: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.editMode) {
        return _react["default"].createElement("div", null, _react["default"].createElement("input", {
          id: this.props.id,
          defaultValue: this.state.texto,
          type: "text",
          className: "form-control"
        }), _react["default"].createElement("div", {
          style: {
            margin: "2% 0% 0% 0%"
          }
        }, _react["default"].createElement("img", {
          src: "../assets/confirm-icons/cancel.png",
          onClick: this.hideEditMode.bind(this),
          style: {
            height: "20px",
            width: "20px",
            display: "block",
            "float": "right",
            marginRight: "10px",
            cursor: "pointer"
          }
        }), _react["default"].createElement("img", {
          src: "../assets/confirm-icons/ok.png",
          onClick: this.updateTexto.bind(this),
          style: {
            height: "20px",
            width: "20px",
            display: "block",
            "float": "right",
            marginRight: "10px",
            cursor: "pointer"
          }
        })));
      } else {
        return _react["default"].createElement("div", {
          onClick: this.showEditMode.bind(this)
        }, _react["default"].createElement("h4", {
          style: {
            fontFamily: 'Circular Std Medium',
            color: "#71748d",
            cursor: "pointer"
          },
          className: "alert-heading"
        }, this.state.texto));
      }
    }
  }]);

  return InlineEdit;
}(_react["default"].Component);

exports["default"] = InlineEdit;
//# sourceMappingURL=InlineEdit.js.map
