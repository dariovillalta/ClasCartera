"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _xlsxStyle = _interopRequireDefault(require("xlsx-style"));

var _Accordion = _interopRequireDefault(require("../Accordion/Accordion.js"));

var _InlineEdit = _interopRequireDefault(require("../InlineEdit.js"));

var _ErrorMessage = _interopRequireDefault(require("../ErrorMessage.js"));

var _MessageModal = _interopRequireDefault(require("../MessageModal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var campos = [{
  nombre: "varchar"
}, {
  nombre: "bit"
}, {
  nombre: "date"
}, {
  nombre: "int"
}];
var funciones = [{
  funcion: "idCliente",
  texto: "ID de Cliente"
}, {
  funcion: "fecha",
  texto: "fecha"
}, {
  nombre: "date"
}, {
  nombre: "int"
}];
var tamBanderaActual = 0,
    tamBanderaFinal = 0;

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
      resultadosPrestamos: [],
      camposClientes: [],
      camposPrestamos: [] //this.cambioClientes = this.cambioClientes.bind(this);

    };
    _this.getFiltersString = _this.getFiltersString.bind(_assertThisInitialized(_this));
    _this.getFilterQuery = _this.getFilterQuery.bind(_assertThisInitialized(_this));
    _this.getObjectsID = _this.getObjectsID.bind(_assertThisInitialized(_this));
    _this.getObjectsField = _this.getObjectsField.bind(_assertThisInitialized(_this));
    _this.binaryInsertClient = _this.binaryInsertClient.bind(_assertThisInitialized(_this));
    _this.binaryInsertCredit = _this.binaryInsertCredit.bind(_assertThisInitialized(_this));
    _this.binaryInsertCreditField = _this.binaryInsertCreditField.bind(_assertThisInitialized(_this));
    _this.verificarFinClientes = _this.verificarFinClientes.bind(_assertThisInitialized(_this));
    _this.insertIntoFieldArray = _this.insertIntoFieldArray.bind(_assertThisInitialized(_this));
    _this.getValidIDsInt = _this.getValidIDsInt.bind(_assertThisInitialized(_this));
    _this.getValidIDsDecimal = _this.getValidIDsDecimal.bind(_assertThisInitialized(_this));
    _this.getValidIDsDate = _this.getValidIDsDate.bind(_assertThisInitialized(_this));
    _this.getValidIDsBool = _this.getValidIDsBool.bind(_assertThisInitialized(_this));
    _this.getValidIDsString = _this.getValidIDsString.bind(_assertThisInitialized(_this));
    _this.initiateBringObjects = _this.initiateBringObjects.bind(_assertThisInitialized(_this));
    _this.getExcelCellInt = _this.getExcelCellInt.bind(_assertThisInitialized(_this));
    _this.getExcelCellDecimal = _this.getExcelCellDecimal.bind(_assertThisInitialized(_this));
    _this.getExcelCellDate = _this.getExcelCellDate.bind(_assertThisInitialized(_this));
    _this.getExcelCellBool = _this.getExcelCellBool.bind(_assertThisInitialized(_this));
    _this.getExcelCellVarchar = _this.getExcelCellVarchar.bind(_assertThisInitialized(_this));
    _this.colName = _this.colName.bind(_assertThisInitialized(_this));
    _this.crearArchivoExcel = _this.crearArchivoExcel.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DescargarReporteArchivo, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getFiltersString();
      this.props.showLoadingScreen();
      var self = this;
      setTimeout(function () {
        self.props.hideLoadingScreen();
      }, 60000);
    }
  }, {
    key: "getFiltersString",
    value: function getFiltersString() {
      var resultadoQueryIDs = '';
      /*for (var i = 0; i < this.props.arregloDeFiltros.length; i++) {
          resultadoQueryIDs += this.getFilterQuery(this.props.arregloDeFiltrosIDs[i]);
      };*/

      var resultadoQueryInt = '';

      for (var i = 0; i < this.props.filtrosInt.length; i++) {
        //resultadoQueryInt += this.getFilterQuery(this.props.filtrosInt[i]);
        if (resultadoQueryInt.length == 0) resultadoQueryInt += " where " + this.props.filtrosInt[i].filtro;else resultadoQueryInt += " and " + this.props.filtrosInt[i].filtro;
      }

      ;
      var resultadoQueryDecimal = '';

      for (var i = 0; i < this.props.filtrosDecimal.length; i++) {
        //resultadoQueryDecimal += this.getFilterQuery(this.props.filtrosDecimal[i]);
        if (resultadoQueryDecimal.length == 0) resultadoQueryDecimal += " where " + this.props.filtrosDecimal[i].filtro;else resultadoQueryDecimal += " and " + this.props.filtrosDecimal[i].filtro;
      }

      ;
      var resultadoQueryDate = '';

      for (var i = 0; i < this.props.filtrosDate.length; i++) {
        //resultadoQueryDate += this.getFilterQuery(this.props.filtrosDate[i]);
        if (resultadoQueryDate.length == 0) resultadoQueryDate += " where " + this.props.filtrosDate[i].filtro;else resultadoQueryDate += " and " + this.props.filtrosDate[i].filtro;
      }

      ;
      var resultadoQueryBool = '';

      for (var i = 0; i < this.props.filtrosBool.length; i++) {
        //resultadoQueryBool += this.getFilterQuery(this.props.filtrosBool[i]);
        if (resultadoQueryBool.length == 0) resultadoQueryBool += " where " + this.props.filtrosBool[i].filtro;else resultadoQueryBool += " and " + this.props.filtrosBool[i].filtro;
      }

      ;
      var resultadoQueryString = '';

      for (var i = 0; i < this.props.filtrosString.length; i++) {
        //resultadoQueryString += this.getFilterQuery(this.props.filtrosString[i]);
        if (resultadoQueryString.length == 0) resultadoQueryString += " where " + this.props.filtrosString[i].filtro;else resultadoQueryString += " and " + this.props.filtrosString[i].filtro;
      }

      ;

      if (resultadoQueryInt.length > 0) {
        this.getValidIDsInt(resultadoQueryInt, resultadoQueryDecimal, resultadoQueryDate, resultadoQueryBool, resultadoQueryString);
      } else if (resultadoQueryDecimal.length > 0) {
        this.getValidIDsDecimal(resultadoQueryDecimal, resultadoQueryDate, resultadoQueryBool, resultadoQueryString, '');
      } else if (resultadoQueryDate.length > 0) {
        this.getValidIDsDate(resultadoQueryDate, resultadoQueryBool, resultadoQueryString, '');
      } else if (resultadoQueryBool.length > 0) {
        this.getValidIDsBool(resultadoQueryBool, resultadoQueryString, '');
      } else if (resultadoQueryString.length > 0) {
        this.getValidIDsString(resultadoQueryString, '');
      } else {
        console.log("YEEET");
        this.initiateBringObjects('');
      }
    }
  }, {
    key: "getValidIDsInt",
    value: function getValidIDsInt(queryStringInt, resultadoQueryDecimal, resultadoQueryDate, resultadoQueryBool, resultadoQueryString) {
      var _this2 = this;

      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction1.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request1 = new _mssql["default"].Request(transaction1);
        request1.query("select DISTINCT idObjeto from ResultadosInt " + queryStringInt, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              alert('no se pudo traer datos');
              transaction1.rollback(function (err) {});
            }
          } else {
            transaction1.commit(function (err) {
              var IDsNoTraer = '';

              for (var i = 0; i < result.recordset.length; i++) {
                IDsNoTraer += " and identificador != '" + result.recordset[i].idObjeto + "'";
              }

              ;

              if (resultadoQueryDecimal.length > 0) {
                _this2.getValidIDsDecimal(resultadoQueryDecimal, resultadoQueryDate, resultadoQueryBool, resultadoQueryString, IDsNoTraer);
              } else if (resultadoQueryDate.length > 0) {
                _this2.getValidIDsDate(resultadoQueryDate, resultadoQueryBool, resultadoQueryString, IDsNoTraer);
              } else if (resultadoQueryBool.length > 0) {
                _this2.getValidIDsBool(resultadoQueryBool, resultadoQueryString, IDsNoTraer);
              } else if (resultadoQueryString.length > 0) {
                _this2.getValidIDsString(resultadoQueryString, IDsNoTraer);
              } else {
                _this2.initiateBringObjects(IDsNoTraer);
              }
            });
          }
        });
      }); // fin transaction1
    }
  }, {
    key: "getValidIDsDecimal",
    value: function getValidIDsDecimal(queryStringDecimal, resultadoQueryDate, resultadoQueryBool, resultadoQueryString, IDsNoTraer) {
      var _this3 = this;

      var transaction2 = new _mssql["default"].Transaction(this.props.pool);
      transaction2.begin(function (err) {
        var rolledBack = false;
        transaction2.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request2 = new _mssql["default"].Request(transaction2);
        request2.query("select DISTINCT idObjeto from ResultadosDecimal " + queryStringDecimal, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              alert('no se pudo traer datos');
              transaction2.rollback(function (err) {});
            }
          } else {
            transaction2.commit(function (err) {
              for (var i = 0; i < result.recordset.length; i++) {
                IDsNoTraer += " and identificador != '" + result.recordset[i].idObjeto + "'";
              }

              ;

              if (resultadoQueryDate.length > 0) {
                _this3.getValidIDsDate(resultadoQueryDate, resultadoQueryBool, resultadoQueryString, IDsNoTraer);
              } else if (resultadoQueryBool.length > 0) {
                _this3.getValidIDsBool(resultadoQueryBool, resultadoQueryString, IDsNoTraer);
              } else if (resultadoQueryString.length > 0) {
                _this3.getValidIDsString(resultadoQueryString, IDsNoTraer);
              } else {
                _this3.initiateBringObjects(IDsNoTraer);
              }
            });
          }
        });
      }); // fin transaction2
    }
  }, {
    key: "getValidIDsDate",
    value: function getValidIDsDate(queryStringDate, resultadoQueryBool, resultadoQueryString, IDsNoTraer) {
      var _this4 = this;

      var transaction3 = new _mssql["default"].Transaction(this.props.pool);
      transaction3.begin(function (err) {
        var rolledBack = false;
        transaction3.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request3 = new _mssql["default"].Request(transaction3);
        request3.query("select DISTINCT idObjeto from ResultadosDate " + queryStringDate, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              alert('no se pudo traer datos');
              transaction3.rollback(function (err) {});
            }
          } else {
            transaction3.commit(function (err) {
              for (var i = 0; i < result.recordset.length; i++) {
                IDsNoTraer += " and identificador != '" + result.recordset[i].idObjeto + "'";
              }

              ;

              if (resultadoQueryBool.length > 0) {
                _this4.getValidIDsBool(resultadoQueryBool, resultadoQueryString, IDsNoTraer);
              } else if (resultadoQueryString.length > 0) {
                _this4.getValidIDsString(resultadoQueryString, IDsNoTraer);
              } else {
                _this4.initiateBringObjects(IDsNoTraer);
              }
            });
          }
        });
      });
    }
  }, {
    key: "getValidIDsBool",
    value: function getValidIDsBool(queryStringBool, resultadoQueryString, IDsNoTraer) {
      var _this5 = this;

      var transaction4 = new _mssql["default"].Transaction(this.props.pool);
      transaction4.begin(function (err) {
        var rolledBack = false;
        transaction4.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request4 = new _mssql["default"].Request(transaction4);
        request4.query("select DISTINCT idObjeto from ResultadosBool " + queryStringBool, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              alert('no se pudo traer datos');
              transaction4.rollback(function (err) {});
            }
          } else {
            transaction4.commit(function (err) {
              for (var i = 0; i < result.recordset.length; i++) {
                IDsNoTraer += " and identificador != '" + result.recordset[i].idObjeto + "'";
              }

              ;

              if (resultadoQueryString.length > 0) {
                _this5.getValidIDsString(resultadoQueryString, IDsNoTraer);
              } else {
                _this5.initiateBringObjects(IDsNoTraer);
              }
            });
          }
        });
      }); // fin transaction4
    }
  }, {
    key: "getValidIDsString",
    value: function getValidIDsString(queryStringString, IDsNoTraer) {
      var _this6 = this;

      var transaction5 = new _mssql["default"].Transaction(this.props.pool);
      transaction5.begin(function (err) {
        var rolledBack = false;
        transaction5.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request5 = new _mssql["default"].Request(transaction5);
        request5.query("select DISTINCT idObjeto from ResultadosString " + queryStringString, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              alert('no se pudo traer datos');
              transaction5.rollback(function (err) {});
            }
          } else {
            transaction5.commit(function (err) {
              for (var i = 0; i < result.recordset.length; i++) {
                IDsNoTraer += " and identificador != '" + result.recordset[i].idObjeto + "'";
              }

              ;

              _this6.initiateBringObjects(IDsNoTraer);
            });
          }
        });
      }); // fin transaction5
    }
  }, {
    key: "initiateBringObjects",
    value: function initiateBringObjects(IDsNoTraer) {
      this.getObjectsID(" where objeto = 'Cliente' ", IDsNoTraer, true);
    }
  }, {
    key: "getFilterQuery",
    value: function getFilterQuery(filtro) {//if (filtro.)
    }
  }, {
    key: "getObjectsID",
    value: function getObjectsID(whereCondition, IDsNoTraer, esCliente) {
      var _this7 = this;

      console.log('esCliente');
      console.log(esCliente);
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosID " + whereCondition + IDsNoTraer, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              alert('no se pudo traer datos');
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              //binary insert ID
              tamBanderaActual = 0, tamBanderaFinal = result.recordset.length;

              for (var i = 0; i < result.recordset.length; i++) {
                if (esCliente) _this7.binaryInsertClient(result.recordset[i], _this7.state.resultadosClientes, "identificador", "identificador", []);else _this7.binaryInsertCredit(result.recordset[i], _this7.state.resultadosPrestamos, "identificador", "idPadre", "identificador");

                _this7.getObjectsField(result.recordset[i].identificador, IDsNoTraer, esCliente);

                _this7.insertIntoFieldArray(result.recordset[i], "int");

                if (esCliente) _this7.verificarFinClientes(IDsNoTraer, esCliente);
              }

              ;
              console.log("resultados");
              console.log(_this7.state.resultadosClientes);
              console.log(_this7.state.resultadosPrestamos);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getObjectsField",
    value: function getObjectsField(idObjeto, IDsNoTraer, esCliente) {
      var _this8 = this;

      tamBanderaActual++; //traer campos de resultados de base de datos

      var transaction1 = new _mssql["default"].Transaction(this.props.pool);
      transaction1.begin(function (err) {
        var rolledBack = false;
        transaction1.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request1 = new _mssql["default"].Request(transaction1);
        request1.query("select * from ResultadosInt where idObjeto = '" + idObjeto + "'", function (err, result) {
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
                  if (esCliente) _this8.binaryInsertClient(result.recordset[i], _this8.state.resultadosClientes, "idObjeto", "identificador", result.recordset);else _this8.binaryInsertCreditField(result.recordset[i]);

                  _this8.insertIntoFieldArray(result.recordset[i], "int");
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
        request2.query("select * from ResultadosDecimal where idObjeto = '" + idObjeto + "'", function (err, result) {
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
                  if (esCliente) _this8.binaryInsertClient(result.recordset[i], _this8.state.resultadosClientes, "idObjeto", "identificador", result.recordset);else _this8.binaryInsertCreditField(result.recordset[i]);

                  _this8.insertIntoFieldArray(result.recordset[i], "decimal");
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
          request3.query("select * from ResultadosDate where idObjeto = '"+idObjeto+"'", (err, result) => {
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
                                  this.binaryInsertClient(result.recordset[i], this.state.resultadosClientes, "idObjeto", "identificador", result.recordset);
                              else
                                  this.binaryInsertCreditField(result.recordset[i]);
                              this.insertIntoFieldArray(result.recordset[i], "date");
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
        request4.query("select * from ResultadosBool where idObjeto = '" + idObjeto + "'", function (err, result) {
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
                  if (esCliente) _this8.binaryInsertClient(result.recordset[i], _this8.state.resultadosClientes, "idObjeto", "identificador", result.recordset);else _this8.binaryInsertCreditField(result.recordset[i]);

                  _this8.insertIntoFieldArray(result.recordset[i], "bool");
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
        request5.query("select * from ResultadosString where idObjeto = '" + idObjeto + "'", function (err, result) {
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
                  if (esCliente) _this8.binaryInsertClient(result.recordset[i], _this8.state.resultadosClientes, "idObjeto", "identificador", result.recordset);else _this8.binaryInsertCreditField(result.recordset[i]);

                  _this8.insertIntoFieldArray(result.recordset[i], "varchar");
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
    value: function binaryInsertClient(newValue, array, objectField, arrayField, fieldsToSave, startVal, endVal) {
      var length = array.length;
      var start = typeof startVal != 'undefined' ? startVal : 0;
      var end = typeof endVal != 'undefined' ? endVal : length - 1; //!! endVal could be 0 don't use || syntax

      var m = start + Math.floor((end - start) / 2);

      if (length == 0) {
        var newObject = {};
        newObject[arrayField] = parseInt(newValue[objectField]);

        for (var i = 0; i < fieldsToSave.length; i++) {
          newObject[fieldsToSave[i].nombre] = fieldsToSave[i].valor;
        }

        ; // 1. Make a shallow copy of the items

        var prestamos = _toConsumableArray(this.state.resultadosClientes); // 3. Replace the property you're intested in


        prestamos.push(newObject); // 5. Set the state to our new copy

        this.setState({
          resultadosClientes: prestamos
        }); //array.push(newObject);

        return;
      }

      if (parseInt(newValue[objectField]) == parseInt(array[m][arrayField])) {
        for (var i = 0; i < fieldsToSave.length; i++) {
          array[m][fieldsToSave[i].nombre] = fieldsToSave[i].valor;
        }

        ;
        return;
      }

      if (parseInt(newValue[objectField]) > parseInt(array[end][arrayField])) {
        var newObject = {};
        newObject[arrayField] = parseInt(newValue[objectField]);

        for (var i = 0; i < fieldsToSave.length; i++) {
          newObject[fieldsToSave[i].nombre] = fieldsToSave[i].valor;
        }

        ; // 1. Make a shallow copy of the items

        var _prestamos = _toConsumableArray(this.state.resultadosClientes); // 3. Replace the property you're intested in


        _prestamos.splice(end + 1, 0, newObject); // 5. Set the state to our new copy


        this.setState({
          resultadosClientes: _prestamos
        }); //array.splice(end + 1, 0, newObject);

        return;
      }

      if (parseInt(newValue[objectField]) < parseInt(array[start][arrayField])) {
        //!!
        var newObject = {};
        newObject[arrayField] = parseInt(newValue[objectField]);

        for (var i = 0; i < fieldsToSave.length; i++) {
          newObject[fieldsToSave[i].nombre] = fieldsToSave[i].valor;
        }

        ; // 1. Make a shallow copy of the items

        var _prestamos2 = _toConsumableArray(this.state.resultadosClientes); // 3. Replace the property you're intested in


        _prestamos2.splice(start, 0, newObject); // 5. Set the state to our new copy


        this.setState({
          resultadosClientes: _prestamos2
        }); //array.splice(start, 0, newObject);

        return;
      }

      if (start >= end) {
        return;
      }

      if (parseInt(newValue[objectField]) < parseInt(array[m][arrayField])) {
        this.binaryInsertClient(newValue, array, objectField, arrayField, fieldsToSave, start, m - 1);
        return;
      }

      if (parseInt(newValue[objectField]) > parseInt(array[m][arrayField])) {
        this.binaryInsertClient(newValue, array, objectField, arrayField, fieldsToSave, m + 1, end);
        return;
      }
    }
  }, {
    key: "binaryInsertCredit",
    value: function binaryInsertCredit(newValue, array, fieldClient, fieldCreditOwner, fieldCreditID, startVal, endVal) {
      var length = array.length;
      var start = typeof startVal != 'undefined' ? startVal : 0;
      var end = typeof endVal != 'undefined' ? endVal : length - 1;
      var m = start + Math.floor((end - start) / 2);

      if (length == 0) {
        if (this.state.resultadosClientes.length > 0) {
          if (this.state.resultadosPrestamos[0] == undefined) this.state.resultadosPrestamos[0] = [];
          var newObjectCredito = {};
          newObjectCredito[fieldCreditID] = parseInt(newValue[fieldCreditID]);
          this.state.resultadosPrestamos[0].push(newObjectCredito);
        }

        return;
      }

      if (parseInt(newValue[fieldCreditOwner]) == this.state.resultadosClientes[m][fieldClient]) {
        var existeCredito = false;

        for (var i = 0; i < this.state.resultadosPrestamos[m].length; i++) {
          if (this.state.resultadosPrestamos[m][i][fieldCreditID] == newValue[fieldCreditID]) {
            existeCredito = true;
            break;
          }
        }

        ;

        if (!existeCredito) {
          var newObjectCredito = {};
          newObjectCredito[fieldCreditID] = parseInt(newValue[fieldCreditID]); // 1. Make a shallow copy of the items

          var prestamos = _toConsumableArray(this.state.resultadosPrestamos); // 2. Make a shallow copy of the item you want to mutate


          var prestamo = _toConsumableArray(prestamos[m]); // 3. Replace the property you're intested in


          prestamo.push(newObjectCredito); // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first

          prestamos[m] = prestamo; // 5. Set the state to our new copy

          this.setState({
            resultadosPrestamos: prestamos
          }); //this.state.resultadosPrestamos[m].push(newObjectCredito);
        }

        return;
      }

      if (parseInt(newValue[fieldCreditOwner]) > this.state.resultadosClientes[end][fieldClient]) {
        var newObjectCredito = {};
        newObjectCredito[fieldCreditID] = parseInt(newValue[fieldCreditID]);
        newArray = [newObjectCredito]; // 1. Make a shallow copy of the items

        var _prestamos3 = _toConsumableArray(this.state.resultadosPrestamos); // 3. Replace the property you're intested in


        _prestamos3.splice(end + 1, 0, newArray); // 5. Set the state to our new copy


        this.setState({
          resultadosPrestamos: _prestamos3
        }); //this.state.resultadosPrestamos.splice(end + 1, 0, newArray);

        return;
      }

      if (parseInt(newValue[fieldCreditOwner]) < this.state.resultadosClientes[start][fieldClient]) {
        var newObjectCredito = {};
        newObjectCredito[fieldCreditID] = parseInt(newValue[fieldCreditID]);
        var newArray = [newObjectCredito]; // 1. Make a shallow copy of the items

        var _prestamos4 = _toConsumableArray(this.state.resultadosPrestamos); // 3. Replace the property you're intested in


        _prestamos4.splice(start, 0, newArray); // 5. Set the state to our new copy


        this.setState({
          resultadosPrestamos: _prestamos4
        }); //this.state.resultadosPrestamos.splice(start, 0, newArray);

        return;
      }

      if (start >= end) {
        return;
      }

      if (parseInt(newValue[fieldCreditOwner]) < this.state.resultadosClientes[m][fieldClient]) {
        this.binaryInsertCredit(newValue, array, fieldClient, fieldCreditOwner, fieldCreditID, start, m - 1);
        return;
      }

      if (parseInt(newValue[fieldCreditOwner]) > this.state.resultadosClientes[m][fieldClient]) {
        this.binaryInsertCredit(newValue, array, fieldClient, fieldCreditOwner, fieldCreditID, m + 1, end);
        return;
      }
    }
  }, {
    key: "binaryInsertCreditField",
    value: function binaryInsertCreditField(newValue) {
      for (var i = 0; i < this.state.resultadosPrestamos.length; i++) {
        for (var j = 0; j < this.state.resultadosPrestamos[i].length; j++) {
          if (this.state.resultadosPrestamos[i][j].identificador == newValue.idObjeto) {
            //this.state.resultadosPrestamos[i][j][newValue.nombre] = newValue.valor;
            // 1. Make a shallow copy of the items
            var prestamos = _toConsumableArray(this.state.resultadosPrestamos); // 2. Make a shallow copy of the item you want to mutate


            var prestamo = _objectSpread({}, prestamos[i][j]); // 3. Replace the property you're intested in


            prestamo[newValue.nombre] = newValue.valor; // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first

            prestamos[i][j] = prestamo; // 5. Set the state to our new copy

            this.setState({
              resultadosPrestamos: prestamos
            });
            return;
          }
        }

        ;
      }

      ;
    }
  }, {
    key: "verificarFinClientes",
    value: function verificarFinClientes(IDsNoTraer, esCliente) {
      if (tamBanderaActual == tamBanderaFinal && esCliente) {
        this.getObjectsID(" where objeto = 'Préstamo' ", IDsNoTraer, false);
      }
    }
  }, {
    key: "insertIntoFieldArray",
    value: function insertIntoFieldArray(field, type) {
      if (field.nombre.localeCompare("numPrestamo") != 0 && field.nombre.localeCompare("idCliente") != 0) {
        if (field.objeto.localeCompare("Cliente") == 0) {
          var copiaTemp = _toConsumableArray(this.state.camposClientes);

          var entro = false;

          for (var i = 0; i < copiaTemp.length; i++) {
            if (copiaTemp[i].nombre.localeCompare(field.nombre) == 0) {
              entro = true;
              break;
            }
          }

          ;

          if (copiaTemp.length == 0 || !entro) {
            field.tipo = type;
            copiaTemp.push(field);
          }

          this.setState({
            camposClientes: copiaTemp
          });
        } else if (field.objeto.localeCompare("Préstamo") == 0) {
          var copiaTemp = _toConsumableArray(this.state.camposPrestamos);

          var entro = false;

          for (var i = 0; i < copiaTemp.length; i++) {
            if (copiaTemp[i].nombre.localeCompare(field.nombre) == 0) {
              entro = true;
              break;
            }
          }

          ;

          if (copiaTemp.length == 0 || !entro) {
            field.tipo = type;
            copiaTemp.push(field);
          }

          this.setState({
            camposPrestamos: copiaTemp
          });
        }
      }
    }
  }, {
    key: "crearArchivoExcel",
    value: function crearArchivoExcel() {
      console.log(this.state.resultadosClientes);
      console.log(this.state.resultadosPrestamos);
      console.log(this.state.camposClientes);
      console.log(this.state.camposPrestamos);
      var workbook = {
        SheetNames: ["Libro1"],
        Sheets: {
          "Libro1": {
            "!merges": []
            /*,
            "!ref":"A1:"+"O"+(120+arregloTotales.length)*/

          }
        }
      };
      var k = 0;

      for (k = 0; k < this.state.camposClientes.length; k++) {
        var letraColumna = this.colName(k);
        workbook.Sheets.Libro1[letraColumna + "1"] = {
          v: this.state.camposClientes[k].nombre,
          s: {
            font: {
              color: {
                rgb: 'ffffff'
              },
              bold: true,
              sz: 15
            },
            fill: {
              patternType: "solid",
              bgColor: {
                rgb: "01579b"
              },
              fgColor: {
                rgb: "01579b"
              }
            },
            alignment: {
              horizontal: "center"
            }
          }
        };
      }

      ;

      for (var p = 0; p < this.state.camposPrestamos.length; p++) {
        var letraColumna = this.colName(k + p);
        workbook.Sheets.Libro1[letraColumna + "1"] = {
          v: this.state.camposPrestamos[p].nombre,
          s: {
            font: {
              color: {
                rgb: 'ffffff'
              },
              bold: true,
              sz: 15
            },
            fill: {
              patternType: "solid",
              bgColor: {
                rgb: "01579b"
              },
              fgColor: {
                rgb: "01579b"
              }
            },
            alignment: {
              horizontal: "center"
            }
          }
        };
      }

      ;
      var posicionNumericaFila = 2;
      var posicionNumericaColumna = 0;

      for (var i = 0; i < this.state.resultadosClientes.length; i++) {
        var m = 0;

        for (m = 0; m < this.state.camposClientes.length; m++) {
          if (i == 0) {
            posicionNumericaColumna++;
          }

          if (this.state.camposClientes[m].tipo.localeCompare("int") == 0) {
            var celda = this.getExcelCellInt(this.state.resultadosClientes[i][this.state.camposClientes[m].nombre]);
            var letraColumna = this.colName(m);
            var fila = posicionNumericaFila + i;
            workbook.Sheets.Libro1[letraColumna + fila] = celda;
          } else if (this.state.camposClientes[m].tipo.localeCompare("decimal") == 0) {
            var celda = this.getExcelCellDecimal(this.state.resultadosClientes[i][this.state.camposClientes[m].nombre]);
            var letraColumna = this.colName(m);
            var fila = posicionNumericaFila + i;
            workbook.Sheets.Libro1[letraColumna + fila] = celda;
          } else if (this.state.camposClientes[m].tipo.localeCompare("date") == 0) {
            var celda = this.getExcelCellDate(this.state.resultadosClientes[i][this.state.camposClientes[m].nombre]);
            var letraColumna = this.colName(m);
            var fila = posicionNumericaFila + i;
            workbook.Sheets.Libro1[letraColumna + fila] = celda;
          } else if (this.state.camposClientes[m].tipo.localeCompare("bool") == 0) {
            var celda = this.getExcelCellBool(this.state.resultadosClientes[i][this.state.camposClientes[m].nombre]);
            var letraColumna = this.colName(m);
            var fila = posicionNumericaFila + i;
            workbook.Sheets.Libro1[letraColumna + fila] = celda;
          } else if (this.state.camposClientes[m].tipo.localeCompare("varchar") == 0) {
            var celda = this.getExcelCellVarchar(this.state.resultadosClientes[i][this.state.camposClientes[m].nombre]);
            var letraColumna = this.colName(m);
            var fila = posicionNumericaFila + i;
            workbook.Sheets.Libro1[letraColumna + fila] = celda;
          }
        }

        ;

        for (var j = 0; j < this.state.resultadosPrestamos[i].length; j++) {
          posicionNumericaFila++;

          for (var n = 0; n < this.state.camposPrestamos.length; n++) {
            if (i == 0) {
              posicionNumericaColumna++;
            }

            if (this.state.camposPrestamos[m].tipo.localeCompare("int") == 0) {
              var celda = this.getExcelCellInt(this.state.resultadosPrestamos[i][j][this.state.camposPrestamos[n].nombre]);
              var letraColumna = this.colName(m + n);
              var fila = posicionNumericaFila + i;
              workbook.Sheets.Libro1[letraColumna + fila] = celda;
            } else if (this.state.camposPrestamos[m].tipo.localeCompare("decimal") == 0) {
              var celda = this.getExcelCellDecimal(this.state.resultadosPrestamos[i][j][this.state.camposPrestamos[n].nombre]);
              var letraColumna = this.colName(m + n);
              var fila = posicionNumericaFila + i;
              workbook.Sheets.Libro1[letraColumna + fila] = celda;
            } else if (this.state.camposPrestamos[m].tipo.localeCompare("date") == 0) {
              var celda = this.getExcelCellDate(this.state.resultadosPrestamos[i][j][this.state.camposPrestamos[n].nombre]);
              var letraColumna = this.colName(m + n);
              var fila = posicionNumericaFila + i;
              workbook.Sheets.Libro1[letraColumna + fila] = celda;
            } else if (this.state.camposPrestamos[m].tipo.localeCompare("bool") == 0) {
              var celda = this.getExcelCellBool(this.state.resultadosPrestamos[i][j][this.state.camposPrestamos[n].nombre]);
              var letraColumna = this.colName(m + n);
              var fila = posicionNumericaFila + i;
              workbook.Sheets.Libro1[letraColumna + fila] = celda;
            } else if (this.state.camposPrestamos[m].tipo.localeCompare("varchar") == 0) {
              var celda = this.getExcelCellVarchar(this.state.resultadosPrestamos[i][j][this.state.camposPrestamos[n].nombre]);
              var letraColumna = this.colName(m + n);
              var fila = posicionNumericaFila + i;
              workbook.Sheets.Libro1[letraColumna + fila] = celda;
            }
          }

          ;
        }

        ; //posicionNumericaFila++;
      }

      ;
      workbook.Sheets.Libro1["!ref"] = "A1:" + this.colName(posicionNumericaColumna) + posicionNumericaFila;
      console.log(workbook); //DESCARGAR

      var wbout = _xlsxStyle["default"].write(workbook, {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
      });

      _xlsxStyle["default"].writeFile(workbook, "./Reporte.xlsx");

      alert("Archivo Descargado.");
    }
  }, {
    key: "getExcelCellInt",
    value: function getExcelCellInt(valor) {
      var celda = {
        v: valor,
        t: 'n',
        s: {
          font: {
            color: {
              rgb: '000'
            },
            bold: false,
            sz: 13
          },
          alignment: {
            horizontal: "center"
          }
        }
      };
      return celda;
    }
  }, {
    key: "getExcelCellDecimal",
    value: function getExcelCellDecimal(valor) {
      var celda = {
        v: valor,
        t: 'n',
        s: {
          font: {
            color: {
              rgb: '000'
            },
            bold: false,
            sz: 13
          },
          alignment: {
            horizontal: "center"
          }
        }
      };
      return celda;
    }
  }, {
    key: "getExcelCellDate",
    value: function getExcelCellDate(valor) {
      var celda = {
        v: valor,
        t: 'd',
        s: {
          font: {
            color: {
              rgb: '000'
            },
            bold: false,
            sz: 13
          },
          alignment: {
            horizontal: "center"
          }
        }
      };
      return celda;
    }
  }, {
    key: "getExcelCellBool",
    value: function getExcelCellBool(valor) {
      var celda = {
        v: valor,
        s: {
          font: {
            color: {
              rgb: '000'
            },
            bold: false,
            sz: 13
          },
          alignment: {
            horizontal: "center"
          }
        }
      };
      return celda;
    }
  }, {
    key: "getExcelCellVarchar",
    value: function getExcelCellVarchar(valor) {
      var celda = {
        v: valor,
        s: {
          font: {
            color: {
              rgb: '000'
            },
            bold: false,
            sz: 13
          },
          alignment: {
            horizontal: "center"
          }
        }
      };
      return celda;
    }
  }, {
    key: "colName",
    value: function colName(n) {
      var ordA = 'a'.charCodeAt(0);
      var ordZ = 'z'.charCodeAt(0);
      var len = ordZ - ordA + 1;
      var s = "";

      while (n >= 0) {
        s = String.fromCharCode(n % len + ordA) + s;
        n = Math.floor(n / len) - 1;
      }

      return s.toUpperCase();
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
        onClick: this.crearArchivoExcel,
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
