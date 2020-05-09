import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import Store from './store/store.js'


Vue.config.productionTip = false

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = 'Token ' + Store.state.token

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
