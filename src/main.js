// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import * as firebase from 'firebase';
import Vue from 'vue';

import Buefy from 'buefy';
import VueMarkdown from 'vue-markdown';
import VueChartkick from 'vue-chartkick';
import SocialSharing from 'vue-social-sharing';
import Chart from 'chart.js';
import NProgress from 'nprogress';

import App from './App';
import router from './router';
import store from './store';

import DateFilter from './filters/date';
import '../node_modules/buefy/dist/buefy.css';
import '../node_modules/nprogress/nprogress.css';

Vue.use(VueChartkick, { adapter: Chart });
Vue.use(Buefy);
Vue.use(VueMarkdown);
Vue.use(SocialSharing);
Vue.filter('date', DateFilter);

Vue.config.productionTip = false;
/* eslint-disable */
router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAbFzu0SB-muprQN__do-yWQUkZaW-mlY4',
      authDomain: 'qamifed-web-app.firebaseapp.com',
      databaseURL: 'https://qamifed-web-app.firebaseio.com',
      projectId: 'qamifed-web-app',
      storageBucket: 'qamifed-web-app.appspot.com',
      messagingSenderId: '301016370722'
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('user/initUser', user);
      }
    });
  }
});
