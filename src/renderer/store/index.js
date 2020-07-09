import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarWidth: 60,
    headerHeight: 48,
    collapse: true
  },
  mutations: {
    updateState (state, param) {
      Object.keys(param).forEach(p => {
        state[p] = param[p]
      })
    }
  },
  actions: {},
  modules: {}
})
