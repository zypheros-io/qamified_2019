import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/components/Register';
import Feed from '@/components/Feed';
import Quest from '@/components/Quest';
import LogIn from '@/components/LogIn';
import AuthGuard from './auth-guard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/signup',
      name: 'Register',
      component: Register
    },
    {
      path: '/signin',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/',
      name: 'Feed',
      component: Feed,
      beforeEnter: AuthGuard
    },
    {
      path: '/:id',
      props: true,
      name: 'Quest',
      component: Quest
    }
  ],
  mode: 'history'
});
