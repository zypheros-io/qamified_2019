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
                    Posted by&nbsp;<a href="">{{ quest.full_name }} </a>
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
                  v-model="newSol.description"
                >
                </b-input>
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
          <div
            class="box solution-container"
            v-for="solution in sortedSolutions"
            :key="solution.id"
          >
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
                <span class="title is-6 is-primary-text color-secondary">
                  {{ solution.username }}
                </span>
                <span class="title is-7 is-primary-text has-text-grey">
                  Posted&nbsp;{{ solution.date_created }}
                </span>
                <div class="solution-description">
                  {{ solution.description }}
                </div>
                <br />
                <p class="subtitle is-7 is-secondary-text color-secondary">
                  <a class="solution-reply" @click.prevent="toggleReply">
                    Reply
                  </a>
                </p>
                <div class="box" v-if="showReply">
                  <b-field>
                    <b-input
                      placeholder="Quest description"
                      v-model="newReply.description"
                    >
                    </b-input>
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
                <div
                  class="media reply-container"
                  v-for="reply in filteredReplies"
                  :key="reply.id"
                >
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
                    <span class="title is-6 is-primary-text color-secondary">
                      {{ reply.username }}
                    </span>
                    <span class="title is-7 is-primary-text has-text-grey">
                      Posted&nbsp;{{ reply.date_created }}
                    </span>
                    <div class="solution-description">
                      {{ reply.description }}
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default {
  props: ['id'],
  data() {
    return {
      newSol: {
        description: '',
        date_created: moment().format(),
        votes: 0,
        user_id: this.$store.getters['user/getUser'].id,
        username: this.$store.getters['user/getUser'].username,
        full_name: this.$store.getters['user/getUser'].fname,
        is_correct: false,
        quest_id: this.id
      },
      newReply: {
        description: '',
        date_created: moment().format(),
        votes: 0,
        user_id: this.$store.getters['user/getUser'].id,
        username: this.$store.getters['user/getUser'].username,
        full_name: this.$store.getters['user/getUser'].fname,
        is_correct: false
      },
      showReply: false,
      showSolution: false
    };
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      isLoading: 'quest/isLoading',
      sortedSolutions: 'quest/sortedSolutions',
      filteredReplies: 'solution/filteredReplies'
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
    downvoteQuest: function downvoteQuest(questId) {
      this.$store.dispatch(
        'feed/downvoteQuest',
        this.$store.getters['feed/loadQuest'](questId)
      );
    },
    postSolution: function postSolution() {
      if (this.newSol.description) {
        this.$store.dispatch('quest/postSolution', {
          description: this.newSol.description,
          date_created: this.newSol.date_created,
          votes: this.newSol.votes,
          user_id: this.newSol.user_id,
          username: this.newSol.username,
          full_name: this.newSol.full_name,
          is_correct: this.newSol.is_correct,
          quest_id: this.newSol.quest_id
        });
        this.newSol.description = '';
      } else {
        // eslint-disable-next-line
        alert('Please fill in the required fields.');
      }
    },
    upvoteSolution: function upvoteSolution() {
      this.$store.dispatch('solution/upvoteSolution');
    },
    downvoteSolution: function downvoteSolution() {
      this.$store.dispatch('solution/downvoteSolution');
    },
    populateSolutions: function populateSolutions() {
      this.$store.dispatch('quest/populateSolutions', this.id);
    },
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
    },
    toggleSolution: function toggleSolution() {
      this.showSolution = !this.showSolution;
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
.solution-container {
  border-radius: 25px !important;
}
.solution-container .mdi {
  font-size: 24px;
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
.reply-container .mdi {
  font-size: 24px;
}
.box {
  border-radius: 0px;
}
</style>
