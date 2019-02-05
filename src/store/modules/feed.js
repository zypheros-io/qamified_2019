/* eslint-disable */
import firebase from 'firebase'

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
              // push each quest to questArray
              questArray.unshift(quest)
            },
          );
          commit('setQuests', questArray);
        } 
      });
  }
};

const getters = {
  sortedQuests (state) {
    return state.quests.sort((questA, questB) => {
      return questA.date_created > questB.date_created;
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
