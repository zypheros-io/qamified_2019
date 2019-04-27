/* eslint-disable */
import firebase from 'firebase';
import moment from 'moment';
import { Snackbar } from 'buefy/dist/components/snackbar';

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
          rank: 'Pathfinder',
          reputation: 0,
          badge_url: '../../static/badges/Badge01.png',
          img_url: 'static/avatars/avatar_boy.png',
          // Hidden information
          is_banned: false,
          is_admin: false,
          is_new: true,
          is_reported: false,
          missions: [
            {
              description: 'Post five (5) quests on the quest board',
              experience: 50,
              title: 'Mission 1',
              done: false,
              requirements: {
                context: 'Post Quest',
                current: 0,
                required: 5
              }
            },
            {
              description: 'Post three (3) solutions on any quest',
              experience: 20,
              title: 'Mission 2',
              done: false,
              requirements: {
                context: 'Post Solution',
                current: 0,
                required: 3
              }
            },
            {
              description: 'Post one (1) reply on any solution',
              experience: 20,
              title: 'Mission 3',
              done: false,
              requirements: {
                context: 'Post Reply',
                current: 0,
                required: 1
              }
            }
          ],
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
