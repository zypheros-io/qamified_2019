<template>
  <div id="app">
    <nav
      class="navbar is-fixed-top is-vcentered"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <span
          class="navbar-item is-primary-text"
          id="logo"
          style="font-weight:bold;"
        >
          qamifi<span style="color: #ff9a44;">ED</span>
        </span>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item field">
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
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <button
                class="button is-primary-text"
                id="nav-login"
                v-if="!isAuthenticated"
                @click="goto('signin')"
              >
                LOGIN
              </button>
              <button
                class="button is-primary-text"
                id="nav-signup"
                v-if="!isAuthenticated"
                @click="goto('signup')"
              >
                SIGN UP
              </button>
            </div>
          </div>
          <b-dropdown position="is-bottom-left">
            <a class="navbar-item" slot="trigger"><span>Menu</span></a>
            <b-dropdown-item v-if="isAuthenticated" custom>
              Logged as <b>{{ user.username }}</b>
            </b-dropdown-item>
            <hr class="dropdown-divider" />
            <b-dropdown-item value="home">Feed</b-dropdown-item>
            <b-dropdown-item
              value="logout"
              v-if="isAuthenticated"
              @click="signOut"
            >
              Logout
            </b-dropdown-item>
            <b-dropdown-item
              value="Login/Signup"
              v-if="!isAuthenticated"
              @click.prevent="goto('signin')"
            >
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
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Press+Start+2P');
@import '../node_modules/bulma-divider/dist/css/bulma-divider.min.css';
.navbar {
  background: rgb(252, 96, 118);
  background: -moz-linear-gradient(
    90deg,
    rgba(252, 96, 118, 1) 0% rgba(255, 154, 68, 1) 100%
  );
  background: -webkit-linear-gradient(
    90deg,
    rgba(252, 96, 118, 1) 0%,
    rgba(255, 154, 68, 1) 100%
  );
  background: linear-gradient(
    90deg,
    rgba(252, 96, 118, 1) 0%,
    rgba(255, 154, 68, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fc6076",endColorstr="#ff9a44",GradientType=1);
}
#logo {
  color: #fafbfc;
}
#nav-search {
  background-color: #fd7897 !important;
  box-shadow: none;
  color: yellow;
}
#nav-search::placeholder {
  color: #fafbfc;
}
#nav-login {
  border-radius: 5px;
  background-color: #fc6076;
  border: 1.5px solid #fafbfc;
  width: 100px;
  font-weight: bold;
  color: #fafbfc;
  font-size: 15px;
}
#nav-signup {
  border-radius: 5px;
  background-color: #fafbfc;
  border: 1.5px solid #fafbfc;
  width: 100px;
  font-weight: bold;
  color: #fc6076;
  font-size: 15px;
}
.dropdown-nav {
  font-size: 2.2rem;
  padding-right: 15px;
  color: #fc6076;
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
.is-primary-text {
  font-family: 'Roboto Condensed', sans-serif;
}
.is-secondary-text {
  font-family: 'Cabin', sans-serif;
}
.color-primary {
  color: #fc6076;
}
.color-secondary {
  color: #ff9a44;
}
.color-white {
  color: #fafbfc;
}
.bg-primary {
  background-color: #fc6076;
}
.bg-secondary {
  background-color: #ff9a44;
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
::-webkit-input-placeholder {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 13px;
}
::-moz-placeholder {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 13px;
}
:-ms-input-placeholder {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 13px;
}
::placeholder {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 13px;
}
</style>
