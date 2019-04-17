<template>
  <div class="card" id="user-card-container">
    <div class="card-header has-text-centered">
      <figure class="image is-128x128" id="card-user-avatar">
        <img class="is-rounded" :src="`../../${user.img_url}`" />
      </figure>
      <figure class="image is-64x64" id="card-user-badge">
        <img :src="`../../${user.badge_url}`" />
      </figure>
    </div>
    <div class="card-content">
      <div class="has-text-centered is-primary-text" id="user-details">
        <p class="title is-3 color-white">
          {{ user.fname + ' ' + user.lname }}
        </p>
        <!-- User Rank -->
        <p
          class="is-secondary-text subtitle is-6 color-highlight"
          style="padding-bottom: 1px;"
        >
          {{ user.rank }} Adventurer
        </p>
      </div>
      <div class="is-divider" data-content="ADVENTURER STATS"></div>
      <div id="card-user-experience">
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
            <p class="stats-head heading is-secondary-text">Quests posted</p>
            <p class="stats-count title is-primary">3,456</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="stats-head heading is-secondary-text">Solutions posted</p>
            <p class="stats-count title is-primary">123</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="stats-head heading is-secondary-text">Reputation</p>
            <p class="stats-count title is-primary">{{ user.reputation }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters['user/getUser'];
    }
  }
};
</script>

<style scoped>
.card-header {
  width: 100%;
  background-color: #37ccb3;
  padding: 15px;
}
.card-content {
  width: 100%;
  background-color: #17b79c;
  padding: 15px;
}
#card-user-avatar {
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: 25%;
}
#card-user-badge {
  position: absolute;
  margin-left: 50%;
  margin-top: 13%;
  width: 13%;
}
#user-details {
  width: 100%;
  color: #4b465e;
}
/* overrides */
progress {
  display: block; /* default: inline-block */
  width: 100%;
  height: 15px;
  margin: 2em auto;
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  padding: 4px;
  border: 0 none;
  background: #444;
  border-radius: 14px;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5),
    0px 1px 0px rgba(255, 255, 255, 0.2);
}
progress::-moz-progress-bar {
  border-radius: 12px;
  background: #64df31;
  box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.4),
    0 2px 5px 0px rgba(0, 0, 0, 0.3);
}
progress::-webkit-progress-bar {
  background: transparent;
}
progress::-webkit-progress-value {
  border-radius: 12px;
  background: #64df31;
  box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.4),
    0 2px 5px 0px rgba(0, 0, 0, 0.3);
}
.stats-head {
  color: #242729 !important;
}

.stats-head {
  color: #ffffff !important;
}
</style>
