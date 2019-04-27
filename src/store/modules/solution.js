/* eslint-disable */
import firebase from 'firebase';
import { Toast } from 'buefy/dist/components/toast';
import { Dialog } from 'buefy/dist/components/dialog';
import { Snackbar } from 'buefy/dist/components/snackbar';

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
  postReply({ commit, dispatch, rootGetters }, reply) {
    console.log(reply);
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
    // Clear mission
    const user = rootGetters['user/getUser'];
    const missions = rootGetters['user/getMissions'];
    const missionIndex = missions.findIndex(
      mission => mission.requirements.context === 'Post Reply'
    );
    const currMission = user.missions[missionIndex];
    console.log(currMission);
    // Check if mission exists
    if (missionIndex !== -1) {
      let newCurrent = currMission.requirements.current + 1;
      updates[
        `user/${user.id}/missions/${missionIndex}/requirements/current`
      ] = newCurrent;
      // Check if mission is done
      if (newCurrent === currMission.requirements.required) {
        // Update status of mission
        updates[`user/${user.id}/missions/${missionIndex}/done`] = true;
        Dialog.alert({
          title: 'Mission cleared!',
          message:
            "You have cleared a mission! Here's a trophy for your efforts, adventurer!",
          type: 'is-success'
        });
        dispatch(
          'user/addExperience',
          { authorId: user.id, experience: currMission.experience },
          { root: true }
        );
      }
    }
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        // Commit changes to local storage
        dispatch('user/updateLogs', 'POST_REPLY', { root: true });
        dispatch(
          'user/addExperience',
          { authorId: user.id, experience: 3 },
          { root: true }
        );
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
  },
  /*
    Marks or unmarks a solution posted by a user
    Rewards the solution author accordingly
  */
  markAsAnswer({ dispatch }, payload) {
    const updates = {};
    if (!payload.is_correct) {
      updates[`solution/${payload.id}/is_correct`] = true;
      // Set quest as answered
      updates[`quest/${payload.quest_id}/is_answered`] = true;
      // Update database
      console.log(updates);
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          Snackbar.open({
            message: 'Solution marked as correct',
            type: 'is-success',
            duration: 3000
          });
          dispatch(
            'user/addReputation',
            { authorId: payload.user_id, reputation: 15 },
            { root: true }
          );
          dispatch(
            'user/addExperience',
            { authorId: payload.user_id, experience: 10 },
            { root: true }
          );
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      updates[`solution/${payload.id}/is_correct`] = false;
      updates[`quest/${payload.quest_id}/is_answered`] = false;
      console.log(updates);
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          Snackbar.open({
            message: 'Solution unmarked',
            type: 'is-success',
            duration: 3000
          });
          dispatch(
            'user/deductReputation',
            { authorId: payload.user_id, reputation: 15 },
            { root: true }
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
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
