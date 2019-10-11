"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _SeleccionarTablaClasificarCarteraProceso = _interopRequireDefault(require("./SeleccionarTablaClasificarCarteraProceso.js"));

var _ConfiguracionTablasClasificar = _interopRequireDefault(require("./ConfiguracionTablasClasificar.js"));

var _ClasificarCreditoD = require("../ClasificarCreditoD.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var myWorker = new Worker("./components/ClasificarCredito.js"); //import "../../libs/moment/min/moment.min.js";

var tamanoFinalBandera = 0,
    tamanoActualBandera = 0,
    camposGuardar,
    arregloCamposTablasSeleccionadas = [];
var procesosACalcular = {
  capacidadDeudor: false,
  diasMora: false,
  disponibilidadGarantias: false,
  entornoEconomico: false,
  tiposCredito: false,
  categoriasClasificacion: false,
  criteriosDeterioro: false
};
var banderaGuardarResultadosTamActual, banderaGuardarResultadosTamFinal;
var tamanoFinalBanderaTIPOCREDITOS = 0,
    tamanoActualBanderaTIPOCREDITOS = 0,
    banderaGuardarResultadosTamActualTIPOCREDITOS = 0,
    banderaGuardarResultadosTamFinalTIPOCREDITOS = 0,
    tamanoActualBanderaCamposReglasTipoCreditoCampos = 0,
    tamanoFinalBanderaCamposReglasTipoCreditoCampos = 0,
    tamanoActualBanderaValoresReglasTipoCreditoCampos = 0,
    tamanoFinalBanderaValoresReglasTipoCreditoCampos = 0;
var tamanoFinalBanderaCATEGORIACLASIFICACION = 0,
    tamanoActualBanderaCATEGORIACLASIFICACION = 0,
    banderaGuardarResultadosTamActualCATEGORIACLASIFICACION = 0,
    banderaGuardarResultadosTamFinalCATEGORIACLASIFICACION = 0,
    tamanoActualBanderaCamposReglasCategoriaClasificacionCampos = 0,
    tamanoFinalBanderaCamposReglasCategoriaClasificacionCampos = 0,
    tamanoActualBanderaValoresReglasCategoriaClasificacionCampos = 0,
    tamanoFinalBanderaValoresReglasCategoriaClasificacionCampos = 0;
var guardarTipoCredito = false,
    guardarCategoriaClasificacion = false,
    guardarMora = false,
    guardarCriterioDeterioro = false;

var ClasificarCarteraProceso =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ClasificarCarteraProceso, _React$Component);

  function ClasificarCarteraProceso(props) {
    var _this;

    _classCallCheck(this, ClasificarCarteraProceso);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ClasificarCarteraProceso).call(this, props));
    _this.state = {
      widthActual: "33%",
      tablasOrginales: [],
      tablasSeleccionadas: [],
      opcionesTablasSeleccionadas: []
    };
    _this.loadTables = _this.loadTables.bind(_assertThisInitialized(_this));
    _this.selectTable = _this.selectTable.bind(_assertThisInitialized(_this));
    _this.iniciarCalculoMora = _this.iniciarCalculoMora.bind(_assertThisInitialized(_this));
    _this.iniciarTipoDeCreditos = _this.iniciarTipoDeCreditos.bind(_assertThisInitialized(_this));
    _this.iniciarCategoriasClasificacion = _this.iniciarCategoriasClasificacion.bind(_assertThisInitialized(_this));
    _this.iniciarCriteriosDeterioro = _this.iniciarCriteriosDeterioro.bind(_assertThisInitialized(_this));
    _this.tablasGuardarCampos = _this.tablasGuardarCampos.bind(_assertThisInitialized(_this));
    _this.verificarGuardarCampos = _this.verificarGuardarCampos.bind(_assertThisInitialized(_this));
    _this.verificarSeleccionoTablas = _this.verificarSeleccionoTablas.bind(_assertThisInitialized(_this));
    _this.creandoArreglos = _this.creandoArreglos.bind(_assertThisInitialized(_this));
    _this.fetchDataComportamientoPago = _this.fetchDataComportamientoPago.bind(_assertThisInitialized(_this));
    _this.getPrestamoTablaComportamientoPago = _this.getPrestamoTablaComportamientoPago.bind(_assertThisInitialized(_this));
    _this.getPrestamoCamposDeTablaComportamientoPago = _this.getPrestamoCamposDeTablaComportamientoPago.bind(_assertThisInitialized(_this));
    _this.getPlanPagoTablaComportamientoPago = _this.getPlanPagoTablaComportamientoPago.bind(_assertThisInitialized(_this));
    _this.getPlanPagoCamposDeTablaComportamientoPago = _this.getPlanPagoCamposDeTablaComportamientoPago.bind(_assertThisInitialized(_this));
    _this.initWebWorkerComportamientoPago = _this.initWebWorkerComportamientoPago.bind(_assertThisInitialized(_this));
    _this.propiedadDeObjetoExisteEnTablaCampos = _this.propiedadDeObjetoExisteEnTablaCampos.bind(_assertThisInitialized(_this));
    _this.verificarProcesosAClasificar = _this.verificarProcesosAClasificar.bind(_assertThisInitialized(_this));
    _this.obtenerTipoCredito = _this.obtenerTipoCredito.bind(_assertThisInitialized(_this));
    _this.obtenerTipoCreditoCampos = _this.obtenerTipoCreditoCampos.bind(_assertThisInitialized(_this));
    _this.fetchDataTipoCredito = _this.fetchDataTipoCredito.bind(_assertThisInitialized(_this));
    _this.fetchDataReglasTipoCreditoCampos = _this.fetchDataReglasTipoCreditoCampos.bind(_assertThisInitialized(_this));
    _this.fetchDataCamposReglasTipoCreditoCampos = _this.fetchDataCamposReglasTipoCreditoCampos.bind(_assertThisInitialized(_this));
    _this.verificarCamposReglasTipoCreditoCampos = _this.verificarCamposReglasTipoCreditoCampos.bind(_assertThisInitialized(_this));
    _this.fetchDataValoresReglasTipoCreditoCampos = _this.fetchDataValoresReglasTipoCreditoCampos.bind(_assertThisInitialized(_this));
    _this.verificarValoresReglasTipoCreditoCampos = _this.verificarValoresReglasTipoCreditoCampos.bind(_assertThisInitialized(_this));
    _this.verifyTypeCreditFinal = _this.verifyTypeCreditFinal.bind(_assertThisInitialized(_this));
    _this.checkFinishMethods = _this.checkFinishMethods.bind(_assertThisInitialized(_this));
    _this.fetchDataCategoriaClasificacion = _this.fetchDataCategoriaClasificacion.bind(_assertThisInitialized(_this));
    _this.verifyClasificationCategoryFinal = _this.verifyClasificationCategoryFinal.bind(_assertThisInitialized(_this));
    _this.fetchDataReglasCategoriaClasificacionCampos = _this.fetchDataReglasCategoriaClasificacionCampos.bind(_assertThisInitialized(_this));
    _this.verificarCamposReglasCategoriaClasificacionCampos = _this.verificarCamposReglasCategoriaClasificacionCampos.bind(_assertThisInitialized(_this));
    _this.fetchDataCamposReglasCategoriaClasificacionCampos = _this.fetchDataCamposReglasCategoriaClasificacionCampos.bind(_assertThisInitialized(_this));
    _this.fetchDataValoresReglasCategoriaClasificacionCampos = _this.fetchDataValoresReglasCategoriaClasificacionCampos.bind(_assertThisInitialized(_this));
    _this.verifyDeteriorationCriteriaFinal = _this.verifyDeteriorationCriteriaFinal.bind(_assertThisInitialized(_this));
    _this.getFieldsToSave = _this.getFieldsToSave.bind(_assertThisInitialized(_this));
    _this.startSavingObjects = _this.startSavingObjects.bind(_assertThisInitialized(_this));
    _this.saveObjectID = _this.saveObjectID.bind(_assertThisInitialized(_this));
    _this.saveObjectIntField = _this.saveObjectIntField.bind(_assertThisInitialized(_this));
    _this.saveObjectDecimalField = _this.saveObjectDecimalField.bind(_assertThisInitialized(_this));
    _this.saveObjectDateField = _this.saveObjectDateField.bind(_assertThisInitialized(_this));
    _this.saveObjecBoolField = _this.saveObjecBoolField.bind(_assertThisInitialized(_this));
    _this.saveObjectStringField = _this.saveObjectStringField.bind(_assertThisInitialized(_this));
    _this.getCriterioDeterioro = _this.getCriterioDeterioro.bind(_assertThisInitialized(_this));
    _this.formatDateCreation = _this.formatDateCreation.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ClasificarCarteraProceso, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadTables(); //myWorker.postMessage(["comportamientoPago", sql]);

      myWorker.onmessage = function (event) {
        console.log('EN MAIN JS');
        console.log(event.data);
      };
    }
  }, {
    key: "loadTables",
    value: function loadTables() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Tablas", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              for (var i = 0; i < result.recordset.length; i++) {
                result.recordset[i].active = false;
              }

              ;

              _this2.setState({
                tablasOrginales: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "selectTable",
    value: function selectTable(index) {
      var existeTablaEnConf = false;
      this.state.tablasOrginales[index].active = !this.state.tablasOrginales[index].active;
      this.setState({
        tablasOrginales: this.state.tablasOrginales
      });

      for (var i = 0; i < this.state.tablasSeleccionadas.length; i++) {
        if (this.state.tablasOrginales[index].ID == this.state.tablasSeleccionadas[i].ID) {
          existeTablaEnConf = true;
          break;
        }
      }

      ;

      if (!existeTablaEnConf) {
        var tablasSelCopiaTemp = _toConsumableArray(this.state.tablasSeleccionadas);

        tablasSelCopiaTemp.push(this.state.tablasOrginales[index]);
        this.setState({
          tablasSeleccionadas: tablasSelCopiaTemp
        });

        if (tablasSelCopiaTemp.length == 1) {
          this.setState({
            widthActual: "100%"
          });
        } else if (tablasSelCopiaTemp.length == 2) {
          this.setState({
            widthActual: "50%"
          });
        } else {
          this.setState({
            widthActual: "33%"
          });
        }

        this.verificarProcesosAClasificar(this.state.tablasOrginales[index].ID);
      }
    } //metodo para agregar tipo de credito, tipo de cliente, criterios de clasificacion por tabla

  }, {
    key: "verificarProcesosAClasificar",
    value: function verificarProcesosAClasificar(index) {//opcionesTablasSeleccionadas
      //this.obtenerTipoCredito(index);
    }
  }, {
    key: "obtenerTipoCredito",
    value: function obtenerTipoCredito(index) {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from TipoCredito where tablaID = " + index, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length > 0) {
                var tablasSelCopiaTemp = _toConsumableArray(_this3.state.opcionesTablasSeleccionadas);

                if (tablasSelCopiaTemp[_this3.state.tablasSeleccionadas.length - 1] == undefined) tablasSelCopiaTemp[_this3.state.tablasSeleccionadas.length - 1] = {};
                tablasSelCopiaTemp[_this3.state.tablasSeleccionadas.length - 1].tipoCreditoNombre = result.recordset[0].nombre;

                _this3.setState({
                  opcionesTablasSeleccionadas: tablasSelCopiaTemp
                });

                _this3.obtenerTipoCreditoCampos(result.recordset[0].ID);
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "obtenerTipoCreditoCampos",
    value: function obtenerTipoCreditoCampos(ID) {
      var _this4 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from TipoCreditoCampo where tipoCreditoID = " + ID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var tablasSelCopiaTemp = _toConsumableArray(_this4.state.opcionesTablasSeleccionadas);

              if (tablasSelCopiaTemp[_this4.state.tablasSeleccionadas.length - 1] == undefined) tablasSelCopiaTemp[_this4.state.tablasSeleccionadas.length - 1] = {};
              tablasSelCopiaTemp[_this4.state.tablasSeleccionadas.length - 1].tipoCredito = result.recordset;

              _this4.setState({
                opcionesTablasSeleccionadas: tablasSelCopiaTemp
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "verificarSeleccionoTablas",
    value: function verificarSeleccionoTablas() {
      if (this.state.tablasSeleccionadas.length > 0) {
        this.creandoArreglos();
      } else {
        alert("Seleccione por lo menos una tabla");
      }
    }
  }, {
    key: "creandoArreglos",
    value: function creandoArreglos() {
      camposGuardar = [];
      tamanoFinalBandera = this.state.tablasOrginales.length, tamanoActualBandera = 0;

      for (var i = 0; i < this.state.tablasOrginales.length; i++) {
        this.tablasGuardarCampos(this.state.tablasOrginales[i].ID, i);
      }

      ;
      /*for (var i = 0; i < this.state.tablasSeleccionadas.length; i++) {
          //this.state.tablasSeleccionadas[i]
          var calcularComportamientoPago = false;
          var primeraVezEntra = true; //agregar valores de tabla a arreglo global de clientes, prestamos y pagos en ClasificarCartera.js
          if($("#ComportamientoPago"+i).prop('checked') == true)
              calcularComportamientoPago = true;
           if(calcularComportamientoPago) {
              this.fetchDataComportamientoPago(this.state.tablasSeleccionadas[i].ID);
              if(primeraVezEntra) {
                  primeraVezEntra = false;
              }
          }
          this.fetchDataTipoCredito(this.state.tablasSeleccionadas[i].ID);
      };*/
    }
    /*      
        *****   *****   *****       *****   *****   *****   *****
                        INICIAR ARREGLOS
        *****   *****   *****       *****   *****   *****   *****
    */

  }, {
    key: "tablasGuardarCampos",
    value: function tablasGuardarCampos(tablaID, posicionArregloTablasSel) {
      var _this5 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Tablas where ID = " + tablaID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var usuario = result.recordset[0].usuario;
              var password = result.recordset[0].contrasena;
              var servidor = result.recordset[0].servidor;
              var basedatos = result.recordset[0].baseDatos;
              var tabla = result.recordset[0].tabla;
              /*              CONSIGUIENDO VALORES DE TABLA         */

              var pool = new _mssql["default"].ConnectionPool({
                user: usuario,
                password: password,
                server: servidor,
                database: basedatos,
                stream: true,
                connectionTimeout: 900000,
                requestTimeout: 900000,
                pool: {
                  max: 40,
                  min: 0,
                  idleTimeoutMillis: 30000
                },
                options: {
                  useUTC: false
                }
              });
              pool.connect(function (err) {
                pool.request() // or: new sql.Request(pool1)
                .query("select * from " + tabla, function (err, result) {
                  if (result != undefined) {
                    _this5.verificarGuardarCampos(tablaID, result.recordset, posicionArregloTablasSel);
                  } else {//agregar error fallo connecion tabla (no existe o malos campos)
                  }
                });
              }); // fin pool connect
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "verificarGuardarCampos",
    value: function verificarGuardarCampos(tablaID, valoresTabla, posicionArregloTablasSel) {
      var _this6 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Campos where tablaID = " + tablaID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              var identificadorCliente = result.recordset.filter(function (object) {
                return object.funcion.localeCompare("Identificador") == 0 && object.tabla.localeCompare("Cliente") == 0;
              });
              var identificadorPrestamo = result.recordset.filter(function (object) {
                return object.funcion.localeCompare("Identificador") == 0 && object.tabla.localeCompare("Préstamo") == 0;
              });
              var camposAGuardarCliente = result.recordset.filter(function (object) {
                return object.tabla.localeCompare("Cliente") == 0;
              });
              var camposAGuardarPrestamo = result.recordset.filter(function (object) {
                return object.tabla.localeCompare("Préstamo") == 0;
              });
              arregloCamposTablasSeleccionadas.splice(posicionArregloTablasSel, 0, result.recordset);

              if (identificadorCliente.length == 0 && identificadorPrestamo.length == 0) {
                alert("Tiene que ingresar un campo Identificador para Cliente o para Préstamo");
              } else {
                //viendo si se llama metodo crear arreglo para clientes y prestamos o solo uno
                tamanoActualBandera++;

                if (identificadorCliente.length > 0 && identificadorPrestamo.length > 0) {
                  //myWorker.postMessage(["iniciarArregloClientes", valoresTabla, identificadorCliente[0].nombre, identificadorCliente[0].tipo, camposAGuardarCliente, false]);
                  //myWorker.postMessage(["iniciarArregloPrestamos", valoresTabla, identificadorCliente[0].nombre, identificadorPrestamo[0].nombre, identificadorCliente[0].tipo, identificadorPrestamo[0].tipo, camposAGuardarPrestamo, true]);
                  (0, _ClasificarCreditoD.constructor)(["iniciarArregloClientes", valoresTabla, identificadorCliente[0].nombre, identificadorCliente[0].tipo, camposAGuardarCliente, false]);
                  (0, _ClasificarCreditoD.constructor)(["iniciarArregloPrestamos", valoresTabla, identificadorCliente[0].nombre, identificadorPrestamo[0].nombre, identificadorCliente[0].tipo, identificadorPrestamo[0].tipo, camposAGuardarPrestamo, true]);
                  camposGuardar.concat(result.recordset);

                  _this6.iniciarCalculoMora();

                  var self = _this6;

                  myWorker.onmessage = function (e) {
                    if (e.data == 'terminoCrearArreglos') {
                      //revisando que procedimientos llamar
                      self.iniciarCalculoMora();
                    }
                  };
                } else {
                  if (identificadorCliente.length > 0) {
                    //myWorker.postMessage(["iniciarArregloClientes", valoresTabla, identificadorCliente[0].nombre, identificadorCliente[0].tipo, camposAGuardarCliente, true]);
                    (0, _ClasificarCreditoD.constructor)(["iniciarArregloClientes", valoresTabla, identificadorCliente[0].nombre, identificadorCliente[0].tipo, camposAGuardarCliente, true]);
                    var _self = _this6;
                    camposGuardar.concat(result.recordset);

                    _this6.iniciarCalculoMora();

                    myWorker.onmessage = function (e) {
                      console.log("llamado de vuelta");
                      console.log(e);

                      if (e.data == 'terminoCrearArreglos') {
                        //revisando que procedimientos llamar
                        _self.iniciarCalculoMora();
                      }
                    };
                  }
                }
              }
            });
          }
        });
      }); // fin transaction
    }
    /*      
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
                        INICIAR ARREGLOS
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
    */

    /*      
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
                        COMPORTAMIENTO PAGO
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
    */

  }, {
    key: "iniciarCalculoMora",
    value: function iniciarCalculoMora() {
      //como no tiene id prestamo o cliente, no se puede calcular comportamiento plan pago, agregar mensaje bitacora  // si verificarComportamientoPago == false
      if (tamanoActualBandera == tamanoFinalBandera) {
        guardarTipoCredito = false, guardarCategoriaClasificacion = false, guardarMora = false, guardarCriterioDeterioro = false;
        banderaGuardarResultadosTamActual = 0;
        banderaGuardarResultadosTamFinal = this.state.tablasOrginales.length;

        for (var i = 0; i < this.state.tablasOrginales.length; i++) {
          this.fetchDataComportamientoPago(this.state.tablasOrginales[i].ID);
        }

        ;
      }
    }
  }, {
    key: "fetchDataComportamientoPago",
    value: function fetchDataComportamientoPago(prestamoTablaID) {
      var _this7 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ComportamientoPago where prestamoTablaID = " + prestamoTablaID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              banderaGuardarResultadosTamActual++;

              _this7.initWebWorkerComportamientoPago(null, null, null, null, null, null, false);

              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              //banderaGuardarResultadosTamFinal += result.recordset.length;
              for (var i = 0; i < result.recordset.length; i++) {
                _this7.getPrestamoTablaComportamientoPago(result.recordset[i]);
              }

              if (result.recordset.length == 0) {
                _this7.initWebWorkerComportamientoPago(null, null, null, null, null, null, false);
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getPrestamoTablaComportamientoPago",
    value: function getPrestamoTablaComportamientoPago(ComportamientoPago) {
      var _this8 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Tablas where ID = " + ComportamientoPago.prestamoTablaID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              banderaGuardarResultadosTamActual++;

              _this8.initWebWorkerComportamientoPago(null, null, null, null, null, null, false);

              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length == 0) {
                _this8.initWebWorkerComportamientoPago(null, null, null, null, null, null, false);
              } else {
                _this8.getPrestamoCamposDeTablaComportamientoPago(result.recordset[0], ComportamientoPago);
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getPrestamoCamposDeTablaComportamientoPago",
    value: function getPrestamoCamposDeTablaComportamientoPago(tabla, ComportamientoPago) {
      var self = this;
      this.getFieldsFromCamposTable(tabla, ComportamientoPago, "prestamos", function (camposDePrestamoTabla, valoresDeTablaPrestamo, ComportamientoPago) {
        self.getPlanPagoTablaComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, ComportamientoPago);
      });
    }
  }, {
    key: "getPlanPagoTablaComportamientoPago",
    value: function getPlanPagoTablaComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, ComportamientoPago) {
      var _this9 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Tablas where ID = " + ComportamientoPago.planPagoTablaID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              banderaGuardarResultadosTamActual++;

              _this9.initWebWorkerComportamientoPago(null, null, null, null, null, null, false);

              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              if (result.recordset.length == 0) {
                _this9.initWebWorkerComportamientoPago(null, null, null, null, null, null, false);
              } else {
                _this9.getPlanPagosCamposDeTablaComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, result.recordset[0], ComportamientoPago);
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getPlanPagosCamposDeTablaComportamientoPago",
    value: function getPlanPagosCamposDeTablaComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, tabla, ComportamientoPago) {
      guardarMora = true;
      var self = this;
      this.getFieldsFromCamposTable(tabla, ComportamientoPago, "planpagos", function (camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, ComportamientoPago) {
        self.initWebWorkerComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, ComportamientoPago, true);
      }, camposDePrestamoTabla, valoresDeTablaPrestamo);
    }
  }, {
    key: "getPlanPagoCamposDeTablaComportamientoPago",
    value: function getPlanPagoCamposDeTablaComportamientoPago(prestamoTabla, camposDePrestamoTabla, tabla, ComportamientoPago) {
      var _this10 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Campos where tablaID = " + tabla.ID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              banderaGuardarResultadosTamActual++;

              _this10.initWebWorkerComportamientoPago(null, null, null, null, null, null, false);

              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              /*              CONSIGUIENDO VALORES DE TABLA DE PLAN DE PAGOS         */
              var pool = new _mssql["default"].ConnectionPool({
                user: tabla.usuario,
                password: tabla.contrasena,
                server: tabla.servidor,
                database: tabla.baseDatos,
                stream: true,
                connectionTimeout: 900000,
                requestTimeout: 900000,
                pool: {
                  max: 40,
                  min: 0,
                  idleTimeoutMillis: 30000
                },
                options: {
                  useUTC: false
                }
              });
              pool.connect(function (err) {
                pool.request() // or: new sql.Request(pool1)
                .query("select * from " + tabla.tabla, function (err, result) {
                  _this10.getFieldsComportamientoPago(prestamoTabla, camposDePrestamoTabla, result.recordset, ComportamientoPago);
                });
              }); // fin pool connect
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getFieldsComportamientoPago",
    value: function getFieldsComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, ComportamientoPago) {
      var _this11 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Campos where ID = " + ComportamientoPago.idClientePrestamoCampoID + " or ID = " + ComportamientoPago.idClientePlanPagoCampoID + " or ID = " + ComportamientoPago.numeroPrestamoCampoID + " or ID = " + ComportamientoPago.numeroPlanPagoCampoID + " or ID = " + ComportamientoPago.pagoCapitalPrestamoCampoID + " or ID = " + ComportamientoPago.pagoCapitalPlanPagoCampoID + " or ID = " + ComportamientoPago.pagoImpuestosPrestamoCampoID + " or ID = " + ComportamientoPago.pagoImpuestosPlanPagoCampoID + " or ID = " + ComportamientoPago.fechaPrestamoCampoID + " or ID = " + ComportamientoPago.fechaPlanPagoCampoID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              banderaGuardarResultadosTamActual++;
              console.log("4");

              _this11.initWebWorkerComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, result.recordset, ComportamientoPago, false);

              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log("44");

              _this11.initWebWorkerComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, result.recordset, ComportamientoPago, true);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "initWebWorkerComportamientoPago",
    value: function initWebWorkerComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, ComportamientoPago, iniciarProceso) {
      //myWorker.postMessage(["comportamientoPago", camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, ComportamientoPago]);
      banderaGuardarResultadosTamActual++;
      console.log('banderaGuardarResultadosTamFinal = ' + banderaGuardarResultadosTamFinal);
      console.log('banderaGuardarResultadosTamActual = ' + banderaGuardarResultadosTamActual);
      if (iniciarProceso) (0, _ClasificarCreditoD.constructor)(["comportamientoPago", camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, ComportamientoPago]); //this.checkFinishMethods();

      if (banderaGuardarResultadosTamFinal == banderaGuardarResultadosTamActual) {
        this.iniciarTipoDeCreditos();
      }
    }
  }, {
    key: "getFieldsFromCamposTable",
    value: function getFieldsFromCamposTable(tabla, ComportamientoPago, banderaMetodoLlamado, callbackParam, camposDePrestamoTabla, valoresDeTablaPrestamo) {
      var _this12 = this;

      var self = this;
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Campos where tablaID = " + tabla.ID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err); //banderaGuardarResultadosTamActual++;

              _this12.initWebWorkerComportamientoPago(camposDePrestamoTabla, valoresDeTablaPrestamo, camposDePlanPagoTabla, valoresDeTablaPlanPago, result.recordset, ComportamientoPago, false);

              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              /*              UTILIZAR UN "WEBPACK" Y HACER WEB WORKER PARA GUARDAR O TRAER COSAS (sql en web worker)        */

              /*              CONSIGUIENDO VALORES DE TABLA DE PRESTAMOS         */
              var pool = new _mssql["default"].ConnectionPool({
                user: tabla.usuario,
                password: tabla.contrasena,
                server: tabla.servidor,
                database: tabla.baseDatos,
                stream: true,
                connectionTimeout: 900000,
                requestTimeout: 900000,
                pool: {
                  max: 40,
                  min: 0,
                  idleTimeoutMillis: 30000
                },
                options: {
                  useUTC: false
                }
              });
              var camposTabla = result.recordset;
              pool.connect(function (err) {
                pool.request() // or: new sql.Request(pool1)
                .query("select * from " + tabla.tabla, function (err, result) {
                  console.log(result);
                  console.log(err);
                  /*var nuevoArregloTrans = [];
                  for (var i = 0; i < result.recordset.length; i++) {
                      console.log(result.recordset[i]);
                      console.log(result.recordset[i].length);
                      for (var k = 0; k < result.recordset[i].length; k++) {
                          console.log(result.recordset[i][k]);
                          for (var j = 0; j < camposTabla.length; j++) {
                              if(j==0) {
                                  nuevoArregloTrans.push({});
                                  console.log(result.recordset[i]);
                                  console.log(result.recordset[i][k]);
                                  nuevoArregloTrans[i].camposTabla[j].nombre = result.recordset[i][k][camposTabla[j].nombre]
                              } else
                                  nuevoArregloTrans[i].camposTabla[j].nombre = result.recordset[i][k][camposTabla[j].nombre]
                          };
                      }
                  };*/

                  for (var i = 0; i < result.recordset.length; i++) {
                    Object.keys(result.recordset[i]).forEach(function (key, index) {
                      // key: the name of the object key
                      // index: the ordinal position of the key within the object
                      if (!self.propiedadDeObjetoExisteEnTablaCampos(camposTabla, key)) {
                        delete result.recordset[i][key];
                      }
                    });
                  }

                  console.log("result.recordset");
                  console.log(result.recordset); //result.recordset = nuevoArregloTrans;

                  if (banderaMetodoLlamado == 'prestamos') callbackParam(camposTabla, result.recordset, ComportamientoPago);else callbackParam(camposDePrestamoTabla, valoresDeTablaPrestamo, camposTabla, result.recordset, ComportamientoPago); //callbackParam(result.recordset, ComportamientoPago);
                  //eval("this."+callbackParam+"("+result.recordset+", "+camposTabla+", "+ComportamientoPago+");");
                });
              }); // fin pool connect
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "propiedadDeObjetoExisteEnTablaCampos",
    value: function propiedadDeObjetoExisteEnTablaCampos(camposTabla, key) {
      for (var i = 0; i < camposTabla.length; i++) {
        if (camposTabla[i].nombre.localeCompare(key) == 0) {
          return true;
        }
      }

      ;
      return false;
    }
  }, {
    key: "hacerChekeosDeVariablesAlImportar",
    value: function hacerChekeosDeVariablesAlImportar() {}
    /*
         EN RESULT DE CAMPOS DESPUES DE TRAER POR TABLA ID
         if(result.recordset[i].tipo.localeCompare("bit") == 0 || result.recordset[i].tipo.localeCompare("date") == 0 || result.recordset[i].tipo.localeCompare("varchar") == 0) {
            if(result.recordset[i].tipo.localeCompare("bit") == 0 || result.recordset[i].tipo.localeCompare("varchar") == 0) {
                if(selectFieldsQueryString.length > 0)
                    selectFieldsQueryString+=", ";
                selectFieldsQueryString+=result.recordset[i].nombre;
            } else if(result.recordset[i].tipo.localeCompare("date") == 0) {
                if(selectFieldsQueryString.length > 0)
                    selectFieldsQueryString+=", ";
                selectFieldsQueryString+=result.recordset[i].nombre;
            }
        } else if(result.recordset[i].tipo.localeCompare("int") == 0) {
            if(selectFieldsQueryString.length > 0)
                selectFieldsQueryString+=", ";
            selectFieldsQueryString+=result.recordset[i].nombre;
        }
    */

    /*  
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****    
        *****   *****   *****       *****   *****   *****   *****
                        COMPORTAMIENTO PAGO
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
    */

    /*      
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
                        TIPO DE CREDITOS
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
    */

  }, {
    key: "iniciarTipoDeCreditos",
    value: function iniciarTipoDeCreditos() {
      banderaGuardarResultadosTamActualTIPOCREDITOS = 0;
      banderaGuardarResultadosTamFinalTIPOCREDITOS = 0; //for (var i = 0; i < this.state.tablasOrginales.length; i++) {

      this.fetchDataTipoCredito(); //};
    }
  }, {
    key: "fetchDataTipoCredito",
    value: function fetchDataTipoCredito() {
      var _this13 = this;

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
              banderaGuardarResultadosTamActualTIPOCREDITOS++;

              _this13.verifyTypeCreditFinal(null, null, false);

              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              //arregloCamposTipoCreditos: Cada posicion del arreglo corresponde a la del tipo de credito
              var arregloReglasTipoCreditos = [];
              tamanoFinalBanderaTIPOCREDITOS = result.recordset.length, tamanoActualBanderaTIPOCREDITOS = 0;

              for (var i = 0; i < result.recordset.length; i++) {
                _this13.fetchDataReglasTipoCreditoCampos(result.recordset[i], arregloReglasTipoCreditos, i, result.recordset);
              }

              if (result.recordset.length == 0) {
                _this13.verifyTypeCreditFinal(null, null, false);
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "fetchDataReglasTipoCreditoCampos",
    value: function fetchDataReglasTipoCreditoCampos(tipoCredito, arregloReglasTipoCreditos, i, arregloTipoCreditos) {
      var _this14 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Reglas where nombreTablaRes = 'TipoCredito' and idTipoTabla=" + tipoCredito.ID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              banderaGuardarResultadosTamActualTIPOCREDITOS++;

              _this14.verifyTypeCreditFinal(arregloTipoCreditos, arregloReglasTipoCreditos, false);

              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              tamanoActualBanderaTIPOCREDITOS++; //banderaGuardarResultadosTamActualTIPOCREDITOS++;

              arregloReglasTipoCreditos[i] = result.recordset; //verificando si este credito tiene reglas asociadas, si no no sumar a banderaGuardarResultadosTamFinalTIPOCREDITOS

              _this14.verificarCamposReglasTipoCreditoCampos(arregloTipoCreditos, arregloReglasTipoCreditos);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "verificarCamposReglasTipoCreditoCampos",
    value: function verificarCamposReglasTipoCreditoCampos(arregloTipoCreditos, arregloReglasTipoCreditos) {
      if (tamanoActualBanderaTIPOCREDITOS == tamanoFinalBanderaTIPOCREDITOS) {
        tamanoActualBanderaCamposReglasTipoCreditoCampos = 0, tamanoFinalBanderaCamposReglasTipoCreditoCampos = 0;

        for (var i = 0; i < arregloReglasTipoCreditos.length; i++) {
          if (arregloReglasTipoCreditos[i] != undefined) {
            for (var j = 0; j < arregloReglasTipoCreditos[i].length; j++) {
              tamanoFinalBanderaCamposReglasTipoCreditoCampos++;
            }

            ;
          }
        }

        ;

        for (var i = 0; i < arregloReglasTipoCreditos.length; i++) {
          if (arregloReglasTipoCreditos[i] != undefined) {
            for (var j = 0; j < arregloReglasTipoCreditos[i].length; j++) {
              this.fetchDataCamposReglasTipoCreditoCampos(arregloReglasTipoCreditos[i][j], arregloReglasTipoCreditos, i, j, arregloTipoCreditos);
            }

            ;
          }
        }

        ;
      }
    }
  }, {
    key: "fetchDataCamposReglasTipoCreditoCampos",
    value: function fetchDataCamposReglasTipoCreditoCampos(regla, arregloReglasTipoCreditos, i, j, arregloTipoCreditos) {
      var _this15 = this;

      if (regla.campoCampoID != -1) {
        console.log('1111111y');
        var transaction = new _mssql["default"].Transaction(this.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("select * from Campos where ID = " + regla.campoCampoID, function (err, result) {
            if (err) {
              if (!rolledBack) {
                console.log(err);
                banderaGuardarResultadosTamActualTIPOCREDITOS++;

                _this15.verifyTypeCreditFinal(arregloTipoCreditos, arregloReglasTipoCreditos, false);

                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                tamanoActualBanderaCamposReglasTipoCreditoCampos++;
                arregloReglasTipoCreditos[i][j].campoValor = result.recordset[0];

                _this15.verificarValoresReglasTipoCreditoCampos(arregloTipoCreditos, arregloReglasTipoCreditos);
              });
            }
          });
        }); // fin transaction
      } else if (regla.campoCampoID == -1) {
        console.log('222222222y');
        tamanoActualBanderaCamposReglasTipoCreditoCampos++;
        arregloReglasTipoCreditos[i][j].campoValor = {
          nombre: "diasMora",
          tabla: "Préstamo"
        };
        this.verificarValoresReglasTipoCreditoCampos(arregloTipoCreditos, arregloReglasTipoCreditos);
      }
    }
  }, {
    key: "verificarValoresReglasTipoCreditoCampos",
    value: function verificarValoresReglasTipoCreditoCampos(arregloTipoCreditos, arregloReglasTipoCreditos) {
      if (tamanoActualBanderaCamposReglasTipoCreditoCampos == tamanoFinalBanderaCamposReglasTipoCreditoCampos) {
        tamanoActualBanderaValoresReglasTipoCreditoCampos = 0, tamanoFinalBanderaValoresReglasTipoCreditoCampos = 0;

        for (var i = 0; i < arregloReglasTipoCreditos.length; i++) {
          for (var j = 0; j < arregloReglasTipoCreditos[i].length; j++) {
            var idsValores = arregloReglasTipoCreditos[i][j].valor.split(",");

            for (var k = 0; k < idsValores.length; k++) {
              tamanoFinalBanderaValoresReglasTipoCreditoCampos++;
            }

            ;
          }

          ;
        }

        ;

        for (var i = 0; i < arregloReglasTipoCreditos.length; i++) {
          for (var j = 0; j < arregloReglasTipoCreditos[i].length; j++) {
            var idsValores = arregloReglasTipoCreditos[i][j].valor.split(",");

            for (var k = 0; k < idsValores.length; k++) {
              banderaGuardarResultadosTamFinalTIPOCREDITOS++;
              this.fetchDataValoresReglasTipoCreditoCampos(idsValores[k], arregloReglasTipoCreditos[i][j].esListaValor, arregloReglasTipoCreditos, i, j, arregloTipoCreditos);
            }

            ;
          }

          ;
        }

        ;
      }
    }
  }, {
    key: "fetchDataValoresReglasTipoCreditoCampos",
    value: function fetchDataValoresReglasTipoCreditoCampos(id, esLista, arregloReglasTipoCreditos, i, j, arregloTipoCreditos) {
      var _this16 = this;

      var tabla;
      if (esLista) tabla = 'VariablesdeLista';else tabla = 'Campos';
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from " + tabla + " where ID = " + id, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              banderaGuardarResultadosTamActualTIPOCREDITOS++;

              _this16.verifyTypeCreditFinal(arregloTipoCreditos, arregloReglasTipoCreditos, false);

              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              tamanoActualBanderaValoresReglasTipoCreditoCampos++;
              if (arregloReglasTipoCreditos[i][j].valorValores == undefined) arregloReglasTipoCreditos[i][j].valorValores = [];
              arregloReglasTipoCreditos[i][j].valorValores.push(result.recordset[0]);
              guardarTipoCredito = true;

              _this16.verifyTypeCreditFinal(arregloTipoCreditos, arregloReglasTipoCreditos, true);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "verifyTypeCreditFinal",
    value: function verifyTypeCreditFinal(arregloTipoCreditos, arregloReglasTipoCreditos, iniciarProceso) {
      banderaGuardarResultadosTamActualTIPOCREDITOS++;
      if (banderaGuardarResultadosTamFinalTIPOCREDITOS == 0) banderaGuardarResultadosTamFinalTIPOCREDITOS++;

      if (tamanoActualBanderaValoresReglasTipoCreditoCampos == tamanoFinalBanderaValoresReglasTipoCreditoCampos) {
        console.log(arregloTipoCreditos);
        console.log(arregloReglasTipoCreditos); //myWorker.postMessage(["tiposCredito", arregloTipoCreditos, arregloReglasTipoCreditos]);

        if (iniciarProceso) (0, _ClasificarCreditoD.constructor)(["tiposCredito", arregloTipoCreditos, arregloReglasTipoCreditos]); //this.checkFinishMethods();

        console.log("banderaGuardarResultadosTamFinalTIPOCREDITOS = " + banderaGuardarResultadosTamFinalTIPOCREDITOS);
        console.log("banderaGuardarResultadosTamActualTIPOCREDITOS = " + banderaGuardarResultadosTamActualTIPOCREDITOS);

        if (banderaGuardarResultadosTamActualTIPOCREDITOS == banderaGuardarResultadosTamFinalTIPOCREDITOS) {
          this.iniciarCategoriasClasificacion();
        }
        /*var self = this;
        setTimeout(function(){
            self.iniciarCategoriasClasificacion();
        }, 3000);*/

      }
    }
    /* 
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****     
        *****   *****   *****       *****   *****   *****   *****
                        TIPO DE CREDITOS
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
    */

    /*      
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
                        CATEGORIAS CLASIFICACION
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
    */

  }, {
    key: "iniciarCategoriasClasificacion",
    value: function iniciarCategoriasClasificacion() {
      banderaGuardarResultadosTamActualCATEGORIACLASIFICACION = 0;
      banderaGuardarResultadosTamFinalCATEGORIACLASIFICACION = 0; //for (var i = 0; i < this.state.tablasOrginales.length; i++) {

      this.fetchDataCategoriaClasificacion(); //};
    }
  }, {
    key: "fetchDataCategoriaClasificacion",
    value: function fetchDataCategoriaClasificacion() {
      var _this17 = this;

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
              console.log(err); //banderaGuardarResultadosTamActual++;

              _this17.verifyClasificationCategoryFinal(null, null, false);

              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              //arregloCamposTipoCreditos: Cada posicion del arreglo corresponde a la del tipo de credito
              var arregloReglasTipoCreditos = [];
              tamanoFinalBanderaCATEGORIACLASIFICACION = result.recordset.length, tamanoActualBanderaCATEGORIACLASIFICACION = 0;

              for (var i = 0; i < result.recordset.length; i++) {
                _this17.fetchDataReglasCategoriaClasificacionCampos(result.recordset[i], arregloReglasTipoCreditos, i, result.recordset);
              }

              if (result.recordset.length == 0) {
                _this17.verifyClasificationCategoryFinal(null, null, false);
              }
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "fetchDataReglasCategoriaClasificacionCampos",
    value: function fetchDataReglasCategoriaClasificacionCampos(tipoCredito, arregloReglasTipoCreditos, i, arregloTipoCreditos) {
      var _this18 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Reglas where nombreTablaRes = 'CategoriaClasificacion' and idTipoTabla=" + tipoCredito.ID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err); //banderaGuardarResultadosTamActual++;

              _this18.verifyClasificationCategoryFinal(arregloTipoCreditos, arregloReglasTipoCreditos, false);

              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              tamanoActualBanderaCATEGORIACLASIFICACION++;
              arregloReglasTipoCreditos[i] = result.recordset;

              _this18.verificarCamposReglasCategoriaClasificacionCampos(arregloTipoCreditos, arregloReglasTipoCreditos);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "verificarCamposReglasCategoriaClasificacionCampos",
    value: function verificarCamposReglasCategoriaClasificacionCampos(arregloTipoCreditos, arregloReglasTipoCreditos) {
      if (tamanoActualBanderaCATEGORIACLASIFICACION == tamanoFinalBanderaCATEGORIACLASIFICACION) {
        tamanoActualBanderaCamposReglasCategoriaClasificacionCampos = 0, tamanoFinalBanderaCamposReglasCategoriaClasificacionCampos = 0;

        for (var i = 0; i < arregloReglasTipoCreditos.length; i++) {
          if (arregloReglasTipoCreditos[i] != undefined) {
            for (var j = 0; j < arregloReglasTipoCreditos[i].length; j++) {
              tamanoFinalBanderaCamposReglasCategoriaClasificacionCampos++;
            }

            ;
          }
        }

        ;

        for (var i = 0; i < arregloReglasTipoCreditos.length; i++) {
          if (arregloReglasTipoCreditos[i] != undefined) {
            for (var j = 0; j < arregloReglasTipoCreditos[i].length; j++) {
              this.fetchDataCamposReglasCategoriaClasificacionCampos(arregloReglasTipoCreditos[i][j], arregloReglasTipoCreditos, i, j, arregloTipoCreditos);
            }

            ;
          }
        }

        ;
      }
    }
  }, {
    key: "fetchDataCamposReglasCategoriaClasificacionCampos",
    value: function fetchDataCamposReglasCategoriaClasificacionCampos(regla, arregloReglasTipoCreditos, i, j, arregloTipoCreditos) {
      var _this19 = this;

      if (regla.campoCampoID != -1) {
        var transaction = new _mssql["default"].Transaction(this.props.pool);
        transaction.begin(function (err) {
          var rolledBack = false;
          transaction.on('rollback', function (aborted) {
            rolledBack = true;
          });
          var request = new _mssql["default"].Request(transaction);
          request.query("select * from Campos where ID = " + regla.campoCampoID, function (err, result) {
            if (err) {
              if (!rolledBack) {
                console.log(err); //banderaGuardarResultadosTamActual++;

                _this19.verifyClasificationCategoryFinal(arregloTipoCreditos, arregloReglasTipoCreditos, false);

                transaction.rollback(function (err) {});
              }
            } else {
              transaction.commit(function (err) {
                tamanoActualBanderaCamposReglasCategoriaClasificacionCampos++;
                arregloReglasTipoCreditos[i][j].campoValor = result.recordset[0];

                _this19.verificarValoresReglasCategoriaClasificacionCampos(arregloTipoCreditos, arregloReglasTipoCreditos);
              });
            }
          });
        }); // fin transaction
      } else if (regla.campoCampoID == -1) {
        tamanoActualBanderaCamposReglasCategoriaClasificacionCampos++;
        arregloReglasTipoCreditos[i][j].campoValor = {
          nombre: "diasMora",
          tabla: "Préstamo"
        };
        this.verificarValoresReglasCategoriaClasificacionCampos(arregloTipoCreditos, arregloReglasTipoCreditos);
      }
    }
  }, {
    key: "verificarValoresReglasCategoriaClasificacionCampos",
    value: function verificarValoresReglasCategoriaClasificacionCampos(arregloTipoCreditos, arregloReglasTipoCreditos) {
      if (tamanoActualBanderaCamposReglasCategoriaClasificacionCampos == tamanoFinalBanderaCamposReglasCategoriaClasificacionCampos) {
        tamanoActualBanderaValoresReglasCategoriaClasificacionCampos = 0, tamanoFinalBanderaValoresReglasCategoriaClasificacionCampos = 0;

        for (var i = 0; i < arregloReglasTipoCreditos.length; i++) {
          for (var j = 0; j < arregloReglasTipoCreditos[i].length; j++) {
            var idsValores = arregloReglasTipoCreditos[i][j].valor.split(",");

            for (var k = 0; k < idsValores.length; k++) {
              tamanoFinalBanderaValoresReglasCategoriaClasificacionCampos++;
            }

            ;
          }

          ;
        }

        ;

        for (var i = 0; i < arregloReglasTipoCreditos.length; i++) {
          for (var j = 0; j < arregloReglasTipoCreditos[i].length; j++) {
            var idsValores = arregloReglasTipoCreditos[i][j].valor.split(",");

            for (var k = 0; k < idsValores.length; k++) {
              banderaGuardarResultadosTamFinalCATEGORIACLASIFICACION++;
              this.fetchDataValoresReglasCategoriaClasificacionCampos(idsValores[k], arregloReglasTipoCreditos[i][j].esListaValor, arregloReglasTipoCreditos, i, j, arregloTipoCreditos);
            }

            ;
          }

          ;
        }

        ;
      }
    }
  }, {
    key: "fetchDataValoresReglasCategoriaClasificacionCampos",
    value: function fetchDataValoresReglasCategoriaClasificacionCampos(id, esLista, arregloReglasTipoCreditos, i, j, arregloTipoCreditos) {
      var _this20 = this;

      var tabla;
      if (esLista) tabla = 'VariablesdeLista';else tabla = 'Campos';
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from " + tabla + " where ID = " + id, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err); //banderaGuardarResultadosTamActual++;

              _this20.verifyClasificationCategoryFinal(arregloTipoCreditos, arregloReglasTipoCreditos, false);

              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              tamanoActualBanderaValoresReglasCategoriaClasificacionCampos++;
              if (arregloReglasTipoCreditos[i][j].valorValores == undefined) arregloReglasTipoCreditos[i][j].valorValores = [];
              arregloReglasTipoCreditos[i][j].valorValores.push(result.recordset[0]);
              guardarCategoriaClasificacion = true;

              _this20.verifyClasificationCategoryFinal(arregloTipoCreditos, arregloReglasTipoCreditos, true);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "verifyClasificationCategoryFinal",
    value: function verifyClasificationCategoryFinal(arregloTipoCreditos, arregloReglasTipoCreditos, iniciarProceso) {
      banderaGuardarResultadosTamActualCATEGORIACLASIFICACION++;
      if (banderaGuardarResultadosTamFinalCATEGORIACLASIFICACION == 0) banderaGuardarResultadosTamFinalCATEGORIACLASIFICACION++;

      if (tamanoActualBanderaValoresReglasCategoriaClasificacionCampos == tamanoFinalBanderaValoresReglasCategoriaClasificacionCampos) {
        console.log(arregloTipoCreditos);
        console.log(arregloReglasTipoCreditos); //myWorker.postMessage(["tiposCredito", arregloTipoCreditos, arregloReglasTipoCreditos]);

        if (iniciarProceso) (0, _ClasificarCreditoD.constructor)(["categoriasClasificacion", arregloTipoCreditos, arregloReglasTipoCreditos]); //this.checkFinishMethods();

        if (banderaGuardarResultadosTamFinalCATEGORIACLASIFICACION == banderaGuardarResultadosTamActualCATEGORIACLASIFICACION) {
          this.iniciarCriteriosDeterioro();
        }
        /*var self = this;
        setTimeout(function(){
            self.iniciarCriteriosDeterioro();
        }, 3000);*/

      }
    }
    /*      
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
                        CATEGORIAS CLASIFICACION
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
    */

    /*      
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
                        CRITERIOS DE DETERIORO
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
    */

    /*iniciarCriteriosDeterioro () {
        //como no tiene id prestamo o cliente, no se puede calcular comportamiento plan pago, agregar mensaje bitacora  // si verificarComportamientoPago == false
        if( tamanoActualBandera == tamanoFinalBandera ) {
            banderaGuardarResultadosTamActual = 0;
            banderaGuardarResultadosTamFinal = this.state.tablasOrginales.length;
            for (var i = 0; i < this.state.tablasOrginales.length; i++) {
                var calcularComportamientoPago = false;
                var primeraVezEntra = true; //agregar valores de tabla a arreglo global de clientes, prestamos y pagos en ClasificarCartera.js
                 //como no tiene id prestamo o cliente, no se puede calcular comportamiento plan pago, agregar mensaje bitacora  // si verificarComportamientoPago == false
                 if(verificarComportamientoPago && $("#ComportamientoPago"+i).prop('checked') == true)
                    calcularComportamientoPago = true;
                 //if(calcularComportamientoPago) {
                    this.fetchDataComportamientoPago(this.state.tablasOrginales[i].ID);
                    //banderaGuardarResultadosTamFinal++;
                    /*if(primeraVezEntra) {
                        primeraVezEntra = false;
                    }
                }
                if(verificarTipoCredito) {
                    //this.fetchDataTipoCredito(this.state.tablasOrginales[i].ID);
                    //banderaGuardarResultadosTamFinal++;
                //}
            };
        }
    }*/

  }, {
    key: "iniciarCriteriosDeterioro",
    value: function iniciarCriteriosDeterioro() {
      this.getCriterioDeterioro();
      guardarCriterioDeterioro = true;
    }
  }, {
    key: "getCriterioDeterioro",
    value: function getCriterioDeterioro() {
      var _this21 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from CriterioDeterioro", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err); //banderaGuardarResultadosTamActual++;

              _this21.verifyDeteriorationCriteriaFinal(null, false);

              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this21.verifyDeteriorationCriteriaFinal(result.recordset, true);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "verifyDeteriorationCriteriaFinal",
    value: function verifyDeteriorationCriteriaFinal(criteriosDeterioro, calcular) {
      /*banderaGuardarResultadosTamActualCATEGORIACLASIFICACION++;
      if(tamanoActualBanderaValoresReglasCategoriaClasificacionCampos == tamanoFinalBanderaValoresReglasCategoriaClasificacionCampos) {
          console.log(arregloTipoCreditos);
          console.log(arregloReglasTipoCreditos);
          //myWorker.postMessage(["tiposCredito", arregloTipoCreditos, arregloReglasTipoCreditos]);
          if(iniciarProceso)
              constructor(["categoriasClasificacion", arregloTipoCreditos, arregloReglasTipoCreditos]);
          //this.checkFinishMethods();
          if(banderaGuardarResultadosTamFinalCATEGORIACLASIFICACION == banderaGuardarResultadosTamActualCATEGORIACLASIFICACION) {
              this.iniciarCategoriasClasificacion();
          }
      }*/
      if (calcular) (0, _ClasificarCreditoD.constructor)(["estimacionDeterioro", criteriosDeterioro]);
      this.checkFinishMethods();
    }
    /*      
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
                        CRITERIOS DE DETERIORO
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
        *****   *****   *****       *****   *****   *****   *****
    */

    /*      
        *****   *****   *****       *****   *****   *****   *****
                        GUARDAR RESULTADOS
        *****   *****   *****       *****   *****   *****   *****
    */

  }, {
    key: "checkFinishMethods",
    value: function checkFinishMethods() {
      /*console.log("banderaGuardarResultadosTamActual = "+banderaGuardarResultadosTamActual);
      console.log("banderaGuardarResultadosTamFinal = "+banderaGuardarResultadosTamFinal);
      if( banderaGuardarResultadosTamActual == banderaGuardarResultadosTamFinal ) {
          console.log("FIN DE CALCULOS");
          console.log("GUARDANDO CAMPOS");
          for (var i = 0; i < arregloCamposTablasSeleccionadas.length; i++) {
              console.log(arregloCamposTablasSeleccionadas[i]);
          };
      }*/
      alert("Clasificacion realizada con exito");
      this.getFieldsToSave();
    }
  }, {
    key: "getFieldsToSave",
    value: function getFieldsToSave() {
      var _this22 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Campos where guardar = 'true' and (tabla = 'Cliente' or tabla = 'Préstamo')", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this22.startSavingObjects(result.recordset);
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "startSavingObjects",
    value: function startSavingObjects(arregloDeCamposAGuardar) {
      //arreglos de archivo de calculos
      var camposDeCliente = arregloDeCamposAGuardar.filter(function (object) {
        return object.tabla.localeCompare("Cliente") == 0;
      });
      var camposDePrestamo = arregloDeCamposAGuardar.filter(function (object) {
        return object.tabla.localeCompare("Préstamo") == 0;
      });
      var clientes = (0, _ClasificarCreditoD.retornarClientes)();
      var prestamos = (0, _ClasificarCreditoD.retornarPrestamos)();

      for (var i = 0; i < clientes.length; i++) {
        var identificadorCliente;

        for (var j = 0; j < camposDeCliente.length; j++) {
          if (camposDeCliente[j].funcion.localeCompare("Identificador") == 0) {
            identificadorCliente = clientes[i][camposDeCliente[j].nombre];
            var objeto = "Cliente";
            var nombre = camposDeCliente[j].nombre;
            this.saveObjectID(identificadorCliente, objeto, nombre, "-1");
            break;
          }
        }

        ;

        if (identificadorCliente != undefined) {
          for (var j = 0; j < camposDeCliente.length; j++) {
            if (camposDeCliente[j].funcion.localeCompare("Identificador") != 0) {
              var objeto = "Cliente";
              var nombre = camposDeCliente[j].nombre;
              var fecha = new Date();
              var nombreTablaOrigenTipo = "Usuario"; //verificar si campo es valores de mora, categoria clas, tipo credito o criterio dete
              //if()

              var valor = clientes[i][camposDeCliente[j].nombre];

              if (camposDeCliente[j].tipo.localeCompare("int") == 0) {
                this.saveObjectIntField(identificadorCliente, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
              } else if (camposDeCliente[j].tipo.localeCompare("decimal") == 0) {
                this.saveObjectDecimalField(identificadorCliente, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
              } else if (camposDeCliente[j].tipo.localeCompare("date") == 0) {
                this.saveObjectDateField(identificadorCliente, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
              } else if (camposDeCliente[j].tipo.localeCompare("bool") == 0) {
                this.saveObjecBoolField(identificadorCliente, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
              } else if (camposDeCliente[j].tipo.localeCompare("varchar") == 0) {
                this.saveObjectStringField(identificadorCliente, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
              }
            }
          }

          ;

          for (var k = 0; k < prestamos[i].length; k++) {
            var identificadorPrestamo;

            for (var j = 0; j < camposDePrestamo.length; j++) {
              if (camposDePrestamo[j].funcion.localeCompare("Identificador") == 0) {
                identificadorPrestamo = prestamos[i][k][camposDePrestamo[j].nombre];
                var objeto = "Préstamo";
                var nombre = camposDePrestamo[j].nombre;
                this.saveObjectID(identificadorPrestamo, objeto, nombre, identificadorCliente);
                break;
              }
            }

            ;

            if (identificadorPrestamo != undefined) {
              for (var j = 0; j < camposDePrestamo.length; j++) {
                if (camposDePrestamo[j].funcion.localeCompare("Identificador") != 0) {
                  var objeto = "Préstamo";
                  var nombre = camposDePrestamo[j].nombre;
                  var fecha = new Date();
                  var nombreTablaOrigenTipo = "Usuario"; //verificar si campo es valores de mora, categoria clas, tipo credito o criterio dete
                  //if()

                  var valor = prestamos[i][k][camposDePrestamo[j].nombre];

                  if (camposDePrestamo[j].tipo.localeCompare("int") == 0) {
                    this.saveObjectIntField(identificadorPrestamo, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
                  } else if (camposDePrestamo[j].tipo.localeCompare("decimal") == 0) {
                    this.saveObjectDecimalField(identificadorPrestamo, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
                  } else if (camposDePrestamo[j].tipo.localeCompare("date") == 0) {
                    this.saveObjectDateField(identificadorPrestamo, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
                  } else if (camposDePrestamo[j].tipo.localeCompare("bool") == 0) {
                    this.saveObjecBoolField(identificadorPrestamo, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
                  } else if (camposDePrestamo[j].tipo.localeCompare("varchar") == 0) {
                    this.saveObjectStringField(identificadorPrestamo, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
                  }
                }
              }

              ;

              if (guardarTipoCredito) {
                var objeto = "Préstamo";
                var nombre = "tipoCredito";
                var fecha = new Date();
                var nombreTablaOrigenTipo = "Usuario";
                var valor = prestamos[i][k].tipoCredito;
                this.saveObjectStringField(identificadorPrestamo, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
              }

              if (guardarCategoriaClasificacion) {
                var objeto = "Préstamo";
                var nombre = "categoriaClasificacion";
                var fecha = new Date();
                var nombreTablaOrigenTipo = "Usuario";
                var valor = prestamos[i][k].categoriaClasificacion;
                this.saveObjectStringField(identificadorPrestamo, objeto, nombre, fecha, nombreTablaOrigenTipo, valor);
              }

              if (guardarMora) {
                var objeto = "Préstamo";
                var nombreMesPlan = "mesDelPlan";
                var fecha = new Date();
                var nombreTablaOrigenTipo = "Usuario";
                var valorMesPlan = this.formatDateCreation(prestamos[i][k].mesDelPlan);
                this.saveObjectDateField(identificadorPrestamo, objeto, nombreMesPlan, fecha, nombreTablaOrigenTipo, valorMesPlan);
                var nombreDiasMora = "diasMora";
                var valorDiasMora = prestamos[i][k].diasMora;
                this.saveObjectIntField(identificadorPrestamo, objeto, nombreDiasMora, fecha, nombreTablaOrigenTipo, valorDiasMora);
                var nombreCapitalPagado = "totalCapitalPagado";
                var valorCapitalPagado = prestamos[i][k].t0talC4pitalPagado;
                this.saveObjectDecimalField(identificadorPrestamo, objeto, nombreCapitalPagado, fecha, nombreTablaOrigenTipo, valorCapitalPagado);
                var nombreCapitalDeberiaPagado = "totalCapitalDeberiaPagado";
                var valorCapitalDeberiaPagado = prestamos[i][k].t0talC4pitalD3beriaPagado;
                this.saveObjectDecimalField(identificadorPrestamo, objeto, nombreCapitalDeberiaPagado, fecha, nombreTablaOrigenTipo, valorCapitalDeberiaPagado);
                var nombreImpuestosPagado = "totalImpuestosPagado";
                var valorImpuestosPagado = prestamos[i][k].t0tal1mpu3stosPagado;
                this.saveObjectDecimalField(identificadorPrestamo, objeto, nombreImpuestosPagado, fecha, nombreTablaOrigenTipo, valorImpuestosPagado);
                var nombreImpuestosDeberiaPagado = "totalImpuestosDeberiaPagado";
                var valorImpuestosDeberiaPagado = prestamos[i][k].t0tal1mpu3stosD3beriaPagado;
                this.saveObjectDecimalField(identificadorPrestamo, objeto, nombreImpuestosDeberiaPagado, fecha, nombreTablaOrigenTipo, valorImpuestosDeberiaPagado);
              }

              if (guardarCriterioDeterioro) {//
              }
            }
          }

          ;

          if (guardarMora) {
            var objeto = "Préstamo";
            var fecha = new Date();
            var nombreTablaOrigenTipo = "Usuario";
            var nombreCapitalPagado = "totalCapitalPagado";
            var valorCapitalPagado = clientes[i].t0talC4pitalPagado;
            this.saveObjectDecimalField(identificadorCliente, objeto, nombreCapitalPagado, fecha, nombreTablaOrigenTipo, valorCapitalPagado);
            var nombreCapitalDeberiaPagado = "totalCapitalDeberiaPagado";
            var valorCapitalDeberiaPagado = clientes[i].t0talC4pitalD3beriaPagado;
            this.saveObjectDecimalField(identificadorCliente, objeto, nombreCapitalDeberiaPagado, fecha, nombreTablaOrigenTipo, valorCapitalDeberiaPagado);
            var nombreImpuestosPagado = "totalImpuestosPagado";
            var valorImpuestosPagado = clientes[i].t0tal1mpu3stosPagado;
            this.saveObjectDecimalField(identificadorCliente, objeto, nombreImpuestosPagado, fecha, nombreTablaOrigenTipo, valorImpuestosPagado);
            var nombreImpuestosDeberiaPagado = "totalImpuestosDeberiaPagado";
            var valorImpuestosDeberiaPagado = clientes[i].t0tal1mpu3stosD3beriaPagado;
            this.saveObjectDecimalField(identificadorCliente, objeto, nombreImpuestosDeberiaPagado, fecha, nombreTablaOrigenTipo, valorImpuestosDeberiaPagado);
          }
        }
      }

      ;
      console.log("FIIIIIIIN");
      console.log(clientes);
      console.log(prestamos);
      /*var prestamos =  constructor(["traerArrPrestamos"]);
      var pagos =  constructor(["traerArrPagos"]);
      var planpagos =  constructor(["traerArrPlanPagos"]);*/
    }
  }, {
    key: "saveObjectID",
    value: function saveObjectID(identificador, objeto, nombre, idPadre) {
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into ResultadosID (identificador, objeto, nombre, idPadre) values ('" + identificador + "','" + objeto + "','" + nombre + "','" + idPadre + "')", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {});
          }
        });
      }); // fin transaction
    }
  }, {
    key: "saveObjectIntField",
    value: function saveObjectIntField(idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) {
      var _this23 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into ResultadosInt (idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) values ('" + idObjeto + "','" + objeto + "','" + nombre + "','" + _this23.formatDateCreation(new Date()) + "','" + nombreTablaOrigenTipo + "'," + valor + ")", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {});
          }
        });
      }); // fin transaction
    }
  }, {
    key: "saveObjectDecimalField",
    value: function saveObjectDecimalField(idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) {
      var _this24 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into ResultadosDecimal (idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) values ('" + idObjeto + "','" + objeto + "','" + nombre + "','" + _this24.formatDateCreation(new Date()) + "','" + nombreTablaOrigenTipo + "'," + valor + ")", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {});
          }
        });
      }); // fin transaction
    }
  }, {
    key: "saveObjectDateField",
    value: function saveObjectDateField(idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) {
      var _this25 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into ResultadosDate (idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) values ('" + idObjeto + "','" + objeto + "','" + nombre + "','" + _this25.formatDateCreation(new Date()) + "','" + nombreTablaOrigenTipo + "','" + valor + "')", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {});
          }
        });
      }); // fin transaction
    }
  }, {
    key: "saveObjecBoolField",
    value: function saveObjecBoolField(idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) {
      var _this26 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into ResultadosBool (idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) values ('" + idObjeto + "','" + objeto + "','" + nombre + "','" + _this26.formatDateCreation(new Date()) + "','" + nombreTablaOrigenTipo + "'," + valor + ")", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {});
          }
        });
      }); // fin transaction
    }
  }, {
    key: "saveObjectStringField",
    value: function saveObjectStringField(idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) {
      var _this27 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into ResultadosString (idObjeto, objeto, nombre, fecha, nombreTablaOrigenTipo, valor) values ('" + idObjeto + "','" + objeto + "','" + nombre + "','" + _this27.formatDateCreation(new Date()) + "','" + nombreTablaOrigenTipo + "','" + valor + "')", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {});
          }
        });
      }); // fin transaction
    }
  }, {
    key: "iterateProperties",
    value: function iterateProperties(arreglo) {
      for (var i = 0; i < arreglo.length; i++) {
        var identificadorCampoNombre;
        Object.keys(arreglo[i]).forEach(function (key, index) {
          // key: the name of the object key
          // index: the ordinal position of the key within the object
          identificadorCampoNombre = camposGuardar.filter(function (object) {
            return object.nombre.localeCompare(key) == 0 && object.funcion.localeCompare("Identificador") == 0;
          });
        });

        if (identificadorCampoNombre.length > 0) {
          Object.keys(arreglo[i]).forEach(function (key, index) {
            // key: the name of the object key
            // index: the ordinal position of the key within the object
            console.log("key");
            console.log(key);
            console.log("arreglo[i]");
            console.log(arreglo[i]);
            console.log("arreglo[i][key]");
            console.log(arreglo[i][key]);

            if (identificadorCampoNombre[0].funcion.localeCompare("Identificador") == 0) {
              this.verifyResultID(identificadorCampoNombre[0].nombre, identificadorCampoNombre[0].tabla, key);
            } else {
              this.verifyResultField(identificadorCampoNombre[0].nombre, identificadorCampoNombre[0].tabla, key, arreglo[i][key]);
            }
          });
        } else {//bitacora no existe campo id
        }
      }

      ;
    }
  }, {
    key: "formatDateCreation",
    value: function formatDateCreation(date) {
      //formato si es STRING
      //aaaa/mm/dd
      //aaaa-mm-dd
      var monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];
      var day = date.getDate();
      var monthIndex = date.getMonth();
      monthIndex++;
      var year = date.getFullYear();
      return year + '-' + monthIndex + '-' + day;
    }
  }, {
    key: "render",
    value: function render() {
      var _ref;

      return _react["default"].createElement("div", {
        style: {
          height: "85vh",
          width: "100%"
        }
      }, _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "7%"
        }
      }, _react["default"].createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%"
        }
      }, _react["default"].createElement("h2", null, "Seleccione Tablas a Clasificar"))), _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "11%"
        }
      }, _react["default"].createElement(_SeleccionarTablaClasificarCarteraProceso["default"], {
        tablasOrginales: this.state.tablasOrginales,
        tablasSeleccionadas: this.state.tablasSeleccionadas,
        selectTable: this.selectTable
      }, " ")), _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "76%"
        }
      }, _react["default"].createElement("div", {
        style: (_ref = {
          height: "100%",
          overflowX: "scroll",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          borderRadius: "5px",
          padding: "1% 0%",
          border: "solid 3px #cfd8dc"
        }, _defineProperty(_ref, "borderRadius", "5px"), _defineProperty(_ref, "marginTop", "2%"), _ref)
      }, _react["default"].createElement("div", {
        style: {
          height: "100%",
          width: "100%",
          display: "inline-block",
          position: "relative"
        }
      }, _react["default"].createElement("div", {
        style: {
          height: "95%",
          width: "95%",
          backgroundColor: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "5px",
          overflowY: "scroll"
        }
      }, _react["default"].createElement("div", {
        className: "text-center",
        style: {
          borderBottom: "solid 4px #cfd8dc"
        }
      }, _react["default"].createElement("h3", null, "Criterios de Clasificaci\xF3n")), _react["default"].createElement("div", {
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "solid 3px #eceff1"
        }
      }, _react["default"].createElement("div", {
        style: {
          width: "90%",
          height: "60%",
          textAlign: "center",
          display: "table"
        }
      }, _react["default"].createElement("h5", {
        style: {
          display: "table-cell",
          verticalAlign: "middle"
        }
      }, "Comportamiento de Pago"))), _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "25%",
          overflowY: "scroll"
        }
      }), _react["default"].createElement("div", {
        className: "text-center",
        style: {
          borderBottom: "solid 4px #cfd8dc",
          borderTop: "solid 4px #cfd8dc"
        }
      }, _react["default"].createElement("h3", null, "Tipo de Cr\xE9dito")), _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "25%",
          overflowY: "scroll"
        }
      }), _react["default"].createElement("div", {
        className: "text-center",
        style: {
          borderBottom: "solid 4px #cfd8dc",
          borderTop: "solid 4px #cfd8dc"
        }
      }, _react["default"].createElement("h3", null, "Categorias de Clasificaci\xF3n")))))), _react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "6%",
          padding: "1% 0%"
        },
        className: "text-center"
      }, _react["default"].createElement("a", {
        onClick: this.verificarSeleccionoTablas,
        className: "btn btn-primary col-xs-6 col-6",
        style: {
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold"
        }
      }, "Iniciar ")));
    }
  }]);

  return ClasificarCarteraProceso;
}(_react["default"].Component);

exports["default"] = ClasificarCarteraProceso;
//# sourceMappingURL=ClasificarCarteraProceso.js.map
