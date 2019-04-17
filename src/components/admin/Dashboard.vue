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
      <bar-chart :chart-data="chart" :chart-options="options" />
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BarChart from './BarChart';

export default {
  name: 'Dashboard',
  components: {
    BarChart
  },
  computed: {
    chart() {
      return {
        labels: [
          'VIEW_FEED',
          'VIEW_PROFILE',
          'VIEW_RANKING',
          'VIEW_NOTIFICATION',
          'VIEW_QUEST',
          'VIEW_USER',
          'VIEW_TODO',
          'VIEW_ACHIEVEMENT',
          'POST_QUEST',
          'UPVOTE_QUEST',
          'DOWNVOTE_QUEST',
          'DELETE_QUEST',
          'FLAG_QUEST',
          'POST_SOLUTION',
          'UPVOTE_SOLUTION',
          'DOWNVOTE_SOLUTION',
          'MARK_SOLUTION',
          'DELETE_SOLUTION',
          'POST_REPLY',
          'CHANGE_CATEGORY',
          'REPORT_USER'
        ],
        datasets: [
          {
            label: 'User Activity',
            backgroundColor: '#b686fe',
            data: this.$store.getters['admin/chart']
          }
        ]
      };
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {
                autoSkip: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                autoSkip: false
              }
            }
          ]
        }
      };
    },
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
