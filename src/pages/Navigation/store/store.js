import Vue from 'vue'
import Vuex from 'vuex'
import * as nav from './modules/nav.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    nav
  }
})
