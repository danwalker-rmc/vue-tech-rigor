import Vue from 'vue'
import Vuex from 'vuex'
import * as navbar from './modules/navbar.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    navbar
  }
})
