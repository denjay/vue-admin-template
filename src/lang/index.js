import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { getLanguage } from '@/utils/i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhCnLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import elementZhTwLocale from 'element-ui/lib/locale/lang/zh-TW'// element-ui lang
import enLocale from './en'
import zhCnLocale from './zh-CN'
import zhTwLocale from './zh-TW'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh_CN: {
    ...zhCnLocale,
    ...elementZhCnLocale
  },
  zh_TW: {
    ...zhTwLocale,
    ...elementZhTwLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh_CN | zh_TW
  locale: getLanguage() || 'zh_TW',
  // set locale messages
  messages
})

export default i18n
