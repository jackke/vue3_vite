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
        <el-form :inline="true" :model="formInline">
            <el-form-item label="名称：">
                <el-input v-model="formInline.name" placeholder="名称" />
            </el-form-item>
            <!-- <el-form-item label="Activity zone">
                <el-select v-model="formInline.region" placeholder="Activity zone">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-divider />
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column prop="key" label="KEY" width="180" />
            <el-table-column prop="name" label="名称" width="180" />
            <el-table-column prop="api" label="API" />
            <el-table-column :align="'right'" #default="scope">
                <el-button @click="onView">查看</el-button>
                <el-button @click="onEdit($event, scope)">编辑</el-button>
                <el-button :disabled="scope.row.searchable == 0" @click="onDelete($event,scope)">删除</el-button>
            </el-table-column>
        </el-table>
        <div style="margin-top:10px">
            <el-config-provider :locale="customPagination">
                <el-pagination background layout="sizes, prev, pager, next, total, ->, slot"
                :hide-on-single-page="true"
                :page-sizes="[10,20,30,40,50,60,70,80,90,100]"
                v-model:current-page="pageNo" 
                v-model:page-size="pageSize" 
                @current-change="pageNoChange"
                @size-change="pageSizeChange"
                :total="total" />
            </el-config-provider>
        </div>
        <!-- <Transition> -->
            <!-- <p v-if="show">HelloWord</p> -->
            <dialogBox :form="dialogForm" @close-dialog="closeDialog" @affirm-dialog="affirmDialog"></dialogBox>
        <!-- </Transition> -->
    </div>
</template>
<script lang="ts">
import { ElMessageBox, ElSwitch } from 'element-plus'
import {defineComponent, reactive, ref, toRefs, h, getCurrentInstance} from 'vue'
import mock from '../../utils/tbbox.json'
import DialogBox from '@/components/DialogBox.vue'
export default defineComponent({
    name: 'chat',
    // props:{
    //     menuList: {
    //       type: Array,
    //       default: []
    //     }
    // },
    components: {
        DialogBox
    },
    computed: {
      
    },
    setup() {
        let tabelIndex = 0
        const _this = getCurrentInstance() // 必须放在setup里面
        const state = reactive({
            formInline: {
                name: '',
            },
            show: false,
            pageNo:1,
            pageSize:10,
            list:[],
            title: 'name',
            tableData: [{}], //[{}]
            dataCopy: [{}],
            total: mock.sites.length || 0,
            dialogVisible: false,
            dialogForm:{
                name: ''
            }
        })
        const dataFn = (val:number = 0, size:number = 10) => {
            var arrData:(object)[] = []
            mock.sites.forEach(item => {
                if (!state.formInline.name.trim()){
                    arrData.push(item)
                } else if (item.name.indexOf(state.formInline.name) !== -1){
                    arrData.push(item)
                }
            })
            state.dataCopy = [...arrData]
            state.total = state.dataCopy.length
            state.tableData = state.dataCopy.splice(val, size)
            state.dataCopy = [...arrData]

        }
        dataFn()

        const methods ={
                onSubmit: () => {
                    dataFn((state.pageNo - 1) * state.pageSize, state.pageSize)
                },
                pageNoChange: (val:number) => {
                    dataFn((val - 1) * state.pageSize, state.pageSize)
                },
                pageSizeChange: (val:number) => {
                    dataFn((state.pageNo - 1) * state.pageSize, val)
                },
                onDelete(event:object, row:any){
                    ElMessageBox({
                            title: 'Message',
                            showCancelButton: true,
                            cancelButtonText: '取消',
                            confirmButtonText: '确定',
                            message: h('p', null, [
                            h('span', null, '您确定是否删除吗?'),
                            // h('i', { style: 'color: teal' }, 'VNode'),
                        ]),
                    }).then(() => {
                        console.log(event, row);
                        row.row.searchable = 0
                    })
                    // state.tableData[row.$index].searchable = 0
                },
                // 查看
                onView(){
                    _this?.proxy?.$message({type: 'success', message: '去查看'})
                    console.log('查看', _this);
                    state.show = !state.show

                },
                onEdit($event: object, scope: any){
                    console.log('编辑', scope);
                    state.dialogVisible = true
                    state.dialogForm.name = scope.row.name
                    tabelIndex = scope.$index
                },
                closeDialog(){
                    let event = arguments[0]
                    if (event.dialogValue){
                        state.dialogVisible = false
                    }
                    
                },
                affirmDialog(){
                    let event = arguments[0]
                    if (event.dialogValue){
                        state.dialogVisible = false
                        // state.tableData[tabelIndex].name = event.name
                    }
                    console.log(event);
                    
                }
            }
    
   
        return {
            customPagination: {
                name: '',
                el: {
                    pagination: {
                        pagesize: '条/页',
                        total: '共 {total} 条',
                        goto: '前往',
                        pageClassifier: '页'
                    }
                }
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
    
