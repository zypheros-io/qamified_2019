/* eslint-disable */
import firebase from 'firebase';
import { Snackbar } from 'buefy/dist/components/snackbar';
import { Dialog } from 'buefy/dist/components/dialog';

const state = {
  quests: [],
  loading: false
};

const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setQuests(state, quests) {
    state.quests = quests;
  }
};

const actions = {
  postQuest({ commit, dispatch, rootGetters }, quest) {
    commit('setLoading', true);
    // Store quest to a variable
    const newQuest = quest;
    // Generate new quest key
    const questKey = firebase
      .database()
      .ref()
      .child('quest')
      .push().key;
    // Store quest key
    newQuest.id = questKey;
    // Store updates
    const updates = {};
    updates[`/quest/${newQuest.id}`] = newQuest;
    // Update mission
    const user = rootGetters['user/getUser'];
    const missions = rootGetters['user/getMissions'];
    // Get current mission index
    const missionIndex = missions.findIndex(
      mission => mission.requirements.context === 'Post Quest'
    );
    // Retrieve current mission
    const currMission = user.missions[missionIndex];
    // If mission exists
    if (missionIndex !== -1) {
      let newCurrent = currMission.requirements.current + 1;
      // Store updates
      updates[
        `user/${user.id}/missions/${missionIndex}/requirements/current`
      ] = newCurrent;
      // Check if mission is already done
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
    // Commit changes to database
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        // Alert user of event
        Snackbar.open({
          message: 'Quest has been successfully posted',
          type: 'is-success',
          duration: 3000
        });
        // Commit changes to local storage
        dispatch('user/updateLogs', 'POST_QUEST', { root: true });
        dispatch(
          'user/addExperience',
          { authorId: user.id, experience: 5 },
          { root: true }
        );
        commit('setLoading', false);
      })
      .catch(error => {
        commit('setLoading', false);
        console.log(error);
      });
  },
  populateFeed({ commit }) {
    // Retrieve quests from database
    firebase
      .database()
      .ref('/quest')
      .on('value', quests => {
        if (quests) {
          const questArray = [];
          quests.forEach(quest => {
            const currQuest = quest.val();
            const upvotes = [];
            const downvotes = [];
            const solutions = [];
            currQuest.id = quest.key;
            if (currQuest.upvote) {
              Object.keys(currQuest.upvote).forEach(upvote => {
                upvotes.push(upvote);
              });
            }
            if (currQuest.downvote) {
              Object.keys(currQuest.downvote).forEach(downvote => {
                downvotes.push(downvote);
              });
            }
            if (currQuest.solutions) {
              Object.keys(currQuest.solutions).forEach(solution => {
                solutions.push(solution);
              });
            }
            currQuest.upvote = upvotes;
            currQuest.downvote = downvotes;
            currQuest.solutions = solutions;
            questArray.unshift(currQuest);
          });
          commit('setQuests', questArray);
        }
      });
  },
  upvoteQuest({ dispatch, rootGetters }, quest) {
    const user = rootGetters['user/getUser'];
    const updates = {};
    // upvote while in downvote
    if (quest.downvote.includes(user.id)) {
      updates[`/quest/${quest.id}/downvote/${user.id}`] = null;
      updates[`/quest/${quest.id}/upvote/${user.id}`] = true;
      updates[`/quest/${quest.id}/votes`] = quest.votes + 1;
      // Commit changes to database
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          Snackbar.open({
            message: 'Quest upvoted!',
            type: 'is-success',
            duration: 1000
          });
          dispatch('user/updateLogs', 'UPVOTE_QUEST', { root: true });
          quest.votes += 1;
        })
        .catch(error => {
          console.log(error);
        });
    }
    // upvote if not in downvote
    else if (!quest.upvote.includes(user.id)) {
      updates[`/quest/${quest.id}/upvote/${user.id}`] = true;
      updates[`/quest/${quest.id}/votes`] = quest.votes + 1;
      // Commit changes to database
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          Snackbar.open({
            message: 'Quest upvoted!',
            type: 'is-success',
            duration: 1000
          });
          dispatch('user/updateLogs', 'UPVOTE_QUEST', { root: true });
          quest.votes += 1;
        })
        .catch(error => {
          console.log(error);
        });
    }
    // upvote if already upvoted
    else if (quest.upvote.includes(user.id)) {
      updates[`/quest/${quest.id}/upvote/${user.id}`] = null;
      updates[`/quest/${quest.id}/votes`] = quest.votes - 1;
      // Commit changes to database
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          quest.votes -= 1;
          Snackbar.open({
            message: 'Upvote removed!',
            type: 'is-success',
            duration: 1000
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  downvoteQuest({ dispatch, rootGetters }, quest) {
    const user = rootGetters['user/getUser'];
    const updates = {};
    // downvote if included in upvote
    if (quest.upvote.includes(user.id)) {
      updates[`/quest/${quest.id}/upvote/${user.id}`] = null;
      updates[`/quest/${quest.id}/downvote/${user.id}`] = true;
      updates[`/quest/${quest.id}/votes`] = quest.votes - 1;
      // Commit changes to database
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          Snackbar.open({
            message: 'Quest downvoted!',
            type: 'is-success',
            duration: 1000
          });
          dispatch('user/updateLogs', 'DOWNVOTE_QUEST', { root: true });
          quest.votes -= 1;
        })
        .catch(error => {
          console.log(error);
        });
    }
    // downvote if not included in upvote
    else if (!quest.downvote.includes(user.id)) {
      updates[`/quest/${quest.id}/downvote/${user.id}`] = true;
      updates[`/quest/${quest.id}/votes`] = quest.votes - 1;
      // Commit changes to database
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          Snackbar.open({
            message: 'Quest downvoted!',
            type: 'is-success',
            duration: 1000
          });
          dispatch('user/updateLogs', 'DOWNVOTE_QUEST', { root: true });
          quest.votes -= 1;
        })
        .catch(error => {
          console.log(error);
        });
    }
    // downvote if already downvoted
    else if (quest.downvote.includes(user.id)) {
      updates[`/quest/${quest.id}/downvote/${user.id}`] = null;
      updates[`/quest/${quest.id}/votes`] = quest.votes + 1;
      // Commit changes to database
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
          quest.votes += 1;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  deleteQuest({ dispatch }, questId) {
    const updates = {};

    firebase
      .database()
      .ref('solution')
      .orderByChild('quest_id')
      .equalTo(questId)
      .once('value', solutions => {
        if (solutions !== null && solutions !== undefined) {
          let currSolution;
          solutions.forEach(solution => {
            currSolution = solution.val();
            firebase
              .database()
              .ref('reply')
              .orderByChild('solution_id')
              .equalTo(currSolution.id)
              .on('value', replies => {
                let currReply;
                replies.forEach(reply => {
                  currReply = reply.val();
                  updates[`reply/${currReply.id}`] = null;
                });
                updates[`solution/${currSolution.id}`] = null;
                firebase
                  .database()
                  .ref()
                  .update(updates)
                  .catch(error => {
                    console.log(error);
                  });
              });
          });
        }
      });

    firebase
      .database()
      .ref(`quest/${questId}`)
      .on('value', () => {
        updates[`quest/${questId}`] = null;
      });

    console.log(updates);
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        Snackbar.open({
          message: 'Quest successfully deleted',
          type: 'is-success',
          duration: 1000
        });
        dispatch('user/updateLogs', 'DELETE_QUEST', { root: true });
      })
      .catch(error => {
        console.log(error);
      });
  },
  flagAsDuplicate({ dispatch }, quest) {
    const updates = {};
    updates[`quest/${quest.id}/is_duplicate`] = true;
    console.log('it worked!');
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        Snackbar.open({
          message: 'Quest successfully flagged',
          type: 'is-success',
          duration: 3000
        });
        dispatch('user/updateLogs', 'FLAG_QUEST', { root: true });
      })
      .catch(error => {
        console.log(error);
      });
  },
  unflagQuest({ dispatch }, quest) {
    const updates = {};
    updates[`quest/${quest.id}/is_duplicate`] = false;
    console.log('it gone now');
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        Snackbar.open({
          message: 'Quest unflagged',
          type: 'is-success',
          duration: 3000
        });
        dispatch('user/updateLogs', 'UNFLAG_QUEST', { root: true });
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const getters = {
  sortedQuests(state) {
    return state.quests.sort((questA, questB) => {
      return questB.votes - questA.votes;
    });
  },
  loadQuest(state) {
    return questId => {
      return state.quests.find(quest => {
        return quest.id === questId;
      });
    };
  },
  isLoading(state) {
    return state.loading;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
