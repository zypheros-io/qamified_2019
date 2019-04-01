/* eslint-disable */
import firebase from 'firebase';
import { Toast } from 'buefy/dist/components/toast';

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
  postQuest({ commit, dispatch }, quest) {
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
    console.log(updates);
    // Commit updates to database
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        // Alert user of event
        Toast.open({
          message: 'Quest successfully posted!',
          duration: 3000,
          type: 'is-success'
        });
        // Commit changes to local storage
        dispatch('user/updateLogs', 'POST_QUEST', { root: true });
        dispatch('user/addExperience', null, { root: true });
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
  upvoteQuest({ rootGetters, dispatch }, quest) {
    const updates = {};
    if (
      quest.downvote.length > 0 &&
      quest.downvote.includes(quest.solution_id)
    ) {
      // Store changes
      updates[`/quest/${quest.id}/downvote/${quest.user_id}`] = null;
      updates[`/quest/${quest.id}/upvote/${quest.user_id}`] = true;
      updates[`/quest/${quest.id}/votes`] = quest.votes + 1;
      // Commit changes to database
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          dispatch('user/updateLogs', 'UPVOTE_QUEST', { root: true });
          quest.votes += 1;
        })
        .catch(error => {
          console.log(error);
        });
    } else if (!quest.upvote.includes(quest.user_id)) {
      // Store changes
      updates[`/quest/${quest.id}/upvote/${quest.user_id}`] = true;
      updates[`/quest/${quest.id}/votes`] = quest.votes + 1;
      // Commit changes to database
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          dispatch('user/updateLogs', 'UPVOTE_QUEST', { root: true });
          quest.votes += 1;
        })
        .catch(error => {
          console.log(error);
        });
    } else if (quest.upvote.includes(quest.user_id)) {
      Toast.open({
        message: 'You have already upvoted this quest!',
        duration: 3000,
        type: 'is-danger'
      });
    }
  },
  downvoteQuest({ dispatch, rootGetters }, quest) {
    const updates = {};
    if (quest.upvote.length > 0 && quest.upvote.includes(quest.user_id)) {
      // Store changes
      updates[`/quest/${quest.id}/upvote/${quest.user_id}`] = null;
      updates[`/quest/${quest.id}/downvote/${quest.user_id}`] = true;
      updates[`/quest/${quest.id}/votes`] = quest.votes - 1;
      // Commit changes to database
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          dispatch('user/updateLogs', 'DOWNVOTE_QUEST', { root: true });
          quest.votes -= 1;
        })
        .catch(error => {
          console.log(error);
        });
    } else if (!quest.downvote.includes(quest.user_id)) {
      // Store changes
      updates[`/quest/${quest.id}/downvote/${quest.user_id}`];
      updates[`/quest/${quest.id}/votes`] = quest.votes - 1;
      // Commit changes to database
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          dispatch('user/updateLogs', 'DOWNVOTE_QUEST', { root: true });
          quest.votes -= 1;
        })
        .catch(error => {
          console.log(error);
        });
    } else if (quest.downvote.includes(quest.user_id)) {
      Toast.open({
        message: 'You have already downvoted this quest!',
        duration: 3000,
        type: 'is-danger'
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
        Toast.open({
          message: 'Message has been successfully deleted!',
          type: 'is-success',
          duration: 3000
        });
        dispatch('user/updateLogs', 'DELETE_QUEST', { root: true });
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const getters = {
  sortedQuests(state) {
    return state.quests.sort((questA, questB) => {
      return questA.votes < questB.votes;
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
