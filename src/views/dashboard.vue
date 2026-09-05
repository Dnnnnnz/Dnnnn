
<template>
    <div>
      <h1>控制台</h1>
    </div>
</template>
<script setup>
import { getAnalyticOverview } from '@/api/admin'
import { onMounted ,ref } from 'vue'

const overview = ref({})



onMounted(() => {
  getAnalyticOverview().then(res => {
    console.log(res)
    overview.value = res.data
  })
})
</script>