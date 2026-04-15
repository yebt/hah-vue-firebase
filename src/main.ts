import 'virtual:uno.css'
import '@/assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(PiniaColada,{
// settings
})
app.use(router)

app.mount('#app')
