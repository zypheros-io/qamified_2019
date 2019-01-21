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
                v-on:click="goto('/')">
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
export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },
  },
  watch: {
    getUser(value) {
      if (value !== null) {
        this.$router.push('/welcome');
      }
    },
  },
  methods: {
    signIn: function signIn() {
      // add a password confirmation)
      this.$store.dispatch('loginMethod', { email: this.email, password: this.password });
    },
    goto: function goto(route) {
      this.route = route;
      this.$router.push(route);
    },
  },
};
</script>
