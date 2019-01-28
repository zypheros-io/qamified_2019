<template>
  <div>
    <div class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <!-- Form container -->
          <div class="column is-4 is-offset-4">
            <div class="box" id="signup-form-container">
              <input
                v-model="email"
                type="text"
                placeholder="email">
              <input
                v-model="password"
                type="password"
                placeholder="password">
              <button
                v-on:click.prevent="signIn"
                type="submit"> LOGIN </button>
              <a
                href=""
                v-on:click="goto('/signup')">
                  Don't have an account? Sign up here.
              </a>
            </div>
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
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      isLoading: 'login/isLoading',
    }),
  },
  watch: {
    getUser(value) {
      if (value !== null) {
        this.$router.push('/');
      }
    },
  },
  methods: {
    signIn: function signIn() {
      this.$store.dispatch('login/checkSignInMethod',
        {
          email: this.email,
          password: this.password,
        });
    },
    goto: function goto(route) {
      this.route = route;
      this.$router.push(route);
    },
  },
};
</script>
