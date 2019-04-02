<template>
  <div class="feed container">
    <div class="columns">
      <div class="column is-two-fifths" id="user_card_column">
        <div class="box" id="user_card">
          <!-- HEADER -->
          <div class="media" id="user_card_header">
            <div class="media-content has-text-centered" id="user_avatar">
              <figure class="image is-96x96" style="display:inline-block">
                <img
                  class="is-rounded"
                  src="https://bulma.io/images/placeholders/96x96.png"
                />
              </figure>
              <p class="title is-4 color-white is-primary-text">
                {{ user.fname }}
              </p>
              <p class="subtitle is-6 color-white is-secondary-text">
                @{{ user.username }}
              </p>
            </div>
          </div>
          <div class="media" id="player_details">
            <div class="media-left has-text-centered" id="rank_details">
              <figure class="image is-96x96" style="display:inline-block">
                <img
                  :src="user.badge_url"
                  alt="https://www.flaticon.com/packs/rank-badge"
                />
              </figure>
              <p class="title is-5 color-primary is-primary-text">
                {{ user.rank }}
              </p>
              <p class="subtitle is-6 color-primary is-secondary-text">
                {{ user.reputation }} reputation points
              </p>
            </div>
            <div class="media-content has-text-centered" id="misc_details">
              <div>
                <p class="title is-6 is-primary-text" id="player_desc">
                  Player Description
                </p>
                <div id="description_box"></div>
              </div>
              <div style="margin-top: 15px;">
                <p class="title is-6 is-primary-text" id="level">
                  Level {{ user.level }}
                </p>
                <progress
                  id="exp_bar"
                  :value="exp"
                  :max="expRequired"
                ></progress>
                <p
                  class="title is-7 is-primary-text color-highlight"
                  id="experience"
                >
                  {{ user.experience }}/{{ user.level_cap }}
                </p>
              </div>
            </div>
          </div>
          <div class="media has-text-centered" id="user_stats">
            <div class="media-left" id="quests_posted">
              <p class="title is-6 is-primary-text color-secondary">
                QUESTS POSTED
              </p>
              <p class="subtitle is-3 is-primary-text is-bold color-highlight">
                69
              </p>
            </div>
            <div class="media-content has-text-centered" id="solutions_posted">
              <p class="title is-6 is-primary-text color-secondary">
                SOLUTIONS POSTED
              </p>
              <p class="subtitle is-3 is-primary-text is-bold color-highlight">
                69
              </p>
            </div>
          </div>
        </div>
        <router-link class="button" :to="`profile/${user.id}`">
          View Profile
        </router-link>
      </div>
      <div class="column" id="feed_column">
        <!-- Quest Form -->
        <div class="box" id="feed-form">
          <!-- Avatar -->
          <div class="media">
            <figure class="media-left image is-48x48">
              <img
                class="is-rounded"
                :src="`../../${user.img_url}`"
                alt="Image"
              />
            </figure>
            <!-- Form -->
            <div class="media-content">
              <b-field>
                <b-input
                  type="text"
                  placeholder="What's your quest all about?"
                  v-model="quest.title"
                />
              </b-field>
              <b-field>
                <b-input
                  type="textarea"
                  placeholder="What's your quest all about?"
                  v-model="quest.description"
                />
              </b-field>
              <b-field class="is-pulled-left is-primary-text">
                <b-select v-model="quest.category">
                  <optgroup label="Computer Science">
                    <option value="Algorithm">Algorithm</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Image Processing">Image Processing</option>
                    <option value="Scripting">Scripting</option>
                  </optgroup>
                </b-select>
              </b-field>
              <b-field class="is-pulled-right">
                <button
                  class="button is-primary-text primary-btn"
                  v-on:click.prevent="postQuest"
                >
                  <span class="mdi mdi-file-document-box"></span>
                  &nbsp;Post Quest
                </button>
              </b-field>
            </div>
          </div>
        </div>
        <div class="is-divider" data-content="QUEST BOARD"></div>
        <!-- Feed -->
        <div
          class="box"
          v-for="quest in quests"
          :key="quest.id"
          id="feed-quest"
        >
          <div class="media">
            <!-- Votes -->
            <div class="media-left has-text-centered has-text-grey-lighter">
              <!-- Vote buttons -->
              <p>
                <span
                  class="mdi mdi-arrow-up-bold-circle-outline"
                  v-on:click.prevent="upvoteQuest(quest.id)"
                ></span>
              </p>
              <p>
                <span class="is-primary-text" id="votes">
                  {{ quest.votes }}
                </span>
              </p>
              <p>
                <span
                  class="mdi mdi-arrow-down-bold-circle-outline"
                  v-on:click.prevent="downvoteQuest(quest.id)"
                ></span>
              </p>
            </div>
            <!-- Quest Preview -->
            <div class="media-content">
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
              <div class="is-secondary-text" id="quest-description-container">
                <vue-markdown>{{ quest.description }}</vue-markdown>
              </div>
              <div>
                <br />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import VueMarkdown from 'vue-markdown';

export default {
  components: { VueMarkdown },
  data() {
    return {
      quest: {
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
        is_duplicate: false
      }
    };
  },
  computed: {
    ...mapGetters({
      quests: 'feed/sortedQuests',
      user: 'user/getUser',
      load: 'feed/loadQuest',
      loading: 'feed/isLoading',
      exp: 'user/getExp',
      expRequired: 'user/getExpToLevel'
    })
  },
  methods: {
    ...mapActions({
      post: 'feed/postQuest',
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
  },
  created() {
    if (this.$store.getters['user/getUser']) {
      this.$dialog.confirm({
        title: 'Welcome!',
        message:
          'Oh, so you are the new adventurer they told me about. I hope you enjoy your stay in this wonderful world of QA.',
        confirmText: 'Thanks!',
        type: 'is-success',
        hasIcon: true,
        onConfirm: () => this.$toast.open('Godspeed, adventurer!')
      });
    }
  }
};
</script>

<style scoped>
.feed {
  width: 100%;
  padding-top: 75px;
}
#feed-form {
  border-radius: 0;
  text-decoration: none;
}
#feed-quest {
  border-radius: 0;
  text-decoration: none;
}
#votes {
  font-size: 1.5em;
}
#quest-description-container {
  margin-top: 1em;
  background: #f7f7f7;
  border: 3px solid #f4f4f4;
  padding: 0.4em;
}
/* overrides */
.mdi {
  font-size: 1.5em;
  cursor: pointer;
  font-weight: bold;
}
.mdi:hover {
  color: #b686fe;
}
</style>
