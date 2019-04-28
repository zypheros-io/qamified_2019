/* eslint-disable */
import firebase from 'firebase';

const state = {
  users: [],
  loading: true
};

const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setUsers(state, payload) {
    state.users = payload;
  }
};

const actions = {
  populateLeaderboard({ commit }) {
    commit('setLoading', true);

    firebase
      .database()
      .ref('user/')
      .orderByChild('reputation')
      .on('value', users => {
        const userArray = [];
        if (users) {
          users.forEach(user => {
            if (user) {
              const u = user.val();
              userArray.unshift(u);
            }
          });
        }
        commit('setUsers', userArray);
      });
  }
};

const getters = {
  users(state) {
    return state.users.sort((userA, userB) => {
      return userB.reputation - userA.reputation;
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
