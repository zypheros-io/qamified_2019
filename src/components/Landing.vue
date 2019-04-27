<template>
  <div>
    <div class="hero is-fullheight">
      <!-- Navigation -->
      <div class="hero-head">
        <nav
          class="navbar is-fixed-top is-transparent"
          role="navigation"
          aria-label="main-navigation"
        >
          <div class="container">
            <!-- Logo -->
            <div class="navbar-brand">
              <a class="navbar-item" href="">
                <img src="../assets/logo.png" alt="logo.svg" />
              </a>
            </div>
            <div class="navbar-menu">
              <div class="navbar-end">
                <router-link class="navbar-item" id="nav-login" to="/signin">
                  Login
                </router-link>
                <router-link class="navbar-item" id="nav-signup" to="/signup">
                  Sign Up
                </router-link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <!-- Hero Body -->
      <div class="hero-body">
        <!-- Copy -->
        <div class="container has-text-centered">
          <div id="hero-copy">
            <p class="title is-1 is-spaced" id="banner-title">
              Learn. Respond. Collaborate.
            </p>
            <p class="subtitle is-4" id="banner-subtitle">
              Learning made more fun and collaborative for free, forever!
            </p>
            <router-link to="/signup">
              <button class="button" id="banner-button">
                <span class="mdi mdi-arrow-right-drop-circle"></span>
                &nbsp;Start your adventure
              </button>
            </router-link>
          </div>
          <!-- Illustration -->
          <div class="has-text-centered" id="illustration">
            <img src="../assets/monitor.svg" id="monitor" />
            <img src="../assets/left.svg" id="left-bubble" class="bubbles" />
            <img src="../assets/btm.svg" id="btm-bubble" class="bubbles" />
            <img src="../assets/right.svg" id="right-bubble" class="bubbles" />
          </div>
        </div>
      </div>
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
  }
};
</script>

<style scoped>
.navbar {
  font-family: 'Montserrat', sans-serif !important;
  color: #ffffff;
}
.navbar-item {
  padding-top: 50px !important;
  font-size: 1.2em !important;
}
.hero {
  font-family: 'Montserrat', sans-serif !important;
  background-color: #17b79c !important;
}
#nav-login:hover {
  color: #f4e46b !important;
}
#nav-signup {
  color: #f4e46b !important;
}
#nav-signup:hover {
  color: #ffffff !important;
}
#banner-title {
  color: #ffffff !important;
  letter-spacing: 5px !important;
}
#banner-subtitle {
  color: #eef7ed !important;
  letter-spacing: 2px !important;
}
#banner-button {
  width: 62% !important;
  height: 7vh !important;
  background-color: #f4e46b !important;
  border: none !important;
  border-radius: 8px !important;
  text-decoration: none !important;
  text-transform: uppercase !important;
  color: #17b79c !important;
  font-size: 1.3em !important;
  font-weight: bold !important;
  margin-top: 2em !important;
}
#banner-button:hover {
  background-color: #ffffff !important;
}
/* Illustration */
#illustration {
  margin-top: 7em !important;
  align-self: center !important;
  justify-self: center !important;
}
#monitor {
  width: 40% !important;
  opacity: 0 !important;
  -webkit-animation: monitorIn 1s ease-in-out forwards !important;
  -moz-animation: monitorIn 1s ease-in-out forwards !important;
  -o-animation: monitorIn 1s ease-in-out forwards !important;
  animation: monitorIn 1s ease-in-out forwards !important;
}
.bubbles {
  position: absolute !important;
  width: 20 !important;
}
#left-bubble {
  margin-left: -58%;
  margin-top: -3%;
  z-index: 2;
  opacity: 0;
  animation: bubbles 0.5s ease-in-out 1.3s forwards;
}
#right-bubble {
  margin-top: 10%;
  margin-left: -2%;
  z-index: 2;
  opacity: 0;
  animation: bubbles 0.5s ease-in-out 2.7s forwards;
}
#btm-bubble {
  margin-top: 14%;
  margin-left: -35%;
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
