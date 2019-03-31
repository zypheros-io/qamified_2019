<template>
  <div class="container" id="admin-panel">
    <b-tabs
      v-model="activeTab"
      position="is-centered"
      class="block"
      id="tabs"
      expanded
    >
      <b-tab-item label="Dashboard">
        <Dashboard></Dashboard>
      </b-tab-item>
      <b-tab-item label="Logs">
        <Logs></Logs>
      </b-tab-item>
      <b-tab-item label="Users">
        <User></User>
      </b-tab-item>
    </b-tabs>
  </div>
</template>
<script>
import Dashboard from './Dashboard';
import Logs from './Logs';
import User from './User';

export default {
  components: {
    Dashboard,
    Logs,
    User
  },
  data() {
    return {
      activeTab: 0
    };
  }
};
</script>

<style scoped>
#admin-panel {
  height: 100vh;
  width: 100%;
  padding-top: 100px;
}
</style>
