<template>
  <div id="modal">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            :src="`../../static/tutorial/tut${currentPage}.png`"
            alt="Image"
          />
          Tutorial Modal # {{ currentPage }}
        </figure>
      </div>
      <div class="card-content">
        <div class="is-clearfix">
          <button
            class="button is-pulled-left primary-btn is-primary-text"
            v-on:click.prevent="prev"
            v-if="currentPage > 1"
          >
            Prev
          </button>
          <button
            class="button is-pulled-right primary-btn is-primary-text"
            v-on:click.prevent="next"
            v-if="currentPage < 16"
          >
            Next
          </button>
          <div class="is-pulled-right">
            <button
              id="skip-button"
              class="button is-primary-text"
              v-on:click.prevent="skip"
              v-if="currentPage < 16"
            >
              Skip Tutorial
            </button>
            <button
              class="button primary-btn"
              v-on:click.prevent="confirm"
              v-if="currentPage == 16"
            >
              Understood
            </button>
          </div>
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
      if (this.currentPage < 16) this.currentPage += 1;
    },
    prev: function prev() {
      if (this.currentPage > 1) this.currentPage -= 1;
    },
    confirm: function confirm() {
      this.$store.dispatch('user/endTutorial');
    },
    skip: function skip() {
      this.$dialog.confirm({
        title: 'Skip Tutorial',
        message:
          'Are you sure you want to skip the tutorial? This will take you to the last panel.',
        confirmText: 'Yes, I am sure',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.currentPage = 16;
        }
      });
    }
  }
};
</script>

<style scoped>
#modal {
  background: #f7f7f7;
  border: 2px solid green;
}
#skip-button {
  background: #f4e46b;
  color: #242729;
  margin-right: 10px;
}
</style>
