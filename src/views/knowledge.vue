
<template>
  <div>
    <PageHead title="知识文章">
      <template #buttons>
        <el-button type="primary">新增</el-button>
        <el-button type="primary">删除</el-button>
      </template>
    </PageHead>
    <TeableSearch :formItem="formItem" @search="handleSearch"/>
  </div>
</template>
<script setup>
import PageHead from '@/components/PageHead.vue'
import TeableSearch from '@/components/TeableSearch.vue'

const formItem = [
  {comp: 'input' , prop: 'title' , label: '文章标题', placeholder: '请输入文章标题'},
  {comp: 'select' , prop: 'categoryId' , label: '分类', placeholder: '请选择分类', options: [{
    label: '心理健康基础',
    value: '1'
  },
  {
    label: '情绪管理',
    value: '2'
  }]}
]

// 处理搜索事件
const handleSearch = (formData) => {
  console.log('查询参数', formData)
}
</script>
