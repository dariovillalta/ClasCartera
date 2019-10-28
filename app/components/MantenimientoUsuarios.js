"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _mssql = _interopRequireDefault(require("mssql"));

var _MessageModal = _interopRequireDefault(require("./MessageModal.js"));

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

var tiposUsuarios = [{
  nombre: "Reportería",
  valor: "report"
}, {
  nombre: "Cálculo de Clasificación",
  valor: "calculo"
}, {
  nombre: "Administrador",
  valor: "admin"
}];

var MantenimientoUsuarios =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MantenimientoUsuarios, _React$Component);

  function MantenimientoUsuarios(props) {
    var _this;

    _classCallCheck(this, MantenimientoUsuarios);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MantenimientoUsuarios).call(this, props));
    _this.state = {
      usuarios: [],
      mensajeModal: {
        mostrarMensaje: false,
        mensajeConfirmado: false,
        esError: false,
        esConfirmar: false,
        titulo: "",
        mensaje: "",
        banderaMetodoInit: "",
        idElementoSelec: -1,
        indiceX: -1
      }
    };
    _this.loadUsuarios = _this.loadUsuarios.bind(_assertThisInitialized(_this));
    _this.insertarUsuario = _this.insertarUsuario.bind(_assertThisInitialized(_this));
    _this.dismissMessageModal = _this.dismissMessageModal.bind(_assertThisInitialized(_this));
    _this.showSuccesMessage = _this.showSuccesMessage.bind(_assertThisInitialized(_this));
    _this.deleteUser = _this.deleteUser.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MantenimientoUsuarios, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadUsuarios();
    }
  }, {
    key: "loadUsuarios",
    value: function loadUsuarios() {
      var _this2 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("select * from Usuarios", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this2.setState({
                usuarios: result.recordset
              });
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "insertarUsuario",
    value: function insertarUsuario() {
      var _this3 = this;

      var nombreCompleto = $("#nombreCompleto").val();
      var usuario = $("#usuario").val();
      var contrasena = $("#contrasena").val();
      var tipoUsuario = $("#tipoUsuario").val();
      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("insert into Usuarios (nombreCompleto, usuario, contrasena, tipoUsuario) values ('" + nombreCompleto + "','" + usuario + "','" + contrasena + "','" + tipoUsuario + "')", function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this3.setState({
                mensajeModal: {
                  mostrarMensaje: false,
                  mensajeConfirmado: true,
                  esError: false,
                  esConfirmar: false,
                  titulo: "",
                  mensaje: "",
                  banderaMetodoInit: "",
                  idElementoSelec: _this3.state.mensajeModal.idElementoSelec,
                  indiceX: _this3.state.mensajeModal.indiceX
                }
              });

              _this3.showSuccesMessage("Exito", "Usuario creado con éxito.");

              _this3.loadUsuarios();
            });
          }
        });
      }); // fin transaction
    }
  }, {
    key: "deleteUser",
    value: function deleteUser(idUsuario) {
      var _this4 = this;

      var transaction = new _mssql["default"].Transaction(this.props.pool);
      transaction.begin(function (err) {
        var rolledBack = false;
        transaction.on('rollback', function (aborted) {
          rolledBack = true;
        });
        var request = new _mssql["default"].Request(transaction);
        request.query("delete from Usuarios where ID = " + idUsuario, function (err, result) {
          if (err) {
            if (!rolledBack) {
              console.log(err);
              transaction.rollback(function (err) {});
            }
          } else {
            transaction.commit(function (err) {
              _this4.setState({
                mensajeModal: {
                  mostrarMensaje: false,
                  mensajeConfirmado: true,
                  esError: false,
                  esConfirmar: false,
                  titulo: "",
                  mensaje: "",
                  banderaMetodoInit: "",
                  idElementoSelec: _this4.state.mensajeModal.idElementoSelec,
                  indiceX: _this4.state.mensajeModal.indiceX
                }
              });

              _this4.showSuccesMessage("Exito", "Usuario eliminado con éxito.");

              _this4.loadUsuarios();
            });
          }
        });
      }); // fin transaction
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
          indiceX: -1
        }
      });
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
          indiceX: this.state.mensajeModal.indiceX
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
            indiceX: self.state.mensajeModal.indiceX
          }
        });
      }, 850);
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "page-header"
      }, _react["default"].createElement("h2", {
        className: "pageheader-title"
      }, "Configuraci\xF3n"), _react["default"].createElement("div", {
        className: "page-breadcrumb"
      }, _react["default"].createElement("nav", {
        "aria-label": "breadcrumb"
      }, _react["default"].createElement("ol", {
        className: "breadcrumb"
      }, _react["default"].createElement("li", {
        className: "breadcrumb-item",
        "aria-current": "page",
        onClick: this.props.showConfigurationComponent
      }, _react["default"].createElement("a", {
        href: "#",
        className: "breadcrumb-link"
      }, "Configuraci\xF3n")), _react["default"].createElement("li", {
        className: "breadcrumb-item active",
        "aria-current": "page"
      }, "Mantenimiento de Usuarios"))))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card influencer-profile-data"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("h3", null, "Crear Nueva Tabla"), _react["default"].createElement("div", {
        className: "row border-top"
      }, _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Nombre Completo"), _react["default"].createElement("input", {
        id: "nombreCompleto",
        type: "text",
        className: "form-control"
      })), _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Nombre de Usuario"), _react["default"].createElement("input", {
        id: "usuario",
        type: "text",
        className: "form-control"
      }))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Contrase\xF1a"), _react["default"].createElement("input", {
        id: "contrasena",
        type: "password",
        className: "form-control"
      })), _react["default"].createElement("div", {
        className: "form-group col-xl-6 col-6"
      }, _react["default"].createElement("form", null, _react["default"].createElement("label", {
        className: "col-form-label"
      }, "Tipo de Usuario"), _react["default"].createElement("div", {
        className: "form-group",
        style: {
          width: "100%"
        }
      }, _react["default"].createElement("select", {
        id: "tipoUsuario",
        className: "form-control",
        style: {
          width: "100%"
        }
      }, tiposUsuarios.map(function (tipoUsuario, i) {
        return _react["default"].createElement("option", {
          key: i,
          value: tipoUsuario.valor
        }, tipoUsuario.nombre);
      })))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("button", {
        onClick: this.insertarUsuario,
        className: "btn btn-success btn-block col-xl-10 col-10",
        style: {
          margin: "0 auto",
          display: "block"
        }
      }, "Crear")))))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
      }, _react["default"].createElement("div", {
        className: "card influencer-profile-data"
      }, _react["default"].createElement("div", {
        className: "card-body"
      }, _react["default"].createElement("table", {
        className: "table table-striped"
      }, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        scope: "col"
      }, "#"), _react["default"].createElement("th", {
        scope: "col"
      }, "Nombre Completo"), _react["default"].createElement("th", {
        scope: "col"
      }, "Usuario"), _react["default"].createElement("th", {
        scope: "col"
      }, "Tipo de Usuario"), _react["default"].createElement("th", {
        scope: "col"
      }))), _react["default"].createElement("tbody", null, this.state.usuarios.map(function (usuario, i) {
        return _react["default"].createElement("tr", {
          key: usuario.ID
        }, _react["default"].createElement("th", {
          scope: "row"
        }, i + 1), _react["default"].createElement("td", null, usuario.nombreCompleto), _react["default"].createElement("td", null, usuario.usuario), _react["default"].createElement("td", null, usuario.tipoUsuario), _react["default"].createElement("td", null, _react["default"].createElement("img", {
          onClick: function onClick() {
            return _this5.deleteUser(usuario.ID);
          },
          src: "../assets/trash.png",
          style: {
            height: "20px",
            width: "20px",
            cursor: 'pointer'
          }
        })));
      }))))))), this.state.mensajeModal.mostrarMensaje ? _react["default"].createElement(_MessageModal["default"], {
        esError: this.state.mensajeModal.esError,
        esConfirmar: this.state.mensajeModal.esConfirmar,
        dismissMessage: this.dismissMessageModal,
        confirmFunction: this.confirmMessageModal,
        titulo: this.state.mensajeModal.titulo,
        mensaje: this.state.mensajeModal.mensaje
      }, " ") : _react["default"].createElement("span", null));
    }
  }]);

  return MantenimientoUsuarios;
}(_react["default"].Component);

exports["default"] = MantenimientoUsuarios;
//# sourceMappingURL=MantenimientoUsuarios.js.map
