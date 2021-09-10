const proUrl = {
  aaa: process.env.REACT_APP_BASE_API,
  logging: process.env.REACT_APP_BASE_API,
  workflow: process.env.REACT_APP_BASE_API,
  resource: process.env.REACT_APP_BASE_API,
}

const devUrl = {
  aaa: 'http://10.240.131.123:3003',
  logging: 'http://10.240.131.123:3002',
  workflow: 'http://10.240.131.123:3004',
  resource: 'http://localhost:8080',
}

// eslint-disable-next-line
export default (process.env.REACT_APP_ENV === 'production' ? proUrl : devUrl)
