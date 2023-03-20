// import Vue from 'vue'
// import Vuex from 'vuex'
// import auth from './modules/auth'
// import blog from './modules/blog'
//
// Vue.use(Vuex)
//
// export default new Vuex.Store({
//   modules: {
//     auth,
//     blog
//   }
// })



import { createStore } from 'vuex'

import auth from './modules/auth'
import blog from './modules/blog'

const store = createStore({
  modules: {
    auth,
    blog
  },
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

export {store};

