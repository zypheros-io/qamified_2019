/* eslint-disable */
import firebase from 'firebase';
import moment from 'moment';

const state = {
  notifications: []
};

const mutations = {
  setNotifications(state, payload) {
    state.notifications = payload;
  }
};

const actions = {
  retrieveNotifications({ commit, rootGetters }) {
    const user = rootGetters['user/getUser'];
    let notificationsArr = [];
    firebase
      .database()
      .ref('notification/')
      .orderByChild('user_id')
      .equalTo(user.id)
      .on('child_added', n => {
        let notification = n.val();
        notificationsArr.unshift(notification);
      });
    // commit changes to local database
    commit('setNotifications', notificationsArr);
  },
  addSolutionNotification({ commit, rootGetters }, notification) {
    const currUser = rootGetters['user/getUser'];
    const newNotif = {
      description: `${currUser.username} responded to your quest.`,
      data_created: moment().format(),
      user_id: notification.user_id,
      quest_id: notification.id,
      img_url: currUser.img_url
    };

    const newNotifKey = firebase
      .database()
      .ref()
      .child('notification')
      .push().key;
    newNotif.id = newNotifKey;

    const updates = {};
    updates[`/notification/${newNotif.id}`] = newNotif;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        console.log('Notif added');
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const getters = {
  getNotifs(state) {
    return state.notifications;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
