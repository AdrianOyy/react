const proUrl = {
  aaa: process.env.REACT_APP_BASE_API,
  logging: process.env.REACT_APP_BASE_API,
  workflow: process.env.REACT_APP_BASE_API,
}

const devUrl = {
  aaa: 'http://127.0.0.1:7001',
  logging: 'http://10.231.131.123:3002',
  workflow: 'http://10.231.131.123:3004',
}

// eslint-disable-next-line
export default (process.env.REACT_APP_ENV === 'production' ? proUrl : devUrl)
