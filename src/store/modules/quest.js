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
            'You have cleared a mission and received a trophy! Visit your headquarters to see it!',
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
        dispatch('user/updateLogs', 'POST_SOLUTION', { root: true });
        dispatch(
          'user/addExperience',
          { authorId: user.id, experience: 7 },
          { root: true }
        );
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
            const upvotes = [];
            const downvotes = [];
            if (newSolution.upvote) {
              Object.keys(newSolution.upvote).forEach(u => {
                upvotes.push(u);
              });
            }
            if (newSolution.downvote) {
              Object.keys(newSolution.downvote).forEach(d => {
                downvotes.push(d);
              });
            }
            newSolution.upvote = upvotes;
            newSolution.downvote = downvotes;
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
    if (solution.downvote.includes(user.id)) {
      updates[`/solution/${solution.id}/downvote/${user.id}`] = null;
      updates[`/solution/${solution.id}/upvote/${user.id}`] = true;
      updates[`/solution/${solution.id}/votes`] = solution.votes + 1;
      console.log('upvote when downvote', updates);
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          Snackbar.open({
            message: 'Solution successfully upvoted!',
            type: 'is-success',
            duration: 1000
          });
          dispatch('user/updateLogs', 'UPVOTE_SOLUTION', { root: true });
          solution.votes += 1;
        })
        .catch(error => {
          console.log(error);
        });
    } else if (!solution.upvote.includes(user.id)) {
      updates[`/solution/${solution.id}/upvote/${user.id}`] = true;
      updates[`/solution/${solution.id}/votes`] = solution.votes + 1;
      console.log('upvote only', updates);
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          Snackbar.open({
            message: 'Solution successfully upvoted!',
            type: 'is-success',
            duration: 1000
          });
          dispatch('user/updateLogs', 'UPVOTE_SOLUTION', { root: true });
          solution.votes += 1;
        })
        .catch(error => {
          console.log(error);
        });
    } else if (solution.upvote.includes(user.id)) {
      updates[`/solution/${solution.id}/upvote/${user.id}`] = null;
      updates[`/solution/${solution.id}/votes/`] = solution.votes - 1;
      console.log('nadah');
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          Snackbar.open({
            message: 'Upvote removed',
            type: 'is-success',
            duration: 1000
          });
          solution.votes -= 1;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  downvoteSolution({ dispatch, rootGetters }, solution) {
    const updates = {};
    const user = rootGetters['user/getUser'];
    if (solution.upvote.includes(user.id)) {
      updates[`/solution/${solution.id}/upvote/${user.id}`] = null;
      updates[`/solution/${solution.id}/downvote/${user.id}`] = true;
      updates[`/solution/${solution.id}/votes`] = solution.votes - 1;
      console.log('downvote when downvote', updates);
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          Snackbar.open({
            message: 'Solution successfully downvoted!',
            type: 'is-success',
            duration: 1000
          });
          dispatch('user/updateLogs', 'DOWNVOTE_SOLUTION', { root: true });
          solution.votes -= 1;
        })
        .catch(error => {
          console.log(error);
        });
    } else if (!solution.downvote.includes(user.id)) {
      updates[`/solution/${solution.id}/downvote/${user.id}`] = true;
      updates[`/solution/${solution.id}/votes`] = solution.votes - 1;
      console.log('upvote only', updates);
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          Snackbar.open({
            message: 'Solution successfully upvoted!',
            type: 'is-success',
            duration: 1000
          });
          dispatch('user/updateLogs', 'DOWNVOTE_SOLUTION', { root: true });
          solution.votes -= 1;
        })
        .catch(error => {
          console.log(error);
        });
    } else if (solution.downvote.includes(user.id)) {
      updates[`/solution/${solution.id}/downvote/${user.id}`] = null;
      updates[`/solution/${solution.id}/votes/`] = solution.votes + 1;
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          Snackbar.open({
            message: 'Downvote removed!',
            type: 'is-success',
            duration: 1000
          });
          solution.votes += 1;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  deleteSolution({ dispatch, rootGetters }, solutionId) {
    const user = rootGetters[`user/getUser`];
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

    updates[`user/${user.id}/solution/${solutionId}`] = null;
    // commit changes
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        dispatch('user/updateLogs', 'DELETE_SOLUTION', { root: true });
        Snackbar.open({
          message: 'Solution successfully deleted!',
          type: 'is-success',
          duration: 1000
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  submitFlagToAdmin({ dispatch }, payload) {
    const newFlag = payload;
    const flagKey = firebase
      .database()
      .ref()
      .child('/flags')
      .push().key;
    newFlag.id = flagKey;
    const updates = {};
    updates[`/flags/${newFlag.id}`] = newFlag;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        dispatch('user/updateLogs', 'SUBMIT_FLAG', { root: true });
        Snackbar.open({
          message: 'Flag ticket successfully submitted for review',
          type: 'is-success',
          duration: 1000
        });
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
    return state.solutions.sort((solutionA, solutionB) => {
      return solutionB.votes - solutionA.votes;
    });
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
