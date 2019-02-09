/* eslint-disable */
import firebase from 'firebase';

const state = {
  solutions: [],
  loading: false,
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
    updates[`/user/${newSolution.user_id}/solution/${newSolution.id}`] = true;
    updates[`/solution/${newSolution.id}`] = newSolution;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        commit('addSolution', newSolution);
        commit('setLoading', false);
      })
      .catch((error) => {
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
          })
          commit('setSolutions', newSolutions);
        } else {
          console.log('No solutions');
        }
      });
  }
}

const getters = {
  isLoading(state) {
    return state.loading;
  },
  sortedSolutions(state) {
    return state.solutions;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
