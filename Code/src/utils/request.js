import axios from 'axios'
// import store from '@/store'
// import { getToken } from 'utils/auth'
import CommonTip from '../components/CommonTip'
import { signOut } from "./auth"

// 这个baseUrl要根据实际情况进行改变
// eslint-disable-next-line
axios.defaults.baseURL = process.env.REACT_APP_BASE_API
axios.defaults.headers.common['Content-Type'] =
  'application/json, charset=UTF-8'
// axios.defaults.headers.Common['Access-Control-Allow-Origin'] = '*'


const axiosInstance = axios.create({
  timeout: 60000,
})

// 请求拦截器 用于添加token
axiosInstance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器(处理异常)
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
  // 默认选项, 留着备用
  // 默认选项, 留着备用
  defaultOptions: {
    handleError: true // 是否自动解析结果并提示
  },
  enableChangeBaseApi: true,
  changeBaseUrl(baseUrl, flag = false) {
    if (flag && baseUrl && this.enableChangeBaseApi) {
      axiosInstance.defaults.baseURL = baseUrl
    }
  },
  // get 请求
  getBuffer(url, param, options, baseUrl = null) {
    let o = Object.assign(this.defaultOptions, options)
    const defaultUrl = axiosInstance.defaults.baseURL
    this.changeBaseUrl(baseUrl, baseUrl !== null)
    return new Promise((resolve, reject) => {
      axiosInstance({
        method: 'get',
        responseType: 'arraybuffer',
        url,
        params: param
      })
        .then(res => {
          if (res.data && !res.data.status && res.data.message && o.handleError) {
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
          if (res.data && !res.data.status && res.data.message && o.handleError) {
            CommonTip.error(`${res.data.message}${res.data.exception ? ':' + res.data.exception.message : ''}`, { })
          }
          resolve(res)
        })
        .catch(error => {
          if (error.response && error.response.status) {
            callback(error)
          } else {
            CommonTip.error(error.message)
          }
          reject(error)
        })
        .finally(() => {
          this.changeBaseUrl(defaultUrl, baseUrl !== null)
        })
    })
  },
  // post 请求
  post(url, param, options, baseUrl = null) {
    let o = Object.assign(this.defaultOptions, options)
    const defaultUrl = axiosInstance.defaults.baseURL
    this.changeBaseUrl(baseUrl, baseUrl !== null)

    return new Promise((resolve, reject) => {
      axiosInstance({
        method: 'post',
        url,
        data: param,
        responseType: o.responseType
      })
        .then(res => {
          if (res.data && !res.data.status && res.data.message && o.handleError) {
            CommonTip.error(`${res.data.message}${res.data.exception ? ':' + res.data.exception.message : ''}`, { })
          }
          resolve(res)
        })
        .catch(error => {
          console.log(error)
          CommonTip.error(error.message, { })
          reject(error)
        })
        .finally(() => {
          this.changeBaseUrl(defaultUrl, baseUrl !== null)
        })
    })
  },
  // put 请求
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
          if (res.data && !res.data.status && res.data.message && o.handleError) {
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
  // delete 请求
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
          if (res.data && !res.data.status && res.data.message && o.handleError) {
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
  // all get请求
  allGet(fnArr) {
    return axios.all(fnArr)
  }
}


function callback(error) {
  const { status, message } = error.response
  switch (status) {
    case 400:
      showTip(message ? message : 'Bad Request')
      break
    case 401:
      showTip('Unauthorized')
      signOut()
      break
    default:
      showTip('System Busy')
  }
}

function showTip(message) {
  CommonTip.error(message)
}
