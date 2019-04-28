<template>
  <div class="container" id="leaderboard">
    <div class="has-text-centered">
      <p class="title is-primary-text color-secondary" id="leaderboard-header">
        Leaderboard
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      users: 'leaderboard/users'
    })
  },
  methods: {
    ...mapActions({
      populate: 'leaderboard/populateLeaderboard',
      log: 'user/updateLogs'
    }),
    populateLeaderboard: function populateLeaderboard() {
      this.log('VIEW_LEADERBOARD');
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
  padding-bottom: 15px !important;
}
#leaderboard-header {
  font-size: 3em;
}
</style>
