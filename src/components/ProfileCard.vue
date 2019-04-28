<template>
  <div class="card" id="profile-card-container">
    <div class="card-header has-text-centered">
      <figure class="image is-128x128" id="profile-card-avatar">
        <img
          :src="`../../${user.img_url}`"
          class="is-rounded"
          alt="user avatar"
        />
      </figure>
      <figure class="image is-64x64" id="profile-card-badge">
        <img :src="`../../${user.badge_url}`" />
      </figure>
    </div>
    <div class="card-content">
      <div class="has-text-centered is-primary-text" id="user-details">
        <p class="title is-3 color-white">
          {{ user.fname + ' ' + user.lname }}
        </p>
        <p class="is-secondary-text subtitle is-5 color-white">
          {{ user.description }}
        </p>
        <p
          class="is-primary-text subtitle is-6 color-highlight"
          style="padding-bottom: 1px;"
        >
          {{ user.rank }} Adventurer
        </p>
        <button
          v-on:click.prevent="reportUser(user.id)"
          class="button is-primary-text"
          id="report-btn"
        >
          Report User
        </button>
      </div>
      <div class="is-divider" data-content="Adventurer Experience"></div>
      <div>
        <p class="is-primary-text" style="text-align:left; color: #ffffff">
          Lvl: {{ user.level }}
        </p>
        <progress
          id="exp_bar"
          :value="user.experience"
          :max="user.level_cap"
        ></progress>
        <p class="is-primary-text" style="text-align:right; color: #ffffff">
          {{ user.experience }} / {{ user.level_cap }}
        </p>
      </div>
      <br />
      <!-- User stats -->
      <div class="level" id="misc-stats">
        <div class="level-item has-text-centered">
          <div>
            <p class="stats-head heading is-secondary-text color-white">
              Quests posted
            </p>
            <p class="stats-count title is-primary-text color-highlight">
              3,456
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="stats-head heading is-secondary-text color-white">
              Solutions posted
            </p>
            <p class="stats-count title is-primary-text color-highlight">
              123
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="stats-head heading is-secondary-text color-white">
              Reputation
            </p>
            <p class="stats-count title is-primary-text color-highlight">
              {{ user.reputation }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['user'],
  methods: {
    ...mapActions({
      report: 'headquarters/reportUser'
    }),
    reportUser: function reportUser(userId) {
      this.report(userId);
    }
  }
};
</script>

<style scoped>
.card-header {
  width: 100% !important;
  background-color: #37ccb3 !important;
  padding: 15px !important;
}
.card-content {
  width: 100% !important;
  background-color: #17b79c !important;
  padding: 15px !important;
}
#profile-card-avatar {
  margin-left: auto !important;
  margin-right: auto !important;
  display: block !important;
  width: 25% !important;
}
#profile-card-badge {
  position: absolute !important;
  margin-left: 50% !important;
  margin-top: 13% !important;
  width: 11% !important;
}
#report-btn {
  background: #f4e46b !important;
  color: #17b79c !important;
  border: none !important;
  border-radius: 8px !important;
  text-decoration: none !important;
  width: 40% !important;
}
#report-btn:hover {
  background: #ffffff !important;
}
/* overrides */
progress {
  display: block !important;
  width: 100% !important;
  height: 15px !important;
  margin: 2em auto !important;
  margin-top: 0.2em !important;
  margin-bottom: 0.2em !important;
  padding: 4px !important;
  border: 0 none !important;
  background: #444 !important;
  border-radius: 14px !important;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5) 0px 1px 0px
    rgba(255, 255, 255, 0.2) !important;
}
progress::-moz-progress-bar {
  border-radius: 12px !important;
  background: #64df31 !important;
  box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.4),
    0 2px 5px 0px rgba(0, 0, 0, 0.3) !important;
}
progress::-webkit-progress-bar {
  background: transparent !important;
}
progress::-webkit-progress-value {
  border-radius: 12px !important;
  background: #64df31 !important;
  box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.4),
    0 2px 5px 0px rgba(0, 0, 0, 0.3) !important;
}
</style>
