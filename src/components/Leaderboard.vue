<template>
  <div class="container" id="leaderboard">
    <div class="has-text-centered">
      <p class="title is-primary-text color-secondary" id="leaderboard-header">
        Leaderboard
      </p>
    </div>
    <p class="is-divider"></p>
    <div id="leaderboard-container">
      <Leaderboard-Panel
        v-for="user in users"
        :key="user.id"
        v-bind:user="user"
      >
      </Leaderboard-Panel>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LeaderboardPanel from './LeaderboardPanel';

export default {
  components: {
    LeaderboardPanel
  },
  computed: {
    ...mapGetters({
      users: 'leaderboard/users'
    })
  },
  methods: {
    ...mapActions({
      populate: 'leaderboard/populateLeaderboard'
    }),
    populateLeaderboard: function populateLeaderboard() {
      this.populate();
    }
  },
  mounted() {
    this.populateLeaderboard();
  }
};
</script>

<style scoped>
#leaderboard {
  width: 100% !important;
  padding-top: 75px !important;
}
#leaderboard-header {
  font-size: 3em;
}
#leaderboard-container {
  width: 100%;
}
</style>
