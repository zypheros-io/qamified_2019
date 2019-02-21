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
        <span class="title is-6 is-primary-text color-secondary">{{
          solution.username
        }}</span>
        <span class="title is-7 is-primary-text has-text-grey"
          >Posted&nbsp;{{ solution.date_created }}</span
        >
        <div class="solution-description">{{ solution.description }}</div>
        <br />
        <p class="subtitle is-7 is-secondary-text color-secondary">
          <a class="solution-reply" @click.prevent="toggleReply">Reply</a>
        </p>
        <div class="box" v-if="showReply">
          <b-field>
            <b-input
              placeholder="Enter Reply"
              v-model="newReply.description"
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
import moment from 'moment';
import Reply from './Reply';

export default {
  props: ['solution'],
  components: {
    Reply
  },
  data() {
    return {
      newReply: {
        description: '',
        date_created: moment().format(),
        votes: 0,
        user_id: this.$store.getters['user/getUser'].id,
        username: this.$store.getters['user/getUser'].username,
        full_name: this.$store.getters['user/getUser'].fname,
        is_correct: false
      },
      showReply: false
    };
  },
  computed: {
    replies() {
      const replies = this.$store.getters['solution/replies'];
      return replies.filter(r => r.solution_id === this.solution.id);
    }
  },
  mounted() {
    console.log();
  },
  methods: {
    postReply: function postReply(solutionId) {
      this.$store.dispatch('solution/postReply', {
        description: this.newReply.description,
        date_created: this.newReply.date_created,
        votes: this.newReply.votes,
        user_id: this.newReply.user_id,
        username: this.newReply.username,
        full_name: this.newReply.full_name,
        is_correct: this.newReply.is_correct,
        solution_id: solutionId
      });
      this.newReply.description = '';
    },
    toggleReply: function toggleReply() {
      this.showReply = !this.showReply;
    }
  }
};
</script>
