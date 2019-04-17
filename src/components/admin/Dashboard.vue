<template>
  <div class="box has-text-centered" id="dashboard">
    <div id="chart-container">
      <button
        v-if="!loading"
        @click.prevent="refresh()"
        class="button primary-btn is-medium"
      >
        Refresh
      </button>
      <button
        v-if="loading"
        class="button is-loading primary-btn is-medium"
      ></button>
    </div>
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
    <column-chart
      :data="this.$store.getters['admin/chart']"
      xtitle="User Activity"
      ytitle="Frequency"
    />
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
    }
  },
  mounted() {
    this.refresh();
  }
};
</script>

<style scoped>
#dashboard {
  margin-top: 5vh;
  border: 5px solid #b686fe;
}
#chart {
  max-width: 100%;
  margin-top: 5vh;
}
#stats-container {
  border: 5px solid #b686fe;
  background: #f4f4f4;
}
</style>
