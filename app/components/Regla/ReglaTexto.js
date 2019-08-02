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

var ReglaTexto =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReglaTexto, _React$Component);

  function ReglaTexto(props) {
    var _this;

    _classCallCheck(this, ReglaTexto);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReglaTexto).call(this, props));
    _this.state = {
      texto: ''
    };
    _this.formatRuleField = _this.formatRuleField.bind(_assertThisInitialized(_this));
    _this.formatRuleValue = _this.formatRuleValue.bind(_assertThisInitialized(_this));
    _this.checkIsFieldOrValue = _this.checkIsFieldOrValue.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ReglaTexto, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.checkIsFieldOrValue();
      this.props.onRef(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.onRef(undefined);
    }
  }, {
    key: "checkIsFieldOrValue",
    value: function checkIsFieldOrValue() {
      if (this.props.esCampo) {
        this.formatRuleField();
      } else {
        this.formatRuleValue();
      }
    }
  }, {
    key: "formatRuleField",
    value: function formatRuleField() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select nombre from Campos where ID = " + _this2.props.regla.campoCampoID, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});

              _this2.setState({
                texto: ''
              });
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                texto: result.recordset[0].nombre
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "formatRuleValue",
    value: function formatRuleValue() {
      var _this3 = this;

      var arregloDeCampos = this.props.regla.valor.split(",");

      if (this.props.regla.esListaValor) {
        var _loop = function _loop() {
          var id = parseInt(arregloDeCampos[i]);
          var transaction = new _mssql["default"].Transaction(_this3.props.pool);
          transaction.begin(function (err) {
            var rolledBack = false;
            transaction.on('rollback', function (aborted) {
              rolledBack = true;
            });
            var request = new _mssql["default"].Request(transaction);
            request.query("select nombre from VariablesdeLista where ID = " + id, function (err, result) {
              if (err) {
                if (!rolledBack) {
                  console.log(err);
                  transaction.rollback(function (err) {});

                  _this3.setState({
                    texto: ''
                  });
                }
              } else {
                transaction.commit(function (err) {
                  console.log(result.recordset[0].nombre);

                  _this3.setState({
                    texto: result.recordset[0].nombre
                  });
                });
              }
            });
          }); // fin transaction
        };

        for (var i = 0; i < arregloDeCampos.length; i++) {
          _loop();
        }

        ;
      } else {
        var _loop2 = function _loop2(_i) {
          var id = parseInt(arregloDeCampos[_i]);
          var transaction = new _mssql["default"].Transaction(_this3.props.pool);
          transaction.begin(function (err) {
            var rolledBack = false;
            transaction.on('rollback', function (aborted) {
              rolledBack = true;
            });
            var request = new _mssql["default"].Request(transaction);
            request.query("select nombre from Campos where ID = " + id, function (err, result) {
              if (err) {
                if (!rolledBack) {
                  console.log(err);
                  transaction.rollback(function (err) {});

                  _this3.setState({
                    texto: ''
                  });
                }
              } else {
                transaction.commit(function (err) {
                  var texto = _this3.state.texto;
                  if (_i > 0) texto += ", " + result.recordset[0].nombre;else texto = result.recordset[0].nombre;

                  _this3.setState({
                    texto: texto
                  });
                });
              }
            });
          }); // fin transaction
        };

        for (var _i = 0; _i < arregloDeCampos.length; _i++) {
          _loop2(_i);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("span", null, this.state.texto);
    }
  }]);

  return ReglaTexto;
}(_react["default"].Component);

exports["default"] = ReglaTexto;
//# sourceMappingURL=ReglaTexto.js.map
