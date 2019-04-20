/* eslint-disable */
import firebase from 'firebase';
import moment from 'moment';

const state = {
  loading: false,
  error: null
};

const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  clearError(state) {
    state.error = null;
  }
};

const actions = {
  signUp({ commit }, payload) {
    commit('setLoading', true);
    commit('clearError');
    // Sign user up
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        // Create a user database entry
        const newUser = {
          // Primary information
          id: user.user.uid,
          email: payload.email,
          username: payload.username,
          fname: payload.firstname,
          lname: payload.lastname,
          institution: payload.institution,
          // Miscellaneous infor
          description: 'Edit this yourself, pls',
          level: 1,
          level_cap: 20,
          experience: 0,
          rank: 'Novice',
          reputation: 0,
          badge_url: '../../static/badges/chevron-1.png',
          img_url: 'static/avatars/avatar_boy.png',
          // Hidden information
          is_banned: false,
          is_admin: false,
          is_new: true,
          last_access: moment().format(),
          date_created: moment().format()
        };
        // Store changes
        const updates = {};
        updates[`/user/${newUser.id}`] = newUser;
        // Commit changes to database
        firebase
          .database()
          .ref()
          .update(updates)
          .then(() => {
            commit('user/setUser', newUser, { root: true });
            commit('setLoading', false);
          })
          .catch(error => {
            commit('setError', error);
            commit('setLoading', false);
            Snackbar.open({
              message: error.message,
              type: 'is-danger',
              onAction: () => commit('clearError')
            });
          });
      })
      .catch(error => {
        commit('setError', error);
        commit('setLoading', false);
        Snackbar.open({
          message: error.message,
          type: 'is-danger',
          onAction: () => commit('clearError')
        });
      });
  }
};

const getters = {
  isLoading() {
    return state.loading;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
