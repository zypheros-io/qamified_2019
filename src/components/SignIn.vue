<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="column is-4 is-offset-4">
          <div class="box" id="sign-in-form">
            <p
              class="title has-text-centered is-game form-title">
              QAMIFIED
            </p>
            <p
              class="subtitle has-text-centered is-6 form-subtitle">
              "Not all those who wander are lost."
            </p>
            <b-field label="Email or Username">
              <b-input
                v-model="email"
                placeholder="Enter your username"
                size="is-medium"
                required>
              </b-input>
            </b-field>
            <b-field label="Password">
              <b-input
                v-model="password"
                type="password"
                placeholder="Enter your password"
                size="is-medium"
                required>
              </b-input>
            </b-field>
            <b-field>
              <button
                v-if="!isLoading"
                @click.prevent="signIn"
                class="button is-fullwidth is-medium is-game"
                id="sign-in-btn">
                START GAME
              </button>
              <button
                v-if="isLoading"
                @click.prevent="signIn"
                class="button is-fullwidth is-loading is-medium is-game"
                id="sign-in-btn">
              </button>
            </b-field>
            <div class="is-divider"></div>
            <b-field class="has-text-centered">
              <div>
                <p> Not yet an adventurer?
                  <a id="to-signup" @click.prevent="goto('/signup')">
                    Sign up here!
                  </a>
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
      password: '',
    };
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      isLoading: 'login/isLoading',
    }),
  },
  watch: {
    getUser(value) {
      if (value !== null) {
        this.$router.push('/');
      }
    },
  },
  methods: {
    signIn: function signIn() {
      if (this.email && this.password) {
        this.$store.dispatch('login/checkSignInMethod',
          {
            email: this.email,
            password: this.password,
          });
      } else {
        // eslint-disable-next-line
        alert('Please fill out the required fields.');
      }
    },
    goto: function goto(route) {
      this.route = route;
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
  .hero {
    background-image: url('../assets/sign_in_wallpaper.png');
  }
  #sign-in-form {
    padding: 40px;
    border: 1px solid #79C354;
    -webkit-box-shadow: 6px 6px 0px #caadada9, 3px 3px 15px rgba(0,0,0,.4);
    -moz-box-shadow: 6px 6px 0px #caadada9, 3px 3px 15px rgba(0,0,0,.4);
    box-shadow: 6px 6px 0px #caadada9, 3px 3px 15px rgba(0,0,0,.4);
  }
  #sign-in-btn {
    margin-top: 25px !important;
    color: #fafbfc !important;
    background-color: #F9C23E !important;
    font-size: 1.35rem;
    -webkit-box-shadow: 3px 3px 0px #d3a945, 0px 3px 15px rgba(0,0,0,.4);
    -moz-box-shadow: 3px 3px 0px #d3a945, 0px 3px 15px rgba(0,0,0,.4);
    box-shadow: 3px 3px 0px #d3a945, 0px 3px 15px rgba(0,0,0,.4);
    border: none;
    border-style: none;
  }
  #sign-in-btn:active {
    background-color: #79C354 !important;
    -webkit-transition: 0.2s;
    -moz-transition: 0.2s;
    -o-transition: 0.2s;
    transition: 0.2s;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
  #to-signup {
    color: #79C354;
  }
  #to-signup:hover {
    -webkit-transition: 0.2s;
    -moz-transition: 0.2s;
    -o-transition: 0.2s;
    transition: 0.2s;
    color: #F9C23E;
    text-decoration: underline;
  }
</style>

