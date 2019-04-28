import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/components/Register';
import QuestBoard from '@/components/QuestBoard';
import Quest from '@/components/Quest';
import LogIn from '@/components/LogIn';
import Landing from '@/components/Landing';
import Headquarters from '@/components/Headquarters';
import AdminPanel from '@/components/AdminPanel';
import Leaderboard from '@/components/Leaderboard';
import Error404 from '@/components/Error404';
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
      path: '/leaderboard',
      name: 'Leaderboard',
      component: Leaderboard,
      beforeEnter: AuthGuard
    },
    {
      path: '/quest/:id',
      props: true,
      name: 'Quest',
      component: Quest
    },
    {
      path: '/headquarters/:id',
      name: 'Headquarters',
      component: Headquarters
    },
    {
      path: '/error404',
      name: 'Error404',
      component: Error404
    },
    {
      path: '*',
      redirect: '/error404'
    }
  ],
  mode: 'history'
});
