<template>
  <div class="media reply-container">
    <div
      class="media-left has-text-grey-lighter is-primary-text has-text-centered"
    >
      <p><span class="mdi mdi-arrow-up-thick"></span></p>
      <p><span class="is-primary-text">0</span></p>
      <p><span class="mdi mdi-arrow-down-thick"></span></p>
    </div>
    <div class="media-content">
      <span class="title is-6 is-primary-text color-secondary">{{
        reply.username
      }}</span>
      <span class="title is-7 is-primary-text has-text-grey"
        >Posted&nbsp;{{ reply.date_created }}</span
      >
      <div class="reply-description">{{ reply.description }}</div>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  props: ['reply']
};
</script>

<style scoped>
.reply-description {
  padding-top: 15px;
}
.media-left p span {
  cursor: pointer;
  font-weight: bold;
  font-size: 24px;
}
.media-left p span:hover {
  color: #fc6076;
}
</style>
