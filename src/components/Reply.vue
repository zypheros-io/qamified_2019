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
      <div>
        <span class="title is-6 is-primary-text color-secondary">{{
          reply.username
        }}</span>
        <span class="title is-7 is-primary-text has-text-grey"
          >Posted&nbsp;{{ reply.date_created }}</span
        >
        <span
          style="font-size: 15px; color: #b9b9b9; cursor: pointer"
          v-if="user.id === reply.user_id"
          class="mdi mdi-close is-pulled-right"
          @click.prevent="confirmDelete"
        ></span>
      </div>
      <div class="reply-description">{{ reply.description }}</div>
      <br />
    </div>
  </div>
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
        onConfirm: () => this.$toast.open('Rip reply')
      });
    }
  }
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
