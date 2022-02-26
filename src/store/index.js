import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    firstNumber: 1,
    lastNumber: 10,
    alreadyList: []
  },
  mutations: {
    changeFNum (state, payload) {
      //
      state.firstNumber = payload.num
    },
    changeLNum (state, payload) {
      //
      state.lastNumber = payload.num
    },
    changeAList (state, payload) {
      //
      state.alreadyList = payload.AList
    },
    appendAList (state, payload) {
      //
      state.alreadyList.push(payload.num)
    },
    resetAList (state, payload) {
      //
      state.alreadyList = []
    }
  },
  actions: {
  },
  modules: {
  }
})
