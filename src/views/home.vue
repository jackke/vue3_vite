<!--
 * @Author: zk
 * @AuthorEnd: your name
 * @Date: 2022-10-11 10:07:27
 * @LastEditTime: 2023-02-09 14:38:06
 * @FilePath: /vue3_vite/src/views/Home.vue
 * @Description: 
-->

<template>
    <div class="home-box">
        <el-container>
            <el-menu :default-active="$route.path" router class="el-menu-vertical-demo aside" :collapse="isCollapse"  @open="handleOpen" @close="handleClose">
                <div class="menu-top">
                    <div style="display:flex; justify-content: center;align-items: center;">
                        <img src="/favicon.ico" class="favicon-logo" /> <h2> + </h2> <img src="/vite.svg" class="sidebar-logo" /> 
                    </div>
                    <h3>VUE3 管理平台</h3>
                </div>
                <!-- 侧边栏导航 -->
                <sub-menu-list></sub-menu-list>
            </el-menu>
            <el-container>
                <!-- 头部导航 -->
                <header-menu-list @CThandleSelect="CThandleSelect"></header-menu-list>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
// import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import subMenuList  from "@/components/subMenuList.vue"; //引入组建
import headerMenuList  from "@/components/headerMenuList.vue"; //引入组建
import {useStore} from 'vuex'

let isCollapse = ref(false)
let menuKey = ref(0)
let menuItem = ref()

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  
}
const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
}
// 导航点击事件
const CThandleSelect = (key: number) => {
//   console.log(key)
//   menuItem.value = children
  menuKey.value = key - 1
}

</script>


<style lang="scss" scoped>
.favicon-logo{
  /* width: 80px; */
  height: 35px;
  margin-right: 5px;
}
.el-container{
    height: 100%;
}
.home-box{
    width: 100%;
    height: 100%;
    
    .el-card__body{
        padding: 0;
    }
    .el-header {
        height: auto;
        padding: 0;
    }
    .aside{
        width: 200px;
        /* padding: 1rem; */
        background-color: var(--bg-color);
    }
    
    .header-top{
        display: flex;
        justify-content: space-around;
        text-align: left;
    }
}

</style>
