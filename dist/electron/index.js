"use strict";
const electron = require("electron");
const path = require("path");
const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
const path__default = /* @__PURE__ */ _interopDefaultLegacy(path);
const createWindow = () => {
  const win = new electron.BrowserWindow({
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  });
  if (electron.app.isPackaged) {
    win.loadFile(path__default.default.join(__dirname, "../index.html"));
  } else {
    let url = "http://localhost:5173/";
    win.loadURL(url);
  }
  win.webContents.openDevTools();
};
electron.app.whenReady().then(() => {
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
