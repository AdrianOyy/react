import axios from "axios"
import {getToken, signOut} from "./auth";
import CommonTip from "../components/CommonTip";

const http = axios.create({
  timeout: 1000 * 60,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

http.interceptors.request.use(
  config => {
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  res => {
    const newToken = res?.data?.newToken
    if (newToken) {
      window.localStorage.setItem('token', newToken)
    }
    return res
  },
  error => {
    handleError(error)
    return Promise.reject(error.response)
  }
)

export default http

function handleError(error) {
  if (!error.response) {
    showTip('System Busy')
    return
  }
  const { status, message, data } = error.response
  switch (status) {
    case 400:
      showTip(message ? message : (data && data.message ? data.message : 'Bad Request'))
      break
    case 401:
      showTip('Unauthorized')
      signOut(true)
      break
    case 500:
      if (!getToken()) {
        showTip('Unauthorized')
        signOut(true)
      } else {
        showTip('System Busy')
      }
      break
    default:
      showTip('System Busy')
  }
}

function showTip(message, autoHideDuration) {
  CommonTip.error(message, autoHideDuration)
}
