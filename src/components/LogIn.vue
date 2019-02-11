<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <b-loading
          :is-full-page="isFullPage"
          :active.sync="isLoading"
          :can-cancel="true"
        ></b-loading>
        <div class="column is-4 is-offset-4">
          <div class="box" id="sign-in-form">
            <p class="title has-text-centered is-game form-title">QAMIFIED</p>
            <p class="subtitle has-text-centered is-6 form-subtitle">
              "Not all those who wander are lost."
            </p>
            <b-field label="Email or Username">
              <b-input
                v-model="email"
                placeholder="Enter your username"
                size="is-medium"
                required
              ></b-input>
            </b-field>
            <b-field label="Password">
              <b-input
                v-model="password"
                type="password"
                placeholder="Enter your password"
                size="is-medium"
                required
              ></b-input>
            </b-field>
            <b-field>
              <button
                class="button is-fullwidth is-medium is-game is-game-btn game-btn-med"
                v-if="!isLoading"
                @click.prevent="signIn"
              >
                START GAME
              </button>
              <button
                class="button is-fullwidth is-loading is-medium is-game is-game-btn game-btn-med"
                v-if="isLoading"
                @click.prevent="signIn"
              ></button>
            </b-field>
            <div class="is-divider"></div>
            <b-field class="has-text-centered">
              <div>
                <p>
                  Not yet an adventurer?
                  <a class="is-anchor" @click.prevent="goto('/signup')"
                    >Sign up here!</a
                  >
                </p>
              </div>
            </b-field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      isLoading: 'login/isLoading'
    })
  },
  watch: {
    getUser(value) {
      if (value !== null) {
        this.$router.push('/');
      }
    }
  },
  methods: {
    signIn: function signIn() {
      if (this.email && this.password) {
        this.$store.dispatch('login/checkSignInMethod', {
          email: this.email,
          password: this.password
        });
      } else {
        // eslint-disable-next-line
        alert('Please fill out the required fields.');
      }
    },
    goto: function goto(route) {
      this.route = route;
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>
.hero {
  background-image: url('../assets/sign_in_wallpaper.png');
}
#sign-in-form {
  padding: 40px;
  border: 1px solid #79c354;
  -webkit-box-shadow: 6px 6px 0px #caadada9, 3px 3px 15px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 6px 6px 0px #caadada9, 3px 3px 15px rgba(0, 0, 0, 0.4);
  box-shadow: 6px 6px 0px #caadada9, 3px 3px 15px rgba(0, 0, 0, 0.4);
}
</style>
