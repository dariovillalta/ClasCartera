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

var DescargarReporteArchivo =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DescargarReporteArchivo, _React$Component);

  function DescargarReporteArchivo(props) {
    var _this;

    _classCallCheck(this, DescargarReporteArchivo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DescargarReporteArchivo).call(this, props));
    _this.state = {
      resultadosClientes: [],
      resultadosPrestamos: [] //this.cambioClientes = this.cambioClientes.bind(this);

    };
    _this.getFiltersString = _this.getFiltersString.bind(_assertThisInitialized(_this));
    _this.getFilterQuery = _this.getFilterQuery.bind(_assertThisInitialized(_this));
    _this.getObjectsID = _this.getObjectsID.bind(_assertThisInitialized(_this));
    _this.getObjectsField = _this.getObjectsField.bind(_assertThisInitialized(_this));
    _this.binaryInsertClient = _this.binaryInsertClient.bind(_assertThisInitialized(_this));
    _this.binaryInsertCredit = _this.binaryInsertCredit.bind(_assertThisInitialized(_this));
    _this.binaryInsertCreditField = _this.binaryInsertCreditField.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DescargarReporteArchivo, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getFiltersString();
    }
  }, {
    key: "getFiltersString",
    value: function getFiltersString() {
      var resultadoQueryIDs = '';
      /*for (var i = 0; i < this.props.arregloDeFiltros.length; i++) {
          resultadoQueryIDs += this.getFilterQuery(this.props.arregloDeFiltrosIDs[i]);
      };*/

      var resultadoQueryInt = '';
      /*for (var i = 0; i < this.props.arregloDeFiltros.length; i++) {
          resultadoQueryInt += this.getFilterQuery(this.props.arregloDeFiltrosInt[i]);
      };*/

      var resultadoQueryDecimal = '';
      /*for (var i = 0; i < this.props.arregloDeFiltros.length; i++) {
          resultadoQueryDecimal += this.getFilterQuery(this.props.arregloDeFiltrosDecimal[i]);
      };*/

      var resultadoQueryDate = '';
      /*for (var i = 0; i < this.props.arregloDeFiltros.length; i++) {
          resultadoQueryDate += this.getFilterQuery(this.props.arregloDeFiltrosDate[i]);
      };*/

      var resultadoQueryBool = '';
      /*for (var i = 0; i < this.props.arregloDeFiltros.length; i++) {
          resultadoQueryBool += this.getFilterQuery(this.props.arregloDeFiltrosBool[i]);
      };*/

      var resultadoQueryString = '';
      /*for (var i = 0; i < this.props.arregloDeFiltros.length; i++) {
          resultadoQueryString += this.getFilterQuery(this.props.arregloDeFiltrosString[i]);
      };*/

      this.getObjectsID(" where idPadre = '-1'" + resultadoQueryIDs, resultadoQueryInt, resultadoQueryDecimal, resultadoQueryDate, resultadoQueryBool, resultadoQueryString, true); //this.getObjectsID(" where idPadre != '-1'"+resultadoQueryIDs, resultadoQueryInt, resultadoQueryDecimal, resultadoQueryDate, resultadoQueryBool, resultadoQueryString, false);

      var self = this;
      setTimeout(function () {
        self.getObjectsID(" where idPadre != '-1'" + resultadoQueryIDs, resultadoQueryInt, resultadoQueryDecimal, resultadoQueryDate, resultadoQueryBool, resultadoQueryString, false);
      }, 3000);
    }
  }, {
    key: "getFilterQuery",
    value: function getFilterQuery(filtro) {//if (filtro.)
    }
  }, {
    key: "getObjectsID",
    value: function getObjectsID(queryStringID, queryStringInt, queryStringDecimal, queryStringDate, queryStringBool, queryStringString, esCliente) {
      var _this2 = this;

      //traer id de resultados de base de datos
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosID " + queryStringID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              alert('no se pudo traer datos');
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              //binary insert ID
              for (var i = 0; i < result.recordset.length; i++) {
                if (esCliente) _this2.binaryInsertClient(result.recordset[i], _this2.state.resultadosClientes, "identificador", []);else _this2.binaryInsertCredit(result.recordset[i], _this2.state.resultadosPrestamos, "ID", "idPadre", "identificador");

                _this2.getObjectsField(result.recordset[i].identificador, queryStringInt, queryStringDecimal, queryStringDate, queryStringBool, queryStringString, esCliente);
              }

              ;
              console.log("resultados");
              console.log(_this2.state.resultadosClientes);
              console.log(_this2.state.resultadosPrestamos);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getObjectsField",
    value: function getObjectsField(idObjeto, queryStringInt, queryStringDecimal, queryStringDate, queryStringBool, queryStringString, esCliente) {
      var _this3 = this;

      //traer campos de resultados de base de datos
      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction1.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request1 = new _mssql["default"].Request(transaction1);
        request1.query("select * from ResultadosInt where idObjeto = '" + idObjeto + "' " + queryStringInt, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              alert('no se pudo traer datos');
              transaction1.rollback(function (err) {});
            }
          } else {
            transaction1.commit(function (err) {
              //binary insert ID
              if (result.recordset.length > 0) {
                for (var i = 0; i < result.recordset.length; i++) {
                  if (esCliente) _this3.binaryInsertClient(result.recordset[i], _this3.state.resultadosClientes, "idObjeto", result.recordset);else _this3.binaryInsertCreditField(result.recordset[i]);
                }

                ;
              }
            });
          }
        });
      }); // fin transaction1

      var transaction2 = new _mssql["default"].Transaction(this.props.pool);
      transaction2.begin(function (err) {
        var rolledBack = false;
        transaction2.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request2 = new _mssql["default"].Request(transaction2);
        request2.query("select * from ResultadosDecimal where idObjeto = '" + idObjeto + "' " + queryStringInt, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              alert('no se pudo traer datos');
              transaction2.rollback(function (err) {});
            }
          } else {
            transaction2.commit(function (err) {
              //binary insert ID
              if (result.recordset.length > 0) {
                for (var i = 0; i < result.recordset.length; i++) {
                  if (esCliente) _this3.binaryInsertClient(result.recordset[i], _this3.state.resultadosClientes, "idObjeto", result.recordset);else _this3.binaryInsertCreditField(result.recordset[i]);
                }

                ;
              }
            });
          }
        });
      }); // fin transaction2

      /*const transaction3 = new sql.Transaction( this.props.pool );
      transaction3.begin(err => {
          var rolledBack = false;
          transaction3.on('rollback', aborted => {
              rolledBack = true;
          });
          const request3 = new sql.Request(transaction3);
          request3.query("select * from ResultadosDate where idObjeto = '"+idObjeto+"' "+queryStringInt, (err, result) => {
              if (err) {
                  if (!rolledBack) {
                      console.log(err);
                      alert('no se pudo traer datos');
                      transaction3.rollback(err => {
                      });
                  }
              } else {
                  transaction3.commit(err => {
                      //binary insert ID
                      if(result.recordset.length > 0) {
                          for (var i = 0; i < result.recordset.length; i++) {
                              if(esCliente)
                                  this.binaryInsertClient(result.recordset[i], this.state.resultadosClientes, "idObjeto", result.recordset);
                              else
                                  this.binaryInsertCreditField(result.recordset[i]);
                          };
                      }
                  });
              }
          });
      });*/
      // fin transaction3

      var transaction4 = new _mssql["default"].Transaction(this.props.pool);
      transaction4.begin(function (err) {
        var rolledBack = false;
        transaction4.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request4 = new _mssql["default"].Request(transaction4);
        request4.query("select * from ResultadosBool where idObjeto = '" + idObjeto + "' " + queryStringInt, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              alert('no se pudo traer datos');
              transaction4.rollback(function (err) {});
            }
          } else {
            transaction4.commit(function (err) {
              //binary insert ID
              if (result.recordset.length > 0) {
                for (var i = 0; i < result.recordset.length; i++) {
                  if (esCliente) _this3.binaryInsertClient(result.recordset[i], _this3.state.resultadosClientes, "idObjeto", result.recordset);else _this3.binaryInsertCreditField(result.recordset[i]);
                }

                ;
              }
            });
          }
        });
      }); // fin transaction4

      var transaction5 = new _mssql["default"].Transaction(this.props.pool);
      transaction5.begin(function (err) {
        var rolledBack = false;
        transaction5.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request5 = new _mssql["default"].Request(transaction5);
        request5.query("select * from ResultadosString where idObjeto = '" + idObjeto + "' " + queryStringInt, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              alert('no se pudo traer datos');
              transaction5.rollback(function (err) {});
            }
          } else {
            transaction5.commit(function (err) {
              //binary insert ID
              if (result.recordset.length > 0) {
                for (var i = 0; i < result.recordset.length; i++) {
                  if (esCliente) _this3.binaryInsertClient(result.recordset[i], _this3.state.resultadosClientes, "idObjeto", result.recordset);else _this3.binaryInsertCreditField(result.recordset[i]);
                }

                ;
              }
            });
          }
        });
      }); // fin transaction5
    }
  }, {
    key: "binaryInsertClient",
    value: function binaryInsertClient(newValue, array, field, fieldsToSave, startVal, endVal) {
      var length = array.length;
      var start = typeof startVal != 'undefined' ? startVal : 0;
      var end = typeof endVal != 'undefined' ? endVal : length - 1; //!! endVal could be 0 don't use || syntax

      var m = start + Math.floor((end - start) / 2);

      if (length == 0) {
        var newObject = {
          ID: newValue[field]
        };

        for (var i = 0; i < fieldsToSave.length; i++) {
          newObject[fieldsToSave[i][nombre]] = fieldsToSave[i].valor;
        }

        ;
        array.push(newObject);
        return;
      }

      if (newValue[field].localeCompare(array[m].ID) == 0) {
        for (var i = 0; i < fieldsToSave.length; i++) {
          array[m][fieldsToSave[i].nombre] = fieldsToSave[i].valor;
        }

        ;
        return;
      }

      if (newValue[field].localeCompare(array[end].ID) > 0) {
        var newObject = {
          ID: newValue[field]
        };

        for (var i = 0; i < fieldsToSave.length; i++) {
          newObject[fieldsToSave[i].nombre] = fieldsToSave[i].valor;
        }

        ;
        array.splice(end + 1, 0, newObject);
        return;
      }

      if (newValue[field].localeCompare(array[start].ID) < 0) {
        //!!
        var newObject = {
          ID: newValue[field]
        };

        for (var i = 0; i < fieldsToSave.length; i++) {
          newObject[fieldsToSave[i].nombre] = fieldsToSave[i].valor;
        }

        ;
        array.splice(start, 0, newObject);
        return;
      }

      if (start >= end) {
        return;
      }

      if (newValue[field].localeCompare(array[m].ID) < 0) {
        this.binaryInsertClient(newValue, array, field, fieldsToSave, start, m - 1);
        return;
      }

      if (newValue[field].localeCompare(array[m].ID) > 0) {
        this.binaryInsertClient(newValue, array, field, fieldsToSave, m + 1, end);
        return;
      }
    }
  }, {
    key: "binaryInsertCredit",
    value: function binaryInsertCredit(newValue, array, fieldClient, fieldCreditOwner, fieldCredit, startVal, endVal) {
      var length = array.length;
      var start = typeof startVal != 'undefined' ? startVal : 0;
      var end = typeof endVal != 'undefined' ? endVal : length - 1; //!! endVal could be 0 don't use || syntax

      var m = start + Math.floor((end - start) / 2);

      if (length == 0) {
        if (this.state.resultadosClientes.length > 0) {
          if (this.state.resultadosPrestamos[0] == undefined) this.state.resultadosPrestamos[0] = [];
          var newObjectCredito = {
            ID: newValue[fieldCredit]
          };
          /*for (var i = 0; i < fieldsToSave.length; i++) {
              var valorAInsertar = newValue[fieldsToSave[i].nombre];
              //var validarVariable = checkVariable(valorAInsertar, fieldsToSave[i].tipo);
              var validarVariable = true;
              if( validarVariable ) {
                  newObjectCredito[fieldsToSave[i].nombre] = valorAInsertar;
              } else {
                  //bitacora add error porque no inserto variable
              }
          };*/

          this.state.resultadosPrestamos[0].push(newObjectCredito);
        }

        return;
      }

      if (newValue[fieldCreditOwner].localeCompare(this.state.resultadosClientes[m][fieldClient]) == 0) {
        var newObjectCredito = {
          ID: newValue[fieldCredit]
        };
        this.state.resultadosPrestamos[m].push(newObjectCredito);
        /*if(this.state.resultadosPrestamos[m] == undefined)
            this.state.resultadosPrestamos[m] = [];
        var existeCredito = false;
        for (var i = 0; i < this.state.resultadosPrestamos[m].length; i++) {
            if( this.state.resultadosPrestamos[m][i][fieldCredit].localeCompare(newValue[fieldCredit]) == 0) {
                existeCredito = true;
                break;
            }
        };
        if(!existeCredito) {
            var newObjectCredito = {fieldCreditOwner: newValue[fieldCreditOwner]};
            for (var i = 0; i < fieldsToSave.length; i++) {
                var valorAInsertar = newValue[fieldsToSave[i].nombre];
                //var validarVariable = checkVariable(valorAInsertar, fieldsToSave[i].tipo);
                var validarVariable = true;
                if( validarVariable ) {
                    newObject[fieldsToSave[i].nombre] = valorAInsertar;
                } else {
                    //bitacora add error porque no inserto variable
                }
            };
            this.state.resultadosPrestamos[m].push(newObjectCredito);
        } else {
            for (var j = 0; j < fieldsToSave.length; j++) {
                var valorAInsertar = newValue[fieldsToSave[j].nombre];
                //var validarVariable = checkVariable(valorAInsertar, fieldsToSave[i].tipo);
                var validarVariable = true;
                if( validarVariable ) {
                    this.state.resultadosPrestamos[m][i][fieldsToSave[j].nombre] = valorAInsertar;
                } else {
                    //bitacora add error porque no inserto variable
                }
            };
        }*/

        return;
      }

      if (newValue[fieldCreditOwner].localeCompare(this.state.resultadosClientes[end][fieldClient]) > 0) {
        var newObjectCredito = {
          ID: newValue[fieldCredit]
        };
        /*for (var i = 0; i < fieldsToSave.length; i++) {
            var valorAInsertar = newValue[fieldsToSave[i].nombre];
            //var validarVariable = checkVariable(valorAInsertar, fieldsToSave[i].tipo);
            var validarVariable = true;
            if( validarVariable ) {
                newObjectCredito[fieldsToSave[i].nombre] = valorAInsertar;
            } else {
                //bitacora add error porque no inserto variable
            }
        };*/

        var newArray = [newObjectCredito];
        this.state.resultadosPrestamos.splice(end + 1, 0, newArray);
        return;
      }

      if (newValue[fieldCreditOwner].localeCompare(this.state.resultadosClientes[start][fieldClient]) < 0) {
        //!!
        var newObjectCredito = {
          ID: newValue[fieldCredit]
        };
        /*for (var i = 0; i < fieldsToSave.length; i++) {
            var valorAInsertar = newValue[fieldsToSave[i].nombre];
            //var validarVariable = checkVariable(valorAInsertar, fieldsToSave[i].tipo);
            var validarVariable = true;
            if( validarVariable ) {
                newObjectCredito[fieldsToSave[i].nombre] = valorAInsertar;
            } else {
                //bitacora add error porque no inserto variable
            }
        };*/

        var newArray = [newObjectCredito];
        this.state.resultadosPrestamos.splice(start, 0, newArray);
        return;
      }

      if (start >= end) {
        return;
      }

      if (newValue[fieldCreditOwner].localeCompare(this.state.resultadosClientes[m][fieldClient]) < 0) {
        this.binaryInsertCredit(newValue, array, fieldClient, fieldCreditOwner, fieldCredit, start, m - 1);
        return;
      }

      if (newValue[fieldCreditOwner].localeCompare(this.state.resultadosClientes[m][fieldClient]) > 0) {
        this.binaryInsertCredit(newValue, array, fieldClient, fieldCreditOwner, fieldCredit, m + 1, end);
        return;
      }
    }
  }, {
    key: "binaryInsertCreditField",
    value: function binaryInsertCreditField(newValue) {
      /*if(this.state.resultadosPrestamos.length == 0) {
          this.state.resultadosPrestamos[0] = [];
          var newObjectCredito = {};
          for (var k = 0; k < fieldsToSave.length; k++) {
              var valorAInsertar = newValue[fieldsToSave[k].nombre];
              //var validarVariable = checkVariable(valorAInsertar, fieldsToSave[i].tipo);
              var validarVariable = true;
              if( validarVariable ) {
                  newObjectCredito[fieldsToSave[k].nombre] = valorAInsertar;
              } else {
                  //bitacora add error porque no inserto variable
              }
          };
          this.state.resultadosPrestamos[0].push(newObjectCredito);
      } else {*/
      for (var i = 0; i < this.state.resultadosPrestamos.length; i++) {
        for (var j = 0; j < this.state.resultadosPrestamos[i].length; j++) {
          if (this.state.resultadosPrestamos[i][j].ID.localeCompare(newValue.idObjeto) == 0) {
            this.state.resultadosPrestamos[i][j][newValue.nombre] = newValue.valor;
            return;
          }
        }

        ;
      }

      ; //}
    }
  }, {
    key: "crearArchivoExcel",
    value: function crearArchivoExcel() {//
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
      }, "Descargar Reporteria"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item",
        "aria-current": "page",
        onClick: this.props.retornoSeleccionFiltro
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Selecci\xF3n de Filtro")), _react["default"].createElement("li", {
        className: "breadcrumb-item active",
        "aria-current": "page"
      }, "Resultado"))))))), _react["default"].createElement("div", {
        style: {
          width: "100%",
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
      }, "Descargar")));
    }
  }]);

  return DescargarReporteArchivo;
}(_react["default"].Component);

exports["default"] = DescargarReporteArchivo;
//# sourceMappingURL=DescargarReporteArchivo.js.map
