import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import register from './modules/register';
import login from './modules/login';
import feed from './modules/feed';
import quest from './modules/quest';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    register,
    login,
    feed,
    quest,
  },
});
