// import '@babel/polyfill'
import Vue from 'vue'
import './master'
import App from './App.vue'
// import store from './store/store'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { dom } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(far, fas)

// dom.watch()

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  // store,
  render: h => h(App)
}).$mount('#NavEditor')
