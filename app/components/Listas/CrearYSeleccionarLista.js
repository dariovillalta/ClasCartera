"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _InlineEdit = _interopRequireDefault(require("../InlineEdit.js"));

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

var campos = [{
  nombre: "varchar"
}, {
  nombre: "bit"
}, {
  nombre: "date"
}, {
  nombre: "int"
}, {
  nombre: "decimal"
}];

var CrearYSeleccionarLista =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CrearYSeleccionarLista, _React$Component);

  function CrearYSeleccionarLista(props) {
    var _this;

    _classCallCheck(this, CrearYSeleccionarLista);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CrearYSeleccionarLista).call(this, props));
    _this.state = {
      listas: [],
      listaSeleccionada: -1,
      listaSeleccionadaNombre: "",
      mostrar: "selLista",
      variablesDeLista: []
    };
    _this.loadLists = _this.loadLists.bind(_assertThisInitialized(_this));
    _this.seleccionarLista = _this.seleccionarLista.bind(_assertThisInitialized(_this));
    _this.createList = _this.createList.bind(_assertThisInitialized(_this));
    _this.regresarSeleccionarLista = _this.regresarSeleccionarLista.bind(_assertThisInitialized(_this));
    _this.createElementList = _this.createElementList.bind(_assertThisInitialized(_this));
    _this.loadElementsOfLists = _this.loadElementsOfLists.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CrearYSeleccionarLista, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadLists();
    }
  }, {
    key: "loadLists",
    value: function loadLists() {
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
    key: "seleccionarLista",
    value: function seleccionarLista(idLista, nombreLista) {
      this.setState({
        listaSeleccionada: idLista,
        mostrar: "verElemenLista",
        listaSeleccionadaNombre: nombreLista
      });
      this.loadElementsOfLists();
    }
  }, {
    key: "createList",
    value: function createList() {
      var _this3 = this;

      var nombre = $("#nombreNuevaLista").val();

      if (nombre.length > 0 && nombre.length < 41) {
        var transaction = new _mssql["default"].Transaction(this.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("insert into Listas (nombre) values ('" + nombre + "')", function (err, result) {
            if (err) {
              if (!rolledBack) {
                console.log(err);
                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                _this3.loadLists();
              });
            }
          });
        }); // fin transaction
      } else {
        alert("Error");
      }
    }
  }, {
    key: "regresarSeleccionarLista",
    value: function regresarSeleccionarLista() {
      this.setState({
        listaSeleccionada: -1,
        listaSeleccionadaNombre: "",
        mostrar: "selLista",
        variablesDeLista: []
      });
    }
  }, {
    key: "createElementList",
    value: function createElementList() {
      var _this4 = this;

      var idLista = this.state.listaSeleccionada;
      var nombre = $("#nombreElementoNuevo").val();
      var valor = $("#valorElementoNuevo").val();
      var tipo = $("#listaTipoNuevo").val();

      if (idLista != undefined && !isNaN(idLista)) {
        if (nombre.length > 0 && nombre.length < 51) {
          if (valor.length > 0 && valor.length < 501) {
            if (tipo.length > 0 && tipo.length < 26) {
              var transaction = new _mssql["default"].Transaction(this.props.pool);
              transaction.begin(function (err) {
                var rolledBack = false;
                transaction.on('rollback', function (aborted) {
                  rolledBack = true;
                });
                var request = new _mssql["default"].Request(transaction);
                request.query("insert into VariablesdeLista (listaID, valor, nombre, tipo) values (" + idLista + ", '" + valor + "', '" + nombre + "', '" + tipo + "')", function (err, result) {
                  if (err) {
                    if (!rolledBack) {
                      console.log(err);
                      transaction.rollback(function (err) {});
                    }
                  } else {
                    transaction.commit(function (err) {
                      _this4.loadElementsOfLists();

                      $("#nombreElementoNuevo").val("");
                      $("#valorElementoNuevo").val("");
                      $("#listaTipoNuevo").val("");
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
        } else {
          alert("Error");
        }
      } else {
        alert("Error");
      }
    }
  }, {
    key: "loadElementsOfLists",
    value: function loadElementsOfLists() {
      var _this5 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from VariablesdeLista where listaID = " + _this5.state.listaSeleccionada, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this5.setState({
                variablesDeLista: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      if (this.state.mostrar.localeCompare("selLista") == 0) {
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
        }, "Seleccionar Lista"))))))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "card influencer-profile-data"
        }, _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "form-group col-xl-12 col-12"
        }, _react["default"].createElement("label", {
          className: "col-form-label"
        }, "Nombre de Lista"), _react["default"].createElement("input", {
          id: "nombreNuevaLista",
          type: "text",
          className: "form-control"
        }))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("button", {
          onClick: this.createList,
          className: "btn btn-success btn-block col-xl-10 col-10",
          style: {
            color: "white",
            fontSize: "1.2em",
            fontWeight: "bold",
            margin: "0 auto",
            display: "block"
          }
        }, "Crear")))))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "card influencer-profile-data"
        }, _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "row border-top border-bottom addPaddingToConfig"
        }, this.state.listas.map(function (lista, i) {
          return _react["default"].createElement("a", {
            className: "btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM",
            onClick: function onClick() {
              return _this6.seleccionarLista(lista.ID, lista.nombre);
            },
            key: lista.ID
          }, lista.nombre);
        }), this.state.listas.length == 0 ? _react["default"].createElement("a", {
          className: "btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"
        }, "No existen listas creadas") : _react["default"].createElement("span", null)))))));
      } else if (this.state.mostrar.localeCompare("verElemenLista") == 0) {
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
          onClick: this.regresarSeleccionarLista
        }, _react["default"].createElement("a", {
          href: "#",
          className: "breadcrumb-link"
        }, "Seleccionar Lista")), _react["default"].createElement("li", {
          className: "breadcrumb-item active",
          "aria-current": "page"
        }, "Seleccionar Lista"))))))), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "card influencer-profile-data"
        }, _react["default"].createElement("div", {
          className: "card-body"
        }, _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "form-group col-xl-6 col-6"
        }, _react["default"].createElement("label", {
          className: "col-form-label"
        }, "Lista"), _react["default"].createElement("h4", {
          style: {
            fontFamily: 'Circular Std Medium',
            color: "#71748d",
            border: "1px solid #ccc",
            paddingLeft: "2%"
          },
          className: "alert-heading"
        }, this.state.listaSeleccionadaNombre)), _react["default"].createElement("div", {
          className: "form-group col-xl-6 col-6"
        }, _react["default"].createElement("label", {
          className: "col-form-label"
        }, "Nombre de Elemento"), _react["default"].createElement("input", {
          id: "nombreElementoNuevo",
          type: "text",
          className: "form-control"
        }))), _react["default"].createElement("div", {
          className: "row",
          style: {
            width: "100%"
          }
        }, _react["default"].createElement("div", {
          className: "form-group col-xl-6 col-6"
        }, _react["default"].createElement("label", {
          className: "col-form-label"
        }, "Valor de Elemento"), _react["default"].createElement("input", {
          id: "valorElementoNuevo",
          type: "text",
          className: "form-control"
        })), _react["default"].createElement("div", {
          className: "form-group col-xl-6 col-6"
        }, _react["default"].createElement("label", {
          className: "col-form-label"
        }, "Tipo de Elemento"), _react["default"].createElement("select", {
          id: "listaTipoNuevo",
          className: "form-control"
        }, _react["default"].createElement("option", {
          value: "",
          key: "0"
        }, "Seleccione un tipo de variable..."), campos.map(function (campo, k) {
          return _react["default"].createElement("option", {
            value: campo.nombre,
            key: k
          }, campo.nombre);
        }))))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("button", {
          onClick: this.createElementList,
          className: "btn btn-success btn-block col-xl-10 col-10",
          style: {
            color: "white",
            fontSize: "1.2em",
            fontWeight: "bold",
            margin: "0 auto",
            display: "block"
          }
        }, "Crear")))))), _react["default"].createElement("br", null), _react["default"].createElement("div", {
          className: "row"
        }, _react["default"].createElement("div", {
          className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        }, _react["default"].createElement("div", {
          className: "card influencer-profile-data"
        }, _react["default"].createElement("div", {
          className: "card-body"
        }, this.state.variablesDeLista.map(function (elemento, i) {
          return _react["default"].createElement("div", {
            key: elemento.ID,
            className: "row border-top border-bottom",
            style: {
              width: "100%"
            }
          }, _react["default"].createElement("div", {
            className: "row",
            style: {
              width: "100%"
            }
          }, _react["default"].createElement("div", {
            className: "form-group col-xl-6 col-6"
          }, _react["default"].createElement("label", {
            className: "col-form-label"
          }, "Lista"), _react["default"].createElement("h4", {
            style: {
              fontFamily: 'Circular Std Medium',
              color: "#71748d",
              border: "1px solid #ccc",
              paddingLeft: "2%"
            },
            className: "alert-heading"
          }, _this6.state.listaSeleccionadaNombre)), _react["default"].createElement("div", {
            className: "form-group col-xl-6 col-6"
          }, _react["default"].createElement("label", {
            className: "col-form-label"
          }, "Nombre de Elemento"), _react["default"].createElement(_InlineEdit["default"], {
            id: "nombreElemento" + i,
            texto: elemento.nombre
          }, " "))), _react["default"].createElement("div", {
            className: "row",
            style: {
              width: "100%"
            }
          }, _react["default"].createElement("div", {
            className: "form-group col-xl-6 col-6"
          }, _react["default"].createElement("label", {
            className: "col-form-label"
          }, "Valor de Elemento"), _react["default"].createElement(_InlineEdit["default"], {
            id: "valorElemento" + i,
            texto: elemento.valor
          }, " ")), _react["default"].createElement("div", {
            className: "form-group col-xl-6 col-6"
          }, _react["default"].createElement("label", {
            className: "col-form-label"
          }, "Tipo de Elemento"), _react["default"].createElement("select", {
            id: "listaTipo" + i,
            className: "form-control",
            defaultValue: elemento.tipo
          }, _react["default"].createElement("option", {
            value: "",
            key: "0"
          }, "Seleccione un tipo de variable..."), campos.map(function (campo, k) {
            return _react["default"].createElement("option", {
              value: campo.nombre,
              key: k
            }, campo.nombre);
          })))), _react["default"].createElement("div", {
            className: "row",
            style: {
              width: "100%"
            }
          }, _react["default"].createElement("button", {
            onClick: _this6.createElementList,
            className: "btn btn-success btn-block col-xl-5 col-5",
            style: {
              color: "white",
              fontSize: "1.2em",
              fontWeight: "bold",
              margin: "0 auto",
              display: "block"
            }
          }, "Guardar"), _react["default"].createElement("button", {
            onClick: _this6.deleteElementList,
            className: "btn btn-danger btn-block col-xl-5 col-5",
            style: {
              color: "white",
              fontSize: "1.2em",
              fontWeight: "bold",
              margin: "0 auto",
              display: "block"
            }
          }, "Eliminar")), _react["default"].createElement("div", {
            className: "row",
            style: {
              width: "100%"
            }
          }, _react["default"].createElement("br", null)));
        }), this.state.variablesDeLista.length == 0 ? _react["default"].createElement("a", {
          className: "btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"
        }, "No existen variables creadas") : _react["default"].createElement("span", null))))));
      }
    }
  }]);

  return CrearYSeleccionarLista;
}(_react["default"].Component);

exports["default"] = CrearYSeleccionarLista;
//# sourceMappingURL=CrearYSeleccionarLista.js.map
