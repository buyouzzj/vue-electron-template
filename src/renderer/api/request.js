import ajax from './ajax'
// import { baseUrl } from '../config'
const baseUrl = 'https://yapi.weierai.com/mock/21'
// const baseUrl = '//info.weierai.com:8213'

export const getBasicInfo = (params) => ajax({ url: baseUrl + '/api/portrait/baseInfoNew', params, method: 'get' })
