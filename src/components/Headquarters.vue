<template>
  <div class="headquarters container">
    <div class="columns">
      <div class="column is-two-fifths">
        <Profile-Card v-bind:user="user"></Profile-Card>
        <div class="is-divider"></div>
        <p class="title is-4 is-primary-text">Missions</p>
        <Mission
          v-for="mission in missions"
          :key="mission.index"
          v-bind:mission="mission"
        ></Mission>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProfileCard from './ProfileCard';
import Mission from './Mission';

export default {
  props: ['id'],
  components: {
    ProfileCard,
    Mission
  },
  computed: {
    ...mapGetters({
      user: 'headquarters/user',
      missions: 'headquarters/missions'
    })
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
