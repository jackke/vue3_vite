/*
 * @Author: zk
 * @AuthorEnd: your name
 * @Date: 2022-10-14 09:51:34
 * @LastEditTime: 2022-10-21 09:47:47
 * @FilePath: /vue3_vite/src/store/index.ts
 * @Description: 
 */

import { createStore } from 'vuex'
 export interface State {
    menuList: object[],
    breadcrumbItem: string[],
    menuKey: number
 }

 export const store = createStore<State>({
    state() {
        return {
            menuList: [],
            breadcrumbItem: [],
            menuKey: 0
        }
    },
    // state 函数方法 
    mutations:{
        //store.commit("increment");
        menuList(state){
            // console.log(state);
            
        },
        menuKey(state){
            console.log(state);
            
        }
    }
 })