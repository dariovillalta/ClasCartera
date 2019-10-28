"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

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

var Valor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Valor, _React$Component);

  function Valor(props) {
    var _this;

    _classCallCheck(this, Valor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Valor).call(this, props));
    _this.state = {
      listas: [],
      variablesDeLista: []
    };
    _this.updateVariableList = _this.updateVariableList.bind(_assertThisInitialized(_this));
    _this.getLists = _this.getLists.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Valor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getLists();
    }
  }, {
    key: "getLists",
    value: function getLists() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Listas", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                listas: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "updateVariableList",
    value: function updateVariableList() {
      var _this3 = this;

      var listaID = $("#selectLista").val();

      if (listaID.length > 0) {
        if (listaID.localeCompare("table") != 0) {
          console.log(listaID);
          var transaction = new _mssql["default"].Transaction(this.props.pool);
          transaction.begin(function (err) {
            var rolledBack = false;
            transaction.on('rollback', function (aborted) {
              rolledBack = true;
            });
            var request = new _mssql["default"].Request(transaction);
            request.query("select * from VariablesdeLista where listaID = " + listaID, function (err, result) {
              if (err) {
                if (!rolledBack) {
                  console.log(err);
                  transaction.rollback(function (err) {});
                }
              } else {
                transaction.commit(function (err) {
                  var arrTemp = [];

                  for (var i = 0; i < result.recordset.length; i++) {
                    arrTemp.push({
                      ID: result.recordset[i].ID,
                      nombre: result.recordset[i].nombre,
                      tipo: result.recordset[i].tipo
                    });
                  }

                  ;

                  _this3.setState({
                    variablesDeLista: arrTemp
                  });

                  console.log(arrTemp);
                });
              }
            });
          }); // fin transaction
        } else {
          var arrTemp = [];

          for (var i = 0; i < this.props.campos.length; i++) {
            arrTemp.push({
              ID: this.props.campos[i].ID,
              nombre: this.props.campos[i].nombre,
              tipo: this.props.campos[i].tipo
            });
          }

          ;
          this.setState({
            variablesDeLista: arrTemp
          });
        }
      } else {
        this.setState({
          variablesDeLista: []
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.esNumero) {
        return _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "card"
        }, _react["default"].createElement("h3", {
          className: "card-header"
        }, "Seleccionar Campo"), _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "form-group"
        }, _react["default"].createElement("select", {
          id: "selectLista",
          className: "form-control form-control-lg",
          onChange: this.updateVariableList
        }, _react["default"].createElement("option", {
          value: ""
        }, "Seleccione una lista..."), _react["default"].createElement("option", {
          value: "table"
        }, "Campos de tabla"), this.state.listas.map(function (lista, i) {
          return _react["default"].createElement("option", {
            value: lista.ID,
            key: lista.ID
          }, lista.nombre);
        })))), _react["default"].createElement("h5", {
          className: "card-header",
          style: {
            margin: "0px"
          }
        }), _react["default"].createElement("h4", {
          className: "card-header"
        }, "Seleccionar Elementos"), _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "form-group"
        }, _react["default"].createElement("select", {
          id: "camposDeLista",
          className: "form-control form-control-lg",
          multiple: true
        }, this.state.variablesDeLista.map(function (variable, i) {
          if (variable.tipo.indexOf("int") == 0) {
            return _react["default"].createElement("option", {
              value: variable.ID,
              key: variable.ID
            }, variable.nombre);
          } else {
            return null;
          }
        })))))));
      } else if (this.props.esBoolean || this.props.esPequenoDeudor) {
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
          name: "radio-inline",
          className: "custom-control-input"
        }), _react["default"].createElement("span", {
          className: "custom-control-label"
        }, _react["default"].createElement("img", {
          src: "./assets/varCreation/Verdadero.png",
          alt: "",
          style: {
            height: "30px",
            width: "auto"
          }
        }))), _react["default"].createElement("label", {
          className: "custom-control custom-radio custom-control-inline"
        }, _react["default"].createElement("input", {
          type: "radio",
          name: "radio-inline",
          className: "custom-control-input"
        }), _react["default"].createElement("span", {
          className: "custom-control-label"
        }, _react["default"].createElement("img", {
          src: "./assets/varCreation/Falso.png",
          alt: "",
          style: {
            height: "30px",
            width: "auto"
          }
        }))))))));
      } else if (this.props.esFecha) {
        return _react["default"].createElement("div", null);
      } else if (this.props.esTexto) {
        return _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "card"
        }, _react["default"].createElement("h3", {
          className: "card-header"
        }, "Seleccionar Campo"), _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "form-group"
        }, _react["default"].createElement("select", {
          id: "selectLista",
          className: "form-control form-control-lg",
          onChange: this.updateVariableList
        }, _react["default"].createElement("option", {
          value: ""
        }, "Seleccione una lista..."), _react["default"].createElement("option", {
          value: "table"
        }, "Campos de tabla"), this.state.listas.map(function (lista, i) {
          return _react["default"].createElement("option", {
            value: lista.ID,
            key: lista.ID
          }, lista.nombre);
        })))), _react["default"].createElement("h5", {
          className: "card-header",
          style: {
            margin: "0px"
          }
        }), _react["default"].createElement("h4", {
          className: "card-header"
        }, "Seleccionar Elementos"), _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "form-group"
        }, _react["default"].createElement("select", {
          id: "camposDeLista",
          className: "form-control form-control-lg",
          multiple: true
        }, this.state.variablesDeLista.map(function (variable, i) {
          if (variable.tipo.indexOf("varchar") == 0) {
            return _react["default"].createElement("option", {
              value: variable.ID,
              key: variable.ID
            }, variable.nombre);
          } else {
            return null;
          }
        })))))));
      } else if (this.props.esGranDeudor) {
        return _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-sm-4 col-4"
        }, _react["default"].createElement("div", {
          className: "card"
        }, _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "d-inline-block text-center",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("h2", {
          className: "text-muted"
        }, "Capital M\xEDnimo"), _react["default"].createElement("input", {
          id: "capitalMinimo",
          type: "text",
          className: "form-control",
          style: {
            width: "100%"
          }
        }))))), _react["default"].createElement("div", {
          className: "col-sm-4 col-4"
        }, _react["default"].createElement("div", {
          className: "card"
        }, _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "d-inline-block text-center",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("h2", {
          className: "text-muted"
        }, "Tiempo M\xEDnimo"), _react["default"].createElement("input", {
          id: "tiempoMinimo",
          type: "text",
          className: "form-control",
          style: {
            width: "100%"
          }
        }))))), _react["default"].createElement("div", {
          className: "col-sm-4 col-4"
        }, _react["default"].createElement("div", {
          className: "card"
        }, _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "d-inline-block text-center",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("h2", {
          className: "text-muted"
        }, "Porcentaje M\xEDnimo"), _react["default"].createElement("input", {
          id: "porcentajeMinimo",
          type: "text",
          className: "form-control",
          style: {
            width: "100%"
          }
        }))))));
      } else {
        return _react["default"].createElement("div", null);
      }
    }
  }]);

  return Valor;
}(_react["default"].Component);

exports["default"] = Valor;
//# sourceMappingURL=Valor.js.map
