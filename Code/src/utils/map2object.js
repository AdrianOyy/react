export default function map2object(strMap) {
  let obj = Object.create(null)
  for (let [ k, v ] of strMap) {
    obj[k] = v
  }
  return obj
}
