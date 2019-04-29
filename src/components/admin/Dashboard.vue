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
    <div class="columns" id="reports-container">
      <div class="column">
        <div class="has-text-centered">
          <p class="is-primary-text">Report Tickets</p>
        </div>
        <br />
        <div
          v-for="report in reports"
          :key="report.index"
          class="notification color-white"
          id="reports"
        >
          <div class="is-clearfix">
            <p class="is-pulled-left">
              <router-link :to="`/headquarters/${report.reporter_id}`">
                {{ report.reporter_name }}
              </router-link>
              has reported
              <router-link :to="`/headquarters/${report.reported_user_id}`">
                {{ report.reported_user_name }}
              </router-link>
              for {{ report.reason }}
            </p>
            <p class="is-pulled-right">
              <a v-on:click.prevent="confirmDismiss(report)">
                dismiss
              </a>
              |
              <a
                v-on:click.prevent="
                  confirmBan(report.reported_user_id, report.id)
                "
              >
                ban
              </a>
            </p>
          </div>
          <br />
        </div>
        <div class="has-text-centered">
          <p v-if="reports.length === 0" class="is-secondary-text">
            No report tickets as of the moment
          </p>
        </div>
      </div>
      <p class="is-divider-vertical"></p>
      <div class="column">
        <div class="has-text-centered">
          <p class="is-primary-text">Flag Tickets</p>
        </div>
        <br />
        <div
          v-for="flag in flags"
          :key="flag.index"
          class="notification color-white"
          id="reports"
        >
          <div class="is-clearfix">
            <p class="is-pulled-left">
              <router-link :to="`/headquarters/${flag.user_id}`">
                {{ flag.user_name }}
              </router-link>
              has flagged
              <router-link :to="`/quest/${flag.duplicate_id}`">
                this quest
              </router-link>
              as duplicate of
              <router-link :to="`/quest/${flag.quest_id}`">
                this quest.
              </router-link>
            </p>
            <p class="is-pulled-right">
              <a v-on:click.prevent="confirmDismissFlag(flag.id)">
                dismiss
              </a>
              |
              <a v-on:click.prevent="confirmMark(flag.duplicate_id, flag.id)">
                mark
              </a>
            </p>
          </div>
          <br />
        </div>
        <div class="has-text-centered">
          <p v-if="flags.length === 0" class="is-secondary-text">
            No flag tickets as of the moment
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters({
      loading: 'admin/loading',
      userCount: 'admin/userCount',
      questCount: 'admin/questCount',
      solutionCount: 'admin/solutionCount',
      replyCount: 'admin/replyCount',
      reports: 'admin/reports',
      flags: 'admin/flags'
    })
  },
  methods: {
    ...mapActions({
      refreshChart: 'admin/refreshChart',
      refreshCounters: 'admin/refreshCounters',
      refreshReport: 'admin/refreshReportTickets',
      refreshFlags: 'admin/refreshFlagTickets',
      ban: 'admin/banUser',
      mark: 'admin/markAsDuplicate',
      dismissReport: 'admin/dismissReport',
      dismissFlag: 'admin/dismissFlag'
    }),
    refresh: function refresh() {
      this.refreshChart();
      this.refreshCounters();
      this.refreshReport();
      this.refreshFlags();
    },
    confirmBan: function confirmBan(id, reportTicketId) {
      this.$dialog.confirm({
        title: 'Ban User',
        message: 'Are you sure you want to <b>ban</b> this user?',
        confirmText: 'Yes, I am sure.',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () =>
          this.ban({
            reportUserId: id,
            reportId: reportTicketId
          })
      });
    },
    confirmDismiss: function confirmDismiss(report) {
      this.$dialog.confirm({
        title: 'Dismiss Report Ticket',
        message: 'Are you sure you want to <b>dismiss</b> this ticket?',
        confirmText: 'Yes, I am sure.',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () =>
          this.dismissReport({
            reportId: report.id,
            reportUserId: report.reported_user_id
          })
      });
    },
    confirmDismissFlag: function confirmDismissFlag(id) {
      this.$dialog.confirm({
        title: 'Delete Flag Ticket',
        message: 'Are you sure you want to <b>dismiss</b> this ticket?',
        confirmText: 'Yes, I am sure.',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.dismissFlag(id)
      });
    },
    confirmMark: function confirmMark(id, flagTicketId) {
      this.$dialog.confirm({
        title: 'Mark Quest as Duplicate',
        message:
          'Are you sure you want to <b>mark</b> this quest as duplicate?',
        confirmText: 'Yes, I am sure.',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () =>
          this.mark({
            questId: id,
            flagId: flagTicketId
          })
      });
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
#reports {
  background: #37ccb3 !important;
  font-size: 0.9em !important;
}
</style>
