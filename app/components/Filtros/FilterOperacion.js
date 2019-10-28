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

var FilterOperacion =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FilterOperacion, _React$Component);

  function FilterOperacion() {
    _classCallCheck(this, FilterOperacion);

    return _possibleConstructorReturn(this, _getPrototypeOf(FilterOperacion).apply(this, arguments));
  }

  _createClass(FilterOperacion, [{
    key: "render",
    value: function render() {
      if (this.props.esBoolean) {
        return _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("h3", null, "Seleccionar Operaci\xF3n"), _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "text-center"
        }, _react["default"].createElement("label", {
          className: "custom-control custom-radio custom-control-inline"
        }, _react["default"].createElement("input", {
          type: "radio",
          id: "igualBoolean",
          value: "!=",
          name: "operacionRadio",
          className: "custom-control-input"
        }), _react["default"].createElement("span", {
          className: "custom-control-label"
        }, _react["default"].createElement("img", {
          src: "./assets/equal-icons/equal.png",
          alt: "",
          style: {
            height: "30px",
            width: "30px"
          }
        })))))));
      } else if (this.props.esNumero || this.props.esFecha) {
        return _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("h3", null, "Seleccionar Operaci\xF3n"), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-3 col-3"
        }, _react["default"].createElement("label", {
          className: "custom-control custom-radio custom-control-inline"
        }, _react["default"].createElement("input", {
          type: "radio",
          id: "menorNumFecha",
          value: ">=",
          name: "operacionRadio",
          className: "custom-control-input"
        }), _react["default"].createElement("span", {
          className: "custom-control-label"
        }, _react["default"].createElement("img", {
          src: "./assets/equal-icons/lessThan.png",
          alt: "",
          style: {
            height: "30px",
            width: "30px"
          }
        })))), _react["default"].createElement("div", {
          className: "col-xl-3 col-3"
        }, _react["default"].createElement("label", {
          className: "custom-control custom-radio custom-control-inline"
        }, _react["default"].createElement("input", {
          type: "radio",
          id: "menorIgualNumFecha",
          value: ">",
          name: "operacionRadio",
          className: "custom-control-input"
        }), _react["default"].createElement("span", {
          className: "custom-control-label"
        }, _react["default"].createElement("img", {
          src: "./assets/equal-icons/lessThanEqual.png",
          alt: "",
          style: {
            height: "30px",
            width: "30px"
          }
        })))), _react["default"].createElement("div", {
          className: "col-xl-3 col-3"
        }, _react["default"].createElement("label", {
          className: "custom-control custom-radio custom-control-inline"
        }, _react["default"].createElement("input", {
          type: "radio",
          id: "mayorIgualNumFecha",
          value: "<=",
          name: "operacionRadio",
          className: "custom-control-input"
        }), _react["default"].createElement("span", {
          className: "custom-control-label"
        }, _react["default"].createElement("img", {
          src: "./assets/equal-icons/greaterThanEqual.png",
          alt: "",
          style: {
            height: "30px",
            width: "30px"
          }
        })))), _react["default"].createElement("div", {
          className: "col-xl-2 col-2"
        }, _react["default"].createElement("label", {
          className: "custom-control custom-radio custom-control-inline"
        }, _react["default"].createElement("input", {
          type: "radio",
          id: "mayorNumFecha",
          value: "<",
          name: "operacionRadio",
          className: "custom-control-input"
        }), _react["default"].createElement("span", {
          className: "custom-control-label"
        }, _react["default"].createElement("img", {
          src: "./assets/equal-icons/greater.png",
          alt: "",
          style: {
            height: "30px",
            width: "30px"
          }
        }))))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-3 offset-xl-3 col-3 offset-3"
        }, _react["default"].createElement("label", {
          className: "custom-control custom-radio custom-control-inline"
        }, _react["default"].createElement("input", {
          type: "radio",
          id: "igualNumFecha",
          value: "!=",
          name: "operacionRadio",
          className: "custom-control-input"
        }), _react["default"].createElement("span", {
          className: "custom-control-label"
        }, _react["default"].createElement("img", {
          src: "./assets/equal-icons/equal.png",
          alt: "",
          style: {
            height: "30px",
            width: "30px"
          }
        })))), _react["default"].createElement("div", {
          className: "col-xl-3 col-3"
        }, _react["default"].createElement("label", {
          className: "custom-control custom-radio custom-control-inline"
        }, _react["default"].createElement("input", {
          type: "radio",
          id: "noIgualNumFecha",
          value: "=",
          name: "operacionRadio",
          className: "custom-control-input"
        }), _react["default"].createElement("span", {
          className: "custom-control-label"
        }, _react["default"].createElement("img", {
          src: "./assets/equal-icons/not equal.png",
          alt: "",
          style: {
            height: "30px",
            width: "30px"
          }
        })))))));
      } else if (this.props.esTexto) {
        return _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("h3", null, "Seleccionar Operaci\xF3n"), _react["default"].createElement("div", {
          className: "text-center"
        }, _react["default"].createElement("label", {
          className: "custom-control custom-radio custom-control-inline"
        }, _react["default"].createElement("input", {
          type: "radio",
          id: "igualTexto",
          value: "!=",
          name: "operacionRadio",
          className: "custom-control-input"
        }), _react["default"].createElement("span", {
          className: "custom-control-label"
        }, _react["default"].createElement("img", {
          src: "./assets/varCreation/SumarSi.png",
          alt: "",
          style: {
            height: "25px",
            width: "auto"
          }
        }))), _react["default"].createElement("label", {
          className: "custom-control custom-radio custom-control-inline"
        }, _react["default"].createElement("input", {
          type: "radio",
          id: "noIgualTexto",
          value: "=",
          name: "operacionRadio",
          className: "custom-control-input"
        }), _react["default"].createElement("span", {
          className: "custom-control-label"
        }, _react["default"].createElement("img", {
          src: "./assets/varCreation/SumarSiNo.png",
          alt: "",
          style: {
            height: "25px",
            width: "auto"
          }
        }))))));
      } else {
        return _react["default"].createElement("div", null);
      }
    }
  }]);

  return FilterOperacion;
}(_react["default"].Component);

exports["default"] = FilterOperacion;
//# sourceMappingURL=FilterOperacion.js.map
