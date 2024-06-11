<!--
 * @Author: zk
 * @AuthorEnd: your name
 * @Date: 2022-10-11 10:07:27
 * @LastEditTime: 2023-02-09 14:38:06
 * @FilePath: /vue3_vite/src/views/Home.vue
 * @Description: 
-->

<template>
    <div class="css-box">
        <div class="box" >
            <Vue3DraggableResizable  :initW="500" :initH="300">
                <div class="title">01. 上下左右居中</div>
                <div class="content div1">
                        <span>display: grid;place-items: center;</span>
                </div>
            </Vue3DraggableResizable>
        </div>
        <div class="box">
            <Vue3DraggableResizable  :initW="500" :initH="300" >
                <div class="title">02. 解构布局：flex: grow | shrink | baseWidth </div>
                <div class="content div2">
                    <div style="width: 70%;">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </div>
                    <div style="width: 20%;">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </div>
                </div>
            </Vue3DraggableResizable>
        </div>
        <div class="box">
            <Vue3DraggableResizable  :initW="500" :initH="300" >
                <div class="title">03. 侧边栏布局：grid-template-columns: minmax( min, max) 1fr</div>
                <div class="content div3">
                    <div>min:150px / max:25%</div>
                    <div>内容</div>
                </div>
            </Vue3DraggableResizable>
        </div>
        <div class="box">
            <Vue3DraggableResizable  :initW="500" :initH="300" >
                <div class="title">04. 煎饼堆栈布局：grid-template-rows: auto 1fr auto</div>
                <div class="content div4">
                    <div>header</div>
                    <div>main</div>
                    <div>footer</div>
                </div>
            </Vue3DraggableResizable>
        </div>
        <div class="box">
            <Vue3DraggableResizable  :initW="500" :initH="300" >
                <div class="title">05. 经典的圣杯布局：grid-template: auto 1fr auto / auto 1fr auto</div>
                <div class="content div5">
                    <div>header</div>
                    <div>
                        <div>left-main</div>
                        <div>conter-main</div>
                        <div>right-main</div>
                    </div>
                    <div>footer</div>
                </div>
            </Vue3DraggableResizable>
        </div>
        <div class="box">
            <Vue3DraggableResizable  :initW="500" :initH="300" >
                <div class="title">06. 12 跨网格：grid-template-columns：repeat(12, 1fr)</div>
                <div class="content div6">
                    <div>span 12</div>
                    <div> span 6</div>
                    <div>span 4</div>
                    <div>span 2</div>
                </div>
            </Vue3DraggableResizable>
        </div>
        <div class="box">
            <Vue3DraggableResizable  :initW="500" :initH="300" >
                <div class="title">07. RAM (Repeat, Auto, MinMax): grid-template-columns(auto-fit, minmax( <base>, 1fr))</div>
                <div class="content div7">
                    <div>span 12</div>
                    <div> span 6</div>
                    <div>span 4</div>
                    <div>span 2</div>
                </div>
            </Vue3DraggableResizable>
        </div>
            
        
       
        
        
    </div>
</template>

<!-- <script src="./js/twgl.min.js"></script> -->
<script>
import { DraggableContainer } from 'vue3-draggable-resizable';
import Vue3DraggableResizable from 'vue3-draggable-resizable';
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';

import { onMounted, ref, nextTick, } from 'vue'; 
export default {
    components: {
        DraggableContainer,
        Vue3DraggableResizable
    },
    setup() {  
        onMounted(async () => {  
        //   count.value++;  
        await nextTick(); // 等待下一个DOM更新循环结束  
        //   console.log('DOM updated'); // 在DOM更新后执行的代码  
        });

        nextTick(() => {
        })
    }
}



</script>


<style lang="scss">
.css-box{
    position: relative;
    width: 100%;
    height: auto;
    background-color: #fff;
    text-align: left;
    .box{
        position: relative;
        height: 300px;
    }
    .title{
        color: #2C73D2;
        font-size: 16px;
        font-weight: bold;
        padding: 10px 20px;
    }
    .content{
        width: 100%;
        height: 80%;
        background-color: #845EC2;
        color: #fff;
        border: #00C9A7 2px solid;
    }
    .div1{
        display: grid;
        place-items: center;
    }
    .div2{
        display: flex;
       div{
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
       }
        span{
            flex: 0 1 150px;
            display: grid;
            place-items: center;
            margin: 5px;
            background-color: #00C9A7;
        }
    }
    .div3{
        display:grid;
        grid-template-columns: minmax(150px, 20%) 1fr;
        div:nth-child(1){
            background-color: #00C9A7;
        }
        div:nth-child(2){
            background-color: #4D8076;
        }
    }
    .div4{
        display: grid;
        grid-template-rows: auto 1fr auto;
        div:nth-child(1){
            background-color: #FF9671;
        }
        div:nth-child(2){
            background-color: #FFC75F;
        }
        div:nth-child(3){
            background-color: #FF6F91;
        }
    }
    .div5{
        display: grid;
        grid-template-rows: auto 1fr auto;
        >div:nth-child(1){
            background-color: #FF9671;
            // grid-column: 1 / 4;
        }
        >div:nth-child(2){
            width: 100%;
            display: flex;
            // grid-template: auto 1fr auto / auto 1fr auto;
            background-color: #FFC75F;
            div:nth-child(1), div:nth-child(3){
                width: 20%;
                background-color: #D65DB1;
            }
            div:nth-child(2){
                flex: 1;
                background-color: #845EC2;
            }
        }
        >div:nth-child(3){
            background-color: #FF6F91;
            // grid-column: 1 / 4;
        }
    }
    .div6{
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        text-align: center;
        div:nth-child(1){
            grid-column: 1 / 13;
            background-color: #00C9A7;
        }
        div:nth-child(2){
            grid-column: 1 / 7;
            background-color: #4D8076;
        }
        div:nth-child(3){
            grid-column: 1 / 5;
            background-color: #2C73D2;
        }
        div:nth-child(4){
            grid-column: 1 / 3;
            background-color: #D65DB1;
        }
    }
    .div7{
        display: grid;
        grid-row: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        div:nth-child(1){
            background-color: #FF9671;
        }
        div:nth-child(2){
            background-color: #FFC75F;
        }
        div:nth-child(3){
            background-color: #FF6F91;
        }
        div:nth-child(4){
            background-color: #D65DB1;
        }
    }
}

</style>
