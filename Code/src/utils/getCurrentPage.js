const getCurrentPage = () => {
  let pathname = window.location.pathname
  if (pathname[ pathname.length - 1 ] !== '/') {
    pathname += '/'
  }
  const slicePathName = pathname.slice(1, -1).split('/')
  let rootName
  let pageName
  if (slicePathName.length === 1) {
    rootName = slicePathName[0]
    pageName = slicePathName[0]
  } else {
    [ rootName, pageName ] = slicePathName
  }
  console.log(rootName, pageName)
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
