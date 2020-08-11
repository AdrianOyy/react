const proUrl = {
  user: null,
  auth: null,
  group: null,
  workflow: 'http://10.231.131.123:3004',
}

const devUrl = {
  user: null,
  auth: null,
  group: null,
  workflow: 'http://127.0.0.1:8888'
  // workflow: 'http://10.231.131.123:3004',
}

// eslint-disable-next-line
export default (process.env.REACT_APP_ENV === 'production' ? proUrl : devUrl)
