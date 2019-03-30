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
          <table
            class="table container is-fullwidth is-striped is-hoverable is-bordered is-scrollable"
            id="logs-table"
          >
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Activity</th>
              </tr>
            </thead>
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
      activeTab: 2
    };
  },
  computed: {
    users() {
      return this.$store.getters['admin/users'];
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
  padding-top: 100px;
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
