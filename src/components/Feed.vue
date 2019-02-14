<template>
  <div id="feed">
    <div class="columns">
      <div class="column">
        <div class="box" id="user-card">
          <div class="media">
            <div class="media-left">
              <figure class="image is-96x96">
                <img
                  class="is-rounded"
                  src="https://bulma.io/images/placeholders/128x128.png"
                  alt="Image"
                />
              </figure>
            </div>
            <div class="media-content" id="user-card-primary">
              <h1 class="title is-2 has-text-success is-primary-text">
                {{ getUser.fname }}
              </h1>
              <h2 class="subtitle is-6 has-text-grey is-secondary-text">
                @{{ getUser.username }}
              </h2>
            </div>
          </div>
          <div class="level" id="user-card-secondary">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">LEVEL</p>
                <p class="title has-text-success">{{ getUser.level }}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">REPUTATION</p>
                <p class="title has-text-success">52</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">RESPONSES</p>
                <p class="title has-text-success">91</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-two-fifths">
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
                <b-input placeholder="Quest title" v-model="title"></b-input>
              </b-field>
              <textarea
                class="textarea has-fixed-size"
                size="is-medium"
                placeholder="Quest description"
                v-model="description"
              >
              </textarea>
              <b-field class="is-pulled-left is-primary-text" id="quest-categ">
                <b-select placeholder="Category" v-model="category">
                  <optgroup label="Computer Science">
                    <option value="Algorithm">Algorithm</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Image Processing">Image Processing</option>
                    <option value="Scripting">Scripting</option>
                  </optgroup>
                </b-select>
              </b-field>
              <button
                class="button is-pulled-right is-primary-text bg-secondary color-white"
                id="post-quest"
                @click.prevent="postQuest"
              >
                POST QUEST
              </button>
            </div>
          </div>
        </div>
        <!-- FEED -->
        <div class="box" v-for="quest in sortedQuests" :key="quest.id">
          <div class="media">
            <div
              class="media-left has-text-centered has-text-grey-lighter is-primary-text"
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
            <div class="media-content quest-content">
              <router-link
                class="title is-4 color-primary quest-title is-primary-text"
                :to="`/${quest.id}`"
              >
                {{ quest.title }}
              </router-link>
              <div class="quest-description is-secondary-text">
                {{ quest.description }}
              </div>
              <div class="is-primary-text">
                <br />
                <span class="subtitle is-7">Category:</span>&nbsp;
                <span class="tag is-light quest-tag">{{ quest.category }}</span>
                <p class="subtitle is-7 is-pulled-right">
                  <span class="has-text-grey">{{ quest.date_created }}</span>
                  &nbsp;
                  <span class="has-text-grey">
                    Posted by&nbsp;<a href="">{{ quest.full_name }}</a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column"></div>
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
      category: '',
      votes: 0,
      user_id: this.$store.getters['user/getUser'].id,
      is_answered: false,
      username: this.$store.getters['user/getUser'].username,
      full_name: this.$store.getters['user/getUser'].fname,
      solutions: [],
      is_duplicate: false
    };
  },
  computed: {
    ...mapGetters({
      sortedQuests: 'feed/sortedQuests',
      getUser: 'user/getUser',
      isLoading: 'feed/isLoading',
      loadQuest: 'feed/loadQuest'
    })
  },
  methods: {
    postQuest: function postQuest() {
      // if fields are not empty
      if (this.title && this.description) {
        this.$store.dispatch('user/postQuest', {
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
          is_duplicate: this.is_duplicate
        });
        this.title = '';
        this.description = '';
      } else {
        // eslint-disable-next-line
        alert('Please fill in the required fields.');
      }
    },
    populateFeed: function refreshFeed() {
      this.$store.dispatch('feed/populateFeed');
    },
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
    }
  },
  mounted() {
    this.populateFeed();
  }
};
</script>

<style scoped>
#feed {
  height: 100vh;
  width: 100%;
  padding: 72px;
}
#user-card {
  width: 450px;
  border: 2px solid #f9c23e;
  border-radius: 0;
}
#user-card-primary {
  padding: 2%;
}
#user-card-secondary {
  margin-top: 25px;
}
#post-quest {
  margin-top: 10px;
  font-weight: bold;
}
#post-quest:hover {
  color: #fafbfc;
}
#quest-categ {
  margin-top: 10px;
}
.quest-tag {
  cursor: pointer;
}
.quest-tag:hover {
  background-color: #ff9a44;
  transition: 0.1s;
}
.quest-title {
  margin-bottom: 15px;
}
.quest-title:hover {
  color: #ff9a44;
  transition: 0.2s;
}
.quest-description {
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
.mdi {
  font-size: 36px;
}
.box {
  border-radius: 0px;
}
</style>
