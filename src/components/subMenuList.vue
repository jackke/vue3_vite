<!--
 * @Author: zk
 * @AuthorEnd: your name
 * @Date: 2022-10-13 09:08:33
 * @LastEditTime: 2023-02-08 14:26:26
 * @FilePath: /vue3_vite/src/components/subMenuList.vue
 * @Description: 
-->
<template>
    <div v-for="(item, index) in menuList" :key="index">
        <el-sub-menu :index="`${index + 1}`" v-if="item.children && item.children.length > 0">
            <template #title>
                <el-icon><icon-menu /></el-icon>
                <span>{{item.name}}</span>
            </template>
            <el-menu-item-group v-for="(mItem, mIndex) in item.children" :key="mIndex">
                <!-- <template #title><span>Group One</span></template> -->
                <!-- <el-menu-item :index="`${index + 1}-${mIndex + 1}`">{{mItem.name}}</el-menu-item> -->
                <el-menu-item :index="`${mItem.path}`">{{mItem.name}}</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item :index="`${item.path}`" v-else>
            <el-icon><icon-menu /></el-icon>
            <span>{{item.name}}</span>
        </el-menu-item>
    </div>    
</template>
  
  <script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { Menu as IconMenu } from '@element-plus/icons-vue'
  import { useStore } from "vuex";
  export default defineComponent({
    name: 'subMenuList',
    // props:{
    //     menuList: {
    //       type: Array,
    //       default: []
    //     }
    // },
    components: {
      'icon-menu': IconMenu
    },
    computed: {
      menuList(){
        const store = useStore()
        return store.state.menuList 
      }
    },
    setup() {
      const state = reactive({
        // updateTime: process.env.VUE_APP_UPDATE_TIME
        updateTime:  new Date().toLocaleDateString() + ' ' +  new Date().toLocaleTimeString()
      })
      return {
        ...toRefs(state)
      }
    }
  })
  </script>
  
  <style lang="scss" scoped>

  </style>
  