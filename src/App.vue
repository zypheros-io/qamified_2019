<template>
  <div id="app">
    <nav
      v-if="user"
      class="navbar is-fixed-top is-transparent"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="/static/img/buefy-logo.png" alt="LOGO" />
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
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
              <router-link to="/feed">
                <b-icon icon="home"></b-icon>
                Feed
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item has-link aria-role="menuitem">
              <router-link :to="`profile/${user.id}`">
                <b-icon icon="home"></b-icon>
                Profile
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item aria-role="menuitem" v-on:click="signOut">
              Logout
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters['user/getUser'];
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
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,700');

html {
  margin: 0;
  background: #f9f9f9;
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
  padding: 0 14vw 0 14vw;
  background-color: #b686fe;
}
.navbar-end .navbar-item {
  font-size: 0.8em;
  font-weight: bold;
  color: #ffffff;
}
.navbar-end .navbar-item:hover {
  color: #4b465e;
}
#nav-search {
  background-color: #203d66 !important;
  border: none;
  box-shadow: none;
  color: #fdfdfd;
}
#nav-search::placeholder {
  color: #fafbfc;
}
#nav-signup {
  color: #ff9a44;
}
#nav-signup:hover {
  color: #cc7b36;
}
#nav-dropdown > a {
  color: #ff9a44;
}
#nav-dropdown > a:hover {
  color: #cc7b36;
}
.game-btn-med {
  font-size: 1.35rem;
}
/* custom modifiers */
.is-anchor {
  color: #b686fe;
}
.is-anchor:hover {
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  -o-transition: 0.2s;
  transition: 0.2s;
  color: #aa73fe;
  text-decoration: underline;
}
.rounded-card {
  border-radius: 5px !important;
  border: 1px solid #f9c23e;
  margin-top: 10px;
}
/* fonts */
.is-primary-text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}
.is-secondary-text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
}
.is-small-text {
  font-size: 2px !important;
}
/* colors */
.color-white {
  color: #fdfdfd;
}
.color-primary {
  color: #b686fe;
}
.color-secondary {
  color: #1a2c54;
}
.color-highlight {
  color: #ff9a44;
}
.color-grey {
  color: #f9f9f9;
}
.is-bold {
  font-weight: bold;
}
.bg-white {
  background-color: #fdfdfd;
}
.bg-primary {
  background-color: #b686fe;
}
.bg-secondary {
  background-color: #1a2c54;
}
/* buttons  */
.primary-btn {
  background: #b686fe;
  color: #ffffff;
  border: none;
}
.primary-btn:hover,
.primary-btn:focus {
  background: #aa73fe;
  color: #ffffff;
}
/* modifiers */
.margin-top-1 {
  margin-top: 20px !important;
}
/* overrides */
::-webkit-input-placeholder {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 0.8em;
  color: #7e7e7e !important;
}
::-moz-placeholder {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 0.8em;
  color: #7e7e7e !important;
}
:-ms-input-placeholder {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 0.8em;
  color: #7e7e7e !important;
}
::placeholder {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 0.8em;
  color: #7e7e7e !important;
}
input {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 400;
  color: #707070 !important;
  height: 50px;
  border-radius: 0 !important;
}
textarea {
  font-family: 'Montserrat', sans-serif !important;
}
</style>
