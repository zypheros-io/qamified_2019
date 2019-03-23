<template>
  <div id="login-page">
    <!-- Pageloader -->
    <b-loading
      :is-full-page="true"
      :active.sync="loading"
      :can-cancel="false"
    ></b-loading>
    <div class="level">
      <div class="level-item">
        <div>
          <div class="has-text-centered" id="login-copy">
            <p class="title is-primary-text">Sign In.</p>
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
                @click.prevent="signIn"
              >
                START GAME
              </button>
            </b-field>
            <div class="is-divider" data-content="OR"></div>
            <div class="has-text-centered is-secondary-text">
              Not yet an adventurer?
              <a class="is-anchor" @click.prevent="goto('/signup')">
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
      if (value !== null) this.$router.push('/feed');
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
#login-page {
  height: 100vh;
  width: 100%;
  background: #f4f4f4 url('../assets/bg.svg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
#login-page .level,
#login-page .level .level-item {
  height: inherit;
  width: 100%;
}
#login-page .title {
  color: #b686fe;
  font-size: 2.8em;
  margin-bottom: 1.5rem;
}
#login-page .subtitle {
  color: #898585;
  font-size: 1.8em;
  margin-bottom: 1.5rem;
}
#login-container {
  opacity: 0;
  padding: 2em;
  text-decoration: none;
  box-shadow: 1px;
  border: 1px solid #b686fe;
  animation: formIn 0.5s ease-in-out 2s forwards;
}
#login-copy {
  opacity: 0;
  animation: slideIn 1s ease-in-out 0s forwards;
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
