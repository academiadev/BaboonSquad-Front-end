// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import money from 'v-money'
import VueMaterial from 'vue-material'
import VueChartkick from 'vue-chartkick'

import 'vue-material/dist/vue-material.css'

import router from './router'
import store from './store'
import App from './App'
import VModal from 'vue-js-modal'


Vue.config.productionTip = false



Vue.use(VueMaterial)
Vue.use(money, {decimal: ",", thousands: ".", prefix: "R$", suffix:'', precision: 2,})
Vue.use(VModal)
Vue.use(VueChartkick)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

Date.prototype.monthNames = [
  "January", "February", "March",
  "April", "May", "June",
  "July", "August", "September",
  "October", "November", "December"
];

Date.prototype.getMonthName = function() {
  return this.monthNames[this.getMonth()];
};
Date.prototype.getShortMonthName = function () {
  return this.getMonthName().substr(0, 3);
};