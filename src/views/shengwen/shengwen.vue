<!--
 * @Author: zk
 * @AuthorEnd: your name
 * @Date: 2022-10-21 13:37:01
 * @LastEditTime: 2023-03-27 15:03:30
 * @FilePath: /vue3_vite/src/views/chatPage/chat.vue
 * @Description: 
-->
<template>
    <div class="content">
        <!-- <audio controls loop autoplay>
            <source :src="voiceSrc" type="audio/mpeg">
            您的浏览器不支持 audio 元素。
        </audio> -->
        <div ref="waveformRef"></div>
        <div ref="waveTimelineRef"></div>
        <div class="floor">
            <el-button type="primary" @click="onSkip(-3)">后退</el-button>
            <el-button type="primary" @click="onPlayPause">
                <i class="el-icon-video-play" />
                播放 / 暂停
            </el-button> 
            <el-button type="primary" @click="onSkip(3)">前进</el-button>
            <el-button type="primary" @click="rebroadcast">重放</el-button>
            <el-button type="primary" @click="handleStop">停止</el-button> 
            <el-button @click="getRegions">打印区域</el-button>
        </div>
    </div>
</template>
<script lang="ts">
import { ElMessageBox, ElSwitch } from 'element-plus'
import {defineComponent, reactive, ref, toRefs, h, getCurrentInstance, nextTick} from 'vue'
import WaveSurfer from "wavesurfer.js"
import Region from 'wavesurfer.js/src/plugin/regions'
import Cursor from 'wavesurfer.js/src/plugin/cursor'
import Timeline from 'wavesurfer.js/src/plugin/timeline'
import voice from "/src/utils/yigeren.mp3"

export default defineComponent({
    name: 'shengwen',
    setup() {
        const _this = getCurrentInstance()
        const waveformRef:any = ref()
        const waveTimelineRef = ref()
        let wavesurferCopy:any
        const state = reactive({
            show: false,
            voiceSrc: voice,
            wavesurfers: wavesurferCopy
        })
        const init = () => {
            console.log(waveformRef, _this?.refs);
            
            const container:any = _this?.refs.waveformRef
            // container.addEventListener('click', () => {
            //     console.log('点击容器')
            //     // this.clearLoop()
            // })
            let wavesurfer = WaveSurfer.create({
                container, // 容器，唯一一个必须参数
                cursorColor: 'red', // 音频光标颜色
                waveColor: '#ddd', // 波形颜色
                progressColor: '#bbb', // 已完成播放的波形颜色 当progressColor和waveColor相同时，完全不渲染进度波
                backend: 'MediaElement',
                autoCenter: false,
                plugins: [
                    Region.create({
                        // regionsMinLength: 1.5,
                        regions: [
                        { start: 1, end: 3, color: 'hsla(400, 100%, 30%, 0.5)' },
                        { start: 5, end: 7, color: 'hsla(200, 50%, 70%, 0.4)' }
                        ],
                        dragSelection: true,
                    }),
                    Cursor.create({
                        showTime: true,
                        opacity: "1",
                        customShowTimeStyle: { 'background-color': '#000', color: '#fff', padding: '2px', 'font-size': '10px' }
                    }),
                    Timeline.create({ container: waveformRef })
                ]
            })

            wavesurfer.load(state.voiceSrc) // 加载音频url

            // 点击区域
            wavesurfer.on('region-click', (region:any) => {
                console.log(region);
                
                // const timer = setTimeout(() => {
                //     console.log('定时器')
                //     region.playLoop()
                // })
                // this.$once('hook:beforeDestroy', () => {
                //     clearTimeout(timer)
                //     timer = null
                // })
            })

            // 完成拖动或者完成大小调整时触发
            wavesurfer.on('region-update-end', (region:any) => {
                region.playLoop() // 循环播放选中区域
                methods.createDeleteButton(region)
            })

            wavesurfer.on('ready', () => {
                // 为区域追加一个删除按钮
                const regionList = Object.values(wavesurfer.regions.list)
                for (const region of regionList) {
                    methods.createDeleteButton(region)
                }
            })
            wavesurferCopy = wavesurfer
        }
        
        const onHtml = () => {
            let dom = document.getElementsByClassName('iframe-list')
        }
        nextTick(() => {
            // onHtml()
            init()
        })

        const methods = {
            // 查看
            onView(val:object){
                
            },
            // 获取区域列表
            getRegions() {
                const regionList = Object.values(wavesurferCopy.regions.list)
                console.log(regionList)
            },
            // 重放
            rebroadcast() {
                wavesurferCopy.clearLoop()
                wavesurferCopy.play(0)
            },
            // 停止
            handleStop() {
                wavesurferCopy.clearLoop()
                wavesurferCopy.stop()
            },
            // 设置每个区域的loop为false
            clearLoop() {
                const regionList = Object.values(wavesurferCopy.regions.list)
                // for (const item of regionList) item.loop = false
            },
            // 格式化时间
            formatTime(seconds:any) {
                seconds = Number(seconds)
                const minutes = Math.floor(seconds / 60)
                seconds = seconds % 60
                let secondsStr:any = Math.round(seconds).toString()
                secondsStr = seconds.toFixed(2)
                if (minutes > 0) {
                    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + secondsStr : secondsStr}`
                }
                return `00:${seconds < 10 ? '0' + secondsStr : secondsStr}`
            },
                // 给区域创建删除按钮
            createDeleteButton(region:any) {
                if (!region.hasDeleteButton) {
                    const deleteButton = region.element.appendChild(document.createElement('button'))
                    deleteButton.innerText = '删除'
                    deleteButton.addEventListener('click', (e:any) => {
                    e.stopPropagation()
                    // this.$confirm('确认删除此区域嘛?', '提示', {
                    //     confirmButtonText: '确定',
                    //     cancelButtonText: '取消',
                    //     type: 'warning'
                    // }).then(() => { region.remove() }).catch(() => { })
                    })
                    const css = { float: 'right', position: 'relative', cursor: 'pointer', color: 'red' }
                    region.style(deleteButton, css)
                    region.hasDeleteButton = true
                }
            },
            // 播放 停止
            onPlayPause(){
                wavesurferCopy.playPause()
            },
            onSkip(num:number){
                wavesurferCopy.skip(num)
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
    .floor{
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

</style>
    
