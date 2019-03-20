/* eslint-disable */
import firebase from 'firebase';
import moment from 'moment';
import { Toast } from 'buefy/dist/components/toast';
import { Snackbar } from 'buefy/dist/components/snackbar';

const state = {
  user: null,
  ranks: [
    'Novice',
    'Copper',
    'Iron',
    'Silver',
    'Gold',
    'Platinum',
    'Mithril',
    'Diamond',
    'Adamantium',
    'Orichalcum'
  ],
  badges: {
    'Novice' : '../../static/badges/chevron-1.png',
    'Copper' : '../../static/badges/chevron-2.png',
    'Iron' : '../../static/badges/chevron-21.png',
    'Silver' : '../../static/badges/chevron-4.png',
  },
  loading: false
};

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
  updateExp(state, payload) {
    state.user.experience = payload;
  },
  updateExpToLevel(state, payload) {
    state.user.level_exp = payload;
  },
  updateLevel(state, payload) {
    state.user.level = payload;
  },
  updateReputation(state, payload) {
    state.user.reputation = payload;
  },
  updateRank(state, payload) {
    state.user.rank = payload;
  },
  updateBadge(state, payload) {
    state.user.badge_url = payload;
  }
};

const actions = {
  initUser({ commit }, currUser) {
    commit('setLoading', true);
    firebase
      .database()
      .ref(`/user/${currUser.uid}`)
      .on('value', user => {
        if (user.val() !== null) {
          commit('setUser', user.val());
        }
      });
  },
  postQuest({ commit, dispatch, rootGetters }, quest) {
    console.log(moment().format());
    commit('feed/setLoading', true, { root: true });

    let leveledUp = false;
    const user = rootGetters['user/getUser'];
    const newQuest = quest;
    const questKey = firebase
      .database()
      .ref()
      .child('quest')
      .push().key;
    const updates = {};

    newQuest.id = questKey;
    user.experience = user.experience + 5;

    if (user.experience >= user.level_exp) {
      user.level = user.level + 1;
      user.level_exp = user.level_exp * 2;
      leveledUp = true;
      user.experience = 0;
    }

    updates[`/quest/${newQuest.id}`] = newQuest;
    updates[`/user/${user.id}/experience`] = user.experience;
    updates[`/user/${user.id}/level`] = user.level;
    updates[`/user/${user.id}/level_exp`] = user.level_exp;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        Toast.open({
          message: 'Quest successfully posted!',
          duration: 3000,
          type: 'is-success'
        });
        commit('updateExp', user.experience);
        if (leveledUp) {
          commit('updateLevel', user.level);
          commit('updateExpToLevel', user.level_exp);
          Toast.open({
            message: 'Congratulations! You have leveled up!',
            duration: 5000,
            type: 'is-success'
          });
        }
        dispatch('updateLogs', 'POST_QUEST');
        commit('feed/setLoading', false, { root: true });
      })
      .catch(error => {
        commit('feed/setLoading', false, { root: true });
        console.log(error);
      });
  },
  updateLogs({ dispatch, rootGetters }, log) {
    const user = rootGetters['user/getUser'];
    const logKey = firebase
      .database()
      .ref()
      .child('logs')
      .push().key;
    const updates = {};

    const newLog = {};
    newLog.context = log;
    newLog.date_created = moment().format();
    newLog.user_id = user.id;
    newLog.username = user.username;
    newLog.fullname = user.fname;
    newLog.id = logKey;

    updates[`/logs/${newLog.id}`] = newLog;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        Snackbar.open({
          duration: 2000,
          message: newLog.context,
          type: 'is-danger',
          position: 'is-bottom-right',
          queue: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  addReputation({ commit, rootGetters }, authorId) {
    let user;
    let ranks = rootGetters['user/getRanks'];
    let badges = rootGetters['user/getBadges'];
    let ranked = false;
    let ratio;

    const REPUTATION_VAL = 2;
    const updates = {};

    firebase
      .database()
      .ref(`user/${authorId}`)
      .on('value', u => {
        if (u.val() !== null) {
          user = u.val();
        }
      });

    let prevRank = user.rank;
    user.reputation = user.reputation + REPUTATION_VAL;
    ratio = user.reputation / 10;
    user.rank = Math.floor(ratio) <= 9 ? ranks[Math.floor(ratio)] : ranks[9];
    // updates the badge url based on user rank
    user.badge_url = badges[user.rank];

    let prevIndex = ranks.indexOf(prevRank);
    let newIndex = ranks.indexOf(user.rank);

    // check if ranked up
    if (newIndex > prevIndex) {
      ranked = true;
    }

    // update changes
    updates[`user/${authorId}/reputation`] = user.reputation;
    updates[`user/${authorId}/rank`] = user.rank;
    updates[`user/${authorId}/badge_url`] = user.badge_url;

    // commit changes
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        commit('updateReputation', user.reputation);
        if (ranked === true) {
          commit('updateRank', user.rank);
          commit('updateBadge', user.badge_url);
        }
        ranked = false;
      })
      .catch(error => {
        console.log(error);
      });
  },
  deductReputation({ commit, rootGetters }, authorId) {
    let user;
    let ranks = rootGetters['user/getRanks'];
    let ranked = false;
    let ratio;

    const REPUTATON_VAL = 2;
    const updates = {};

    firebase
      .database()
      .ref(`user/${authorId}`)
      .on('value', u => {
        if (u.val() !== null) {
          user = u.val();
        }
      });

    let prevRank = user.rank;
    user.reputation = user.reputation - REPUTATON_VAL;
    ratio = user.reputaton / 10;
    user.rank = Math.floor(ratio) <= 9 ? ranks[Math.floor(ratio)] : ranks[9];

    let prevIndex = ranks.indexOf(prevRank);
    let newIndex = ranks.indexOf(user.rank);

    // check if ranked down
    if (prevIndex > newIndex) {
      ranked = true;
    }

    // update changes
    updates[`user/${authorId}/reputation`] = user.reputation;
    updates[`user/${authorId}/rank`] = user.rank;

    // commit changes
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        commit('updateReputation', user.reputation);
        if (ranked === true) {
          commit('updateRank', user.rank);
        }
        ranked = false;
      })
      .catch(error => {
        console.log(error);
      });
  },
  logOut({ commit }) {
    firebase.auth().signOut();
    commit('setUser', null);
  }
};

const getters = {
  getUser(state) {
    return state.user;
  },
  getExp(state) {
    return state.user.experience;
  },
  getExpToLevel(state) {
    return state.user.level_exp;
  },
  getRanks(state) {
    return state.ranks;
  },
  getBadges(state) {
    return state.badges;
  },
  isLoading(state) {
    return state.loading;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
