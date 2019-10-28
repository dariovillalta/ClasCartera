"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ConfigGrafico =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ConfigGrafico, _React$Component);

  function ConfigGrafico(props) {
    var _this;

    _classCallCheck(this, ConfigGrafico);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConfigGrafico).call(this, props));
    _this.state = {
      campos: [],
      campoNumero: [] //this.cambioClientes = this.cambioClientes.bind(this);

    };
    _this.loadFields = _this.loadFields.bind(_assertThisInitialized(_this));
    _this.loadSumField = _this.loadSumField.bind(_assertThisInitialized(_this));
    _this.enviarCampos = _this.enviarCampos.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ConfigGrafico, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadFields();
      this.loadSumField();
    }
  }, {
    key: "loadFields",
    value: function loadFields() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select DISTINCT nombre from ResultadosID", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              for (var i = 0; i < result.recordset.length; i++) {
                result.recordset[i].origenTabla = "ResultadosID";
              }

              ;

              var temp = _toConsumableArray(_this2.state.campos);

              temp = [].concat(_toConsumableArray(temp), _toConsumableArray(result.recordset));

              _this2.setState({
                campos: temp
              });
            });
          }
        });
      }); // fin transaction

      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request1 = new _mssql["default"].Request(transaction1);
        request1.query("select DISTINCT nombre from ResultadosDate", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction1.rollback(function (err) {});
            }
          } else {
            transaction1.commit(function (err) {
              for (var i = 0; i < result.recordset.length; i++) {
                result.recordset[i].origenTabla = "ResultadosDate";
              }

              ;

              var temp = _toConsumableArray(_this2.state.campos);

              temp = [].concat(_toConsumableArray(temp), _toConsumableArray(result.recordset));

              _this2.setState({
                campos: temp
              });
            });
          }
        });
      }); // fin transaction

      var transaction2 = new _mssql["default"].Transaction(this.props.pool);
      transaction2.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request2 = new _mssql["default"].Request(transaction2);
        request2.query("select DISTINCT nombre from ResultadosBool", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction2.rollback(function (err) {});
            }
          } else {
            transaction2.commit(function (err) {
              for (var i = 0; i < result.recordset.length; i++) {
                result.recordset[i].origenTabla = "ResultadosBool";
              }

              ;

              var temp = _toConsumableArray(_this2.state.campos);

              temp = [].concat(_toConsumableArray(temp), _toConsumableArray(result.recordset));

              _this2.setState({
                campos: temp
              });
            });
          }
        });
      }); // fin transaction

      var transaction3 = new _mssql["default"].Transaction(this.props.pool);
      transaction3.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request3 = new _mssql["default"].Request(transaction3);
        request3.query("select DISTINCT nombre from ResultadosString", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction3.rollback(function (err) {});
            }
          } else {
            transaction3.commit(function (err) {
              for (var i = 0; i < result.recordset.length; i++) {
                result.recordset[i].origenTabla = "ResultadosString";
              }

              ;

              var temp = _toConsumableArray(_this2.state.campos);

              temp = [].concat(_toConsumableArray(temp), _toConsumableArray(result.recordset));

              _this2.setState({
                campos: temp
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "loadSumField",
    value: function loadSumField() {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select DISTINCT nombre from ResultadosInt", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              for (var i = 0; i < result.recordset.length; i++) {
                result.recordset[i].origenTabla = "ResultadosInt";
              }

              ;

              var temp = _toConsumableArray(_this3.state.campoNumero);

              temp = [].concat(_toConsumableArray(temp), _toConsumableArray(result.recordset));

              _this3.setState({
                campoNumero: temp
              });
            });
          }
        });
      }); // fin transaction

      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction1.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request1 = new _mssql["default"].Request(transaction1);
        request1.query("select DISTINCT nombre from ResultadosDecimal", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction1.rollback(function (err) {});
            }
          } else {
            transaction1.commit(function (err) {
              for (var i = 0; i < result.recordset.length; i++) {
                result.recordset[i].origenTabla = "ResultadosDecimal";
              }

              ;

              var temp = _toConsumableArray(_this3.state.campoNumero);

              temp = [].concat(_toConsumableArray(temp), _toConsumableArray(result.recordset));

              _this3.setState({
                campoNumero: temp
              });
            });
          }
        });
      }); // fin transaction1
    }
  }, {
    key: "enviarCampos",
    value: function enviarCampos() {
      var indexEtiqueta = $("#indexEtiqueta").val();
      var indexNumerico = $("#indexNumerico").val();
      var fechaInicio = $("#inicio").val();
      var fechaFinal = $("#fin").val();
      console.log($("#inicio").val());

      if (indexEtiqueta != undefined && indexNumerico != undefined) {
        this.props.terminoConfigGrafico(this.state.campos[indexEtiqueta].nombre, this.state.campos[indexEtiqueta].origenTabla, this.state.campoNumero[indexNumerico].nombre, this.state.campoNumero[indexNumerico].origenTabla, fechaInicio, fechaFinal);
      } else {
        alert('Campos no validos.');
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("h3", {
        className: "card-header"
      }, "Seleccione los campos a mostrar en la grafica:"), _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("h5", null, "Agrupar valores por:")), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }
      }, _react["default"].createElement("form", {
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "form-group",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("select", {
        id: "indexEtiqueta",
        className: "form-control",
        style: {
          width: "100%"
        }
      }, this.state.campos.map(function (campo, i) {
        return _react["default"].createElement("option", {
          key: i,
          value: i
        }, campo.nombre);
      })))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("h5", null, "Valor n\xFAmerico a sumar:")), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }
      }, _react["default"].createElement("form", {
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "form-group",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("select", {
        id: "indexNumerico",
        className: "form-control",
        style: {
          width: "100%"
        }
      }, this.state.campoNumero.map(function (campoNumero, i) {
        return _react["default"].createElement("option", {
          key: i,
          value: i
        }, campoNumero.nombre);
      })))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("h5", null, "Rango de fechas a tomar:")), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"
      }, _react["default"].createElement("h6", null, "Inicio:"), _react["default"].createElement("input", {
        id: "inicio",
        type: "date"
      })), _react["default"].createElement("div", {
        className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"
      }, _react["default"].createElement("h6", null, "Fin:"), _react["default"].createElement("input", {
        id: "fin",
        type: "date"
      }))))), _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "6%",
          padding: "1% 0%"
        },
        className: "text-center"
      }, _react["default"].createElement("a", {
        onClick: this.enviarCampos,
        className: "btn btn-primary col-xs-6 col-6",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold"
        }
      }, "Iniciar ")), _react["default"].createElement("br", null));
    }
  }]);

  return ConfigGrafico;
}(_react["default"].Component);

exports["default"] = ConfigGrafico;
//# sourceMappingURL=ConfigGrafico.js.map
