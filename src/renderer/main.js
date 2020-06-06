import Vue from 'vue'
import App from './App'

import '@/assets/reset.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

new Vue({
    components: { App },
    template: '<App/>'
}).$mount('#app')
