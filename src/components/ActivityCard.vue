<template>
  <div class="box is-clearfix">
    <div class="is-pulled-left">
      <b-tooltip
        label="Go to quest"
        type="is-light"
        position="is-right"
        animated
      >
        <router-link
          class="title is-5 is-primary-text"
          id="misc-title"
          :to="`/quest/${quest.id}`"
        >
          {{ quest.title }}
        </router-link>
        &nbsp;
      </b-tooltip>
    </div>
    <div class="is-pulled-right">
      <span class="is-secondary-text" id="misc-details">
        Posted {{ quest.date_created | date }}&nbsp;by
        <router-link :to="`/headquarters/${quest.user_id}`">
          <span>{{ quest.full_name }}</span>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['quest']
};
</script>

<style scoped>
.box {
  background-color: #eef7ed !important;
}
#misc-title {
  font-size: 1em !important;
}
#misc-details {
  font-size: 0.8em !important;
}
</style>
