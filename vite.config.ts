/*
 * @Author: zk
 * @AuthorEnd: your name
 * @Date: 2022-10-11 09:38:58
 * @LastEditTime: 2023-03-27 14:47:48
 * @FilePath: /vue3_vite/vite.config.ts
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";

// element-plus 插件
//配置好之后，在单组件文件中，无需手动 import 就可以直接使用 Element+ 的组件了，不用手动 import 组件 el-container，el-aside，el-header ，可以正常执行
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// electron 桌面应用插件
import electron from 'vite-plugin-electron'
// 进程通信需要
import electronRenderer from 'vite-plugin-electron-renderer'


// https://vitejs.dev/config/
export default defineConfig({
  // base: path.resolve(__dirname, './dist/'),
  plugins: [
    vue(),
    AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		}),
    electron({
      main: {
        // 置顶 electron 入口文件
        entry: "electron-main/index.ts"
      }
    }), 
    electronRenderer()
  ],
  server:{
    host: '0.0.0.0'
  },
  resolve: {
    alias:{
      '@': path.join(__dirname, 'src')
    }
  }
})
