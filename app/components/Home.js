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

var c3 = require("c3");

var d3 = require("d3");

var resultados1 = [],
    resultados2 = [];

var Home =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home(props) {
    var _this;

    _classCallCheck(this, Home);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Home).call(this, props));
    _this.state = {
      capitalMinimo1: {},
      capitalMinimo2: {},
      capitalMinimo3: {},
      capitalMinimo4: {}
    };
    _this.getMinimoCapital1 = _this.getMinimoCapital1.bind(_assertThisInitialized(_this));
    _this.getLabels1 = _this.getLabels1.bind(_assertThisInitialized(_this));
    _this.getSumValues1 = _this.getSumValues1.bind(_assertThisInitialized(_this));
    _this.insertIntoResults1 = _this.insertIntoResults1.bind(_assertThisInitialized(_this));
    _this.renderChart1 = _this.renderChart1.bind(_assertThisInitialized(_this));
    _this.getLabels2 = _this.getLabels2.bind(_assertThisInitialized(_this));
    _this.getSumValues2 = _this.getSumValues2.bind(_assertThisInitialized(_this));
    _this.insertIntoResults2 = _this.insertIntoResults2.bind(_assertThisInitialized(_this));
    _this.renderChart2 = _this.renderChart2.bind(_assertThisInitialized(_this));
    _this.formatDateCreation = _this.formatDateCreation.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Home, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      resultados1 = [];
      resultados2 = [];
      this.getMinimoCapital1();
      this.getLabels1();
      this.getLabels2();
    }
  }, {
    key: "getMinimoCapital1",
    value: function getMinimoCapital1() {
      var _this2 = this;

      console.log(this.state.capitalMinimo1);
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from ResultadosDecimal where objeto = 'CAPITAL_MINIMO' and fecha = '" + _this2.formatDateCreation(new Date()) + "'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                capitalMinimo1: result.recordset[0]
              }, console.log(_this2.state.capitalMinimo1));

              console.log(_this2.state.capitalMinimo1);
            });
          }
        });
      }); // fin transaction
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
    key: "getLabels1",
    value: function getLabels1() {
      var _this3 = this;

      var nombreIdentificador = "valor, idObjeto";
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select " + nombreIdentificador + " from ResultadosString where nombre = 'categoriaClasificacion'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              for (var i = 0; i < result.recordset.length; i++) {
                _this3.getSumValues1(result.recordset[i].idObjeto, result.recordset[i].valor);
              }

              ;
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getSumValues1",
    value: function getSumValues1(idObjeto, nombreEtiqueta) {
      var _this4 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select valor from ResultadosDecimal where nombre = 'totalCapitalPagado' and idObjeto = '" + idObjeto + "'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log(result.recordset);

              for (var i = 0; i < result.recordset.length; i++) {
                _this4.insertIntoResults1(result.recordset[i].valor, nombreEtiqueta);
              }

              ;
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "insertIntoResults1",
    value: function insertIntoResults1(valor, nombreEtiqueta) {
      var entro = false;

      for (var i = 0; i < resultados1.length; i++) {
        if (resultados1[i][0].localeCompare(nombreEtiqueta) == 0) {
          resultados1[i][1] += valor;
          entro = true;
          break;
        }
      }

      ;

      if (resultados1.length == 0 || !entro) {
        resultados1.push([nombreEtiqueta, valor]);
      }

      this.renderChart1();
    }
  }, {
    key: "renderChart1",
    value: function renderChart1() {
      var chartClientes = c3.generate({
        bindto: "#saldos",
        data: {
          columns: resultados1,
          type: 'pie',
          colors: {
            data1: '#5969ff',
            data2: '#ff407b',
            data3: '#b39ddb',
            data4: '#80deea',
            data5: '#ffcc80'
          }
        },
        pie: {
          label: {
            format: function format(value, ratio, id) {
              return d3.format('$')(value);
            }
          }
        }
      });
    }
  }, {
    key: "getLabels2",
    value: function getLabels2() {
      var _this5 = this;

      var nombreIdentificador = "valor, idObjeto";
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select " + nombreIdentificador + " from ResultadosString where nombre = 'categoriaClasificacion'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              for (var i = 0; i < result.recordset.length; i++) {
                _this5.getSumValues2(result.recordset[i].idObjeto, result.recordset[i].valor);
              }

              ;
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getSumValues2",
    value: function getSumValues2(idObjeto, nombreEtiqueta) {
      var _this6 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select valor from ResultadosDecimal where nombre = 'estimacionDeterioro' and idObjeto = '" + idObjeto + "'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log(result.recordset);

              for (var i = 0; i < result.recordset.length; i++) {
                _this6.insertIntoResults2(result.recordset[i].valor, nombreEtiqueta);
              }

              ;
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "insertIntoResults2",
    value: function insertIntoResults2(valor, nombreEtiqueta) {
      var entro = false;

      for (var i = 0; i < resultados2.length; i++) {
        if (resultados2[i][0].localeCompare(nombreEtiqueta) == 0) {
          resultados2[i][1] += valor;
          entro = true;
          break;
        }
      }

      ;

      if (resultados2.length == 0 || !entro) {
        resultados2.push([nombreEtiqueta, valor]);
      }

      this.renderChart2();
    }
  }, {
    key: "renderChart2",
    value: function renderChart2() {
      var chartClientes = c3.generate({
        bindto: "#deterioro",
        data: {
          columns: resultados2,
          type: 'pie',
          colors: {
            data1: '#5969ff',
            data2: '#ff407b',
            data3: '#b39ddb',
            data4: '#80deea',
            data5: '#ffcc80'
          }
        },
        pie: {
          label: {
            format: function format(value, ratio, id) {
              return d3.format('$')(value);
            }
          }
        }
      });
    }
    /*componentDidMount() {
        var chartClientes = c3.generate({
            bindto: "#saldos",
            data: {
                columns: [
                    ['Créditos Buenos', 5620029.11],
                    ['Créditos Especialmente Mencionados', 7981023],
                    ['Créditos Bajo Norma', 13420089.78],
                    ['Créditos de Dudosa Recuperación', 7419023.52],
                    ['Créditos de Pérdida', 2570891.44]
                ],
                type: 'pie',
                 colors: {
                    data1: '#5969ff',
                    data2: '#ff407b',
                    data3: '#b39ddb',
                    data4: '#80deea',
                    data5: '#ffcc80'
                 }
            },
            pie: {
                label: {
                    format: function(value, ratio, id) {
                        return d3.format('$')(value);
                    }
                }
            }
        });
         var chartDeterioro = c3.generate({
            bindto: "#deterioro",
            data: {
                columns: [
                    ['Créditos Buenos', 28100.14555],
                    ['Créditos Especialmente Mencionados', 319240.92],
                    ['Créditos Bajo Norma', 3355022.445],
                    ['Créditos de Dudosa Recuperación', 4451414.112],
                    ['Créditos de Pérdida', 2570891.44]
                ],
                type: 'pie',
                 colors: {
                    data1: '#5969ff',
                    data2: '#ff407b',
                    data3: '#b39ddb',
                    data4: '#80deea',
                    data5: '#ffcc80'
                 }
            },
            pie: {
                label: {
                    format: function(value, ratio, id) {
                        return d3.format('$')(value);
                    }
                }
            }
        });
    }*/

  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"
      }, _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("h5", {
        className: "card-header"
      }, "Distribuci\xF3n de Saldos por Categoria de Clasificaci\xF3n"), _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        id: "saldos"
      })))), _react["default"].createElement("div", {
        className: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"
      }, _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("h5", {
        className: "card-header"
      }, "Estimaciones de Deterioro por Categoria de Clasificaci\xF3n"), _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        id: "deterioro"
      }))))), _react["default"].createElement("div", {
        className: "row"
      }, this.state.capitalMinimo1 != undefined ? _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card border-3 border-top border-top-primary"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("h5", {
        className: "text-muted"
      }, "Capital M\xEDnimo: "), _react["default"].createElement("div", {
        className: "metric-value d-inline-block"
      }, _react["default"].createElement("h1", {
        className: "mb-1"
      }, new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'HNL'
      }).format(this.state.capitalMinimo1.valor)))))) : _react["default"].createElement("span", null)));
    }
  }]);

  return Home;
}(_react["default"].Component);

exports["default"] = Home;
//# sourceMappingURL=Home.js.map
