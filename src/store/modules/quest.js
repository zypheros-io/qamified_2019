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
  postSolution({ commit, dispatch}, solution) {
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
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        dispatch('user/updateLogs', 'POST_SOLUTION', { root: true });
        dispatch('user/addExperience', null,   { root: true });
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
    if (solution.downvote && Object.keys(solution.downvote).includes(solution.user_id)) {
      // Store changes
      updates[`/solution/${solution.id}/downvote/${solution.user_id}`] = null;
      updates[`/solution/${solution.id}/upvote/${solution.user_id}`] = true;
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
        });
    } else if (!solution.upvote || !Object.keys(solution.upvote).includes(solution.user_id)) {
      // Store changes
      updates[`/solution/${solution.id}/upvote/${solution.user_id}`] = true;
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
        });
    } else if (Object.keys(solution.upvote).includes(solution.user_id)) {
      // Event alert
      Toast.open({
        message: 'You have already upvoted this solution!',
        duration: 3000,
        type: 'is-danger'
      })
    }
  },
  downvoteSolution({ dispatch, rootGetters }, solution) {
    const updates = {}
    if (solution.upvote && Object.keys(solution.upvote).includes(solution.user_id)) {
      // Store changes
      updates[`solution/${solution.id}/upvote/${solution.user_id}`] = null;
      updates[`solution/${solution.id}/downvote/${solution.user_id}`] = true;
      updates[`solution/${solution.id}/votes`] = solution.votes - 1;
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
        });
    } else if (!solution.downvote || !Object.keys(solution.downvote).includes(solution.user_id)) {
      // Store changes
      updates[`solution/${solution.id}/downvote/${user.id}`] = true;
      updates[`solution/${solution.id}/votes`] = solution.votes -= 1;
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
        });
    } else if (Object.keys(solution.downvote).includes(solution.user_id)) {
      Toast.open({
        message: 'You have already downvoted this solution!',
        duration: 3000,
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
