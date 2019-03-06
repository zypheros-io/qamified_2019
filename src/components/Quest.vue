<template>
  <div id="quest">
    <div class="columns">
      <div class="column"></div>
      <div class="column is-three-fifths">
        <div class="box">
          <div class="media">
            <div
              class="media-left has-text-centered has-text-grey-lighter is-primary-text"
              id="quest-container"
            >
              <p>
                <span
                  class="mdi mdi-arrow-up-thick"
                  @click.prevent="upvoteQuest(quest.id)"
                ></span>
              </p>
              <p>
                <span class="is-primary-text">{{ quest.votes }}</span>
              </p>
              <p>
                <span
                  class="mdi mdi-arrow-down-thick"
                  @click.prevent="downvoteQuest(quest.id)"
                ></span>
              </p>
            </div>
            <div class="media-content">
              <p
                class="title is-2 color-primary is-primary-text"
                id="quest-title"
              >
                {{ quest.title }}
              </p>
              <div class="is-secondary-text" id="quest-description">
                {{ quest.description }}
              </div>
              <div class="is-primary-text">
                <br />
                <span class="subtitle is-7">Tagged as:</span>&nbsp;
                <span class="tag is-light quest-tag">{{ quest.category }}</span>
                <p class="subtitle is-7 is-pulled-right">
                  <span class="has-text-grey">{{ quest.date_created }}</span>
                  &nbsp;
                  <span class="has-text-grey">
                    Posted by&nbsp; <a href>{{ quest.full_name }}</a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  class="is-rounded"
                  src="https://bulma.io/images/placeholders/128x128.png"
                  alt="Image"
                />
              </figure>
            </div>
            <div class="media-content is-primary-text">
              <b-field>
                <b-input
                  placeholder="Quest description"
                  v-model="solution.description"
                ></b-input>
              </b-field>
              <div>
                <button
                  class="button is-pulled-right is-primary-text bg-secondary color-white"
                  @click.prevent="postSolution"
                >
                  POST
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- mes -->
        <div id="solutions">
          <Solution
            v-for="solution in sortedSolutions"
            :key="solution.id"
            v-bind:solution="solution"
          />
        </div>
        <!-- ssage -->
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import Solution from './Solution';

export default {
  props: ['id'],
  components: {
    Solution
  },
  data() {
    return {
      solution: {
        description: '',
        date_created: moment().format(),
        votes: 0,
        user_id: this.$store.getters['user/getUser'].id,
        username: this.$store.getters['user/getUser'].username,
        full_name: this.$store.getters['user/getUser'].fname,
        is_correct: false,
        quest_id: this.id
      }
    };
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      isLoading: 'quest/isLoading',
      sortedSolutions: 'quest/sortedSolutions',
      loadQuest: 'feed/loadQuest'
    }),
    quest() {
      return this.$store.getters['feed/loadQuest'](this.id);
    }
  },
  methods: {
    upvoteQuest: function upvoteQuest(questId) {
      this.$store.dispatch('feed/upvoteQuest', this.loadQuest(questId));
    },
    downvoteQuest: function downvoteQuest(questId) {
      this.$store.dispatch('feed/downvoteQuest', this.loadQuest(questId));
    },
    postSolution: function postSolution() {
      if (this.solution.description) {
        this.$store.dispatch('quest/postSolution', this.solution);
        this.solution.description = '';
      } else {
        // eslint-disable-next-line
        alert('Please fill in the required fields.');
      }
    },
    populateSolutions: function populateSolutions() {
      this.$store.dispatch('quest/populateSolutions', this.id);
    }
  },
  mounted() {
    this.populateSolutions();
  }
};
</script>

<style scoped>
#quest {
  padding: 72px;
}
#quest-title {
  margin-bottom: 15px;
  margin-top: 10px;
}
#quest-description {
  background-color: #f0f0f0;
  padding: 15px;
  margin-top: 15px;
}
.media-left p span {
  cursor: pointer;
  font-weight: bold;
}
.media-left p span:hover {
  color: #fc6076;
}
/* OVERRIDES */
#quest-container .mdi {
  font-size: 36px;
}
</style>
