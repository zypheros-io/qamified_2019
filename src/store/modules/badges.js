/* eslint-disable */
const state = {
  ranks: [
    'Pathfinder',
    'Apprentice',
    'Journeyman',
    'Adept',
    'Chief',
    'Admiral',
    'Magus',
    'Master',
    'Grandmaster',
    'Enlightened'
  ],
  badges: {
    Pathfinder: '../../static/badges/Badge01.png',
    Apprentice: '../../static/badges/Badge02.png',
    Journeyman: '../../static/badges/Badge03.png',
    Adept: '../../static/badges/Badge04.png',
    Chief: '../../static/badges/Badge05.png',
    Admiral: '../../static/badges/Badge06.png',
    Magus: '../../static/badges/Badge07.png',
    Master: '../../static/badges/Badge08.png',
    Grandmaster: '../../static/badges/Badge09.png',
    Enlightened: '../../static/badges/Badge10.png'
  }
};

const getters = {
  getRanks(state) {
    return state.ranks;
  },
  getBadges(state) {
    return state.badges;
  }
};

export default {
  namespaced: true,
  state,
  getters
};
