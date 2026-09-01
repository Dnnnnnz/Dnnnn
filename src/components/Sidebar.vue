<template>
    <el-aside :width="isCollapsed ? '64px' : '264px'">
        <el-menu
        :collapse="isCollapsed"
        :collapse-transition="false"
        default-active="2"
        class="menu-style"
      >
        <div class= "brand">
            <el-image style="width: 50px; height: 50px; margin-right: 10px;" :src="iconurl" alt="logo"/>
            <div v-show="!isCollapsed" class="info-card">
                <h1 class="brand-title">心理健康AI助手</h1>
                <p class="brand-subtitle">管理后台</p>
            </div>
        </div>
        <el-menu-item @click="selectMenu(item)" v-for="item in router.options.routes[0].children" :key= "item.path" :index="item.path">
                <el-icon><component :is="item.meta.icon" /></el-icon>
                <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'

const router = useRouter()

const iconurl = new URL('@/assets/images/机器人.png', import.meta.url).href

const isCollapsed = computed(() => useAdminStore().isCollapsed)


const selectMenu = (item) => {
    const currentRoute = router.options.routes[0]
    router.push(`${currentRoute.path}/${item.path}`)
}
</script>
<style lang="scss" scoped>
.menu-style {
    height: 100%;
    .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #fff;
    border-bottom: 1px solid #e5e7ed;
    .info-card {
        .brand-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
            color: #1f2037;
        }
    }
    .brand-subtitle {
        font-size: 14px;
        font-weight: normal;
        color: #909399;
    }
}
}

</style>