/* eslint-disable */
import firebase from 'firebase';
import { Toast } from 'buefy/dist/components/toast';

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
    // get current quest
    const quest = rootGetters['feed/loadQuest'](solution.quest_id);
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        dispatch('user/updateLogs', 'POST_SOLUTION', { root: true });
        dispatch('user/addExperience', null, { root: true });
        dispatch('notification/addSolutionNotification', quest, { root: true });
        // Event alert
        Toast.open({
          message: 'Solution successfully posted!',
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
          dispatch('user/updateLogs', 'UPVOTE_SOLUTION', { root: true });
          dispatch('user/addReputation', solution.user_id, { root: true });
          solution.votes += 1;
        })
        .catch(error => {
          console.log(error);
        })
    }
    // downvotes doesn't exist and wants upvote
    else if (!solution.upvote || !Object.keys(solution.upvote).includes(user.id)) {
      updates[`/solution/${solution.id}/upvote/${user.id}`] = true;
      updates[`/solution/${solution.id}/votes`] = solution.votes + 1;
      // Commit changes
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          dispatch('user/updateLogs', 'UPVOTE_SOLUTION', { root: true });
          dispatch('user/addReputation', solution.user_id, { root: true });
          solution.votes += 1;
        })
        .catch(error => {
          console.log(error);
        })
    }
    // upvote when already upvoted
    else if (Object.keys(solution.upvote).includes(user.id)) {
      Toast.open({
        message: 'You have already upvoted this solution, adventurer!',
        duration: 1000,
        type: 'is-danger'
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
          dispatch('user/updateLogs', 'DOWNVOTE_SOLUTION', { root: true });
          dispatch('user/deductReputation', solution.user_id, { root: true });
          solution.votes -= 1;
        })
        .catch(error => {
          console.log(error);
        })
    }
    // Wants to downvote
    else if (!solution.downvote || !Object.keys(solution.downvote).includes(user.id)) {
      updates[`/solution/${solution.id}/downvote/${user.id}`] = true;
      updates[`/solution/${solution.id}/votes`] = solution.votes -= 1;
      // Commit changes to database
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          dispatch('user/updateLogs', 'DOWNVOTE_SOLUTION', { root: true });
          dispatch('user/deductReputation', solution.user_id, { root: true });
        })
        .catch(error => {
          console.log(error);
        })
    }
    // Downvote when already downvoted
    else if (Object.keys(solution.downvote).includes(user.id)) {
      Toast.open({
        message: 'You have already downvoted this solution, adventurer!',
        duration: 1000,
        type: 'is-danger'
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
