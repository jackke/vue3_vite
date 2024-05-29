

<template>
    <div class="html-box">
            <!-- html - 1 -->
            <div class="html-1">
                <div class="title">
                    <div class="text">404</div>
                    <div class="reflection">
                        <div class="border" style="position: absolute;width: 100%;height: 100%; left: 0; bottom: 0;z-index: 9;"></div>
                        <div class="text" style="position: absolute;width: 100%;height: 100%; left: 0; top: 0;z-index: 9;">404</div>
                    </div>
                </div>
                <svg><filter id="fractal" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%"><feTurbulence id="turbulence" type="fractalNoise" baseFrequency="0.005 0.005" numOctaves="10"><animate attributeName="baseFrequency" dur="30s" values="0.005 0.005;0.05 0.3;0.005 0.005" repeatCount="indefinite"></animate></feTurbulence><feDisplacementMap in="SourceGraphic" scale="15"></feDisplacementMap></filter></svg>
            </div>
            <!-- html - 2 -->
            <div class="html-2">
                <div>VUE3 管理平台</div>
            </div>
    </div>
</template>
<!-- <script type="text/javascript" src="../../utils/vendors.js"></script>
<script type="text/javascript" src="../../utils/demo5.js"></script> -->
<script>
import { onMounted, ref, nextTick } from 'vue';
// import "../../utils/demo5.js";
// import "../../utils/vendors.js";
export default {  
  setup() {  
    const count = ref(0);
    const login4Status = ref(false);

    onMounted(async () => {  
    //   count.value++;  
      await nextTick(); // 等待下一个DOM更新循环结束  
    //   console.log('DOM updated'); // 在DOM更新后执行的代码  
    });

   
	nextTick(() => {
        login1() //基于最新的DOM状态执行update方法
  	})
  
    return { count };  
  }  
}

</script>

<style lang="scss">
.html-box{
    height: 100%;
    overflow: scroll;
    >div{
        height: 100vh;
        width: 100%;
        margin-bottom: 20px;
    }
    .html-1{
        position: relative;
        background-color: #111;
        text-align: center;
        color: #fff;
        .title{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        
            >div{
                height: 50%;
                
            }
            .reflection{
                filter: url(#fractal);
                transform: rotateX(140deg);
            }
            .border{
                border-bottom: 2px inset #fff;
            }
            .text{
                text-shadow:   
                // 0 0 10px #fff; /* 白色主发光 */
                0 0 20px #fff; /* 白色次发光 */
                // 0 0 30px #fff; /* 白色再次发光 */
                line-height: 500px;
                font-size: 100px;
                font-weight: 900;
            }
        }
    }
    .html-2{
        height: 100px;
        text-align: center;
        line-height: 100px;
        >div{
            font-size: 100px;
            font-weight: 900;
            height: 100%;
            color: transparent;
            background-clip: text;
            background-image: url("../../assets/image/giphy.gif");
        }
    }
}

</style>
