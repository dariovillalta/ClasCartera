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

var GuardarCategoriaClasificacionCampo =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GuardarCategoriaClasificacionCampo, _React$Component);

  function GuardarCategoriaClasificacionCampo(props) {
    var _this;

    _classCallCheck(this, GuardarCategoriaClasificacionCampo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GuardarCategoriaClasificacionCampo).call(this, props));
    _this.guardarCampoTipoCredito = _this.guardarCampoTipoCredito.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(GuardarCategoriaClasificacionCampo, [{
    key: "guardarCampoTipoCredito",
    value: function guardarCampoTipoCredito() {
      var _this2 = this;

      var nombre = $("#nombreTipoCredCampo").val();
      var descripcion = $("#descripcionTipoCredCampo").val();

      if (nombre.length > 0 && nombre.length < 101) {
        if (descripcion.length < 401) {
          var transaction = new _mssql["default"].Transaction(this.props.pool);
          transaction.begin(function (err) {
            var rolledBack = false;
            transaction.on('rollback', function (aborted) {
              rolledBack = true;
            });
            var request = new _mssql["default"].Request(transaction);
            request.query("insert into TipoCreditoCampo (tipoCreditoID, tablaID, reglaID, nombre, descripcion) values (" + _this2.props.creditoID + "," + _this2.props.tablaID + "," + _this2.props.reglaID + ",'" + nombre + "','" + descripcion + "')", function (err, result) {
              if (err) {
                if (!rolledBack) {
                  console.log(err);
                  transaction.rollback(function (err) {});
                }
              } else {
                transaction.commit(function (err) {
                  alert("Exito");
                });
              }
            });
          }); // fin transaction
        } else {
          alert("Error");
        }
      } else {
        alert("Error");
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-sm-6 col-6"
      }, _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        className: "d-inline-block text-center"
      }, _react["default"].createElement("h2", {
        className: "text-muted"
      }, "Tabla"), _react["default"].createElement("h1", {
        className: "mb-0"
      }, this.props.tabla))))), _react["default"].createElement("div", {
        className: "col-sm-6 col-6"
      }, _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        className: "d-inline-block text-center"
      }, _react["default"].createElement("h2", {
        className: "text-muted"
      }, "Tipo de Cr\xE9dito"), _react["default"].createElement("h1", {
        className: "mb-0"
      }, this.props.tipoCredito)))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-sm-4 col-4"
      }, _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        className: "d-inline-block text-center"
      }, _react["default"].createElement("h2", {
        className: "text-muted"
      }, "Campo"), _react["default"].createElement("h1", {
        className: "mb-0"
      }, this.props.campo))))), _react["default"].createElement("div", {
        className: "col-sm-4 col-4"
      }, _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        className: "d-inline-block text-center"
      }, _react["default"].createElement("h2", {
        className: "text-muted"
      }, "Operaci\xF3n"), _react["default"].createElement("h1", {
        className: "mb-0"
      }, this.props.operacion))))), _react["default"].createElement("div", {
        className: "col-sm-4 col-4"
      }, _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        className: "d-inline-block text-center"
      }, _react["default"].createElement("h2", {
        className: "text-muted"
      }, "Valor"), _react["default"].createElement("h1", {
        className: "mb-0"
      }, this.props.valor)))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-12"
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
      }, "Nombre"), _react["default"].createElement("input", {
        id: "nombreTipoCredCampo",
        type: "text",
        className: "form-control",
        style: {
          width: "100%"
        }
      })))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-12"
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
      }, "Descripci\xF3n"), _react["default"].createElement("input", {
        id: "descripcionTipoCredCampo",
        type: "text",
        className: "form-control",
        style: {
          width: "100%"
        }
      })))))), _react["default"].createElement("div", {
        className: "text-center"
      }, _react["default"].createElement("a", {
        onClick: this.guardarCampoTipoCredito,
        className: "btn btn-primary col-xs-6 col-6",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold"
        }
      }, "Guardar")), _react["default"].createElement("br", null));
    }
  }]);

  return GuardarCategoriaClasificacionCampo;
}(_react["default"].Component);

exports["default"] = GuardarCategoriaClasificacionCampo;
//# sourceMappingURL=GuardarCategoriaClasificacionCampo.js.map
