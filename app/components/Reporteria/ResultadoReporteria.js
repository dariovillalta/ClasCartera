"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

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

var ResultadosReporteria =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ResultadosReporteria, _React$Component);

  function ResultadosReporteria(props) {
    var _this;

    _classCallCheck(this, ResultadosReporteria);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ResultadosReporteria).call(this, props));
    _this.state = {
      mensajeModal: {
        mostrarMensaje: false,
        mensajeConfirmado: false,
        esError: false,
        esConfirmar: false,
        titulo: "",
        mensaje: "",
        banderaMetodoInit: "",
        idElementoSelec: -1,
        indiceX: -1,
        indiceY: -1
      },
      resultadosClientes: [],
      resultadosPrestamos: [] //this.loadTables = this.loadTables.bind(this);

    };
    _this.getFiltersString = _this.getFiltersString.bind(_assertThisInitialized(_this));
    _this.getFilterQuery = _this.getFilterQuery.bind(_assertThisInitialized(_this));
    _this.getObjectsID = _this.getObjectsID.bind(_assertThisInitialized(_this));
    _this.getObjectsField = _this.getObjectsField.bind(_assertThisInitialized(_this));
    _this.binaryInsertClient = _this.binaryInsertClient.bind(_assertThisInitialized(_this));
    _this.binaryInsertCredit = _this.binaryInsertCredit.bind(_assertThisInitialized(_this));
    _this.binaryInsertCreditField = _this.binaryInsertCreditField.bind(_assertThisInitialized(_this));
    _this.verificarFinClientes = _this.verificarFinClientes.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ResultadosReporteria, [{
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

      /*var self = this;
      setTimeout(function(){
          self.getObjectsID(" where idPadre != '-1'"+resultadoQueryIDs, resultadoQueryInt, resultadoQueryDecimal, resultadoQueryDate, resultadoQueryBool, resultadoQueryString, false);
      }, 2000);*/
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
              tamBanderaActual = 0, tamBanderaFinal = result.recordset.length;

              for (var i = 0; i < result.recordset.length; i++) {
                if (esCliente) _this2.binaryInsertClient(result.recordset[i], _this2.state.resultadosClientes, "identificador", []);else _this2.binaryInsertCredit(result.recordset[i], _this2.state.resultadosPrestamos, "ID", "idPadre", "identificador");

                _this2.getObjectsField(result.recordset[i].identificador, queryStringInt, queryStringDecimal, queryStringDate, queryStringBool, queryStringString, esCliente);

                if (esCliente) _this2.verificarFinClientes();
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

      tamBanderaActual++; //traer campos de resultados de base de datos

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

        ; // 1. Make a shallow copy of the items

        var _prestamos = _toConsumableArray(this.state.resultadosClientes); // 3. Replace the property you're intested in


        _prestamos.splice(end + 1, 0, newObject); // 5. Set the state to our new copy


        this.setState({
          resultadosClientes: _prestamos
        }); //array.splice(end + 1, 0, newObject);

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
      var end = typeof endVal != 'undefined' ? endVal : length - 1;
      var m = start + Math.floor((end - start) / 2);

      if (length == 0) {
        if (this.state.resultadosClientes.length > 0) {
          if (this.state.resultadosPrestamos[0] == undefined) this.state.resultadosPrestamos[0] = [];
          var newObjectCredito = {
            ID: newValue[fieldCredit]
          };
          this.state.resultadosPrestamos[0].push(newObjectCredito);
        }

        return;
      }

      if (newValue[fieldCreditOwner].localeCompare(this.state.resultadosClientes[m][fieldClient]) == 0) {
        var newObjectCredito = {
          ID: newValue[fieldCredit]
        }; // 1. Make a shallow copy of the items

        var prestamos = _toConsumableArray(this.state.resultadosPrestamos); // 2. Make a shallow copy of the item you want to mutate


        var prestamo = _toConsumableArray(prestamos[m]); // 3. Replace the property you're intested in


        prestamo.push(newObjectCredito); // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first

        prestamos[m] = prestamo; // 5. Set the state to our new copy

        this.setState({
          resultadosPrestamos: prestamos
        }); //this.state.resultadosPrestamos[m].push(newObjectCredito);

        return;
      }

      if (newValue[fieldCreditOwner].localeCompare(this.state.resultadosClientes[end][fieldClient]) > 0) {
        var newObjectCredito = {
          ID: newValue[fieldCredit]
        };
        var newArray = [newObjectCredito]; // 1. Make a shallow copy of the items

        var _prestamos3 = _toConsumableArray(this.state.resultadosPrestamos); // 3. Replace the property you're intested in


        _prestamos3.splice(end + 1, 0, newArray); // 5. Set the state to our new copy


        this.setState({
          resultadosPrestamos: _prestamos3
        }); //this.state.resultadosPrestamos.splice(end + 1, 0, newArray);

        return;
      }

      if (newValue[fieldCreditOwner].localeCompare(this.state.resultadosClientes[start][fieldClient]) < 0) {
        var newObjectCredito = {
          ID: newValue[fieldCredit]
        };
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
      for (var i = 0; i < this.state.resultadosPrestamos.length; i++) {
        for (var j = 0; j < this.state.resultadosPrestamos[i].length; j++) {
          if (this.state.resultadosPrestamos[i][j].ID.localeCompare(newValue.idObjeto) == 0) {
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
    value: function verificarFinClientes() {
      console.log("tamBanderaActual = " + tamBanderaActual);
      console.log("tamBanderaFinal = " + tamBanderaFinal);

      if (tamBanderaActual == tamBanderaFinal) {
        console.log("ENTROOO");
      }
    }
    /*======_______====== ======_______======   MENSAJES MODAL    ======_______====== ======_______======*/

    /*======_______======                                                             ======_______======*/

    /*======_______======                                                             ======_______======*/

    /*======_______====== ======_______====== ==_____==  ==___==  ======_______====== ======_______======*/

  }, {
    key: "dismissMessageModal",
    value: function dismissMessageModal() {
      this.setState({
        mensajeModal: {
          mostrarMensaje: false,
          mensajeConfirmado: false,
          esError: false,
          esConfirmar: false,
          titulo: "",
          mensaje: "",
          banderaMetodoInit: "",
          idElementoSelec: -1,
          indiceX: -1,
          indiceY: -1
        }
      });
    }
  }, {
    key: "confirmMessageModal",
    value: function confirmMessageModal() {
      if (this.state.mensajeModal.banderaMetodoInit.localeCompare("goDelTable") == 0) {
        var copiaID = this.state.mensajeModal.idElementoSelec;
        this.deleteTable(copiaID);
      } else if (this.state.mensajeModal.banderaMetodoInit.localeCompare("goDelField") == 0) {
        var _copiaID = this.state.mensajeModal.idElementoSelec;
        this.deleteField(_copiaID);
      } else if (this.state.mensajeModal.banderaMetodoInit.localeCompare("goUpdField") == 0) {
        var _copiaID2 = this.state.mensajeModal.idElementoSelec;
        this.updateField(_copiaID2, this.state.mensajeModal.indiceX, this.state.mensajeModal.indiceY);
      }
    }
  }, {
    key: "showSuccesMessage",
    value: function showSuccesMessage(titulo, mensaje) {
      this.setState({
        mensajeModal: {
          mostrarMensaje: true,
          mensajeConfirmado: false,
          esError: false,
          esConfirmar: false,
          titulo: titulo,
          mensaje: mensaje,
          banderaMetodoInit: "",
          idElementoSelec: this.state.mensajeModal.idElementoSelec,
          indiceX: this.state.mensajeModal.indiceX,
          indiceY: this.state.mensajeModal.indiceY
        }
      });
      var self = this;
      setTimeout(function () {
        self.setState({
          mensajeModal: {
            mostrarMensaje: false,
            mensajeConfirmado: false,
            esError: false,
            esConfirmar: false,
            titulo: "",
            mensaje: "",
            banderaMetodoInit: "",
            idElementoSelec: self.state.mensajeModal.idElementoSelec,
            indiceX: self.state.mensajeModal.indiceX,
            indiceY: self.state.mensajeModal.indiceY
          }
        });
      }, 850);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Ver Reporteria"), _react["default"].createElement("div", {
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
        className: "row",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12",
        style: {
          width: "100%"
        }
      }, this.state.resultadosClientes.map(function (cliente, i) {
        return _react["default"].createElement("div", {
          key: cliente.ID,
          style: {
            margin: "3% 0%"
          }
        }, _react["default"].createElement(_Accordion["default"], {
          showTrash: false,
          allowMultipleOpen: true,
          color: "#ffffff"
        }, _react["default"].createElement("div", {
          label: cliente.ID + " | " + cliente.nombreCliente
        }, _this4.state.resultadosPrestamos[i] != undefined ? _react["default"].createElement("div", null, _this4.state.resultadosPrestamos[i].map(function (prestamo, j) {
          return _react["default"].createElement("div", {
            key: prestamo.ID
          }, Object.keys(_this4.state.resultadosPrestamos[i][j]).map(function (propiedad, k) {
            return _react["default"].createElement("div", {
              key: k,
              style: {
                display: "inline-block",
                padding: "1% 3%"
              },
              className: "border-top border-bottom border-left border-right"
            }, _react["default"].createElement("h4", {
              className: "col-form-label text-center"
            }, _this4.state.resultadosPrestamos[i][j][propiedad]));
          }));
        })) : _react["default"].createElement("span", null))));
      }))), this.state.mensajeModal.mostrarMensaje ? _react["default"].createElement(_MessageModal["default"], {
        esError: this.state.mensajeModal.esError,
        esConfirmar: this.state.mensajeModal.esConfirmar,
        dismissMessage: this.dismissMessageModal,
        confirmFunction: this.confirmMessageModal,
        titulo: this.state.mensajeModal.titulo,
        mensaje: this.state.mensajeModal.mensaje
      }, " ") : _react["default"].createElement("span", null));
    }
    /*render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"page-header"}>
                            <h2 className={"pageheader-title"}>Configuraci&oacute;n</h2>
                            <div className={"page-breadcrumb"}>
                                <nav aria-label="breadcrumb">
                                    <ol className={"breadcrumb"}>
                                        <li className={"breadcrumb-item"} aria-current="page" onClick={this.props.showConfigurationComponent}><a href="#" className={"breadcrumb-link"}>Configuraci&oacute;n</a></li>
                                        <li className={"breadcrumb-item active"} aria-current="page">Tablas</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"} style={{width: "100%"}}>
                        {this.state.tablas.map((tabla, i) => (
                            <Accordion key={tabla.ID} showTrash={true} deleteVariable={() => this.deleteTableConfirmation(tabla.ID, i)} allowMultipleOpen>
                                <div label={tabla.nombre} className={"border-top"}>
                                     { this.state.camposTablas[i] != undefined ? (
                                        <div>
                                            {this.state.camposTablas[i].map((campo, j) => (
                                                <div key={campo.ID} className={"border-top alert alert-primary"} style={{padding: "1% 3%"}}>
                                                    <div className={"row"}>
                                                        <div className={"form-group col-xl-6 col-6"}>
                                                            <h4 className={"col-form-label text-center"}>Tabla</h4>
                                                            <select id={"campoTablaID"+i+j} className={"form-control"} defaultValue={campo.tablaID}>
                                                                <option value="" key="0">Seleccione una tabla...</option>
                                                                {this.state.tablas.map((tabla, k) =>
                                                                    <option value={tabla.ID} key={tabla.ID}>{tabla.nombre}</option>
                                                                )}
                                                            </select>
                                                        </div>
                                                        <div className={"form-group col-xl-6 col-6"}>
                                                            <h4 className={"col-form-label text-center"}>Nombre de Campo</h4>
                                                            <InlineEdit id={"campoNombre"+i+j} texto={campo.nombre}> </InlineEdit>
                                                        </div>
                                                    </div>
                                                    <div className={"row"}>
                                                        <div className="form-group col-xl-6 col-6">
                                                            <h4 className={"col-form-label text-center"}>Tipo</h4>
                                                            <select id={"campoTipo"+i+j} className={"form-control"} defaultValue={campo.tipo}>
                                                                <option value="" key="0">Seleccione un tipo de variable...</option>
                                                                {campos.map((campoSelect, k) =>
                                                                    <option value={campoSelect.nombre} key={k}>{campoSelect.nombre}</option>
                                                                )}
                                                            </select>
                                                        </div>
                                                        <div className={"form-group col-xl-6 col-6"}>
                                                            <h4 className={"col-form-label text-center"}>Guardar Campo en Resultados</h4>
                                                            <div className={"switch-button switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                                                                { campo.guardar ? (
                                                                    <input type="checkbox" defaultChecked name={"campoGuardar"+i+j} id={"campoGuardar"+i+j}/>
                                                                ) : (
                                                                    <input type="checkbox" name={"campoGuardar"+i+j} id={"campoGuardar"+i+j}/>
                                                                )}
                                                                <span><label htmlFor={"campoGuardar"+i+j}></label></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    { this.state.errorModificarCampo.mostrar ? (
                                                        <ErrorMessage campo={this.state.errorModificarCampo.campo} descripcion={this.state.errorModificarCampo.descripcion} dismissTableError={this.dismissFieldEditError}> </ErrorMessage>
                                                    ) : (
                                                        <span></span>
                                                    )}
                                                    <div className={"row"}>
                                                        <button onClick={() => this.updateFieldsConfirmation(campo.ID, i, j)} className={"btn btn-light btn-block col-xl-5 col-5"} style={{margin: "0 auto", display: "block"}}>Guardar</button>
                                                        <button onClick={() => this.deleteFieldsConfirmation(campo.ID, i, j)} className={"btn btn-light btn-block col-xl-1 col-1"} style={{margin: "0 auto", display: "block", display: "flex", alignItems: "center", justifyContent: "center"}}><img onClick={this.props.deleteVariable} src={"../assets/trash.png"} style={{height: "20px", width: "20px"}}></img></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <span></span>
                                    )}  
                                     <div className={"border-top alert alert-primary"} style={{margin: "3% 0%"}}>
                                        <div className={"row"}>
                                            <div className={"form-group col-xl-6 col-6"}>
                                                <h4 className={"col-form-label text-center"}>Tabla</h4>
                                                <h4 style={{fontFamily: 'Circular Std Medium', color: "#71748d"}} className={"alert-heading"} >{tabla.nombre}</h4>
                                            </div>
                                            <div className={"form-group col-xl-6 col-6"}>
                                                <h4 className={"col-form-label text-center"}>Nombre de Campo</h4>
                                                <input id={"campoNombre"+i} type="text" className={"form-control"}/>
                                            </div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"form-group col-xl-6 col-6"}>
                                                <h4 className={"col-form-label text-center"}>Tipo</h4>
                                                <select id={"campoTipo"+i} className={"form-control"}>
                                                    <option value="" key="0">Seleccione un tipo de variable...</option>
                                                    {campos.map((campo, k) =>
                                                        <option value={campo.nombre} key={k}>{campo.nombre}</option>
                                                    )}
                                                </select>
                                            </div>
                                            <div className={"form-group col-xl-6 col-6"}>
                                                <h4 className={"col-form-label text-center"}>Guardar Campo en Resultados</h4>
                                                <div className={"switch-button switch-button-yesno"} style={{margin:"0 auto", display:"block"}}>
                                                    <input type="checkbox" defaultChecked name={"campoGuardar"+i} id={"campoGuardar"+i}/><span>
                                                    <label htmlFor={"campoGuardar"+i}></label></span>
                                                </div>
                                            </div>
                                        </div>
                                        { this.state.errorCreacionCampo.mostrar ? (
                                            <ErrorMessage campo={this.state.errorCreacionCampo.campo} descripcion={this.state.errorCreacionCampo.descripcion} dismissTableError={this.dismissFieldNewError}> </ErrorMessage>
                                        ) : (
                                            <span></span>
                                        )}
                                        <div className={"row"}>
                                            <button onClick={() => this.insertField(i)} className={"btn btn-light btn-block col-xl-10 col-10"} style={{margin: "0 auto", display: "block"}}>Crear</button>
                                        </div>
                                    </div>
                                </div>
                            </Accordion>
                        ))}
                    </div>
                </div>
                 <div className={"row"}>
                    <div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                        <div className={"card influencer-profile-data"}>
                            <div className={"card-body"}>
                                <h3>Crear Nueva Tabla</h3>
                                <div className={"row border-top"}>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Nombre de la Conecci&oacute;n</label>
                                        <input id="nombreTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Usuario de la Tabla</label>
                                        <input id="usuarioTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Contrase&ntilde;a de la Tabla</label>
                                        <input id="contrasenaTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Servidor de la Tabla</label>
                                        <input id="servidorTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Base de Datos de la Tabla</label>
                                        <input id="basedatosTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                    <div className="form-group col-xl-6 col-6">
                                        <label className={"col-form-label"}>Nombre de la Tabla</label>
                                        <input id="tablaTablaNuevo" type="text" className={"form-control"}/>
                                    </div>
                                </div>
                                { this.state.errorCreacionTabla.mostrar ? (
                                    <ErrorMessage campo={this.state.errorCreacionTabla.campo} descripcion={this.state.errorCreacionTabla.descripcion} dismissTableError={this.dismissTableNewError}> </ErrorMessage>
                                ) : (
                                    <span></span>
                                )}
                                <div className={"row"}>
                                    <button onClick={this.insertTable} className={"btn btn-success btn-block col-xl-10 col-10"} style={{margin: "0 auto", display: "block"}}>Crear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                { this.state.mensajeModal.mostrarMensaje ? (
                    <MessageModal esError={this.state.mensajeModal.esError} esConfirmar={this.state.mensajeModal.esConfirmar} dismissMessage={this.dismissMessageModal} confirmFunction={this.confirmMessageModal} titulo={this.state.mensajeModal.titulo} mensaje={this.state.mensajeModal.mensaje}> </MessageModal>
                ) : (
                    <span></span>
                )}
            </div>
        );
    }*/

  }]);

  return ResultadosReporteria;
}(_react["default"].Component);

exports["default"] = ResultadosReporteria;
//# sourceMappingURL=ResultadoReporteria.js.map
