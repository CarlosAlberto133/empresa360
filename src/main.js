import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

const Vue = createApp(App)
Vue.use(router) //Adicionando as configurações de rotas a instância do Vue
Vue.mount('#app')

//createApp(App).mount('#app')
