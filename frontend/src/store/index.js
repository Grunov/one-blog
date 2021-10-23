import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/authModule'
import PostyModule from './modules/PostModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: authModule,
    post: PostyModule
  }
})
