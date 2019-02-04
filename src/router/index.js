import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/components/Register';
import Feed from '@/components/Feed';
import LogIn from '@/components/LogIn';
import AuthGuard from './auth-guard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/signup',
      name: 'Register',
      component: Register,
    },
    {
      path: '/signin',
      name: 'LogIn',
      component: LogIn,
    },
    {
      path: '/',
      name: 'Feed',
      component: Feed,
      beforeEnter: AuthGuard,
    },
  ],
  mode: 'history',
});

