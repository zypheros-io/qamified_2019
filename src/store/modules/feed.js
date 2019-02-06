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
              const solutions = [];
              
              if (quest.solution) {
                Object.keys(quest.solution).forEach(s => {
                  solutions.push(s);
                });
              }
              if (quest.upvote) {
                Object.keys(quest.upvote).forEach(u => {
                  upvotes.push(u);
                })
              }
              if (quest.downvote) {
                Object.keys(quest.upvote).forEach(d => {
                  downvotes.push(d);
                })
              }
              quest.solution = solutions;
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
    // eslint-disable-next-line 
    // console.log(payload.votes);
    // payload.votes += 1;
    // // eslint-disable-next-line 
    // console.log(payload.votes);
    // // eslint-disable-next-line
    // console.log(rootGetters['user/getUser'].id);
    const updates = {};
    if (!payload.upvote.includes(rootGetters['user/getUser'].id)) {
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
