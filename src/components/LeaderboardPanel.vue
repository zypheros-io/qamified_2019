<template>
  <article class="message">
    <div class="message-header"></div>
    <div class="message-body">
      <div class="media">
        <div class="media-left">
          <figure class="image is-128x128">
            <img id="trophy" :src="`../${user.img_url}`" />
          </figure>
        </div>
        <div class="media-content is-clearfix">
          <div class="is-pulled-left" id="user-details">
            <p class="is-primary-text" id="panel-fullname">
              {{ user.fname + ' ' + user.lname }}
            </p>
            <p class="is-primary-text" id="panel-institution">
              Institution: {{ user.institution }}
            </p>
            <p class="is-primary-text" id="panel-rank">
              Rank: {{ user.rank }} Adventurer
            </p>
            <br />
            <div>
              <p class="is-primary-text color-primary" style="text-align:left;">
                Lvl: {{ user.level }}
              </p>
              <progress
                id="exp_bar"
                :value="user.experience"
                :max="user.level_cap"
              ></progress>
              <p
                class="is-primary-text color-primary"
                style="text-align:right;"
              >
                {{ user.experience }} / {{ user.level_cap }}
              </p>
            </div>
          </div>
          <div class="is-pulled-right">
            <span class="is-primary-text" id="panel-reputation-points">
              {{ user.reputation }} pts
            </span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['user']
};
</script>

<style scoped>
.message {
  margin-bottom: 30px;
}
.message-header {
  background-color: #17b79c !important;
}
.message-body {
  background-color: #ffffff !important;
  padding: auto !important;
}
#user-details {
  padding-left: 20px !important;
  min-width: 50% !important;
}
#panel-fullname {
  font-size: 2.5em !important;
}
#panel-institution {
  font-size: 1.3em !important;
}
#panel-reputation-points {
  font-size: 2.5em !important;
  color: #17b79c !important;
}
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
