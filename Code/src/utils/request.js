import axios from 'axios'
//import store from '@/store'
// import { getToken } from 'utils/auth'
import CommonTip from '../components/CommonTip'

//这个baseUrl要根据实际情况进行改变
axios.defaults.baseURL = process.env.REACT_APP_BASE_API
axios.defaults.headers.common['Content-Type'] =
  'application/json, charset=UTF-8'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

//请求拦截器 用于添加token
axios.interceptors.request.use(
  config => {
    //if (store.getters.token) {
    //  config.headers['authorization'] = 'bearer ' + getToken()
    //}

    return config
  },
  error => {
    return Promise.reject(error)
  }
)
const axiosInstance = axios.create({
  timeout: 60000,
  // withCredentials: true,

  headers: {
    'Content-Type': 'application/json',
  },
  // transformRequest: [function (data) {
  //   function dateFormat(date, fmt) {
  //     if (null === date || undefined === date) return '';
  //     var o = {
  //       "M+": date.getMonth() + 1, //月份
  //       "d+": date.getDate(), //日
  //       "h+": date.getHours(), //小时
  //       "m+": date.getMinutes(), //分
  //       "s+": date.getSeconds(), //秒
  //       "S": date.getMilliseconds() //毫秒
  //     };
  //     if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  //     for (var k in o)
  //       if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  //     return fmt;
  //   }

  //   // Date.prototype.toJSON = function () {
  //   //   return dateFormat(this, 'yyyy-MM-dd')
  //   // }
  //   data = JSON.stringify(data)
  //   return data
  // }]

})

//响应拦截器(处理异常)
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  instance: axiosInstance,
  //默认选项, 留着备用
  defaultOptions: {
    handleError: true //是否自动解析结果并提示
  },
  enableChangeBaseApi: true,
  changeBaseUrl(baseUrl, flag = false) {
    if (flag && baseUrl && this.enableChangeBaseApi) {
      console.log('changeBaseUrl', axiosInstance.defaults.baseURL + '->' + baseUrl)
      axiosInstance.defaults.baseURL = baseUrl
    }
  },
  //get 请求
  get(url, param, options, baseUrl = null) {
    let o = Object.assign(this.defaultOptions, options)
    const defaultUrl = axiosInstance.defaults.baseURL
    this.changeBaseUrl(baseUrl, baseUrl !== null)
    return new Promise((resolve, reject) => {
      axiosInstance({
        method: 'get',
        url,
        params: param
      })
        .then(res => {
          if(res.data && !res.data.status && res.data.message && o.handleError){
            CommonTip.error(`${res.data.message}${res.data.exception ? ':' + res.data.exception.message : ''}`, { })
          }
          resolve(res)
        })
        .catch(error => {
          CommonTip.error(error.message, { })
          reject(error)
        })
        .finally(() => {
          this.changeBaseUrl(defaultUrl, baseUrl !== null)
        })
    })
  },
  //post 请求
  post(url, param, options, baseUrl = null) {
    let o = Object.assign(this.defaultOptions, options)
    const defaultUrl = axiosInstance.defaults.baseURL
    this.changeBaseUrl(baseUrl, baseUrl !== null)

    return new Promise((resolve, reject) => {
      axiosInstance({
        method: 'post',
        url,
        data: param
      })
        .then(res => {
          if(res.data && !res.data.status && res.data.message && o.handleError){
            CommonTip.error(`${res.data.message}${res.data.exception ? ':' + res.data.exception.message : ''}`, { })
          }
          resolve(res)
        })
        .catch(error => {
          CommonTip.error(error.message, { })
          reject(error)
        })
        .finally(() => {
          this.changeBaseUrl(defaultUrl, baseUrl !== null)
        })
    })
  },
  //put 请求
  put(url, param, options, baseUrl = null) {
    let o = Object.assign(this.defaultOptions, options)
    const defaultUrl = axiosInstance.defaults.baseURL
    this.changeBaseUrl(baseUrl, baseUrl !== null)
    return new Promise((resolve, reject) => {
      axiosInstance({
        method: 'put',
        url,
        data: param
      })
        .then(res => {
          if(res.data && !res.data.status && res.data.message && o.handleError){
            CommonTip.error(`${res.data.message}${res.data.exception ? ':' + res.data.exception.message : ''}`, { })
          }
          resolve(res)
        })
        .catch(error => {
          CommonTip.error(error.message, { })
          reject(error)
        })
        .finally(() => {
          this.changeBaseUrl(defaultUrl, baseUrl !== null)
        })
    })
  },
  //delete 请求
  delete(url, param, options, baseUrl = null) {
    let o = Object.assign(this.defaultOptions, options)
    const defaultUrl = axiosInstance.defaults.baseURL
    this.changeBaseUrl(baseUrl, baseUrl !== null)

    return new Promise((resolve, reject) => {
      axiosInstance({
        method: 'delete',
        url,
        data: param
      })
        .then(res => {
          if(res.data && !res.data.status && res.data.message && o.handleError){
            CommonTip.error(`${res.data.message}${res.data.exception ? ':' + res.data.exception.message : ''}`, { })
          }
          resolve(res)
        })
        .catch(error => {
          CommonTip.error(error.message, { })
          reject(error)
        })
        .finally(() => {
          this.changeBaseUrl(defaultUrl, baseUrl !== null)
        })
    })
  },
  //all get请求
  allGet(fnArr) {
    return axios.all(fnArr)
  }
}
