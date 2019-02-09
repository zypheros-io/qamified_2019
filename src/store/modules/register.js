/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import firebase from 'firebase';
import moment from 'moment';

const state = {
  loading: false,
};

const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
};

const actions = {
  signUp({ commit }, payload) {
    commit('setLoading', true);
    firebase.auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        const newUser = {
          id: user.user.uid,
          email: payload.email,
          username: payload.username,
          fname: payload.firstname,
          lname: payload.lastname,
          institution: payload.institution,
          is_banned: false,
          description: '',
          level: 1,
          points: 0,
          experience: 0,
          level_exp: 50,
          rank: 'Beginner',
          date_created: moment().format(),
          last_access: moment().format(),
        };
        const updates = {};
        updates[`/user/${newUser.id}`] = newUser;

        firebase.database()
          .ref()
          .update(updates)
          .then(() => {
            commit('user/setUser', newUser, { root: true });
            commit('setLoading', false);
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
          });
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  },
};

const getters = {
  isLoading() {
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
