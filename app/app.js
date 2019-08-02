"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _Layout = _interopRequireDefault(require("./components/Layout.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//import odbc from 'odbc';

/*import LoginPage from './components/LoginPage.js';*/
var config = {
  user: 'SA',
  password: 'password111!',
  server: 'localhost',
  database: 'INTEGEVAL_Dev',
  stream: true,
  pool: {
    max: 40,
    min: 0,
    idleTimeoutMillis: 60000
  }
};
var pool = new _mssql["default"].ConnectionPool(config, function (err) {
  if (err) {
    console.log(err);
    console.log("Error en conección con la base de datos");
    /*$("body").overhang({
        type: "error",
        primary: "#f84a1d",
        accent: "#d94e2a",
        message: "Error en conección con la base de datos.",
        overlay: true,
        closeConfirm: true
    });*/
  } else {
    console.log('pool loaded');
  }
});

var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this));
    _this.state = {
      isLoggedIn: true,
      userName: null // or using a configuration object

      /*const connectionString = {
          connectionString: 'DSN=ClasificacionCartera',
          connectionTimeout: 360,
          loginTimeout: 360
      }
      odbc.connect(connectionString, (error, connection) => {
          console.log(connection);
          connection.columns(null, null, null, null, (error, result) => {
              if (error) { return; } // handle
              console.log(result);
          });
      });*/
      // connection2 is now an open Connection

    };
    return _this;
  }

  _createClass(App, [{
    key: "select",
    value: function select() {
      var config = {
        user: 'SA',
        password: 'password111!',
        server: 'localhost',
        database: 'RCL_Dev',
        stream: true,
        pool: {
          max: 40,
          min: 0,
          idleTimeoutMillis: 60000
        }
      };
      var pool = new _mssql["default"].ConnectionPool(config, function (err) {
        console.log("11");

        if (err) {
          console.log(err);
        } else {
          console.log("222");
          return pool.query('select * from Activos_Bancos', function (err, result) {
            console.log("333");
            console.log(result);
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var logged = this.state.isLoggedIn;
      return _react["default"].createElement("div", null, logged ? _react["default"].createElement(_Layout["default"], {
        pool: pool
      }, " ") :
      /*<LoginPage> </LoginPage>*/
      _react["default"].createElement("div", null));
    }
  }]);

  return App;
}(_react["default"].Component);

exports["default"] = App;
//# sourceMappingURL=app.js.map
