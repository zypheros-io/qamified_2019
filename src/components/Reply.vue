<template>
  <article class="media">
    <figure class="media-left image is-64x64">
      <img :src="reply.user_img_url" />
    </figure>
    <div class="media-content">
      <div class="content">
        <div id="user-name">
          <p class="is-primary-text color-primary">
            {{ reply.full_name }}
          </p>
        </div>
        <!-- Response -->
        <div class="is-secondary-text" id="reply-response">
          {{ reply.description }}
        </div>
        <!-- Misc -->
        <div class="is-secondary-text" id="reply-actions">
          <a
            class="is-secondary-text"
            v-on:click.prevent="confirmDelete"
            v-if="user.id === reply.user_id"
          >
            Delete Reply
          </a>
          &nbsp;·&nbsp;Posted {{ reply.date_created }}
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['reply'],
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  },
  methods: {
    confirmDelete: function confirmDelete() {
      this.$dialog.confirm({
        title: 'Deleting quest',
        message:
          'Are you sure you want to <b>delete</b> this reply? This action cannot be undone.',
        confirmText: 'Yes, I am sure.',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () =>
          this.$store.dispatch('solution/deleteReply', this.reply.id)
      });
    }
  }
};
</script>

<style scoped>
#user-name {
  font-size: 1.1em;
}
#reply-response {
  font-size: 1em;
  margin-top: 0.4em;
}
#reply-actions {
  font-size: 0.8em;
  margin-top: 0.7em;
}
</style>
