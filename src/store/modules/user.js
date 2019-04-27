/* eslint-disable */
import firebase from 'firebase';
import moment from 'moment';
import { Dialog } from 'buefy/dist/components/dialog';
import { Toast } from 'buefy/dist/components/toast';

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
    Novice: '../../static/badges/chevron-1.png',
    Copper: '../../static/badges/chevron-2.png',
    Iron: '../../static/badges/chevron-21.png',
    Silver: '../../static/badges/chevron-4.png',
    Gold: '../../static/badges/chevron-4.png',
    Platinum: '../../static/badges/chevron-4.png',
    Mithril: '../../static/badges/chevron-4.png',
    Diamond: '../../static/badges/chevron-4.png'
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
  setUserStatus(state, payload) {
    state.user.is_new = payload;
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
  updateLogs({ rootGetters }, log) {
    // Retrieve user of action
    const user = rootGetters['user/getUser'];
    // Generate new log key
    const logKey = firebase
      .database()
      .ref()
      .child('logs')
      .push().key;
    // Create new log object
    const newLog = {};
    newLog.context = log;
    newLog.date_created = moment().format();
    newLog.user_id = user.id;
    newLog.username = user.username;
    newLog.fullname = user.fname;
    newLog.id = logKey;
    // Store updates
    const updates = {};
    updates[`/logs/${newLog.id}`] = newLog;
    // Commit changes to database
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
  },
  addExperience({ commit, rootGetters }, payload) {
    const EXPERIENCE = payload.experience;

    let user;
    firebase
      .database()
      .ref(`user/${payload.authorId}`)
      .on('value', u => {
        if (u.val() !== null) {
          user = u.val();
        }
      });

    let leveledUp = false;

    user.experience += EXPERIENCE;
    if (user.experience >= user.level_cap) {
      user.level = user.level + 1;
      user.level_cap = user.level_cap * 2;
      user.experience = 0;
      leveledUp = true;
    }

    const updates = {};
    updates[`user/${user.id}/experience`] = user.experience;
    updates[`user/${user.id}/level_cap`] = user.level_cap;
    updates[`user/${user.id}/level`] = user.level;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        console.log('hello exp yay');
      })
      .catch(error => {
        console.log(error);
      });
  },
  /*
    Adds reputation to the user with the provided ID
    Accepts payload which consists of the author ID and reputation points
    Also checks if the user's rank changed and updates the badge and rank accordingly
  */
  addReputation({ commit, rootGetters }, payload) {
    const REPUTATION = payload.reputation;
    const REPUTATION_RATIO = 10;
    const BADGES = rootGetters['user/getBadges'];
    const RANKS = rootGetters['user/getRanks'];

    let user;
    firebase
      .database()
      .ref(`user/${payload.authorId}`)
      .on('value', u => {
        if (u.val() !== null) {
          user = u.val();
        }
      });

    let previousRank = user.rank;
    user.reputation += REPUTATION;
    let ratio = Math.floor(user.reputation / REPUTATION_RATIO);
    if (ratio <= 9 && ratio >= 0) {
      user.rank = RANKS[ratio];
    } else if (ratio > 9) {
      user.rank = RANKS[9];
    }

    user.badge_url = BADGES[user.rank];
    let rankedUp = false;
    if (user.rank !== previousRank) rankedUp = true;

    const updates = {};
    updates[`user/${payload.authorId}/reputation`] = user.reputation;
    updates[`user/${payload.authorId}/rank`] = user.rank;
    updates[`user/${payload.authorId}/badge_url`] = user.badge_url;
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        commit('updateReputation', user.reputation);
        if (rankedUp) {
          commit('updateRank', user.rank);
          commit('updateBadge', user.badge_url);
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  deductReputation({ commit, rootGetters }, payload) {
    const REPUTATION = payload.reputation;
    const REPUTATION_RATIO = 10;
    const BADGES = rootGetters['user/getBadges'];
    const RANKS = rootGetters['user/getRanks'];

    let user;
    firebase
      .database()
      .ref(`user/${payload.authorId}`)
      .on('value', u => {
        if (u.val() !== null) {
          user = u.val();
        }
      });

    let previousRank = user.rank;
    user.reputation = user.reputation - REPUTATION;
    let ratio = Math.floor(user.reputation / REPUTATION_RATIO);
    if (ratio <= 9 && ratio >= 0) {
      user.rank = RANKS[ratio];
    } else if (ratio < 0) {
      user.rank = RANKS[0];
    }

    user.badge_url = BADGES[user.rank];
    let rankedDown = false;
    if (user.rank !== previousRank) rankedDown = true;

    const updates = {};
    updates[`user/${payload.authorId}/reputation`] = user.reputation;
    updates[`user/${payload.authorId}/rank`] = user.rank;
    updates[`user/${payload.authorId}/badge_url`] = user.badge_url;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        commit('updateReputation', user.reputation);
        if (rankedDown) {
          commit('updateRank', user.rank);
          commit('updateBadge', user.badge_url);
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  endTutorial({ commit, rootGetters }) {
    const updates = {};
    const user = rootGetters['user/getUser'];
    updates[`user/${user.id}/is_new`] = false;
    // Commit changes to database
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        commit('setUserStatus', false);
        Toast.open({
          message: 'Godspeed, adventurer!',
          duration: 3000,
          type: 'is-success'
        });
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
    return state.user.level_cap;
  },
  getRanks(state) {
    return state.ranks;
  },
  getBadges(state) {
    return state.badges;
  },
  isLoading(state) {
    return state.loading;
  },
  getMissions(state) {
    return state.user.missions;
  },
  isNew(state) {
    return state.user.is_new;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
