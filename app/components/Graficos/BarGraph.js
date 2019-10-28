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

var resultados = [];

var BarGraph =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BarGraph, _React$Component);

  function BarGraph(props) {
    var _this;

    _classCallCheck(this, BarGraph);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BarGraph).call(this, props));
    _this.getLabels = _this.getLabels.bind(_assertThisInitialized(_this));
    _this.getSumValues = _this.getSumValues.bind(_assertThisInitialized(_this));
    _this.insertIntoResults = _this.insertIntoResults.bind(_assertThisInitialized(_this));
    _this.renderChart = _this.renderChart.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(BarGraph, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      resultados = [];
      this.getLabels();
    }
  }, {
    key: "getLabels",
    value: function getLabels() {
      var _this2 = this;

      var nombreIdentificador = "valor, idObjeto";
      if (this.props.tablaEtiqueta.localeCompare("ResultadosID") == 0) nombreIdentificador = "identificador";
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select " + nombreIdentificador + " from " + _this2.props.tablaEtiqueta + " where nombre = '" + _this2.props.nombreEtiqueta + "'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              for (var i = 0; i < result.recordset.length; i++) {
                if (_this2.props.tablaEtiqueta.localeCompare("ResultadosID") == 0) _this2.getSumValues(result.recordset[i].identificador, result.recordset[i].identificador);else _this2.getSumValues(result.recordset[i].idObjeto, result.recordset[i].valor);
              }

              ;
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "getSumValues",
    value: function getSumValues(idObjeto, nombreEtiqueta) {
      var _this3 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select valor from " + _this3.props.tablaNumerico + " where nombre = '" + _this3.props.nombreNumerico + "' and idObjeto = '" + idObjeto + "'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              console.log(result.recordset);

              for (var i = 0; i < result.recordset.length; i++) {
                _this3.insertIntoResults(result.recordset[i].valor, nombreEtiqueta);
              }

              ;
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "insertIntoResults",
    value: function insertIntoResults(valor, nombreEtiqueta) {
      var entro = false;

      for (var i = 0; i < resultados.length; i++) {
        if (this.props.tablaEtiqueta.localeCompare("ResultadosString") == 0) {
          if (resultados[i][0].localeCompare(nombreEtiqueta) == 0) {
            resultados[i][1] += valor;
            entro = true;
            break;
          }
        } else if (this.props.tablaEtiqueta.localeCompare("ResultadosBool") == 0) {
          if (resultados[i][0] == nombreEtiqueta) {
            resultados[i][1] += valor;
            entro = true;
            break;
          }
        } else if (this.props.tablaEtiqueta.localeCompare("ResultadosDate") == 0) {
          if (resultados[i][0].getTime() == nombreEtiqueta.getTime()) {
            resultados[i][1] += valor;
            entro = true;
            break;
          }
        } else if (this.props.tablaEtiqueta.localeCompare("ResultadosID") == 0) {
          if (resultados[i][0] == nombreEtiqueta) {
            resultados[i][1] += valor;
            entro = true;
            break;
          }
        }
      }

      ;

      if (resultados.length == 0 || !entro) {
        resultados.push([nombreEtiqueta, valor]);
      }

      console.log(resultados);
      this.renderChart();
    }
  }, {
    key: "renderChart",
    value: function renderChart() {
      var chart = c3.generate({
        bindto: "#resultado",
        data: {
          columns: resultados,
          type: 'bar'
        },
        bar: {
          width: {
            ratio: 1 // this makes bar width 50% of length between ticks
            // or
            //width: 100 // this makes bar width 100px

          }
          /*,
          axis: {
             x: {
                 type: 'category',
                 categories: [new Date()]
             }
          }*/

        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card"
      }, _react["default"].createElement("h5", {
        className: "card-header"
      }, "Gr\xE1fico"), _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        id: "resultado"
      })))));
    }
  }]);

  return BarGraph;
}(_react["default"].Component);

exports["default"] = BarGraph;
//# sourceMappingURL=BarGraph.js.map
