import Vue from 'vue';
import Router from 'vue-router';
import SignUp from '@/components/SignUp';
import Landing from '@/components/Landing';
import SignIn from '@/components/SignIn';
import AuthGuard from './auth-guard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
    },
    {
      path: '/welcome',
      name: 'Landing',
      component: Landing,
      beforeEnter: AuthGuard,
    },
  ],
  mode: 'history',
});

