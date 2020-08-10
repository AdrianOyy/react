const crypto = require('crypto')
// const sha1 = crypto.createHash("sha1");

export function encryption(pass) {
  let encrypted = ''
  const cip = crypto.createCipher("aes-256-cbc", "MzZaFw0yNDA2MDYwNzI4MzZaMIGIMQswCQYDVQQGEwJDTjERMA8GA1UECAwIU2hh")
  encrypted += cip.update(pass, 'binary', 'hex')
  encrypted += cip.final('hex')
  return encrypted
}
