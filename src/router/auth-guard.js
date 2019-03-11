import store from '../store';

export default (to, from, next) => {
  if (store.getters['user/getUser']) {
    if (from === '/signin') {
      next('/feed');
    }
    next();
  } else {
    next('signin');
  }
};
