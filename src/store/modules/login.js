/* eslint-disable */
import firebase from 'firebase';

const state = {
  loading: false
};

const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
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
        commit('setLoading', false);
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
        commit('setLoading', false);
      });
  },
  usernameLogin({ commit }, payload) {
    commit('setLoading', true);
    firebase
      .database()
      .ref('user')
      .orderByChild('username')
      .equalTo(payload.email)
      .limitToFirst(1)
      .once('value', user => {
        if (user !== undefined && user !== null) {
          let matchingUser;
          user.forEach(u => {
            matchingUser = u.val();
          });
          firebase
            .auth()
            .signInWithEmailAndPassword(matchingUser.email, payload.password)
            .then(user => {
              commit('user/setUser', user, { root: true });
              commit('setLoading', false);
            })
            .catch(error => {
              const errorCode = error.code;
              const errorMsg = error.message;
              if (errorCode === 'auth/wrong-password') {
                alert('Incorrect password, please try again.');
              } else if (errorCode === 'auth/user-not-found') {
                alert('The user is not in the database, please try again.');
              } else {
                alert(errorMsg);
              }
            });
        } else {
          commit('setLoading', false);
          alert('The user is not in the database, please try again.');
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
