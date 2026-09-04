
<template>
  <div>
    <PageHead title="情绪日志" />
    <TableSearch :formItem="formItems" @search="handleSearch" />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="用户ID" width="80" />
      <el-table-column label="会话ID" width="100" >
        <template #default="scope">
          <el-avatar >{{scope.row.nickname}}</el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="diaryDate" label="记录日期" width="120" />
      <el-table-column  label="情绪评分" >
        <template #default="scope">
          <el-rate :model-value="scope.row.moodScore" :max="10" disabled />
        </template>
      </el-table-column>
      <el-table-column label="生活指标" width="120" >
        <template #default="scope">
          <div>
            <p>睡眠质量：{{scope.row.sleepQuality}} /5</p>
            <p>压力：{{scope.row.stressLevel}} /5</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="emotionTriggers" label="情绪触发因素" width="120" />
      <el-table-column prop="diaryContent" label="日记内容" width="250" />
       <el-table-column  label="操作" width="240" fixed="right">
        <template #default="scope">
          <el-button text type="primary">详情</el-button>
          <el-button text type="danger">删除</el-button>
        </template>
      </el-table-column>
      
    </el-table>

     </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TeableSearch.vue'
import { getEmotionalPage } from '@/api/admin'



const formItems = [
  {
    comp: 'input',
    label: '用户ID',
    prop: 'userId',
    placeholder: '请输入用户ID'
  },
  {
    comp:'select',
    prop:'moodScreRange',
    label:'情绪评分',
    placeholder:'请选择评分范围',
    options:[
      {
        label:'低分（1-3）',
        value:'0-3'
      },
      {
        label:'中分（4-6）',
        value:'4-6'
      },
      {
        label:'高分（7-10）',
        value:'7-10'
      }
    ]
    
   }
]

const handleSearch = async (formData) => {
    const params = {
    ...pagination,
    ...formData
  }
  try {
    const {records,total} = await getEmotionalPage(params)
    tableData.value = records
    pagination.total = total
  } catch (e) {
    // 请求失败（如 403/500）时拦截器已统一提示，这里兜底避免未捕获异常
  }
}

onMounted(() => {
  handleSearch()
})

// 列表
const tableData = ref([

])
//分页查询参数
const pagination = reactive({
  current: 1,
  size: 10,
  total: 0,
})
</script>

