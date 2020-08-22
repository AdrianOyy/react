

export function getUser() {
  return JSON.parse(window.localStorage.getItem("user"))
}

export function getQueryString(str) {
  console.log(str)
  const url = str.split('?')[1]
  console.log(url)
  const items = url.split('&')
  console.log(items)
  const result = {}
  let arr = ''

  for (let i = 0; i < items.length; i++) {
    arr = items[i].split('=')
    result[arr[0]] = arr[1]
  }

  return result
}

