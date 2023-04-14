/*
 * @Author: zk
 * @AuthorEnd: your name
 * @Date: 2022-10-11 10:16:44
 * @LastEditTime: 2023-03-17 14:42:48
 * @FilePath: /vue3_vite/src/router/index.ts
 * @Description: 
 */
import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import Home from "../views/home.vue";
import DependsTable from "@/views/components/DependsTable.vue";
import { ElMessage } from "element-plus";

const routes = [
    {
        path: '/',
        name: '',
        redirect: '/login',
        component: () => import('../app.vue'),
        children:[
            {
                path: '/login',
                name: 'login',
                component: () => import('../views/login/index.vue'),
                children:[]
            },
            {
                path: '/home',
                name: 'home',
                component: Home,
                children:[
                    {
                        path: '/home',
                        name: 'DependsTable',
                        component: DependsTable,
                        children:[]
                    },
                    {
                        path: '/chat',
                        name: 'chat',
                        component: () => import('../views/chatPage/chat.vue'),
                        children:[]
                    },
                    {
                        path: '/boxList',
                        name: 'boxList',
                        component: () => import('../views/boxList/boxList.vue'),
                        children:[]
                    },
                    {
                        path: '/shengwen',
                        name: 'shengwen',
                        component: () => import('../views/shengwen/shengwen.vue'),
                        children:[]
                    },
                ]
            },
        ]
    }
]

const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }
)
router.beforeEach((to, form, next) => {
    console.log(to, form);
    if (to.fullPath != '/login'){
        // 获取 token
        let token = sessionStorage.getItem('token') || 0
        let date = +new Date()
        // console.log(date, token, date - +token, (date - +token) > (3600 * 5));
        if (!token){
            next('/')
            ElMessage.error('您还没有登录，请先登录');
        } 
        if ((date - +token) > (3600 * 5 * 1000)) {
            next('/')
            ElMessage.error('您的登录已过期，请重新登录');
        } 
        next()
    } else {
        next()
    }
})


export default router