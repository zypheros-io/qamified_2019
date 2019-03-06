<template>
  <div class="box solution-container">
    <div class="media">
      <div
        class="media-left has-text-centered has-text-grey-lighter is-primary-text"
      >
        <p>
          <span
            class="mdi mdi-arrow-up-thick"
            @click.prevent="upvoteSolution(solution.id)"
          ></span>
        </p>
        <p>
          <span class="is-primary-text">{{ solution.votes }}</span>
        </p>
        <p>
          <span
            class="mdi mdi-arrow-down-thick"
            @click.prevent="downvoteSolution(solution.id)"
          ></span>
        </p>
      </div>
      <div class="media-content">
        <div>
          <span class="title is-6 is-primary-text color-secondary">{{
            solution.username
          }}</span>
          <span class="title is-7 is-primary-text has-text-grey"
            >Posted&nbsp;{{ solution.date_created }}</span
          >
          <span
            style="font-size: 15px; color: #b9b9b9; cursor: pointer"
            v-if="getUser.id === solution.user_id"
            class="mdi mdi-close is-pulled-right"
            @click.prevent="confirmDelete"
          ></span>
        </div>
        <div class="solution-description">{{ solution.description }}</div>
        <br />
        <p class="subtitle is-7 is-secondary-text color-secondary">
          <a class="solution-reply" @click.prevent="toggleReply">Reply</a>
        </p>
        <div class="box" v-if="showReply">
          <b-field>
            <b-input
              placeholder="Enter Reply"
              v-model="reply.description"
            ></b-input>
          </b-field>
          <div>
            <button
              class="button is-primary-text bg-secondary color-white"
              @click.prevent="postReply(solution.id)"
            >
              POST
            </button>
          </div>
        </div>
        <!-- repliess -->
        <Reply v-for="reply in replies" :key="reply.id" v-bind:reply="reply" />
      </div>
    </div>
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
      getUser: 'user/getUser'
    }),
    replies() {
      const replies = this.$store.getters['solution/replies'];
      return replies.filter(r => r.solution_id === this.solution.id);
    }
  },
  methods: {
    postReply: function postReply(solutionId) {
      this.$store.dispatch('solution/postReply', {
        ...this.reply,
        solution_id: solutionId
      });
      this.reply.description = '';
    },
    toggleReply: function toggleReply() {
      this.showReply = !this.showReply;
    },
    populateReplies: function populateReplies() {
      this.$store.dispatch('solution/populateReplies', this.solution.id);
    },
    upvoteSolution: function upvoteSolution(solutionId) {
      this.$store.dispatch(
        'quest/upvoteSolution',
        this.$store.getters['quest/loadSolution'](solutionId)
      );
    },
    downvoteSolution: function downvoteSolution(solutionId) {
      this.$store.dispatch(
        'quest/downvoteSolution',
        this.$store.getters['quest/loadSolution'](solutionId)
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
        onConfirm: () => this.$toast.open('Rip solution')
      });
    }
  },
  mounted() {
    this.populateReplies();
  }
};
</script>

<style scoped>
.solution-container {
  border-radius: 25px !important;
}
.solution-description {
  padding-top: 15px;
}
.solution-reply {
  color: #fc6076;
}
.solution-reply:hover {
  color: #ff9a44;
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
