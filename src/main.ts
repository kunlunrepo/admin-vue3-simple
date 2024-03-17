import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
// import 'reset-css'
// import '@unocss/reset/normalize.css'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'

// element-plus 样式
import 'element-plus/dist/index.css'
// 暗黑模式样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 国际化
import I18n from "@/modules/i18n";





const app = createApp(App)

app.use(I18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
