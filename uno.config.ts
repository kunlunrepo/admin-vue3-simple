// uno.config.ts
import { defineConfig } from 'unocss'
// import presetWind from '@unocss/preset-wind'
import { presetWind, presetIcons } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetWind(),
    presetIcons({
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block'
      }
    })
  ],
  safelist: ['ep:full-screen','ri:fullscreen-exit-fill'],
  // 使用transformerDirectives插件支持@apply等指令
  transformers: [transformerDirectives()]
})
