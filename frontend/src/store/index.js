import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/authModule'
import PostModule from './modules/PostModule'
import MyPostModule from './modules/MyPostModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: authModule,
    post: PostModule,
    mypost: MyPostModule
  }
})
