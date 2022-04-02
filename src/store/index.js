import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    itemList: {
      aaa: {
        count: 30,
        id: 'aaa',
        name: '30 sec',
        default: 30
      },
      bbb: {
        count: 60,
        id: 'bbb',
        name: '1 min',
        default: 60
      },
      ccc: {
        count: 120,
        id: 'ccc',
        name: '2 min',
        default: 120
      },
      ddd: {
        count: 300,
        id: 'ddd',
        name: '5 min',
        default: 300
      },
      eee: {
        count: 1800,
        id: 'eee',
        name: '30 min',
        default: 1800
      }
    }
  },
  mutations: {
    changeFNum (state, payload) {
      //
      state.firstNumber = payload.num
    },
    changeNum (state, payload) {
      state.itemList[payload.id].count += Number(payload.diff)
    },
    resetNum (state, payload) {
      state.itemList[payload.id].count = state.itemList[payload.id].default
    },
    addItem (state, payload) {
      state.itemList[payload.id] = {
        id: payload.id,
        name: payload.name,
        count: payload.count,
        default: payload.count
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
