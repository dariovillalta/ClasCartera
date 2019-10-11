"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _SeleccionarCriterioDeterioro = _interopRequireDefault(require("./SeleccionarCriterioDeterioro.js"));

var _CrearCriterioDeterioro = _interopRequireDefault(require("./CrearCriterioDeterioro.js"));

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

//import EditarCriterioDeterioro from './EditarCriterioDeterioro.js';
var CriteriosDeterioro =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CriteriosDeterioro, _React$Component);

  function CriteriosDeterioro(props) {
    var _this;

    _classCallCheck(this, CriteriosDeterioro);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CriteriosDeterioro).call(this, props));
    _this.state = {
      idCriterioDeterioro: -1,
      nombreCriterioDeterioroSeleccionado: "",
      mostrarComponente: "selCrit",
      estimacionesDeterioro: []
    };
    _this.goCreateCriteria = _this.goCreateCriteria.bind(_assertThisInitialized(_this));
    _this.goSelectCriteria = _this.goSelectCriteria.bind(_assertThisInitialized(_this));
    _this.goEditCriteria = _this.goEditCriteria.bind(_assertThisInitialized(_this));
    _this.loadCriterioDet = _this.loadCriterioDet.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CriteriosDeterioro, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadCriterioDet();
    }
  }, {
    key: "loadCriterioDet",
    value: function loadCriterioDet() {
      var _this2 = this;

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
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                estimacionesDeterioro: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "goCreateCriteria",
    value: function goCreateCriteria() {
      this.setState({
        mostrarComponente: "crearCrit"
      });
    }
  }, {
    key: "goSelectCriteria",
    value: function goSelectCriteria() {
      this.loadCriterioDet();
      this.setState({
        idCriterioDeterioro: -1,
        nombreCriterioDeterioroSeleccionado: "",
        mostrarComponente: "selCrit"
      });
    }
  }, {
    key: "goEditCriteria",
    value: function goEditCriteria(id, nombre) {
      this.setState({
        idCriterioDeterioro: id,
        nombreCriterioDeterioroSeleccionado: nombre,
        mostrarComponente: "editCrit"
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.mostrarComponente.localeCompare("crearCrit") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CrearCriterioDeterioro["default"], {
          pool: this.props.pool,
          showConfigurationComponent: this.props.showConfigurationComponent,
          returnSelCrit: this.goSelectCriteria
        }, " "));
      } else if (this.state.mostrarComponente.localeCompare("selCrit") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_SeleccionarCriterioDeterioro["default"], {
          pool: this.props.pool,
          showConfigurationComponent: this.props.showConfigurationComponent,
          seleccionarCriterio: this.goEditCriteria,
          goCrearCredito: this.goCreateCriteria,
          estimacionesDeterioro: this.state.estimacionesDeterioro
        }, " "));
      } else if (this.state.mostrarComponente.localeCompare("editCrit") == 0) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_CrearCriterioDeterioro["default"], {
          pool: this.props.pool,
          showConfigurationComponent: this.props.showConfigurationComponent,
          returnSelCrit: this.goSelectCriteria
        }, " "));
      }
    }
  }]);

  return CriteriosDeterioro;
}(_react["default"].Component);

exports["default"] = CriteriosDeterioro;
//# sourceMappingURL=CriteriosDeterioro.js.map
