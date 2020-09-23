import { lang } from '../lang/lang'

export function getLang() {
  return lang.ex_us
}
export function L(lang) {
  return lang.ex_us[lang] || lang
}
