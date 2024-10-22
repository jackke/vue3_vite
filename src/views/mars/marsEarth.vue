<!--
 * @Author: zk
 * @AuthorEnd: your name
 * @Date: 2022-10-11 10:07:27
 * @LastEditTime: 2023-02-09 14:38:06
 * @FilePath: /vue3_vite/src/views/Home.vue
 * @Description: 
-->

<template>
    <div class="mars-box">
        
    </div>
</template>

<script>
    import {defineComponent, reactive, ref, toRefs, nextTick} from 'vue'
    // import * as mars3d from "mars3d"
    // import { Cesium } from "mars3d"

    export default defineComponent({
        name: 'marsEarth',
        setup() {
            const waveformRef = ref()
            const state = reactive({
                show: false,
            })
            
            function initMap (){
              
            }

            nextTick(() => {
                // onHtml()
            })

            const methods = {
                // 查看
                onView(val){
                    
                },
                // 设置每个区域的loop为false
                clearLoop() {
                   
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
        
        // }
    })
</script>


<style lang="scss" scoped>
.home-box{
    width: 100%;
    height: 100%;

}

</style>
