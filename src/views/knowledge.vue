
<template>
  <div>
    <PageHead title="知识文章">
      <template #buttons>
        <el-button type="primary" @click="handleEdit({})">新增</el-button>
      </template>
    </PageHead>
    <TeableSearch :formItem="formItem" @search="handleSearch"/>
    <el-table :data = "tableData" style="width: 100%; margin-top: 25px">
      <el-table-column width="400" label="文章标题" fixed="left" >
        <template #default="scope">
          <div style="display: flex; align-items: center;">
            <el-icon>
              <Timer />
            </el-icon>
            <span>{{scope.row.title}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column  label="分类" width="200" >
        <template #default="scope">
          <div style="display: flex; align-items: center;">
            <el-icon>
              <Timer />
            </el-icon>
            <span>{{ categoryMap[scope.row.categoryId]}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="authorName" label="作者" width="150"/>
      <el-table-column prop="readCount" label="阅读量" width="150"/>
      <el-table-column prop="updatedAt" label="发布时间" width="150"/>
      <el-table-column  label="操作" width="240" fixed="right">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)" text type="primary">编辑</el-button>
          <el-button @click="handlePublish(scope.row)" v-if="scope.row.status === 0 || scope.row.status === 2" text type="success">发布</el-button>
          <el-button @click="handleUnpublish(scope.row)" v-if="scope.row.status === 1" text type="warning">下线</el-button>
          <el-button @click="handleDelete(scope.row)"  text type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 25px"
      layout="prev, pager, next"
      :total="pagination.total"
      :page-size="pagination.size"
      @change="handleChange"
    />
    <ArticleDialog v-model:modelValue="dialogVisible" :article="currentArticle" :categories="categories" @success="handleSuccess" />
  </div>
</template>
<script setup>
import { ref, onMounted,reactive } from 'vue'
import PageHead from '@/components/PageHead.vue'
import TeableSearch from '@/components/TeableSearch.vue'
import { categoryTree, articlePage, getArticleDetail, changeArticleStatus, deleteArticle } from '@/api/admin'
import { Timer } from '@element-plus/icons-vue'
import ArticleDialog from '@/components/ArticleDialog.vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const formItem = [
  {comp: 'input' , prop: 'title' , label: '文章标题', placeholder: '请输入文章标题'},
  {comp: 'select' , prop: 'categoryId' , label: '分类', placeholder: '请选择分类',},
  {comp: 'select' , prop: 'status' , label: '状态', placeholder: '请选择状态', options: [
    {label: '草稿', value: 0},
    {label: '已发布', value: 1},
    {label: '已下线', value: 2}
  ]}
]
// 分页查询参数
const handleChange = (page) => {
  pagination.currentPage = page
  handleSearch({})
}

//分页查询参数
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0,
})
// 处理搜索事件
const handleSearch = async(formData) => {
  console.log('查询参数', formData)

  const params = {
    ...pagination,
    ...formData
  }
  const {records,total} = await articlePage(params)
  console.log(records)
    tableData.value = records
    pagination.total = total
  
}
// 分类选项
const categoryMap = reactive({})
// 分类列表
const categories = ref([])
//列表数据
const tableData = ref([])
// 文章详情弹窗
const dialogVisible = ref(false)
const currentArticle = ref(null)
//新增和编辑
const handleSuccess = () => {
  //取消弹窗
  dialogVisible.value = false
  //刷新列表
  handleSearch()
}
const handleEdit = async (row) => {
    if(!row.id) {
      //新增
      currentArticle.value = null
      dialogVisible.value = true
    }
    else {
      //编辑
      getArticleDetail(row.id).then(res => {
            currentArticle.value = res
            dialogVisible.value = true
            })
    }
  }
    
    
      

onMounted(async () => {
  const data = await categoryTree()
  categories.value = data.map(item => {
      categoryMap[item.id] = item.categoryName
      return {
          label: item.categoryName,
          value: item.id
      }
  })
  formItem[1].options = categories.value

  handleSearch({})
  


})
// 发布文章
const handlePublish = (row) => {
  ElMessageBox.confirm(`确认发布文章${row.title}吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'info'
  }).then(() => {
    changeArticleStatus(row.id, {status: 1}).then(res => {
      ElMessage.success('发布成功')
      handleSearch()
    })
  }).catch(() => {
    ElMessage.info('发布取消')
  });
  
}

// 下线文章
const handleUnpublish = (row) => {
  ElMessageBox.confirm(`确认下线文章${row.title}吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    changeArticleStatus(row.id, {status: 2}).then(res => {
      ElMessage.success('下线成功')
      handleSearch()
    }).catch(() => {
      ElMessage.error('下线失败')
    })
  })
}
// 删除文章
const handleDelete = (row) => {
  ElMessageBox.confirm(`确认删除文章${row.title}吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'danger'
  }).then(() => {
    deleteArticle(row.id).then(res => {
      ElMessage.success('删除成功')
      handleSearch()
    }).catch(() => {
      ElMessage.error('删除失败')
    })
  })
}



// 编辑文章

</script>
