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
        <p class="is-secondary-text subtitle is-5 color-white">
          {{ user.description }}
        </p>
        <p
          class="is-primary-text subtitle is-6 color-highlight"
          style="padding-bottom: 1px;"
        >
          {{ user.rank }} Adventurer
        </p>
        <social-sharing
          :url="`http://qamified.tk/headquarters/${user.id}`"
          title="Visit my headquarters in QAmifiED! Go sign in first, though!"
          description="QAmifiED is a gamified collaborative QnA platform"
          quote="Sign in and visit my headquarters in QAmifiED!"
          hashtags="qamified,sablay2019"
          inline-template
        >
          <div>
            <network network="facebook">
              <button
                class="button is-primary-text share-btn"
                style="background: #f4e46b !important;
                        color: #17b79c !important;
                        border: none !important;
                        border-radius: 8px !important;
                        text-decoration: none !important;
                        width: 40% !important;"
              >
                Share to Facebook
              </button>
            </network>
            <network network="twitter">
              <button
                class="button is-primary-text"
                style="background: #f4e46b !important;
                        color: #17b79c !important;
                        border: none !important;
                        border-radius: 8px !important;
                        text-decoration: none !important;
                        width: 40% !important;"
              >
                Share to Twitter
              </button>
            </network>
          </div>
        </social-sharing>
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      quests: 'feed/sortedQuests'
    }),
    userQuest() {
      const questArray = this.quests;
      return questArray.filter(q => q.user_id === this.user.id);
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
#card-user-avatar {
  margin-left: auto !important;
  margin-right: auto !important;
  display: block !important;
  width: 25% !important;
}
#card-user-badge {
  position: absolute !important;
  margin-left: 50% !important;
  margin-top: 13% !important;
  width: 11% !important;
}
#user-details {
  width: 100% !important;
  color: #4b465e !important;
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
.stats-head {
  color: #242729 !important;
}
.stats-head {
  color: #ffffff !important;
}
.share-btn {
  background: #f4e46b !important;
  color: #17b79c !important;
  border: none !important;
  border-radius: 8px !important;
  text-decoration: none !important;
  width: 40% !important;
}
.share-btn:hover {
  background: #ffffff !important;
}
</style>
