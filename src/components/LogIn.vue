<template>
  <div class="hero is-fullheight bg-primary">
    <div class="hero-body">
      <div class="container">
        <!-- Pageloader -->
        <b-loading
          :is-full-page="true"
          :active.sync="loading"
          :can-cancel="false"
        ></b-loading>
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <div class="box bg-white" id="login-container">
              <div class="has-text-centered">
                <img src="https://via.placeholder.com/350x65" />
              </div>
              <div class="is-divider"></div>
              <!-- Username -->
              <b-field class="margin-top-1">
                <b-input
                  v-model="user.email"
                  type="text"
                  placeholder="Username"
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <!-- Password -->
              <b-field class="margin-top-1">
                <b-input
                  v-model="user.password"
                  type="password"
                  placeholder="Password"
                  size="is-medium"
                  required
                ></b-input>
              </b-field>
              <!-- Login button -->
              <b-field class="margin-top-1">
                <button
                  class="button is-medium is-fullwidth is-primary-text main-btn"
                  @click.prevent="signIn"
                >
                  START GAME
                </button>
              </b-field>
              <div class="is-divider" data-content="OR"></div>
              <div class="has-text-centered is-secondary-text">
                <p>
                  Not yet an adventurer?
                  <a class="is-anchor" @click.prevent="goto('/signup')">
                    Sign up
                  </a>
                </p>
              </div>
            </div>
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
      user: {
        email: '',
        password: ''
      }
    };
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      loading: 'login/isLoading'
    })
  },
  watch: {
    getUser(value) {
      if (value !== null) this.$router.push('/');
    }
  },
  methods: {
    signIn: function signIn() {
      if (this.user.email && this.user.password) {
        this.$store.dispatch('login/checkSignInMethod', this.user);
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
  background-image: url('../assets/bg.png');
}
#login-container {
  padding: 40px;
  width: 450px !important;
  border: 15px solid #203d66;
  border-radius: 5px;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
}
</style>
