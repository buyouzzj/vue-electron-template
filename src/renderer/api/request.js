import ajax from './ajax'
// import { baseUrl } from '../config'
const baseUrl = 'https://yapi.weierai.com/mock/21'
// const baseUrl = '//info.weierai.com:8213'

export const getBasicInfo = (params) => ajax({ url: baseUrl + '/api/portrait/baseInfoNew', params, method: 'get' })
export const getProductList = (params) => ajax({ url: baseUrl + '/api/product/list', params, method: 'get' })
export const updateBuyerStatusInfo = (data) => ajax({ url: baseUrl + '/api/portrait/buyerRoleEdit', data, method: 'post' })
// 问答列表
export const queryKnowledgeList = (data) => ajax({ url: baseUrl + '/api/product/knowledgeSpeechcraft', data, method: 'post' })
// 发送答案
export const sendMessageToClient = (data) => ajax({ url: baseUrl + '/api/product/sendMessageToClient', data, method: 'post' })
// 撤销答案
export const recallMessageFromClient = (data) => ajax({ url: baseUrl + '/api/product/recallMessageFromClient', data, method: 'post' })
