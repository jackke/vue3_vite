/*
 * @Author: zk
 * @AuthorEnd: your name
 * @Date: 2022-10-11 09:33:51
 * @LastEditTime: 2023-02-09 10:41:28
 * @FilePath: /vue3_vite/src/main.ts
 * @Description: 
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus' // 全局导入
import 'element-plus/dist/index.css' // 样式导入
import Router from './router'
import {store} from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'default-passive-events'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import VueVirtualScroller from 'vue-virtual-scroller'

const app = createApp(App)
app.use(Router) // 路由
app.use(ElementPlus) // 使用
app.use(store) // 加载vuex
app.use(VueVirtualScroller) // 虚拟列表

// 加载icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
app.component(key, component)
}

app.mount('#app')
