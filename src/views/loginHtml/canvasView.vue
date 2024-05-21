<!--
 * @Author: zk
 * @AuthorEnd: your name
 * @Date: 2022-10-11 10:07:27
 * @LastEditTime: 2023-02-09 14:38:06
 * @FilePath: /vue3_vite/src/views/Home.vue
 * @Description: 
-->

<template>
    <div class="canvas-box">
        <div class="canvas1">
            <canvas id="canvas1"></canvas>
        </div>
    </div>
</template>

<!-- <script src="./js/twgl.min.js"></script> -->
<script>
import { onMounted, ref, nextTick } from 'vue'; 
export default {  
  setup() {  

    onMounted(async () => {  
    //   count.value++;  
      await nextTick(); // 等待下一个DOM更新循环结束  
    //   console.log('DOM updated'); // 在DOM更新后执行的代码  
    });
    function canvas1(){
        
    }
    nextTick(() => {
        canvas1() //基于最新的DOM状态执行update方法
  	})
  }
}



</script>


<style lang="scss">
.canvas-box{
    canvas{
        width: 100%;
        height: 100%;
    }
    .canvas1{
        width: 100%;
        height: 100vh;
    }
}

</style>
