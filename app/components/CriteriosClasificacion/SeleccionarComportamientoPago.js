"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _ComportamientoPago = _interopRequireDefault(require("./ComportamientoPago.js"));

var _EditarComportamientoPago = _interopRequireDefault(require("./EditarComportamientoPago.js"));

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

var SeleccionarComportamientoPago =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SeleccionarComportamientoPago, _React$Component);

  function SeleccionarComportamientoPago(props) {
    var _this;

    _classCallCheck(this, SeleccionarComportamientoPago);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SeleccionarComportamientoPago).call(this, props));
    _this.state = {
      comportamientoPagos: [],
      comportamientoPagoSel: {},
      mostrarVista: "selComportamientoPago"
    };
    _this.loadComportamientoPago = _this.loadComportamientoPago.bind(_assertThisInitialized(_this));
    _this.loadNombreTabla = _this.loadNombreTabla.bind(_assertThisInitialized(_this));
    _this.goCreateComportamientoPago = _this.goCreateComportamientoPago.bind(_assertThisInitialized(_this));
    _this.returnChooseComportamientoPago = _this.returnChooseComportamientoPago.bind(_assertThisInitialized(_this));
    _this.entrarEdit = _this.entrarEdit.bind(_assertThisInitialized(_this));
    _this.returnEdit = _this.returnEdit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SeleccionarComportamientoPago, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadComportamientoPago();
    }
  }, {
    key: "loadComportamientoPago",
    value: function loadComportamientoPago() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ComportamientoPago", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                comportamientoPagos: result.recordset
              });

              for (var i = 0; i < result.recordset.length; i++) {
                _this2.loadNombreTabla(i, result.recordset[i].prestamoTablaID);
              }

              ;
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "loadNombreTabla",
    value: function loadNombreTabla(index, idTabla) {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Tablas where ID = " + idTabla, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                var copiaArr = _toConsumableArray(_this3.state.comportamientoPagos);

                var copiaObj = copiaArr[index];
                copiaObj.nombreTablaPrestamos = result.recordset[0].nombre;
                copiaArr.splice(index, 1, copiaObj);

                _this3.setState({
                  comportamientoPagos: copiaArr
                });
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "goCreateComportamientoPago",
    value: function goCreateComportamientoPago() {
      this.setState({
        mostrarVista: "crearComportamientoPago"
      });
    }
  }, {
    key: "returnChooseComportamientoPago",
    value: function returnChooseComportamientoPago() {
      this.setState({
        mostrarVista: "selComportamientoPago"
      });
      this.loadComportamientoPago();
    }
  }, {
    key: "entrarEdit",
    value: function entrarEdit(catClasN) {
      this.setState({
        comportamientoPagoSel: catClasN,
        mostrarVista: "editComportamientoPago"
      });
    }
  }, {
    key: "returnEdit",
    value: function returnEdit() {
      this.setState({
        mostrarVista: "editComportamientoPago"
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      if (this.state.mostrarVista.localeCompare("crearComportamientoPago") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_ComportamientoPago["default"], {
          pool: this.props.pool,
          showCriteriosClasificacion: this.props.showCriteriosClasificacion,
          returnChooseComportamientoPago: this.returnChooseComportamientoPago,
          showConfigurationComponent: this.props.showConfigurationComponent
        }, " "));
      } else if (this.state.mostrarVista.localeCompare("editComportamientoPago") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_EditarComportamientoPago["default"], {
          comportamientoPagoSel: this.state.comportamientoPagoSel,
          pool: this.props.pool,
          returnChooseComportamientoPago: this.returnChooseComportamientoPago,
          showConfigurationComponent: this.props.showConfigurationComponent
        }, " "));
      } else if (this.state.mostrarVista.localeCompare("selComportamientoPago") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "page-header"
        }, _react["default"].createElement("h2", {
          className: "pageheader-title"
        }, "Configuraci\xF3n"), _react["default"].createElement("div", {
          className: "page-breadcrumb"
        }, _react["default"].createElement("nav", {
          "aria-label": "breadcrumb"
        }, _react["default"].createElement("ol", {
          className: "breadcrumb"
        }, _react["default"].createElement("li", {
          className: "breadcrumb-item",
          "aria-current": "page",
          onClick: this.props.showConfigurationComponent
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Configuraci\xF3n")), _react["default"].createElement("li", {
          className: "breadcrumb-item",
          "aria-current": "page",
          onClick: this.props.showCriteriosClasificacion
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Criterios de Clasificaci\xF3n")), _react["default"].createElement("li", {
          className: "breadcrumb-item active",
          "aria-current": "page"
        }, "Seleccionar Comportamiento de Pago"))))))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("button", {
          onClick: this.goCreateComportamientoPago,
          className: "btn btn-success btn-block col-xl-10 col-10",
          style: {
            color: "white",
            fontSize: "1.2em",
            fontWeight: "bold",
            margin: "0 auto",
            display: "block"
          }
        }, "Crear")), _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "card influencer-profile-data"
        }, _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "row border-top border-bottom addPaddingToConfig"
        }, this.state.comportamientoPagos.map(function (comportamientoPago, i) {
          return _react["default"].createElement("a", {
            className: "btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM",
            onClick: function onClick() {
              return _this4.entrarEdit(comportamientoPago);
            },
            key: comportamientoPago.ID
          }, "Tabla de préstamos: " + comportamientoPago.nombreTablaPrestamos);
        }), this.state.comportamientoPagos.length == 0 ? _react["default"].createElement("a", {
          className: "btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"
        }, "No existen comportamientos de pagos creados") : _react["default"].createElement("span", null)))))));
      }
    }
  }]);

  return SeleccionarComportamientoPago;
}(_react["default"].Component);

exports["default"] = SeleccionarComportamientoPago;
//# sourceMappingURL=SeleccionarComportamientoPago.js.map
