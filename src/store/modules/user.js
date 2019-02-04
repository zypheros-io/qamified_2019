/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import firebase from 'firebase';

const state = {
  user: null,
  loading: false,
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
  postQuest({ commit }, payload) {
    commit('setLoading', true);
    const q = payload;
    const questKey = firebase.database().ref().child('quest').push.key;
    q.id = questKey;
    const updates = {};

    updates[`/quest/${q.id}`] = q;
    // eslint-disable-next-line
    console.log(q);
    // update user exp
    // firebase.database()
    //   .ref()
    //   .update(updates)
    //   .then(
    //     () => {
    //       commit('setLoading', false);
    //     },
    //   )
    //   .catch(
    //     (error) => {
    //       commit('setLoading', false);
    //       // eslint-disable-next-line
    //       console.log(error);
    //     },
    //   );
  },
  logOut({ commit }) {
    firebase.auth().signOut();
    commit('setUser', null);
  },
};

const getters = {
  getUser(state) {
    return state.user;
  },
  isLoading(state) {
    return state.loading;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
