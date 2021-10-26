import { API_URL } from '@/http';
import AuthService from '@/services/AuthService';
import axios from 'axios';

import {
  status,
  _set_status,
  _set_errors,
  _set_error_message,
  _set_auth,
  _set_user,
  SIGNIN,
  SIGNUP,
  SIGNOUT,
  CHEK_AUTH,
  GET_AUTH_STATE,
  GET_USER,
  GET_ERRORS,
  GET_ERROR_MESSAGE,
  GET_STATUS
} from '@/store/constants';

export default {
  namespaced: true,
  state: () => ({
    status: status.listen,
    errors: [],
    errorMessage: null,
    user: null,
    isAuth: false
  }),
  mutations: {
    [_set_status](state, status) {
      state.status = status;
      state.errors = [];
      state.errorMessage = null;
    },
    [_set_errors](state, error) {
      state.errors = error.response.data.errors;
    },
    [_set_error_message](state, error) {
      state.errorMessage = error.response.data.message;
    },
    [_set_auth](state, bool) {
      state.isAuth = bool;
    },
    [_set_user](state, user) {
      state.user = user;
    }
  },
  actions: {
    async [SIGNUP]({ commit }, signupData) {
      commit(_set_status, status.request);
      try {
        const response = await AuthService.signup(signupData);
        commit(_set_status, status.success);
        localStorage.setItem('token', response.data.accessToken);
        commit(_set_auth, true);
        commit(_set_user, response.data.user);
      }
      catch (error) {
        commit(_set_status, status.error);
        commit(_set_error_message, error);
        commit(_set_errors, error);
      }
    },
    async [SIGNIN]({ commit }, { email, password }) {
      commit(_set_status, status.request);
      try {
        const response = await AuthService.signin(email, password);
        commit(_set_status, status.success);
        localStorage.setItem('token', response.data.accessToken);
        commit(_set_auth, true);
        commit(_set_user, response.data.user);
      }
      catch (error) {
        commit(_set_status, status.error);
        commit(_set_error_message, error);
      }
    },
    async [SIGNOUT]({ commit }) {
      commit(_set_status, status.request);
      try {
        await AuthService.signout();
        commit(_set_status, status.success);
        localStorage.removeItem('token');
        commit(_set_auth, false);
        commit(_set_user, null);
      }
      catch (error) {
        commit(_set_status, status.error);
        commit(_set_errors, error);
      }
    },
    async [CHEK_AUTH]({ commit }) {
      commit(_set_status, status.request);
      try {
        const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
        commit(_set_status, status.success);
        localStorage.setItem('token', response.data.accessToken);
        commit(_set_auth, true);
        commit(_set_user, response.data.user);
      }
      catch (error) {
        commit(_set_status, status.error);
      }
    }
  },
  getters: {
    [GET_AUTH_STATE]: (state) => state.isAuth,
    [GET_USER]: (state) => state.user,
    [GET_ERRORS]: (state) => state.errors,
    [GET_ERROR_MESSAGE]: (state) => state.errorMessage,
    [GET_STATUS]: (state) => state.status
  }
}