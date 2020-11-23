export function isEmail(e) {
  // eslint-disable-next-line
  return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(e)
}

export function isNonNegativeInteger(e) {
  return /^\d+$/.test(e)
}
