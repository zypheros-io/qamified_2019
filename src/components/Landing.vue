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
              <span
                class="navbar-item is-primary-text"
                style="font-weight: bold; font-size: 2.2rem; color: #fdfdfd;"
              >
                QAmifi<span style="color: #ff9a44;">ED</span>
              </span>
            </div>
            <div class="navbar-menu">
              <div class="navbar-end">
                <a
                  class="navbar-item is-secondary-text color-white"
                  @click.prevent="goto('/signin')"
                >
                  Login
                </a>
                <a
                  style="color: #ff9a44"
                  class="navbar-item is-secondary-text color-white"
                  @click.prevent="goto('/signup')"
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="hero-body">
        <div class="container">
          <p class="title is-primary-text" id="banner_title">
            <span style="color: #ff9a44">Venture</span> together.
            <span style="color: #ff9a44">Learn</span> together.
          </p>
          <p class="subtitle is-secondary-text" id="banner_subtitle">
            Accomplish quests, gain experience, and rise up the ranks
          </p>
          <button
            class="button is-medium is-primary-text"
            id="landing_btn"
            @click.prevent="goto('/signup')"
          >
            START YOUR ADVENTURE
          </button>
        </div>
      </div>
      <div class="hero-foot"></div>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>QAmiFied</strong> by
          <a href="https://jgthms.com">Kenichii Ana</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/feed');
      }
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
.hero {
  background: url('../assets/bg1.png') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
#banner_title {
  font-size: 6rem;
}
#banner_subtitle {
  font-size: 2.5rem;
}
#landing_btn {
  background: #ff9a44;
  border-radius: 500px;
  border: none;
  font-weight: 600;
  color: #fdfdfd;
  padding: 25px;
  font-size: 1.3rem !important;
}
#landing_btn:hover {
  background: #ffae69;
  border: none;
  color: #fdfdfd;
  transition: 0.1s ease-in;
}
</style>
