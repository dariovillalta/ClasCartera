"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _SeleccionarTabla = _interopRequireDefault(require("../SeleccionarTabla.js"));

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

var ComportamientoPago =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ComportamientoPago, _React$Component);

  function ComportamientoPago(props) {
    var _this;

    _classCallCheck(this, ComportamientoPago);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ComportamientoPago).call(this, props));
    _this.state = {
      mostrarComponente: "selTablaPrestamo",
      idTablaSeleccionadaPrestamo: -1,
      idTablaSeleccionadaPlanPago: -1,
      camposPrestamos: [],
      camposPlanPago: []
    };
    _this.updateTableCreditID = _this.updateTableCreditID.bind(_assertThisInitialized(_this));
    _this.updateTablePayPlanID = _this.updateTablePayPlanID.bind(_assertThisInitialized(_this));
    _this.returnToTableCreditID = _this.returnToTableCreditID.bind(_assertThisInitialized(_this));
    _this.returnToTablePayPlanID = _this.returnToTablePayPlanID.bind(_assertThisInitialized(_this));
    _this.loadFieldsFromTables = _this.loadFieldsFromTables.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ComportamientoPago, [{
    key: "updateTableCreditID",
    value: function updateTableCreditID(id) {
      this.setState({
        idTablaSeleccionadaPrestamo: id,
        mostrarComponente: "selTablaPlanPago"
      });
    }
  }, {
    key: "returnToTableCreditID",
    value: function returnToTableCreditID() {
      this.setState({
        idTablaSeleccionadaPlanPago: -1,
        mostrarComponente: "selTablaPrestamo"
      });
    }
  }, {
    key: "updateTablePayPlanID",
    value: function updateTablePayPlanID(id) {
      this.setState({
        idTablaSeleccionadaPlanPago: id,
        mostrarComponente: "crearComportamientoCredito"
      });
      this.loadFieldsFromTables();
    }
  }, {
    key: "returnToTablePayPlanID",
    value: function returnToTablePayPlanID() {
      this.setState({
        mostrarComponente: "selTablaPlanPago"
      });
    }
  }, {
    key: "loadFieldsFromTables",
    value: function loadFieldsFromTables() {
      var _this2 = this;

      this.setState({
        camposPrestamos: [],
        camposPlanPago: []
      });
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Campos where tablaID = " + _this2.state.idTablaSeleccionadaPrestamo, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                camposPrestamos: result.recordset
              });
            });
          }
        });
      }); // fin transaction camposPrestamos

      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction1.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request1 = new _mssql["default"].Request(transaction1);
        request1.query("select * from Campos where tablaID = " + _this2.state.idTablaSeleccionadaPlanPago, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction1.rollback(function (err) {});
            }
          } else {
            transaction1.commit(function (err) {
              _this2.setState({
                camposPlanPago: result.recordset
              });
            });
          }
        });
      }); // fin transaction1 camposPrestamos
    }
  }, {
    key: "saveCriteriaClasification",
    value: function saveCriteriaClasification() {
      var prestamoTablaID = this.state.idTablaSeleccionadaPrestamo,
          planPagoTablaID = this.state.idTablaSeleccionadaPlanPago,
          idClientePrestamoCampoID = $("#idClientePrest").val(),
          numeroPrestamoCampoID = $("#numPrestamoPrest").val(),
          pagoCapitalPrestamoCampoID = $("#pagoCapitalPrestamoCampoID").val(),
          pagoImpuestosPrestamoCampoID = $("#pagoImpuestosPrestamoCampoID").val(),
          fechaPrestamoCampoID = $("#fechaPrestamoCampoID").val(),
          idClientePlanPagoCampoID = $("#idClientePlan").val(),
          numeroPlanPagoCampoID = $("#numPrestamoPlan").val(),
          pagoCapitalPlanPagoCampoID = $("#pagoCapitalPlanPagoCampoID").val(),
          pagoImpuestosPlanPagoCampoID = $("#pagoImpuestosPlanPagoCampoID").val(),
          fechaPlanPagoCampoID = $("#fechaPlanPagoCampoID").val(),
          comparacionEsPlanPago = "";
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into ComportamientoPago (prestamoTablaID, planPagoTablaID, idClientePrestamoCampoID , numeroPrestamoCampoID, pagoCapitalPrestamoCampoID, pagoImpuestosPrestamoCampoID, fechaPrestamoCampoID, idClientePlanPagoCampoID, numeroPlanPagoCampoID, pagoCapitalPlanPagoCampoID, pagoImpuestosPlanPagoCampoID, fechaPlanPagoCampoID, comparacionEsPlanPago) values (" + prestamoTablaID + ", " + planPagoTablaID + ", " + idClientePrestamoCampoID + ", " + numeroPrestamoCampoID + ", " + pagoCapitalPrestamoCampoID + ", " + pagoImpuestosPrestamoCampoID + ", " + fechaPrestamoCampoID + ", " + idClientePlanPagoCampoID + ", " + numeroPlanPagoCampoID + ", " + pagoCapitalPlanPagoCampoID + ", " + pagoImpuestosPlanPagoCampoID + ", " + fechaPlanPagoCampoID + ", '" + comparacionEsPlanPago + "')", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("exito");
            });
          }
        });
      }); // fin transaction camposPrestamos
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.mostrarComponente.localeCompare("selTablaPrestamo") == 0) {
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
        }, "Seleccionar Tabla de Prestamos"))))))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-lg-12"
        }, _react["default"].createElement("div", {
          className: "section-block"
        }, _react["default"].createElement("h3", {
          className: "section-title"
        }, "Seleccionar Tabla de Prestamos")))), _react["default"].createElement(_SeleccionarTabla["default"], {
          pool: this.props.pool,
          seleccionarTabla: this.updateTableCreditID
        }, " "));
      } else if (this.state.mostrarComponente.localeCompare("selTablaPlanPago") == 0) {
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
          className: "breadcrumb-item",
          "aria-current": "page",
          onClick: this.returnToTableCreditID
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Seleccionar Tabla de Prestamos")), _react["default"].createElement("li", {
          className: "breadcrumb-item active",
          "aria-current": "page"
        }, "Seleccionar Tabla de Plan de Pagos"))))))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-lg-12"
        }, _react["default"].createElement("div", {
          className: "section-block"
        }, _react["default"].createElement("h3", {
          className: "section-title"
        }, "Seleccionar Tabla de Plan de Pagos")))), _react["default"].createElement(_SeleccionarTabla["default"], {
          pool: this.props.pool,
          seleccionarTabla: this.updateTablePayPlanID
        }, " "));
      } else if (this.state.mostrarComponente.localeCompare("crearComportamientoCredito") == 0) {
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
          className: "breadcrumb-item",
          "aria-current": "page",
          onClick: this.returnToTableCreditID
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Seleccionar Tabla de Prestamos")), _react["default"].createElement("li", {
          className: "breadcrumb-item",
          "aria-current": "page",
          onClick: this.returnToTablePayPlanID
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Seleccionar Tabla de Plan de Pagos")), _react["default"].createElement("li", {
          className: "breadcrumb-item active",
          "aria-current": "page"
        }, "Relacionar Campos de Comportamiento Pago"))))))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-5 col-5"
        }, _react["default"].createElement("div", {
          className: "card"
        }, _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "campaign-info text-center",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("h3", {
          className: "mb-1"
        }, "Tabla de Pr\xE9stamos"))), _react["default"].createElement("div", {
          className: "row border-top border-bottom"
        }, _react["default"].createElement("div", {
          className: "campaign-info",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("h5", {
          className: "mb-1"
        }, "ID de Cliente"), _react["default"].createElement("div", {
          className: "form-group",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("select", {
          id: "idClientePrest",
          className: "form-control form-control-lg",
          style: {
            margin: "0 auto",
            display: "block"
          }
        }, _react["default"].createElement("option", {
          value: ""
        }, "Seleccione un campo..."), this.state.camposPrestamos.map(function (campo, i) {
          return _react["default"].createElement("option", {
            value: i,
            key: i
          }, campo.nombre);
        }))))), _react["default"].createElement("div", {
          className: "row border-top border-bottom"
        }, _react["default"].createElement("div", {
          className: "campaign-info",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("h5", {
          className: "mb-1"
        }, "N\xFAmero de Pr\xE9stamo"), _react["default"].createElement("div", {
          className: "form-group",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("select", {
          id: "numPrestamoPrest",
          className: "form-control form-control-lg",
          style: {
            margin: "0 auto",
            display: "block"
          }
        }, _react["default"].createElement("option", {
          value: ""
        }, "Seleccione un campo..."), this.state.camposPrestamos.map(function (campo, i) {
          return _react["default"].createElement("option", {
            value: i,
            key: i
          }, campo.nombre);
        }))))), _react["default"].createElement("div", {
          className: "row border-top border-bottom"
        }, _react["default"].createElement("div", {
          className: "campaign-info",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("h5", {
          className: "mb-1"
        }, "Pago de Capital"), _react["default"].createElement("div", {
          className: "form-group",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("select", {
          id: "saldoCapitaPrest",
          className: "form-control form-control-lg",
          style: {
            margin: "0 auto",
            display: "block"
          }
        }, _react["default"].createElement("option", {
          value: ""
        }, "Seleccione un campo..."), this.state.camposPrestamos.map(function (campo, i) {
          return _react["default"].createElement("option", {
            value: i,
            key: i
          }, campo.nombre);
        }))))), _react["default"].createElement("div", {
          className: "row border-top border-bottom"
        }, _react["default"].createElement("div", {
          className: "campaign-info",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("h5", {
          className: "mb-1"
        }, "Pago de Int\xE9res"), _react["default"].createElement("div", {
          className: "form-group",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("select", {
          id: "saldoImpuePrest",
          className: "form-control form-control-lg",
          style: {
            margin: "0 auto",
            display: "block"
          }
        }, _react["default"].createElement("option", {
          value: ""
        }, "Seleccione un campo..."), this.state.camposPrestamos.map(function (campo, i) {
          return _react["default"].createElement("option", {
            value: i,
            key: i
          }, campo.nombre);
        }))))), _react["default"].createElement("div", {
          className: "row border-top border-bottom"
        }, _react["default"].createElement("div", {
          className: "campaign-info",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("h5", {
          className: "mb-1"
        }, "Fecha"), _react["default"].createElement("div", {
          className: "form-group",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("select", {
          id: "numPrestamoPrest",
          className: "form-control form-control-lg",
          style: {
            margin: "0 auto",
            display: "block"
          }
        }, _react["default"].createElement("option", {
          value: ""
        }, "Seleccione un campo..."), this.state.camposPrestamos.map(function (campo, i) {
          return _react["default"].createElement("option", {
            value: i,
            key: i
          }, campo.nombre);
        })))))))), _react["default"].createElement("div", {
          className: "col-xl-5 col-xl-offset-2 col-5 offset-2"
        }, _react["default"].createElement("div", {
          className: "card"
        }, _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "campaign-info text-center",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("h3", {
          className: "mb-1"
        }, "Tabla de Plan de Pagos"))), _react["default"].createElement("div", {
          className: "row border-top border-bottom"
        }, _react["default"].createElement("div", {
          className: "campaign-info",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("h5", {
          className: "mb-1"
        }, "ID de Cliente"), _react["default"].createElement("div", {
          className: "form-group",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("select", {
          id: "idClientePlan",
          className: "form-control form-control-lg",
          style: {
            margin: "0 auto",
            display: "block"
          }
        }, _react["default"].createElement("option", {
          value: ""
        }, "Seleccione un campo..."), this.state.camposPlanPago.map(function (campo, i) {
          return _react["default"].createElement("option", {
            value: i,
            key: i
          }, campo.nombre);
        }))))), _react["default"].createElement("div", {
          className: "row border-top border-bottom"
        }, _react["default"].createElement("div", {
          className: "campaign-info",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("h5", {
          className: "mb-1"
        }, "N\xFAmero de Pr\xE9stamo"), _react["default"].createElement("div", {
          className: "form-group",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("select", {
          id: "numPrestamoPlan",
          className: "form-control form-control-lg"
        }, _react["default"].createElement("option", {
          value: ""
        }, "Seleccione un campo..."), this.state.camposPlanPago.map(function (campo, i) {
          return _react["default"].createElement("option", {
            value: i,
            key: i
          }, campo.nombre);
        }))))), _react["default"].createElement("div", {
          className: "row border-top border-bottom"
        }, _react["default"].createElement("div", {
          className: "campaign-info",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("h5", {
          className: "mb-1"
        }, "Pago de Capital"), _react["default"].createElement("div", {
          className: "form-group",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("select", {
          id: "saldoCapitaPlan",
          className: "form-control form-control-lg",
          style: {
            margin: "0 auto",
            display: "block"
          }
        }, _react["default"].createElement("option", {
          value: ""
        }, "Seleccione un campo..."), this.state.camposPlanPago.map(function (campo, i) {
          return _react["default"].createElement("option", {
            value: i,
            key: i
          }, campo.nombre);
        }))))), _react["default"].createElement("div", {
          className: "row border-top border-bottom"
        }, _react["default"].createElement("div", {
          className: "campaign-info",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("h5", {
          className: "mb-1"
        }, "Pago de Int\xE9res"), _react["default"].createElement("div", {
          className: "form-group",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("select", {
          id: "saldoImpuePlan",
          className: "form-control form-control-lg",
          style: {
            margin: "0 auto",
            display: "block"
          }
        }, _react["default"].createElement("option", {
          value: ""
        }, "Seleccione un campo..."), this.state.camposPlanPago.map(function (campo, i) {
          return _react["default"].createElement("option", {
            value: i,
            key: i
          }, campo.nombre);
        }))))), _react["default"].createElement("div", {
          className: "row border-top border-bottom"
        }, _react["default"].createElement("div", {
          className: "campaign-info",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("h5", {
          className: "mb-1"
        }, "Fecha"), _react["default"].createElement("div", {
          className: "form-group",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("select", {
          id: "numPrestamoPlan",
          className: "form-control form-control-lg",
          style: {
            margin: "0 auto",
            display: "block"
          }
        }, _react["default"].createElement("option", {
          value: ""
        }, "Seleccione un campo..."), this.state.camposPlanPago.map(function (campo, i) {
          return _react["default"].createElement("option", {
            value: i,
            key: i
          }, campo.nombre);
        }))))))))), _react["default"].createElement("div", {
          className: "text-center"
        }, _react["default"].createElement("a", {
          className: "btn btn-primary col-xs-6 col-6",
          style: {
            color: "white",
            fontSize: "1.2em",
            fontWeight: "bold"
          },
          onClick: this.props.saveCriteriaClasification
        }, "Guardar")), _react["default"].createElement("br", null));
      }
    }
  }]);

  return ComportamientoPago;
}(_react["default"].Component);

exports["default"] = ComportamientoPago;
//# sourceMappingURL=ComportamientoPago.js.map
