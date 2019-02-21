/* eslint-disable */
import firebase from 'firebase';
import { Toast } from 'buefy/dist/components/toast';

const state = {
  replies: [],
  loading: false
};

const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  addReply(state, reply) {
    state.replies.push(reply);
  }
};

const actions = {
  postReply({ commit }, reply) {
    commit('setLoading', true);
    const newReply = reply;
    const replyKey = firebase
      .database()
      .ref()
      .child('/reply')
      .push().key;
    const updates = {};
    newReply.id = replyKey;
    updates[`/user/${newReply.user_id}/solution/${newReply.id}`] = true;
    updates[`/reply/${newReply.id}`] = newReply;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        commit('addReply', newReply);
        commit('setLoading', false);
        Toast.open('Reply successfully added!');
      })
      .catch(error => {
        console.log(error);
        commit('setLoading', false);
      })
  },
};

const getters = {
  isLoading(state) {
    return state.loading;
  },
  filteredReplies(state, solutionId) {
    return state.replies;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}