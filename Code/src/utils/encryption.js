import crypto from 'crypto'

export function encryption(pass) {
  let encrypted = ''
  const cip = crypto.createCipher("aes-256-cbc", "MzZaFw0yNDA2MDYwNzI4MzZaMIGIMQswCQYDVQQGEwJDTjERMA8GA1UECAwIU2hh")
  encrypted += cip.update(pass, 'binary', 'hex')
  encrypted += cip.final('hex')
  return encrypted
}

/* eslint-disable no-undef */
export function encryptionNew(pass) {
  const algorithm = 'aes-256-cbc'
  const key = Buffer.from('bb88d2036064d1656e946a5e915f5707d8939c7c783b57d0d59d38c8be7df3dc', 'hex')
  const iv = Buffer.from('5bf01f4c579fb8171583e896604e5d4c', 'hex')
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
  let encrypted = cipher.update(pass)
  encrypted = Buffer.concat([ encrypted, cipher.final() ])
  return encrypted.toString('hex')
}
