import 'virtual:uno.css'
import '@/shared/assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'

import App from './App.vue'
import router from './router'
import { VueFire } from 'vuefire'
import { firebaseApp } from './app/infrastructure/firebase'

const app = createApp(App)

app.use(createPinia())
app.use(PiniaColada, {})
app.use(VueFire, {
  firebaseApp,
})
app.use(router)

app.mount('#app')
