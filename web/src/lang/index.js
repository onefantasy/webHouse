import { createI18n } from 'vue-i18n'
import enLocale from './en'
import zhLocale from './zh'
import jaLocale from './ja'
import elementEnLocale from 'element-plus/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'// element-ui lang
import elementJaLocale from 'element-plus/lib/locale/lang/ja'// element-ui lang
import Cookies from 'js-cookie'

const CookiesName = 'language'

// set default language is english
const defaultLanguage = 'en'

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  ja: {
    ...jaLocale,
    ...elementJaLocale
  }
}

export function getLanguage() {
  const chooseLanguage = Cookies.get(CookiesName)
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      Cookies.set(CookiesName, locale)
      return locale
    }
  }
  Cookies.set(CookiesName, defaultLanguage)
  return defaultLanguage
}

const i18n = createI18n({
  locale: getLanguage(),
  messages
})

export function setLanguage(lang) {
  i18n.global.locale = lang
  Cookies.set(CookiesName, lang)
}

export default i18n
