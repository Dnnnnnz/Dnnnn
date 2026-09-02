<template>
    <el-dialog
        title="文章详情"
        v-model="dialogVisible"
        width="50%"
        @close="handleClose"
    >
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入文章标题" maxlength="200" show-word-limit clearable />
      </el-form-item>

      <el-form-item label="所属分类" prop="categoryId">
        <el-select v-model="formData.categoryId" placeholder="请选择分类">
          <el-option v-for="item in props.categories" :key="item.value" :label="item.categoryName" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="文章摘要" prop="summary">
        <el-input type="textarea" v-model="formData.summary" placeholder="请输入文章摘要（可选）" maxlength="1000" show-word-limit clearable  :rows="4" />
      </el-form-item>

      <el-form-item label="标签" prop="tags">
        <el-select v-model="formData.tagArray" placeholder="请输入或选择文章标签" multiple filterable allow-create style="width: 100%" >
            <el-option v-for="item in commonTags" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item label="封面图片" >
        <div class="cover-upload">
          <el-upload
            class="cover-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :http-request="handleUploadRequest"
            accept="image/*"
          >
                <div v-if="!imageUrl" class="cover-placeholder">
                    <p>点击上传封面图片</p>
                </div>
                <img v-else :src="imageUrl" alt="封面图片" class="cover-image" />
          </el-upload>
          <div v-if="imageUrl" class="cover-image">
            <el-button size="mini" type="danger" @click="handleRemove">移除封面</el-button>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="文章内容" prop="content">
        <el-input v-model="formData.content" placeholder="请输入文章内容" type="textarea" :rows="10" /> 
      </el-form-item>

    </el-form>

    </el-dialog>

</template>
<script setup>
import { ref ,reactive,computed} from 'vue'
import { ElMessage } from 'element-plus'
import { uploadFile } from '@/api/admin'
import { fileBaseURL } from '@/config/index'


const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    categories: {
        type: Array,
        default: () => []
    }
})
const dialogVisible = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emit('update:modelValue', val)
    }
}
    
)

const handleClose = () => {

}
const emit = defineEmits(['update:modelValue'])
const formData = reactive({
    "title": "",
    "content": "",
    "coverImage": "",
    "categoryId": 1,
    "summary": "",
    "tags": "",
    "id": ""
})
const rules = reactive({
    title: [
        { required: true, message: '请输入文章标题', trigger: 'blur' },
        { max: 200, message: '文章标题最多200个字符', trigger: 'blur' }
    ],
    categoryId: [
        { required: true, message: '请选择分类', trigger: 'change' }
    ],
})

const commonTags = [
  '情绪管理', '焦虑', '抑郁', '压力', '睡眠', 
  '冥想', '正念', '放松', '心理健康', '自我成长',
  '人际关系', '工作压力', '学习方法', '生活技巧'
]
//上传封面图片
const imageUrl = ref('')

//上传封面图片前校验
const beforeUpload = (file) => {

    console.log(file)

    const isImage = file.type.startsWith('image/')
    const isLt5M = file.size / 1024 / 1024 < 5

    if (!isImage) {
        ElMessage.error('请上传图片文件,请选择图片文件')
        return false
    }
    
    if (!isLt5M) {
        ElMessage.error('图片大小不能超过5MB')
        return false
    }
    return true
}
//上传封面图片
const handleUploadRequest = async ({file}) => {
    //UUID生成
    const businessId = crypto.randomUUID()

    const fileRes = await uploadFile(file, { 
        businessId : businessId
     })
     console.log(fileRes)
     //拼接图片路径
     imageUrl.value = fileBaseURL + fileRes.filePath
     formData.coverImage = imageUrl.value
}

//移除封面图片
const handleRemove = () => {
    imageUrl.value = ''
    formData.coverImage = ''
}

</script>
<style lang="scss" scoped>
.cover-placeholder {
    width: 200px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #999;
    background-color: #f5f5f5;
    ;
}
.cover-image {
    width: 200px;
    height: 120px;
    display: block
}




</style>    
