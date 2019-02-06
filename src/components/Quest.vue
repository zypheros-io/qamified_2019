<template>
  <div id="meetup">
    <div class="box">
      <div class="title is-3"> {{ quest.title }}</div>
      <p> {{ quest.description }} </p>
      <button class="button">UPVOTE</button>
      <button class="button">DOWNVOTE</button>
    </div>
    <div class="box">
      <div> REPLY # 1</div>
      <p> Can you tell us how much RAM your device has? </p>
      <button class="button">UPVOTE</button>
      <button class="button">DOWNVOTE</button>
    </div>
    <div class="box">
      <div> REPLY # 2 </div>
      <p> Yes pls </p>
      <button class="button">UPVOTE</button>
      <button class="button">DOWNVOTE</button>
    </div>
  </div>
</template>

<script>

export default {
  props: ['id'],
  computed: {
    quest() {
      return this.$store.getters['feed/loadQuest'](this.id);
    },
  },
  methods: {
    upvoteQuest: function upvoteQuest(questId) {
      // looks for object with said id
      // upvotes the object retured by loadQuest
      this.$store.dispatch('feed/upvoteQuest', questId);
    },
  },
};
</script>

<style scoped>
  #meetup {
    padding: 52px;
  }
  .box {
    margin: 15px;
  }
</style>
