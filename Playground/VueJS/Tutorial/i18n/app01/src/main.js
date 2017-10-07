// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueI18n from 'vue-i18n'
import translations from './assets/data/translations/i18n.json'

console.log('translations', translations)

// var axios = require('axios')

// axios.get('http://localhost:8080/data/i18n.json')
//   .then(function (response) {
//     console.log('the response: ', response)
//   })
//   .catch(function (error) {
//     console.log(error.message)
//   })

Vue.use(VueI18n)

Vue.config.productionTip = false

const messages = translations

const i18n = new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: {App}
})
