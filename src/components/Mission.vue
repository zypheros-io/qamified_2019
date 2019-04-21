<template>
  <article class="message">
    <div class="message-header is-primary-text">
      {{ mission.title }}
    </div>
    <div class="message-body is-clearfix">
      <p class="is-pulled-left is-secondary-text" id="description">
        {{ mission.description }}
      </p>
      <p
        class="is-pulled-right is-secondary-text"
        id="counter"
        v-if="mission.requirements.current >= mission.requirements.required"
      >
        DONE!
      </p>
      <p class="is-pulled-right is-secondary-text" id="counter" v-else>
        {{ mission.requirements.current }} / {{ mission.requirements.required }}
      </p>
    </div>
  </article>
</template>

<script>
export default {
  props: ['mission']
};
</script>

<style scoped>
.message-header {
  background-color: #17b79c !important;
}
.message-body {
  background-color: #ffffff !important;
}
#description {
  font-weight: 500 !important;
}
#counter {
  font-weight: 800 !important;
  color: #303030 !important;
}
</style>
