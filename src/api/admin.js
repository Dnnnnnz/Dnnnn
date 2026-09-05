import request from '@/utils/request'

// 用户登录
export function login(data){
  return request.post('/user/login', data)
}
// 获取分类树
export function categoryTree(){
  return request.get('/knowledge/category/tree')
}

// 分页获取知识文章
export function articlePage(params){
  return request.get('/knowledge/article/page', { params })
}
// 上传知识文章封面图片
export function uploadFile(file, businessInfo){
  const formData = new FormData()
  formData.append('file', file)
  formData.append('businessType', 'ARTICLE' )
  formData.append('businessId', businessInfo.businessId )
  formData.append('businessField', 'cover')

  return request.post('/file/upload', formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}
// 创建知识文章
export function createArticle(data){
    return request.post('/knowledge/article', data)
}

//获取知识文章详情
export function getArticleDetail(id){
  return request.get(`/knowledge/article/${id}`)
}
// 更新知识文章
export function updateArticle(id,data){
    return request.put(`/knowledge/article/${id}`, data)
}
//更新文章状态
export function changeArticleStatus(id,data){
    return request.put(`/knowledge/article/${id}/status`, data)
}
// 删除知识文章
export function deleteArticle(id){
    return request.delete(`/knowledge/article/${id}`)
}
// 分页获取咨询会话
export function getConsultationPage(params){
  return request.get('/psychological-chat/sessions', { params })
}
// 获取咨询会话详情
export function getConsultationDetail(sessionId){
  return request.get(`/psychological-chat/sessions/${sessionId}/messages`)
}
// 分页获取情绪日志
export function getEmotionalPage(params){
  return request.get('/emotion-diary/admin/page', { params })
}
// 删除情绪日志
export function deleteEmotional(id){
  return request.delete(`/emotion-diary/admin/${id}`)
}
//获取综合数据分析
export function getAnalyticOverview(){
  return request.get('/data-analytics/overview')
}
