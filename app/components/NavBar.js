"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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

var NavBar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NavBar, _React$Component);

  function NavBar() {
    _classCallCheck(this, NavBar);

    return _possibleConstructorReturn(this, _getPrototypeOf(NavBar).apply(this, arguments));
  }

  _createClass(NavBar, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "dashboard-header"
      }, _react["default"].createElement("nav", {
        className: "navbar navbar-expand-lg bg-white fixed-top"
      }, _react["default"].createElement("a", {
        className: "navbar-brand",
        href: "../index.html"
      }, "Inicio"), _react["default"].createElement("button", {
        className: "navbar-toggler",
        type: "button",
        "data-toggle": "collapse",
        "data-target": "#navbarSupportedContent",
        "aria-controls": "navbarSupportedContent",
        "aria-expanded": "false",
        "aria-label": "Toggle navigation"
      }, _react["default"].createElement("span", {
        className: "navbar-toggler-icon"
      })), _react["default"].createElement("div", {
        className: "collapse navbar-collapse",
        id: "navbarSupportedContent"
      }, _react["default"].createElement("ul", {
        className: "navbar-nav ml-auto navbar-right-top"
      }, _react["default"].createElement("li", {
        className: "nav-item"
      }, _react["default"].createElement("div", {
        id: "custom-search",
        className: "top-search-bar"
      }, _react["default"].createElement("input", {
        className: "form-control",
        type: "text",
        placeholder: "Search.."
      }))), _react["default"].createElement("li", {
        className: "nav-item dropdown notification"
      }, _react["default"].createElement("a", {
        className: "nav-link nav-icons",
        href: "#",
        id: "navbarDropdownMenuLink1",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false"
      }, _react["default"].createElement("i", {
        className: "fas fa-fw fa-bell"
      }), " ", _react["default"].createElement("span", {
        className: "indicator"
      })), _react["default"].createElement("ul", {
        className: "dropdown-menu dropdown-menu-right notification-dropdown"
      }, _react["default"].createElement("li", null, _react["default"].createElement("div", {
        className: "notification-title"
      }, " Notification"), _react["default"].createElement("div", {
        className: "notification-list"
      }, _react["default"].createElement("div", {
        className: "list-group"
      }, _react["default"].createElement("a", {
        href: "#",
        className: "list-group-item list-group-item-action active"
      }, _react["default"].createElement("div", {
        className: "notification-info"
      }, _react["default"].createElement("div", {
        className: "notification-list-user-img"
      }, " ", _react["default"].createElement("i", {
        className: "fas fa-user mr-2"
      }), " "), _react["default"].createElement("div", {
        className: "notification-list-user-block"
      }, _react["default"].createElement("span", {
        className: "notification-list-user-name"
      }, "Jeremy Rakestraw"), "accepted your invitation to join the team.", _react["default"].createElement("div", {
        className: "notification-date"
      }, "2 min ago")))), _react["default"].createElement("a", {
        href: "#",
        className: "list-group-item list-group-item-action"
      }, _react["default"].createElement("div", {
        className: "notification-info"
      }, _react["default"].createElement("div", {
        className: "notification-list-user-img"
      }, " ", _react["default"].createElement("i", {
        className: "fas fa-user mr-2"
      }), " "), _react["default"].createElement("div", {
        className: "notification-list-user-block"
      }, _react["default"].createElement("span", {
        className: "notification-list-user-name"
      }, "John Abraham"), "is now following you", _react["default"].createElement("div", {
        className: "notification-date"
      }, "2 days ago")))), _react["default"].createElement("a", {
        href: "#",
        className: "list-group-item list-group-item-action"
      }, _react["default"].createElement("div", {
        className: "notification-info"
      }, _react["default"].createElement("div", {
        className: "notification-list-user-img"
      }, " ", _react["default"].createElement("i", {
        className: "fas fa-user mr-2"
      }), " "), _react["default"].createElement("div", {
        className: "notification-list-user-block"
      }, _react["default"].createElement("span", {
        className: "notification-list-user-name"
      }, "Monaan Pechi"), " is watching your main repository", _react["default"].createElement("div", {
        className: "notification-date"
      }, "2 min ago")))), _react["default"].createElement("a", {
        href: "#",
        className: "list-group-item list-group-item-action"
      }, _react["default"].createElement("div", {
        className: "notification-info"
      }, _react["default"].createElement("div", {
        className: "notification-list-user-img"
      }, " ", _react["default"].createElement("i", {
        className: "fas fa-user mr-2"
      }), " "), _react["default"].createElement("div", {
        className: "notification-list-user-block"
      }, _react["default"].createElement("span", {
        className: "notification-list-user-name"
      }, "Jessica Caruso"), "accepted your invitation to join the team.", _react["default"].createElement("div", {
        className: "notification-date"
      }, "2 min ago"))))))), _react["default"].createElement("li", null, _react["default"].createElement("div", {
        className: "list-footer"
      }, " ", _react["default"].createElement("a", {
        href: "#"
      }, "View all notifications"))))), _react["default"].createElement("li", {
        className: "nav-item dropdown nav-user"
      }, _react["default"].createElement("a", {
        className: "nav-link nav-user-img",
        href: "#",
        id: "navbarDropdownMenuLink2",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false"
      }, " ", _react["default"].createElement("i", {
        className: "fas fa-user mr-2"
      }), " "), _react["default"].createElement("div", {
        className: "dropdown-menu dropdown-menu-right nav-user-dropdown",
        "aria-labelledby": "navbarDropdownMenuLink2"
      }, _react["default"].createElement("div", {
        className: "nav-user-info"
      }, _react["default"].createElement("h5", {
        className: "mb-0 text-white nav-user-name"
      }, "John Abraham")), _react["default"].createElement("a", {
        className: "dropdown-item",
        href: "#"
      }, _react["default"].createElement("i", {
        className: "fas fa-user mr-2"
      }), "Account"), _react["default"].createElement("a", {
        className: "dropdown-item",
        href: "#"
      }, _react["default"].createElement("i", {
        className: "fas fa-power-off mr-2"
      }), "Salir")))))));
    }
  }]);

  return NavBar;
}(_react["default"].Component);

exports["default"] = NavBar;
//# sourceMappingURL=NavBar.js.map
