/*
 * @Author: fc
 * @AuthorEnd: your name
 * @Date: 2023-03-27 14:12:01
 * @LastEditTime: 2023-03-27 14:12:01
 * @FilePath: /vue3_vite/electron-user/index.ts
 * @Description: 
 */
import os from "os";
console.log("platform", os.platform());
// window.addEventListener('DOMContentLoaded', () => {
//     const replaceText = (selector, text) => {
//       const element = document.getElementById(selector)
//       if (element) element.innerText = text
//     }
  
//     for (const dependency of ['chrome', 'node', 'electron']) {
//       replaceText(`${dependency}-version`, process.versions[dependency])
//     }
//   })