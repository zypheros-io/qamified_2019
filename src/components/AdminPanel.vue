<template>
  <div class="container" id="admin-panel">
    <div>
      <b-tabs
        style="border: 1px solid black;"
        v-model="activeTab"
        position="is-centered"
        type="is-toggle"
        expanded
      >
        <b-tab-item label="Dashboard"></b-tab-item>
        <b-tab-item label="Logs">
          <b-field label="Filter by:" class="is-pulled-right">
            <b-select v-model="filterKey">
              <option value="ALL">ALL</option>
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
            </b-select>
          </b-field>
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
              <tr
                v-if="filterLogs(log)"
                v-for="(log, index) in logs"
                :key="index"
              >
                <td>{{ log.date_created }}</td>
                <td>{{ log.fullname }}</td>
                <td>{{ log.username }}</td>
                <td>{{ log.context }}</td>
              </tr>
            </tbody>
          </table>
        </b-tab-item>
        <b-tab-item label="Users">
          <table
            class="table container is-fullwidth is-striped is-hoverable is-bordered is-scrollable"
            id="users-table"
          >
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Username</th>
                <th>Level</th>
                <th>Experience</th>
                <th>Rank</th>
                <th>Reputation</th>
                <th>Reported</th>
                <th>Ban?</th>
              </tr>
            </thead>
            <tbody height="30vh">
              <tr v-for="(user, index) in users" :key="index">
                <td>{{ user.fname + ' ' + user.lname }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.level }}</td>
                <td>{{ user.experience }}</td>
                <td>{{ user.rank }}</td>
                <td>{{ user.reputation }}</td>
                <td>{{ user.is_banned }}</td>
                <td>
                  <button
                    class="ban-button button is-small is-primary-text is-danger"
                    @click.prevent="ban(user)"
                  >
                    <span class="mdi mdi-heart-off"></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'Kenichii',
      activeTab: 2,
      filterKey: 'ALL'
    };
  },
  computed: {
    users() {
      return this.$store.getters['admin/users'];
    },
    logs() {
      return this.$store.getters['admin/logs'];
    }
  },
  methods: {
    retrieveData: function retrieveData() {
      this.$store.dispatch('admin/retrieveData');
    },
    ban: function ban(user) {
      this.$dialog.confirm({
        title: 'Ban User',
        message:
          'You are about to ban this user, are you sure? This cannot be reverted',
        confirmText: 'Yes, I am sure.',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.$store.dispatch('admin/banUser', user)
      });
    },
    filterLogs: function filterLogs(log) {
      // Filter results
      if (this.filterKey === 'ALL' || log.context === this.filterKey) {
        return true;
      }
      // If doesn't match filter
      return false;
    }
  },
  mounted() {
    this.retrieveData();
  }
};
</script>

<style scoped>
#admin-panel {
  height: 100vh;
  width: 100%;
  padding: 100px 15px 15px 15px;
}
#admin-panel .level,
#admin-panel .level-item {
  height: 100vh;
  width: 100%;
}
.ban-button {
  margin: 0;
}
</style>
