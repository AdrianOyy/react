export function cloneMap1(map) {
  const res = new Map()
  for (let [ key, value ] of map) {
    res.set(key, value)
  }
  return res
}

export function cloneSet1(set) {
  const res = new Set()
  for (let item of set) {
    res.add(item)
  }
  return res
}
