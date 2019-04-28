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
      <div class="column">
        <article class="message">
          <div class="message-header">
            <p>Quests Posted</p>
          </div>
          <div class="message-body">
            <Activity-Card
              v-for="quest in quests"
              :key="quest.id"
              v-bind:quest="quest"
            ></Activity-Card>
          </div>
        </article>
        <div class="is-divider"></div>
        <article class="message">
          <div class="message-header">
            <p>Quests Responded To</p>
          </div>
          <div class="message-body">
            <Activity-Card
              v-for="quest in responded"
              :key="quest.id"
              v-bind:quest="quest"
            ></Activity-Card>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProfileCard from './ProfileCard';
import Mission from './Mission';
import ActivityCard from './ActivityCard';
import QuestPreview from './QuestPreview';

export default {
  beforeRouteUpdate(to, from, next) {
    this.populateProfile();
    next();
  },
  props: ['id'],
  components: {
    ProfileCard,
    Mission,
    ActivityCard,
    QuestPreview
  },
  computed: {
    ...mapGetters({
      user: 'headquarters/user',
      missions: 'headquarters/missions',
      quests: 'headquarters/quests',
      responded: 'headquarters/responded'
    })
  },
  methods: {
    ...mapActions({
      populate: 'headquarters/populateProfile',
      log: 'user/updateLogs'
    }),
    populateProfile: function populateProfile() {
      this.log('VIEW_HEADQUARTERS');
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
.message-header {
  background-color: #17b79c !important;
}
.message-body {
  background-color: #ffffff !important;
}
</style>
