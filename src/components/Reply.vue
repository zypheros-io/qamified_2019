<template>
  <article class="media" id="reply-container">
    <figure class="media-left image is-64x64">
      <img :src="`../${reply.user_img_url}`" />
    </figure>
    <div class="media-content">
      <div class="content">
        <div id="user-name">
          <router-link
            :to="`/headquarters/${reply.user_id}`"
            class="is-primary-text color-primary"
          >
            {{ reply.full_name }}
          </router-link>
        </div>
        <!-- Response -->
        <div class="is-secondary-text" id="reply-response">
          {{ reply.description }}
        </div>
        <br />
        <!-- Misc -->
        <div class="is-secondary-text is-clearfix" id="reply-actions">
          <a
            class="is-secondary-text is-anchor is-pulled-left"
            v-on:click.prevent="confirmDelete"
            v-if="user.id === reply.user_id || user.is_admin"
          >
            Delete Reply
          </a>
          <p class="is-pulled-right">Posted {{ reply.date_created | date }}</p>
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
  font-size: 1.1em !important;
}
#reply-response {
  background: #eff0f1 !important;
  margin-top: 1em !important;
  border: 3px solid #f4f4f4 !important;
  max-width: 100% !important;
  width: 100% !important;
  overflow-wrap: break-word !important;
  word-wrap: break-word !important;
  hyphens: auto !important;
  font-size: 1.1em !important;
  padding: 5px !important;
  color: #242729 !important;
}
#reply-actions {
  font-size: 0.8em !important;
  margin-top: 0.7em !important;
}
</style>
