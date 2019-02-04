<template>
  <div id="feed">
    <div class="columns">
      <div class="column" id="feed-profile">
        <!-- PLACEHOLDER -->
      </div>
      <div class="column" id="feed-list" v-for="quest in sortedQuests" :key="quest.id">
        <div class="box">
          <!-- Quest Title -->
          <input
            class="input"
            id="quest-title-input"
            type="text"
            placeholder="Quest title"
            v-model="title"
          >
          <!-- Quest desc -->
          <div id="quest-desc" class="field">
            <div class="control">
              <textarea
                class="textarea is-small"
                placeholder="What's up, adventurer?"
                v-model="description">
              </textarea>
            </div>
          </div>
          <button class="button is-primary is-small is-fullwidth is-game"
            id="submit-quest"
            v-on:click.prevent="postQuest">
            Post Quest
          </button>
        </div>
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <a class="title is-3 is-spaced feed-quest-title" href=""> {{quest.title}} </a>
                <br>
                <span class="tag is-light">{{quest.category}}</span>
                <p class="subtitle is-7">Posted by <a href="">{{quest.full_name}}</a></p>
              </div>
            </div>
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. I am new to Ruby and I am
              trying to send an email using Google's API, but I keep on
              getting this error.
              <br><br>
              <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </div>
          <footer class="card-footer">
            <span class="card-footer-item" id="feed-quest-upvote"> {{quest.upvotes}} upvotes </span>
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
      upvotes: 0,
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
    }),
  },
  methods: {
    postQuest: function postQuest() {
      // eslint-disable-next-line
      console.log(this.$store.getters['user/getUser']);
      this.$store.dispatch('user/postQuest',
        {
          date_created: this.date_created,
          title: this.title,
          description: this.description,
          category: this.category,
          upvotes: this.upvotes,
          user_id: this.user_id,
          is_answered: this.is_answered,
          username: this.username,
          full_name: this.full_name,
          solutions: this.solutions,
          is_duplicate: this.is_duplicate,
        });
    },
  },
};
</script>

<style scoped>
  #feed {
    height: 100vh;
    width: 100%;
    padding: 52px;
  }
  #feed > .columns > .column {
    padding: 25px !important;
  }
  #feed-list > .card {
    border: 1px solid #F9C23E;
    margin-top: 25px;
  }
  .card-footer-item {
    font-weight: 200;
  }
  #quest-desc {
    margin-top: 15px;
  }
  #submit-quest {
    background-color: #F9C23E;
    -webkit-box-shadow: 3px 3px 0px #d3a945, 0px 3px 15px rgba(0,0,0,.4);
    -moz-box-shadow: 3px 3px 0px #d3a945, 0px 3px 15px rgba(0,0,0,.4);
    box-shadow: 3px 3px 0px #d3a945, 0px 3px 15px rgba(0,0,0,.4);
    border: none;
    border-style: none;
  }
  #submit-quest:active {
    background-color: #79C354 !important;
    -webkit-transition: 0.2s;
    -moz-transition: 0.2s;
    -o-transition: 0.2s;
    transition: 0.2s;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
</style>
