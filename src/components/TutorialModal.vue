<template>
  <div id="modal">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            v-if="currentPage === 1"
            src="../assets/tutorial/tut1.png"
            alt="Image"
          />
          <img
            v-if="currentPage === 2"
            src="../assets/tutorial/tut2.png"
            alt="Image"
          />
          <img
            v-if="currentPage === 3"
            src="../assets/tutorial/tut3.png"
            alt="Image"
          />
          <img
            v-if="currentPage === 4"
            src="../assets/tutorial/tut4.png"
            alt="Image"
          />
          <img
            v-if="currentPage === 5"
            src="../assets/tutorial/tut5.png"
            alt="Image"
          />
          <img
            v-if="currentPage === 6"
            src="../assets/tutorial/tut6.png"
            alt="Image"
          />
          <img
            v-if="currentPage === 7"
            src="../assets/tutorial/tut7.png"
            alt="Image"
          />
          <img
            v-if="currentPage === 8"
            src="../assets/tutorial/tut8.png"
            alt="Image"
          />
          <img
            v-if="currentPage === 9"
            src="../assets/tutorial/tut9.png"
            alt="Image"
          />
          <img
            v-if="currentPage === 10"
            src="../assets/tutorial/tut10.png"
            alt="Image"
          />
          <img
            v-if="currentPage === 11"
            src="../assets/tutorial/tut11.png"
            alt="Image"
          />
          <img
            v-if="currentPage === 12"
            src="../assets/tutorial/tut12.png"
            alt="Image"
          />
          <img
            v-if="currentPage === 13"
            src="../assets/tutorial/tut13.png"
            alt="Image"
          />
          <img
            v-if="currentPage === 14"
            src="../assets/tutorial/tut14.png"
            alt="Image"
          />
          <img
            v-if="currentPage === 15"
            src="../assets/tutorial/tut15.png"
            alt="Image"
          />
          <img
            v-if="currentPage === 16"
            src="../assets/tutorial/tut16.png"
            alt="Image"
          />
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
