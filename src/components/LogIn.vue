<template>
  <div class="bg-white" id="login_page">
    <!-- Pageloader -->
    <b-loading
      :is-full-page="true"
      :active.sync="loading"
      :can-cancel="false"
    ></b-loading>
    <div class="columns">
      <div class="column">
        <div class="level">
          <div class="level-item">
            <div class="has-text-centered">
              <span
                class="color-primary"
                style="font-weight: bold; font-size: 5rem;"
              >
                QAmifi<span style="color: #ff9a44;">ED</span>
              </span>
              <div class="is-divider"></div>
              <p class="title is-2 is-primary-text color-primary">
                Sign in. Adventure is waiting!
              </p>
              <div class="box" id="login_container">
                <!-- Username -->
                <b-field class="margin-top-1">
                  <b-input
                    v-model="user.email"
                    type="text"
                    placeholder="Username"
                    size="is-medium"
                    required
                  ></b-input>
                </b-field>
                <!-- Password -->
                <b-field class="margin-top-1">
                  <b-input
                    v-model="user.password"
                    type="password"
                    placeholder="Password"
                    size="is-medium"
                    password-reveal
                    required
                  ></b-input>
                </b-field>
                <!-- Login Button -->
                <b-field class="margin-top-1">
                  <button
                    class="button is-medium is-fullwidth is-primary-text main-btn"
                    @click.prevent="signIn"
                  >
                    START GAME
                  </button>
                </b-field>
                <div class="is-divider" data-content="OR"></div>
                <div class="has-text-centered is-secondary-text">
                  <p style="font-size: 1.3rem;">
                    Not yet an adventurer?
                    <a class="is-anchor" @click.prevent="goto('/signup')">
                      Sign up
                    </a>
                    now
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="level">
          <div class="level-item">
            <img src="../assets/05.png" alt="login_image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    };
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      loading: 'login/isLoading'
    })
  },
  watch: {
    getUser(value) {
      if (value !== null) this.$router.push('/feed');
    }
  },
  methods: {
    signIn: function signIn() {
      if (this.user.email && this.user.password) {
        this.$store.dispatch('login/checkSignInMethod', this.user);
      } else {
        // eslint-disable-next-line
        alert('Please fill out the required fields.');
      }
    },
    goto: function goto(route) {
      this.route = route;
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>
#login_page {
  height: 100vh;
  width: 100%;
}
#login_page .columns,
#login_page .columns .column {
  height: inherit;
  width: 100%;
}
.level,
.level-item {
  height: inherit;
  width: 100%;
}
#login_container {
  width: 550px;
  padding: 40px;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
}
</style>
