/* eslint-disable */
import firebase from 'firebase';
import { Snackbar } from 'buefy/dist/components/snackbar';

const state = {
  user: null,
  quests: [],
  respondedTo: []
};

const mutations = {
  setProfileUser(state, payload) {
    state.user = payload;
  },
  setQuest(state, payload) {
    state.quests = payload;
  },
  setResponded(state, payload) {
    state.respondedTo = payload;
  }
};

const actions = {
  populateProfile({ commit }, userId) {
    let user;
    firebase
      .database()
      .ref(`user/${userId}`)
      .on('value', u => {
        if (u.val() !== null) {
          const solutions = [];
          user = u.val();
          if (user.solution) {
            Object.keys(user.solution).forEach(solution => {
              solutions.push(solution);
            });
          }
          user.solution = solutions;
          // Retrieve quests posted by user
          firebase
            .database()
            .ref('quest')
            .orderByChild('user_id')
            .equalTo(`${userId}`)
            .on('value', quests => {
              if (quests) {
                const questArray = [];
                quests.forEach(quest => {
                  let newQuest = quest.val();
                  questArray.unshift(newQuest);
                });
                commit('setQuest', questArray);
              }
            });
          // Retrieve quests responded to by user
          const solArray = [];
          solutions.forEach(id => {
            firebase
              .database()
              .ref(`solution/${id}`)
              .on('value', sol => {
                if (sol.val()) {
                  let s = sol.val();
                  let questId = s.quest_id;
                  firebase
                    .database()
                    .ref(`quest/${questId}`)
                    .on('value', q => {
                      if (q.val()) {
                        let newQuest = q.val();
                        if (!solArray.includes(newQuest))
                          solArray.unshift(newQuest);
                      }
                    });
                }
              });
          });
          commit('setResponded', solArray);
          commit('setProfileUser', user);
        }
      });
  },
  reportUser({ dispatch }, userId) {
    const updates = {};
    updates[`user/${userId}/is_reported`] = true;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        Snackbar.open({
          message: 'User successfully reported',
          type: 'is-success',
          duration: 3000
        });
        dispatch('user/updateLogs', 'REPORT_USER', { root: true });
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const getters = {
  user(state) {
    return state.user;
  },
  missions(state) {
    return state.user.missions;
  },
  quests(state) {
    return state.quests;
  },
  responded(state) {
    return state.respondedTo;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
