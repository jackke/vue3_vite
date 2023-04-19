<template>
    <el-card class="card" shadow="never">
      <div>
        <span>依赖信息</span>
        <div style="float: right">部署时间:{{ updateTime }}</div>
      </div>
  
      <div class="bottom-btn">
        <a target="_blank" href="https://github.com/vuejs/vue-next">
          <el-button type="success">vue3.x</el-button>
        </a>
        <a target="_blank" href="https://element-plus.gitee.io/#/zh-CN">
          <el-button type="primary">element-plus</el-button>
        </a>
        <a target="_blank" href="https://github.com/intlify/vue-i18n-next">
          <el-button type="warning">vue-i18n-next</el-button>
        </a>
        <a target="_blank" href="https://www.tslang.cn/docs/home.html">
          <el-button type="primary">ts-3.9.3</el-button>
        </a>
      </div>
      <table class="table">
        <tr>
          <td>vite版本</td>
          <td>{{ devDependencies['vite'] }}</td>
          <td>vue版本</td>
          <td>{{ dependencies['vue'] }}</td>
        </tr>
        <tr>
          <td>vue-router版本</td>
          <td>{{ dependencies['vue-router'] }}</td>
          <td>vuex版本</td>
          <td>{{ dependencies['vuex'] }}</td>
        </tr>
        <tr>
          <td>element-plus版本</td>
          <td>{{ dependencies['element-plus'] }}</td>
          <td>sass版本</td>
          <td>{{ devDependencies['sass'] }}</td>
        </tr>
        <tr>
          <td>electron 版本 (桌面应用)</td>
          <td>{{devDependencies['electron'] }}</td>
          <td>electron-builder 版本 (桌面应用打包)</td>
          <td>{{ devDependencies['electron-builder'] }}</td>
        </tr>
        <tr>
          <td>html2canvas 版本 (html转图片)</td>
          <td>{{dependencies['html2canvas'] }}</td>
          <td>处理警告</td>
          <!-- Added non-passive event listener to a scroll-blocking ‘touchstart’ event. Consider marking event handler as ‘passive’ to make the page more responsive. -->
          <td>{{dependencies['default-passive-events'] }}</td>
        </tr>
        <tr>
          <td>wavesurfer 版本 (ts声纹)</td>
          <td>{{devDependencies['@types/wavesurfer.js'] }}</td>
          <td>wavesurfer 版本(js声纹)</td>
          <td>{{devDependencies['wavesurfer.js'] }}</td>
        </tr>
        <tr>
          <td>vue-virtual-scroller (虚拟列表)</td>
          <td>{{dependencies['vue-virtual-scroller'] }}</td>
          <!-- <td>wavesurfer 版本(js声纹)</td>
          <td>{{devDependencies['wavesurfer.js'] }}</td> -->
        </tr>
      </table>
    </el-card>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { dependencies, devDependencies } from '../../../package.json'
  export default defineComponent({
    name: 'DependsTable',
    setup() {
      const state = reactive({
        // updateTime: process.env.VUE_APP_UPDATE_TIME
        updateTime:  new Date().toLocaleDateString() + ' ' +  new Date().toLocaleTimeString()
      })
      return {
        dependencies,
        devDependencies,
        ...toRefs(state)
      }
    }
  })
  </script>
  
  <style lang="scss" scoped>
  .table {
    width: 100%;
    color: #666;
    border-collapse: collapse;
    background-color: #fff;
  
    td {
      position: relative;
      min-height: 20px;
      padding: 9px 15px;
      font-size: 14px;
      line-height: 20px;
      border: 1px solid #e6e6e6;
  
      &:nth-child(odd) {
        width: 20%;
        text-align: right;
        background-color: #f7f7f7;
      }
    }
  }
  
  .bottom-btn {
    button {
      margin: 16px 10px 15px 0;
    }
  }
  </style>
  