<!--
 * @Author: zk
 * @AuthorEnd: your name
 * @Date: 2022-10-11 10:07:27
 * @LastEditTime: 2023-02-09 14:38:06
 * @FilePath: /vue3_vite/src/views/Home.vue
 * @Description: 
-->

<template>
    <div class="mask-box">
        <div class="mask1">
            <div class="bg"></div>
            <div class="content">
                <div class="text"></div>
                <h1>The Future Of Possible</h1>
            </div>
        </div>
        <div class="mask3">
            <div class="wrap"></div>
        </div>
        <div class="mask2" style="margin-top: 20px;">
            <div>MASK 玻璃磨砂质感</div>
            <div class="wrap" id="img">
                <p>撒大嫂啥地方</p>
                <!-- <img class="prew" src="https://tva1.sinaimg.cn/large/008i3skNgy1gubr2sbyqdj60xa0m6tey02.jpg"> -->
            </div>
            <div>MASK 图片重叠1</div>
            <div class="overlap-1"></div>
            <div>MASK 图片重叠</div>
            <div class="overlap"></div>
            <div>MASK 切角</div>
            <div class="chamfering">
                <div class="chamfering-1"></div>
                <div class="chamfering-2"></div>
            </div>
            <div>MASK 进行转场动画 1</div>
            <div class="gradient"></div>
            <div>MASK 进行转场动画 2</div>
            <div class="gradient1"></div>
            <div>MASK 进行转场动画 3</div>
            <div class="gradient3"></div>
            <div>MASK 进行转场动画-逐帧动画</div>
            <div class="mask">
                <div class="img1"> </div>
                <div class="img2"> </div>
            </div>
            <div>MASK 碰撞滤镜与混合模式</div>
            <div class="contrast"></div>
            <div class="contrast1" style="margin-top: 20px;"></div>
            <div class="contrast2" style="margin-top: 20px;"></div>
            <div class="contrast3" style="margin-top: 20px;">
                <div class="wrap"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, nextTick } from 'vue';
export default {  
  setup() { 
        onMounted(async () => {  
            //   count.value++;  
            await nextTick(); // 等待下一个DOM更新循环结束  
            //   console.log('DOM updated'); // 在DOM更新后执行的代码  
        });
        nextTick(() => {
            // 滑动
            img.addEventListener('mousemove', (ev) => {
                img.style.setProperty('--x', ev.offsetX / ev.target.offsetWidth);
                img.style.setProperty('--y', ev.offsetY / ev.target.offsetHeight);
            })
        })
   }
}

</script>


<style lang="scss">
.mask-box{
    width: 100%;
    height: 100%;
    .mask1{
        width: 100%;
        height: 500px;
        position: relative;
       
        font-family: "Open Sans", "PingFang SC", "Microsoft YaHei", "Helvetica Neue", "Hiragino Sans GB", "WenQuanYi Micro Hei", Arial, sans-serif;
        .bg{
            width: 100%;
            height: 100%;
            background: url(../../assets/image/mask1.jpeg);
            filter: blur(5px); 
        }
        .content{
            position: absolute;
            top: 0;
            z-index: 9;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        h1{
            color: white;
        }
        .text{
            width: 340px;
            height: 196px;
            animation: move 100s infinite;
            background-image: url(../../assets/image/mask1.jpeg);
            background-size: cover;
            mask: url(http://www2.djicdn.com/assets/images/v3/logo-black2-145dcb13c56f36a65d084180a42136fa.svg);
            mask-size: cover;
        }
    }
    .mask3{
        width: 100%;
        height: 500px;
        background: url("../../assets/image/mask1.jpeg");
        background-size: cover;
        position: relative;
        .wrap{
            width: 100%;
            height: 100%;
            background: #000;
            filter: contrast(700%);
            mix-blend-mode: multiply;
            &::before{
                content: "";
                position: absolute;
                top: 0; right: 0; bottom: 0; left: 0;
                background: radial-gradient(#fff, transparent);
                background-size: 5px 5px;
                // animation: maskRadial 20s steps(30) infinite;
                // mask: linear-gradient(#000, rgba(0, 0, 0, .1));
            }
        }
    }
    .mask2{
        .wrap{
            position: relative;
            overflow:hidden;
        }
        .wrap::before{
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E %3Cpath d='M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z'%3E%3C/path%3E %3C/svg%3E"), linear-gradient(red, red);
            mask-size: 100px, 100%;
            mask-repeat: no-repeat;
            mask-position: calc(var(--x, .5) * 100% + var(--x, .5) * 100px - 50px )  calc(var(--y, .5) * 100% + var(--y, .5) * 100px - 50px ), 0;
            mask-composite: xor; 
            mask-composite: exclude;
            background: rgba(0,0,0,.1);
            backdrop-filter: blur(10px)
        }
        /* MASK 图片重叠 */
        .overlap {
            width: 100%;
            height: 500px;
            position: relative;
            background: url('../../assets/image/1519722.jpeg') no-repeat;
            background-size:100% 100%;
        }
        .overlap::before {
            position: absolute;
            content: "";
            top: 0;left: 0; right: 0;bottom: 0;
            background: url('../../assets/image/wp2150006.webp') no-repeat;
            background-size:100% 100%;
            /* -webkit-mask: linear-gradient(45deg, #000 50%, transparent 50%); */
            mask: linear-gradient(300deg, transparent 40%, #000 60%);
        }
        .overlap-1 {
            width: 100%;
            height: 500px;
            position: relative;
            background: url('../../assets/image/1519722.jpeg') no-repeat;
            background-size:100% 100%;
        }
        .overlap-1::before {
            position: absolute;
            content: "";
            top: 0;left: 0; right: 0;bottom: 0;
            background: url('../../assets/image/wp2150006.webp') no-repeat;
            background-size:100% 100%;
            /* mask: linear-gradient(45deg, #000 50%, transparent 50%); */
            mask: linear-gradient(45deg, #000 50%, transparent 50%);
        }

        



        /* MASK 切角 */
        .chamfering{
            display: flex;
            >div{
                width: 200px;
                height: 120px;
                background-image: url("../../assets/image/wp2150006.webp");
                mask: linear-gradient(135deg, transparent 15px, #fff 0)
                        top left,
                        linear-gradient(-135deg, transparent 15px, #fff 0)
                        top right,
                        linear-gradient(-45deg, transparent 15px, #fff 0)
                        bottom right,
                        linear-gradient(45deg, transparent 15px, #fff 0)
                        bottom left;
                mask-repeat: no-repeat;
                
            }
            .chamfering-1{
                mask-size: 50% 50%;
                background-size: cover;
            }
            .chamfering-2{
                margin-left: 20px;
                mask-size: 40% 40%;
                background-size: cover;
            }
           
        }
        /* MASK 进行转场动画 */
        .gradient{
            width: 100%;
            height: 500px;
            background: url('../../assets/image/1519722.jpeg') no-repeat;
            background-size:100% 100%;
            position: relative;
            &::before{
                position: absolute;
                content: "";
                inset: 0;
                background: url('../../assets/image/wp2150006.webp');
                background-size:100% 100%;
                animation: maskRotate 3s infinite;
            }
        }
        .gradient1{
            width: 100%;
            height: 500px;
            background: url('../../assets/image/1519722.jpeg') no-repeat;
            background-size:100% 100%;
            position: relative;
            &::before{
                position: absolute;
                content: "";
                inset: 0;
                background: url('../../assets/image/wp2150006.webp');
                background-size:100% 100%;
                animation: maskRotate1 3s infinite;
            }
        }
        .gradient3{
            width: 100%;
            height: 500px;
            background: url('../../assets/image/1519722.jpeg') no-repeat;
            background-size:100% 100%;
            position: relative;
            &::before{
                position: absolute;
                content: "";
                inset: 0;
                background: url('../../assets/image/wp2150006.webp');
                background-size:100% 100%;
                animation: maskRotate2 3s infinite;
            }
        }
        // .gradient::before{
        //     position: absolute;
        //     content: "";
        //     top: 0;left: 0; right: 0;bottom: 0;
        //     background: url('../../image/wp2150006.webp') no-repeat;
        //     background-size:100% 100%;
        //     animation: maskRotate 3s  steps(100) infinite;
        // }
       

        /* MASK 进行转场动画-逐帧动画 */
        .mask{
            width: 100%;
            height: 500px;
            position: relative;
        }
        .img1{
            width: 100%;
            height: 100%;
            background: url('../../assets/image/1519722.jpeg') no-repeat left top;
            background-size: cover;
        }
        .img2 {
            position: absolute;
            z-index: 9;
            top: 0;
            left: 0;
            width: 100%;
            height: 500px;
            background: url("../../assets/image/mask1.jpeg") no-repeat left top;
            background-size: 100% 100%;
            mask: url('../../assets//image/maskzhen.png');
            -webkit-mask: url('../../assets/image/maskzhen.png');
            /*mask-composite: xor;  */
            /* -webkit-mask: url('https://media.prod.mdn.mozit.cloud/attachments/2016/03/03/12676/cef7251f571b727c87a4613cfb347bbc/star.svg'); */
            mask-size: 3000% 100%;
            -webkit-mask-size: 3000% 100%;
            animation: maskMoveImg 2s steps(29) infinite;
            // &::before{
            //     content: "";
            //     position: absolute;
            //     inset:0;
            //     width: 100%;
            //     height: 100%;
            //     background: url("../../assets/image/mask1.jpeg") no-repeat left top;
            // }
        }
    
        /* MASK 碰撞滤镜与混合模式 */
        .contrast{
            width: 100%;
            height: 500px;
            background: #fff;
            position: relative;
            filter: contrast(10);
            &::before{
                content: "";
                position: absolute;
                top: 0; right: 0; bottom: 0; left: 0;
                background: radial-gradient(#000, transparent);
                background-size: 20px 20px;
            }
        }
        .contrast1{
            width: 100%;
            height: 500px;
            background: #fff;
            position: relative;
            filter: contrast(20);
            &::before{
                content: "";
                position: absolute;
                top: 0; right: 0; bottom: 0; left: 0;
                background: radial-gradient(#000, transparent);
                background-size: 20px 20px;
                mask: linear-gradient(-180deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, .5));
            }
        }
        .contrast2{
            width: 100%;
            height: 500px;
            background: #fff;
            position: relative;
            filter: contrast(10);
            &::before{
                content: "";
                position: absolute;
                top: 0; right: 0; bottom: 0; left: 0;
                background: radial-gradient(#0044aa, transparent);
                background-size: 20px 20px;
                animation: maskRadial 20s steps(30) infinite;
                // mask: repeating-radial-gradient(circle at 35% 65%, #000, rgba(0, 0, 0, .5), #000 25%);
            }
        }
        .contrast3{
            width: 100%;
            height: 500px;
            background: linear-gradient(45deg, #f44336, #ff9800, #ffeb3b, #8bc34a, #00bcd4, #673ab7);
            position: relative;
            .wrap{
                width: 100%;
                height: 100%;
                background: #000;
                filter: contrast(700%);
                mix-blend-mode: multiply;
                &::before{
                    content: "";
                    position: absolute;
                    top: 0; right: 0; bottom: 0; left: 0;
                    background: radial-gradient(#fff, transparent);
                    background-size: 20px 20px;
                    // animation: maskRadial 20s steps(30) infinite;
                    mask: linear-gradient(#000, rgba(0, 0, 0, .5));
                }
            }
        }
      
    }
}
@keyframes move {
    0% {
    background-position: 0 0;
    }
    50% {
        background-position: 100% 0;
    }
}
@keyframes maskMoveImg {
    from{
        mask-position: 0 0;
        -webkit-mask-position: 0 0;
    }
    to {
        mask-position: 100% 0;
        -webkit-mask-position: 100% 0;
    }
}
@keyframes maskRotate {
    @for $i from 0 through 100 {
        #{$i}% {
            mask: linear-gradient(45deg, #000 #{$i + '%'}, transparent #{$i + 5 + '%'});
        }
    }
}
@keyframes maskRotate1 {
    @for $i from 0 through 100 {
        #{$i}% {
            mask: conic-gradient(#000 #{$i - 3 + '%'}, transparent #{$i + '%'}, transparent);
        }
    }
}
@keyframes maskRotate2 {
    @for $i from 0 through 100 {
        #{$i}% {
            mask: linear-gradient(#{($i * 3.6) + 'deg'}, transparent 40%, #000 60%);
        }
    }
}
@keyframes maskRadial {
    @for $i from 0 through 100 {
        #{$i}% {
            filter: hue-rotate(#{$i * 3.6 + 'deg'});
            mask: repeating-radial-gradient(circle at 35% 65%, #000, rgba(0, 0, 0, .5), #000 #{$i + 10 +  '%'});
        }
    }
}
</style>
