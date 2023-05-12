<!--
 * @Author: zk
 * @AuthorEnd: your name
 * @Date: 2022-10-21 13:37:01
 * @LastEditTime: 2023-03-27 15:03:30
 * @FilePath: /vue3_vite/src/views/chatPage/chat.vue
 * @Description: 
-->
<template>
    <div>
       <div style="display: flex; flex-wrap: wrap; height: 100%; width: 100%;">
         <!-- <frameset style="width:100px;">
            <frame  v-for="(item, index) in list" :key="index"  :src="item.path" :name="'frame1'" />
        </frameset> --> 
        <div v-for="(item, index) in list" :key="index" class="list" @click="onView(item)">
            <!-- <div>
                <img class="images" :src="item.img" v-if="!item.imgUrl" mode="aspectFit|aspectFill|widthFix" lazy-load="false" />
                <img class="images" :src="item.imgUrl" v-if="item.imgUrl" mode="aspectFit|aspectFill|widthFix" lazy-load="false" />
                
                <div style="position: relative; width: 0;height: 0;overflow: hidden;" v-if="!item.imgUrl">
                    <iframe class="iframe-list" style="transform: scale(0.1);"  :src="item.path" frameborder="0" height="150px" width="100px"></iframe>
                </div>
            </div> -->
            <div>{{ item.name }}</div>
        </div>
       </div>
    </div>
</template>
<script lang="ts">
import { ElMessageBox, ElSwitch } from 'element-plus'
import {defineComponent, reactive, ref, toRefs, h, getCurrentInstance, nextTick} from 'vue'
import html2canvas from "html2canvas";
import boxList from "/src/utils/boxlist.ts"
export default defineComponent({
    name: 'boxList',
    // props:{
    //     menuList: {
    //       type: Array,
    //       default: []
    //     }
    // },
    // components: {
    //     DialogBox
    // },
    computed: {
      
    },
    setup() {
        let tabelIndex = 0
        const ref1 = ref(null)
        const _this = getCurrentInstance() // 必须放在setup里面
        const state = reactive({
            show: false,
            list: boxList.options,
        })
        const dataFn = (val:number = 0, size:number = 10) => {
            var arrData:(object)[] = []
            

        }
        
        const onHtml = () => {
            let dom = document.getElementsByClassName('iframe-list')
            // onHtml(dom)
            for (let i:number = 0; i < dom.length; i++) {
                console.log(dom[i])
                // window.frames['frame0'].document.children[0].style.transform = "scale(0.1)"
                // dom[i].style = 'transform:scale(0.1)'
                // const element = array[i];
                setTimeout(() => {
                    html2canvas(dom[i]).then(function(canvas) {
                        let dataURL = canvas.toDataURL("image/png");
                        let imgUrl = dataURL;
                        // console.log(imgUrl);
                        state.list[i].imgUrl = imgUrl
                    });
                }, 1000);
            }
        }
        const onButton = () => {
            document.querySelectorAll(".list").forEach((button:any) => {
                // console.log(button);
                button.onmousemove = (e:any) => {
                    // console.log(e);
                    const target = e.target;
                    const rect = target.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    button.style.setProperty("--x", `${x}px`);
                    button.style.setProperty("--y", `${y}px`);
                    button.style.setProperty("--height", `${rect.height}px`);
                    button.style.setProperty("--width", `${rect.width}px`);
                };
            });
        }
         // 需要延迟调用，frame没有渲染完成 获取不到
         nextTick(() => {
            // onHtml()
            onButton()
        })
        const methods = {
            // 查看
            onView(val:any){
                _this?.proxy?.$message({type: 'success', message: '跳转中...'})
                console.log('查看', val.path, window.location.href);
                // state.show = !state.show
                // window.location.href = val.path
                window.open(val.path)
            },
        }
    
   
        return {
            customPagination: {
                name: '',
            },
            ...toRefs(state),
            ...methods
        }
    },
    // methods:{
        // pageNoChange(val:number){
        //     console.log(val);
        //     this.tableData = mock.sites.splice((val - 1), 9)
        //     // tableData = mock.sites.splice((val - 1), 9)
        //     // console.log(this.tableData);
            
        // },
        // pageSizeChange(val:Number){
        //     console.log(val);
            
        // },
        // onSubmit(){
        //     console.log(this);
            
        // }
    // }
})
</script>
<style lang="scss">
.content{
    padding: 15px;
    background: #fff;
    text-align: left;
}
.list{
    width: 200px;
    height: auto;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 20px;
    color:#fff;
    background: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 15px rgba(0,0,0,0.1);
    padding: 10px 0;
    position: relative;
    // box-shadow: 0 0 0 500vmin #fff;
    pointer-events: all;
    overflow: hidden;
}
.list::after {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    top: 0;
    left: 0;
    // filter: blur(2px) brightness(0);
    background:
        radial-gradient(
        circle at center,
        var(--lightest),
        var(--light) 5%,
        var(--dark) 30%,
        var(--darkest) 50%
        ),
        var(--darkest);
    // background-size: 0px 0px, 0px 0px, 100%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    opacity: 1;
    // mix-blend-mode: lighten;
    z-index: 2;
    transition: transform 0.5s var(--elastic),
        background-size 0.25s ease-in-out,
        filter 0.5s ease-in-out;
    transform: translate(calc(var(--x) - 50%), calc(var(--y) - 50%));
    pointer-events: none;
 }
// .list:hover::before{
//     filter: blur(2px) brightness(1);
//     background-size: 0px 0px, 100% 100%, 100%;
//     transition: transform 0.5s var(--elastic),
//     background-size 0.25s ease-in-out;
// }
.list > div {
    position: relative;
    z-index: 9;
    text-transform: uppercase;
    text-shadow: clamp(-8px, calc((var(--width) / 2 - var(--x)) / 8), 8px)
    clamp(-8px, calc((var(--height) / 2 - var(--y)) / 8), 8px) 12px
    rgba(0, 0, 0, 0);
}
.iframe-box{
    width: 120px;
    height: 200px;
    overflow: hidden;
    position: relative;
}
.images{
   width: 150px;
   height: 200px;
}
.iframe-list{
    position: absolute;
    top:0
}
.iframe-list body{
    transform:scale(0.2)
}
.iframe-list .htmlbox{
    transform:scale(0.2)
}

</style>
    
