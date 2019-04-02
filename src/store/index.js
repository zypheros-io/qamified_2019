import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import user from './modules/user';
import register from './modules/register';
import login from './modules/login';
import feed from './modules/feed';
import quest from './modules/quest';
import solution from './modules/solution';
import admin from './modules/admin';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    register,
    login,
    feed,
    quest,
    solution,
    admin
  },
  plugins: [createPersistedState()]
});
