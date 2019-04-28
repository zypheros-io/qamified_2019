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
        <!-- Trophies -->
        <article class="message">
          <div class="message-header">
            <p>Achievement Trophies</p>
          </div>
          <div class="message-body">
            <Trophy
              v-for="mission in missionsDone"
              :key="mission.index"
              v-bind:mission="mission"
            ></Trophy>
            <p
              class="is-secondary-text"
              style="text-align:center"
              v-if="missionsDone.length === 0"
            >
              This adventure does not have any trophies yet.
            </p>
          </div>
        </article>
        <!-- Quests -->
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
            <p
              class="is-secondary-text"
              style="text-align: center;"
              v-if="quests.length === 0"
            >
              This adventurer has not posted any quests yet.
            </p>
          </div>
        </article>
        <!-- Solutions -->
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
            <p
              class="is-secondary-text"
              style="text-align: center;"
              v-if="responded.length === 0"
            >
              This adventurer has not responded to any quests yet.
            </p>
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
import Trophy from './Trophy';

export default {
  beforeRouteUpdate(to, from, next) {
    this.populateProfile(to.params.id);
    next();
  },
  components: {
    ProfileCard,
    Mission,
    ActivityCard,
    Trophy
  },
  computed: {
    ...mapGetters({
      user: 'headquarters/user',
      missions: 'headquarters/missions',
      quests: 'headquarters/quests',
      responded: 'headquarters/responded'
    }),
    missionsDone() {
      const missionsArray = this.missions;
      return missionsArray.filter(
        m => m.requirements.current >= m.requirements.required
      );
    }
  },
  methods: {
    ...mapActions({
      populate: 'headquarters/populateProfile',
      log: 'user/updateLogs'
    }),
    populateProfile(id) {
      this.log('VIEW_HEADQUARTERS');
      this.populate(id);
    }
  },
  created() {
    this.populateProfile(this.$route.params.id);
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
