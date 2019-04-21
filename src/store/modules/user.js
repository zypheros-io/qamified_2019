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
  addExperience({ commit, rootGetters }, experience) {
    const EXPERIENCE = experience;
    // Retrieve the user that did the action
    let user = rootGetters['user/getUser'];
    let leveledUp = false;
    // User gained experience from the action it did
    user.experience = user.experience + EXPERIENCE;
    // Check if the user leveled up
    if (user.experience >= user.level_cap) {
      /*
        If the user leveled up, update the user's level and level cap
        Reset experience points
      */
      user.level = user.level + 1;
      user.level_cap = user.level_cap * 2;
      user.experience = 0;
      leveledUp = true;
    }
    // Store changes into updates
    const updates = {};
    updates[`user/${user.id}/experience`] = user.experience;
    updates[`user/${user.id}/level_cap`] = user.level_cap;
    updates[`user/${user.id}/level`] = user.level;
    // Commit changes to database
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        // Commit changes to local storage
        commit('updateExp', user.experience);
        if (leveledUp) {
          commit('updateLevel', user.level);
          commit('updateExpToLevel', user.level_cap);
          // Display a prompt to user
          Dialog.alert({
            title: 'Leveled up!',
            message: 'Congratulations, you have leveled up!',
            type: 'is-success'
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  addReputation({ commit, rootGetters }, authorId) {
    const REPUTATION = 5;
    const REPUTATION_RATIO = 10;
    const BADGES = rootGetters['user/getBadges'];
    const RANKS = rootGetters['user/getRanks'];
    // Retrieve user
    let user;
    firebase
      .database()
      .ref(`user/${authorId}`)
      .on('value', u => {
        if (u.val() !== null) {
          user = u.val();
        }
      });
    // Store user's current rank
    let previousRank = user.rank;
    // Update user's reputation
    user.reputation = user.reputation + REPUTATION;
    // Compute for the matching rank index
    let ratio = Math.floor(user.reputation / REPUTATION_RATIO);
    if (ratio <= 9 && ratio >= 0) {
      // [0-9]
      user.rank = RANKS[ratio];
    } else if (ratio > 9) {
      user.rank = RANKS[9];
    }
    // Update user badge based on current rank
    user.badge_url = BADGES[user.rank];
    // Check if the user ranked up
    let rankedUp = false;
    if (user.rank !== previousRank) rankedUp = true;
    // Store updates
    const updates = {};
    updates[`user/${authorId}/reputation`] = user.reputation;
    updates[`user/${authorId}/rank`] = user.rank;
    updates[`user/${authorId}/badge_url`] = user.badge_url;
    // Commit changes to database
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        // Commit changes to local storage
        commit('updateReputation', user.reputation);
        if (rankedUp) {
          commit('updateRank', user.rank);
          commit('updateBadge', user.badge_url);
          // Event alert
          Dialog.alert({
            title: 'Rank up!',
            message:
              'Congratulations adventurer! You have accumulated enough reputation points to get to the next rank. Keep it up!',
            type: 'is-success'
          });
        }
        // Reset values;
        rankedUp = false;
      })
      .catch(error => {
        console.log(error);
      });
  },
  deductReputation({ commit, rootGetters }, authorId) {
    const REPUTATION = 5;
    const REPUTATION_RATIO = 10;
    const BADGES = rootGetters['user/getBadges'];
    const RANKS = rootGetters['user/getRanks'];
    // Retrieve user
    let user;
    firebase
      .database()
      .ref(`user/${authorId}`)
      .on('value', u => {
        if (u.val() !== null) {
          user = u.val();
        }
      });
    // Store user's current rank
    let previousRank = user.rank;
    // Update user's reputation
    user.reputation = user.reputation - REPUTATION;
    // Compute for matching rank index
    let ratio = Math.floor(user.reputation / REPUTATION_RATIO);
    if (ratio <= 9 && ratio >= 0) {
      user.rank = RANKS[ratio];
    } else if (ratio < 0) {
      user.rank = RANKS[0];
    }
    // Update user badge based on current rank
    user.badge_url = BADGES[user.rank];
    // Check if the user's rank changed
    let rankedDown = false;
    if (user.rank !== previousRank) rankedDown = true;
    // Store updates
    const updates = {};
    updates[`user/${authorId}/reputation`] = user.reputation;
    updates[`user/${authorId}/rank`] = user.rank;
    updates[`user/${authorId}/badge_url`] = user.badge_url;
    // Commit changes to database
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        // Commit changes to local storage
        commit('updateReputation', user.reputation);
        if (rankedDown) {
          commit('updateRank', user.rank);
          commit('updateBadge', user.badge_url);
          // Event alert
          Dialog.alert({
            title: 'Rank down!',
            message:
              'Majority of the adventurers downvoted the assistance you provided causing you to lose reputation. You have ranked down.',
            type: 'is-danger'
          });
        }
        // Reset values;
        rankedDown = false;
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
