/* eslint-disable */
// import moment from 'moment';

const state = {
  quests: [
    {
      // Question 1
      id: 'aSxvFvb5t@#3245S2',
      img_url: 'http://icons.iconarchive.com/icons/sora-meliae/matrilineare/48/avatar-default-icon.png',
      date_created: new Date(),
      title: 'How to send email using Google API client?',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. I am new to Ruby and I am trying to send an email using Google\'s API, but I keep on getting this error.',
      category: 'Algorithm',
      upvotes: 5,
      user_id: 'c9GdvmQkotQ4FhDhYZ4N9eKOkWX2',
      is_answered: false,
      username: 'kenichiiana',
      full_name: 'Kenichii Ana',
      solutions: [],
      // user avatar,
      is_duplicate: false,
    },
  ],
  loading: false,
};

const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
};

const actions = {
};

const getters = {
  sortedQuests (state) {
    return state.quests.sort((questA, questB) => {
      return questA.date_created > questB.date_created;
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
