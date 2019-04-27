/* eslint-disable */
import firebase from 'firebase';
import { Snackbar } from 'buefy/dist/components/snackbar';
import { Dialog } from 'buefy/dist/components/dialog';

const state = {
  quest: {},
  solutions: [],
  loading: false
};

const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  addSolution(state, solution) {
    state.solutions.push(solution);
  },
  setSolutions(state, newSolutions) {
    state.solutions = newSolutions;
  },
  setQuest(state, quest) {
    state.quest = quest;
  }
};

const actions = {
  postSolution({ commit, dispatch, rootGetters }, solution) {
    // Set loading
    commit('setLoading', true);
    const newSolution = solution;
    // Generate new solution key
    const solutionKey = firebase
      .database()
      .ref()
      .child('/solution')
      .push().key;
    newSolution.id = solutionKey;
    newSolution.upvote = {};
    newSolution.downvote = {};
    // Store changes
    const updates = {};
    updates[`/user/${newSolution.user_id}/solution/${newSolution.id}`] = true;
    updates[`/solution/${newSolution.id}`] = newSolution;
    // Commit changes to database
    const user = rootGetters['user/getUser'];
    const missions = rootGetters['user/getMissions'];
    const missionIndex = missions.findIndex(
      mission => mission.requirements.context === 'Post Solution'
    );
    const currMission = user.missions[missionIndex];
    console.log(currMission);
    // If mission exists
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
        dispatch('user/addExperience', currMission.experience, { root: true });
      }
    }
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        dispatch('user/updateLogs', 'POST_SOLUTION', { root: true });
        dispatch('user/addExperience', 5, { root: true });
        // Event alert
        Snackbar.open({
          message: 'Quest has been successfully posted',
          type: 'is-success',
          duration: 3000
        });
        commit('setLoading', false);
      })
      .catch(error => {
        console.log(error);
        commit('setLoading', false);
      });
  },
  populateSolutions({ commit }, questId) {
    // Retrieve solutions from database
    firebase
      .database()
      .ref('solution')
      .orderByChild('quest_id')
      .equalTo(questId)
      .on('value', solutions => {
        if (solutions !== undefined && solutions !== null) {
          let newSolution;
          const newSolutions = [];
          solutions.forEach(solution => {
            newSolution = solution.val();
            newSolutions.push(newSolution);
          });
          commit('setSolutions', newSolutions);
        } else {
          console.log('No solutions');
        }
      });
  },
  upvoteSolution({ dispatch, rootGetters }, solution) {
    const updates = {};
    const user = rootGetters['user/getUser'];
    // downvotes exist and wants upvote
    if (solution.downvote && Object.keys(solution.downvote).includes(user.id)) {
      updates[`/solution/${solution.id}/downvote/${user.id}`] = null;
      updates[`/solution/${solution.id}/upvote/${user.id}`] = true;
      updates[`/solution/${solution.id}/votes`] = solution.votes + 1;
      // Commit changes to database
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          Snackbar.open({
            message: 'Solution upvoted!',
            type: 'is-success',
            duration: 3000
          });
          dispatch('user/updateLogs', 'UPVOTE_SOLUTION', { root: true });
          dispatch('user/addReputation', { authorId: solution.user_id, reputation: 3 }, { root: true });
          solution.votes += 1;
        })
        .catch(error => {
          console.log(error);
        });
    }
    // downvotes doesn't exist and wants upvote
    else if (
      !solution.upvote ||
      !Object.keys(solution.upvote).includes(user.id)
    ) {
      updates[`/solution/${solution.id}/upvote/${user.id}`] = true;
      updates[`/solution/${solution.id}/votes`] = solution.votes + 1;
      // Commit changes
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          Snackbar.open({
            message: 'Solution upvoted!',
            type: 'is-success',
            duration: 3000
          });
          dispatch('user/updateLogs', 'UPVOTE_SOLUTION', { root: true });
          dispatch('user/addReputation', { authorId: solution.user_id, reputation: 3 }, { root: true });
          solution.votes += 1;
        })
        .catch(error => {
          console.log(error);
        });
    }
    // upvote when already upvoted
    else if (Object.keys(solution.upvote).includes(user.id)) {
      updates[`solution/${solution.id}/upvotes/${user.id}`] = false;
      updates[`solution/${solution.id}/votes`] = solution.votes - 1;
      
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          solution.votes -= 1;
        })
        .catch(error => {
          console.log(error);
        })
    }
  },
  downvoteSolution({ dispatch, rootGetters }, solution) {
    const updates = {};
    const message = 'hellothere';
    const user = rootGetters['user/getUser'];
    // Upvotes exist and wants downvote
    if (!solution.upvote && Object.keys(solution.upvote).includes(user.id)) {
      updates[`/solution/${solution.id}/upvote/${user.id}`] = null;
      updates[`/solution/${solution.id}/downvote/${user.id}`] = true;
      updates[`/solution/${solution.id}/votes`] = solution.votes - 1;
      // Commit changes to database
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          Snackbar.open({
            message: 'Solution downvoted!',
            type: 'is-success',
            duration: 3000
          });
          dispatch('user/updateLogs', 'DOWNVOTE_SOLUTION', { root: true });
          dispatch('user/deductReputation', { authorId: solution.user_id, reputation: 3 }, { root: true });
          solution.votes -= 1;
        })
        .catch(error => {
          console.log(error);
        });
    }
    // Wants to downvote
    else if (
      !solution.downvote ||
      !Object.keys(solution.downvote).includes(user.id)
    ) {
      updates[`/solution/${solution.id}/downvote/${user.id}`] = true;
      updates[`/solution/${solution.id}/votes`] = solution.votes -= 1;
      // Commit changes to database
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          Snackbar.open({
            message: 'Solution downvoted!',
            type: 'is-success',
            duration: 3000
          });
          dispatch('user/updateLogs', 'DOWNVOTE_SOLUTION', { root: true });
          dispatch('user/deductReputation', { authorId: solution.user_id, reputation: 3 }, { root: true });
        })
        .catch(error => {
          console.log(error);
        });
    }
    // Downvote when already downvoted
    else if (Object.keys(solution.downvote).includes(user.id)) {
      updates[`solution/${solution.id}/downvote/${user.id}`] = false;
      updates[`solution/${solution.id}/votes`] = solution.votes + 1;
      
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          solution.votes += 1;
        })
        .catch(error => {
          console.log(error);
        })
    }
  },
  deleteSolution({ dispatch }, solutionId) {
    const updates = {};
    // find all replies to solution
    firebase
      .database()
      .ref('reply')
      .orderByChild('solution_id')
      .equalTo(solutionId)
      .on('value', replies => {
        if (replies !== undefined && replies !== null) {
          let currReply;
          replies.forEach(reply => {
            currReply = reply.val();
            updates[`reply/${currReply.id}`] = null;
          });
        }
      });
    // find all solutions
    firebase
      .database()
      .ref(`solution/${solutionId}`)
      .on('value', () => {
        updates[`solution/${solutionId}`] = null;
      });
    // commit changes
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        dispatch('user/updateLogs', 'DELETE_SOLUTION', { root: true });
        Toast.open('Solution has been deleted!');
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
  sortedSolutions(state) {
    return state.solutions;
  },
  loadSolution(state) {
    return solutionId => {
      return state.solutions.find(solution => {
        return solution.id === solutionId;
      });
    };
  },
  loadQuest(state) {
    return state.quest;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
