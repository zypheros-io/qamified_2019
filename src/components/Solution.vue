<template>
  <div class="box" id="solution-container">
    <article class="media">
      <div class="media-left has-text-centered has-text-grey-lighter">
        <p>
          <b-tooltip
            label="Solution is helpful and well-researched"
            type="is-light"
            position="is-left"
            animated
          >
            <span
              class="mdi mdi-arrow-up-bold-circle-outline active-vote"
              v-on:click.prevent="upvoteSolution"
              v-if="solution.upvote.includes(user.id)"
            ></span>
            <span
              class="mdi mdi-arrow-up-bold-circle-outline"
              v-on:click.prevent="upvoteSolution"
              v-else-if="!solution.upvote.includes(user.id)"
            ></span>
          </b-tooltip>
        </p>
        <p>
          <span class="is-primary-text" id="votes">
            {{ solution.votes }}
          </span>
        </p>
        <p>
          <b-tooltip
            label="Solution does not show any sign of effort"
            type="is-light"
            position="is-left"
            animated
          >
            <span
              class="mdi mdi-arrow-down-bold-circle-outline active-vote"
              v-on:click.prevent="downvoteSolution"
              v-if="solution.downvote.includes(user.id)"
            ></span>
            <span
              class="mdi mdi-arrow-down-bold-circle-outline"
              v-on:click.prevent="downvoteSolution"
              v-else-if="!solution.downvote.includes(user.id)"
            ></span>
          </b-tooltip>
        </p>
        <b-tooltip
          label="The quest owner marked this solution as the correct response"
          type="is-light"
          position="is-bottom"
          v-if="solution.is_correct"
          id="is-correct"
        >
          <span class="mdi mdi-check-outline"></span>
        </b-tooltip>
      </div>
      <div class="media-content">
        <div class="solution-user-details is-clearfix">
          <div class="is-pulled-left">
            <figure class="image is-24x24" style="float:left">
              <img
                :src="`../${user.img_url}`"
                alt="user-avatar"
                class="is-rounded"
              />
            </figure>
            &nbsp;
            <b-tooltip
              label="View profile"
              type="is-light"
              position="is-right"
              animated
            >
              <router-link
                class="title is-4 is-primary-text color-secondary"
                id="user-name"
                :to="`/headquarters/${solution.user_id}`"
                style="display: inline"
              >
                {{ solution.full_name }}
              </router-link>
            </b-tooltip>
          </div>
          <div class="is-pulled-right">
            <b-tooltip
              label="Delete this quest"
              type="is-light"
              position="is-right"
              animated
            >
              <span
                class="mdi mdi-close"
                v-if="user.id === solution.user_id || user.is_admin"
                v-on:click.prevent="confirmDelete"
                id="solution-delete"
              ></span>
            </b-tooltip>
          </div>
        </div>
        <div id="solution-description">
          <vue-markdown>{{ solution.description }}</vue-markdown>
        </div>
        <div class="is-divider"></div>
        <div class="is-clearfix is-secondary-text" id="user-actions">
          <div class="is-pulled-left">
            <a
              class="is-anchor"
              v-on:click.prevent="markAsAnswer"
              v-if="user.id === quest.user_id && !solution.is_correct"
            >
              Mark As Correct
            </a>
            <a
              class="is-anchor"
              v-on:click.prevent="markAsAnswer"
              v-else-if="user.id === quest.user_id && solution.is_correct"
            >
              Unmark
            </a>
            &nbsp;·&nbsp;
            <a class="is-anchor" v-on:click.prevent="toggleReply">
              Reply
            </a>
          </div>
          <div class="is-pulled-right">
            Posted {{ solution.date_created | date }}
          </div>
        </div>
        <!-- Reply -->
        <br />
        <article v-if="showReply" class="media">
          <figure class="media-left">
            <p class="image is-32x32">
              <img :src="`../${user.img_url}`" />
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
                  <button
                    v-on:click.prevent="postReply"
                    class="button primary-btn is-secondary-text"
                  >
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
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import VueMarkdown from 'vue-markdown';
import Reply from './Reply';

export default {
  props: ['solution'],
  components: {
    Reply,
    VueMarkdown
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
      getReplies: 'solution/replies',
      load: 'feed/loadQuest'
    }),
    replies() {
      const replies = this.getReplies;
      return replies.filter(r => r.solution_id === this.solution.id);
    },
    quest() {
      return this.load(this.solution.quest_id);
    }
  },
  methods: {
    ...mapActions({
      correct: 'solution/markAsAnswer'
    }),
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
    },
    markAsAnswer: function markAsAnswer() {
      this.correct(this.solution);
    }
  },
  mounted() {
    this.populateReplies();
  }
};
</script>

<style scoped>
#solution-container {
  width: 95% !important;
  margin-left: 3vw !important;
}
#user-name {
  font-size: 1.4em !important;
}
#solution-description {
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
#is-correct {
  color: #45a163 !important;
}
.media-left .mdi {
  font-size: 2em !important;
  cursor: pointer !important;
  font-weight: bold !important;
}
.media-left .mdi:hover {
  color: #37ccb3 !important;
}
.active-vote {
  color: #17b79c !important;
}
#votes {
  font-size: 1.5em !important;
}
#solution-delete {
  font-size: 15px !important;
  color: #b9b9b9 !important;
  cursor: pointer !important;
}
#user-actions {
  font-size: 0.8em !important;
}
</style>
