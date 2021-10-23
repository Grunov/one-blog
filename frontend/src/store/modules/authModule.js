import { API_URL } from '@/http';
import AuthService from '@/services/AuthService';
import axios from 'axios';

import {
  status,
  _set_status,
  _set_auth,
  _set_user,
  SIGNIN,
  SIGNUP,
  SIGNOUT,
  CHEK_AUTH,
  GET_AUTH_STATE,
  GET_USER,
  GET_ERRORS,
  GET_STATUS
} from '@/store/constants';

export default {
  namespaced: true,
  state: () => ({
    status: status.listen,
    error: null,
    user: null,
    isAuth: false
  }),
  mutations: {
    [_set_status](state, status, error) {
      state.status = status;
      if (error) {
        state.error = error.response?.data?.message;
        if ((process.env.NODE_ENV !== 'production')) {
          console.error(error);
        }
      }
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
        commit(_set_status, status.error, error);
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
        commit(_set_status, status.error, error);
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
        commit(_set_status, status.error, error);
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
        commit(_set_status, status.error, error);
      }
    }
  },
  getters: {
    [GET_AUTH_STATE]: (state) => state.isAuth,
    [GET_USER]: (state) => state.user,
    [GET_ERRORS]: (state) => state.error,
    [GET_STATUS]: (state) => state.status
  }
}