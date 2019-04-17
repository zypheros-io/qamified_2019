<template>
  <div id="login-page">
    <div class="level">
      <div class="level-item">
        <div>
          <div class="has-text-centered" id="login-copy">
            <p class="title is-primary-text">Log in to QAmifiED</p>
            <p class="subtitle is-secondary-text">An adventure awaits you</p>
          </div>
          <div class="box" id="login-container">
            <!-- Username -->
            <b-field class="margin-top-1">
              <b-input
                v-model="user.email"
                type="text"
                placeholder="Username or email"
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
                password-reveal
                required
              ></b-input>
            </b-field>
            <b-field class="margin-top-1">
              <button
                class="button is-medium is-fullwidth is-primary-text primary-btn"
                v-on:click.prevent="signIn"
                v-if="!loading"
              >
                START GAME
              </button>
              <button
                class="button is-loading is-medium is-fullwidth is-primary-text primary-btn"
                v-else-if="loading"
              ></button>
            </b-field>
            <div class="is-divider" data-content="OR"></div>
            <div class="has-text-centered is-secondary-text">
              Not yet an adventurer?
              <a class="is-anchor" v-on:click.prevent="goto('/signup')">
                Sign up
              </a>
              now
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

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
      if (value !== null) this.$router.push('/feed');
    }
  },
  methods: {
    ...mapActions({
      login: 'login/checkSignInMethod'
    }),
    signIn: function signIn() {
      if (this.user.email && this.user.password) {
        this.login(this.user);
      } else {
        this.$snackbar.open({
          message: 'Please fill in the required fields',
          type: 'is-danger'
        });
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
#login-page {
  height: 100vh !important;
  width: 100% !important;
  background: #eef7ed !important;
}
#login-page .level,
#login-page .level .level-item {
  height: inherit !important;
  width: 100% !important;
}
#login-page .title {
  color: #17b79c !important;
  font-size: 2.8em !important;
  margin-bottom: 1.5rem !important;
}
#login-page .subtitle {
  color: #37ccb3 !important;
  font-size: 1.8em !important;
  margin-bottom: 1.5rem !important;
}
#login-container {
  border: 2px solid #17b79c !important;
  opacity: 0 !important;
  padding: 2em !important;
  text-decoration: none !important;
  box-shadow: 1px !important;
  width: 450px !important;
  animation: formIn 0.5s ease-in-out 1s forwards !important;
}
#login-copy {
  opacity: 0 !important;
  animation: slideIn 1s ease-in-out 0s forwards !important;
}
/* animations */
@keyframes slideIn {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
@-webkit-keyframes slideIn {
  from {
    -webkit-transform: translateY(-30px);
    opacity: 0;
  }
  to {
    -webkit-transform: translateY(0px);
    opacity: 1;
  }
}
@-moz-keyframes slideIn {
  from {
    -moz-transform: translateY(-30px);
    opacity: 0;
  }
  to {
    -moz-transform: translateY(0px);
    opacity: 1;
  }
}
@-o-keyframes slideIn {
  from {
    -o-transform: translateY(-30px);
    opacity: 0;
  }
  to {
    -o-transform: translateY(0px);
    opacity: 1;
  }
}
@keyframes formIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
