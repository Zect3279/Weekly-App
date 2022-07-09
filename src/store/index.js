import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    quList: [
      'Hello World',
      'console.log',
      'array.prototype.pop'
    ]
  },
  mutations: {
    resetQU (state, payload) {
      state.quList = []
    },
    putQU (state, payload) {
      state.quList = payload.qus
    }
  },
  actions: {
  },
  modules: {
  }
})
