

export function getUser() {
  return JSON.parse(window.localStorage.getItem("user"))
}

export function getUrl() {
  const url = process.env.REACT_APP_BASE_API
  return url
}

export function getQueryString(str) {
  const url = str.split('?')[1]
  const items = url.split('&')
  const result = {}
  let arr = ''

  for (let i = 0; i < items.length; i++) {
    arr = items[i].split('=')
    result[arr[0]] = arr[1]
  }

  return result
}

