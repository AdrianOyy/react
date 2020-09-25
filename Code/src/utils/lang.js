import { lang } from '../lang/lang'

export function getLang() {
  return lang.ex_us
}
export function L(slang) {
  return lang.ex_us[slang] || slang
}
