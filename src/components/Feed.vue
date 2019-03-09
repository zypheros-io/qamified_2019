<template>
  <div class="bg-white" id="feed">
    <div class="columns">
      <div class="column"></div>
      <div class="column is-one-third" id="quest-feed">
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
                  placeholder="Quest title"
                  v-model="quest.title"
                ></b-input>
              </b-field>
              <textarea
                class="textarea has-fixed-size"
                size="is-medium"
                placeholder="Quest description"
                v-model="quest.description"
              >
              </textarea>
              <b-field class="is-pulled-left is-primary-text" id="quest-categ">
                <b-select placeholder="Category" v-model="quest.category">
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
        <div class="box" v-for="quest in quests" :key="quest.id">
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
              <div>
                <router-link
                  class="title is-4 color-primary quest-title is-primary-text"
                  :to="`/${quest.id}`"
                >
                  {{ quest.title }}
                </router-link>
                <span
                  style="font-size: 15px; color: #b9b9b9; cursor: pointer"
                  v-if="user.id === quest.user_id"
                  class="mdi mdi-close is-pulled-right"
                  @click.prevent="confirmDelete(quest.id)"
                ></span>
              </div>
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
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';

export default {
  data() {
    return {
      quest: {
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
      }
    };
  },
  computed: {
    ...mapGetters({
      quests: 'feed/sortedQuests',
      user: 'user/getUser',
      load: 'feed/loadQuest',
      loading: 'feed/isLoading'
    })
  },
  methods: {
    ...mapActions({
      post: 'user/postQuest',
      upvote: 'feed/upvoteQuest',
      downvote: 'feed/downvoteQuest',
      delete: 'feed/deleteQuest',
      refresh: 'feed/populateFeed'
    }),
    postQuest: function postQuest() {
      // if fields are not empty
      if (this.quest.title && this.quest.description) {
        this.post(this.quest);
        this.quest.title = '';
        this.quest.description = '';
      } else {
        // eslint-disable-next-line
        alert('Please fill in the required fields.');
      }
    },
    upvoteQuest: function upvoteQuest(questId) {
      this.upvote(this.load(questId));
    },
    downvoteQuest: function downvoteQuest(questId) {
      this.$store.dispatch('feed/downvoteQuest', this.load(questId));
    },
    confirmDelete: function confirmDelete(questId) {
      this.$dialog.confirm({
        title: 'Deleting quest',
        message:
          'Are you sure you want to <b>delete</b> this quest? This action cannot be undone.',
        confirmText: 'Yes, I am sure.',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.delete(questId)
      });
    },
    populateFeed: function refreshFeed() {
      this.refresh();
    }
  },
  mounted() {
    this.populateFeed();
  }
};
</script>

<style scoped>
#feed {
  width: 100%;
  padding: 90px 72px 72px 72px;
}
#quest-feed {
  padding: 20px;
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
  margin-bottom: 10px;
}
</style>
