import { createRouter, createWebHistory } from 'vue-router'
import BackendLayout from '@/components/BackendLayout.vue'



//路由配置
const backendRoutes = [
  {
    path: '/back',
    component: BackendLayout,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard.vue'),
        mata: {
          titel: '数据分析',
          icon: 'PieChart'
        }
      },
      {
        path: 'knowledge',
        component: () => import('@/views/knowledge.vue'),
        mata: {
          titel: '知识文章',
          icon: 'ChatLineSquare'
        }
      },
      {
        path: 'consultations',
        component: () => import('@/views/consultations.vue'),
        mata: {
          titel: '咨询记录',
          icon: 'Message'
        }
      },
      {
        path: 'emotional',
        component: () => import('@/views/emotional.vue'),
        mata: {
          titel: '情绪日志',
          icon: 'User'
        }
      }
      
    ]
  }
]

 // 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: backendRoutes
})

// 导出路由实例
export default router
