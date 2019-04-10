<template>
  <div class="feed container">
    <!-- <b-modal :active.sync="showModal" :width="650">
      <Tutorial-Modal></Tutorial-Modal>
    </b-modal> -->
    <div class="columns">
      <div class="column is-two-fifths" id="user_card_column">
        <User-Card></User-Card>
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
        <Quest-Preview
          v-for="quest in quests"
          :key="quest.id"
          v-bind:quest="quest"
        ></Quest-Preview>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import VueMarkdown from 'vue-markdown';
import TutorialModal from './TutorialModal';
import UserCard from './UserCard';
import QuestPreview from './QuestPreview';

export default {
  components: {
    VueMarkdown,
    TutorialModal,
    UserCard,
    QuestPreview
  },
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
      },
      showModal: true
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
  width: 100%;
}
#votes {
  font-size: 1.5em;
}
#quest-description-container {
  margin-top: 1em;
  background: #f7f7f7;
  border: 3px solid #f4f4f4;
  padding: 0.4em;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  width: 100%;
}
/* overrides */
.mdi {
  font-size: 2em;
  cursor: pointer;
  font-weight: bold;
}
.mdi:hover {
  color: #b686fe;
}
</style>
