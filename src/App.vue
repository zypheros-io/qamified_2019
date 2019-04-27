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
          <div class="navbar-end is-secondary-text">
            <b-dropdown position="is-bottom-left" aria-role="menu">
              <!-- Dropdown Button -->
              <a class="navbar-item" slot="trigger" role="button">
                <span>{{ user.fname }}</span>
                <b-icon icon="menu-down"></b-icon>
              </a>
              <!-- Logged -->
              <b-dropdown-item aria-role="menuitem" custom>
                Logged as <b>{{ user.fname + ' ' + user.lname }}</b>
              </b-dropdown-item>
              <!-- Divider -->
              <hr class="dropdown-divider" />
              <b-dropdown-item has-link aria-role="menuitem">
                <router-link to="/board">
                  <span v-on:click.prevent="logEvent('VIEW_FEED')">
                    Quest Board
                  </span>
                </router-link>
              </b-dropdown-item>
              <b-dropdown-item has-link aria-role="menuitem">
                <router-link :to="`profile/${user.id}`">
                  <span v-on:click.prevent="logEvent('VIEW_PROFILE')">
                    Headquarters
                  </span>
                </router-link>
              </b-dropdown-item>
              <hr class="dropdown-divider" />
              <b-dropdown-item aria-role="menuitem" v-on:click="signOut">
                Logout
              </b-dropdown-item>
            </b-dropdown>
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
      this.route = route;
      this.$router.push(route);
    },
    openDropdown: function openDropdown() {
      const el = document.getElementById('nav-dropdown');
      if (el.classList.contains('is-active')) {
        el.classList.remove('is-active');
      } else {
        el.classList.add('is-active');
      }
    },
    logEvent: function logEvent(eventContext) {
      this.log(eventContext);
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
.navbar-end .navbar-item {
  font-size: 0.8em;
  font-weight: bold;
  color: #ffffff !important;
}
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
