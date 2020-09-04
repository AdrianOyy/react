class path {
  getQueryString(str) {
    const query = str.split('?')[1]
    const items = query.split('&')
    const result = {}
    let arr = ''

    for (let i = 0; i < items.length; i++) {
      arr = items[i].split('=')
      result[arr[0]] = arr[1]
    }
    return result
  }
}

export default new path();
