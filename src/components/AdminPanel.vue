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
import Dashboard from './admin/Dashboard';
import Logs from './admin/Logs';
import User from './admin/User';

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
  height: 100vh !important;
  width: 100 !important;
  padding-top: 100px !important;
}
</style>
