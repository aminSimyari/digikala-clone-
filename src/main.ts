import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

// Global error handler
app.config.errorHandler = () => {}

app.use(pinia)
app.use(router)
app.mount('#app')
