export function map2object(strMap) {
  let obj = Object.create(null)
  for (let [ k, v ] of strMap) {
    obj[k] = v
  }
  return obj
}

// 处理数据显示问题
export function map2Label(strMap) {
  for (const str of strMap) {
    str.readable = str.readable ? 'True' : 'False'
    str.required = str.required ? 'True' : 'False'
    str.showOnRequest = str.showOnRequest ? 'True' : 'False'
    str.writable = str.writable ? 'True' : 'False'
  }
  return strMap
}

// 处理数据显示渲染
export function map2Values(strMap) {
  const boolData = [ 'readable', 'required', 'showOnRequest', 'writable' ]
  const values = []
  for (const maps of strMap) {
    const data = {}
    for (const str in maps) {
      const model = {
        id: str,
        label: maps[str],
        value: maps[str]
      }
      if (boolData.indexOf(str) > -1) {
        model.value = maps[str] === 'True' ? '1' : '0'
      }
      data[str] = model
    }
    values.push(data)
  }
  return values
}
