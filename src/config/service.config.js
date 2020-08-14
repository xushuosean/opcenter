import axios from 'axios'
import qs from 'qs'
import { AjaxReturnType } from '../enum/service-enum'
export const appContext = `/${window.location.pathname.split('/')[1]}`
export const apiContext = `${appContext}/`
console.log(apiContext)
const service = axios.create({
  baseURL: apiContext,
  timeout: 5000
})
service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=utf-8'
  config.method === 'post'
    ? config.data = qs.parse({ ...config.data })
    : config.params = { ...config.params }
  return config
}, error => { // 请求错误处理
  Promise.reject(error)
}
)
service.interceptors.response.use(
  response => {
    // 根据不同的状态码作相应的处理
    if (response.data.resultCode === AjaxReturnType.SUCCESS) {
      return response.data
    } else {
      return response.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)
export default service
