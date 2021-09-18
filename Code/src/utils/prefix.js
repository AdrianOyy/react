const proPrefix = {
  aaa: '/AAA',
  logging: '/logging',
  workflow: '/workflow',
  // resource: '/resource'
  resource: ''
}

const devPrefix = {
  aaa: '',
  logging: '',
  workflow: '',
  resource: '',
}

// eslint-disable-next-line
export default (process.env.REACT_APP_ENV === 'production' ? proPrefix : devPrefix)
