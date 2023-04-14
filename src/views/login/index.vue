<template>
    <div class="login-container">
      <div class="main">
          <div class="stars"></div>
      </div>
       <div class="login-form">
        <el-form ref="ruleFormRef" :model="loginForm" :rules="loginRules">
          <el-form-item label="账号" prop="username">
            <el-input v-model="loginForm.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input :type="passwordType" v-model="loginForm.password">
              <template #suffix >
                <el-icon @click="showPwd"><Hide /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%" @click="onSubmit">登 录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="text" >忘记密码？</el-button>
            <el-button type="text">注 册</el-button>
          </el-form-item>
        </el-form>
       </div>
    </div>
  </template>
  
  <script lang="ts">
  import {
    defineComponent,
    onMounted,
    reactive,
    watch,
    ref,
    nextTick,
    toRefs
  } from 'vue'
  // <el-icon><Hide /></el-icon>
  import { useRoute, LocationQuery, useRouter } from 'vue-router'
  import { Hide, Search } from '@element-plus/icons-vue'
  import { useStore } from 'vuex'
  export default defineComponent({
    name: 'login',
    
    // components: {
    //   LangSelect,
    //   SocialSign
    // },
    setup() {
      const userNameRef = ref(null)
      const passwordRef = ref('111111')
      const loginFormRef = ref(null)
      const router = useRouter()
      const route = useRoute()
      const store = useStore()
    //   const { t } = useI18n()
      const state = reactive({
        Hide,
        loginForm: {
          username: 'admin',
          password: '11111'
        },
        loginRules: {
          username: [{ required: true, message: '请输入账号密码', trigger: 'blur' }],
          password: [{ 
            required: true, 
            validator:(rule: any, value: string, callback: Function) => {
              if (value.length < 6) {
                callback(new Error('The password can not be less than 6 digits'))
              } else {
                callback()
              }
            }, 
            trigger: 'blur' }]
        },
        passwordType: 'password',
        loading: false,
        showDialog: false,
        capsTooltip: false,
        redirect: '',
        otherQuery: {}
      })
  
      const methods = reactive({
        onSubmit: () => {
          const token =  `${+new Date()}`
          sessionStorage.setItem('token', token)
          router.push({path: '/home'})
        },

        // validateUsername: (rule: any, value: string, callback: Function) => {
        //   // if (!isValidUsername(value)) {
        //   //   callback(new Error('Please enter the correct user name'))
        //   // } else {
        //   //   callback()
        //   // }
        //     callback()
        // },
        // validatePassword: (rule: any, value: string, callback: Function) => {
        //   if (value.length < 6) {
        //     callback(new Error('The password can not be less than 6 digits'))
        //   } else {
        //     callback()
        //   }
        // },
        // checkCapslock: (e: KeyboardEvent) => {
        //   const { key } = e
        //   state.capsTooltip =
        //     key !== null && key.length === 1 && key >= 'A' && key <= 'Z'
        // },
        // password 显示密码
        showPwd: () => {
          if (state.passwordType === 'password') {
            state.passwordType = ''
          } else {
            state.passwordType = 'password'
          }
          nextTick(() => {
            ;(passwordRef.value as any).focus()
          })
        },
        handleLogin: () => {
          ;(loginFormRef.value as any).validate(async (valid: boolean) => {
            if (valid) {
              state.loading = true
              // await store.dispatch(UserActionTypes.ACTION_LOGIN, state.loginForm)
              router
                .push({
                  path: state.redirect || '/',
                  query: state.otherQuery
                })
                .catch((err) => {
                  console.warn(err)
                })
              // Just to simulate the time of the request
              setTimeout(() => {
                state.loading = false
              }, 0.5 * 1000)
            } else {
              return false
            }
          })
        }
      })
  
      function getOtherQuery(query: LocationQuery) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {} as LocationQuery)
      }
  
      watch(
        () => route.query,
        (query) => {
          if (query) {
            state.redirect = query.redirect?.toString() ?? ''
            state.otherQuery = getOtherQuery(query)
          }
        }
      )
  
      onMounted(() => {
        if (state.loginForm.username === '') {
          ;(userNameRef.value as any).focus()
        } else if (state.loginForm.password === '') {
          ;(passwordRef.value as any).focus()
        }
      })
  
      return {
        userNameRef,
        passwordRef,
        loginFormRef,
        ...toRefs(state),
        ...toRefs(methods),
      }
    }
  })
  </script>
  
  <style src="./style.css"></style>
  <style lang="scss">
  $loginCursorColor: #454545;
  $lightGray: 'red';
  $loginBg: '#ffffff';
  // References: https://www.zhangxinxu.com/wordpress/2018/01/css-caret-color-first-line/
  @supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
    .login-container .el-input {
      input {
        color: $loginCursorColor;
      }
      input::first-line {
        color: $lightGray;
      }
    }
  }
  
  .login-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
    // position: fixed;
    // width: 100%;
    // height: 100%;
    // background-image: url('@/image/index_bg.jpeg');
    background-image: url('@/image/xingkong.jpeg');
    background-size: 100%;
    background-repeat: no-repeat;
    .login-form{
      padding: 50px 30px 20px 30px;
      border-radius: 10px;
      background: rgba(255,255,255,0.9);
      position: fixed;
      right: 100px;
      top: 150px;
      width: 300px;
    }
    .el-form-item__content{
      justify-content: space-between;
    }
  }
  </style>
  
  