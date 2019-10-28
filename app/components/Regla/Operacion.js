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

var Operacion =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Operacion, _React$Component);

  function Operacion() {
    _classCallCheck(this, Operacion);

    return _possibleConstructorReturn(this, _getPrototypeOf(Operacion).apply(this, arguments));
  }

  _createClass(Operacion, [{
    key: "render",
    value: function render() {
      /*if(this.props.esNumero) {
          return (
              <div className={"row"}>
                  <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                      <div className={"card"}>
                          <h3 className={"card-header"}>Seleccionar Operacion</h3>
                          <div className={"card-body"}>
                              <div className={"row"}>
                                  <div className={"col-xl-3 offset-xl-1 col-3 offset-1"}>
                                      <label className={"custom-control custom-radio custom-control-inline"}>
                                          <input type="radio" value="<" name="operacionRadio" className={"custom-control-input"}/>
                                          <span className={"custom-control-label"}>
                                              <img src="./assets/equal-icons/lessThan.png" alt="" style={{height: "30px", width: "30px"}}/>
                                          </span>
                                      </label>
                                  </div>
                                  <div className={"col-xl-3 col-3"}>
                                      <label className={"custom-control custom-radio custom-control-inline"}>
                                          <input type="radio" value="<=" name="operacionRadio" className={"custom-control-input"}/>
                                          <span className={"custom-control-label"}>
                                              <img src="./assets/equal-icons/lessThanEqual.png" alt="" style={{height: "30px", width: "30px"}}/>
                                          </span>
                                      </label>
                                  </div>
                                  <div className={"col-xl-3 col-3"}>
                                      <label className={"custom-control custom-radio custom-control-inline"}>
                                          <input type="radio" value=">" name="operacionRadio" className={"custom-control-input"}/>
                                          <span className={"custom-control-label"}>
                                              <img src="./assets/equal-icons/greaterThanEqual.png" alt="" style={{height: "30px", width: "30px"}}/>
                                          </span>
                                      </label>
                                  </div>
                                  <div className={"col-xl-2 col-2"}>
                                      <label className={"custom-control custom-radio custom-control-inline"}>
                                          <input type="radio" value=">=" name="operacionRadio" className={"custom-control-input"}/>
                                          <span className={"custom-control-label"}>
                                              <img src="./assets/equal-icons/greater.png" alt="" style={{height: "30px", width: "30px"}}/>
                                          </span>
                                      </label>
                                  </div>
                              </div>
                              <br/>
                              <div className={"row"}>
                                  <div className={"col-xl-3 offset-xl-4 col-3 offset-4"}>
                                      <label className={"custom-control custom-radio custom-control-inline"}>
                                          <input type="radio" value="==" name="operacionRadio" className={"custom-control-input"}/>
                                          <span className={"custom-control-label"}>
                                              <img src="./assets/equal-icons/equal.png" alt="" style={{height: "30px", width: "30px"}}/>
                                          </span>
                                      </label>
                                  </div>
                                  <div className={"col-xl-3 col-3"}>
                                      <label className={"custom-control custom-radio custom-control-inline"}>
                                          <input type="radio" value="!=" name="operacionRadio" className={"custom-control-input"}/>
                                          <span className={"custom-control-label"}>
                                              <img src="./assets/equal-icons/not equal.png" alt="" style={{height: "30px", width: "30px"}}/>
                                          </span>
                                      </label>
                                  </div>
                              </div>
                          </div>
                          
                          <h5 className={"card-header"} style={{margin: "0px", height: "0px"}}></h5>
                          <div className={"card-body"}>
                              <div className={"row"}>
                                  <div className={"col-xl-3 offset-xl-1 col-3 offset-1"}>
                                      <label className={"custom-control custom-radio custom-control-inline"}>
                                          <input type="radio" value="+" name="operacionRadio" className={"custom-control-input"}/>
                                          <span className={"custom-control-label"}>
                                              <img src="./assets/equal-icons/plus.png" alt="" style={{height: "30px", width: "30px"}}/>
                                          </span>
                                      </label>
                                  </div>
                                  <div className={"col-xl-3 col-3"}>
                                      <label className={"custom-control custom-radio custom-control-inline"}>
                                          <input type="radio" value="-" name="operacionRadio" className={"custom-control-input"}/>
                                          <span className={"custom-control-label"}>
                                              <img src="./assets/equal-icons/minus.png" alt="" style={{height: "30px", width: "30px"}}/>
                                          </span>
                                      </label>
                                  </div>
                                  <div className={"col-xl-3 col-3"}>
                                      <label className={"custom-control custom-radio custom-control-inline"}>
                                          <input type="radio" value="*" name="operacionRadio" className={"custom-control-input"}/>
                                          <span className={"custom-control-label"}>
                                              <img src="./assets/equal-icons/asterisk.png" alt="" style={{height: "30px", width: "30px"}}/>
                                          </span>
                                      </label>
                                  </div>
                                  <div className={"col-xl-2 col-2"}>
                                      <label className={"custom-control custom-radio custom-control-inline"}>
                                          <input type="radio" value="/" name="operacionRadio" className={"custom-control-input"}/>
                                          <span className={"custom-control-label"}>
                                              <img src="./assets/equal-icons/division.png" alt="" style={{height: "30px", width: "30px"}}/>
                                          </span>
                                      </label>
                                  </div>
                              </div>
                          </div>
                       </div>
                  </div>
              </div>
          );
      } else*/
      if (this.props.esBoolean) {
        return _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "card"
        }, _react["default"].createElement("h3", {
          className: "card-header"
        }, "Seleccionar Operacion"), _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "text-center"
        }, _react["default"].createElement("label", {
          className: "custom-control custom-radio custom-control-inline"
        }, _react["default"].createElement("input", {
          type: "radio",
          value: "==",
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
        }))))))));
      } else if (this.props.esNumero || this.props.esFecha || this.props.esTexto) {
        return _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "card"
        }, _react["default"].createElement("h3", {
          className: "card-header"
        }, "Seleccionar Operacion"), _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-3 offset-xl-1 col-3 offset-1"
        }, _react["default"].createElement("label", {
          className: "custom-control custom-radio custom-control-inline"
        }, _react["default"].createElement("input", {
          type: "radio",
          value: "<",
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
          value: "<=",
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
          value: ">",
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
          value: ">=",
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
          className: "col-xl-3 offset-xl-4 col-3 offset-4"
        }, _react["default"].createElement("label", {
          className: "custom-control custom-radio custom-control-inline"
        }, _react["default"].createElement("input", {
          type: "radio",
          value: "==",
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
          value: "!=",
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
        })))))))));
      }
      /*else if(this.props.esTexto) {
        return (
            <div className={"row"}>
                <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                    <div className={"card"}>
                        <h3 className={"card-header"}>Seleccionar Operacion</h3>
                        <div className={"card-body"}>
                            <div className={"text-center"}>
                                <label className={"custom-control custom-radio custom-control-inline"}>
                                    <input type="radio" value="sumIf" name="operacionRadio" className={"custom-control-input"}/>
                                    <span className={"custom-control-label"}>
                                        <img src="./assets/varCreation/SumarSi.png" alt="" style={{height: "25px", width: "auto"}}/>
                                    </span>
                                </label>
                                <label className={"custom-control custom-radio custom-control-inline"}>
                                    <input type="radio" value="sumIfNot" name="operacionRadio" className={"custom-control-input"}/>
                                    <span className={"custom-control-label"}>
                                        <img src="./assets/varCreation/SumarSiNo.png" alt="" style={{height: "25px", width: "auto"}}/>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
      }*/
      else {
          return _react["default"].createElement("div", null);
        }
    }
  }]);

  return Operacion;
}(_react["default"].Component);

exports["default"] = Operacion;
//# sourceMappingURL=Operacion.js.map
