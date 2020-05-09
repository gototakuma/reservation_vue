import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    status: false
  },
  mutations: {
    authToken(state, token) {
      state.token = token //ユーザー情報
    },
    userStatus(state, status) {
      state.status = status; //ログインしてるかどうか true or false
    },
    userPosition(state, position) {
      state.position = position
    },
    userId(state,id) {
      state.id = id
    },
    flashMessage(state, message) {
      state.message = message
    },
    falshValue(state, value) {
      state.value = value
    },
    flashType(state, flashType) {
      state.flashType = flashType
    }
  },
  getters: {
    token(state) {
      return state.token;
    },
    isSignedIn(state) {
      return state.status;
    },
    position(state) {
      return state.position;
    },
    id(state) {
      return state.id
    },
    message(state) {
      return state.message
    },
    value(state) {
      return state.value
    },
    flashType(state) {
      return state.flashType
    }
  },
  plugins: [createPersistedState(
    { storage: window.sessionStorage }
    )
  ],
});