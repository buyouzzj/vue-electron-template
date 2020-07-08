import axios from 'axios'
// 创建axios实例
const service = axios.create({
  responseType: 'json',
  transformResponse: [(data) => data],
  timeout: 30 * 1000 // 请求超时时间
})
service.interceptors.request.use(function (config) {
  if (config.url.indexOf('api/appupload/instant/uploadMiltiFile') === -1) {
    // console.writeLog('Request', config.url, config.params || config.data)
  }
  return config
})
service.interceptors.response.use(function (response) {
  if (response.config.url.indexOf('api/appupload/instant/uploadMiltiFile') === -1) {
    // console.writeLog('Response', response.config.url, response.data)
  }
  return response
}, function (error) {
  // console.writeLog('Response error', error.message)
  return Promise.reject(error)
})
export default service
