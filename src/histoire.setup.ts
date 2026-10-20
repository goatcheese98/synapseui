import './style.css'
import './styles/fonts.css'
import './styles/lum.css'
import './styles/histoire-consumer.css'
import { createPinia } from 'pinia'
import { defineSetupVue3 } from '@histoire/plugin-vue'

export const setupVue3 = defineSetupVue3(({ app }) => {
  const pinia = createPinia()
  app.use(pinia)
})