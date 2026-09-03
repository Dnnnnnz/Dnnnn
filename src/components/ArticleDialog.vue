<template>
    <el-dialog
        :title="isEdit ? '编辑文章' : '添加文章'"
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
          <el-option v-for="item in props.categories" :key="item.value" :label="item.label" :value="item.value" />
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
            <el-button size="small" type="danger" @click="handleRemove">移除封面</el-button>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="文章内容" prop="content">
        <RichTextEditor 
            v-model="formData.content"
            placeholder="请输入文章内容,支持富文本格式"
            :maxCharCount="5000"
            @change="handleContentChange"
            @created="handleEditorCreate"
            minHeight="400px"
         /> 
      </el-form-item>
    </el-form>
    <div v-if="btnPreview">
        <h3>内容预览</h3>
        <div v-html="formData.content"></div>
    </div>
    <template #footer>
        <el-button  @click="btnPreview = !btnPreview">{{ btnPreview ? '隐藏预览' : '预览效果' }}</el-button>
        <el-button  @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="loading">{{ isEdit ? '更新文章' : '创建文章' }}</el-button>
    </template>

    </el-dialog>

</template>
<script setup>
import { ref ,reactive,computed,nextTick ,watch} from 'vue'
import { ElMessage } from 'element-plus'
import { uploadFile , createArticle , updateArticle } from '@/api/admin'
import { fileBaseURL } from '@/config/index'
import RichTextEditor from '@/components/RichTextEditor.vue'


const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    categories: {
        type: Array,
        default: () => []
    },
    article: {
        type: Object,
        default: null
    }
})

const dialogVisible = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emit('update:modelValue', val)
    }
})

const isEdit = computed(() => !!props.article?.id
)
//监听编辑数据
watch(() => props.article, (newVal) => {
    if(newVal) {
        nextTick(() => {
            //赋值表单数据
            Object.assign(formData, newVal)
            //标签字符串转数组
            formData.tagArray = newVal.tags ? newVal.tags.split(',') : []
            //使用现有文章ID
            businessId.value = newVal.id
            //封面url赋值
            imageUrl.value = newVal.coverImage ? fileBaseURL + newVal.coverImage : ''
        })
        
        
    }
})

const handleClose = () => {
    //重置表单
    formRef.value.resetFields()
    //重置文章ID
    businessId.value = null
    //重置标签
    formData.tagArray = []
    //重置封面图片和数据
    handleRemove()
    emit('update:modelValue', false)

}
const emit = defineEmits(['update:modelValue','success'])
const formData = reactive({
    "title": "",
    "content": "",
    "coverImage": "",
    "categoryId": null,
    "summary": "",
    "tags": "",
    "tagArray": [],
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
    content: [
        { required: true, message: '请输入文章内容', trigger: 'blur' },
        { max: 5000, message: '文章内容最多5000个字符', trigger: 'blur' }
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
//文章ID
const businessId = ref(null)
//上传封面图片
const handleUploadRequest = async ({file}) => {
    //UUID生成
    businessId.value = crypto.randomUUID()

    const fileRes = await uploadFile(file, { 
        businessId : businessId.value
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
//文章内容改变时触发
const handleContentChange = (data) => {
    console.log(data,'富文本内容')
    formData.content = data.html
}
//文章内容创建时触发
const editorInstance = ref(null)
const handleEditorCreate = (editor) => {
    editorInstance.value = editor
    //编辑
    if(formData.content && editor){
        //等待dom更新完成
        nextTick(() => {
            editor.setHtml(formData.content)
        })
    }
}
//内容预览
const formRef = ref()
const btnPreview = ref(false)

//提交文章
const loading = ref(false)
//提交文章
const handleSubmit = () => {
    formRef.value.validate(async (valid) => {
        if (!valid) return
        loading.value = true
        const submitData = {
            ...formData,
            tags: formData.tagArray.join(',')
        }
        delete submitData.tagArray

        try {
            if (!isEdit.value) {
                // 新增
                await createArticle(submitData)
            } else {
                // 编辑
                await updateArticle(formData.id, submitData)
            }
            emit('success')
            emit('update:modelValue', false)
        } catch (e) {
            // request.js 已统一弹窗提示，这里只需兜底关 loading
        } finally {
            loading.value = false
        }
    })
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
    
};
.cover-image {
    width: 200px;
    height: 120px;
    display: block
}




</style>    
