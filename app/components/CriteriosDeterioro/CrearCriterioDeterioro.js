"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _inputmask = _interopRequireDefault(require("inputmask"));

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

var subcategorias = [{
  categoria: "A"
}, {
  categoria: "B"
}, {
  categoria: "C"
}, {
  categoria: "D"
}, {
  categoria: "E"
}, {
  categoria: "F"
}, {
  categoria: "G"
}, {
  categoria: "H"
}, {
  categoria: "I"
}, {
  categoria: "J"
}, {
  categoria: "K"
}, {
  categoria: "L"
}, {
  categoria: "M"
}, {
  categoria: "N"
}, {
  categoria: "O"
}, {
  categoria: "P"
}, {
  categoria: "Q"
}, {
  categoria: "R"
}, {
  categoria: "S"
}, {
  categoria: "T"
}, {
  categoria: "U"
}, {
  categoria: "V"
}, {
  categoria: "W"
}, {
  categoria: "X"
}, {
  categoria: "Y"
}, {
  categoria: "Z"
}];

var CrearCriterioDeterioro =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CrearCriterioDeterioro, _React$Component);

  function CrearCriterioDeterioro(props) {
    var _this;

    _classCallCheck(this, CrearCriterioDeterioro);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CrearCriterioDeterioro).call(this, props));
    _this.state = {
      categoriasClasificacion: [],
      tiposDeCredito: []
    };
    _this.iniciarCriterioDeterioro = _this.iniciarCriterioDeterioro.bind(_assertThisInitialized(_this));
    _this.guardarCriterioDeterioro = _this.guardarCriterioDeterioro.bind(_assertThisInitialized(_this));
    _this.traerAggararCategoriasClasificacion = _this.traerAggararCategoriasClasificacion.bind(_assertThisInitialized(_this));
    _this.traerAggararTiposCreditos = _this.traerAggararTiposCreditos.bind(_assertThisInitialized(_this));
    _this.getNombreCategoria = _this.getNombreCategoria.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CrearCriterioDeterioro, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.traerAggararCategoriasClasificacion();
      this.traerAggararTiposCreditos(); //$("#porcentajeEstimacionDeterioro").inputmask({"mask": "999 %"});

      (0, _inputmask["default"])({
        "mask": "9[9][9][.99] %"
      }).mask($("#porcentajeEstimacionDeterioro"));
      (0, _inputmask["default"])({
        "mask": "9[9][9][9]"
      }).mask($("#inicioMora"));
      (0, _inputmask["default"])({
        "mask": "9[9][9][9]"
      }).mask($("#finMora"));
    }
  }, {
    key: "iniciarCriterioDeterioro",
    value: function iniciarCriterioDeterioro() {
      var _this2 = this;

      //trayendo los criterios de deterioro relacionados al tipo de credito para auto asignar subcategoria
      var idCategoria = this.state.categoriasClasificacion[$("#categoriaClasificacionID").val()].ID;
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from CriterioDeterioro where categoriaClasPadre = " + idCategoria, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.guardarCriterioDeterioro(result.recordset);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "guardarCriterioDeterioro",
    value: function guardarCriterioDeterioro(criterioDeterioroMismaCategoria) {
      var categoriaClasificacion = this.state.categoriasClasificacion[$("#categoriaClasificacionID").val()].ID;
      var nombreClasPadre = this.state.categoriasClasificacion[$("#categoriaClasificacionID").val()].categoria + " " + this.state.categoriasClasificacion[$("#categoriaClasificacionID").val()].tipoCredito;
      var categoria = this.state.categoriasClasificacion[$("#categoriaClasificacionID").val()].categoria + this.getNombreCategoria(criterioDeterioroMismaCategoria); //es categoriaClasificacion la hijesima (n) vez del arreglo subcategorias ^^^inicio del archivo

      var tipoCredito = $("#tipoCreditoID").val().toString();
      var tipoGarantia = $("#nombreTipoGarantia").val().toString();
      var inicioMora = $("#inicioMora").val();
      var finMora = $("#finMora").val();
      var porcentajeEstimacionDeterioro = $("#porcentajeEstimacionDeterioro").val();

      if (!isNaN(categoriaClasificacion)) {
        if (categoria != undefined && categoria.length > 0) {
          if (!isNaN(tipoCredito)) {
            if (!isNaN(inicioMora)) {
              if (!isNaN(finMora)) {
                var transaction = new _mssql["default"].Transaction(this.props.pool);
                transaction.begin(function (err) {
                  var rolledBack = false;
                  transaction.on('rollback', function (aborted) {
                    rolledBack = true;
                  });
                  var request = new _mssql["default"].Request(transaction);
                  request.query("insert into CriterioDeterioro (categoriaClasPadre, nombreClasPadre, categoria, tipoDeCredito, tipoGarantia, inicioMora, finMora, estimacionDeterioro) values (" + categoriaClasificacion + ",'" + nombreClasPadre + "','" + categoria + "'," + tipoCredito + ",'" + tipoGarantia + "'," + inicioMora + "," + finMora + "," + porcentajeEstimacionDeterioro + ")", function (err, result) {
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
                alert("Error finMora");
              }
            } else {
              alert("Error inicioMora");
            }
          } else {
            alert("Error tipoCredito");
          }
        } else {
          alert("Error categoria");
        }
      } else {
        alert("Error categoriaClasificacion");
      }
    }
  }, {
    key: "getNombreCategoria",
    value: function getNombreCategoria(criterioDeterioroMismaCategoria) {
      if (criterioDeterioroMismaCategoria.length <= 26) {
        return subcategorias[criterioDeterioroMismaCategoria.length].categoria;
      } else {
        return subcategorias[criterioDeterioroMismaCategoria.length % 26].categoria;
      }
    }
  }, {
    key: "traerAggararCategoriasClasificacion",
    value: function traerAggararCategoriasClasificacion() {
      var _this3 = this;

      //trayendo las categorias de clasificacion de creditos
      var idCategoria = $("#categoriaClasificacionID").val();
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from CategoriaClasificacion", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this3.setState({
                categoriasClasificacion: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "traerAggararTiposCreditos",
    value: function traerAggararTiposCreditos() {
      var _this4 = this;

      //trayendo los tipos de creditos
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from TipoCredito", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this4.setState({
                tiposDeCredito: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "render",
    value: function render() {
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
        onClick: this.props.returnSelCrit
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Seleccionar Criterio de Deterioro")), _react["default"].createElement("li", {
        className: "breadcrumb-item active",
        "aria-current": "page"
      }, "Crear Criterio de Deterioro"))))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-sm-6 col-6"
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
      }, "Categoria de Clasificaci\xF3n"), _react["default"].createElement("select", {
        id: "categoriaClasificacionID",
        className: "form-control form-control-lg"
      }, this.state.categoriasClasificacion.map(function (categoriaClasificacion, i) {
        return _react["default"].createElement("option", {
          value: i,
          key: categoriaClasificacion.ID
        }, categoriaClasificacion.categoria, " | ", categoriaClasificacion.tipoCredito);
      })))))), _react["default"].createElement("div", {
        className: "col-sm-6 col-6"
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
      }, "Tipo de Cr\xE9dito"), _react["default"].createElement("select", {
        id: "tipoCreditoID",
        className: "form-control form-control-lg"
      }, this.state.tiposDeCredito.map(function (tipoDeCredito, i) {
        return _react["default"].createElement("option", {
          value: tipoDeCredito.ID,
          key: tipoDeCredito.ID
        }, tipoDeCredito.nombre);
      }))))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-sm-6 col-6"
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
      }, "Estimacion por Deterioro"), _react["default"].createElement("input", {
        id: "porcentajeEstimacionDeterioro",
        type: "text",
        className: "form-control",
        style: {
          width: "100%"
        }
      }))))), _react["default"].createElement("div", {
        className: "col-sm-6 col-6"
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
      }, "Tipo de Garant\xEDa"), _react["default"].createElement("input", {
        id: "nombreTipoGarantia",
        type: "text",
        className: "form-control",
        style: {
          width: "100%"
        }
      })))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-sm-6 col-6"
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
      }, "Rango de Mora M\xEDnimo"), _react["default"].createElement("input", {
        id: "inicioMora",
        type: "text",
        className: "form-control",
        style: {
          width: "100%"
        }
      }))))), _react["default"].createElement("div", {
        className: "col-sm-6 col-6"
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
      }, "Rango de Mora M\xE1ximo"), _react["default"].createElement("input", {
        id: "finMora",
        type: "text",
        className: "form-control",
        style: {
          width: "100%"
        }
      })))))), _react["default"].createElement("div", {
        className: "text-center"
      }, _react["default"].createElement("a", {
        onClick: this.iniciarCriterioDeterioro,
        className: "btn btn-primary col-xs-6 col-6",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold"
        }
      }, "Guardar")), _react["default"].createElement("br", null));
    }
  }]);

  return CrearCriterioDeterioro;
}(_react["default"].Component);

exports["default"] = CrearCriterioDeterioro;
//# sourceMappingURL=CrearCriterioDeterioro.js.map
