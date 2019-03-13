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
  postSolution({ commit, dispatch, rootGetters }, solution) {
    commit('setLoading', true);

    let leveledUp = false;
    const user = rootGetters['user/getUser'];
    const newSolution = solution;
    const solutionKey = firebase
      .database()
      .ref()
      .child('/solution')
      .push().key;
    const updates = {};

    newSolution.id = solutionKey;
    newSolution.upvote = {};
    newSolution.downvote = {};
    user.experience = user.experience + 5;

    if (user.experience >= user.level_exp) {
      user.level = user.level + 1;
      user.level_exp = user.level_exp * 2;
      console.log('success');
      leveledUp = true;
    }

    updates[`/user/${newSolution.user_id}/solution/${newSolution.id}`] = true;
    updates[`/solution/${newSolution.id}`] = newSolution;
    updates[`user/${user.id}/experience`] = user.experience;
    updates[`user/${user.id}/level_exp`] = user.level_exp;
    updates[`user/${user.id}/level`] = user.level;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        Toast.open({
          message: 'Solution successfully posted!',
          duration: 3000,
          type: 'is-success'
        });
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
        dispatch('user/updateLogs', 'POST_SOLUTIION', { root: true });
        commit('setLoading', false);
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
          dispatch('user/updateLogs', 'UPVOTE_SOLUTION', { root: true });
          dispatch('user/addReputation', solution.user_id, { root: true });
          solution.votes += 1;
        })
        .catch(error => {
          console.log(error);
        });
    } else if (
      !solution.upvote ||
      !Object.keys(solution.upvote).includes(userId)
    ) {
      updates[`/solution/${solution.id}/upvote/${userId}`] = true;
      updates[`/solution/${solution.id}/votes`] = solution.votes + 1;
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
    } else if (Object.keys(solution.upvote).includes(userId)) {
      console.log('Already upvoted!');
    }
  },
  downvoteSolution({ dispatch, rootGetters }, solution) {
    const updates = {};
    const user = rootGetters['user/getUser'];

    if (solution.upvote && Object.keys(solution.upvote).includes(user.id)) {
      updates[`solution/${solution.id}/upvote/${user.id}`] = null;
      updates[`solution/${solution.id}/downvote/${user.id}`] = true;
      updates[`solution/${solution.id}/votes`] = solution.votes - 1;

      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          console.log('succ downvote');
          dispatch('user/updateLogs', 'DOWNVOTE_SOLUTION', { root: true });
          dispatch('user/deductReputation', solution.user_id, { root: true });
          solution.votes -= 1;
        })
        .catch(error => {
          console.log(error);
        });
    } else if (
      !solution.downvote ||
      !Object.keys(solution.downvote).includes(user.id)
    ) {
      updates[`solution/${solution.id}/downvote/${user.id}`] = true;
      updates[`solution/${solution.id}/votes`] = solution.votes -= 1;

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
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
