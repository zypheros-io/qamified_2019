<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="column is-6 is-offset-3">
          <!-- QUEST INPUT -->
          <div class="card" id="quest-block">
            <!-- Title -->
            <input
              class="input"
              id="quest-title-input"
              type="text"
              placeholder="Quest title"
              v-model="title"
            >
            <div class="field">
              <div class="control">
                <textarea
                  class="textarea is-small"
                  placeholder="Small textarea"
                  v-model="desc">
                </textarea>
              </div>
            </div>
            <button class="button is-primary is-small is-fullwidth"
                    v-on:click.prevent="postQuest">
                    Post Quest
            </button>
            <!-- <button class="button is-loading is-primary is-small is-fullwidth"
                    v-if="isLoading">
            </button> -->
          </div>
          <!-- FEED -->
          <div class="card" v-for="quest in questions" :key="quest.id">
            <header class="card-header">
              <p class="card-header-title">
                {{ quest.title }}
              </p>
            </header>
            <div class="card-content is-success">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-5"> {{ quest.author }}</p>
                  <p class="subtitle is-7"> @{{ quest.username }} </p>
                </div>
              </div>
              <div class="content">
                {{ quest.description }}
              </div>
            </div>
            <div class="card-footer">
              <a href="" class="card-footer-item"> Reply </a>
              <a href="" class="card-footer-item"> Upvote</a>
              <a href="" class="card-footer-item"> Downvote</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  data() {
    return {
      title: '',
      desc: '',
    };
  },
  computed: {
  },
  methods: {
    postQuest: function postQuest() {
      // posts quest on quest board (feed)
      this.$store.dispatch('postQuest', {
        title: this.title,
        desc: this.desc,
      });
    },
  },
};
</script>

<style scoped>
  .container {
    padding-top: 52px;
  }
  .card {
    margin-bottom: 10px;
  }
  #quest-title-input {
    margin-bottom: 10px;
  }
</style>
