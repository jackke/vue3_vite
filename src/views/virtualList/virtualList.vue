<!--
 * @Author: zk
 * @AuthorEnd: your name
 * @Date: 2022-10-21 13:37:01
 * @LastEditTime: 2023-03-27 15:03:30
 * @FilePath: /vue3_vite/src/views/chatPage/chat.vue
 * @Description: 
-->
<template>
    <div class="content" style="background-color: #fff;display: flex;">
      <!-- ----- 虚拟列表1 start -->
        <div  style="width: 300px; border: 1px solid #ccc;">
            <div style="height: 60px;line-height: 60px;box-shadow: 0 10px 15px -5px #EEE;">虚拟列表1</div>
            <div style="height:600px;">
                <div ref="list" class="infinite-list-container" @scroll="scrollEvent($event)">
                  <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
                      <div class="infinite-list" :style="{ transform: getTransform }">
                      <div ref="items"
                      class="infinite-list-item"
                      v-for="item in visibleData"
                      :key="item.id"
                      :style="{ height: itemSize + 'px'}"
                      >
                      <div style="display:flex; box-sizing: border-box;">
                         <div><img src="../../image/html.jpg" alt="" style="width: 60px; height: 60px;"></div>
                         <div style="flex:1">
                            <div style="word-wrap: break-word;width:100%">{{  item.name}}</div>
                            <div style="word-wrap: break-word;width: 100%;">{{  item.api }}</div>
                         </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
         <!-- ----- 虚拟列表1 end -->

        <!-- ----- 虚拟列表2 start -->
        <div style="width: 300px; border: 1px solid #ccc;margin-left: 20px;">
          <div style="height: 60px;line-height: 60px;box-shadow: 0 10px 15px -5px #EEE;">虚拟列表2(virtual-list)</div>
            <!-- <virtual-list
            :data-key="'key'"
            :data-sources="listData"
            /> -->
            <RecycleScroller
              class="scroller"
              :items="listData"
              :item-size="100"
              :emitUpdate="true"
              v-if="listData.length"
            >
              <template v-slot="{item}">
                <div style="display:flex; box-sizing: border-box;padding: 10px;" :key="item.id">
                    <div><img src="../../image/html.jpg" alt="" style="width: 60px; height: 60px;"></div>
                    <div style="flex:1">
                      <div style="word-wrap: break-word;width:100%">{{  item.name}}</div>
                      <div style="word-wrap: break-word;width: 100%;">{{  item.api }}</div>
                    </div>
                </div>
              </template>
            </RecycleScroller>
        </div>
    </div>
</template>
<script >
import mock from '../../utils/tbbox.json'
import VirtualList from 'vue-virtual-scroller'
import itemComponent from "../../components/itemComponent.vue"
export default {
  name:'VirtualList',
  components:{
    VirtualList,
  },
  // props: {
  //   //每项高度
  //   itemSize: {
  //     type: Number,
  //     default:100
  //   }
  // },
  computed:{
    // 虚拟列表1 start
    //列表总高度
    listHeight(){
      return this.listData.length * this.itemSize;
    },
    //可显示的列表项数
    visibleCount(){
      return Math.ceil(this.screenHeight / this.itemSize)
    },
    //偏移量对应的style
    getTransform(){
      return `translate3d(0,${this.startOffset}px,0)`;
    },
    //获取真实显示列表数据
    visibleData(){
      return this.listData.slice(this.start, Math.min(this.end,this.listData.length));
    }
    // 虚拟列表1 end

  },
  data() {
    return {
      // ----- 虚拟列表1 start
      //可视区域高度
      screenHeight:0,
      //偏移量
      startOffset:0,
      //起始索引
      start:0,
      //结束索引
      end:null,
      // ----- 虚拟列表1 end
      // ----- 虚拟列表2 start
      listData: [],
      itemSize: 100,
      itemComponent
      // ----- 虚拟列表2 end
    };
  },
  mounted() {
    // let list = []
    // for (let i = 0; i < 100; i++) {
    //     list.push({value: i, id: i})
    // }
    this.listData = mock.sites.map((item, i) => {
      item.id = i+1
      return item
    })
     // ----- 虚拟列表1 start
    this.screenHeight = this.$el.clientHeight;
    this.start = 0;
    this.end = this.start + this.visibleCount;
     // ----- 虚拟列表1 end
  },
  methods: {
     // ----- 虚拟列表1 start
    scrollEvent() {
      //当前滚动位置
      let scrollTop = this.$refs.list.scrollTop;
      //此时的开始索引
      this.start = Math.floor(scrollTop / this.itemSize);
      //此时的结束索引
      this.end = this.start + this.visibleCount;
      //此时的偏移量
      this.startOffset = scrollTop - (scrollTop % this.itemSize);
    }
     // ----- 虚拟列表1 end
  }
};

</script>
<style lang="scss">
 // ----- 虚拟列表1 start
    .infinite-list-container {
    height: 100%;
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
    }

    .infinite-list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
    }

    .infinite-list {
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    text-align: center;
    }

    .infinite-list-item {
    padding: 10px;
    color: #555;
    box-sizing: border-box;
    border-bottom: 1px solid #999;
    }
 // ----- 虚拟列表1 end
.scroller {
  height: 600px;
  // background-color: rgba(0, 0, 0, 0.1);
}

.user {
  height: 50px;
  padding: 0 12px;
  display: flex;
  align-items: center;
}


</style>
    
