/* eslint-disable */
import firebase from 'firebase'
import store from '..';

const state = {
  quests: [],
  loading: false,
};

const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setQuests(state, payload) {
    state.quests = payload;
  }
};

const actions = {
  initFeed({ commit }) {
    firebase.database()
      .ref('/quest')
      .on('value', (q) => {
        if (q) {
          const questArray = [];
          q.forEach(
            q => {
              const quest = q.val();
              quest.id = q.key;
              const upvotes = [];
              const downvotes = [];
              if (quest.upvote) {
                Object.keys(quest.upvote).forEach(upvote => {
                  upvotes.push(upvote);
                })
              }
              if (quest.downvote) {
                Object.keys(quest.downvote).forEach(downvote => {
                  downvotes.push(downvote);
                })
              }
              quest.upvote = upvotes;
              quest.downvote = downvotes;
              questArray.unshift(quest)
            },
          );
          commit('setQuests', questArray);
        } 
      });
  },
  upvoteQuest({ commit, rootGetters }, payload) {
    const updates = {};
    if (payload.downvote.length > 0 && payload.downvote.includes(rootGetters['user/getUser'].id)) {
      updates[`/quest/${payload.id}/downvote/${rootGetters['user/getUser'].id}`] = null;
      updates[`/quest/${payload.id}/upvote/${rootGetters['user/getUser'].id}`] = true;
      updates[`/quest/${payload.id}/votes`] = payload.votes + 1;
      firebase.database()
        .ref()
        .update(updates)
        .then(
          () => {
            payload.votes += 1;
          }
        )
        .catch(
          (error) => {
            // es-lint-disable-next-line
            console.log(error);
          }
        )
    } else if (!payload.upvote.includes(rootGetters['user/getUser'].id)) {
      updates[`/quest/${payload.id}/upvote/${rootGetters['user/getUser'].id}`] = true;
      updates[`/quest/${payload.id}/votes`] = payload.votes + 1;
      firebase.database()
        .ref()
        .update(updates)
        .then(
          () => {
            payload.votes +=1;
          }
        )
        .catch(
          (error) => {
            // es-lint-disable-next-line
            console.log(error);
          }
        )
    }
  },
  downvoteQuest({ commit, rootGetters }, payload) {
    const updates = {};
    if (!payload.downvote.includes(rootGetters['user/getUser'].id)) {
      updates[`/quest/${payload.id}/downvote/${rootGetters['user/getUser'].id}`] = true;
      updates[`/quest/${payload.id}/votes`] = payload.votes - 1;
      payload.downvote.push(rootGetters['user/getUser'].id);
      firebase.database()
        .ref()
        .update(updates)
        .then(
          () => {
            payload.votes -= 1;
          }
        )
        .catch(
          (error) => {
            // eslint-disable-next-line
            console.log(error);
          }
        )
    }
  }
};

const getters = {
  sortedQuests (state) {
    return state.quests.sort((questA, questB) => {
      return questA.votes < questB.votes;
    });
  },
  loadQuest (state) {
    return (questId) => {
      return state.quests.find((quest) => {
        return quest.id === questId;
      })
    }
  },
  isLoading (state) {
    return state.loading;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
