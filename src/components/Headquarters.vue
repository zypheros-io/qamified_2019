<template>
  <div class="headquarters container">
    <div class="columns">
      <div class="column is-two-fifths" id="profile-card">
        <Profile-Card></Profile-Card>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ProfileCard from './ProfileCard';

export default {
  props: ['id'],
  components: {
    ProfileCard
  },
  methods: {
    ...mapActions({
      populate: 'headquarters/populateProfile'
    }),
    populateProfile: function populateProfile() {
      this.populate(this.id);
    }
  },
  created() {
    this.populateProfile();
  }
};
</script>

<style scoped>
.headquarters {
  width: 100% !important;
  padding-top: 75px !important;
}
</style>
