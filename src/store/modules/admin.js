/* eslint-disable */
import firebase from 'firebase';
import { Toast } from 'buefy/dist/components/toast';

const state = {
  users: [],
  logs: [],
  labels: [
    'VIEW_FEED',
    'VIEW_PROFILE',
    'VIEW_RANKING',
    'VIEW_NOTIFICATION',
    'VIEW_QUEST',
    'VIEW_USER',
    'VIEW_TODO',
    'VIEW_ACHIEVEMENT',
    'POST_QUEST',
    'UPVOTE_QUEST',
    'DOWNVOTE_QUEST',
    'DELETE_QUEST',
    'FLAG_QUEST',
    'POST_SOLUTION',
    'UPVOTE_SOLUTION',
    'DOWNVOTE_SOLUTION',
    'MARK_SOLUTION',
    'DELETE_SOLUTION',
    'POST_REPLY',
    'CHANGE_CATEGORY',
    'REPORT_USER'
  ],
  values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  user_count: 0,
  quest_count: 0,
  solution_count: 0,
  reply_count: 0,
  loading: false
};

const mutations = {
  setUsers(state, payload) {
    state.users = payload;
  },
  setLogs(state, payload) {
    state.logs = payload;
  },
  setData(state, payload) {
    state.values = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
  setUserCount(state,payload) {
    state.user_count = payload;
  },
  setQuestCount(state,payload) {
    state.quest_count = payload;
  },
  setSolutionCount(state,payload) {
    state.solution_count = payload;
  },
  setReplyCount(state,payload) {
    state.reply_count = payload;
  }
};

const actions = {
  retrieveData({ commit }) {
    // Access db/users
    firebase
      .database()
      .ref('user')
      .on('value', users => {
        // Array of users
        let userArray = [];
        users.forEach(user => {
          let u = user.val();
          // Add user to array
          userArray.unshift(u);
        });
        commit('setUsers', userArray);
      });
    // Retrieve logs
    firebase
      .database()
      .ref('logs')
      .on('value', logs => {
        // Array of logs
        let logArray = [];
        logs.forEach(log => {
          let l = log.val();
          // Add log to array
          logArray.unshift(l);
        });
        commit('setLogs', logArray);
      });
  },
  banUser({}, user) {
    const banId = user.id;
    const updates = {};
    console.log(banId);
    updates[`user/${banId}/is_banned`] = true;
    console.log(updates);
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        Toast.open({
          message: 'User has been banned',
          duration: 3000,
          type: 'is-danger'
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  refreshChart({ commit, rootGetters }) {
    commit('setLoading', true);
    const labels = rootGetters['admin/labels'];
    const values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // Retrieve data from DB
    firebase
      .database()
      .ref('logs')
      .on('value', logs => {
        if (logs) {
          logs.forEach(log => {
            let l = log.val();
            let logIndex = labels.indexOf(l.context);
            values[logIndex] += 1;
          });
        }
      })
    // commit new data to local storage
    commit('setData', values);
    // fake load
    setTimeout(() => {
      commit('setLoading', false);
    }, 2 * 1000);
  },
  refreshCounters({ commit }) {
    // User Count
    let userCount = 0;
    firebase
      .database()
      .ref('user')
      .on('value', users => {
        users.forEach(u => {
          userCount += 1;
        })
        commit('setUserCount', userCount);
      });
    // Quest Count
    let questCount = 0;
    firebase
      .database()
      .ref('quest')
      .on('value', quests => {
        quests.forEach(q => {
          questCount += 1;
        })
        commit('setQuestCount', questCount);
      });
    let solutionCount = 0;
    firebase
      .database()
      .ref('solution')
      .on('value', solutions => {
        solutions.forEach(s => {
          solutionCount += 1;
        })
        commit('setSolutionCount', solutionCount);
      });
    let replyCount = 0;
    firebase
      .database()
      .ref('reply')
      .on('value', replies => {
        replies.forEach(r => {
          replyCount += 1;
        })
        commit('setReplyCount', replyCount);
      })
  }
};

const getters = {
  users(state) {
    return state.users;
  },
  logs(state) {
    return state.logs;
  },
  chart(state) {
    return state.values;
  },
  labels(state) {
    return state.labels;
  },
  loading(state) {
    return state.loading;
  },
  userCount(state) {
    return state.user_count;
  },
  questCount(state) {
    return state.quest_count;
  },
  solutionCount(state) {
    return state.solution_count;
  },
  replyCount(state) {
    return state.reply_count;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
