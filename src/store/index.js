import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    linkHolder: 'https://youtu.be/CC_2gvC8rJQ'
  },
  mutations: {
    putLink (state, payload) {
      state.linkHolder = payload.link
    }
  },
  actions: {
  },
  modules: {
  }
})
