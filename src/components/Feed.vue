<template>
  <div id="feed">
    <div class="columns">
      <div class="column" id="feed-profile"></div>
      <div class="column" id="feed-list">
        <div class="box">
          <input class="input" id="quest-title-input"
            type="text"
            placeholder="Quest title"
            v-model="title"
          >
          <div id="quest-desc" class="field">
            <div class="control">
              <textarea class="textarea is-small"
                placeholder="What's up, adventurer?"
                v-model="description">
              </textarea>
            </div>
          </div>
          <button class="button is-primary is-small is-fullwidth is-game is-game-btn"
            id="submit-quest"
            v-if="!isLoading"
            v-on:click.prevent="postQuest">
            Post Quest
          </button>
          <button class="button is-primary is-loading is-small is-fullwidth is-game is-game-btn"
            id="submit-quest"
            v-if="isLoading"
            v-on:click.prevent="postQuest">
            Post Quest
          </button>
        </div>
        <div class="card rounded-card" v-for="quest in sortedQuests" :key="quest.id">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <router-link class="title is-4 is-spaced feed-quest-title is-anchor"
                  :to="'/' + quest.id">
                  {{quest.title}}
                </router-link>
                <button class="button" @click.prevent="upvoteQuest(quest.id)"> UPVOTE THIS </button>
                <button class="button" @click.prevent="downvoteQuest(quest.id)"> DOWN THIS </button>
                <br>
                <span class="tag is-light">{{quest.category}}</span>
              </div>
            </div>
            <div class="content">
              <p>{{ quest.description }}</p>
              <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              <p class="subtitle is-7">Posted by <a href="">{{quest.full_name}}</a></p>
            </div>
          </div>
          <footer class="card-footer">
            <span class="card-footer-item" id="feed-quest-upvote"> {{quest.votes}} votes </span>
            <span class="card-footer-item" id="feed-quest-solution"> 2 solutions </span>
            <span class="card-footer-item" id="feed-quest-views"> 3 views </span>
          </footer>
        </div>
      </div>
      <div class="column" id="feed-misc"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  data() {
    return {
      date_created: moment().format(),
      title: '',
      description: '',
      category: 'Algorithm',
      votes: 0,
      user_id: this.$store.getters['user/getUser'].id,
      is_answered: false,
      username: this.$store.getters['user/getUser'].username,
      full_name: this.$store.getters['user/getUser'].fname,
      solutions: [],
      is_duplicate: false,
    };
  },
  computed: {
    ...mapGetters({
      sortedQuests: 'feed/sortedQuests',
      getUser: 'user/getUser',
      isLoading: 'feed/isLoading',
      loadQuest: 'feed/loadQuest',
    }),
  },
  methods: {
    postQuest: function postQuest() {
      // if fields are not empty
      if (this.title && this.description) {
        this.$store.dispatch('user/postQuest',
          {
            date_created: this.date_created,
            title: this.title,
            description: this.description,
            category: this.category,
            votes: this.votes,
            user_id: this.user_id,
            is_answered: this.is_answered,
            username: this.username,
            full_name: this.full_name,
            solutions: this.solutions,
            is_duplicate: this.is_duplicate,
          });
        this.title = '';
        this.description = '';
      } else {
        // eslint-disable-next-line
        alert("Please fill in the required fields.");
      }
    },
    refreshFeed: function refreshFeed() {
      this.$store.dispatch('feed/initFeed');
    },
    upvoteQuest: function upvoteQuest(questId) {
      this.$store.dispatch('feed/upvoteQuest',
        this.$store.getters['feed/loadQuest'](questId));
    },
    downvoteQuest: function downvoteQuest(questId) {
      this.$store.dispatch('feed/downvoteQuest',
        this.$store.getters['feed/loadQuest'](questId));
    },
  },
  mounted() {
    this.refreshFeed();
  },
};
</script>

<style scoped>
  #feed {
    height: 100vh;
    width: 100%;
    padding-top: 52px;
  }
  #feed > .columns > .column {
    padding: 25px !important;
  }
  .card-footer-item {
    font-weight: 200;
  }
  #quest-desc {
    margin-top: 15px;
  }
  #submit-quest {
    margin-top: 0 !important;
  }
</style>
