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

var SeleccionarTabla =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SeleccionarTabla, _React$Component);

  function SeleccionarTabla(props) {
    var _this;

    _classCallCheck(this, SeleccionarTabla);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SeleccionarTabla).call(this, props));
    _this.state = {
      tablas: []
    };
    _this.loadTables = _this.loadTables.bind(_assertThisInitialized(_this));
    return _this;
  } //componentDidMount() {componentDidUpdate


  _createClass(SeleccionarTabla, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadTables();
      console.log(this.state.tablas);
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
        request.query("select * from Tablas where funcion ='Pagos de Préstamos' or funcion ='Plan de Pagos'", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                tablas: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "selTabla",
    value: function selTabla(tabla, index) {
      this.state.tablas[index].selected = true;
      console.log(this.state.tablas);
      this.props.seleccionarTabla(tabla.ID, tabla.nombre);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var claseNoSel = "btn btn-outline-info btn-block btnWhiteColorHover fontSize1EM";
      var claseSel = "btn btn-info btn-block btnWhiteColorHover fontSize1EM";
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card influencer-profile-data"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        className: "row border-top border-bottom addPaddingToConfig"
      }, this.state.tablas.map(function (tabla, i) {
        return _react["default"].createElement("a", {
          className: tabla.selected ? claseSel : claseNoSel,
          onClick: function onClick() {
            return _this3.selTabla(tabla, i);
          },
          key: i
        }, tabla.nombre);
      }), this.state.tablas.length == 0 ? _react["default"].createElement("a", {
        className: "btn btn-outline-dark btn-block btnWhiteColorHover fontSize1EM"
      }, "No existen tablas creadas") : _react["default"].createElement("span", null)))))));
    }
  }]);

  return SeleccionarTabla;
}(_react["default"].Component);

exports["default"] = SeleccionarTabla;
//# sourceMappingURL=SeleccionarTabla.js.map
