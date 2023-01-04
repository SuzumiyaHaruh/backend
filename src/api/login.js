import instance from './index.js'

// 登录
export function getLogin ({username, password}) {
  return instance.post(`/admin/signin`, {username, password})
}

// 登出
export function getLogout () {
  return instance.post(`/logout`)
}

//检测是否登出
export function checkLogout(){
  return instance.post('/api/user/check')
}
