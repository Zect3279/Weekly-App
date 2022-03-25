import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    itemList: {}
  },
  mutations: {
    changeFNum (state, payload) {
      //
      state.firstNumber = payload.num
    },
    addNum (state, payload) {
      state.itemList[payload.id].count += 1
    },
    resetNum (state, payload) {
      state.itemList[payload.id].count = 0
    },
    addItem (state, payload) {
      state.itemList[payload.id] = {
        id: payload.id,
        name: payload.name,
        count: 0
      }
    },
    changeList (state, payload) {
      state.itemList = payload.itemList
    }
  },
  actions: {
  },
  modules: {
  }
})
