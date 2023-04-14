<!--
 * @Author: zk
 * @AuthorEnd: your name
 * @Date: 2022-10-13 09:08:33
 * @LastEditTime: 2023-03-27 15:01:22
 * @FilePath: /vue3_vite/src/components/headerMenuList.vue
 * @Description: 
-->
<template>
    <div  style="width: 100%;">
        <el-header class="header">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                :ellipsis="false"
                @select="handleSelect"
                style="width:100%"
            >
                <el-menu-item index="0" :key="0" @click="$router.replace('/Home')">首 页</el-menu-item>
                <el-menu-item v-for="(item, index) in mockData" :index="`${index + 1}`" :key="index + 1">{{item.name}}</el-menu-item>
                <div class="flex-grow" />
                <el-sub-menu index="2">
                    <template #title>Workspace</template>
                    <el-menu-item index="2-1">item one</el-menu-item>
                    <el-menu-item index="2-2">item two</el-menu-item>
                    <el-menu-item index="2-3">item three</el-menu-item>
                    <el-sub-menu index="2-4">
                        <template #title>item four</template>
                        <el-menu-item index="2-4-1">item one</el-menu-item>
                        <el-menu-item index="2-4-2">item two</el-menu-item>
                        <el-menu-item index="2-4-3">item three</el-menu-item>
                    </el-sub-menu>
                </el-sub-menu>
            </el-menu>
            <el-breadcrumb separator=">" style="padding: 10px;">
                <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item> -->
                <el-breadcrumb-item :to="{ path: '/' }" v-for="(item,index) in breadcrumbItem" :key="index">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <RouterView></RouterView>
        </el-main>
    </div>    
</template>
  
  <script lang="ts">
  import { defineComponent, reactive, toRefs, ref } from 'vue'
  import { Menu as IconMenu } from '@element-plus/icons-vue'
  // const data = require('../utils/mock.json')
  import data from "../utils/mock.json"
  // import {useStore} from 'vuex'
  import { store } from '../store'

  export default defineComponent({
    name: 'subMenuList',
    props:{
        menuList: {
          type: Array,
          default: [{name: '', children:[]}]
        }
    },
    components: {
      'icon-menu': IconMenu
    },
    setup() {
      console.log(data);
      
      const state = reactive({
        // updateTime: process.env.VUE_APP_UPDATE_TIME
        updateTime:  new Date().toLocaleDateString() + ' ' +  new Date().toLocaleTimeString()
      })
      let breadcrumbItem = reactive([{name:''}])
      let mockData = reactive(data.data)
      return {
        activeIndex: '0',
        mockData,
        breadcrumbItem,
        ...toRefs(state)
      }
    },
    methods:{
        handleSelect(key: string) {
            // console.log( arguments, this.mockData, this.mockData[0], this.$route.path);
            if (+key >= 1){
              store.state.menuList = this.mockData[+key - 1].children; // 侧边栏导航
              store.state.menuKey = +key - 1; // 
              this.breadcrumbItem[0] = this.mockData[+key - 1]; //导航标签
              this.$emit('CThandleSelect', +key - 1);
            }
        }
    }
  })
  </script>
  
  <style lang="scss" scoped>
    .header{
        width: 100%;
        height: auto;
        background-color: var(--bg-color);
    }
    .flex-grow {
        flex-grow: 1;
    }
  </style>
  