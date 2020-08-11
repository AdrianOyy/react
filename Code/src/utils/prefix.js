const proPerfix = {
  aaa: '/AAA',
  logging: '/logging',
  workflow: '/workflow'
}

const devPerfix = {
  aaa: '',
  logging: '',
  workflow: ''
}

// eslint-disable-next-line
export default (process.env.REACT_APP_ENV === 'production' ? proPerfix : devPerfix)
