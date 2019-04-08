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
    firebase
      .database()
      .ref('/notification')
      .on('value', notifications => {
        if(notifications) {
          const notificationArray = [];
          notifications.forEach(notification => {
            const currNotif = notification.val();
            currNotif.id = notification.key;
            notificationArray.unshift(currNotif);
          });
          commit('setNotifications', notificationArray);
        }
      })
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
