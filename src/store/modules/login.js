/* eslint-disable */
import firebase from 'firebase';

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
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const newUser = {
          id: user.uid
        };
        commit('user/setUser', newUser, { root: true });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMsg = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Incorrect password, please try again.');
        } else if (errorCode === 'auth/invalid-email') {
          alert('The email you entered is invalid, please try again.');
        } else if (errorCode === 'auth/user-not-found') {
          alert('The user is not in the database, please try again.');
        } else {
          alert(errorMsg);
        }
      });
    setTimeout(() => {
      commit('setLoading', false);
    }, 2 * 1000);
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
          console.log('I\'m not empty!');
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
              })
          }
          // If user is banned
          else {
            commit('setError', 'You have been banned. Please email the developer for the reason');
            commit('setLoading', false);
          }
        } else {
          console.log('I\'m empty!');
          commit('setLoading', false);
          commit('setError', {
            code: '',
            message: 'User does not exist!'
          });
        }
      })
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
