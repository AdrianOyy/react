export function isEmail(e) {
  // eslint-disable-next-line
  return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(e)
}

export function isNonNegativeInteger(e) {
  return /^\d+$/.test(e)
}

export function isHKPhone(e) {
  return /^[0-9]{8}$/.test(e)
}

export function isHKID(e) {
  return /[A-Z]+([0-9]{6})+[a-zA-Z0-9]/.test(e)
}
