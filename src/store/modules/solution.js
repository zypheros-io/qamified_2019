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
  },
  setReplies(state, newReplies) {
    state.replies = newReplies;
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
      });
  },
  populateReplies({ commit }, solutionId) {
    console.log(solutionId)
    firebase
      .database()
      .ref('reply')
      .orderByChild('solution_id')
      .equalTo(solutionId)
      .once('value', replies => {
        if (replies !== undefined && replies !== null) {
          let newReply;
          const newReplies = [];
          replies.forEach(reply => {
            newReply = reply.val();
            newReplies.push(newReply);
          });
          commit('setReplies', newReplies);
        } else {
          console.log('No replies');
        }
      });
  },
};

const getters = {
  isLoading(state) {
    return state.loading;
  },
  replies(state) {
    return state.replies;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
