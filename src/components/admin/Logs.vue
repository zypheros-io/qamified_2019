<template>
  <div class="box" id="logs">
    <b-field label="Filter by:" style="text-align: right">
      <b-select v-model="filterKey" style="text-align: right">
        <option value="ALL">ALL</option>
        <option value="VIEW_FEED">VIEW_FEED</option>
        <option value="VIEW_QUEST">VIEW_QUEST</option>
        <option value="VIEW_HEADQUARTERS">VIEW_HEADQUARTERS</option>
        <option value="VIEW_LEADERBOARD">VIEW_LEADERBOARD</option>
        <option value="POST_QUEST">POST QUEST</option>
        <option value="POST_SOLUTION">POST SOLUTION</option>
        <option value="POST_REPLY">POST REPLY</option>
        <option value="DELETE_QUEST">DELETE QUEST</option>
        <option value="DELETE_SOLUTION">DELETE SOLUTION</option>
        <option value="DELETE_REPLY">DELETE REPLY</option>
        <option value="UPVOTE_QUEST">UPVOTE_QUEST</option>
        <option value="UPVOTE_SOLUTION">UPVOTE_SOLUTION</option>
        <option value="DOWNVOTE_QUEST">DOWNVOTE_QUEST</option>
        <option value="DOWNVOTE_SOLUTION">DOWNVOTE_SOLUTION</option>
        <option value="FLAG_QUEST">FLAG_QUEST</option>
        <option value="UNFLAG_QUEST">UNFLAG_QUEST</option>
        <option value="MARK_SOLUTION">MARK_SOLUTION</option>
        <option value="REPORT_USER">REPORT_USER</option>
      </b-select>
    </b-field>
    <div class="scrollable">
      <table
        class="table container is-fullwidth is-striped is-hoverable is-bordered is-scrollable"
        id="logs-table"
      >
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>User</th>
            <th>Username</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(log, index) in logs" :key="index">
            <td>{{ log.date_created }}</td>
            <td>{{ log.fullname }}</td>
            <td>{{ log.username }}</td>
            <td>{{ log.context }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logs',
  data() {
    return {
      filterKey: 'ALL'
    };
  },
  computed: {
    logs() {
      const logs = this.$store.getters['admin/logs'];
      if (this.filterKey === 'ALL') {
        return logs;
      }
      return logs.filter(log => log.context === this.filterKey);
    }
  },
  methods: {
    retrieveData: function retrieveData() {
      this.$store.dispatch('admin/retrieveData');
    }
  },
  mounted() {
    this.retrieveData();
  }
};
</script>

<style scoped>
#logs {
  margin-top: 5vh !important;
}
.scrollable {
  overflow-y: scroll !important;
  height: 50vh !important;
}
</style>
