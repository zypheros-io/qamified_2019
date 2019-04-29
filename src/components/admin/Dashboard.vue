<template>
  <div class="box has-text-centered" id="dashboard">
    <div id="chart-container">
      <div class="is-clearfix">
        <button
          v-if="!loading"
          @click.prevent="refresh()"
          class="button primary-btn is-medium is-pulled-right"
        >
          <span class="mdi mdi-refresh"></span>&nbsp;Refresh Dashboard
        </button>
        <button
          v-if="loading"
          class="button is-loading primary-btn is-medium is-pulled-right"
        ></button>
      </div>
    </div>
    <br />
    <column-chart
      :data="this.$store.getters['admin/chart']"
      xtitle="User Activity"
      ytitle="Frequency"
    />
    <div class="is-divider"></div>
    <div id="stats-container" class="box has-text-centered is-primary-text">
      <p class="title">Application Statistics</p>
      <div class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-secondary-text">Users</p>
            <p class="title is-primary-text">{{ userCount }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-secondary-text">Quests</p>
            <p class="title is-primary-text">{{ questCount }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-secondary-text">Solutions</p>
            <p class="title is-primary-text">{{ solutionCount }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-secondary-text">Replies</p>
            <p class="title is-primary-text">{{ replyCount }}</p>
          </div>
        </div>
      </div>
    </div>
    <p class="is-divider"></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters({
      loading: 'admin/loading',
      userCount: 'admin/userCount',
      questCount: 'admin/questCount',
      solutionCount: 'admin/solutionCount',
      replyCount: 'admin/replyCount'
    })
  },
  methods: {
    refresh: function refresh() {
      this.$store.dispatch('admin/refreshChart');
      this.$store.dispatch('admin/refreshCounters');
      this.$store.dispatch('admin/refreshReportTickets');
      this.$store.dispatch('admin/refreshFlagTickets');
    }
  },
  mounted() {
    this.refresh();
  }
};
</script>

<style scoped>
#dashboard {
  margin-top: 5vh !important;
}
#chart {
  max-width: 100% !important;
  margin-top: 5vh !important;
}
#stats-container {
  background: #f4f4f4 !important;
}
</style>
