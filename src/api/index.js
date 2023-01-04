import axios from 'axios'
import {getToken} from '../util/cookie.js'
import {notification} from "../util/notification.js";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_PATH}`,
  timeout: 10000
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 获取token
  const token = getToken()
  // 在发送请求之前做些什么
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  console.log(response)
  if (!response.data.success){
    notification('Error',response.data.message,'error',2000)
  }
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
