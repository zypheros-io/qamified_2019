<template>
  <div>
    <div class="hero is-fullheight is-success">
      <div class="hero-head">
        <nav
          class="navbar is-fixed-top is-transparent"
          role="navigation"
          aria-label="main-navigation"
        >
          <div class="container">
            <div class="navbar-brand">
              <span class="navbar-item" id="logo">QAMIFIED</span>
            </div>
            <div class="navbar-menu">
              <div class="navbar-end">
                <a
                  class="navbar-item"
                  id="nav-login"
                  @click.prevent="goto('/signin')"
                >
                  Log In
                </a>
                <a
                  class="navbar-item"
                  id="nav-signup"
                  @click.prevent="goto('/signup')"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="hero-body">
        <span class="mdi mdi-arrow-right-drop-circle"></span>
        <div class="container has-text-centered" id="banner">
          <div id="landing-copy">
            <p class="title is-spaced" id="banner-title">
              Learn. Respond. Collaborate
            </p>
            <p class="subtitle" id="banner-subtitle">Learning made more fun</p>
            <button
              class="button"
              id="banner-button"
              @click.prevent="goto('/signup')"
            >
              <p>
                <span class="mdi mdi-arrow-right-drop-circle"></span>Start your
                adventure
              </p>
            </button>
          </div>
          <div class="has-text-centered" id="illustration">
            <img src="../assets/monitor.svg" id="monitor" />
            <img src="../assets/left.svg" id="left-bubble" class="bubbles" />
            <img src="../assets/btm.svg" id="btm-bubble" class="bubbles" />
            <img src="../assets/right.svg" id="right-bubble" class="bubbles" />
          </div>
        </div>
      </div>
      <div class="hero-foot"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      getUser: 'user/getUser'
    })
  },
  watch: {
    getUser(value) {
      if (value !== null) this.$router.push('/feed');
    }
  },
  methods: {
    goto: function goto(route) {
      this.route = route;
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>
.navbar {
  font-family: 'Montserrat', sans-serif;
}
.navbar-item {
  font-size: 1.2em;
}
#logo {
  color: #b686fe;
  font-weight: bold;
}
#nav-login {
  color: #707070;
}
#nav-signup {
  color: #b686fe;
}
.hero {
  font-family: 'Montserrat', sans-serif;
  background: #f4f4f4 url('../assets/landing.svg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
#container {
  margin-top: 200px;
}
#banner-title {
  font-size: 2.8em;
  font-weight: bold;
  color: #707070;
  margin-bottom: 1.5rem;
}
#banner-subtitle {
  font-size: 1.8em;
  color: #858585;
  margin-bottom: 1.5rem;
}
#banner-button {
  background-color: #b686fe;
  margin-top: 1.2em;
  padding: 30px 50px 30px 50px;
  border-radius: 12px;
  text-decoration: none;
  opacity: 0;
  animation: buttonIn 1s ease-in-out 4s forwards;
}
#banner-button p {
  color: #ffffff;
  font-size: 1.6em;
  font-weight: bold;
}
#banner-button .mdi {
  margin-right: 10px;
}

#illustration {
  margin-top: 3.5em;
  align-self: center;
  justify-self: center;
}
#monitor {
  width: 50%;
  opacity: 0;
  -webkit-animation: monitorIn 1s ease-in-out forwards;
  -moz-animation: monitorIn 1s ease-in-out forwards;
  -o-animation: monitorIn 1s ease-in-out forwards;
  animation: monitorIn 1s ease-in-out forwards;
}
.bubbles {
  position: absolute;
  width: 25%;
}
#left-bubble {
  margin-left: -72.6%;
  margin-top: -3%;
  z-index: 2;
  opacity: 0;
  animation: bubbles 0.5s ease-in-out 1.3s forwards;
}
#right-bubble {
  margin-top: 10%;
  margin-left: -2.3%;
  z-index: 2;
  opacity: 0;
  animation: bubbles 0.5s ease-in-out 2.7s forwards;
}
#btm-bubble {
  margin-top: 17.5%;
  margin-left: -38%;
  z-index: 2;
  opacity: 0;
  animation: bubbles 0.5s ease-in-out 3.7s forwards;
}
/* animation keyframes */
@keyframes buttonIn {
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@-webkit-keyframes buttonIn {
  from {
    -webkit-transform: translateX(-30px);
    opacity: 0;
  }
  to {
    -webkit-transform: translateX(0);
    opacity: 1;
  }
}
@-moz-keyframes buttonIn {
  from {
    -moz-transform: translateX(-30px);
    opacity: 0;
  }
  to {
    -moz-transform: translateX(0);
    opacity: 1;
  }
}
@-o-keyframes buttonIn {
  from {
    -o-transform: translateX(-30px);
    opacity: 0;
  }
  to {
    -o-transform: translateX(0);
    opacity: 1;
  }
}
@keyframes monitorIn {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@-webkit-keyframes monitorIn {
  from {
    -webkit-transform: translateY(-30px);
    opacity: 0;
  }
  to {
    -webkit-transform: translateY(0);
    opacity: 1;
  }
}
@-moz-keyframes monitorIn {
  from {
    -moz-transform: translateY(-30px);
    opacity: 0;
  }
  to {
    -moz-transform: translateY(0);
    opacity: 1;
  }
}
@-o-keyframes monitorIn {
  from {
    -o-transform: translateY(-30px);
    opacity: 0;
  }
  to {
    -o-transform: translateY(0);
    opacity: 1;
  }
}
@keyframes bubbles {
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
@-webkit-keyframes bubbles {
  0% {
    -webkit-transform: scale(0);
    opacity: 0;
  }
  50% {
    -webkit-transform: scale(1.2);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    opacity: 1;
  }
}
@-moz-keyframes bubbles {
  0% {
    -moz-transform: scale(0);
    opacity: 0;
  }
  50% {
    -moz-transform: scale(1.2);
    opacity: 1;
  }
  100% {
    -moz-transform: scale(1);
    opacity: 1;
  }
}
@-o-keyframes bubbles {
  0% {
    -o-transform: scale(0);
    opacity: 0;
  }
  50% {
    -o-transform: scale(1.2);
    opacity: 1;
  }
  100% {
    -o-transform: scale(1);
    opacity: 1;
  }
}
</style>
