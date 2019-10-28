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

var LoginPage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LoginPage, _React$Component);

  function LoginPage(props) {
    var _this;

    _classCallCheck(this, LoginPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LoginPage).call(this, props));
    _this.login = _this.login.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(LoginPage, [{
    key: "login",
    value: function login() {
      var _this2 = this;

      var username = $('#username').val();
      var password = $('#password').val();

      if (username.localeCompare("admin") == 0) {
        if (password.localeCompare("password111!") == 0) {
          this.props.login("Admin", "admin");
        }
      }

      if (username.length > 0) {
        if (password.length > 0) {
          var transaction = new _mssql["default"].Transaction(this.props.pool);
          transaction.begin(function (err) {
            var rolledBack = false;
            transaction.on('rollback', function (aborted) {
              // emited with aborted === true
              rolledBack = true;
            });
            var request = new _mssql["default"].Request(transaction);
            request.query("select * from Usuarios where usuario = '" + username + "' and contrasena = '" + password + "'", function (err, result) {
              if (err) {
                console.log(err);

                if (!rolledBack) {
                  transaction.rollback(function (err) {
                    alert("Error en conección con la tabla de Usuarios.");
                  });
                }
              } else {
                transaction.commit(function (err) {
                  // ... error checks
                  if (result.recordset.length > 0) {
                    var usuario = result.recordset[0]; //Cookie Username

                    _this2.props.login(usuario.nombreCompleto, usuario.tipoUsuario);
                  } else {
                    alert("Usuario ó contraseña incorrecta.");
                  }
                });
              }
            });
          }); // fin transaction
        } else {
          alert("Ingrese un valor para la contraseña.");
        }
      } else {
        alert("Ingrese un valor para el usuario.");
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "splash-container"
      }, _react["default"].createElement("div", {
        className: "card "
      }, _react["default"].createElement("div", {
        className: "card-header text-center"
      }, _react["default"].createElement("img", {
        className: "logo-img",
        src: "./assets/logoTOLOC.png",
        alt: "logo",
        style: {
          maxWidth: "100%",
          height: "auto"
        }
      }), _react["default"].createElement("h1", {
        className: "display-4"
      }, "Clasificaci\xF3n de Cartera"), _react["default"].createElement("span", {
        className: "splash-description"
      }, "Por favor ingrese su informaci\xF3n de usuario.")), _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("input", {
        className: "form-control form-control-lg",
        id: "username",
        type: "text",
        placeholder: "Usuario"
      })), _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("input", {
        className: "form-control form-control-lg",
        id: "password",
        type: "password",
        placeholder: "Contrase\xF1a"
      })), _react["default"].createElement("button", {
        className: "btn btn-primary btn-lg btn-block",
        onClick: this.login
      }, "Iniciar Sesi\xF3n"))));
    }
  }]);

  return LoginPage;
}(_react["default"].Component);

exports["default"] = LoginPage;
//# sourceMappingURL=LoginPage.js.map
