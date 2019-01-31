<template>
  <div id="app">
    <nav class="navbar is-fixed-top is-transparent" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://via.placeholder.com/112x28" width="112" height="28">
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a
                class="button"
                @click="goto('signin')"
                v-if="!isAuthenticated"
              >
                <strong>Log In</strong>
              </a>
              <a
                class="button"
                id="nav-signup"
                @click="goto('signup')"
                v-if="!isAuthenticated"
              >
                <strong>Sign Up</strong>
              </a>
              <a
                class="button is-primary"
                @click="signOut"
                v-if="isAuthenticated"
              >
                <strong>Log Out</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view/>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          QamifiED is a web QnA platform made by <a href="www.facebook.com/zkenichii">
          Kenichii A. Ana</a>, an undergraduate of BS Computer Science in the University
          of the Philippines Los Banos.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters['user/getUser'] !== null && this.$store.getters['user/getUser'] !== undefined;
    },
  },
  methods: {
    signOut: function signOut() {
      this.$store.dispatch('user/logOut');
      this.$router.push('/signin');
    },
    goto: function goto(route) {
      this.route = route;
      this.$router.push(route);
    },
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Press+Start+2P');
  @import '../node_modules/bulma-divider/dist/css/bulma-divider.min.css';
  .navbar {
    background-color: #F9C23E !important;
  }
  #nav-signup {
    background-color: #79C354 !important;
  }
  #nav-signup:hover {
    background-color: #fafbfc !important;
    transition: 0.5s;
    -moz-transition: 0.5s;
    -webkit-transition: 0.5s;
  }
  .is-game {
    font-family: 'Press Start 2P', cursive;
  }
  .form-title {
    color: #F9C23E;
  }
  .form-subtitle, .sign-in-form-title {
    margin: 10px 0px 25px 0px;
  }
  .form-subtitle {
    margin-top: -20px;
    font-style: italic;
  }
</style>
