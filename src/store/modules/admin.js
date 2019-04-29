/* eslint-disable */
import firebase from 'firebase';
import { Snackbar } from 'buefy/dist/components/snackbar';

const state = {
  users: [],
  logs: [],
  labels: [
    'VIEW_FEED',
    'VIEW_QUEST',
    'VIEW_HEADQUARTERS',
    'VIEW_LEADERBOARD',
    'POST_QUEST',
    'UPVOTE_QUEST',
    'DOWNVOTE_QUEST',
    'DELETE_QUEST',
    'POST_SOLUTION',
    'UPVOTE_SOLUTION',
    'DOWNVOTE_SOLUTION',
    'MARK_SOLUTION',
    'DELETE_SOLUTION',
    'POST_REPLY',
    'SUBMIT_REPORT',
    'SUBMIT_FLAG'
  ],
  values: [
    ['VIEW_FEED', 0],
    ['VIEW_QUEST', 0],
    ['VIEW_HEADQUARTERS', 0],
    ['VIEW_LEADERBOARD', 0],
    ['POST_QUEST', 0],
    ['UPVOTE_QUEST', 0],
    ['DOWNVOTE_QUEST', 0],
    ['DELETE_QUEST', 0],
    ['POST_SOLUTION', 0],
    ['UPVOTE_SOLUTION', 0],
    ['DOWNVOTE_SOLUTION', 0],
    ['MARK_SOLUTION', 0],
    ['DELETE_SOLUTION', 0],
    ['POST_REPLY', 0],
    ['SUBMIT_REPORT', 0],
    ['SUBMIT_FLAG', 0]
  ],
  user_count: 0,
  quest_count: 0,
  solution_count: 0,
  reply_count: 0,
  reportTickets: [],
  flagTickets: [],
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
  },
  setReports(state, payload) {
    state.reportTickets = payload;
  },
  setFlags(state, payload) {
    state.flagTickets = payload;
  }
};

const actions = {
  retrieveData({ commit }) {
    firebase
      .database()
      .ref('user')
      .on('value', users => {
        let userArray = [];
        users.forEach(user => {
          let u = user.val();
          userArray.unshift(u);
        });
        commit('setUsers', userArray);
      });

    firebase
      .database()
      .ref('logs')
      .on('value', logs => {
        let logArray = [];
        logs.forEach(log => {
          let l = log.val();
          logArray.unshift(l);
        });
        commit('setLogs', logArray);
      });
  },
  banUser({ dispatch }, payload) {
    const updates = {};
    updates[`user/${payload.user_id}/is_banned`] = true;
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        Snackbar.open({
          message: 'User has been banned',
          type: 'is-success',
          duration: 3000
        });
        dispatch('dismissReport', payload)
      })
      .catch(error => {
        console.log(error);
      });
  },
  dismissReport({}, payload) {
    const reportId = payload.reportId;
    const reportUserId = payload.reportUserId;

    const updates = {};
    updates[`user/${reportUserId}/is_reported`] = false;
    updates[`reports/${reportId}`] = null;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        Snackbar.open({
          message: 'Report ticket dismissed',
          type: 'is-success',
          duration: 3000
        });
      });
  },
  dismissFlag({}, id) {
    const flagId = id;
    const updates = {};
    updates[`flags/${flagId}`] = null;
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        Snackbar.open({
          message: 'Flag dismissed',
          type: 'is-success',
          duration: 3000
        });
      });
  },
  markAsDuplicate({ dispatch }, payload) {
    const updates = {};
    updates[`quest/${payload.questId}/is_duplicate`] = true;
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        Snackbar.open({
          message: 'Quest marked as duplicate',
          type: 'is-success',
          duration: 3000
        });
        dispatch('dismissFlag', payload.flagId);
      })
  },
  refreshChart({ commit, rootGetters }) {
    commit('setLoading', true);
    const labels = [...rootGetters['admin/labels']];
    const values = [
      ['VIEW_FEED', 0],
      ['VIEW_QUEST', 0],
      ['VIEW_HEADQUARTERS', 0],
      ['VIEW_LEADERBOARD', 0],
      ['POST_QUEST', 0],
      ['UPVOTE_QUEST', 0],
      ['DOWNVOTE_QUEST', 0],
      ['DELETE_QUEST', 0],
      ['POST_SOLUTION', 0],
      ['UPVOTE_SOLUTION', 0],
      ['DOWNVOTE_SOLUTION', 0],
      ['MARK_SOLUTION', 0],
      ['DELETE_SOLUTION', 0],
      ['POST_REPLY', 0],
      ['SUBMIT_REPORT', 0],
      ['SUBMIT_FLAG', 0]
    ];

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

    setTimeout(() => {
      commit('setData', values);
      commit('setLoading', false);
    }, 2000);
  },
  refreshCounters({ commit }) {
    firebase
      .database()
      .ref('user')
      .on('value', users => {
        let userCount = 0;
        users.forEach(u => {
          userCount += 1;
        });
        commit('setUserCount', userCount);
      });

    firebase
      .database()
      .ref('quest')
      .on('value', quests => {
        let questCount = 0;
        quests.forEach(q => {
          questCount += 1;
        });
        commit('setQuestCount', questCount);
      });

    firebase
      .database()
      .ref('solution')
      .on('value', solutions => {
        let solutionCount = 0;
        solutions.forEach(s => {
          solutionCount += 1;
        });
        commit('setSolutionCount', solutionCount);
      });

    firebase
      .database()
      .ref('reply')
      .on('value', replies => {
        let replyCount = 0;
        replies.forEach(r => {
          replyCount += 1;
        });
        commit('setReplyCount', replyCount);
      });
  },
  refreshReportTickets({ commit }) {
    firebase
      .database()
      .ref('/reports')
      .on('value', reports => {
        if (reports) {
          const reportsArray = [];
          reports.forEach(report => {
            if (report.val()) {
              const r = report.val();
              reportsArray.unshift(r);
            }
          });
          commit('setReports', reportsArray);
        }
      });
  },
  refreshFlagTickets({ commit }) {
    firebase
      .database()
      .ref('/flags')
      .on('value', flags => {
        if (flags) {
          const flagsArray = [];
          flags.forEach(flag => {
            if (flag.val()) {
              const f = flag.val();
              flagsArray.unshift(f);
            }
          });
          commit('setFlags', flagsArray);
        }
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
  },
  reports(state) {
    return state.reportTickets;
  },
  flags(state) {
    return state.flagTickets;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
