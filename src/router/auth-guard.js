import store from '../store';

export default (to, from, next) => {
  if (store.getters['user/getUser']) {
    if (from === '/signin') {
      next('/board');
    }
    next();
  } else {
    next('signin');
  }
};
