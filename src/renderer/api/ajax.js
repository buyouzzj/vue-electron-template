import axios from 'axios'
// 创建axios实例
const service = axios.create({
  responseType: 'json',
  transformResponse: [(data) => data],
  timeout: 30 * 1000 // 请求超时时间
})

export default service
