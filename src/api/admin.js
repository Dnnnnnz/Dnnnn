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