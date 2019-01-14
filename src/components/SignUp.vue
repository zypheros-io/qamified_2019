<template>
  <div>
    <input v-model="newUser.email" type="text" placeholder="email">
    <input v-model="newUser.password" type="password" placeholder="password">
    <button v-on:click.prevent="signUp" type="submit">SIGNUP</button>
    <a href="" v-on:click="goto('/signin')"> Already have an account? Sign in here </a>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      newUser: {
        email: '',
        password: '',
      },
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
    signUp: function signUp() {
      // add a password confirmation)
      this.$store.dispatch('signUp', { email: this.newUser.email, password: this.newUser.password });
    },
    goto: function goto(route) {
      this.route = route;
      this.$router.push(route);
    },
  },
};
</script>
