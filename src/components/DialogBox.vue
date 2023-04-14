<template>
    <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
    >
       <div class="content">
            <el-form :model="form" label-width="120px">
                <el-form-item label="Activity name">
                    <el-input v-model="form.name" />
                </el-form-item>
            </el-form>
       </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="closeDialog">
                确定
                </el-button>
            </span>
        </template>
  </el-dialog>
</template>
  
  <script lang="ts" setup>
    import { ref, reactive, defineProps, defineEmits } from "vue";

    const dialogVisible = ref(false)
    // const form = reactive({
    //     name: '',
    // }) 
   let props = defineProps({
        form:{
            type: Object,
            default:{name: ''}
        },
        // dialogVisibleChange: {
        //     type: Boolean,
        //     default: false,
            
        // },
    })
    

    let emit = defineEmits(['closeDialog', 'affirmDialog'])
    const handleClose = () => {
        // dialogVisible.value = false
        emit('closeDialog', {title: '我关闭了', dialogValue: dialogVisible})
        
    }
    const closeDialog = () =>{
        emit('affirmDialog', {title: '我确定编辑了', dialogValue: dialogVisible, name: props.form.name})
    }
  </script>
  
  <style lang="scss" scoped>
    
  </style>
  