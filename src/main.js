// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import axios from 'axios'
import money from 'v-money'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

import router from './router'
import store from './store'
import App from './App'
import VModal from 'vue-js-modal'
 

axios.default.baseURL = 'https://reembolsoazul-8f884.firebaseio.com/'
axios.defaults.headers.get['Accepts'] = 'application/json'

Vue.config.productionTip = false



Vue.use(VueMaterial)
Vue.use(money, {decimal: ",", thousands: ".", prefix: "R$"})
Vue.use(VModal)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
