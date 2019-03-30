/* eslint-disable */
import firebase from 'firebase';
import moment from 'moment';

const state = {
  loading: false
};

const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  }
};

const actions = {
  signUp({ commit }, payload) {
    commit('setLoading', true);
    console.log(state.loading);
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const newUser = {
          id: user.user.uid,
          email: payload.email,
          username: payload.username,
          fname: payload.firstname,
          lname: payload.lastname,
          institution: payload.institution,
          is_banned: false,
          is_admin: false,
          description: '',
          level: 1,
          level_cap: 20,
          experience: 0,
          rank: 'Novice',
          reputation: 0,
          badge_url: '../../static/badges/chevron-1.png',
          date_created: moment().format(),
          last_access: moment().format()
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
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
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
