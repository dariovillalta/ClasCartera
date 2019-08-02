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

var LeftBar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LeftBar, _React$Component);

  function LeftBar() {
    _classCallCheck(this, LeftBar);

    return _possibleConstructorReturn(this, _getPrototypeOf(LeftBar).apply(this, arguments));
  }

  _createClass(LeftBar, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "nav-left-sidebar sidebar-dark"
      }, _react["default"].createElement("div", {
        className: "menu-list"
      }, _react["default"].createElement("nav", {
        className: "navbar navbar-expand-lg navbar-light"
      }, _react["default"].createElement("a", {
        className: "d-xl-none d-lg-none",
        href: "#"
      }, "Dashboard"), _react["default"].createElement("button", {
        className: "navbar-toggler",
        type: "button",
        "data-toggle": "collapse",
        "data-target": "#navbarNav",
        "aria-controls": "navbarNav",
        "aria-expanded": "false",
        "aria-label": "Toggle navigation"
      }, _react["default"].createElement("span", {
        className: "navbar-toggler-icon"
      })), _react["default"].createElement("div", {
        className: "collapse navbar-collapse",
        id: "navbarNav"
      }, _react["default"].createElement("ul", {
        className: "navbar-nav flex-column"
      }, _react["default"].createElement("li", {
        className: "nav-divider"
      }, "Menu"), _react["default"].createElement("li", {
        className: "nav-item "
      }, _react["default"].createElement("a", {
        className: "nav-link active",
        href: "#",
        "data-toggle": "collapse",
        "aria-expanded": "false",
        "data-target": "#submenu-1",
        "aria-controls": "submenu-1"
      }, _react["default"].createElement("i", {
        className: "fa fa-fw fa-user-circle"
      }), "Dashboard ", _react["default"].createElement("span", {
        className: "badge badge-success"
      }, "6")), _react["default"].createElement("div", {
        id: "submenu-1",
        className: "collapse submenu"
      }, _react["default"].createElement("ul", {
        className: "nav flex-column"
      }, _react["default"].createElement("li", {
        className: "nav-item"
      }, _react["default"].createElement("a", {
        className: "nav-link",
        href: "index.html",
        "data-toggle": "collapse",
        "aria-expanded": "false",
        "data-target": "#submenu-1-2",
        "aria-controls": "submenu-1-2"
      }, "E-Commerce"), _react["default"].createElement("div", {
        id: "submenu-1-2",
        className: "collapse submenu"
      }, _react["default"].createElement("ul", {
        className: "nav flex-column"
      }, _react["default"].createElement("li", {
        className: "nav-item"
      }, _react["default"].createElement("a", {
        className: "nav-link",
        href: "../index.html"
      }, "E Commerce Dashboard")), _react["default"].createElement("li", {
        className: "nav-item"
      }, _react["default"].createElement("a", {
        className: "nav-link",
        href: "../ecommerce-product.html"
      }, "Product List")), _react["default"].createElement("li", {
        className: "nav-item"
      }, _react["default"].createElement("a", {
        className: "nav-link",
        href: "../ecommerce-product-single.html"
      }, "Product Single")), _react["default"].createElement("li", {
        className: "nav-item"
      }, _react["default"].createElement("a", {
        className: "nav-link",
        href: "../ecommerce-product-checkout.html"
      }, "Product Checkout"))))), _react["default"].createElement("li", {
        className: "nav-item"
      }, _react["default"].createElement("a", {
        className: "nav-link",
        onClick: this.props.hideConfigurationComponent
      }, "Finance")), _react["default"].createElement("li", {
        className: "nav-item"
      }, _react["default"].createElement("a", {
        className: "nav-link",
        href: "../dashboard-sales.html"
      }, "Sales")), _react["default"].createElement("li", {
        className: "nav-item"
      }, _react["default"].createElement("a", {
        className: "nav-link",
        href: "#",
        "data-toggle": "collapse",
        "aria-expanded": "false",
        "data-target": "#submenu-1-1",
        "aria-controls": "submenu-1-1"
      }, "Influencer"), _react["default"].createElement("div", {
        id: "submenu-1-1",
        className: "collapse submenu"
      }, _react["default"].createElement("ul", {
        className: "nav flex-column"
      }, _react["default"].createElement("li", {
        className: "nav-item"
      }, _react["default"].createElement("a", {
        className: "nav-link",
        href: "../dashboard-influencer.html"
      }, "Influencer")), _react["default"].createElement("li", {
        className: "nav-item"
      }, _react["default"].createElement("a", {
        className: "nav-link",
        href: "../influencer-finder.html"
      }, "Influencer Finder")), _react["default"].createElement("li", {
        className: "nav-item"
      }, _react["default"].createElement("a", {
        className: "nav-link",
        href: "../influencer-profile.html"
      }, "Influencer Profile"))))))))))))));
    }
  }]);

  return LeftBar;
}(_react["default"].Component);

exports["default"] = LeftBar;
//# sourceMappingURL=LeftBar.js.map
