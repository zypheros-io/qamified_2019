/* eslint-disable */
import firebase from 'firebase';
import { Toast } from 'buefy/dist/components/toast';

const state = {
  user: null,
  loading: false
};

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
  updateExp(state, payload) {
    state.user.experience = payload;
  },
  updateExpToLevel(state, payload) {
    state.user.level_exp = payload
  },
  updateLevel(state, payload) {
    state.user.level = payload;
  }
};

const actions = {
  initUser({ commit }, currUser) {
    commit('setLoading', true);
    firebase
      .database()
      .ref(`/user/${currUser.uid}`)
      .on('value', user => {
        if (user.val() != null) {
          commit('setUser', user.val());
        }
      });
  },
  postQuest({ commit, rootGetters }, quest) {
    commit('feed/setLoading', true, { root: true });
    
    let leveledUp = false;
    const user = rootGetters['user/getUser'];
    const newQuest = quest;
    const questKey = firebase
      .database()
      .ref()
      .child('quest')
      .push().key;
    const updates = {};

    newQuest.id = questKey;
    user.experience = user.experience + 5;

    if (user.experience >= user.level_exp) {
      user.level = user.level + 1;
      user.level_exp = user.level_exp * 2;
      leveledUp = true;
    }

    updates[`/quest/${newQuest.id}`] = newQuest;
    updates[`/user/${user.id}/experience`] = user.experience;
    updates[`/user/${user.id}/level`] = user.level;
    updates[`/user/${user.id}/level_exp`] = user.level_exp;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        Toast.open({
          message: 'Quest successfully posted!',
          duration: 3000,
          type: 'is-success'
        });
        commit('updateExp', user.experience);
        if (leveledUp) {
          commit('updateLevel', user.level);
          commit('updateExpToLevel', user.level_exp);
          Toast.open({
            message: 'Congratulations! You have leveled up!',
            duration: 5000,
            type: 'is-success'
          });
        }
        commit('feed/setLoading', false, { root: true });
      })
      .catch(error => {
        commit('feed/setLoading', false, { root: true });
        console.log(error);
      });
  },
  logOut({ commit }) {
    firebase.auth().signOut();
    commit('setUser', null);
  }
};

const getters = {
  getUser(state) {
    return state.user;
  },
  getExp(state) {
    return state.user.experience;
  },
  getExpToLevel(state) {
    return state.user.level_exp;
  },
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
