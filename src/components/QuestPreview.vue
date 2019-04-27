<template>
  <div class="box" id="feed-quest">
    <div class="media">
      <!-- Votes container -->
      <div class="media-left has-text-centered has-text-grey-lighter">
        <!-- Upvote -->
        <p>
          <b-tooltip
            label="Quest is useful and clear"
            type="is-light"
            position="is-left"
            animated
          >
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
          </b-tooltip>
        </p>
        <!-- Vote Count -->
        <p>
          <span class="is-primary-text" id="votes">
            {{ quest.votes }}
          </span>
        </p>
        <!-- Downvote Quest -->
        <p>
          <b-tooltip
            label="Quest shows no effort at all"
            type="is-light"
            position="is-left"
            animated
          >
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
          </b-tooltip>
        </p>
        <p class="is-divider"></p>
        <p>
          <b-tooltip
            label="Flag quest as a duplicate quest"
            type="is-light"
            position="is-left"
            animated
          >
            <span
              v-if="!quest.is_duplicate"
              v-on:click.prevent="flagAsDuplicate"
              class="mdi mdi-flag-variant-outline"
            ></span>
            <span
              v-else-if="quest.is_duplicate"
              v-on:click.prevent="unflagQuest"
              class="mdi mdi-flag-variant flagged"
            ></span>
          </b-tooltip>
        </p>
      </div>
      <!-- Main quest container -->
      <div class="media-content" id="quest-primary-container">
        <!-- Quest-primary-header -->
        <div class="is-clearfix">
          <div class="is-pulled-left">
            <b-tooltip
              label="Click to view quest"
              type="is-light"
              position="is-right"
              animated
            >
              <router-link
                class="title is-4 is-primary-text"
                id="quest-title"
                :to="`${quest.id}`"
              >
                {{ quest.title }}
              </router-link>
            </b-tooltip>
          </div>
          <div class="is-pulled-right">
            <b-tooltip
              v-if="quest.is_answered"
              label="Quest has already been answered correctly"
              type="is-light"
              position="is-bottom"
            >
              <span class="mdi mdi-check-outline" id="is-answered"></span>
            </b-tooltip>
            <b-tooltip
              label="Delete this quest"
              type="is-light"
              position="is-right"
              animated
            >
              <span
                class="mdi mdi-close"
                v-if="user.id === quest.user_id || user.is_admin"
                v-on:click.prevent="confirmDelete"
                id="quest-close"
              ></span>
            </b-tooltip>
          </div>
        </div>
        <!-- Quest description -->
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
          <!-- Category -->
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
              <p class="title is-secondary-text" id="info-name">
                {{ quest.full_name }}
              </p>
              <p class="subtitle is-secondary-text" id="info-time">
                Posted {{ quest.date_created | date }}
              </p>
            </div>
          </div>
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
      load: 'feed/loadQuest',
      flagged: 'quest/isFlagged'
    })
  },
  methods: {
    ...mapActions({
      upvote: 'feed/upvoteQuest',
      downvote: 'feed/downvoteQuest',
      delete: 'feed/deleteQuest',
      flag: 'feed/flagAsDuplicate',
      unflag: 'feed/unflagQuest'
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
    },
    flagAsDuplicate: function flagAsDuplicate() {
      this.flag(this.load(this.quest.id));
    },
    unflagQuest: function unflagQuest() {
      this.unflag(this.load(this.quest.id));
    }
  }
};
</script>

<style scoped>
#votes {
  font-size: 1.5em !important;
}
.active-vote {
  color: #17b79c !important;
}
.flagged {
  color: #ff0266 !important;
}
.tag {
  background-color: #17b79c !important;
  color: #ffffff !important;
}
#quest-primary-container {
  padding: 0.5em !important;
}
#quest-title {
  color: #242729 !important;
}
#quest-title:hover {
  color: #37ccb3 !important;
}
#quest-close {
  font-size: 15px !important;
  color: #b9b9b9 !important;
  cursor: pointer !important;
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
.mdi {
  font-size: 2em !important;
  cursor: pointer !important;
  font-weight: bold !important;
}
.mdi:hover {
  color: #37ccb3 !important;
}
#sns-share {
  margin-right: 15px !important;
  margin-top: 5px !important;
}
#is-answered {
  color: #45a163 !important;
  font-size: 1.3em !important;
}
</style>
