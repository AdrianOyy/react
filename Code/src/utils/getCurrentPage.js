const getCurrentPage = () => {
  let pathname = window.location.pathname
  if (pathname[ pathname.length - 1 ] !== '/') {
    pathname += '/'
  }
  const [ rootName, pageName ] = pathname.slice(1, -1).split('/')
  const module = window.location.hash.split('/')[1]
  let moduleName
  switch (module) {
    case 'create':
      moduleName = 'Create'
      break
    case 'detail':
      moduleName = 'Detail'
      break
    case 'update':
      moduleName = 'Update'
      break
    case 'step':
      moduleName = 'Step'
      break
    default:
      moduleName = 'List'
  }
  return { rootName, pageName, moduleName }
}

export default getCurrentPage
