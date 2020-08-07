import axios from 'axios'
//import store from '../redux/store/index'
 //import { getToken } from 'utils/auth'
// import CommonTip from '../components/CommonTip'
// import { createBrowserHistory } from 'history';



const axiosInstance = axios.create({  
  baseURL: process.env.REACT_APP_BASE_API_WORKFLOW,
  timeout: 60000
})

//请求拦截器 用于添加token
axiosInstance.interceptors.request.use(
   
    config => {
    //  if (store.getters.token) {
                                 
      //localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTY2ODI0NzAsInVzZXJuYW1lIjoiMTIzNDU2In0.WQdF8ZWbd2Z-m5vzvNRfTlu-HFq2tpu1YNs3vTW6liA')
      config.headers['Content-Type'] = 'application/json'
      config.headers['token'] = localStorage.getItem('token')
     // }
      
      console.log(config)
      return config
  
    },
    error => {
      return Promise.reject(error)
    }
  )

//响应拦截器(处理异常)
axiosInstance.interceptors.response.use(
  response => {
    if(response.data.code===400){
      console.log("asdsad")
     // const history = createBrowserHistory();
      window.location.href='/auth/sign-in'

      //history.push('/auth/sign-in')
    }else{
      return response
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosInstance
