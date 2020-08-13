const proPrefix = {
  aaa: '/AAA',
  logging: '/logging',
  workflow: '/workflow'
}

const devPrefix = {
  aaa: '',
  logging: '',
  workflow: ''
}

// eslint-disable-next-line
export default (process.env.REACT_APP_ENV === 'production' ? proPrefix : devPrefix)
