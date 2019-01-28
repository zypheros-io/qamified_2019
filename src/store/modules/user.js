/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import firebase from 'firebase';

const state = {
  user: null,
  loading: false,
};

const getters = {
  getUser(state) {
    return state.user;
  },
  isLoading(state) {
    return state.loading;
  },
};

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setLoading(state, payload) {
    this.loading = payload;
  },
};

const actions = {
  initUser({ commit }, payload) {
    // recode to reinitialize all user properties
    commit('setUser', {
      id: payload.uid,
    });
  },
  logOut({ commit }) {
    firebase.auth().signOut();
    commit('setUser', null);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
