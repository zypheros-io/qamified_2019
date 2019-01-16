<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="column is-6 is-offset-3">
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
  computed: {
    questions() {
      return this.$store.getters.loadQuestions;
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
</style>
