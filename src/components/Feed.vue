<template>
  <div class="feed container">
    <b-modal :active.sync="newUser" :width="650">
      <Tutorial-Modal></Tutorial-Modal>
    </b-modal>
    <div class="columns">
      <div class="column is-two-fifths" id="user_card_column">
        <User-Card></User-Card>
        <div class="is-divider"></div>
        <p class="title is-4 is-primary-text">Missions</p>
        <Mission
          v-for="mission in missions"
          :key="mission.index"
          v-bind:mission="mission"
        ></Mission>
        <div v-if="!missions" class="box has-text-centered">
          <p class="is-secondary-text">You have no missions at the moment.</p>
        </div>
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
                  placeholder="Give your quest an awesome title..."
                  v-model="quest.title"
                />
              </b-field>
              <b-field>
                <b-input
                  type="textarea"
                  placeholder="Tell us about your quest..."
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
                  id="post-button"
                  v-on:click.prevent="postQuest"
                >
                  <span class="mdi mdi-file-document-box"></span>
                  &nbsp;POST QUEST
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
import TutorialModal from './TutorialModal';
import UserCard from './UserCard';
import QuestPreview from './QuestPreview';
import Mission from './Mission';

export default {
  components: {
    TutorialModal,
    UserCard,
    QuestPreview,
    Mission
  },
  data() {
    return {
      quest: {
        date_created: moment().format(),
        title: '',
        description: '',
        category: 'Algorithm',
        votes: 0,
        user_id: '',
        is_answered: false,
        username: '',
        full_name: '',
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
      expRequired: 'user/getExpToLevel',
      missions: 'user/getMissions',
      newUser: 'user/isNew'
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
        this.post({
          ...this.quest,
          user_id: this.user.id,
          username: this.user.username,
          full_name: this.user.fname,
          user_img_url: this.user.img_url
        });
        this.quest.title = '';
        this.quest.description = '';
      } else {
        this.$snackbar.open({
          message: 'Please fill in the required fields',
          type: 'is-danger'
        });
      }
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
.feed {
  width: 100%;
  padding-top: 75px;
}
#post-button {
  font-size: 1em;
}
</style>
