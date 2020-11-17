const proUrl = {
  user: null,
  auth: null,
  logging: null,
  group: null,
  workflow: null,
}

const devUrl = {
  user: null,
  auth: null,
  logging: 'http://10.231.131.123:3002',
  group: 'http://127.0.0.1:7001',
  // workflow: 'http://127.0.0.1:8888'
  workflow: 'http://10.231.131.123:3004',
}

// eslint-disable-next-line
export default (process.env.REACT_APP_ENV === 'production' ? proUrl : devUrl)
