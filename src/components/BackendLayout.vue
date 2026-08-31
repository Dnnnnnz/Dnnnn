// 后台布局组件
<template>
  <div class="backend-layout">
    <el-container class="main-container">
      <Sidebar></Sidebar>
      <el-container>
        <Navbar></Navbar>
        <el-main >
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
// 后台布局组件样式
<script setup>
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'
</script>
<style lang="scss" scoped>
.backend-layout {
  height: 100vh;
  .main-container {
    height: 100%;
  }
}
</style>
