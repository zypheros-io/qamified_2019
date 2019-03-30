/* eslint-disable */
import firebase from 'firebase'
import { Toast } from 'buefy/dist/components/toast';

const state = {
  users: []
};

const mutations = {
  setUsers(state, payload) {
    state.users = payload;
  }
};

const actions = {
  retrieveData({ commit }) {
    // Access db/users
    firebase
      .database()
      .ref('user')
      .on('value', users => {
        // Array of users
        let userArray = [];
        users.forEach(user => {
          let u = user.val();
          u.id = u.id;
          // Add user to array
          userArray.unshift(u);
        });
        commit('setUsers', userArray);
      });
  },
  banUser({ commit }, user) {
    const banId = user.id;
    const updates = {}
    console.log(banId);
    updates[`user/${banId}/is_banned`] = true
    console.log(updates);
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        Toast.open({
          message: 'User has been banned',
          duration: 3000,
          type: 'is-danger'
        });
      })
      .catch(error => {
        console.log(error);
      })
  }
};

const getters = {
  users(state) {
    return state.users;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
