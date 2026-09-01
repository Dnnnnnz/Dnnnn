// 引入 Vue 库
import { createApp } from 'vue'
import './style.css'
// 引入全局样式
import App from './App.vue'
// 引入 Element Plus 组件库
import ElementPlus from 'element-plus'
// 引入 Element Plus 样式
import 'element-plus/dist/index.css'
// 引入路由实例
import router from './router'
// 引入 Element Plus 图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入 Pinia 状态管理库
import { createPinia } from 'pinia'
// 创建 Vue 应用实例
const app = createApp(App)
// 创建 Pinia 实例
const pinia = createPinia()

// 注册 Pinia 状态管理库
app.use(pinia)
// 注册 Element Plus 图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 注册 Element Plus 与路由，挂载到 #app 元素上
app.use(ElementPlus).use(router).mount('#app')
