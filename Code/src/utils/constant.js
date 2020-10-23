const API_HOST = process.env.REACT_APP_BASE_API

const ACTIVITI_HOST = process.env.REACT_APP_ENV === 'production' ? process.env.REACT_APP_BASE_API : 'http://127.0.0.1:8888'
export { API_HOST, ACTIVITI_HOST }
