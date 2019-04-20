/* eslint-disable */
import firebase from 'firebase';
import { Snackbar } from 'buefy/dist/components/snackbar';
import router from '../../router';

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
  emailLogin({ commit }, payload) {
    commit('setLoading', true);
    commit('clearError');
    // Sign in user using credentials
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(loggedUser => {
        commit('user/setUser', loggedUser, { root: true });
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
  },
  usernameLogin({ commit }, payload) {
    commit('setLoading', true);
    commit('clearError');
    // Look for matching user with email
    firebase
      .database()
      .ref('user')
      .orderByChild('username')
      .equalTo(payload.email)
      .limitToFirst(1)
      .once('value', user => {
        let matchingUser;
        user.forEach(u => {
          matchingUser = u.val();
        });
        // Check if matching user is empty
        if (matchingUser) {
          console.log("I'm not empty!");
          // Check if user is currently banned
          if (!matchingUser.is_banned) {
            // If not, log user in.
            firebase
              .auth()
              .signInWithEmailAndPassword(matchingUser.email, payload.password)
              .then(loggedUser => {
                commit('user/setUser', loggedUser, { root: true });
                commit('setLoading', false);
              })
              .catch(error => {
                commit('setError', error);
                commit('setLoading', false);
                console.log(error.code);
                Snackbar.open({
                  message: error.message,
                  type: 'is-danger',
                  onAction: () => commit('clearError')
                });
              });
          }
          // If user is banned
          else {
            Snackbar.open({
              message:
                'You are currently banned. Contact the administrator for details.',
              type: 'is-danger'
            });
            commit('setLoading', false);
          }
        } else {
          console.log("I'm empty!");
          commit('setLoading', false);
          Snackbar.open({
            message: 'User does not exist. Sign up?',
            type: 'is-danger',
            actionText: 'SIGN UP',
            duration: 3000,
            onAction: () => router.push('/signup')
          });
        }
      });
  },
  checkSignInMethod({ dispatch }, payload) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(payload.email)) {
      dispatch('emailLogin', payload);
    } else {
      dispatch('usernameLogin', payload);
    }
  }
};

const getters = {
  isLoading(state) {
    return state.loading;
  },
  getError(state) {
    return state.error;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
