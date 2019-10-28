"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _CrearTipoCredito = _interopRequireDefault(require("./CrearTipoCredito.js"));

var _EditarTipoCredito = _interopRequireDefault(require("./EditarTipoCredito.js"));

var _Accordion = _interopRequireDefault(require("../Accordion/Accordion.js"));

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
      tipoCreditosHijos: [],
      creditoSel: {},
      mostrarVista: "selTipoCredito"
    };
    _this.loadTypeCredit = _this.loadTypeCredit.bind(_assertThisInitialized(_this));
    _this.goCreateTypeCredit = _this.goCreateTypeCredit.bind(_assertThisInitialized(_this));
    _this.returnChooseTypeCredit = _this.returnChooseTypeCredit.bind(_assertThisInitialized(_this));
    _this.createCreditTypeSonsArray = _this.createCreditTypeSonsArray.bind(_assertThisInitialized(_this));
    _this.insertCreditTypeSon = _this.insertCreditTypeSon.bind(_assertThisInitialized(_this));
    _this.entrarEdit = _this.entrarEdit.bind(_assertThisInitialized(_this));
    _this.returnEditCredit = _this.returnEditCredit.bind(_assertThisInitialized(_this));
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
        request.query("select * from TipoCredito where tipoCreditoPadreID = -1", function (err, result) {
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

              _this2.createCreditTypeSonsArray();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "createCreditTypeSonsArray",
    value: function createCreditTypeSonsArray() {
      var arregloTemp = [];

      for (var i = 0; i < this.state.tipoCreditos.length; i++) {
        this.insertCreditTypeSon(this.state.tipoCreditos[i].ID, i, arregloTemp);
      }

      ;
    }
  }, {
    key: "insertCreditTypeSon",
    value: function insertCreditTypeSon(creditoID, index, array) {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from TipoCredito where tipoCreditoPadreID = " + creditoID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (array[index] == undefined) {
                array[index] = [];
              }

              array[index] = $.merge(array[index], result.recordset);

              _this3.setState({
                tipoCreditosHijos: array
              });

              console.log('array');
              console.log(array);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "goCreateTypeCredit",
    value: function goCreateTypeCredit() {
      this.setState({
        mostrarVista: "crearTipoCredito"
      });
    }
  }, {
    key: "returnChooseTypeCredit",
    value: function returnChooseTypeCredit() {
      this.setState({
        mostrarVista: "selTipoCredito"
      });
      this.loadTypeCredit();
    }
  }, {
    key: "entrarEdit",
    value: function entrarEdit(tipoCreditoN) {
      this.setState({
        creditoSel: tipoCreditoN,
        mostrarVista: "editTipoCredito"
      });
    }
  }, {
    key: "returnEditCredit",
    value: function returnEditCredit() {
      this.setState({
        mostrarVista: "editTipoCredito"
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      if (this.state.mostrarVista.localeCompare("crearTipoCredito") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CrearTipoCredito["default"], {
          tablaID: this.props.tablaID,
          pool: this.props.pool,
          retornoSelCreditos: this.returnChooseTypeCredit,
          retornoTablas: this.props.retornoTablas,
          showConfigurationComponent: this.props.showConfigurationComponent,
          tipoCreditos: this.state.tipoCreditos,
          loadTypeCredit: this.loadTypeCredit
        }, " "));
      } else if (this.state.mostrarVista.localeCompare("editTipoCredito") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_EditarTipoCredito["default"], {
          tablaID: this.props.tablaID,
          seleccionarCredito: this.props.seleccionarCredito,
          pool: this.props.pool,
          tipoCredito: this.state.creditoSel,
          retornoSelCreditos: this.returnChooseTypeCredit,
          retornoTablas: this.props.retornoTablas,
          showConfigurationComponent: this.props.showConfigurationComponent,
          tipoCreditos: this.state.tipoCreditos,
          loadTypeCredit: this.loadTypeCredit
        }, " "));
      } else if (this.state.mostrarVista.localeCompare("selTipoCredito") == 0) {
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
        }, this.state.tipoCreditos.map(function (tipoCredito, i) {
          return _react["default"].createElement(_Accordion["default"], {
            key: tipoCredito.ID,
            showTrash: false,
            showEdit: true,
            editVariable: function editVariable() {
              return _this4.entrarEdit(tipoCredito);
            },
            allowMultipleOpen: true,
            color: "#ffffff"
          }, _react["default"].createElement("div", {
            label: tipoCredito.nombre,
            key: tipoCredito.ID
          }, _this4.state.tipoCreditosHijos[i] != undefined ? _react["default"].createElement("div", null, _this4.state.tipoCreditosHijos[i].map(function (tipoCreditoH, j) {
            return _react["default"].createElement("a", {
              className: "btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM",
              onClick: function onClick() {
                return _this4.entrarEdit(tipoCreditoH);
              },
              key: tipoCreditoH.ID
            }, tipoCreditoH.nombre);
          }), _this4.state.tipoCreditosHijos[i].length == 0 ? _react["default"].createElement("a", {
            className: "btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"
          }, "No existen tipos de cr\xE9ditos creados") : _react["default"].createElement("span", null)) : _react["default"].createElement("span", null)));
        }), this.state.tipoCreditos.length == 0 ? _react["default"].createElement("a", {
          className: "btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"
        }, "No existen tipos de cr\xE9ditos creados") : _react["default"].createElement("span", null))));
      }
    }
  }]);

  return SeleccionarTipoCredito;
}(_react["default"].Component);

exports["default"] = SeleccionarTipoCredito;
//# sourceMappingURL=SeleccionarTipoCredito.js.map
