<template>
  <div id="quest">
    <div class="columns">
      <div class="column" id="quest-left"></div>
      <div class="column is-half" id="quest-column">
        <div class="card rounded-card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-2">{{ quest.title }}</p>
                <div class="is-divider"></div>
                <div id="quest-description-container">
                  <p>{{ quest.description }}</p>
                </div>
                <br />
                <p id="tags">
                  Tags: &nbsp;
                  <span class="tag is-light">{{ quest.category }}</span>
                </p>
                <div class="has-text-centered">
                  <button class="button is-game-btn is-game quest-btn">
                    RESPOND
                  </button>
                  <button class="button is-game-btn is-game quest-btn">
                    UPVOTE
                  </button>
                  <button class="button is-game-btn is-game quest-btn">
                    DOWNVOTE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="card rounded-card"
          v-for="solution in sortedSolutions"
          :key="solution.id"
        >
          <div class="card-content">
            <div class="media">
              <div class="media-content">{{ solution.description }}</div>
            </div>
          </div>
        </div>
        <div class="is-divider"></div>
        <div class="box">
          <div class="field">
            <textarea
              class="textarea is-small"
              placeholder="Know the answer?"
              v-model="description"
            ></textarea>
            <button
              class="button is-primary is-small is-game is-game-btn"
              id="submit-quest"
              v-on:click.prevent="postSolution"
              v-if="!isLoading"
            >
              Post Solution
            </button>
            <button
              class="button is-primary is-loading is-small is-game is-game-btn"
              id="submit-quest"
              v-on:click.prevent="postSolution"
              v-if="isLoading"
            ></button>
          </div>
        </div>
      </div>
      <div class="column" id="quest-right"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  props: ['id'],
  data() {
    return {
      description: '',
      date_created: moment().format(),
      votes: 0,
      user_id: this.$store.getters['user/getUser'].id,
      username: this.$store.getters['user/getUser'].username,
      full_name: this.$store.getters['user/getUser'].fname,
      is_correct: false,
      quest_id: this.id
    };
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      isLoading: 'quest/isLoading',
      sortedSolutions: 'quest/sortedSolutions'
    }),
    quest() {
      return this.$store.getters['feed/loadQuest'](this.id);
    }
  },
  methods: {
    upvoteQuest: function upvoteQuest(questId) {
      this.$store.dispatch(
        'feed/upvoteQuest',
        this.$store.getters['feed/loadQuest'](questId)
      );
    },
    postSolution: function postSolution() {
      if (this.description) {
        this.$store.dispatch('quest/postSolution', {
          description: this.description,
          date_created: this.date_created,
          votes: this.votes,
          user_id: this.user_id,
          username: this.username,
          full_name: this.full_name,
          is_correct: this.is_correct,
          quest_id: this.quest_id
        });
        this.description = '';
      } else {
        // eslint-disable-next-line
        alert('Please fill in the required fields.');
      }
    }
  }
};
</script>

<style scoped>
#quest {
  padding: 52px;
}
.card {
  margin: 15px !important;
}
#quest-description-container {
  background-color: #f0f0f0;
  padding: 15px;
}
#tags {
  font-size: 0.75rem;
}
.quest-btn {
  width: 30% !important;
  margin: 5px;
}
</style>
