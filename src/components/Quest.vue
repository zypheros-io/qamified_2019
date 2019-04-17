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
          <div class="is-divider"></div>
          <div class="is-clearfix" id="quest-miscellaneous-container">
            <p class="is-pulled-left">
              <span class="subtitle is-7">Category:</span>&nbsp;
              <span class="tag is-light quest-tag is-secondary-text">
                {{ quest.category }}
              </span>
            </p>
            <p class="is-pulled-right">
              <span class="has-text-grey subtitle is-7">
                {{ quest.date_created }}
              </span>
              &nbsp;
              <span class="has-text-grey subtitle is-7">
                Posted by
                <router-link :to="`profile/${quest.user_id}`">
                  {{ quest.full_name }}
                </router-link>
              </span>
            </p>
          </div>
          <social-sharing url="qamified.tk" inline-template>
            <div>
              <network network="facebook">
                <i class="fa fa-fw fa-facebook"></i> Facebook
              </network>
              <network network="googleplus">
                <i class="fa fa-fw fa-google-plus"></i> Google +
              </network>
              <network network="linkedin">
                <i class="fa fa-fw fa-linkedin"></i> LinkedIn
              </network>
              <network network="pinterest">
                <i class="fa fa-fw fa-pinterest"></i> Pinterest
              </network>
              <network network="reddit">
                <i class="fa fa-fw fa-reddit"></i> Reddit
              </network>
              <network network="twitter">
                <i class="fa fa-fw fa-twitter"></i> Twitter
              </network>
              <network network="vk">
                <i class="fa fa-vk"></i> VKontakte
              </network>
              <network network="weibo">
                <i class="fa fa-weibo"></i> Weibo
              </network>
              <network network="whatsapp">
                <i class="fa fa-fw fa-whatsapp"></i> Whatsapp
              </network>
            </div>
          </social-sharing>
        </div>
      </div>
    </div>
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="user.img_url" />
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
              <button v-on:click.prevent="postSolution" class="button is-info">
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
  width: 100%;
  padding-top: 75px;
  padding-bottom: 15px;
}
#quest-container {
  border-radius: 0;
  border: 3px solid #d7bce8;
}
.active-vote {
  color: #b686fe;
}
.media .media-left {
  font-size: 2em;
  cursor: pointer;
  font-weight: bold;
}
.media .media-left .mdi:hover {
  color: #b686fe;
}
#quest-primary-container {
  padding: 0.5em;
}
#quest-description-container {
  background: #f7f7f7;
  margin-top: 1em;
  border: 3px solid #f4f4f4;
  max-width: 100%;
  width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  font-size: 1.5em;
  padding: 5px;
  color: #4b465e;
}
</style>
