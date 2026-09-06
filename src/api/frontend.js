import request from '@/utils/request'

//注册接口
export function register(data){
  return request.post('/user/add', data)
}