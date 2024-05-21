

<template>
    <div class="login-box">
            <!-- login - 1 -->
            <div style="height: 550px;margin-right: 20px">
                <div class="login1">
                    <div id="ball" ref="ball"></div>
                    <div id="ball-2" ref="ball-2"></div>
                    <h1>Please Login</h1>
                    <form>
                        <div class="form-control">
                            <input type="text" required >
                            <label for="">Email</label>
                        </div>
                        
                        <div class="form-control">
                            <input type="password" required>
                            <label for="">Password</label>
                        </div>
                        
                        <button class="btn">Login</button>
                        <p class="text">Don't have an account? <a href="#">Register here</a></p>
                    </form>
                </div>
            </div>
            <!-- login - 2 -->
            <div style="height: 550px;margin-right: 20px">
                login - 2
                <div class="shape"></div>
            </div>
            <!-- login - 3 -->
            <div class="login3" style="margin-top: 20px;">
                <section>
                    <div class="login-3">
                        <form action="">
                            <h2>Login</h2>
                            <div class="input-box">
                                <span class="icon">
                                    <ion-icon name="mail"></ion-icon>
                                </span>
                                <input type="email" required>
                                <label>Email</label>
                            </div>

                            <div class="input-box">
                                <span class="icon">
                                    <ion-icon name="lock-closed"></ion-icon>
                                </span>
                                <input type="password" required>
                                <label>Password</label>
                            </div>

                            <div class="remember-forgot">
                                <label><input type="checkbox"> Remember me</label>
                                <a href="#">Forgot Password</a>
                            </div>

                            <button type="submit">Login</button>
                            <div class="register-link">
                                <p>Don't have an account? <a href="#">Register</a></p>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
            <!-- login - 4 -->
            <div class="login4" style="margin-top: 20px;">
                <div class="local-container">
                    <!-- s--switched -->
                    <div :class="`demo ${login4Status ? 's--switched' : ''}`"> 
                        <div class="demo__inner">
                            <div class="demo__forms">
                                <div class="demo__form">
                                    <div class="demo__form-content">
                                        <form class="form">
                                            <div class="form__heading">Welcome back</div>
                                            <label class="form__field">
                                                <span class="form__field-label">email</span>
                                                <input class="form__field-input" type="email">
                                            </label>
                                            <label class="form__field">
                                                <span class="form__field-label">password</span>
                                                <input class="form__field-input" type="password">
                                            </label>
                                            <button type="submit" class="form__submit">Sign in</button>
                                        </form>
                                    </div>
                                </div>
                                <div class="demo__form">
                                    <div class="demo__form-content">
                                        <form class="form">
                                            <div class="form__heading">Time to feel like home</div>
                                            <label class="form__field">
                                                <span class="form__field-label">name</span>
                                                <input class="form__field-input" type="name">
                                            </label>
                                            <label class="form__field">
                                                <span class="form__field-label">email</span>
                                                <input class="form__field-input" type="email">
                                            </label>
                                            <label class="form__field">
                                                <span class="form__field-label">password</span>
                                                <input class="form__field-input" type="password"></label>
                                                <button type="submit" class="form__submit">Sign up</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="demo__switcher">
                                    <div class="demo__switcher-inner">
                                        <div class="demo__switcher-content">
                                            <div class="demo__switcher-text"><div>
                                                <h3>New here?</h3>
                                                <p>Sign up and discover great amount of new opportunities!</p>
                                            </div>
                                            <div>
                                                <h3>One of us?</h3>
                                                <p>If you already has an account, just sign in. We've missed you!</p>
                                            </div>
                                        </div>
                                        <button class="demo__switcher-btn">
                                            <span class="animated-border"></span>
                                            <span class="demo__switcher-btn-inner">
                                                <span @click="login4Sign">Sign Up</span>
                                                <span @click="login4Sign">Sign In</span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
import { onMounted, ref, nextTick } from 'vue';  
export default {  
  setup() {  
    const count = ref(0);
    const login4Status = ref(false);

    onMounted(async () => {  
    //   count.value++;  
      await nextTick(); // 等待下一个DOM更新循环结束  
    //   console.log('DOM updated'); // 在DOM更新后执行的代码  
    });
    function login1(){
        const labels = document.querySelectorAll('.form-control label');
        labels.forEach(label => {
            label.innerHTML = label.innerText.split('').map((letter,idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`).join('')
        })

        const ball = document.querySelector('#ball');
        setInterval(() => {
            let rnd = Math.floor(Math.random() * 200);
            ball.style.top = `${rnd}px`;
            let rnd1 = Math.floor(Math.random() * 300);
            ball.style.left = `${rnd1}px`;
            let rnd2 = Math.floor(Math.random() * 300);
            ball.style.right = `${rnd2}px`;
            let rnd3 = Math.floor(Math.random() * 200);
            ball.style.bottom = `${rnd3}px`;
        }, 2500);

        const ball2 = document.querySelector('#ball-2');
        setInterval(() => {
            let rnd = Math.floor(Math.random() * 300);
            ball2.style.top = `${rnd}px`;
            let rnd1 = Math.floor(Math.random() * 200);
            ball2.style.left = `${rnd1}px`;
            let rnd2 = Math.floor(Math.random() * 200);
            ball2.style.right = `${rnd2}px`;
            let rnd3 = Math.floor(Math.random() * 300);
            ball2.style.bottom = `${rnd3}px`;
        }, 2500);
    }
    function login4Sign(){
            console.log(123123);
            login4Status.value = !login4Status.value
    }
   
	nextTick(() => {
        login1() //基于最新的DOM状态执行update方法
  	})
  
    return { count, login4Status, login4Sign };  
  }  
}

</script>

<style lang="scss">

/* latin */
@font-face {
  font-family: 'DynaPuff';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/dynapuff/v4/z7N5dRvsZDIVHbYPMhZJ3HQ83UaSu4uhr7-ZFeoYkgAr1x8RSxYu2Y_hSDk90n59Vw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

.login-box{
    width: 100%;
    height: 100vh;
    overflow: auto;
    background: lightblue;
    .shape{
        --demoX1: 0;
        --demoX2: calc(200px - 100px);
        --demoX3: 100%;
        --demoX4: calc(200px - 100px);
        --demoX5: 0;
        --demoX6: 0;
        width:200px;
        height:200px;
        background-color:#ff0000;
        clip-path: polygon(var(--demoX1) 0, var(--demoX2) 0, var(--demoX3) 50%, var(--demoX4) 100%, var(--demoX5) 100%, 50% 50%);
    }
    >div{
        // width: 50%;
        // height: 500px;
        // margin-right: 20px;
        display: flex;
        justify-content: center;
        justify-items: center;
    }
    .login1{
        width: 400px;
        position: relative;
        background-color: rgba(0,0,0,0.4);
        padding: 20px 40px;
        border-radius: 5px;
        box-shadow: 5px 5px 3px rgba(0,0,0,0.2);
        z-index: 2;
        font-family: 'DynaPuff', cursive;
        color: white;
        #ball {
            position: absolute;
            width: 75px;
            height: 75px;
            background-image: linear-gradient(50deg, #D14D7288, #FCC8D1dd);
            border-radius: 50%;
            z-index: -1;
            transition: all 10s ease;
            filter: blur(3px);
        }
        #ball-2 {
            position: absolute;
            width: 50px;
            height: 50px;
            background-image: linear-gradient(50deg, #00FFCA88, #ADE4DBdd);
            border-radius: 50%;
            z-index: -1;
            transition: all 10s ease;
            filter: blur(3px);
        }
        .container h1 {
            text-align: center;
            margin-bottom: 30px;
            transition: all 4s ease;
        }
        .container a {
            text-decoration: none;
            color: lightblue;
        }
        .btn {
            font-family: inherit;
            cursor: pointer;
            display: inline-block;
            width: 100%;
            background: lightblue;
            padding: 15px;
            font-size: 16px;
            border: 0;
            border-radius: 5px;
        }
        .btn:focus {
            outline: 0;	
        }

        .btn:active {
            transform: scale(0.98);
        }

        .text {
            margin-top: 30px;
        }

        .form-control {
            position: relative;
            margin: 20px 0px 40px;
        }
        .form-control input {
            background-color: transparent;
            border: 0;
            border-bottom: 2px #fff solid;
            width: 100%;
            height: 50px;
            padding: 15px 0px 0px 0px;
            font-size: 12px;
            color: white;
        }
        .form-control input:focus, .form-control input:valid  {
            outline: 0;
            border-bottom-color: lightblue;
        }
        .form-control label {
            position: absolute;
            top: 3px;
            left: 0;
        }
        .form-control label span {
            display: inline-block;
            font-size: 16px;
            min-width: 5px;
            transition: 0.3s cubic-bezier(0.68,-0.55,0.265,1.55);
        }
        .form-control input:focus + label span,
        .form-control input:valid + label span {
            color: lightblue;
            transform: translateY(-5px);
        }
    }
    .login3{
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        .login-3{
            width: 600px;
            height: 450px;
            background: transparent;
            border: 2px solid rgba(119, 92, 92, 0.5);
            border-radius: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(15px);
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        } 

        section {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100vh;
            background: url('../../image/wp2150006.webp') no-repeat;
            background-size: cover;
            background-position: center;
            animation: animateBg 5s linear infinite;
        }

        @keyframes animateBg {
            100% {
                filter: hue-rotate(360deg)
            }
        }

        .login-box {
            position: relative;
            width: 600px;
            height: 450px;
            background: transparent;
            border: 2px solid rgba(119, 92, 92, 0.5);
            border-radius: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(15px);

        }


        h2 {
            font-size: 2.5rem;
            color: #fff;
            text-align: center;
        }

        .input-box {
            position: relative;
            width: 310px;
            margin: 30px 0;
            border-bottom: 2px solid #fff;
        }

        .input-box label {
            position: absolute;
            top: 50%;
            left: 5px;
            transform: translateY(-50%);
            font-size: 1rem;
            color: #fff;
            pointer-events: none;
            transition: .5s;
        }

        .input-box input:focus~label,
        .input-box input:valid~label {
            top: -5px;
        }

        .input-box input {
            width: 100%;
            height: 50px;
            background: transparent;
            border: none;
            outline: none;
            font-size: 1rem;
            color: #fff;
            padding: 0 35px 0 5px;
        }

        .input-box .icon {
            position: absolute;
            right: 8px;
            color: #fff;
            font-size: 1.2rem;
            line-height: 57px;
        }

        .remember-forgot {
            margin: -15px 0 15px;
            font-size: .9em;
            color: #fff;
            display: flex;
            justify-content: space-between;
        }

        .remember-forgot label input {
            margin-right: 3px ;
        }

        .remember-forgot a {
            color: #fff;
            text-decoration: none;}

            .remember-forgot a:hover {
            text-decoration: underline;
            }

            button {
                width: 100%;
                height: 40px;
                background: #fff;
                border: none;
                outline: none;
                border-radius: 40px;
                cursor: pointer;
                font-size: 1rem;
                color: #000;
                font-weight: 500;
            }    

            .register-link {
                font-size: .9rem;
                color: #fff;
                text-align: center;
                margin: 25px 0 10px;
            }

            .register-link p a {
                color: #fff;
                text-decoration: none;
                font-weight: 600;    
            }

            .register-link p a:hover {
                text-decoration: underline;
            }

            @media (max-width: 360px) {
                .login-box {
                    width: 100%;
                    height: 100vh;
                    border: none;
                    border-radius: 0;
                }

                .input-box {
                    width: 290px;
                }
            }
    }
    .login4{
        position: relative;
        box-sizing: border-box;
        *{
            box-sizing: border-box;
            position: relative;
            padding: 0;
            margin: 0;
        }
        input, button {
            border: none;
            outline: none;
            background: none;
            font-family: inherit;
            border-radius:0;
        }
        .local-container{
            width: 800px;
            max-width: 100%;
        }
        .demo.s--switched {
            .demo__inner {
                --demoX1: var(--arrow-offset);
                --demoX2: 100%;
                --demoX3: 100%;
                --demoX4: 100%;
                --demoX5: var(--arrow-offset);
                --demoX6: 0;
            }
            .demo__forms {
                transform: translateX(var(--switcher-width));
            }
            .demo__form:first-child {
                opacity: 0;
                pointer-events: none;
            }
            .demo__form:last-child {
                opacity: 1;
                pointer-events: auto;
            }
            .demo__switcher {
                --x1: var(--arrow-offset);
                --x2: var(--switcher-width);
                --x3: calc(var(--switcher-width) - var(--arrow-offset));
                --x4: var(--switcher-width);
                --x5: var(--arrow-offset);
                --x6: 0;
            }
            .demo__switcher-text {
                transform: translateX(-100%);
            }
            .demo__switcher-btn-inner span {
                transform: translateY(-100%);
            }
            .demo__switcher-inner {
                transform: translateX(calc((100% - var(--switcher-width))* -1));
            }
        }
        .demo{
            --switcher-width: 260px;
            --arrow-offset: 30px;
            --anim-time: 1.2s;
            --transition-transform: transform var(--anim-time) ease-in-out;
            --transition-opacity: opacity 0s calc(var(--anim-time) / 2);
            --btn-height: 36px;
            height: 550px;
            filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
            button {
                display: block;
                margin: 0 auto;
                height: var(--btn-height);
                color: #fff;
                font-size: 15px;
                cursor: pointer;
               
            }
        }
        .demo__inner{
            --demoX1: 0;
            --demoX2: calc(100% - var(--arrow-offset));
            --demoX3: 100%;
            --demoX4: calc(100% - var(--arrow-offset));
            --demoX5: 0;
            --demoX6: 0;
            overflow: hidden;
            height: 100%;
            padding-right: var(--switcher-width);
            background: #fff;
            transition: -webkit-clip-path var(--anim-time) ease-in-out;
            transition: clip-path var(--anim-time) ease-in-out;
            transition: clip-path var(--anim-time) ease-in-out, -webkit-clip-path var(--anim-time) ease-in-out;
            will-change: clip-path;
            -webkit-clip-path: polygon(var(--demoX1) 0, var(--demoX2) 0, var(--demoX3) 50%, var(--demoX4) 100%, var(--demoX5) 100%, var(--demoX6) 50%);
            clip-path: polygon(var(--demoX1) 0, var(--demoX2) 0, var(--demoX3) 50%, var(--demoX4) 100%, var(--demoX5) 100%, var(--demoX6) 50%);
            .demo__forms {
                height: 100%;
                transition: var(--transition-transform);
                will-change: transform;
            }
            .demo__form {
                position: absolute;
                inset: 0;
                transition: var(--transition-opacity);
                &:first-child {
                opacity: 1;
                pointer-events: none;
                }
                &:last-child {
                    opacity: 0;
                    pointer-events: auto;
                }
            }
            .demo__form-content {
                width: var(--switcher-width);
                margin: 0 auto;
            }
            .form {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                height: 100%;
                padding: 50px 0;
                row-gap: 20px;
                text-align: center;
                transition: transform var(--anim-time, 1.2s);
                will-change: transform;
            }
            .form__heading {
                font-size: 20px;
                font-weight: bold;
            }
            .form__field-label {
                font-size: 12px;
                color: #cfcfcf;
                text-transform: uppercase;
            }
            .form__field-input {
                display: block;
                width: 100%;
                max-width: 100%;
                margin-top: 5px;
                padding-bottom: 5px;
                font-size: 16px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.4);
                text-align: center;
            }

           

        }
        .form__submit {
            border-radius: 0;
            width: 100%;
            background: #d4af7a;
        }
     
        .demo__switcher {
            --x1: calc(100% - var(--switcher-width));
            --x2: calc(100% - var(--arrow-offset));
            --x3: 100%;
            --x4: calc(100% - var(--arrow-offset));
            --x5: calc(100% - var(--switcher-width));
            --x6: calc(100% - var(--switcher-width) + var(--arrow-offset));
            z-index: 2;
            overflow: hidden;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/sections-3.jpg);
            background-size: cover;
            background-position: center center;
            -webkit-clip-path: polygon(var(--x1) 0, var(--x2) 0, var(--x3) 50%, var(--x4) 100%, var(--x5) 100%, var(--x6) 50%);
            clip-path: polygon(var(--x1) 0, var(--x2) 0, var(--x3) 50%, var(--x4) 100%, var(--x5) 100%, var(--x6) 50%);
            transition: -webkit-clip-path var(--anim-time) ease-in-out;
            transition: clip-path var(--anim-time) ease-in-out;
            transition: clip-path var(--anim-time) ease-in-out, -webkit-clip-path var(--anim-time) ease-in-out;
            will-change: clip-path;
            &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
            }
            .demo__switcher-inner {
                height: 100%;
                transition: var(--transition-transform);
                will-change: transform;
            }
            .demo__switcher-content {
                overflow: hidden;
                position: absolute;
                right: 0;
                top: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                -moz-column-gap: 20px;
                column-gap: 20px;
                width: var(--switcher-width);
                height: 100%;
            }
            .demo__switcher-text {
                display: flex;
                flex-wrap: nowrap;
                height: 140px;
                color: #fff;
                transition: var(--transition-transform);
                will-change: transform;
                >div{
                    width: 100%;
                    flex-shrink: 0;
                    text-align: center;
                }
                >div:first-child {
                    padding-left: calc(var(--arrow-offset) + 10px);
                    padding-right: calc(var(--arrow-offset) - 10px);
                }
                > div:last-child {
                    padding-left: calc(var(--arrow-offset) - 10px);
                    padding-right: calc(var(--arrow-offset) + 10px);
                }
            }
            .demo__switcher-btn {
                --btn-width: 100px;
                --border-width: 3px;
                overflow: hidden;
                width: var(--btn-width);
            }
            .animated-border {
                --bw: var(--border-width, 3px);
                z-index: 2;
                position: absolute;
                inset: 0;
                -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, var(--bw) var(--bw), var(--bw) calc(100% - var(--bw)), calc(100% - var(--bw)) calc(100% - var(--bw)), calc(100% - var(--bw)) var(--bw), var(--bw) var(--bw));
                clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, var(--bw) var(--bw), var(--bw) calc(100% - var(--bw)), calc(100% - var(--bw)) calc(100% - var(--bw)), calc(100% - var(--bw)) var(--bw), var(--bw) var(--bw));
                &::before {
                    content: "";
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 150%;
                    padding-bottom: 150%;
                    transform: translate(-50%, -50%);
                    background: conic-gradient(from 270deg, #ff4800 10%, #dfd902 35%, #20dc68, #0092f4, #da54d8 72% 75%, #ff4800 95%);
                    -webkit-animation: rotateBtnBg 2s linear infinite;
                    animation: rotateBtnBg 2s linear infinite;
                }
            }
            .demo__switcher-btn-inner {
                z-index: 1;
                position: absolute;
                inset: 0;
                font-weight: 500;
                span {
                    display: block;
                    height: 100%;
                    line-height: var(--btn-height);
                    text-align: center;
                    text-transform: uppercase;
                    transition: var(--transition-transform);
                    will-change: transform;
                }
            }
           
        }
      
        
    }
}

@keyframes rotateBtnBg {
    100%{
        transform: translate(-50%, -50%) rotate(360deg);
    }
}
</style>
