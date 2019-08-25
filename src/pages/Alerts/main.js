import Vue from 'vue'
import './master'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#Alerts')
