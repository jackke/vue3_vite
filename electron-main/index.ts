/*
 * @Author: fc
 * @AuthorEnd: your name
 * @Date: 2023-03-24 16:36:43
 * @LastEditTime: 2023-03-24 18:20:09
 * @FilePath: /vue3_vite/electron-main/index.js
 * @Description: 
 */
// electron-main/index.ts
import { app, BrowserWindow } from "electron";
import path from "path";


const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      // preload: path.join(__dirname, "../electron_user/index.ts"), // 需要引用js文件
      contextIsolation: false, // 是否开启隔离上下文
      nodeIntegration: true, // 渲染进程使用Node API
    },
  });
  // console.log(app.isPackaged, app);
  // 如果打包了，渲染index.html
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../index.html"));
  } else {
    let url = "http://localhost:5173/"; // 本地启动的vue项目路径
    win.loadURL(url);
  }
  // 打开调试工具
  win.webContents.openDevTools()
};


app.whenReady().then(() => {
  createWindow(); // 创建窗口
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});


// 关闭窗口
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});