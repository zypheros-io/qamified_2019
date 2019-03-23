<template>
  <div id="app">
    <nav
      class="navbar is-fixed-top bg-secondary is-transparent"
      role="navigation"
      v-if="isAuthenticated"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <span
          class="navbar-item is-primary-text"
          id="logo"
          style="font-weight: bold; font-size: 2.2rem; color: #fdfdfd;"
        >
          qamifi<span style="color: #ff9a44;">ED</span>
        </span>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <div v-if="isAuthenticated" class="navbar-item field">
            <p class="control has-icons-right">
              <b-input
                placeholder="Search..."
                type="search"
                icon="magnify"
                id="nav-search"
              >
              </b-input>
              <span class="icon is-small is-right"></span>
            </p>
          </div>
        </div>
        <div v-if="!isAuthenticated" class="navbar-end">
          <a
            @click.prevent="goto('/signin')"
            class="navbar-item is-secondary-text color-white"
          >
            Log in
          </a>
          <a
            @click.prevent="goto('/signup')"
            class="navbar-item is-secondary-text color-white"
            id="nav-signup"
          >
            Sign up
          </a>
        </div>
        <div v-else class="navbar-end">
          <div class="is-divider-vertical"></div>
          <div class="navbar-item has-dropdown" id="nav-dropdown">
            <a
              class="navbar-link is-secondary-text color-white"
              @click.prevent="openDropdown"
            >
              {{ user.fname }}
            </a>
            <div class="navbar-dropdown is-secondary-text is-small-text">
              <a @click.prevent="signOut" class="navbar-item">Log Out</a>
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
    },
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
}
.navbar {
  padding: 0 15% 0 15%;
  height: 80px;
}
.navbar-end .navbar-item {
  font-size: 1.2rem;
  font-weight: bold;
}
.navbar-end .navbar-item:hover {
  color: #cc7b36;
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
  color: #203d66;
}
.color-secondary {
  color: #1a2c54;
}
.color-highlight {
  color: #ff9a44;
}
.is-bold {
  font-weight: bold;
}
.bg-white {
  background-color: #fdfdfd;
}
.bg-primary {
  background-color: #203d66;
}
.bg-secondary {
  background-color: #1a2c54;
}
/* buttons  */
.primary-btn {
  background: #b686fe;
  color: #ffffff;
  border: none;
  padding: 25px;
  font-size: 1.3em !important;
}
.primary-btn:hover,
.primary-btn:focus {
  background: #aa73fe;
  color: #ffffff;
  transition: 0.1s ease-in;
}
.sec-btn {
  background: transparent;
  border-radius: 500px;
  border-color: #adadad;
  font-weight: 600;
  color: #ff9a44;
  box-shadow: inset 0 0 0 2px #616467;
  padding: 25px;
  font-size: 1.3rem !important;
  margin-top: 25px;
}
.sec-btn:hover,
.sec-btn:focus {
  background: #ff9a44;
  color: #fdfdfd;
  transition: 0.1s ease-in;
  box-shadow: none;
  border-color: none;
  border: #ff9a44;
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
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 0.8em;
  color: #7e7e7e !important;
  height: 50px;
}
</style>
