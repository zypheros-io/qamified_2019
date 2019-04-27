/* eslint-disable */
import firebase from 'firebase';
import { Snackbar } from 'buefy/dist/components/snackbar';

const state = {
  user: null
};

const mutations = {
  setProfileUser(state, payload) {
    state.user = payload;
  }
};

const actions = {
  populateProfile({ commit }, userId) {
    let user;
    firebase
      .database()
      .ref(`user/${userId}`)
      .on('value', u => {
        if (u.val() !== null) {
          const solutions = [];
          user = u.val();
          if (user.solution) {
            Object.keys(user.solution).forEach(solution => {
              solutions.push(solution);
            });
          }
          user.solution = solutions;
          commit('setProfileUser', user);
        }
      });
  },
  reportUser({ dispatch }, userId) {
    const updates = {};
    updates[`user/${userId}/is_reported`] = true;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        Snackbar.open({
          message: 'User successfully reported',
          type: 'is-success',
          duration: 3000
        });
        dispatch('user/updateLogs', 'REPORT_USER', { root: true });
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const getters = {
  user(state) {
    return state.user;
  },
  missions(state) {
    return state.user.missions;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
