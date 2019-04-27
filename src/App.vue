<template>
  <div id="app">
    <nav
      v-if="user"
      class="navbar is-fixed-top is-transparent"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="container">
        <div class="navbar-brand">
          <router-link class="navbar-item" to="/board">
            <img src="./assets/logo.png" alt="LOGO" />
          </router-link>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start is-primary-text">
            <a
              to="board"
              class="navbar-item"
              v-on:click.prevent="goto('/board')"
            >
              Quest Board
            </a>
            <router-link :to="`/headquarters/${user.id}`" class="navbar-item">
              Headquarters
            </router-link>
            <router-link
              :to="`/admin`"
              class="navbar-item"
              v-if="user.is_admin"
            >
              Admin Panel
            </router-link>
          </div>
          <div class="navbar-end is-primary-text">
            <a class="navbar-item" v-on:click.prevent="signOut">
              Log Out
            </a>
          </div>
        </div>
      </div>
    </nav>
    <transition
      name="router-anim"
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
      mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    user() {
      return this.$store.getters['user/getUser'];
    },
    routerName() {
      return this.$route.name;
    }
  },
  methods: {
    ...mapActions({
      logout: 'user/logOut',
      log: 'user/updateLogs'
    }),
    signOut: function signOut() {
      this.logout();
      this.$router.push('/signin');
    },
    goto: function goto(route) {
      let logContext;
      if (route === '/board') {
        logContext = 'VIEW_FEED';
      } else if (route === '/headquarters') {
        logContext = 'VIEW_HEADQUARTERS';
      }
      this.log(logContext);
      this.$router.push(route);
    },
    openDropdown: function openDropdown() {
      const el = document.getElementById('nav-dropdown');
      if (el.classList.contains('is-active')) {
        el.classList.remove('is-active');
      } else {
        el.classList.add('is-active');
      }
    }
  }
};
</script>

<style>
@import '../node_modules/bulma-divider/dist/css/bulma-divider.min.css';
@import '../node_modules/animate.css/animate.min.css';
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,700');

html {
  margin: 0 !important;
  background: #eef7ed !important;
}
/**
Override buefy styling for markdown use
*/
h1 {
  font-size: 2em;
}
h2 {
  font-size: 1.5em;
}
h3 {
  font-size: 1.17em;
}
h4 {
  font-size: 1em;
}
h5 {
  font-size: 0.83em;
}
h6 {
  font-size: 0.67em;
}
blockquote {
  padding: 10px 20px;
  margin: 0 0 20px;
  border-left: 5px solid #ddd;
}
ul {
  list-style: unset;
  padding-inline-start: 25px;
}
.navbar {
  background-color: #17b79c !important;
  font-size: 1.2em !important;
}
.navbar-start .navbar-item,
.navbar-end .navbar-item {
  font-size: 0.7em !important;
  font-weight: 550 !important;
  color: #ffffff !important;
}
.navbar-start .navbar-item:hover,
.navbar-end .navbar-item:hover {
  color: #f4e46b !important;
}
/* custom modifiers */
.is-anchor {
  color: #0b7765 !important;
  text-decoration: underline;
}
.is-anchor:hover {
  -webkit-transition: 0.2s !important;
  -moz-transition: 0.2s !important;
  -o-transition: 0.2s !important;
  transition: 0.2s !important;
  color: #000 !important;
  text-decoration: underline !important;
}
/* fonts */
.is-primary-text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600 !important;
}
.is-secondary-text {
  font-family: 'Montserrat', sans-serif;
}
.is-small-text {
  font-size: 2px !important;
}
/* colors */
.color-white {
  color: #ffffff !important;
}
.color-primary {
  color: #37ccb3 !important;
}
.color-secondary {
  color: #17b79c !important;
}
.color-grey {
  color: #eef7ed !important;
}
.color-highlight {
  color: #f4e46b !important;
}
/* buttons  */
.primary-btn {
  background: #17b79c !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 8px !important;
  text-decoration: none !important;
}
.primary-btn:hover,
.primary-btn:focus {
  background: #37ccb3 !important;
  color: #ffffff !important;
}
/* modifiers */
.margin-top-1 {
  margin-top: 20px !important;
}
/* overrides */
::-webkit-input-placeholder {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400 !important;
  font-size: 0.8em !important;
  color: #7e7e7e !important;
}
::-moz-placeholder {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400 !important;
  font-size: 0.8em !important;
  color: #7e7e7e !important;
}
:-ms-input-placeholder {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400 !important;
  font-size: 0.8em !important;
  color: #7e7e7e !important;
}
::placeholder {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400 !important;
  font-size: 0.8em !important;
  color: #7e7e7e !important;
}
input {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 400 !important;
  color: #707070 !important;
  height: 50px !important;
  border-radius: 0 !important;
}
textarea {
  font-family: 'Montserrat', sans-serif !important;
}
</style>
