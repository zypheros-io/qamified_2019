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
  postReply({ commit, dispatch }, reply) {
    // Set loading
    commit('setLoading', true);
    const newReply = reply;
    // Generate new reply key
    const replyKey = firebase
      .database()
      .ref()
      .child('/reply')
      .push().key;
    newReply.id = replyKey;
    // Store changes
    const updates = {};
    updates[`reply/${newReply.id}`] = newReply;
    updates[`user/${reply.user_id}/solution/${newReply.id}`] = true;
    // Commit changes to database
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        // Commit changes to local storage
        dispatch('user/updateLogs', 'POST_REPLY', { root: true });
        dispatch('user/addExperience', null, { root: true });
        // Event alert
        Toast.open({
          message: 'Reply successfully posted!',
          duration: 3000,
          type: 'is-success'
        });
        commit('setLoading', false);
      })
      .catch(error => {
        console.log(error);
        commit('setLoading', false);
      });
  },
  populateReplies({ commit }) {
    // Retrieve replies from database
    firebase
      .database()
      .ref('reply')
      .on('value', replies => {
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
  deleteReply({ dispatch }, replyId) {
    // Store changes
    const updates = {};
    firebase
      .database()
      .ref(`reply/${replyId}`)
      .on('value', () => {
        updates[`reply/${replyId}`] = null;
      });
    // Commit changes to database
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        // Event alert
        dispatch('user/updateLogs', 'DELETE_REPLY', { root: true });
        Toast.open('Reply has been deleted');
      })
      .catch(error => {
        console.log(error);
      });
  }
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
