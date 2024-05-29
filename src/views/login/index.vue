<template>
    <div class="login-container">
        <div class="main">
            <div class="stars"></div>
        </div>
        <div :class="signInStatus ? 'login-form right-panel-active' : 'login-form'">
            <div>
                <div>
                    <el-button class="sign-b" type="primary" @click="signIn">
                      <span>SIGN UP</span>
                      <span>LOG IN</span>
                    </el-button>
                </div>
            </div>
            <div class="form-box">
              <el-form ref="ruleFormRef" style="width:80%" :model="loginForm" :rules="loginRules">
                <el-form-item>
                      <div class="title">
                        <span v-if="signInStatus">SIGN UP</span>
                        <span v-if="!signInStatus">LOG IN</span>
                      </div>
                  </el-form-item>
                  <el-form-item prop="username">
                      <div class="form-input">
                          <input v-model="loginForm.username" required/>
                          <label>账号：</label>
                      </div>
                  </el-form-item>
                  <el-form-item prop="password">
                      <div class="form-input">
                          <input v-model="loginForm.password" required/>
                          <label>密码：</label>
                      </div>
                      <!-- <el-input :type="passwordType" v-model="loginForm.password">
                        <template #suffix >
                          <el-icon @click="showPwd"><Hide /></el-icon>
                        </template>
                      </el-input> -->
                  </el-form-item>
                  <el-form-item>
                      <el-button v-if="!signInStatus" type="primary" style="width:100%" @click="onSubmit">登 录</el-button>
                      <el-button v-if="signInStatus" type="primary" style="width:100%" @click="onSubmit">注 册</el-button>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="text" >忘记密码？</el-button>
                  </el-form-item>
              </el-form>
            </div>
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
        signInStatus: false,
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
        signIn: () => {
          state.signInStatus = !state.signInStatus
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
      background-image: url('@/assets/image/mask1.jpeg');
      // background-image: url('@/assets/image/xingkong.jpeg');
      background-size: 120% 110%;
      background-repeat: no-repeat;
      .login-form{
          border-radius: 10px;
          width: 50vw;
          height: 50vh;
          position: fixed;
          top: 10%;
          left: 50%;
          margin-left: -25vw;
          // background-image: url("../../assets//image/mask1.jpeg");
          // background-size: 100% 100%;
          display: flex;
          overflow: hidden;
          >div{
              width: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgba($color: #000000, $alpha: 0.3);
              transition: all .6s ease-in-out;
              &:nth-child(1){
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 50%;
                z-index: 9;
                background-image: url("../../assets//image/mask1.jpeg");
                background-size: 200% 110%;
              }
              &:nth-child(2){
                position: absolute;
                top: 0;
                right: 0;
                height: 100%;
                width: 50%;
                z-index: 7;
              }
          }
          .sign-b{
            overflow: hidden;
          }
          .sign-b span{
            display: flex;
            flex-direction: column;
            width: 100px;
            height: 60px;
            text-align: center;
            position: relative;
            transition: all .6s ease-in-out;
            span{
              position: relative;
              top:15px;
              height: 30px;
              line-height: 30px;
            }
          }
          .form-box{
            background-color: #fff;
            .title{
              width: 100%;
              text-align:center;
              font-size: 30px;
              margin-bottom: 20px;
            }
            .form-input{
                position: relative;
                width: 100%;
                label{
                  position: absolute;
                  top: 0 ;
                  left: 0;
                  height: 40px;
                  line-height: 40px;
                  transition: all .6s ease-in-out;
                }
                input{
                  width: 100%;
                  height: 40px;
                  border: 0;
                  outline:none;
                  border-bottom: 2px solid #ccc;
                }
                input:focus, input:valid{
                  border-color: #409EFF;
                  &~label{
                    top: -18px;
                  }
                }
            }
        }
      }
      .right-panel-active{
        >div:nth-child(1){
          // transform: translateX(100%);
          left: 50%;
          background-position-x: 100%;
        }
        >div:nth-child(2){
          transform: translateX(-100%);
        }
        .sign-b span{
            transform: translateY(-34%);
          }
      }
      
  }
  </style>
  
  