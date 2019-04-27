<template>
  <div class="box" id="users">
    <div class="scrollable">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
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
#users {
  margin-top: 5vh !important;
}
.scrollable {
  overflow: scroll !important;
  height: 60vh !important;
}
</style>
