import {createI18n, type Locale} from 'vue-i18n'
import type {App} from "vue";

const i18n = createI18n({
    legacy: false,
    locale: '',
    messages: {}
})

// 自定义语言包
const localesMap = Object.fromEntries(
    // 格式： import.meta.globa 解析成 filename: ./locale/en.js 或 ()=>import('./locales/en.js')
    // -> [./locale/en.js:  ()=>import('./locales/en.js')] => ['en', ()=>import('./locales/en.js')]
    // 最终 { en: function(){}, zh-CN: function(){} }
    Object.entries(import.meta.glob('../../locales/*.js'))
        .map(([path, loadLocale]) => [path.match(/([\w-]*)\.js$/)?.[1], loadLocale]),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

// ElementPlus语言包
const elementPlusLocalesMap = Object.fromEntries(
    // 格式： import.meta.globa 解析成 filename: ./locale/en.js 或 ()=>import('./locales/en.js')
    // -> [./locale/en.js:  ()=>import('./locales/en.js')] => ['en', ()=>import('./locales/en.js')]
    // 最终 { en: function(){}, zh-CN: function(){} }
    Object.entries(import.meta.glob('../../node_modules/element-plus/dist/locale/*.mjs'))
        .map(([path, loadLocale]) => [path.match(/([\w-]*)\.mjs$/)?.[1], loadLocale]),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

// 可用的语言包的key
export const availableLocales = Object.keys(localesMap)

const filterEPLocalesMap =
    availableLocales.reduce(
        (acc: Record<Locale, () => Promise<{ default: Record<string, string> }>>, locale: Locale) => {
            return {
                ...acc,
                [locale]: elementPlusLocalesMap[locale.toLowerCase()]
            }
        }, {})

// 本地化语言列表
const loadedLanguages: string[] = []

// 设置本地化语言
export function setI18nLanguage(locale: string) {
    i18n.global.locale.value = locale
    if (typeof document !== 'undefined') {
        document.querySelector('html')?.setAttribute('lang', locale)
    }
}

// 加载本地化信息
export async function loadLocaleMessages(lang: string) {
    // 如果已经被i18n插件进行加载的，则直接设置i18n.locale
    if (i18n.global.locale.value === lang || loadedLanguages.includes(lang)) {
        return setI18nLanguage(lang)
    }
    // load locale messages with dynamic import
    const messages = await localesMap[lang]()
    const messagesEP = await filterEPLocalesMap[lang]()
    // set locale and locale message
    i18n.global.setLocaleMessage(lang,
        {
            ...messagesEP.default,
            ...messages.default,
        })
    loadedLanguages.push(lang)
    return setI18nLanguage(lang)
}

// 安装i18n插件
export default {
    install(app: App) {
        app.use(i18n)
        loadLocaleMessages('zh-CN')
    }
}
