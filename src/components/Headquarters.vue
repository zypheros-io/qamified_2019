<template>
  <div class="headquarters container">
    <!-- Report modal -->
    <b-modal :active.sync="showReportModal" :width="450">
      <div id="modal">
        <div class="box has-text-centered">
          <p class="is-primary-text">I am reporting this user for...</p>
          <p class="is-secondary-text">(Click the dropdown to see choices)</p>
          <b-field class="margin-top-1">
            <b-select placeholder="hmm..." v-model="reportReason" expanded>
              <option value="False information">False information</option>
              <option value="Trolling">Trolling</option>
              <option value="Spamming">Spamming</option>
              <option value="Negative Attitude">Negative Attitude</option>
            </b-select>
          </b-field>
          <b-field>
            <button
              class="button is-fullwidth primary-btn"
              v-on:click.prevent="submitReport"
            >
              SUBMIT
            </button>
          </b-field>
        </div>
      </div>
    </b-modal>
    <!-- End report modal -->
    <div class="columns">
      <div class="column is-two-fifths">
        <Profile-Card
          @reported="popReportModal"
          v-bind:user="user"
        ></Profile-Card>
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
import moment from 'moment';
import ProfileCard from './ProfileCard';
import Mission from './Mission';
import ActivityCard from './ActivityCard';
import Trophy from './Trophy';

export default {
  beforeRouteUpdate(to, from, next) {
    this.populateProfile(to.params.id);
    next();
  },
  data() {
    return {
      showReportModal: false,
      reportReason: '',
      reportedUser: null
    };
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
      responded: 'headquarters/responded',
      currUser: 'user/getUser'
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
      log: 'user/updateLogs',
      report: 'headquarters/submitReport'
    }),
    populateProfile(id) {
      this.log('VIEW_HEADQUARTERS');
      this.populate(id);
    },
    popReportModal: function popReportModal(value) {
      this.showReportModal = true;
      this.reportedUser = value;
    },
    submitReport: function submitReport() {
      this.report({
        date_created: moment().format(),
        reporter_id: this.currUser.id,
        reporter_name: this.currUser.fname,
        reported_user_id: this.reportedUser.id,
        reported_user_name: this.reportedUser.fname,
        reason: this.reportReason
      });
      // reset
      this.reportReason = '';
      this.reportedUser = null;
      this.showReportModal = false;
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
