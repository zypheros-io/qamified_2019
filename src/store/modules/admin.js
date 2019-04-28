/* eslint-disable */
import firebase from 'firebase';
import { Snackbar } from 'buefy/dist/components/snackbar';

const state = {
  users: [],
  logs: [],
  labels: [
    'VIEW_FEED',
    'VIEW_QUEST',
    'VIEW_USER',
    'VIEW_ACHIEVEMENT',
    'VIEW_HEADQUARTERS',
    'POST_QUEST',
    'UPVOTE_QUEST',
    'DOWNVOTE_QUEST',
    'DELETE_QUEST',
    'FLAG_QUEST',
    'UNFLAG_QUEST',
    'POST_SOLUTION',
    'UPVOTE_SOLUTION',
    'DOWNVOTE_SOLUTION',
    'MARK_SOLUTION',
    'DELETE_SOLUTION',
    'POST_REPLY',
    'CHANGE_CATEGORY',
    'REPORT_USER'
  ],
  values: [
    ['VIEW_FEED', 0],
    ['VIEW_QUEST', 0],
    ['VIEW_USER', 0],
    ['VIEW_ACHIEVEMENT', 0],
    ['VIEW_HEADQUARTERS', 0],
    ['POST_QUEST', 0],
    ['UPVOTE_QUEST', 0],
    ['DOWNVOTE_QUEST', 0],
    ['DELETE_QUEST', 0],
    ['FLAG_QUEST', 0],
    ['UNFLAG_QUEST', 0],
    ['POST_SOLUTION', 0],
    ['UPVOTE_SOLUTION', 0],
    ['DOWNVOTE_SOLUTION', 0],
    ['MARK_SOLUTION', 0],
    ['DELETE_SOLUTION', 0],
    ['POST_REPLY', 0],
    ['CHANGE_CATEGORY', 0],
    ['REPORT_USER', 0]
  ],
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
  setUserCount(state, payload) {
    state.user_count = payload;
  },
  setQuestCount(state, payload) {
    state.quest_count = payload;
  },
  setSolutionCount(state, payload) {
    state.solution_count = payload;
  },
  setReplyCount(state, payload) {
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
    const labels = [...rootGetters['admin/labels']];
    const values = [
      ['VIEW_FEED', 0],
      ['VIEW_QUEST', 0],
      ['VIEW_USER', 0],
      ['VIEW_ACHIEVEMENT', 0],
      ['VIEW_HEADQUARTERS', 0],
      ['POST_QUEST', 0],
      ['UPVOTE_QUEST', 0],
      ['DOWNVOTE_QUEST', 0],
      ['DELETE_QUEST', 0],
      ['FLAG_QUEST', 0],
      ['UNFLAG_QUEST', 0],
      ['POST_SOLUTION', 0],
      ['UPVOTE_SOLUTION', 0],
      ['DOWNVOTE_SOLUTION', 0],
      ['MARK_SOLUTION', 0],
      ['DELETE_SOLUTION', 0],
      ['POST_REPLY', 0],
      ['CHANGE_CATEGORY', 0],
      ['REPORT_USER', 0]
    ];
    // Retrieve data from DB
    firebase
      .database()
      .ref('logs')
      .on('value', logs => {
        if (logs) {
          logs.forEach(log => {
            let l = log.val();
            let logIndex = labels.indexOf(l.context);
            if (values[logIndex]) {
              values[logIndex][1] += 1;
            }
          });
        }
      });
    // fake load
    setTimeout(() => {
      commit('setData', values);
      commit('setLoading', false);
    }, 2000);
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
        });
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
        });
        commit('setQuestCount', questCount);
      });
    let solutionCount = 0;
    firebase
      .database()
      .ref('solution')
      .on('value', solutions => {
        solutions.forEach(s => {
          solutionCount += 1;
        });
        commit('setSolutionCount', solutionCount);
      });
    let replyCount = 0;
    firebase
      .database()
      .ref('reply')
      .on('value', replies => {
        replies.forEach(r => {
          replyCount += 1;
        });
        commit('setReplyCount', replyCount);
      });
  },
  addMission({ commit }, payload) {
    const mission = payload;
    // get new mission key
    const missionKey = firebase
      .database()
      .ref()
      .child('/mission')
      .push().key;

    mission.id = missionKey;
    const updates = {};
    updates[`/mission/${mission.id}`] = mission;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        Snackbar.open({
          message: 'Mission successfully added.',
          type: 'is-success',
          duration: 3000
        });
      })
      .catch(error => {
        console.log(error);
      });
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
  values(state) {
    return state.values;
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
