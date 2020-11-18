export function cloneMap1(map) {
  const res = new Map()
  for (let [ key, value ] of map) {
    res.set(key, value)
  }
  return res
}
