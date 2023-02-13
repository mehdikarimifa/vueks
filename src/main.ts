import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './plugins'

import './assets/scss/global.scss'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap/dist/js/bootstrap.min'

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
