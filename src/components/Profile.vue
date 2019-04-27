<template>
  <div id="profile-page">
    <div class="columns">
      <div class="column" id="profile-user-card">{{ profile.fname }}</div>
      <div class="column" id="profile-tabs">
        <b-tabs
          size="is-small"
          type="is-toggle"
          :expanded="expanded"
          id="tabs-container"
        >
          <b-tab-item icon="trophy" label="Achievements">
            <div id="achievements">
              <div class="box" id="achievement">
                <div class="columns is-vcentered">
                  <!-- Trophy -->
                  <div class="column is-one-quarter">
                    <figure class="has-text-centered">
                      <img
                        id="trophy"
                        src="../../static/badges/chevron-1.svg"
                        alt="trophy"
                      />
                    </figure>
                  </div>
                  <!-- Description -->
                  <div class="column" id="achievement-desc">
                    <div>
                      <p class="title is-primary-text" id="trophy-title">
                        This is an achievement title
                      </p>
                      <p class="subtitle is-secondary-text" id="trophy-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="box" id="achievement">
                <div class="columns is-vcentered">
                  <!-- Trophy -->
                  <div class="column is-one-quarter">
                    <figure class="has-text-centered">
                      <img
                        id="trophy"
                        src="../../static/badges/chevron-1.svg"
                        alt="trophy"
                      />
                    </figure>
                  </div>
                  <!-- Description -->
                  <div class="column" id="achievement-desc">
                    <div>
                      <p class="title is-primary-text" id="trophy-title">
                        This is an achievement title
                      </p>
                      <p class="subtitle is-secondary-text" id="trophy-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-tab-item>
          <b-tab-item
            icon="format-list-bulleted"
            label="Activity Feed"
          ></b-tab-item>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['id'],
  data() {
    return {
      activeTab: 1,
      trophies: 1,
      expanded: true
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  }
};
</script>

<style scoped>
#profile-page {
  padding: 150px !important;
  height: 100% !important;
}
#profile-page .columns,
#profile-page .columns .column {
  height: inherit;
}
#tabs-container {
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
#achievement {
  width: 100%;
  border-radius: 0;
  text-decoration: none;
}
#trophy {
  height: 60%;
  width: 60%;
}
#trophy-title {
  font-size: 1.2vw;
  color: #aa73fe;
}
#trophy-desc {
  font-size: 0.8vw;
  color: #707070;
}
#achievement-desc .level,
#achievement-desc .level-item {
  height: 100%;
}
</style>
