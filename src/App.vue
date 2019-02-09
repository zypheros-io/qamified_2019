<template>
  <div id="app">
    <nav
      class="navbar is-fixed-top is-transparent"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img
            src="https://via.placeholder.com/112x28"
            width="112"
            height="28"
          />
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button" @click="goto('signin')" v-if="!isAuthenticated">
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
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return (
        this.$store.getters['user/getUser'] !== null &&
        this.$store.getters['user/getUser'] !== undefined
      );
    }
  },
  methods: {
    signOut: function signOut() {
      this.$store.dispatch('user/logOut');
      this.$router.push('/signin');
    },
    goto: function goto(route) {
      this.route = route;
      this.$router.push(route);
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Press+Start+2P');
@import '../node_modules/bulma-divider/dist/css/bulma-divider.min.css';
.navbar {
  background-color: #f9c23e !important;
}
#nav-signup {
  background-color: #79c354 !important;
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
.is-game-btn {
  margin-top: 25px !important;
  color: #fafbfc !important;
  background-color: #f9c23e !important;
  -webkit-box-shadow: 3px 3px 0px #d3a945, 0px 3px 15px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 3px 3px 0px #d3a945, 0px 3px 15px rgba(0, 0, 0, 0.4);
  box-shadow: 3px 3px 0px #d3a945, 0px 3px 15px rgba(0, 0, 0, 0.4);
  border: none;
  border-style: none;
}
.is-game-btn:active {
  background-color: #79c354 !important;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  -o-transition: 0.2s;
  transition: 0.2s;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
.game-btn-med {
  font-size: 1.35rem;
}
.form-title {
  color: #f9c23e;
}
.form-subtitle,
.sign-in-form-title {
  margin: 10px 0px 25px 0px;
}
.form-subtitle {
  margin-top: -20px;
  font-style: italic;
}
.is-anchor {
  color: #79c354;
}
.is-anchor:hover {
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  -o-transition: 0.2s;
  transition: 0.2s;
  color: #f9c23e;
  text-decoration: underline;
}
.rounded-card {
  border-radius: 5px !important;
  border: 1px solid #f9c23e;
  margin-top: 10px;
}
</style>
