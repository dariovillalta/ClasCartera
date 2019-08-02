"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _CrearTipoCredito = _interopRequireDefault(require("./CrearTipoCredito.js"));

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

var SeleccionarTipoCredito =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SeleccionarTipoCredito, _React$Component);

  function SeleccionarTipoCredito(props) {
    var _this;

    _classCallCheck(this, SeleccionarTipoCredito);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SeleccionarTipoCredito).call(this, props));
    _this.state = {
      tipoCreditos: [],
      mostrarCreacionTipoCredito: false
    };
    _this.loadTypeCredit = _this.loadTypeCredit.bind(_assertThisInitialized(_this));
    _this.goCreateTypeCredit = _this.goCreateTypeCredit.bind(_assertThisInitialized(_this));
    _this.returnChooseTypeCredit = _this.returnChooseTypeCredit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SeleccionarTipoCredito, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadTypeCredit();
    }
  }, {
    key: "loadTypeCredit",
    value: function loadTypeCredit() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from TipoCredito where tablaID = " + _this2.props.tablaID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                tipoCreditos: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "goCreateTypeCredit",
    value: function goCreateTypeCredit() {
      this.setState({
        mostrarCreacionTipoCredito: true
      });
    }
  }, {
    key: "returnChooseTypeCredit",
    value: function returnChooseTypeCredit() {
      this.setState({
        mostrarCreacionTipoCredito: false
      });
      this.loadTypeCredit();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.mostrarCreacionTipoCredito) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CrearTipoCredito["default"], {
          tablaID: this.props.tablaID,
          pool: this.props.pool,
          retornoSelCreditos: this.returnChooseTypeCredit,
          retornoTablas: this.props.retornoTablas,
          showConfigurationComponent: this.props.showConfigurationComponent
        }, " "));
      } else {
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
          onClick: this.props.retornoTablas
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Seleccionar Tabla")), _react["default"].createElement("li", {
          className: "breadcrumb-item active",
          "aria-current": "page"
        }, "Seleccionar Tipo de Cr\xE9dito"))))))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("button", {
          onClick: this.goCreateTypeCredit,
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
        }, this.state.tipoCreditos.map(function (tipoCredito, i) {
          return _react["default"].createElement("a", {
            className: "btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM",
            onClick: function onClick() {
              return _this3.props.seleccionarCredito(tipoCredito.ID, tipoCredito.nombre);
            },
            key: tipoCredito.ID
          }, tipoCredito.nombre);
        }), this.state.tipoCreditos.length == 0 ? _react["default"].createElement("a", {
          className: "btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"
        }, "No existen tipos de cr\xE9ditos creados") : _react["default"].createElement("span", null)))))));
      }
    }
  }]);

  return SeleccionarTipoCredito;
}(_react["default"].Component);

exports["default"] = SeleccionarTipoCredito;
//# sourceMappingURL=SeleccionarTipoCredito.js.map
