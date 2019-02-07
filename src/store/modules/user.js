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
    state.loading = payload;
  },
};

const actions = {
  initUser({ commit }, currUser) {
    commit('setLoading', true);
    firebase.database()
      .ref(`/user/${currUser.uid}`)
      .on('value', (user) => {
        if (user.val() != null) {
          commit('setUser', user.val());
        }
      });
  },
  postQuest({ commit }, quest) {
    commit('feed/setLoading', true, { root: true });
    const newQuest = quest;
    const questKey = firebase.database().ref().child('quest').push().key;
    newQuest.id = questKey;
    const updates = {};
    updates[`/quest/${newQuest.id}`] = newQuest;
    firebase.database()
      .ref()
      .update(updates)
      .then(() => {
        commit('feed/setLoading', false, { root: true });
      })
      .catch((error) => {
        commit('feed/setLoading', false, { root: true });
        // eslint-disable-next-line
        console.log(error);
      });
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
