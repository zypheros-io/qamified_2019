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
  postReply({ commit, rootGetters }, reply) {
    commit('setLoading', true);

    let leveledUp = false;
    const user = rootGetters['user/getUser'];
    const newReply = reply;
    const replyKey = firebase
      .database()
      .ref()
      .child('/reply')
      .push().key;
    const updates = {};

    newReply.id = replyKey;
    user.experience = user.experience + 3;

    if (user.experience >= user.level_exp) {
      user.level = user.level + 1;
      user.level_exp = user.level_exp * 2;
      leveledUp = true;
    }

    updates[`reply/${newReply.id}`] = newReply;
    updates[`user/${user.id}/solution/${newReply.id}`] = true;
    updates[`user/${user.id}/experience`] = user.experience;
    updates[`user/${user.id}/level`] = user.level;
    updates[`user/${user.id}/level_exp`] = user.level_exp;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        Toast.open({
          message: 'Reply successfully posted!',
          duration: 3000,
          type: 'is-success'
        });
        // commit('addReply', newReply);
        commit('user/updateExp', user.experience, { root: true });
        if (leveledUp) {
          commit('user/updateLevel', user.level, { root: true });
          commit('user/updateExpToLevel', user.level_exp, { root: true });
          Toast.open({
            message: 'Congratulations! You have leveled up!',
            duration: 5000,
            type: 'is-success'
          });
        }
        commit('setLoading', false);
      })
      .catch(error => {
        console.log(error);
        commit('setLoading', false);
      });
  },
  populateReplies({ commit }, solutionId) {
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
  deleteReply({ commit }, replyId) {
    console.log(replyId);
    const updates = {};
    firebase
      .database()
      .ref(`reply/${replyId}`)
      .on('value', () => {
        updates[`reply/${replyId}`] = null;
      })

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        Toast.open('Reply has been deleted')
      })
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
