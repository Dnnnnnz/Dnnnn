import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const service = axios.create({
  baseURL: '/api', // 请求的前缀
  timeout: 5000, // 请求的超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const { data, config } = response
    // 处理业务状态码：'200' 成功，直接返回业务数据
    if (data.code === '200') {
      return data.data
    }
    // '-1' 表示登录过期：非登录接口则清除登录信息并跳转登录页
    if (data.code === '-1' && !config.url?.includes('/login')) {
      ElMessage.error(data.msg || '登录过期，请重新登录')
      // 清除登录信息并跳转登录页
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      window.location.href = '/auth/login'
      return Promise.reject(new Error(data.msg || '登录过期'))
    }
    // 其他失败情况（登录接口的 '-1'、'500' 系统错误等）：提示后端返回的 msg 并中断
    ElMessage.error(data.msg || '请求失败')
    return Promise.reject(new Error(data.msg || '请求失败'))
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default service