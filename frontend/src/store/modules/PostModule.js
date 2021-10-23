import PostService from '@/services/PostService';

import {
  status,
  _set_status,
  _set_errors,
  _set_posts,
  _set_user_posts,
  _set_post,
  _create_post,
  _update_post,
  _delete_post,
  GET_ALL_POSTS_API,
  GET_USER_POST_API,
  CREATE_POST_API,
  UPDATE_POST_API,
  DELETE_POST_API,
  GET_POST_API,
  GET_ALL_POSTS,
  GET_USER_POSTS,
  GET_POST,
  GET_TOTAL_COUNT,
  GET_LIMIT,
  GET_ERRORS,
  GET_STATUS
} from '@/store/constants';

export default {
  namespaced: true,
  state: () => ({
    status: status.listen,
    errors: null,
    totalCount: null,
    limit: 3,
    offset: 0,
    posts: [],
    userPosts: [],
    post: null
  }),
  mutations: {
    [_set_status](state, status) {
      state.status = status;
    },
    [_set_errors](state, error) {
      state.errors = error?.response?.data;
    },
    [_set_posts](state, payload) {
      state.totalCount = payload.totalCount;
      state.posts = payload.posts;
    },
    [_set_user_posts](state, payload) {
      state.userPosts = payload;
    },
    [_set_post](state, payload) {
      console.log(payload);
      state.post = payload;
    },
    [_create_post](state, payload) {
      state.posts.push(payload)
    },
    [_update_post](state, payload) {
      state.posts.forEach(post => {
        if (post.id === payload.id) {
          post = payload
        }
      });
      state.post = null;
    },
    [_delete_post](state, id) {
      state.userPosts = state.userPosts.filter((post) => post.id !== id)
    }
  },
  actions: {
    async [GET_ALL_POSTS_API]({ commit, state }, page = 1, limit = state.limit) {
      commit(_set_status, status.request);
      try {
        const response = await PostService.fetchPosts(page, limit)
        commit(_set_status, status.success);
        commit(_set_posts, response.data);
      }
      catch (error) {
        commit(_set_status, status.error);
        commit(_set_errors, error);
      }
    },
    async [GET_USER_POST_API]({ commit }, userId) {
      commit(_set_status, status.request);
      try {
        const response = await PostService.fetchPostsByUserId(userId);
        commit(_set_status, status.success);
        commit(_set_user_posts, response.data);
      }
      catch (error) {
        commit(_set_status, status.error);
        commit(_set_errors, error);
      }
    },
    async [GET_POST_API]({ commit }, id) {
      commit(_set_status, status.request);
      try {
        const response = await PostService.fetchPost(id)
        commit(_set_status, status.success);
        commit(_set_post, response.data);
      }
      catch (error) {
        commit(_set_status, status.error);
        commit(_set_errors, error);
      }
    },
    async [CREATE_POST_API]({ commit }, postData) {
      commit(_set_status, status.request);
      try {
        const response = await PostService.createPost(postData);
        commit(_set_status, status.success);
        commit(_set_errors, null);
        commit(_create_post, response.data);
      }
      catch (error) {
        commit(_set_status, status.error);
        commit(_set_errors, error);
      }
    },
    async [UPDATE_POST_API]({ commit }, post) {
      commit(_set_status, status.request);
      try {
        const response = await PostService.updatePost(post);
        commit(_set_status, status.success);
        commit(_set_errors, null);
        commit(_update_post, response.data);
      }
      catch (error) {
        commit(_set_status, status.error);
        commit(_set_errors, error);
      }
    },
    async [DELETE_POST_API]({ commit }, id) {
      commit(_set_status, status.request);
      try {
        const response = await PostService.deletePost(id);
        commit(_set_status, status.success);
        commit(_delete_post, response.data.id);
      }
      catch (error) {
        commit(_set_status, status.error);
        commit(_set_errors, error);
      }
    },
  },
  getters: {
    [GET_ALL_POSTS]: (state) => state.posts,
    [GET_USER_POSTS]: (state) => state.userPosts,
    [GET_POST]: (state) => state.post,
    [GET_TOTAL_COUNT]: (state) => state.totalCount,
    [GET_LIMIT]: (state) => state.limit,
    [GET_ERRORS]: (state) => state.errors,
    [GET_STATUS]: (state) => state.status
  }
}