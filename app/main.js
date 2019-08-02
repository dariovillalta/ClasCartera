"use strict";

var _electron = _interopRequireDefault(require("electron"));

var _path = _interopRequireDefault(require("path"));

var _url = _interopRequireDefault(require("url"));

var _electronIsDev = _interopRequireDefault(require("electron-is-dev"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = _electron["default"].app;
var BrowserWindow = _electron["default"].BrowserWindow;
var mainWindow;

var createWindow = function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(_url["default"].format({
    pathname: _path["default"].join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  if (_electronIsDev["default"]) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
};

app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
//# sourceMappingURL=main.js.map
