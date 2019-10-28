"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _FilterVariableCreation = _interopRequireDefault(require("./FilterVariableCreation.js"));

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

var filtrosInt = [];
var filtrosDecimal = [];
var filtrosDate = [];
var filtrosBool = [];
var filtrosString = [];

var CrearFiltro =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CrearFiltro, _React$Component);

  function CrearFiltro(props) {
    var _this;

    _classCallCheck(this, CrearFiltro);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CrearFiltro).call(this, props));
    _this.state = {
      tipoCampo: {
        esNumero: true,
        esBoolean: false,
        esFecha: false,
        esTexto: false
      },
      tablaSeleccionada: "clientes",
      colorDeTablaSeleccionada: "#8c9eff",
      bordeDeTablaSeleccionada: "2px solid #536dfe",
      campos: []
    };
    _this.esNumero = _this.esNumero.bind(_assertThisInitialized(_this));
    _this.esBoolean = _this.esBoolean.bind(_assertThisInitialized(_this));
    _this.esFecha = _this.esFecha.bind(_assertThisInitialized(_this));
    _this.esTexto = _this.esTexto.bind(_assertThisInitialized(_this));
    _this.cambioClientes = _this.cambioClientes.bind(_assertThisInitialized(_this));
    _this.cambioPrestamos = _this.cambioPrestamos.bind(_assertThisInitialized(_this));
    _this.cambioPagos = _this.cambioPagos.bind(_assertThisInitialized(_this));
    _this.cambioPlanPagos = _this.cambioPlanPagos.bind(_assertThisInitialized(_this));
    _this.loadFields = _this.loadFields.bind(_assertThisInitialized(_this));
    _this.insertFilter = _this.insertFilter.bind(_assertThisInitialized(_this));
    _this.deleteFromFilter = _this.deleteFromFilter.bind(_assertThisInitialized(_this));
    _this.checkFieldType = _this.checkFieldType.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CrearFiltro, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadFields("Cliente");
      filtrosInt = [];
      filtrosDecimal = [];
      filtrosDate = [];
      filtrosBool = [];
      filtrosString = [];
    }
  }, {
    key: "loadFields",
    value: function loadFields(objeto) {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select DISTINCT nombre, tipo from Campos where tabla = '" + objeto + "'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                campos: result.recordset
              });

              _this2.checkFieldType();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "esNumero",
    value: function esNumero() {
      this.setState({
        tipoCampo: {
          esNumero: true,
          esBoolean: false,
          esFecha: false,
          esTexto: false
        }
      });
    }
  }, {
    key: "esBoolean",
    value: function esBoolean() {
      this.setState({
        tipoCampo: {
          esNumero: false,
          esBoolean: true,
          esFecha: false,
          esTexto: false
        }
      });
    }
  }, {
    key: "esFecha",
    value: function esFecha() {
      this.setState({
        tipoCampo: {
          esNumero: false,
          esBoolean: false,
          esFecha: true,
          esTexto: false
        }
      });
    }
  }, {
    key: "esTexto",
    value: function esTexto() {
      this.setState({
        tipoCampo: {
          esNumero: false,
          esBoolean: false,
          esFecha: false,
          esTexto: true
        }
      });
    }
  }, {
    key: "cambioClientes",
    value: function cambioClientes() {
      this.setState({
        tablaSeleccionada: "clientes",
        colorDeTablaSeleccionada: "#8c9eff",
        bordeDeTablaSeleccionada: "2px solid #536dfe"
      });
      this.loadFields("Cliente");
      this.checkFieldType();
    }
  }, {
    key: "cambioPrestamos",
    value: function cambioPrestamos() {
      this.setState({
        tablaSeleccionada: "prestamos",
        colorDeTablaSeleccionada: "#f8bbd0",
        bordeDeTablaSeleccionada: "2px solid #f50057"
      });
      this.loadFields("Préstamo");
      this.checkFieldType();
    }
  }, {
    key: "cambioPagos",
    value: function cambioPagos() {
      this.setState({
        tablaSeleccionada: "pagos",
        colorDeTablaSeleccionada: "#e0f7fa",
        bordeDeTablaSeleccionada: "2px solid #4fc3f7"
      });
      this.loadFields("Pagos");
      this.checkFieldType();
    }
  }, {
    key: "cambioPlanPagos",
    value: function cambioPlanPagos() {
      this.setState({
        tablaSeleccionada: "planpagos",
        colorDeTablaSeleccionada: "#ffecb3",
        bordeDeTablaSeleccionada: "2px solid #ffd740"
      });
      this.loadFields("PlanPagos");
      this.checkFieldType();
    }
  }, {
    key: "insertFilter",
    value: function insertFilter(filtro) {
      console.log(filtro);

      if (filtro[0].tipo.localeCompare("int") == 0) {
        for (var i = 0; i < filtro.length; i++) {
          filtrosInt.push(filtro[i]);
        }

        ;
        this.props.updatefilter(filtrosInt);
      } else if (filtro[0].tipo.localeCompare("decimal") == 0) {
        for (var i = 0; i < filtro.length; i++) {
          filtrosDecimal.push(filtro[i]);
        }

        ;
        this.props.updatefilter(filtrosDecimal);
      } else if (filtro[0].tipo.localeCompare("date") == 0) {
        for (var i = 0; i < filtro.length; i++) {
          filtrosDate.push(filtro[i]);
        }

        ;
        this.props.updatefilter(filtrosDate);
      } else if (filtro[0].tipo.localeCompare("bool") == 0) {
        for (var i = 0; i < filtro.length; i++) {
          filtrosBool.push(filtro[i]);
        }

        ;
        this.props.updatefilter(filtrosBool);
      } else if (filtro[0].tipo.localeCompare("varchar") == 0) {
        for (var i = 0; i < filtro.length; i++) {
          filtrosString.push(filtro[i]);
        }

        ;
        this.props.updatefilter(filtrosString);
      }
    }
  }, {
    key: "deleteFromFilter",
    value: function deleteFromFilter(index, type) {
      if (type.localeCompare("int") == 0) {
        filtrosInt.splice(index, 1);
        this.props.updatefilter(filtrosInt);
      } else if (type.localeCompare("decimal") == 0) {
        filtrosDecimal.splice(index, 1);
        this.props.updatefilter(filtrosDecimal);
      } else if (type.localeCompare("bool") == 0) {
        filtrosBool.splice(index, 1);
        this.props.updatefilter(filtrosBool);
      } else if (type.localeCompare("date") == 0) {
        filtrosDate.splice(index, 1);
        this.props.updatefilter(filtrosDate);
      } else if (type.localeCompare("varchar") == 0) {
        filtrosString.splice(index, 1);
        this.props.updatefilter(filtrosString);
      }
    }
  }, {
    key: "checkFieldType",
    value: function checkFieldType() {
      var valor = $('#campo').prop('selectedIndex');
      console.log("valor = " + valor);
      console.log(this.state.campos);

      if (valor.toString().length > 0) {
        var campoSeleccionado = this.state.campos[valor];

        if (campoSeleccionado.tipo.indexOf("int") == 0) {
          this.esNumero();
        } else if (campoSeleccionado.tipo.indexOf("bit") == 0) {
          this.esBoolean();
        } else if (campoSeleccionado.tipo.indexOf("date") == 0) {
          this.esFecha();
        } else if (campoSeleccionado.tipo.indexOf("varchar") == 0) {
          this.esTexto();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react["default"].createElement("div", {
        style: {
          height: "82vh"
        }
      }, _react["default"].createElement("div", {
        className: "row border-top border-bottom",
        style: {
          height: "94%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-4 col-4",
        style: {
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "25%",
          padding: '5%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#8c9eff",
          border: "2px solid #536dfe",
          cursor: "pointer"
        },
        onClick: this.cambioClientes
      }, _react["default"].createElement("div", {
        style: {
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        style: {
          height: "80%",
          margin: '0% 0% 5% 0%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("img", {
        src: "./assets/filter-icons/client.png",
        alt: "",
        style: {
          height: "100%",
          width: "100%"
        }
      })), _react["default"].createElement("div", {
        style: {
          height: "20%"
        }
      }, _react["default"].createElement("h3", {
        className: "product-title",
        style: {
          textAlign: "center"
        }
      }, "Clientes")))), _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "25%",
          padding: '5%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8bbd0",
          border: "2px solid #f50057",
          cursor: "pointer"
        },
        onClick: this.cambioPrestamos
      }, _react["default"].createElement("div", {
        style: {
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        style: {
          height: "80%",
          margin: '0% 0% 5% 0%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("img", {
        src: "./assets/filter-icons/loan.png",
        alt: "",
        style: {
          height: "100%",
          width: "100%"
        }
      })), _react["default"].createElement("div", {
        style: {
          height: "20%"
        }
      }, _react["default"].createElement("h3", {
        className: "product-title",
        style: {
          textAlign: "center"
        }
      }, "Pr\xE9stamos")))), _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "25%",
          padding: '5%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e0f7fa",
          border: "2px solid #4fc3f7",
          cursor: "pointer"
        },
        onClick: this.cambioPagos
      }, _react["default"].createElement("div", {
        style: {
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        style: {
          height: "80%",
          margin: '0% 0% 5% 0%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("img", {
        src: "./assets/filter-icons/pay.png",
        alt: "",
        style: {
          height: "100%",
          width: "100%"
        }
      })), _react["default"].createElement("div", {
        style: {
          height: "20%"
        }
      }, _react["default"].createElement("h3", {
        className: "product-title",
        style: {
          textAlign: "center"
        }
      }, "Pagos")))), _react["default"].createElement("div", {
        className: "row",
        style: {
          height: "25%",
          padding: '5%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffecb3",
          border: "2px solid #ffd740",
          cursor: "pointer"
        },
        onClick: this.cambioPlanPagos
      }, _react["default"].createElement("div", {
        style: {
          height: "100%"
        }
      }, _react["default"].createElement("div", {
        style: {
          height: "80%",
          margin: '0% 0% 5% 0%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("img", {
        src: "./assets/filter-icons/payplan.png",
        alt: "",
        style: {
          height: "100%",
          width: "100%"
        }
      })), _react["default"].createElement("div", {
        style: {
          height: "20%"
        }
      }, _react["default"].createElement("h3", {
        className: "product-title",
        style: {
          textAlign: "center"
        }
      }, "Plan de Pagos"))))), _react["default"].createElement("div", {
        className: "col-xl-8 col-8",
        style: {
          height: "100%",
          backgroundColor: this.state.colorDeTablaSeleccionada,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, _react["default"].createElement("div", null, _react["default"].createElement(_FilterVariableCreation["default"], {
        esNumero: this.esNumero,
        esBoolean: this.esBoolean,
        esFecha: this.esFecha,
        esTexto: this.esTexto,
        tipoCampo: this.state.tipoCampo,
        insertFilter: this.insertFilter,
        campos: this.state.campos,
        bordeDeTablaSeleccionada: this.state.bordeDeTablaSeleccionada,
        pool: this.props.pool
      }, " ")))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card influencer-profile-data"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("table", {
        className: "table table-striped"
      }, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        scope: "col"
      }, "#"), _react["default"].createElement("th", {
        scope: "col"
      }, "Filtro"), _react["default"].createElement("th", {
        scope: "col"
      }))), _react["default"].createElement("tbody", null, filtrosInt.map(function (filtro, i) {
        return _react["default"].createElement("tr", {
          key: i + filtro.texto
        }, _react["default"].createElement("th", {
          scope: "row"
        }, i), _react["default"].createElement("td", null, filtro.texto), _react["default"].createElement("td", null, _react["default"].createElement("img", {
          onClick: function onClick() {
            return _this3.deleteFromFilter(i, "int");
          },
          src: "../assets/trash.png",
          style: {
            height: "20px",
            width: "20px"
          }
        })));
      }), filtrosDecimal.map(function (filtro, i) {
        return _react["default"].createElement("tr", {
          key: i + filtro.texto
        }, _react["default"].createElement("th", {
          scope: "row"
        }, i), _react["default"].createElement("td", null, filtro.texto), _react["default"].createElement("td", null, _react["default"].createElement("img", {
          onClick: function onClick() {
            return _this3.deleteFromFilter(i, "decimal");
          },
          src: "../assets/trash.png",
          style: {
            height: "20px",
            width: "20px",
            cursor: 'pointer'
          }
        })));
      }), filtrosDate.map(function (filtro, i) {
        return _react["default"].createElement("tr", {
          key: i + filtro.texto
        }, _react["default"].createElement("th", {
          scope: "row"
        }, i), _react["default"].createElement("td", null, filtro.texto), _react["default"].createElement("td", null, _react["default"].createElement("img", {
          onClick: function onClick() {
            return _this3.deleteFromFilter(i, "date");
          },
          src: "../assets/trash.png",
          style: {
            height: "20px",
            width: "20px",
            cursor: 'pointer'
          }
        })));
      }), filtrosBool.map(function (filtro, i) {
        return _react["default"].createElement("tr", {
          key: i + filtro.texto
        }, _react["default"].createElement("th", {
          scope: "row"
        }, i), _react["default"].createElement("td", null, filtro.texto), _react["default"].createElement("td", null, _react["default"].createElement("img", {
          onClick: function onClick() {
            return _this3.deleteFromFilter(i, "bool");
          },
          src: "../assets/trash.png",
          style: {
            height: "20px",
            width: "20px",
            cursor: 'pointer'
          }
        })));
      }), filtrosString.map(function (filtro, i) {
        return _react["default"].createElement("tr", {
          key: i + filtro.texto
        }, _react["default"].createElement("th", {
          scope: "row"
        }, i), _react["default"].createElement("td", null, filtro.texto), _react["default"].createElement("td", null, _react["default"].createElement("img", {
          onClick: function onClick() {
            return _this3.deleteFromFilter(i, "varchar");
          },
          src: "../assets/trash.png",
          style: {
            height: "20px",
            width: "20px",
            cursor: 'pointer'
          }
        })));
      }))))))), _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "6%",
          padding: "1% 0%"
        },
        className: "text-center"
      }, _react["default"].createElement("a", {
        onClick: this.props.callbackComponent,
        className: "btn btn-primary col-xs-6 col-6",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold"
        }
      }, "Avanzar")), _react["default"].createElement("br", null));
    }
  }]);

  return CrearFiltro;
}(_react["default"].Component);

exports["default"] = CrearFiltro;
//# sourceMappingURL=CrearFiltro.js.map
