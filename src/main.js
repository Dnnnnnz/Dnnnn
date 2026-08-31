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
// 创建 Vue 应用实例并挂载到 #app 元素上
const app = createApp(App)
// 注册 Element Plus 图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 挂载到 #app 元素上
app.use(ElementPlus).use(router).mount('#app')
