<template>
  <div class="media reply-container">
    <div
      class="media-left has-text-grey-lighter is-primary-text has-text-centered"
    >
      <p>
        <span
          class="mdi mdi-arrow-up-thick"
          @click.prevent="upvoteReply(reply.id)"
        ></span>
      </p>
      <p><span class="is-primary-text">0</span></p>
      <p>
        <span
          class="mdi mdi-arrow-down-thick"
          @click.prevent="downvoteReply(reply.id)"
        ></span>
      </p>
    </div>
    <div class="media-content">
      <span class="title is-6 is-primary-text color-secondary">{{
        reply.username
      }}</span>
      <span class="title is-7 is-primary-text has-text-grey"
        >Posted&nbsp;{{ reply.date_created }}</span
      >
      <div class="solution-description">{{ reply.description }}</div>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  props: ['reply']
};
</script>
