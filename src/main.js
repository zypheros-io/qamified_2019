// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import * as firebase from 'firebase';
import 'animate.css/animate.css';
import Vue from 'vue';
import Buefy from 'buefy';
import AnimatedVue from 'animated-vue';
import VueMarkdown from 'vue-markdown';
import App from './App';
import router from './router';
import store from './store';
import '../node_modules/buefy/dist/buefy.css';

Vue.use(Buefy);
Vue.use(AnimatedVue);
Vue.use(VueMarkdown);

Vue.config.productionTip = false;

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
