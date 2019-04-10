<template>
  <div class="box" id="solution-container">
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="user.img_url" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <!-- User name -->
          <div id="user-name">
            <p class="is-primary-text color-primary">
              {{ solution.full_name }}
            </p>
          </div>
          <!-- Response -->
          <div class="is-secondary-text" id="solution-response">
            {{ solution.description }}
          </div>
          <!-- Actions -->
          <div class="is-secondary-text" id="user-actions">
            <!-- Upvote -->
            <a class="is-secondary-text" v-on:click.prevent="toggleReply">
              <span class="mdi mdi-message-reply-text"></span>
              Reply
            </a>
            &nbsp;·&nbsp;
            <a class="is-secondary-text" v-on:click.prevent="upvoteSolution">
              <span class="mdi mdi-arrow-up-thick"></span>
              Upvote
            </a>
            &nbsp;·&nbsp;
            <a class="is-secondary-text" v-on:click.prevent="downvoteSolution">
              <span class="mdi mdi-arrow-down-thick"></span>
              Downvote
            </a>
            <a
              class="is-secondary-text"
              v-on:click.prevent="confirmDelete"
              v-if="user.id === solution.user_id"
            >
              &nbsp;·&nbsp;Delete Solution
            </a>
            &nbsp;·&nbsp;
            {{ solution.votes }} votes
          </div>
        </div>
        <!-- Reply -->
        <br />
        <article v-if="showReply" class="media">
          <figure class="media-left">
            <p class="image is-32x32">
              <img :src="user.img_url" />
            </p>
          </figure>
          <div class="media-content">
            <div class="field">
              <p class="control">
                <input
                  type="text"
                  class="input"
                  placeholder="Got something?"
                  v-model="reply.description"
                />
              </p>
            </div>
            <nav class="level">
              <div class="level-left"></div>
              <div class="level-right">
                <div class="level-item">
                  <button v-on:click.prevent="postReply" class="button is-info">
                    Leave reply
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </article>
        <!-- Replies -->
        <Reply v-for="reply in replies" :key="reply.id" v-bind:reply="reply" />
      </div>
    </article>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import Reply from './Reply';

export default {
  props: ['solution'],
  components: {
    Reply
  },
  data() {
    return {
      reply: {
        description: '',
        date_created: moment().format(),
        user_id: this.$store.getters['user/getUser'].id,
        username: this.$store.getters['user/getUser'].username,
        full_name: this.$store.getters['user/getUser'].fname,
        is_correct: false
      },
      showReply: false
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      getReplies: 'solution/replies'
    }),
    replies() {
      const replies = this.getReplies;
      return replies.filter(r => r.solution_id === this.solution.id);
    }
  },
  methods: {
    postReply: function postReply() {
      this.$store.dispatch('solution/postReply', {
        ...this.reply,
        solution_id: this.solution.id,
        user_img_url: this.user.img_url
      });
      this.reply.description = '';
    },
    toggleReply: function toggleReply() {
      this.showReply = !this.showReply;
    },
    populateReplies: function populateReplies() {
      this.$store.dispatch('solution/populateReplies', this.solution.id);
    },
    upvoteSolution: function upvoteSolution() {
      this.$store.dispatch(
        'quest/upvoteSolution',
        this.$store.getters['quest/loadSolution'](this.solution.id)
      );
    },
    downvoteSolution: function downvoteSolution() {
      this.$store.dispatch(
        'quest/downvoteSolution',
        this.$store.getters['quest/loadSolution'](this.solution.id)
      );
    },
    confirmDelete: function confirmDelete() {
      this.$dialog.confirm({
        title: 'Deleting solution',
        message:
          'Are you sure you want to <b>delete</b> this solution? This action cannot be undone.',
        confirmText: 'Yes, I am sure.',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () =>
          this.$store.dispatch('quest/deleteSolution', this.solution.id)
      });
    }
  },
  mounted() {
    this.populateReplies();
  }
};
</script>

<style scoped>
#solution-container {
  border-radius: 0px !important;
}
#user-name {
  font-size: 1.1em;
}
#solution-response {
  font-size: 1em;
  margin-top: 0.4em;
}
#user-actions {
  margin-top: 0.4em;
  font-size: 0.9em;
  cursor: pointer;
}
.media-left p span {
  cursor: pointer;
  font-weight: bold;
  font-size: 24px;
}
.media-left p span:hover {
  color: #fc6076;
}
.active-vote {
  color: #d7bce8;
}
</style>
