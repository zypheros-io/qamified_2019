/* eslint-disable */
import firebase from 'firebase';
import { Toast } from 'buefy/dist/components/toast';

const state = {
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
  }
};

const actions = {
  postSolution({ commit }, solution) {
    commit('setLoading', true);
    const newSolution = solution;
    const solutionKey = firebase
      .database()
      .ref()
      .child('/solution')
      .push().key;
    const updates = {};
    newSolution.id = solutionKey;
    newSolution.upvote = [];
    newSolution.downvote = [];
    updates[`/user/${newSolution.user_id}/solution/${newSolution.id}`] = true;
    updates[`/solution/${newSolution.id}`] = newSolution;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        commit('addSolution', newSolution);
        commit('setLoading', false);
        Toast.open('Solution successfully posted!');
      })
      .catch(error => {
        // eslint-disable-next-line
        console.log(error);
        commit('setLoading', false);
      });
  },
  populateSolutions({ commit }, questId) {
    firebase
      .database()
      .ref('solution')
      .orderByChild('quest_id')
      .equalTo(questId)
      .once('value', solutions => {
        if (solutions !== undefined && solutions !== null) {
          let newSolution;
          const newSolutions = [];
          solutions.forEach(solution => {
            newSolution = solution.val();
            newSolutions.push(newSolution);
          });
          commit('setSolutions', newSolutions);
          console.log(newSolutions);
        } else {
          console.log('No solutions');
        }
      });
  },
  upvoteSolution({ rootGetters }, solution) {
    const updates = {};
    const userId = rootGetters['user/getUser'].id;
    console.log(solution);
    if (solution.downvote && Object.keys(solution.downvote).includes(userId)) {
      updates[`/solution/${solution.id}/downvote/${userId}`] = null;
      updates[`/solution/${solution.id}/upvote/${userId}`] = true;
      updates[`/solution/${solution.id}/votes`] = solution.votes + 1;
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          solution.downvote[userId] = true;
          solution.votes += 1;
        })
        .catch(error => {
          console.log(error);
        });
    } else if (!Object.keys(solution.upvote).includes(userId)) {
      updates[`/solution/${solution.id}/upvote/${userId}`] = true;
      updates[`/solution/${solution.id}/votes`] = solution.votes + 1;
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          solution.upvote[userId] = true;
          solution.votes += 1;
        })
        .catch(error => {
          console.log(error);
        });
    } else if (solution.upvote.includes(userId)) {
      console.log('Already upvoted!');
    }
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
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
