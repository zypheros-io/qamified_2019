<template>
  <div class="has-navbar-fixed-top" id="app">
    <nav class="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary"
                 @click="goto('signin')"
                 v-if="!isAuthenticated"
              >
                <strong>Log In</strong>
              </a>
              <a class="button is-warning"
                 @click="goto('/')"
                 v-if="!isAuthenticated"
              >
                <strong>Sign Up</strong>
              </a>
              <a class="button is-primary"
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
      return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined;
    },
  },
  methods: {
    signOut: function signOut() {
      this.$store.dispatch('logout');
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
</style>
