<template>
  <div id="modal">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="../../static/tut1.png" alt="Image" />
          Tutorial Modal # {{ currentPage }}
        </figure>
      </div>
      <div class="card-content">
        <div class="is-clearfix">
          <button
            class="button is-pulled-left primary-btn"
            v-on:click.prevent="prev"
            v-if="currentPage > 1"
          >
            Prev
          </button>
          <button
            class="button is-pulled-right primary-btn"
            v-on:click.prevent="next"
            v-if="currentPage < 5"
          >
            Next
          </button>
          <button
            class="button is-pulled-right primary-btn"
            v-on:click.prevent="confirm"
            v-if="currentPage == 5"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1
    };
  },
  methods: {
    next: function next() {
      if (this.currentPage < 5) this.currentPage += 1;
    },
    prev: function prev() {
      if (this.currentPage > 1) this.currentPage -= 1;
    },
    confirm: function confirm() {
      this.$store.dispatch('user/endTutorial');
    }
  }
};
</script>

<style scoped>
#modal {
  background: #f7f7f7;
  border: 2px solid green;
}
</style>
