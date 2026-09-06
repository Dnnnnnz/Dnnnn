import request from '@/utils/request'

//注册接口
export function register(data){
  return request.post('/user/add', data)
}
//ai咨询新会话接口
export function startSession(data){
  return request.post('/psychological-chat/session/start', data)
}
//获取会话列表
export function getSessionList(params){
  return request.get('/psychological-chat/sessions', { params })
}
//删除会话
export function deleteSession(sessionId){
  return request.delete(`/psychological-chat/sessions/${sessionId}`)
}
