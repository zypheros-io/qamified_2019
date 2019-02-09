/* eslint-disable */
import firebase from 'firebase';

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
  populateFeed({ commit }) {
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
  upvoteQuest({ rootGetters }, quest) {
    const updates = {};
    const userId = rootGetters['user/getUser'].id;

    if (quest.downvote.length > 0 && quest.downvote.includes(userId)) {
      updates[`/quest/${quest.id}/downvote/${userId}`] = null;
      updates[`/quest/${quest.id}/upvote/${userId}`] = true;
      updates[`/quest/${quest.id}/votes`] = quest.votes + 1;

      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          quest.votes += 1;
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error);
        });
    } else if (!quest.upvote.includes(userId)) {
      updates[`/quest/${quest.id}/upvote/${userId}`] = true;
      updates[`/quest/${quest.id}/votes`] = quest.votes + 1;

      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          quest.votes += 1;
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error);
        });
    }
  },
  downvoteQuest({ rootGetters }, quest) {
    const updates = {};
    const userId = rootGetters['user/getUser'].id;
    if (quest.upvote.length > 0 && quest.upvote.includes(userId)) {
      // eslint-disable-next-line
      console.log('User downvoted from upvote');
      updates[`/quest/${quest.id}/upvote/${userId}`] = null;
      updates[`/quest/${quest.id}/downvote/${userId}`] = true;
      updates[`/quest/${quest.id}/votes`] = quest.votes - 1;

      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          quest.votes -= 1;
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error);
        });
    } else if (!quest.downvote.includes(userId)) {
      updates[`/quest/${quest.id}/downvote/${userId}`] = true;
      updates[`/quest/${quest.id}/votes/`] = quest.votes - 1;

      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          quest.votes -= 1;
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error);
        });
    }
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
