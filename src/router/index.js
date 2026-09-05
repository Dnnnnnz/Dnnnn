import { createRouter, createWebHistory } from 'vue-router'
import BackendLayout from '@/components/BackendLayout.vue'
import AuthLayout from '@/components/AuthLayout.vue'
import FrontendLayout from '@/components/FrontendLayout.vue'


//路由配置
const backendRoutes = [
  {
    path: '/back',
    redirect: '/back/dashboard',
    component: BackendLayout,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard.vue'),
        meta: {
          title: '数据分析',
          icon: 'PieChart'
        }
      },
      {
        path: 'knowledge',
        component: () => import('@/views/knowledge.vue'),
        meta: {
          title: '知识文章',
          icon: 'ChatLineSquare'
        }
      },
      {
        path: 'consultations',
        component: () => import('@/views/consultations.vue'),
        meta: {
          title: '咨询记录',
          icon: 'Message'
        }
      },
      {
        path: 'emotional',
        component: () => import('@/views/emotional.vue'),
        meta: {
          title: '情绪日志',
          icon: 'User'
        }
      }
      
    ]
  },
  {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          path: 'login',
          component: () => import('@/views/login.vue'),
          meta: {
            title: '登录',
          }
        },
        {
          path: 'register',
          component: () => import('@/views/register.vue'),
          meta: {
            title: '注册',
        }
      }
      ]
      
  }
  
]
//前台路由配置
const frontendRoutes = [
  {
    path: '/',
    component: FrontendLayout,
    children: [
      { 
       path: '/',
       component: () => import('@/views/home.vue'),
      },
      {
        path: '/consultation',
        component: () => import('@/views/consultation.vue'),
      },
      {
        path: '/emotion-diary',
        component: () => import('@/views/emotionDiary.vue'),
      },
      {
        path: '/knowledge',
        component: () => import('@/views/frontendknowledge.vue'),
      }
      
    ]
  }
  
]


 // 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes:[...backendRoutes, ...frontendRoutes]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // 当前用户是否登录
  if (token) {
    // 解析 userInfo，失败时回退空对象，避免 JSON.parse 抛异常
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    // 管理员可以访问后台路由，访问其他路由则跳转到后台首页
    if (userInfo.userType === 'ADMIN' || userInfo.userType === 2) {
      if (to.path.startsWith('/back')) {
        next()
      } else {
        next('/back/dashboard')
      }
    } else {
      // 非管理员（普通用户）：访问后台路由跳转登录页，其他路由放行
      if (to.path.startsWith('/back')) {
        next('/auth/login')
      } else {
        next()
      }
    }
  } else {
    if (to.path.startsWith('/back')) {
      // 未登录访问后台路由，重定向到登录页
      next('/auth/login')
    } else {
      // 登录/注册等公开路由放行
      next()
    }
  }
})

// 导出路由实例
export default router
