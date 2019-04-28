<template>
  <div class="container" id="quest">
    <div class="box" id="quest-container">
      <div class="media">
        <!-- Votes container -->
        <div class="media-left has-text-centered has-text-grey-lighter">
          <p>
            <span
              class="mdi mdi-arrow-up-bold-circle-outline active-vote"
              v-on:click.prevent="upvoteQuest"
              v-if="quest.upvote.includes(user.id)"
            ></span>
            <span
              class="mdi mdi-arrow-up-bold-circle-outline"
              v-on:click.prevent="upvoteQuest"
              v-else-if="!quest.upvote.includes(user.id)"
            ></span>
          </p>
          <!-- Vote Count -->
          <p>
            <span class="is-primary-text" id="votes">
              {{ quest.votes }}
            </span>
          </p>
          <!-- Downvote Quest -->
          <p>
            <span
              class="mdi mdi-arrow-down-bold-circle-outline active-vote"
              v-on:click.prevent="downvoteQuest"
              v-if="quest.downvote.includes(user.id)"
            ></span>
            <span
              class="mdi mdi-arrow-down-bold-circle-outline"
              v-on:click.prevent="downvoteQuest"
              v-else-if="!quest.downvote.includes(user.id)"
            ></span>
          </p>
        </div>
        <div class="media-content" id="quest-primary-container">
          <!-- Quest-primary-header -->
          <div>
            <p class="title is-3 is-primary-text">{{ quest.title }}</p>
          </div>
          <!-- Quest.description -->
          <div class="is-secondary-text" id="quest-description-container">
            <vue-markdown>{{ quest.description }}</vue-markdown>
          </div>
          <div class="is-clearfix">
            <div class="is-pulled-right" id="sns-share">
              <span class="subtitle is-7 is-secondary-text">Share to: </span>
              <social-sharing
                :url="`http://qamified.tk/${quest.id}`"
                title="I have posted/found a quest, can you help us with this one?"
                description="QAmifiED is a gamified collaborative QnA platform"
                quote="Can you help me in this quest?"
                hashtags="qamified,sablay2019"
                inline-template
              >
                <div>
                  <network network="facebook">
                    <span
                      style="font-size: 1.5em; cursor: pointer; color: #17b79c;"
                      class="mdi mdi-facebook-box"
                    ></span>
                  </network>
                  <network network="twitter">
                    <span
                      style="font-size: 1.5em; cursor: pointer; color: #17b79c;"
                      class="mdi mdi-twitter-box"
                    ></span>
                  </network>
                </div>
              </social-sharing>
            </div>
          </div>
          <div class="is-divider"></div>
          <div class="is-clearfix" id="quest-miscellaneous-container">
            <p class="is-pulled-left">
              <span class="subtitle is-7">Category:</span>&nbsp;
              <span class="tag is-light quest-tag is-secondary-text">
                {{ quest.category }}
              </span>
            </p>
            <div
              class="media is-pulled-right has-text-centered"
              id="adventurer-info"
            >
              <figure class="media-left image is-32x32">
                <img
                  :src="`../../${quest.user_img_url}`"
                  alt="adventurer image"
                  class="is-rounded"
                />
              </figure>
              <div class="media-content">
                <b-tooltip
                  label="Click to view headquarters"
                  type="is-light"
                  position="is-right"
                  animated
                >
                  <router-link :to="`/headquarters/${quest.user_id}`">
                    <p class="title is-secondary-text" id="info-name">
                      {{ quest.full_name }}
                    </p>
                  </router-link>
                </b-tooltip>
                <p class="subtitle is-secondary-text" id="info-time">
                  Posted {{ quest.date_created | date }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="`../${user.img_url}`" />
        </p>
      </figure>
      <div class="media-content">
        <div class="field">
          <p class="control">
            <textarea
              class="textarea"
              placeholder="Offer assistance..."
              v-model="solution.description"
            ></textarea>
          </p>
        </div>
        <nav class="level">
          <div class="level-left"></div>
          <div class="level-right">
            <div class="level-item">
              <button
                v-on:click.prevent="postSolution"
                class="button primary-btn is-secondary-text"
              >
                Leave a response
              </button>
            </div>
          </div>
        </nav>
        <div class="is-divider" data-content="SOLUTIONS"></div>
        <!-- Solutions -->
        <div id="solutions">
          <Solution
            v-for="solution in solutions"
            :key="solution.id"
            v-bind:solution="solution"
          />
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';
import VueMarkdown from 'vue-markdown';
import Solution from './Solution';

export default {
  props: ['id'],
  components: {
    Solution,
    VueMarkdown
  },
  data() {
    return {
      solution: {
        description: '',
        date_created: moment().format(),
        votes: 0,
        user_id: '',
        username: '',
        full_name: '',
        is_correct: false,
        quest_id: this.id
      }
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      loading: 'quest/isLoading',
      solutions: 'quest/sortedSolutions',
      loadQuest: 'feed/loadQuest'
    }),
    quest() {
      return this.loadQuest(this.id);
    }
  },
  methods: {
    ...mapActions({
      upvote: 'feed/upvoteQuest',
      downvote: 'feed/downvoteQuest',
      post: 'quest/postSolution',
      refresh: 'quest/populateSolutions'
    }),
    upvoteQuest: function upvoteQuest() {
      this.upvote(this.loadQuest(this.id));
    },
    downvoteQuest: function downvoteQuest() {
      this.downvote(this.loadQuest(this.id));
    },
    postSolution: function postSolution() {
      if (this.solution.description) {
        this.post({
          ...this.solution,
          user_id: this.user.id,
          username: this.user.username,
          full_name: this.user.fname
        });
        this.solution.description = '';
      } else {
        // eslint-disable-next-line
        alert('Please fill in the required fields.');
      }
    },
    populateSolutions: function populateSolutions() {
      this.refresh(this.id);
    }
  },
  mounted() {
    this.populateSolutions();
  }
};
</script>

<style scoped>
#quest {
  width: 100% !important;
  padding-top: 75px !important;
  padding-bottom: 15px !important;
}
.active-vote {
  color: #17b79c !important;
}
.tag {
  background-color: #17b79c !important;
  color: #ffffff !important;
}
.mdi {
  font-size: 2em !important;
  cursor: pointer !important;
  font-weight: bold !important;
}
.mdi:hover {
  color: #37ccb3 !important;
}
#quest-primary-container {
  padding: 0.5em !important;
}
#quest-description-container {
  background: #eff0f1 !important;
  margin-top: 1em !important;
  border: 3px solid #f4f4f4 !important;
  max-width: 100% !important;
  width: 100% !important;
  overflow-wrap: break-word !important;
  word-wrap: break-word !important;
  hyphens: auto !important;
  font-size: 1em !important;
  padding: 5px !important;
  color: #242729 !important;
}
#adventurer-info {
  padding: 15px !important;
  background-color: #eef7ed !important;
}
#info-name,
#info-time {
  font-size: 0.8em !important;
}
#info-name:hover {
  color: #17b79c !important;
}
#sns-share {
  margin-right: 15px !important;
  margin-top: 5px !important;
}
</style>
