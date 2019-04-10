<template>
  <div class="box" id="feed-quest">
    <div class="media">
      <!-- Votes container -->
      <div class="media-left has-text-centered has-text-grey-lighter">
        <!-- Upvote -->
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
      <!-- Main quest container -->
      <div class="media-content" id="quest-primary-container">
        <!-- Quest-primary-header -->
        <div>
          <router-link
            class="title is-4 is-primary-text"
            id="quest-title"
            :to="`/${quest.id}`"
          >
            {{ quest.title }}
          </router-link>
          <span
            class="mdi mdi-close is-pulled-right"
            v-if="user.id === quest.user_id"
            v-on:click.prevent="confirmDelete"
            id="quest-close"
          ></span>
        </div>
        <!-- Quest description -->
        <div class="is-secondary-text" id="quest-description-container">
          <vue-markdown>{{ quest.description }}</vue-markdown>
        </div>
        <div class="is-divider"></div>
        <div class="is-clearfix" id="quest-miscellaneous-container">
          <!-- Category -->
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VueMarkdown from 'vue-markdown';

export default {
  props: ['quest'],
  components: {
    VueMarkdown
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      load: 'feed/loadQuest'
    })
  },
  methods: {
    ...mapActions({
      upvote: 'feed/upvoteQuest',
      downvote: 'feed/downvoteQuest',
      delete: 'feed/deleteQuest'
    }),
    upvoteQuest: function upvoteQuest() {
      this.upvote(this.load(this.quest.id));
    },
    downvoteQuest: function downvoteQuest() {
      this.downvote(this.load(this.quest.id));
    },
    confirmDelete: function confirmDelete() {
      this.$dialog.confirm({
        title: 'Deleting quest',
        message:
          'Are you sure you want to <b>delete</b> this quest? This action cannot be undone.',
        confirmText: 'Yes, I am sure.',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.delete(this.quest.id)
      });
    }
  }
};
</script>

<style scoped>
#feed-quest {
  border-radius: 0;
  text-decoration: none;
  border: 3px solid #d7bce8;
}
#votes {
  font-size: 1.5em;
}
.active-vote {
  color: #b686fe;
}
#quest-primary-container {
  padding: 0.5em;
}
#quest-title {
  color: #4b465e;
}
#quest-title:hover {
  color: #b676fe;
}
#quest-close {
  font-size: 15px;
  color: #b9b9b9;
  cursor: pointer;
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
  font-size: 1em;
  padding: 5px;
  color: #4b465e;
}
.mdi {
  font-size: 2em;
  cursor: pointer;
  font-weight: bold;
}
.mdi:hover {
  color: #b686fe;
}
</style>
