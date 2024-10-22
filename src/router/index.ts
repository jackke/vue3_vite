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
                        path: '/marsEarth',
                        name: 'marsEarth',
                        component: () => import('../views/mars/marsEarth.vue'),
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
                    {
                        path: '/virtualList',
                        name: 'virtualList',
                        component: () => import('../views/virtualList/virtualList.vue'),
                        children:[]
                    },
                    {
                        path: '/three1',
                        name: 'three1',
                        component: () => import('../views/three/three1.vue'),
                        children:[]
                    },
                    {
                        path: '/three2',
                        name: 'three2',
                        component: () => import('../views/three/three2.vue'),
                        children:[]
                    },
                    {
                        path: '/three3',
                        name: 'three3',
                        component: () => import('../views/three/three3.vue'),
                        children:[]
                    },
                    {
                        path: '/loginView',
                        name: 'loginView',
                        component: () => import('../views/loginHtml/index.vue'),
                        children:[]
                    },
                    {
                        path: '/maskView',
                        name: 'maskView',
                        component: () => import('../views/loginHtml/maskView.vue'),
                        children:[]
                    },
                    {
                        path: '/canvasView',
                        name: 'canvasView',
                        component: () => import('../views/loginHtml/canvasView.vue'),
                        children:[]
                    },
                    // {
                    //     path: '/canvasView',
                    //     name: 'canvasView',
                    //     component: () => import('../views/loginHtml/canvasView.vue'),
                    //     children:[]
                    // },
                    {
                        path: '/htmlView',
                        name: 'htmlView',
                        component: () => import('../views/loginHtml/htmlView.vue'),
                        children:[]
                    },
                    {
                        path: '/quickStart',
                        name: 'qickStart',
                        component: () => import('../views/volcanoTools/virtualUser/quickStart.vue'),
                        children:[]
                    },
                    {
                        path: '/Dynameic',
                        name: 'Dynameic',
                        component: () => import('../views/volcanoTools/virtualUser/Dynameic.vue'),
                        children:[]
                    },
                    {
                        path: '/cssView',
                        name: 'cssView',
                        component: () => import('../views/volcanoTools/cssHtml/cssHtml.vue'),
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