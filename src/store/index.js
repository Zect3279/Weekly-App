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
    changeNum (state, payload) {
      state.itemList[payload.id].count += Number(payload.diff)
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
    },
    deleteList (state, payload) {
      delete state.itemList[payload.id]
    }
  },
  actions: {
  },
  modules: {
  }
})
