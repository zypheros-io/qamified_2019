import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/components/Register';
import QuestBoard from '@/components/QuestBoard';
import Quest from '@/components/Quest';
import LogIn from '@/components/LogIn';
import Landing from '@/components/Landing';
import Profile from '@/components/Profile';
import AdminPanel from '@/components/AdminPanel';
import AuthGuard from './auth-guard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/admin',
      name: 'AdminPanel',
      component: AdminPanel,
      beforeEnter: AuthGuard
    },
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
      path: '/board',
      name: 'QuestBoard',
      component: QuestBoard,
      beforeEnter: AuthGuard
    },
    {
      path: '/:id',
      props: true,
      name: 'Quest',
      component: Quest
    },
    {
      path: '/profile/:id',
      props: true,
      name: 'Profile',
      component: Profile
    }
  ],
  mode: 'history'
});
