/* eslint-disable */
import firebase from 'firebase';
import moment from 'moment';
import { Dialog } from 'buefy/dist/components/dialog';
import { Toast } from 'buefy/dist/components/toast';

const state = {
  user: null,
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
          user = u.val();
        }
      });
    
    console.log(user);
    commit('setProfileUser', user);
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
